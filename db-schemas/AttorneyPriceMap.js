import mongoose from 'mongoose'

const AttorneyPriceMapSchema = new mongoose.Schema({
  attorney: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attorney',
    required: true,
  },
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrafficCourt',
  },
  county: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrafficCounty',
  },
  violation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Violation',
  },
  points: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

export default mongoose.model('AttorneyPriceMap', AttorneyPriceMapSchema)
