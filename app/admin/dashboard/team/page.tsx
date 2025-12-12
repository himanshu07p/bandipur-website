"use client"

import { TeamManager } from "@/components/admin/TeamManager"

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Manage Team</h1>
        <p className="text-muted-foreground mt-1">Manage team members displayed on the public Team page.</p>
      </div>
      <TeamManager />
    </div>
  )
}
