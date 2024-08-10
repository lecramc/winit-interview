import dbConnect from '@/utils/dbConnect';
import AttorneyPriceMap from '@/db-schemas/AttorneyPriceMap';
import TrafficCourt from '@/db-schemas/TrafficCourt';
import TrafficCounty from '@/db-schemas/TrafficCounty';
import Violation from '@/db-schemas/Violation';
import TrafficState from '@/db-schemas/TrafficState';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { attorneyId, court, county, violation, points, price } = req.body;

        // Handle court creation or fetching
        let courtDoc;
        if (court && court._id) {
          courtDoc = await TrafficCourt.findById(court._id);
        } else if (court && court.name) {
          courtDoc = await TrafficCourt.findOne({ name: court.name });
          if (!courtDoc) {
            courtDoc = new TrafficCourt({ name: court.name, address: '' });
            await courtDoc.save();
          }
        }

        // Handle county creation or fetching
        let countyDoc;
        if (county && county._id) {
          countyDoc = await TrafficCounty.findById(county._id);
        } else if (county && county.name) {
          countyDoc = await TrafficCounty.findOne({ name: county.name });
          if (!countyDoc) {
            countyDoc = new TrafficCounty({ name: county.name });
            await countyDoc.save();
          }
        }

        // Handle violation creation or fetching
        let violationDoc;
        if (violation && violation._id) {
          violationDoc = await Violation.findById(violation._id);
        } else if (violation && violation.name) {
          violationDoc = await Violation.findOne({ name: violation.name });
          if (!violationDoc) {
            violationDoc = new Violation({ name: violation.name, points: violation.points });
            await violationDoc.save();
          }
        }

        const newPriceMap = new AttorneyPriceMap({
          attorney: attorneyId,
          court: courtDoc ? courtDoc._id : null,
          county: countyDoc ? countyDoc._id : null,
          violation: violationDoc ? violationDoc._id : null,
          points,
          price,
        });

        await newPriceMap.save();
        await newPriceMap.populate('court county violation');

        res.status(201).json({ success: true, data: newPriceMap });
      } catch (error) {
        console.error('Error creating price map:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // Add cases for GET, PUT, and DELETE methods as required
    // ...

    default:
      res.status(400).json({ success: false });
      break;
  }
}
