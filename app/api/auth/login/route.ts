import { NextResponse } from "next/server";
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    // Connect to database
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email });
    
    console.log('Found user:', user); // Debug log
    
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    console.log('Attempting password comparison:');
    console.log('Input password:', password);
    console.log('Stored password:', user.password);

    if (!user.password) {
      return NextResponse.json({ 
        message: "Account setup incomplete. Please register again." 
      }, { status: 400 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    // Return user data (excluding password)
    const userData = {
      _id: user._id, // Changed from id to _id to match what the approval queue expects
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      department: user.department
    };

    return NextResponse.json({ 
      message: "Login successful!", 
      user: userData 
    }, { status: 200 });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
