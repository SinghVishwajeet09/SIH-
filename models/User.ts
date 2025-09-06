import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: ['student', 'faculty'],
    default: 'student' 
  },
  department: { 
    type: String, 
    required: function() {
      return this.role === 'faculty';
    }
  },
  // Student specific fields
  student_id: String,
  cgpa: { 
    type: Number, 
    min: 0, 
    max: 10, 
    default: 0 
  },
  // Faculty specific fields
  faculty_id: { 
    type: String,
    sparse: true, // Allows null/undefined but ensures uniqueness when present
    unique: true  // Ensures faculty_id is unique when present
  },
  approved: {
    type: Boolean,
    default: false // Faculty accounts need approval
  }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);
