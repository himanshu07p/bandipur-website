import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-12 md:py-24 space-y-12 md:space-y-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-8xl font-serif font-light tracking-tighter">Get in <span className="italic">Touch</span>.</h1>
          <p className="text-xl text-muted-foreground font-sans font-light max-w-2xl mx-auto">
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif">Send us a message</h2>
              <p className="text-muted-foreground font-sans font-light">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-sans uppercase tracking-widest text-muted-foreground">First Name</label>
                  <Input id="first-name" placeholder="Jane" className="bg-card border-border rounded-none h-12 focus-visible:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-sans uppercase tracking-widest text-muted-foreground">Last Name</label>
                  <Input id="last-name" placeholder="Doe" className="bg-card border-border rounded-none h-12 focus-visible:ring-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-sans uppercase tracking-widest text-muted-foreground">Email</label>
                <Input id="email" type="email" placeholder="jane@example.com" className="bg-card border-border rounded-none h-12 focus-visible:ring-primary" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-sans uppercase tracking-widest text-muted-foreground">Message</label>
                <Textarea id="message" placeholder="Your message..." className="bg-card border-border rounded-none min-h-[150px] focus-visible:ring-primary" />
              </div>
              <Button type="submit" className="w-full md:w-auto px-8 py-6 bg-foreground text-background hover:bg-foreground/90 rounded-none font-sans uppercase tracking-widest text-xs">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-12 lg:pl-12 lg:border-l border-border">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif italic">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div className="space-y-1">
                    <p className="font-sans font-medium">Address</p>
                    <p className="text-muted-foreground font-sans font-light">
                      Bandipur House, IIT Madras<br />
                      Chennai, Tamil Nadu 600036<br />
                      India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div className="space-y-1">
                    <p className="font-sans font-medium">Email</p>
                    <p className="text-muted-foreground font-sans font-light">
                      secretary@bandipur.com<br />
                      webops@bandipur.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div className="space-y-1">
                    <p className="font-sans font-medium">Phone</p>
                    <p className="text-muted-foreground font-sans font-light">
                      +91 98765 43210
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-serif italic">Office Hours</h3>
              <div className="space-y-2 text-muted-foreground font-sans font-light">
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
