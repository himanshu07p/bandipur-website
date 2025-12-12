import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = await createClient()
  const { data: rawEvents } = await supabase.from('events').select('title, status, poster_url').eq('status', 'Upcoming').order('event_date', { ascending: true }).limit(5)
  
  // Fallback if no events
  const displayEvents = rawEvents && rawEvents.length > 0 ? rawEvents : [
    { title: "No Upcoming Events", status: "Stay Tuned", poster_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" }
  ]

  // Duplicate events enough times to ensure they cover even large screens before the marquee duplication logic kicks in
  // We need a critical mass of items for the marquee to look good.
  const EVENTS = [...displayEvents, ...displayEvents, ...displayEvents, ...displayEvents].slice(0, 12); 

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden">
      {/* Quote Section (Moved Above Hero) */}
      <section className="py-16 md:py-32 container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-3 pt-12">
          <p className="text-sm md:text-base text-muted-foreground font-serif tracking-wide">
            "We don't just exist; we move, we build, and we conquer."
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-italiana font-bold leading-[1.2] tracking-wide text-black">
            Like the <span className="italic">Bandipur National Park</span>, we are a diverse array of <span className="italic">fauna</span> and ethereal <span className="italic">flora</span>.
          </h2>
        </div>
      </section>

      {/* Image Marquee Section */}
      <div className="w-full max-w-[100vw] overflow-hidden bg-transparent py-12 border-y border-border/10 group/marquee">
        <div className="animate-marquee whitespace-nowrap flex items-center group-hover/marquee:[animation-play-state:paused] will-change-transform w-max">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center shrink-0">
              {EVENTS.map((event, i) => (
                <div key={`${setIndex}-${i}`} className="relative w-[250px] h-[300px] rounded-lg overflow-hidden bg-muted group transition-transform duration-500 group-hover/marquee:scale-95 mr-4 shrink-0">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={event.poster_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className={`text-xs font-sans uppercase tracking-widest px-2 py-1 rounded-sm shadow-sm ${event.status === 'Upcoming' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-serif italic text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 drop-shadow-md">
                    {event.title}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* "HOW WE DIFFER" Style Section (Moved Above Hero) */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div className="text-center md:text-left">
              <h2 className="text-6xl md:text-8xl lg:text-[14rem] font-sans font-bold tracking-tighter text-foreground/90 leading-[0.8]">
                WHO<br />WE<br />ARE
              </h2>
            </div>
            <div className="space-y-12 pt-4 text-left">
              <div className="space-y-4 border-t border-border pt-8">
                <h3 className="text-3xl font-serif italic text-primary">The Story</h3>
                <p className="text-lg text-muted-foreground font-sans font-light leading-relaxed">
                  Bandipur House is named after the Tiger Reserve, symbolizing strength, rarity, and a thriving ecosystem. We are more than a student house; we are a professional network designed to foster growth and connection.
                </p>
              </div>
              <div className="space-y-4 border-t border-border pt-8">
                <h3 className="text-3xl font-serif italic text-primary">Our Mission</h3>
                <p className="text-lg text-muted-foreground font-sans font-light leading-relaxed">
                  To foster leadership and initiative. We enable an ecosystem of harmonized excellence where every student—from Kashmir to Kanyakumari—finds their tribe and thrives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-y-0 inset-x-4 md:inset-x-8 rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/home/hero.gif')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 container text-center px-4 space-y-12">
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-serif font-thin tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000 text-white">
            The House of <span className="italic font-normal">Motion</span>.
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto font-sans font-light tracking-wide animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 drop-shadow-lg">
            NURTURING THE BEST OF US. AN ECOSYSTEM OF <span className="text-white font-bold">4,000+</span> ASPIRING LEADERS.
          </p>
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
             <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-white/20 bg-black/20 text-white hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm" asChild>
              <Link href="/events">
                Explore Events
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Grid Section for Leadership */}
      <section className="py-32 container px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-[4/3] group overflow-hidden rounded-lg bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground text-lg font-sans">Leadership Image Placeholder</span>
            </div>
             <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs uppercase tracking-widest font-sans text-foreground shadow-sm">
              The Secretary
            </div>
            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-xl font-serif italic text-white/90">
                "This year, our focus is on technical upskilling and tightening our regional bonds."
              </p>
            </div>
          </div>
           <div className="flex flex-col justify-center space-y-8 p-8 md:p-16 border border-border rounded-lg bg-card">
             <h3 className="text-4xl font-serif text-primary">Join the Legacy</h3>
             <p className="text-muted-foreground font-sans font-light">
               Be part of a community that values motion, growth, and integrity. Bandipur House is where your journey begins.
             </p>
             <Button variant="link" className="text-primary text-lg p-0 h-auto justify-start hover:no-underline group" asChild>
               <Link href="/team">
                 Meet the Team <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
               </Link>
             </Button>
           </div>
        </div>
      </section>
    </div>
  )
}
