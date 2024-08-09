import mongoose from 'mongoose';

const { Schema } = mongoose;

const TrafficCourtSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  trafficCounty: {
    type: Schema.Types.ObjectId,
    ref: 'TrafficCounty',
    required: true,
  },
  trafficState: {
    type: Schema.Types.ObjectId,
    ref: 'TrafficState',
    required: true,
  },
  stateShortName: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.TrafficCourt || mongoose.model('TrafficCourt', TrafficCourtSchema);
