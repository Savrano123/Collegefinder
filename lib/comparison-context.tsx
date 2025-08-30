"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { College } from '@/lib/supabase'
import { toast } from '@/components/ui/use-toast'

interface ComparisonContextType {
  comparedColleges: College[]
  addToComparison: (college: College) => void
  removeFromComparison: (collegeId: string) => void
  clearComparison: () => void
  isInComparison: (collegeId: string) => boolean
  comparisonCount: number
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [comparedColleges, setComparedColleges] = useState<College[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('compared-colleges')
    if (saved) {
      try {
        setComparedColleges(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading compared colleges:', error)
      }
    }
  }, [])

  // Save to localStorage whenever comparedColleges changes
  useEffect(() => {
    localStorage.setItem('compared-colleges', JSON.stringify(comparedColleges))
  }, [comparedColleges])

  const addToComparison = (college: College) => {
    if (comparedColleges.length >= 4) {
      toast({
        title: "Comparison Limit Reached",
        description: "You can compare up to 4 colleges at a time. Remove a college to add a new one.",
        variant: "destructive",
      })
      return
    }

    if (comparedColleges.some(c => c.id === college.id)) {
      toast({
        title: "Already Added",
        description: `${college.name} is already in your comparison list.`,
        variant: "destructive",
      })
      return
    }

    setComparedColleges(prev => [...prev, college])
    toast({
      title: "Added to Comparison",
      description: `${college.name} has been added to your comparison list.`,
    })
  }

  const removeFromComparison = (collegeId: string) => {
    const college = comparedColleges.find(c => c.id === collegeId)
    setComparedColleges(prev => prev.filter(c => c.id !== collegeId))
    
    if (college) {
      toast({
        title: "Removed from Comparison",
        description: `${college.name} has been removed from your comparison list.`,
      })
    }
  }

  const clearComparison = () => {
    setComparedColleges([])
    toast({
      title: "Comparison Cleared",
      description: "All colleges have been removed from your comparison list.",
    })
  }

  const isInComparison = (collegeId: string) => {
    return comparedColleges.some(c => c.id === collegeId)
  }

  const comparisonCount = comparedColleges.length

  return (
    <ComparisonContext.Provider
      value={{
        comparedColleges,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        comparisonCount,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider')
  }
  return context
}
