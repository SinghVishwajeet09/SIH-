import { NextResponse } from "next/server"
import { getUserById, getActivitiesByStudent } from "@/lib/mock-data"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()
    
    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 })
    }

    const userIdNum = parseInt(userId)
    if (isNaN(userIdNum)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 })
    }

    // Get user info
    const user = getUserById(userIdNum)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Get user activities
    const activities = getActivitiesByStudent(userIdNum)
    
    // Generate HTML content for PDF
    const htmlContent = generatePortfolioHTML(user, activities)
    
    // In a real implementation, you would use a library like Puppeteer or jsPDF
    // For now, we'll return the HTML content that can be converted to PDF
    
    return NextResponse.json({
      message: "Portfolio generated successfully",
      downloadUrl: `/api/portfolio/download-pdf?userId=${userId}`,
      previewHtml: htmlContent
    })
  } catch (error) {
    console.error("Portfolio download error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

function generatePortfolioHTML(user: any, activities: any[]) {
  const approvedActivities = activities.filter(a => a.status === 'approved')
  const totalCredits = approvedActivities.reduce((sum, a) => sum + a.credits, 0)
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${user.first_name} ${user.last_name} - Portfolio</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .stats { display: flex; justify-content: space-around; margin: 20px 0; }
        .stat-box { text-align: center; padding: 15px; background: #f5f5f5; border-radius: 8px; }
        .activity { margin: 15px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
        .activity-title { font-weight: bold; color: #333; }
        .activity-meta { color: #666; font-size: 14px; margin: 5px 0; }
        .badge { padding: 4px 8px; background: #e3f2fd; color: #1976d2; border-radius: 4px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${user.first_name} ${user.last_name}</h1>
        <p>Student ID: ${user.student_id || 'N/A'} | Department: ${user.department || 'N/A'}</p>
        <p>Email: ${user.email}</p>
      </div>
      
      <div class="stats">
        <div class="stat-box">
          <h3>${totalCredits}</h3>
          <p>Total Credits</p>
        </div>
        <div class="stat-box">
          <h3>${approvedActivities.length}</h3>
          <p>Approved Activities</p>
        </div>
        <div class="stat-box">
          <h3>${activities.length}</h3>
          <p>Total Activities</p>
        </div>
      </div>
      
      <h2>Activities</h2>
      ${activities.map(activity => `
        <div class="activity">
          <div class="activity-title">${activity.title}</div>
          <div class="activity-meta">
            <span class="badge">${activity.category}</span>
            <span class="badge">${activity.status}</span>
            Credits: ${activity.credits}
          </div>
          <p>${activity.description}</p>
          <small>Created: ${new Date(activity.created_at).toLocaleDateString()}</small>
        </div>
      `).join('')}
      
      <div style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
        Generated on ${new Date().toLocaleDateString()} by Smart Student Hub
      </div>
    </body>
    </html>
  `
}
