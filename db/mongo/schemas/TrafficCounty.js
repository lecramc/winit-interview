import mongoose from 'mongoose'

const TrafficCountySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  trafficState: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrafficState',
    required: true,
  },

  enable: {
    type: Boolean,
    default: true,
  },
})

export default mongoose.models.TrafficCounty || mongoose.model('TrafficCounty', TrafficCountySchema)
