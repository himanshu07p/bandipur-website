import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Crown, Lightbulb, Code, Feather, Users, Building, Laptop, Globe } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const dynamic = 'force-dynamic'

export default async function ClubsPage() {
  const supabase = await createClient()
  const { data: clubs } = await supabase.from('clubs').select('*').order('name', { ascending: true })

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Club': return Lightbulb;
      case 'UHC': return Crown;
      case 'LHC': return Users;
      case 'WebOps': return Code;
      case 'Committee': return Building;
      default: return Feather;
    }
  }

  // Grouping logic (optional, can also just list them or section them)
  // For now, let's just list with badges or sections if needed.
  // The user asked for "clubs, uhc, lhc, web ops"
  
  const groupedClubs = {
    'UHC': clubs?.filter(c => c.type === 'UHC') || [],
    'LHC': clubs?.filter(c => c.type === 'LHC') || [],
    'Clubs & Communities': clubs?.filter(c => c.type === 'Club' || c.type === 'Committee') || [],
    'WebOps': clubs?.filter(c => c.type === 'WebOps') || []
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-12 md:py-24 space-y-12 md:space-y-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-8xl font-serif font-light tracking-tighter">Find Your <span className="italic">Niche</span>.</h1>
          <p className="text-xl text-muted-foreground font-sans font-light max-w-2xl mx-auto">
            Join a club or council that resonates with your passion.
          </p>
        </div>

        {Object.entries(groupedClubs).map(([sectionTitle, sectionClubs]) => (
          sectionClubs.length > 0 && (
            <div key={sectionTitle} className="space-y-8">
              <h2 className="text-3xl font-serif border-b border-border pb-4">{sectionTitle}</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {sectionClubs.map((club) => {
                  const Icon = getIconForType(club.type)
                  return (
                    <Card key={club.id} className="bg-card border-border hover:shadow-lg transition-all duration-500 group rounded-none p-8">
                      <CardHeader className="flex flex-row items-center gap-6 p-0 pb-6 border-b border-border">
                        <div className="p-4 rounded-full bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                          {club.image_url ? (
                             <img src={club.image_url} alt={club.name} className="h-8 w-8 object-contain" />
                          ) : (
                             <Icon className="h-8 w-8" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <CardTitle className="text-3xl font-serif font-light">{club.name}</CardTitle>
                          {club.secretary_name && (
                             <p className="text-sm text-muted-foreground uppercase tracking-wider font-mono">Lead: {club.secretary_name}</p>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-0 pt-6">
                        <CardDescription className="text-lg text-muted-foreground font-sans font-light leading-relaxed">
                          {club.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        ))}
        
        {clubs?.length === 0 && (
           <div className="text-center py-24 border border-dashed border-border rounded-lg">
             <p className="text-muted-foreground">No entities found in the database.</p>
           </div>
        )}
      </div>
    </div>
  )
}
