import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk, DM_Sans } from "next/font/google"
import { AuthProvider } from "@/lib/auth"
import { ComparisonProvider } from "@/lib/comparison-context"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "CollegeHub - Find Your Perfect College",
  description:
    "Comprehensive college information platform with real student reviews, detailed insights, and admission guidance.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
      <body className={inter.className}>
        <AuthProvider>
          <ComparisonProvider>
            {children}
            <Toaster />
          </ComparisonProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
