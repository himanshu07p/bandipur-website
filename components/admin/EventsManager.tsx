"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2, Plus, Pencil, Trash2, Calendar as CalendarIcon, MapPin, Link as LinkIcon, Image as ImageIcon } from "lucide-react"
import { format } from "date-fns"
import { ImageUpload } from "@/components/admin/ImageUpload"

type Event = {
  id: string
  title: string
  description: string
  event_date: string
  location: string
  meeting_link: string | null
  poster_url: string | null
  status: 'Upcoming' | 'Completed' | 'Live'
}

export function EventsManager() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<Partial<Event>>({})
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  const fetchEvents = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true })

    if (error) {
      toast.error('Failed to fetch events')
      console.error(error)
    } else {
      setEvents(data as Event[])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      if (isEditing && currentEvent.id) {
        const { error } = await supabase
          .from('events')
          .update(currentEvent)
          .eq('id', currentEvent.id)

        if (error) throw error
        toast.success('Event updated successfully')
      } else {
        const { error } = await supabase
          .from('events')
          .insert([currentEvent])

        if (error) throw error
        toast.success('Event created successfully')
      }
      setIsDialogOpen(false)
      fetchEvents()
      setCurrentEvent({})
    } catch (error) {
      console.error(error)
      toast.error('Failed to save event')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete event')
    } else {
      toast.success('Event deleted')
      fetchEvents()
    }
  }

  const openNewEvent = () => {
    setCurrentEvent({
      status: 'Upcoming',
      event_date: new Date().toISOString()
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const openEditEvent = (event: Event) => {
    setCurrentEvent(event)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Events List</h3>
        <Button onClick={openNewEvent} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : events.length === 0 ? (
        <Card className="bg-muted/10 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <CalendarIcon className="w-10 h-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No events found. Create one to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden bg-card/50 border-border/10">
              <div className="aspect-video w-full bg-muted relative">
                {event.poster_url ? (
                  <img src={event.poster_url} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-bold rounded shadow-sm ${
                    event.status === 'Upcoming' ? 'bg-blue-500 text-white' :
                    event.status === 'Live' ? 'bg-red-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg truncate">{event.title}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <CalendarIcon className="w-3 h-3 mr-1" />
                  {format(new Date(event.event_date), 'PPP p')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center truncate">
                  <MapPin className="w-3 h-3 mr-2 shrink-0" />
                  {event.location || 'No location'}
                </div>
                {event.meeting_link && (
                  <div className="flex items-center truncate text-blue-400">
                    <LinkIcon className="w-3 h-3 mr-2 shrink-0" />
                    <a href={event.meeting_link} target="_blank" rel="noreferrer" className="hover:underline">
                      Link
                    </a>
                  </div>
                )}
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openEditEvent(event)}>
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(event.id)}>
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
            <DialogTitle>{isEditing ? 'Edit Event' : 'Create Event'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update the details of the event.' : 'Add a new event to the calendar.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={currentEvent.title || ''}
                onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                placeholder="Event Title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date & Time</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={currentEvent.event_date ? new Date(currentEvent.event_date).toISOString().slice(0, 16) : ''}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, event_date: new Date(e.target.value).toISOString() })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={currentEvent.status || 'Upcoming'}
                  onValueChange={(val: any) => setCurrentEvent({ ...currentEvent, status: val })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Live">Live</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={currentEvent.location || ''}
                onChange={(e) => setCurrentEvent({ ...currentEvent, location: e.target.value })}
                placeholder="Venue or Online"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="link">Meeting Link (Optional)</Label>
              <Input
                id="link"
                value={currentEvent.meeting_link || ''}
                onChange={(e) => setCurrentEvent({ ...currentEvent, meeting_link: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <ImageUpload
              value={currentEvent.poster_url}
              onChange={(url) => setCurrentEvent({ ...currentEvent, poster_url: url })}
              folder="bandipur/events"
              label="Event Poster"
            />
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={currentEvent.description || ''}
                onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
                placeholder="Event details..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
