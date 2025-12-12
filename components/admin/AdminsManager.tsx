"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2, Plus, Pencil, Trash2, ShieldCheck, UserCog } from "lucide-react"

type AdminProfile = {
  id: string
  email: string
  role: 'superadmin' | 'admin'
  full_name: string | null
  created_at: string
}

export function AdminsManager() {
  const [admins, setAdmins] = useState<AdminProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newAdmin, setNewAdmin] = useState({ email: '', password: '', full_name: '', role: 'admin' as 'admin' | 'superadmin' })
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  const fetchAdmins = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Failed to fetch admins')
      console.error(error)
    } else {
      setAdmins(data as AdminProfile[])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  const handleCreateAdmin = async () => {
    if (!newAdmin.email || !newAdmin.password) {
      toast.error('Email and password are required')
      return
    }
    setSaving(true)
    try {
      // Create user in Supabase Auth
      // NOTE: This requires the service_role key for admin user creation,
      // which should be done via a server action or API route in production.
      // For now, we'll use signUp which might require email confirmation.
      // A proper implementation would use Supabase Admin SDK on the server.
      
      // For this demo, we'll just add to profiles table directly.
      // In production, you'd have a secure server-side API.
      
      // Simplified: We cannot create auth users from client-side easily.
      // Workaround: Ask user to sign up, then superadmin updates the profile.
      
      // Let's try using signUp (user will need to confirm email in Supabase settings)
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: newAdmin.email,
        password: newAdmin.password,
        options: {
          data: {
            full_name: newAdmin.full_name,
          }
        }
      })
      
      if (signUpError) {
        throw signUpError
      }

      // Now create profile
      if (signUpData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: signUpData.user.id,
            email: newAdmin.email,
            full_name: newAdmin.full_name,
            role: newAdmin.role
          })
        
        if (profileError) {
          console.error('Profile creation error:', profileError)
          // Profile might already exist via trigger, try update
          await supabase
            .from('profiles')
            .update({ role: newAdmin.role, full_name: newAdmin.full_name })
            .eq('id', signUpData.user.id)
        }
      }

      toast.success('Admin created successfully. They may need to confirm their email.')
      setIsDialogOpen(false)
      setNewAdmin({ email: '', password: '', full_name: '', role: 'admin' })
      fetchAdmins()
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'Failed to create admin')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateRole = async (id: string, newRole: 'admin' | 'superadmin') => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', id)

    if (error) {
      toast.error('Failed to update role')
    } else {
      toast.success('Role updated')
      fetchAdmins()
    }
  }

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} as an admin? This will NOT delete their auth account, only their admin profile.`)) return

    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete admin profile')
    } else {
      toast.success('Admin profile removed')
      fetchAdmins()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Admin Users</h3>
        <Button onClick={() => setIsDialogOpen(true)} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Create Admin
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Manage administrators who have access to this dashboard. Superadmins can manage other admins.
      </p>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : admins.length === 0 ? (
        <Card className="bg-muted/10 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <UserCog className="w-10 h-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No admin profiles found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {admins.map((admin) => (
            <Card key={admin.id} className="bg-card/50 border-border/10">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${admin.role === 'superadmin' ? 'bg-primary/20 text-primary' : 'bg-muted'}`}>
                    {admin.role === 'superadmin' ? <ShieldCheck className="w-5 h-5" /> : <UserCog className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium">{admin.full_name || admin.email}</p>
                    <p className="text-sm text-muted-foreground">{admin.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={admin.role}
                    onValueChange={(val: 'admin' | 'superadmin') => handleUpdateRole(admin.id, val)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="superadmin">Superadmin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(admin.id, admin.email)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Admin</DialogTitle>
            <DialogDescription>
              Create a new admin user. They will receive an email to confirm their account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={newAdmin.full_name}
                onChange={(e) => setNewAdmin({ ...newAdmin, full_name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                placeholder="admin@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={newAdmin.role}
                onValueChange={(val: 'admin' | 'superadmin') => setNewAdmin({ ...newAdmin, role: val })}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="superadmin">Superadmin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateAdmin} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
