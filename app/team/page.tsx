import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TeamPage() {
  const upperCouncil = [
    { name: "Secretary Name", role: "House Secretary", image: "/placeholder-user.jpg" },
    { name: "Deputy Name", role: "Deputy Secretary", image: "/placeholder-user.jpg" },
    { name: "Web Lead Name", role: "Web-Ops Lead", image: "/placeholder-user.jpg" },
  ]

  const lowerCouncil = [
    { name: "Coordinator 1", zone: "North Zone - Delhi" },
    { name: "Coordinator 2", zone: "South Zone - Bangalore" },
    { name: "Coordinator 3", zone: "East Zone - Kolkata" },
    { name: "Coordinator 4", zone: "West Zone - Mumbai" },
  ]

  const webOps = [
    { name: "Dev 1", role: "Frontend Developer" },
    { name: "Dev 2", role: "Backend Developer" },
    { name: "Designer 1", role: "UI/UX Designer" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-12 md:py-24 space-y-12 md:space-y-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-8xl font-serif font-light tracking-tighter">The <span className="italic">Leadership</span>.</h1>
          <p className="text-xl text-muted-foreground font-sans font-light max-w-2xl mx-auto">
            The minds moving Bandipur forward.
          </p>
        </div>

        {/* Upper House Council */}
        <section className="space-y-12">
          <div className="flex items-center gap-8">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-sm font-sans font-bold text-muted-foreground uppercase tracking-[0.3em]">Upper House Council</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-12 md:grid-cols-3 justify-center">
            {upperCouncil.map((member) => (
              <div key={member.name} className="group text-center space-y-6">
                <div className="relative w-64 h-64 mx-auto overflow-hidden rounded-xl bg-muted grayscale group-hover:grayscale-0 transition-all duration-700 shadow-sm hover:shadow-md">
                   {/* Placeholder Image */}
                   <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 font-serif italic">
                     Image
                   </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif">{member.name}</h3>
                  <p className="text-sm font-sans text-muted-foreground uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lower House Council */}
        <section className="space-y-12">
          <div className="flex items-center gap-8">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-sm font-sans font-bold text-muted-foreground uppercase tracking-[0.3em]">Lower House Council</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {lowerCouncil.map((member) => (
              <div key={member.name} className="p-8 border border-border hover:border-primary/50 transition-colors duration-500 space-y-8 group bg-card rounded-2xl text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-48 h-48 mx-auto rounded-full bg-muted flex items-center justify-center text-muted-foreground font-serif italic text-3xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 overflow-hidden shadow-lg group-hover:scale-105">
                  {/* Placeholder for actual image if available, else initial */}
                  {member.name[0]}
                </div>
                <div className="space-y-3 relative z-10">
                  <h3 className="text-2xl font-serif">{member.name}</h3>
                  <p className="text-xs font-sans text-muted-foreground uppercase tracking-widest border-t border-border pt-3 inline-block px-4">{member.zone}</p>
                </div>
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Web Ops Team */}
        <section className="space-y-12">
          <div className="flex items-center gap-8">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-sm font-sans font-bold text-muted-foreground uppercase tracking-[0.3em]">Web-Ops Team</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {webOps.map((member) => (
              <div key={member.name} className="bg-card p-8 flex flex-col items-center text-center gap-6 hover:bg-muted/30 transition-all duration-500 border border-border rounded-2xl group">
                 <div className="w-32 h-32 rounded-full bg-muted overflow-hidden flex items-center justify-center ring-4 ring-transparent group-hover:ring-primary/20 transition-all duration-500">
                    <Avatar className="h-full w-full rounded-none grayscale group-hover:grayscale-0 transition-all duration-500">
                      <AvatarFallback className="bg-muted text-foreground font-serif text-4xl">{member.name[0]}</AvatarFallback>
                    </Avatar>
                 </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl group-hover:text-primary transition-colors duration-300">{member.name}</h3>
                    <p className="text-xs text-muted-foreground font-sans uppercase tracking-widest bg-muted/50 px-3 py-1 rounded-full">{member.role}</p>
                  </div>
              </div>
            ))}
          </div>
          <div className="text-center pt-8">
             <Button variant="outline" asChild className="border-border text-foreground hover:bg-primary hover:text-primary-foreground font-sans uppercase tracking-widest text-xs px-8 py-6">
              <Link href="https://github.com" target="_blank">
                <Github className="mr-2 h-4 w-4" />
                View Source Code
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
