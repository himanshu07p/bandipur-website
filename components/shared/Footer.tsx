"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  const pathname = usePathname()

  if (pathname === "/admin/login") return null

  return (
    <footer className="w-full bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-foreground/20 border-2 border-foreground/20">
          
          {/* Row 1, Col 1: Brand */}
          <div className="p-6 md:p-8 h-48 flex flex-col justify-between border-b-2 md:border-b-0 border-foreground/20">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Bandipur House Logo" width={40} height={40} className="w-10 h-10 object-contain" />
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold tracking-tight">Bandipur House</span>
                <span className="text-xs font-sans font-semibold tracking-wider text-black uppercase">IIT Madras</span>
              </div>
            </Link>
          </div>

          {/* Row 1, Col 2: What we do (Navigation) */}
          <div className="p-6 md:p-8 h-48 border-b-2 md:border-b-0 border-foreground/20">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest mb-4 text-muted-foreground">Explore</h3>
            <ul className="space-y-2 text-base font-serif text-foreground/80">
              <li><Link href="/events" className="hover:text-foreground transition-colors">Events Hub</Link></li>
              <li><Link href="/resources" className="hover:text-foreground transition-colors">Resources</Link></li>
              <li><Link href="/clubs" className="hover:text-foreground transition-colors">Clubs</Link></li>
              <li><Link href="/team" className="hover:text-foreground transition-colors">Team</Link></li>
            </ul>
          </div>

          {/* Row 1, Col 3: Initiatives (Filled Empty Cell) */}
          <div className="p-6 md:p-8 h-48 border-b-2 md:border-b-0 border-foreground/20">
             <h3 className="font-sans font-bold text-xs uppercase tracking-widest mb-4 text-muted-foreground">Initiatives</h3>
             <ul className="space-y-2 text-base font-serif text-foreground/80">
               <li><Link href="/events?tab=competitions" className="hover:text-foreground transition-colors">House Cup</Link></li>
               <li><Link href="/resources" className="hover:text-foreground transition-colors">Mentorship</Link></li>
               <li><Link href="/clubs" className="hover:text-foreground transition-colors">Startups</Link></li>
             </ul>
          </div>

          {/* Row 1, Col 4: General (Admin) */}
          <div className="p-6 md:p-8 h-48 border-b-2 md:border-b-0 border-foreground/20">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest mb-4 text-muted-foreground">General</h3>
            <ul className="space-y-2 text-base font-serif text-foreground/80">
               <li><Link href="/admin/login" className="hover:text-foreground transition-colors">Admin Portal</Link></li>
               <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-foreground/20 border-x-2 border-b-2 border-foreground/20">
           {/* Row 2, Col 1: Offices (Address) */}
          <div className="p-6 md:p-8 h-56">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest mb-4 text-muted-foreground">Address</h3>
            <div className="space-y-2 text-foreground/60 font-serif text-base">
              <p>IIT Madras<br/>Chennai, Tamil Nadu<br/>600036</p>
              <p>secretary@bandipur.com</p>
            </div>
          </div>

          {/* Row 2, Col 2: External (Socials) */}
          <div className="p-6 md:p-8 h-56">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest mb-4 text-muted-foreground">Connect</h3>
            <ul className="space-y-2 text-base font-serif text-foreground/80">
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Instagram</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a></li>
            </ul>
          </div>

          {/* Row 2, Col 3: Contact Button (6th Cell) */}
          <div className="p-6 md:p-8 h-56 flex items-center justify-center">
             <Button variant="outline" className="w-full h-12 border-2 border-foreground/20 text-foreground hover:bg-foreground hover:text-background font-sans uppercase tracking-widest text-xs" asChild>
               <Link href="/contact">Contact Us</Link>
             </Button>
          </div>

          {/* Row 2, Col 4: Write us (Newsletter) */}
          <div className="p-6 md:p-8 h-56 bg-muted/30">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest mb-4 text-muted-foreground">Stay Updated</h3>
            <div className="space-y-2">
              <Input 
                placeholder="Full Name" 
                className="bg-transparent border-foreground/30 rounded-none h-10 focus-visible:ring-foreground/50 text-foreground placeholder:text-muted-foreground"
              />
              <Input 
                placeholder="your@email.com" 
                className="bg-transparent border-foreground/30 rounded-none h-10 focus-visible:ring-foreground/50 text-foreground placeholder:text-muted-foreground"
              />
              <Button className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none h-10 font-sans uppercase tracking-widest text-[10px]">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Large Footer Text */}
      <div className="w-full border-y-2 border-foreground/20 py-12 md:py-24 flex items-center justify-center overflow-hidden px-4">
           <h1 className="text-[9vw] font-sans font-bold tracking-tighter text-foreground/90 leading-[0.8] text-center whitespace-nowrap">
              THE HOUSE OF MOTION
           </h1>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 text-center bg-background">
        <p className="text-[10px] text-muted-foreground font-sans uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Bandipur House. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
