"use client"

import { useState, useEffect } from "react"
import {
  GraduationCap,
  Search,
  Menu,
  X,
  User,
  Heart,
  BarChart3,
  Bell,
  Moon,
  Sun,
  Home,
  Users,
  GitCompare,
  Info,
  Phone,
} from "lucide-react"
import { useComparison } from "@/lib/comparison-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { comparisonCount } = useComparison()

  const searchSuggestions = [
    "IIT Bombay",
    "NIT Trichy",
    "IIIT Hyderabad",
    "VIT Vellore",
    "BITS Pilani",
    "Computer Science",
    "Mechanical Engineering",
    "Electronics",
    "Civil Engineering",
  ]

  const filteredSuggestions = searchSuggestions
    .filter((suggestion) => suggestion.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 5)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <header className="border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold font-space-grotesk gradient-text">CollegeHub</span>
          </Link>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Slider Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <span>CollegeHub Menu</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-6 mt-8">
                  {/* Navigation Links */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Navigation
                    </h3>
                    <Link
                      href="/"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Home className="h-5 w-5 text-primary" />
                      <span className="font-medium">Home</span>
                    </Link>
                    <Link
                      href="/community"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Users className="h-5 w-5 text-primary" />
                      <span className="font-medium">Community</span>
                    </Link>
                    <Link
                      href="/compare"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <GitCompare className="h-5 w-5 text-primary" />
                      <span className="font-medium">Compare Colleges</span>
                    </Link>
                    <Link
                      href="/about"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Info className="h-5 w-5 text-primary" />
                      <span className="font-medium">About</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="font-medium">Contact</span>
                    </Link>
                  </div>

                  <Separator />

                  {/* Admin Access */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Administration
                    </h3>
                    <Link
                      href="/admin/login"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors border border-primary/20 bg-primary/5"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5 text-primary" />
                      <span className="font-medium text-primary">Admin Login</span>
                    </Link>
                  </div>

                  <Separator />

                  {/* Quick Actions */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Quick Actions
                    </h3>
                    <Button variant="ghost" className="w-full justify-start space-x-3 px-3 py-2 h-auto hover:bg-muted">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span>Saved Colleges</span>
                      <Badge className="ml-auto bg-red-100 text-red-700">3</Badge>
                    </Button>
                    <Link href="/compare" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start space-x-3 px-3 py-2 h-auto hover:bg-muted">
                        <GitCompare className="h-5 w-5 text-blue-500" />
                        <span>My Comparisons</span>
                        {comparisonCount > 0 && (
                          <Badge className="ml-auto bg-blue-100 text-blue-700">{comparisonCount}</Badge>
                        )}
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start space-x-3 px-3 py-2 h-auto hover:bg-muted"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                    >
                      {isDarkMode ? (
                        <Sun className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Moon className="h-5 w-5 text-indigo-500" />
                      )}
                      <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                    </Button>
                  </div>

                  <Separator />

                  {/* User Section */}
                  <div className="space-y-4">
                    {isLoggedIn ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 px-3 py-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg" alt="User" />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold">
                              RS
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Rahul Sharma</p>
                            <p className="text-sm text-muted-foreground">rahul@example.com</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start space-x-3 px-3 py-2 h-auto hover:bg-muted"
                            >
                              <User className="h-5 w-5 text-primary" />
                              <span>My Profile</span>
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            className="w-full justify-start space-x-3 px-3 py-2 h-auto hover:bg-muted relative"
                          >
                            <Bell className="h-5 w-5 text-primary" />
                            <span>Notifications</span>
                            <Badge className="ml-auto bg-secondary text-secondary-foreground">3</Badge>
                          </Button>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => setIsLoggedIn(false)}
                        >
                          Log out
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                            Sign Up
                          </Button>
                        </Link>
                        <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="outline" className="w-full bg-transparent">
                            Login
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {isSearchOpen && (
          <div className="mt-6 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search colleges, courses, or locations..."
                className="pl-12 py-4 border-2 border-border focus:border-primary bg-card text-lg font-dm-sans"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-primary/10"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search suggestions */}
            {searchQuery && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 hover:bg-muted cursor-pointer transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg font-dm-sans"
                    onClick={() => {
                      setSearchQuery(suggestion)
                      setIsSearchOpen(false)
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span>{suggestion}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
