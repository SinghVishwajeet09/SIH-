import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Download, Settings, GraduationCap } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AnalyticsHeader() {
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
              <a
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/activities"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Activities
              </a>
              <a href="/analytics" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Analytics
              </a>
              <a
                href="/portfolio"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Portfolio
              </a>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export Report
            </Button>

            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/diverse-student-profiles.png" alt="Alice Cooper" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Alice Cooper</p>
                    <p className="text-xs leading-none text-muted-foreground">STU001 • Computer Science</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Analytics Preferences</DropdownMenuItem>
                <DropdownMenuItem>Help & Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
