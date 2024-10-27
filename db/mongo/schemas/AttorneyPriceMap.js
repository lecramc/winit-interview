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
  pointsRange: {
    type: [Number],
  },
  price: {
    type: Number,
    required: true,
  },
  enable: {
    type: Boolean,
    default: true,
  },
})

AttorneyPriceMapSchema.pre('validate', function (next) {
  if (
    !this.court &&
    !this.county &&
    !this.violation &&
    !(this.pointsRange && this.pointsRange.length === 2)
  ) {
    return next(
      new Error(
        'At least one of the fields short, county, violation or pointsRange must be defined.',
      ),
    )
  }
  next()
})

export default mongoose.models.AttorneyPriceMap ||
  mongoose.model('AttorneyPriceMap', AttorneyPriceMapSchema)
