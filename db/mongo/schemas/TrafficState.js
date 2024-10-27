import mongoose from 'mongoose'

const TrafficStateSchema = new mongoose.Schema({
  shortName: {
    type: String,
    required: true,
    unique: true,
  },
  longName: {
    type: String,
    required: true,
    unique: true,
  },
  enable: {
    type: Boolean,
    default: true,
  },
})

export default mongoose.models.TrafficState || mongoose.model('TrafficState', TrafficStateSchema)
