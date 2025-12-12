"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import {
  Calendar,
  Users,
  Building2,
  UserCog,
  LogOut,
  ShieldCheck,
  LayoutDashboard,
  Menu,
  X
} from "lucide-react"
import { useState, useEffect, ReactNode } from "react"

type UserProfile = {
  role: 'superadmin' | 'admin'
  full_name: string | null
  email: string
}

const adminNavItems = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/events", label: "Manage Events", icon: Calendar },
  { href: "/admin/dashboard/clubs", label: "Manage Clubs", icon: Building2 },
  { href: "/admin/dashboard/team", label: "Manage Team", icon: Users },
]

const superadminNavItems = [
  { href: "/admin/dashboard/admins", label: "Manage Admins", icon: UserCog },
]

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast.error("Please login to access the dashboard")
        router.push("/admin/login")
        return
      }

      // Fetch user profile
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('role, full_name, email')
        .eq('id', session.user.id)
        .single()

      if (error || !profileData) {
        // Profile doesn't exist yet, create it
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            email: session.user.email,
            role: 'admin', // Default role
            full_name: session.user.user_metadata?.full_name || null
          })
        
        if (insertError) {
          console.error('Failed to create profile:', insertError)
        }
        
        setProfile({
          role: 'admin',
          full_name: session.user.user_metadata?.full_name || null,
          email: session.user.email || ''
        })
      } else {
        setProfile(profileData as UserProfile)
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const isSuperadmin = profile?.role === 'superadmin'
  const navItems = isSuperadmin ? [...adminNavItems, ...superadminNavItems] : adminNavItems

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-card border border-border rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <div>
                <h1 className="font-serif font-bold text-lg">Bandipur</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {isSuperadmin ? 'Superadmin' : 'Admin'} Panel
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-border">
            <div className="mb-4 px-4">
              <p className="font-medium text-sm truncate">{profile?.full_name || profile?.email}</p>
              <p className="text-xs text-muted-foreground truncate">{profile?.email}</p>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen lg:p-8 p-4 pt-16 lg:pt-8">
        {children}
      </main>
    </div>
  )
}
