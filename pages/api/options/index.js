import dbConnect from '@/utils/dbConnect';
import TrafficCourt from '@/db-schemas/TrafficCourt';
import TrafficCounty from '@/db-schemas/TrafficCounty';
import Violation from '@/db-schemas/Violation';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const courts = await TrafficCourt.find({});
    const counties = await TrafficCounty.find({});
    const violations = await Violation.find({});
    const addresses = await TrafficCourt.find({}).select('address').distinct('address');

    console.log('API Data:', { courts, counties, violations, addresses }); // Log data

    res.status(200).json({ success: true, courts, counties, violations, addresses });
  } catch (error) {
    console.error('Error fetching options:', error);
    res.status(400).json({ success: false });
  }
}
