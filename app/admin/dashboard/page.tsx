"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Building2, UserCog } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function DashboardOverview() {
  const supabase = createClient()
  const [stats, setStats] = useState({
    eventsCount: 0,
    clubsCount: 0,
    teamCount: 0,
    adminsCount: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      const { count: eventsCount } = await supabase.from('events').select('*', { count: 'exact', head: true })
      const { count: clubsCount } = await supabase.from('clubs').select('*', { count: 'exact', head: true })
      const { count: teamCount } = await supabase.from('team_members').select('*', { count: 'exact', head: true })
      const { count: adminsCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })

      setStats({
        eventsCount: eventsCount || 0,
        clubsCount: clubsCount || 0,
        teamCount: teamCount || 0,
        adminsCount: adminsCount || 0
      })
    }

    fetchStats()
  }, [])

  const statCards = [
    { title: "Total Events", value: stats.eventsCount, icon: Calendar, description: "Scheduled events" },
    { title: "Clubs & Entities", value: stats.clubsCount, icon: Building2, description: "Active groups" },
    { title: "Team Members", value: stats.teamCount, icon: Users, description: "Public team members" },
    { title: "Admins", value: stats.adminsCount, icon: UserCog, description: "Dashboard users" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to the Bandipur Admin Panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Card key={card.title} className="bg-card/50 border-border/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 border-border/10">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Use the sidebar to navigate to different sections:
            </p>
            <ul className="text-sm space-y-2 mt-4">
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span><strong>Manage Events</strong> - Add, edit, and delete events</span>
              </li>
              <li className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                <span><strong>Manage Clubs</strong> - Manage UHC, LHC, WebOps & Clubs</span>
              </li>
              <li className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span><strong>Manage Team</strong> - Update the public Team page</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/10">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Activity tracking coming soon. This section will display recent changes made by admins.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
