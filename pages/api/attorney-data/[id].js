import dbConnect from '@/utils/dbConnect';
import Attorney from '@/db-schemas/Attorney';
import AttorneyPriceMap from '@/db-schemas/AttorneyPriceMap';
import TrafficCourt from '@/db-schemas/TrafficCourt';
import TrafficCounty from '@/db-schemas/TrafficCounty';
import Violation from '@/db-schemas/Violation';
import TrafficState from '@/db-schemas/TrafficState';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const { name, email, phone, address, enabled, priceMaps } = req.body;

        const attorney = await Attorney.findById(id);
        if (!attorney) {
          return res.status(404).json({ success: false, error: 'Attorney not found' });
        }

        attorney.name = name;
        attorney.email = email;
        attorney.phone = phone;
        attorney.address = address;
        attorney.enabled = enabled;
        await attorney.save();

        if (priceMaps && priceMaps.length > 0) {
          await AttorneyPriceMap.deleteMany({ attorney: id });

          const priceMapPromises = priceMaps.map(async (priceMap) => {
            const { court, county, violation, points, price } = priceMap;

            let courtDoc;
            if (ObjectId.isValid(court)) {
              courtDoc = await TrafficCourt.findById(court);
            } else {
              courtDoc = await TrafficCourt.findOne({ name: court });
              if (!courtDoc) {
                const trafficState = await TrafficState.findOne({ shortName: 'NY' });
                if (!trafficState) {
                  throw new Error('TrafficState not found');
                }
                courtDoc = new TrafficCourt({
                  name: court,
                  address: '',
                  trafficCounty: new ObjectId(),
                  trafficState: trafficState._id,
                  stateShortName: trafficState.shortName,
                  enabled: true,
                });
                await courtDoc.save();
              }
            }

            let countyDoc;
            if (ObjectId.isValid(county)) {
              countyDoc = await TrafficCounty.findById(county);
            } else {
              countyDoc = await TrafficCounty.findOne({ name: county });
              if (!countyDoc) {
                const trafficState = await TrafficState.findOne({ shortName: 'NY' });
                if (!trafficState) {
                  throw new Error('TrafficState not found');
                }
                countyDoc = new TrafficCounty({
                  name: county,
                  trafficState: trafficState._id,
                  stateShortName: trafficState.shortName,
                  enabled: true,
                });
                await countyDoc.save();
              }
            }

            let violationDoc;
            if (ObjectId.isValid(violation)) {
              violationDoc = await Violation.findById(violation);
            } else {
              violationDoc = await Violation.findOne({ name: violation });
              if (!violationDoc) {
                violationDoc = new Violation({ name: violation, points });
                await violationDoc.save();
              }
            }

            return new AttorneyPriceMap({
              attorney: id,
              court: courtDoc._id,
              county: countyDoc._id,
              violation: violationDoc._id,
              points,
              price,
            }).save();
          });

          await Promise.all(priceMapPromises);
        }

        res.status(200).json({ success: true, data: attorney });
      } catch (error) {
        console.error('Error updating attorney:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
