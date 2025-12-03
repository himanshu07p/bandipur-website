"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Lock } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin")
  const [password, setPassword] = useState("admin")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    // Hardcoded bypass for demonstration
    if ((cleanEmail === "admin@bandipur.com" || cleanEmail === "admin") && cleanPassword === "admin") {
      toast.success("Welcome back", {
        description: "Redirecting to dashboard...",
      })
      
      router.push("/admin/dashboard")
      router.refresh()
      return
    }

    // For now, disable real auth to prevent hanging on localhost connection
    // if Supabase is not running locally.
    toast.error("Invalid credentials", {
      description: "Please use the demo admin credentials.",
    })
    setIsLoading(false)
    
    /* 
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      ...
    } 
    */
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/home/hero.gif')] bg-cover bg-center opacity-20" />
      
      <Card className="w-full max-w-md bg-black/80 backdrop-blur-xl border-white/10 relative z-10">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-serif font-light text-white">Admin Access</CardTitle>
            <CardDescription className="text-white/40 font-sans uppercase tracking-widest text-xs">
              Enter your credentials to continue
            </CardDescription>
            <p className="text-[10px] text-white/30 font-sans mt-2">
              (Demo: admin / admin)
            </p>
          </div>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/60 font-sans text-xs uppercase tracking-wider">Email or Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="admin or admin@bandipur.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-white/20 h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/60 font-sans text-xs uppercase tracking-wider">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-white/20 h-12"
              />
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <Button 
              type="submit" 
              className="w-full bg-white text-black hover:bg-white/90 h-12 font-sans uppercase tracking-widest text-xs"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
