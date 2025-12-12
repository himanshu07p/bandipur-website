import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Github, Mail, Linkedin } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export const dynamic = 'force-dynamic'

export default async function TeamPage() {
  const supabase = await createClient()
  const { data: teamMembers } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true })

  // Group by category
  const uhc = teamMembers?.filter(m => m.category === 'UHC') || []
  const lhc = teamMembers?.filter(m => m.category === 'LHC') || []
  const webOps = teamMembers?.filter(m => m.category === 'WebOps') || []

  const renderSection = (title: string, people: typeof uhc, variant: 'uhc' | 'lhc' | 'webops') => {
    if (people.length === 0) return null
    
    return (
      <section className="space-y-12">
        <div className="flex items-center gap-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-sm font-sans font-bold text-muted-foreground uppercase tracking-[0.3em]">{title}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className={`grid gap-8 ${variant === 'uhc' ? 'md:grid-cols-3 justify-center' : variant === 'lhc' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
          {people.map((member) => (
            <div key={member.id} className={`group text-center space-y-6 ${variant !== 'uhc' ? 'p-8 border border-border hover:border-primary/50 transition-colors duration-500 bg-card rounded-2xl relative overflow-hidden' : ''}`}>
              {variant !== 'uhc' && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}
              <div className={`mx-auto overflow-hidden bg-muted grayscale group-hover:grayscale-0 transition-all duration-700 shadow-sm hover:shadow-md flex items-center justify-center ${
                variant === 'uhc' ? 'w-64 h-64 rounded-xl' : 'w-32 h-32 rounded-full ring-4 ring-transparent group-hover:ring-primary/20'
              }`}>
                {member.image_url ? (
                  <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-muted-foreground font-serif italic text-3xl">{member.name[0]}</span>
                )}
              </div>
              <div className="space-y-2 relative z-10">
                <h3 className={`font-serif ${variant === 'uhc' ? 'text-2xl' : 'text-xl group-hover:text-primary transition-colors duration-300'}`}>{member.name}</h3>
                <p className="text-xs font-sans text-muted-foreground uppercase tracking-widest">{member.position}</p>
                {member.bio && variant === 'uhc' && (
                  <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">{member.bio}</p>
                )}
              </div>
              {(member.linkedin_url || member.email) && (
                <div className="flex justify-center gap-2 relative z-10">
                  {member.linkedin_url && (
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                      <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {member.email && (
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                      <a href={`mailto:${member.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-12 md:py-24 space-y-12 md:space-y-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-8xl font-serif font-light tracking-tighter">The <span className="italic">Leadership</span>.</h1>
          <p className="text-xl text-muted-foreground font-sans font-light max-w-2xl mx-auto">
            The minds moving Bandipur forward.
          </p>
        </div>

        {renderSection('Upper House Council', uhc, 'uhc')}
        {renderSection('Lower House Council', lhc, 'lhc')}
        {renderSection('Web Ops Team', webOps, 'webops')}
          {teamMembers?.length === 0 && (
          <div className="text-center py-24 border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground">Team information coming soon.</p>
          </div>
        )}

        <div className="text-center pt-8">
          <Button variant="outline" asChild className="border-border text-foreground hover:bg-primary hover:text-primary-foreground font-sans uppercase tracking-widest text-xs px-8 py-6">
            <Link href="https://github.com/himanshu07p/bandipur-website" target="_blank">
              <Github className="mr-2 h-4 w-4" />
              View Source Code
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
