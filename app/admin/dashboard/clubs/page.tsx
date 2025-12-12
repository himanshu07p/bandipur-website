"use client"

import { ClubsManager } from "@/components/admin/ClubsManager"

export default function ClubsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Manage Clubs & Entities</h1>
        <p className="text-muted-foreground mt-1">Manage Clubs, UHC, LHC, WebOps, and Committees.</p>
      </div>
      <ClubsManager />
    </div>
  )
}
