"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Settings, GraduationCap } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function FacultyHeader() {
  const router = useRouter()

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
              <a href="/faculty" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <a
                href="/faculty/approvals"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Approvals
              </a>
              <a
                href="/faculty/analytics"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Analytics
              </a>
              <a
                href="/faculty/settings"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Settings
              </a>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
            </Button>

            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/faculty-profile.png" alt="Prof. Smith" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Prof. John Smith</p>
                    <p className="text-xs leading-none text-muted-foreground">Computer Science Department</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Delegation Settings</DropdownMenuItem>
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
