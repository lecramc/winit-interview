import mongoose from 'mongoose';

const { Schema } = mongoose;

const ViolationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Violation || mongoose.model('Violation', ViolationSchema);
