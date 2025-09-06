import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Plus, GraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('currentUser')
    router.push('/login')
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold text-foreground">Smart Student Hub</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <a
                href="/activities"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Activities
              </a>
              <a
                href="/portfolio"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Portfolio
              </a>
              <a
                href="/goals"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Goals
              </a>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Button size="sm" className="gap-2" onClick={() => router.push('/activities')}>
              <Plus className="h-4 w-4" />
              Add Activity
            </Button>

            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/diverse-student-profiles.png" alt={user?.first_name || "User"} />
                    <AvatarFallback>
                      {user?.first_name?.[0]}{user?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.student_id} • {user?.department}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuItem>Help & Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
