import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface PortfolioPreviewProps {
  userId: number
}

export function PortfolioPreview({ userId }: PortfolioPreviewProps) {
  const [portfolioData, setPortfolioData] = useState({
    totalActivities: 0,
    totalCredits: 0,
    lastUpdated: new Date().toLocaleDateString()
  })
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch(`/api/dashboard/stats?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          setPortfolioData({
            totalActivities: data.totalActivities,
            totalCredits: data.totalCredits,
            lastUpdated: new Date().toLocaleDateString()
          })
        }
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchPortfolioData()
    }
  }, [userId])

  const handlePreview = () => {
    router.push('/portfolio')
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const response = await fetch('/api/portfolio/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Create a new window with the portfolio HTML
        const newWindow = window.open('', '_blank')
        if (newWindow) {
          newWindow.document.write(data.previewHtml)
          newWindow.document.close()
          
          // Add print functionality
          setTimeout(() => {
            newWindow.print()
          }, 1000)
        }
      } else {
        alert('Failed to generate portfolio')
      }
    } catch (error) {
      console.error('Download error:', error)
      alert('An error occurred while generating portfolio')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Preview</CardTitle>
          <CardDescription>Your comprehensive activity portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center animate-pulse">
              <div className="text-center">
                <div className="h-6 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Preview</CardTitle>
        <CardDescription>Your comprehensive activity portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">Portfolio</div>
              <div className="text-sm text-muted-foreground">
                {portfolioData.totalActivities} Activities • {portfolioData.totalCredits} Credits
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="gap-2 bg-transparent"
              onClick={handlePreview}
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button 
              size="sm" 
              className="gap-2"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              {downloading ? 'Generating...' : 'Download'}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Last updated: {portfolioData.lastUpdated}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
