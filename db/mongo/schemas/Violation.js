import mongoose from 'mongoose'

const ViolationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    required: true,
  },
  enable: {
    type: Boolean,
    default: true,
  },
})

export default mongoose.models.Violation || mongoose.model('Violation', ViolationSchema)
