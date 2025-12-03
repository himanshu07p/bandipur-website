import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Crown, Lightbulb, Code, Feather } from "lucide-react"

export default function ClubsPage() {
  const clubs = [
    {
      name: "Chess Club",
      description: "Strategy and Patience. Weekly tournaments.",
      icon: Crown,
    },
    {
      name: "Eureka",
      description: "From Idea to IPO. Building the founders of tomorrow.",
      icon: Lightbulb,
    },
    {
      name: "Igniters",
      description: "Competitive Programming and Hackathons.",
      icon: Code,
    },
    {
      name: "Samvaah",
      description: "The voice of Bandipur. Poetry, prose, and storytelling.",
      icon: Feather,
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-12 md:py-24 space-y-12 md:space-y-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-8xl font-serif font-light tracking-tighter">Find Your <span className="italic">Niche</span>.</h1>
          <p className="text-xl text-muted-foreground font-sans font-light max-w-2xl mx-auto">
            Join a club that resonates with your passion.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {clubs.map((club) => (
            <Card key={club.name} className="bg-card border-border hover:shadow-lg transition-all duration-500 group rounded-none p-8">
              <CardHeader className="flex flex-row items-center gap-6 p-0 pb-6 border-b border-border">
                <div className="p-4 rounded-full bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                  <club.icon className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-serif font-light">{club.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0 pt-6">
                <CardDescription className="text-lg text-muted-foreground font-sans font-light leading-relaxed">
                  {club.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
