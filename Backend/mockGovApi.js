const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const LandRecord = require('./models/LandRecord');

const app = express();
const port = 6000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bhumi-setu';

async function getLandRecord(parcelId) {
  return LandRecord.findOne({ parcelId: parcelId.trim().toUpperCase() }).lean();
}

async function buildVerificationResponse(parcelId) {
  const record = await getLandRecord(parcelId);
  if (!record) return { verified: false, message: 'Parcel was not found in mock land records' };

  const document = record.documents[Math.floor(Math.random() * record.documents.length)];
  return {
    verified: true,
    ...record,
    document: { ...document, parcelId: record.parcelId },
  };
}

async function verifyParcel(req, res) {
  const parcelId = req.params.parcelId || req.query.parcelId;
  if (typeof parcelId !== 'string' || !parcelId.trim()) {
    return res.status(400).json({ verified: false, message: 'Parcel ID is required' });
  }

  try {
    const response = await buildVerificationResponse(parcelId);
    return res.status(response.verified ? 200 : 404).json(response);
  } catch (error) {
    return res.status(503).json({ verified: false, message: 'Land record database is unavailable' });
  }
}

app.get('/land/:parcelId', verifyParcel);
app.get('/verify', verifyParcel);

async function startServer() {
  await mongoose.connect(mongoUri);
  app.listen(port, () => {
    console.log(`Mock government API running on port ${port}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Mock government API startup failed:', error.message);
    process.exit(1);
  });
}

module.exports = app;
