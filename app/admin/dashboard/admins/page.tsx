"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { AdminsManager } from "@/components/admin/AdminsManager"
import { ShieldAlert } from "lucide-react"

export default function AdminsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isSuperadmin, setIsSuperadmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkRole = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/admin/login")
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (profile?.role !== 'superadmin') {
        toast.error("Access denied. Superadmin privileges required.")
        router.push("/admin/dashboard")
        return
      }

      setIsSuperadmin(true)
      setLoading(false)
    }

    checkRole()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Checking permissions...</p>
      </div>
    )
  }

  if (!isSuperadmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground">You need superadmin privileges to access this page.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Manage Admins</h1>
        <p className="text-muted-foreground mt-1">Create and manage admin users. Only superadmins can access this section.</p>
      </div>
      <AdminsManager />
    </div>
  )
}
