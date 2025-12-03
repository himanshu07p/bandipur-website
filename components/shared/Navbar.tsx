"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Resources", href: "/resources" },
  { name: "Clubs", href: "/clubs" },
  { name: "Team", href: "/team" },
]

import Image from "next/image"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-black">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Bandipur House Logo" width={32} height={32} className="w-8 h-8 object-contain" />
          <span className="text-2xl font-serif font-medium tracking-tight text-foreground">Bandipur House</span>
        </Link>

        {/* Desktop Nav Items Distributed Evenly */}
        <div className="hidden md:contents">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-sans tracking-wide transition-colors hover:text-black ${
                pathname === item.href ? "text-black font-semibold" : "text-black/70"
              }`}
            >
              {item.name}
            </Link>
          ))}
          {pathname !== "/admin/login" && (
            <Button variant="outline" className="border-black/20 text-black hover:bg-black hover:text-white" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-10 w-10 p-0 hover:bg-transparent">
                <div className="flex flex-col gap-1.5 w-6 items-end">
                  <span className={`h-0.5 bg-foreground transition-all duration-300 ease-in-out ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
                  <span className={`h-0.5 bg-foreground transition-all duration-300 ease-in-out ${isOpen ? "w-0 opacity-0" : "w-4"}`} />
                  <span className={`h-0.5 bg-foreground transition-all duration-300 ease-in-out ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-3"}`} />
                </div>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full h-screen bg-zinc-950/98 border-none text-white flex flex-col items-center justify-center p-0 [&>button[class*='absolute']]:hidden">
              {/* Custom Close Button (same position as trigger) */}
              <div className="absolute top-4 right-4 container flex justify-end">
                 <Button variant="ghost" size="icon" className="relative h-10 w-10 p-0 hover:bg-transparent text-white" onClick={() => setIsOpen(false)}>
                  <div className="flex flex-col gap-1.5 w-6 items-end">
                    <span className="h-0.5 w-6 bg-white rotate-45 translate-y-2" />
                    <span className="h-0.5 w-0 bg-white opacity-0" />
                    <span className="h-0.5 w-6 bg-white -rotate-45 -translate-y-2" />
                  </div>
                </Button>
              </div>

              <div className="flex flex-col space-y-8 text-center">
                {navItems.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-5xl font-serif font-light tracking-tight transition-all duration-500 hover:text-primary hover:scale-110 hover:italic ${
                      pathname === item.href ? "text-white italic" : "text-white/50"
                    }`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <span className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-backwards">
                      {item.name}
                    </span>
                  </Link>
                ))}
                <div className="pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-backwards">
                  <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90 font-sans uppercase tracking-widest text-xs h-14 px-12 transition-all duration-300" asChild>
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
