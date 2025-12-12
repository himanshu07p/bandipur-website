"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2, Plus, Pencil, Trash2, UserCircle } from "lucide-react"
import { ImageUpload } from "@/components/admin/ImageUpload"

type TeamMember = {
  id: string
  name: string
  position: string
  category: 'UHC' | 'LHC' | 'WebOps'
  image_url: string | null
  linkedin_url: string | null
  email: string | null
  bio: string | null
  order_index: number
}

export function TeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState<Partial<TeamMember>>({})
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  const fetchMembers = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      toast.error('Failed to fetch team members')
      console.error(error)
    } else {
      setMembers(data as TeamMember[])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      if (isEditing && currentMember.id) {
        const { error } = await supabase
          .from('team_members')
          .update(currentMember)
          .eq('id', currentMember.id)

        if (error) throw error
        toast.success('Team member updated successfully')
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([currentMember])

        if (error) throw error
        toast.success('Team member added successfully')
      }
      setIsDialogOpen(false)
      fetchMembers()
      setCurrentMember({})
    } catch (error) {
      console.error(error)
      toast.error('Failed to save team member')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return

    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete team member')
    } else {
      toast.success('Team member removed')
      fetchMembers()
    }
  }

  const openNewMember = () => {
    setCurrentMember({
      category: 'WebOps',
      order_index: members.length
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const openEditMember = (member: TeamMember) => {
    setCurrentMember(member)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Team Members</h3>
        <Button onClick={openNewMember} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : members.length === 0 ? (
        <Card className="bg-muted/10 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <UserCircle className="w-10 h-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No team members found. Add your first member.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <Card key={member.id} className="overflow-hidden bg-card/50 border-border/10">
              <div className="h-40 w-full bg-muted relative">
                {member.image_url ? (
                  <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <UserCircle className="w-16 h-16" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                   <span className={`px-2 py-1 text-xs font-bold rounded shadow-sm backdrop-blur-sm border border-white/20 ${
                     member.category === 'UHC' ? 'bg-primary/80 text-primary-foreground' :
                     member.category === 'LHC' ? 'bg-blue-500/80 text-white' :
                     'bg-black/50 text-white'
                   }`}>
                    {member.category === 'UHC' ? 'Upper House' : member.category === 'LHC' ? 'Lower House' : member.category}
                  </span>
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg truncate">{member.name}</CardTitle>
                <div className="text-sm text-muted-foreground font-mono">
                  {member.position}
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                  {member.bio || 'No bio provided.'}
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openEditMember(member)}>
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(member.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
            <DialogDescription>
              Manage team member details for the public Team page.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={currentMember.name || ''}
                onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="position">Position / Role</Label>
                <Input
                  id="position"
                  value={currentMember.position || ''}
                  onChange={(e) => setCurrentMember({ ...currentMember, position: e.target.value })}
                  placeholder="Secretary, Lead, etc."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={currentMember.category || 'WebOps'}
                  onValueChange={(val: any) => setCurrentMember({ ...currentMember, category: val })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UHC">Upper House Council</SelectItem>
                    <SelectItem value="LHC">Lower House Council</SelectItem>
                    <SelectItem value="WebOps">Web Ops Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ImageUpload
              value={currentMember.image_url}
              onChange={(url) => setCurrentMember({ ...currentMember, image_url: url })}
              folder="bandipur/team"
              label="Profile Image"
            />
            <div className="grid grid-cols-2 gap-4">
               <div className="grid gap-2">
                <Label htmlFor="linkedin">LinkedIn URL (Optional)</Label>
                <Input
                  id="linkedin"
                  value={currentMember.linkedin_url || ''}
                  onChange={(e) => setCurrentMember({ ...currentMember, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={currentMember.email || ''}
                  onChange={(e) => setCurrentMember({ ...currentMember, email: e.target.value })}
                  placeholder="member@example.com"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Short Bio</Label>
              <Textarea
                id="bio"
                value={currentMember.bio || ''}
                onChange={(e) => setCurrentMember({ ...currentMember, bio: e.target.value })}
                placeholder="A short introduction..."
              />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={currentMember.order_index ?? 0}
                onChange={(e) => setCurrentMember({ ...currentMember, order_index: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
