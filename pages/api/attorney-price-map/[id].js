import dbConnect from '@/utils/dbConnect';
import AttorneyPriceMap from '@/db-schemas/AttorneyPriceMap';
import mongoose from 'mongoose';

// Import and register all necessary schemas
import '@/db-schemas/TrafficCourt';
import '@/db-schemas/TrafficCounty';
import '@/db-schemas/Violation';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  await dbConnect();

  console.log(`Received request with method: ${method} and id: ${id}`);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  switch (method) {
    case 'GET':
      try {
        const priceMaps = await AttorneyPriceMap.find({ attorney: id })
          .populate('court')
          .populate('county')
          .populate('violation');
        console.log(`Found price maps: ${JSON.stringify(priceMaps)}`);
        res.status(200).json({ success: true, data: priceMaps });
      } catch (error) {
        console.error('Error fetching price maps:', error);
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const { court, county, violation, points, price } = req.body;

        const updateData = {
          points,
          price,
        };

        if (court && mongoose.Types.ObjectId.isValid(court._id)) {
          updateData.court = court._id;
        } else {
          updateData.court = null;
        }

        if (county && mongoose.Types.ObjectId.isValid(county._id)) {
          updateData.county = county._id;
        } else {
          updateData.county = null;
        }

        if (violation && mongoose.Types.ObjectId.isValid(violation._id)) {
          updateData.violation = violation._id;
        } else {
          updateData.violation = null;
        }

        const updatedPriceMap = await AttorneyPriceMap.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        ).populate('court').populate('county').populate('violation');

        if (!updatedPriceMap) {
          return res.status(404).json({ success: false, message: 'Price map not found' });
        }

        res.status(200).json({ success: true, data: updatedPriceMap });
      } catch (error) {
        console.error('Error updating price map:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const { attorneyId, court, county, violation, points, price } = req.body;

        const newPriceMap = new AttorneyPriceMap({
          attorney: attorneyId,
          court: court?._id || null,
          county: county?._id || null,
          violation: violation?._id || null,
          points,
          price,
        });

        const savedPriceMap = await newPriceMap.save();
        const populatedPriceMap = await AttorneyPriceMap.findById(savedPriceMap._id)
          .populate('court')
          .populate('county')
          .populate('violation');

        res.status(201).json({ success: true, data: populatedPriceMap });
      } catch (error) {
        console.error('Error creating price map:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedPriceMap = await AttorneyPriceMap.findByIdAndDelete(id);
        if (!deletedPriceMap) {
          return res.status(404).json({ success: false, message: 'Price map not found' });
        }
        res.status(200).json({ success: true, data: deletedPriceMap });
      } catch (error) {
        console.error('Error deleting price map:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
