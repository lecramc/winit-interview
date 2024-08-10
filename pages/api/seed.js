import mongoose from 'mongoose';
import dbConnect from '@/utils/dbConnect';
import Attorney from '@/db-schemas/Attorney';
import AttorneyPriceMap from '@/db-schemas/AttorneyPriceMap';
import TrafficCounty from '@/db-schemas/TrafficCounty';
import TrafficCourt from '@/db-schemas/TrafficCourt';
import TrafficState from '@/db-schemas/TrafficState';
import Violation from '@/db-schemas/Violation';

const seedData = async () => {
  await dbConnect();

  // Clear existing data
  await Attorney.deleteMany({});
  await AttorneyPriceMap.deleteMany({});
  await TrafficCounty.deleteMany({});
  await TrafficCourt.deleteMany({});
  await TrafficState.deleteMany({});
  await Violation.deleteMany({});

  // Insert Traffic States
  const states = await TrafficState.insertMany([
    { shortName: 'NY', longName: 'New York', enabled: true },
    { shortName: 'CA', longName: 'California', enabled: true },
  ]);

  // Insert Traffic Counties
  const counties = await TrafficCounty.insertMany([
    { name: 'Albany', trafficState: states[0]._id, stateShortName: 'NY', enabled: true },
    { name: 'Los Angeles', trafficState: states[1]._id, stateShortName: 'CA', enabled: true },
    { name: 'Queens', trafficState: states[0]._id, stateShortName: 'NY', enabled: true },
    { name: 'San Francisco', trafficState: states[1]._id, stateShortName: 'CA', enabled: true },
  ]);

  // Insert Traffic Courts
  const courts = await TrafficCourt.insertMany([
    { name: 'Albany Court', address: '1 Court St, Albany, NY', trafficCounty: counties[0]._id, trafficState: states[0]._id, stateShortName: 'NY', enabled: true },
    { name: 'LA Court', address: '2 Court St, Los Angeles, CA', trafficCounty: counties[1]._id, trafficState: states[1]._id, stateShortName: 'CA', enabled: true },
    { name: 'Queens Municipal Court', address: '3 Court St, Queens, NY', trafficCounty: counties[2]._id, trafficState: states[0]._id, stateShortName: 'NY', enabled: true },
    { name: 'SF Court', address: '4 Court St, San Francisco, CA', trafficCounty: counties[3]._id, trafficState: states[1]._id, stateShortName: 'CA', enabled: true },
  ]);

  // Insert Violations
  const violations = await Violation.insertMany([
    { name: 'Speeding', points: 3 },
    { name: 'Running a red light', points: 2 },
    { name: 'Improper Passing', points: 4 },
    { name: 'Driving on Shoulder', points: 3 },
    { name: 'No Seat Belt', points: 1 },
  ]);

  // Insert Attorneys
  const attorneys = await Attorney.insertMany([
    { name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', address: '123 Main St, Anytown, USA', enabled: true },
    { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', address: '456 Elm St, Othertown, USA', enabled: false },
    { name: 'Robert Johnson', email: 'robert.johnson@example.com', phone: '555-555-5555', address: '789 Oak St, Newcity, USA', enabled: true },
    { name: 'Emily Davis', email: 'emily.davis@example.com', phone: '444-444-4444', address: '321 Pine St, Oldtown, USA', enabled: true },
    { name: 'Michael Brown', email: 'michael.brown@example.com', phone: '333-333-3333', address: '654 Cedar St, Sometown, USA', enabled: true },
  ]);

  // Insert Attorney Price Maps
  const priceMaps = [
    { attorney: attorneys[0]._id, court: courts[0]._id, county: counties[0]._id, violation: violations[0]._id, points: 3, price: 200 },
    { attorney: attorneys[0]._id, court: courts[0]._id, county: counties[0]._id, violation: violations[1]._id, points: 2, price: 250 },
    { attorney: attorneys[0]._id, court: courts[1]._id, county: counties[1]._id, violation: violations[2]._id, points: 4, price: 300 },
    { attorney: attorneys[0]._id, court: courts[1]._id, county: counties[1]._id, violation: violations[3]._id, points: 3, price: 350 },
    { attorney: attorneys[0]._id, court: courts[1]._id, county: counties[1]._id, violation: violations[4]._id, points: 1, price: 150 },
    { attorney: attorneys[1]._id, court: courts[2]._id, county: counties[2]._id, violation: violations[0]._id, points: 3, price: 200 },
    { attorney: attorneys[1]._id, court: courts[2]._id, county: counties[2]._id, violation: violations[1]._id, points: 2, price: 250 },
    { attorney: attorneys[1]._id, court: courts[2]._id, county: counties[2]._id, violation: violations[2]._id, points: 4, price: 300 },
    { attorney: attorneys[1]._id, court: courts[2]._id, county: counties[2]._id, violation: violations[3]._id, points: 3, price: 350 },
    { attorney: attorneys[1]._id, court: courts[2]._id, county: counties[2]._id, violation: violations[4]._id, points: 1, price: 150 },
    { attorney: attorneys[2]._id, court: courts[3]._id, county: counties[3]._id, violation: violations[0]._id, points: 3, price: 200 },
    { attorney: attorneys[2]._id, court: courts[3]._id, county: counties[3]._id, violation: violations[1]._id, points: 2, price: 250 },
    { attorney: attorneys[2]._id, court: courts[3]._id, county: counties[3]._id, violation: violations[2]._id, points: 4, price: 300 },
    { attorney: attorneys[2]._id, court: courts[3]._id, county: counties[3]._id, violation: violations[3]._id, points: 3, price: 350 },
    { attorney: attorneys[2]._id, court: courts[3]._id, county: counties[3]._id, violation: violations[4]._id, points: 1, price: 150 },
    { attorney: attorneys[3]._id, court: courts[0]._id, county: counties[0]._id, violation: violations[0]._id, points: 3, price: 200 },
    { attorney: attorneys[3]._id, court: courts[0]._id, county: counties[0]._id, violation: violations[1]._id, points: 2, price: 250 },
    { attorney: attorneys[3]._id, court: courts[0]._id, county: counties[0]._id, violation: violations[2]._id, points: 4, price: 300 },
    { attorney: attorneys[3]._id, court: courts[0]._id, county: counties[0]._id, violation: violations[3]._id, points: 3, price: 350 },
    { attorney: attorneys[3]._id, court: courts[0]._id, county: counties[0]._id, violation: violations[4]._id, points: 1, price: 150 },
    { attorney: attorneys[4]._id, court: courts[1]._id, county: counties[1]._id, violation: violations[0]._id, points: 3, price: 200 },
    { attorney: attorneys[4]._id, court: courts[1]._id, county: counties[1]._id, violation: violations[1]._id, points: 2, price: 250 },
    { attorney: attorneys[4]._id, court: courts[1]._id, county: counties[1]._id, violation: violations[2]._id, points: 4, price: 300 },
    { attorney: attorneys[4]._id, court: courts[1]._id, county: counties[1]._id, violation: violations[3]._id, points: 3, price: 350 },
    { attorney: attorneys[4]._id, court: courts[1]._id, county: counties[1]._id, violation: violations[4]._id, points: 1, price: 150 },
  ];

  await AttorneyPriceMap.insertMany(priceMaps);

  console.log('Data has been seeded successfully');
  mongoose.connection.close();
};

seedData().catch(err => {
  console.error('Error seeding data:', err.message);
  process.exit(1);
});
