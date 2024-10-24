import mongoose from 'mongoose'

const AttorneyPriceMapSchema = new mongoose.Schema(
  {
    attorney: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attorney',
      required: true,
    },
    court: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TrafficCourt',
      required: function () {
        return !this.county && !this.violation
      },
    },
    county: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TrafficCounty',
      required: function () {
        return !this.court && !this.violation
      },
    },
    violation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Violation',
      required: function () {
        return !this.court && !this.county
      },
    },
    pointsRange: {
      type: [Number, Number],
      default: undefined,
      required: function () {
        return !this.violation
      },
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)
export default mongoose.models.AttorneyPriceMap ||
  mongoose.model('AttorneyPriceMap', AttorneyPriceMapSchema)
