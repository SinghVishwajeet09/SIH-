import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function GET() {
  try {
    await connectDB()
    const user = await User.findOne() // Add proper authentication logic here
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}
