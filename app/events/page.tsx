import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="container py-12 md:py-24 space-y-12 md:space-y-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif font-light tracking-tighter">Events <span className="italic">Hub</span></h1>
            <p className="text-muted-foreground text-xl font-sans font-light max-w-xl">
              Where the ecosystem comes alive. Join webinars, competitions, and community gatherings.
            </p>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full space-y-12">
          <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0 space-x-8">
            <TabsTrigger value="upcoming" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground text-lg font-serif italic px-0 py-4 transition-all">Upcoming</TabsTrigger>
            <TabsTrigger value="past" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground text-lg font-serif italic px-0 py-4 transition-all">Past Recordings</TabsTrigger>
            <TabsTrigger value="competitions" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground text-lg font-serif italic px-0 py-4 transition-all">Competitions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid gap-12">
              {/* Featured Event Card - Redesigned */}
              <div className="group relative overflow-hidden rounded-3xl bg-black border border-white/10 hover:border-white/20 transition-all duration-700 shadow-2xl">
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Image Section - Instagram Portrait Ratio (4:5) */}
                  <div className="relative md:col-span-2 aspect-[4/5] md:aspect-auto md:h-full overflow-hidden bg-black group/image">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 md:hidden" />
                    <div className="absolute inset-0 flex items-center justify-center group-hover/image:scale-105 transition-transform duration-1000">
                       <img src="/images/events/image.png" alt="Chennai Meetup" className="w-full h-full object-cover" />
                    </div>
                    <Badge className="absolute top-6 left-6 z-20 bg-white text-black hover:bg-white/90 border-none font-sans uppercase tracking-widest text-xs px-4 py-2 shadow-lg">
                      Featured
                    </Badge>
                  </div>

                  {/* Content Section */}
                  <div className="relative md:col-span-3 p-8 md:p-12 flex flex-col justify-center space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-primary">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm font-sans uppercase tracking-[0.2em] font-bold">Community</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight text-white">
                        Chennai <span className="italic font-normal text-zinc-400 group-hover:text-white transition-colors duration-500">Meetup</span>
                      </h2>
                      <p className="text-lg text-zinc-300 font-sans font-light leading-relaxed max-w-md">
                        Join the Bandipur community for an afternoon of networking, discussions, and exploration at the historic Rail Museum.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/10">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-wider">
                          <Calendar className="h-3 w-3" /> Date
                        </div>
                        <p className="font-serif text-xl text-zinc-100">Dec 7, 2025</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-wider">
                          <Clock className="h-3 w-3" /> Time
                        </div>
                        <p className="font-serif text-xl text-zinc-100">2:00 PM onwards</p>
                      </div>
                      <div className="col-span-2 space-y-1">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-wider">
                          <MapPin className="h-3 w-3" /> Location
                        </div>
                        <p className="font-serif text-xl text-zinc-100">Chennai Rail Museum</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90 font-sans uppercase tracking-widest text-xs h-14 px-8">
                        Register Now
                      </Button>
                      <Button variant="outline" size="lg" className="rounded-full bg-transparent border border-white text-white hover:bg-white hover:text-black font-sans uppercase tracking-widest text-xs h-14 px-8 transition-colors duration-300">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="mt-8">
            <div className="border border-dashed border-border rounded-lg p-24 text-center">
              <p className="text-muted-foreground font-serif italic text-xl">No past recordings available yet.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="competitions" className="mt-8">
            <div className="border border-dashed border-border rounded-lg p-24 text-center">
               <p className="text-muted-foreground font-serif italic text-xl">No active competitions at the moment.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
