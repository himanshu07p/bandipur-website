import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Search, FileText, BookOpen, GraduationCap } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-12 md:py-24 space-y-12 md:space-y-24">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-8xl font-serif font-light tracking-tighter">The <span className="italic">Academic</span> Arsenal.</h1>
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search for 'Stats 2', 'Python', or 'Tips'..." 
              className="pl-12 h-16 text-lg bg-card border-border rounded-none focus-visible:ring-0 focus-visible:border-primary text-foreground placeholder:text-muted-foreground font-sans font-light transition-all"
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-500 cursor-pointer group rounded-none">
            <CardHeader className="space-y-4">
              <FileText className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="space-y-1">
                <CardTitle className="text-2xl font-serif font-light group-hover:translate-x-2 transition-transform duration-500">Lecture Notes</CardTitle>
                <CardDescription className="text-muted-foreground font-sans uppercase tracking-widest text-xs">PDF uploads by toppers</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground font-sans font-light leading-relaxed">
                Comprehensive notes for all terms, curated by the best minds.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:shadow-lg transition-all duration-500 cursor-pointer group rounded-none">
            <CardHeader className="space-y-4">
              <BookOpen className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="space-y-1">
                <CardTitle className="text-2xl font-serif font-light group-hover:translate-x-2 transition-transform duration-500">PYQs</CardTitle>
                <CardDescription className="text-muted-foreground font-sans uppercase tracking-widest text-xs">Previous Year Question papers</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground font-sans font-light leading-relaxed">
                Organized by Term and Subject to help you ace your exams.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:shadow-lg transition-all duration-500 cursor-pointer group rounded-none">
            <CardHeader className="space-y-4">
              <GraduationCap className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="space-y-1">
                <CardTitle className="text-2xl font-serif font-light group-hover:translate-x-2 transition-transform duration-500">Senior Wisdom</CardTitle>
                <CardDescription className="text-muted-foreground font-sans uppercase tracking-widest text-xs">Blog-style advice</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground font-sans font-light leading-relaxed">
                "How to balance a job and the BS degree" and other survival guides.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
