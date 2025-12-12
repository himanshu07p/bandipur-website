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
import { Loader2, Plus, Pencil, Trash2, Users, Image as ImageIcon } from "lucide-react"
import { ImageUpload } from "@/components/admin/ImageUpload"

type Club = {
  id: string
  name: string
  type: 'Club' | 'UHC' | 'LHC' | 'WebOps' | 'Committee'
  description: string
  image_url: string | null
  secretary_name: string | null
  secretary_contact: string | null
}

export function ClubsManager() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentClub, setCurrentClub] = useState<Partial<Club>>({})
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  const fetchClubs = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('clubs')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      toast.error('Failed to fetch clubs')
      console.error(error)
    } else {
      setClubs(data as Club[])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchClubs()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      if (isEditing && currentClub.id) {
        const { error } = await supabase
          .from('clubs')
          .update(currentClub)
          .eq('id', currentClub.id)

        if (error) throw error
        toast.success('Club updated successfully')
      } else {
        const { error } = await supabase
          .from('clubs')
          .insert([currentClub])

        if (error) throw error
        toast.success('Club created successfully')
      }
      setIsDialogOpen(false)
      fetchClubs()
      setCurrentClub({})
    } catch (error) {
      console.error(error)
      toast.error('Failed to save club')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entity?')) return

    const { error } = await supabase
      .from('clubs')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete')
    } else {
      toast.success('Deleted successfully')
      fetchClubs()
    }
  }

  const openNewClub = () => {
    setCurrentClub({
      type: 'Club'
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const openEditClub = (club: Club) => {
    setCurrentClub(club)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Entities List (Clubs, UHC, LHC, etc.)</h3>
        <Button onClick={openNewClub} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Entity
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : clubs.length === 0 ? (
        <Card className="bg-muted/10 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <Users className="w-10 h-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No clubs/entities found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <Card key={club.id} className="overflow-hidden bg-card/50 border-border/10">
              <div className="h-40 w-full bg-muted relative">
                {club.image_url ? (
                  <img src={club.image_url} alt={club.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                   <span className="px-2 py-1 text-xs font-bold rounded shadow-sm bg-black/50 text-white backdrop-blur-sm border border-white/20">
                    {club.type}
                  </span>
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg truncate">{club.name}</CardTitle>
                <div className="text-xs text-muted-foreground truncate font-mono">
                  Lead: {club.secretary_name || 'N/A'}
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                  {club.description || 'No description provided.'}
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openEditClub(club)}>
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(club.id)}>
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
            <DialogTitle>{isEditing ? 'Edit Entity' : 'Create Entity'}</DialogTitle>
            <DialogDescription>
              Manage details for this club or organization.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={currentClub.name || ''}
                onChange={(e) => setCurrentClub({ ...currentClub, name: e.target.value })}
                placeholder="Club Name / House Name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={currentClub.type || 'Club'}
                onValueChange={(val: any) => setCurrentClub({ ...currentClub, type: val })}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Club">Club</SelectItem>
                  <SelectItem value="UHC">UHC (Upper House Council)</SelectItem>
                  <SelectItem value="LHC">LHC (Lower House Council)</SelectItem>
                  <SelectItem value="WebOps">WebOps</SelectItem>
                  <SelectItem value="Committee">Committee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ImageUpload
              value={currentClub.image_url}
              onChange={(url) => setCurrentClub({ ...currentClub, image_url: url })}
              folder="bandipur/clubs"
              label="Logo / Banner Image"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sec_name">Secretary/Lead Name</Label>
                <Input
                  id="sec_name"
                  value={currentClub.secretary_name || ''}
                  onChange={(e) => setCurrentClub({ ...currentClub, secretary_name: e.target.value })}
                  placeholder="Full Name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sec_contact">Contact (Email/Phone)</Label>
                <Input
                  id="sec_contact"
                  value={currentClub.secretary_contact || ''}
                  onChange={(e) => setCurrentClub({ ...currentClub, secretary_contact: e.target.value })}
                  placeholder="Optional"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={currentClub.description || ''}
                onChange={(e) => setCurrentClub({ ...currentClub, description: e.target.value })}
                placeholder="Details..."
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
