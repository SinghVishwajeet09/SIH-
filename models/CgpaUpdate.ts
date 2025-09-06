import mongoose from 'mongoose';

const cgpaUpdateSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentDepartment: {
    type: String,
    required: true,
    default: 'General'
  },
  currentCgpa: {
    type: Number,
    required: true
  },
  newCgpa: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  semester: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  documents: [{
    name: String,
    url: String
  }],
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: String
}, {
  timestamps: true
});

export default mongoose.models.CgpaUpdate || mongoose.model('CgpaUpdate', cgpaUpdateSchema);
