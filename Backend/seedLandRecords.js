const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const LandRecord = require('./models/LandRecord');

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bhumi-setu';

const owners = [
  'Ramesh Kumar Singh', 'Meena Joshi', 'Kavita Deshmukh', 'Aarav Sharma', 'Aditi Verma',
  'Ajay Kumar', 'Akhil Reddy', 'Amit Patel', 'Ananya Singh', 'Anil Mehta', 'Anjali Nair',
  'Arjun Das', 'Asha Iyer', 'Bhavna Joshi', 'Bharat Rao', 'Chandan Yadav', 'Deepa Menon',
  'Devendra Gupta', 'Dinesh Pawar', 'Farah Khan', 'Gaurav Mishra', 'Geeta Kulkarni',
  'Hari Prasad', 'Indira Devi', 'Jagdish Thakur', 'Jaya Krishnan', 'Kailash Saini',
  'Kiran Shah', 'Lakshmi Narayanan', 'Mahesh Jadhav', 'Malini Roy', 'Manoj Tiwari',
  'Meena Kumari', 'Mohan Lal', 'Nandini Bose', 'Neeraj Choudhary', 'Nisha Kapoor',
  'Omkar Patil', 'Pankaj Tripathi', 'Pooja Sinha', 'Pradeep Nair', 'Priya Menon',
  'Rahul Desai', 'Rajesh Pillai', 'Rakesh Yadav', 'Rekha Sharma', 'Rohit Bansal',
  'Sanjay Naik', 'Savita Rani', 'Shamim Akhtar', 'Shivani Gupta', 'Suresh Reddy',
  'Sushma Devi', 'Tarun Malhotra', 'Usha Rao', 'Vijay Singh', 'Vikram Joshi',
  'Vinod Kumar', 'Yogesh Patil', 'Zoya Khan', 'Abhay Rao', 'Bina Kapoor', 'Chetan Joshi',
  'Dhanraj Patel', 'Esha Nair', 'Firoz Khan', 'Gopal Das', 'Hema Reddy', 'Ishaan Verma',
];

const locations = [
  ['Andhra Pradesh', 'West Godavari'], ['Maharashtra', 'Pune'], ['Madhya Pradesh', 'Bhopal'],
  ['Rajasthan', 'Kota'], ['Karnataka', 'Mysuru'], ['Gujarat', 'Ahmedabad'],
  ['Uttar Pradesh', 'Lucknow'], ['Odisha', 'Khordha'], ['Telangana', 'Hyderabad'],
  ['Tamil Nadu', 'Coimbatore'],
];

const landUses = ['Agricultural — Irrigated', 'Agricultural — Unirrigated', 'Residential', 'Commercial'];
const documentTypes = [
  ['Jamabandi', 'Jamabandi_Record_2026.pdf', 98],
  ['Khatiyan', 'Khatiyan_Record_2026.pdf', 96],
  ['Form 7/12', 'Form_7_12_Record_2026.pdf', 99],
  ['Land Record Extract', 'Land_Record_Extract_2026.pdf', 97],
  ['Record of Rights', 'RoR_Certificate_2026.pdf', 95],
];

function createRecords() {
  return Array.from({ length: 70 }, (_, index) => {
    const [state, district] = locations[index % locations.length];
    const landType = index % 3 === 0 ? 'urban' : 'rural';
    const documents = [0, 1, 2].map((offset) => {
      const [type, name, match] = documentTypes[(index + offset) % documentTypes.length];
      return { type, name, match };
    });

    return {
      parcelId: `PARCEL-${String(index + 1).padStart(3, '0')}`,
      state,
      district,
      landowner: owners[index % owners.length],
      landArea: (1.2 + ((index * 7) % 35) / 10).toFixed(1),
      landUse: landUses[index % landUses.length],
      marketValue: String(650000 + ((index * 137000) % 1400000)),
      landType,
      documents,
    };
  });
}

async function seed() {
  await mongoose.connect(mongoUri);
  await LandRecord.deleteMany({});
  const records = await LandRecord.insertMany(createRecords());
  console.log(`Seeded ${records.length} land records into the landrecords collection`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Land record seed failed:', error.message);
  process.exit(1);
});
