export type Profile = {
  id: string
  email: string
  role: 'superadmin' | 'admin'
  full_name: string
}

export type Event = {
  id: string
  title: string
  description: string
  event_date: string
  location: string
  meeting_link?: string
  poster_url?: string
  created_by: string
}

export type Resource = {
  id: string
  title: string
  subject: string
  file_url: string
  category: string
}
