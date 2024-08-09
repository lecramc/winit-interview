import mongoose from 'mongoose';

const { Schema } = mongoose;

const TrafficCountySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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

export default mongoose.models.TrafficCounty || mongoose.model('TrafficCounty', TrafficCountySchema);
