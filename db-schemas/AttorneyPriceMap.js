import mongoose from 'mongoose';

const { Schema } = mongoose;

const AttorneyPriceMapSchema = new Schema({
  attorney: {
    type: Schema.Types.ObjectId,
    ref: 'Attorney',
    required: true,
  },
  court: {
    type: Schema.Types.ObjectId,
    ref: 'TrafficCourt',
  },
  county: {
    type: Schema.Types.ObjectId,
    ref: 'TrafficCounty',
  },
  violation: {
    type: Schema.Types.ObjectId,
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
});

export default mongoose.models.AttorneyPriceMap || mongoose.model('AttorneyPriceMap', AttorneyPriceMapSchema);
