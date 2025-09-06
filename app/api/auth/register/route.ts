import { NextResponse } from "next/server";
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    console.log('Registration request received');
    const body = await request.json();
    console.log('Request body:', { ...body, password: '[HIDDEN]' });
    
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      role,
      department,
      facultyId 
    } = body;

    // Convert to the format expected by the User model
    const first_name = firstName;
    const last_name = lastName;

    // Validate faculty registration
    if (role === 'faculty' && !facultyId) {
      return NextResponse.json(
        { error: 'Faculty ID is required for faculty registration' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with role-specific fields
    const userData = {
      email,
      password: hashedPassword,
      first_name,
      last_name,
      role: role || 'student',
      department,
      ...(role === 'faculty' ? {
        faculty_id: facultyId,
        approved: false  // Faculty accounts need approval
      } : {
        student_id: null,
        cgpa: 0
      })
    };
    
    console.log('Creating user with data:', { ...userData, password: '[HIDDEN]' });
    
    const user = await User.create(userData);
    
    console.log('Created user:', { 
      id: user._id,
      email: user.email,
      hasPassword: !!user.password 
    });

    return NextResponse.json(
      { 
        message: 'User created successfully', 
        user: { 
          email: user.email, 
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    
    // MongoDB validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation error', details: validationErrors },
        { status: 400 }
      );
    }

    // Duplicate key errors (e.g., email already exists)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { error: `${field} already exists` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
