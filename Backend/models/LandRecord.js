const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    match: { type: Number, required: true, min: 0, max: 100 },
  },
  { _id: false },
);

const landRecordSchema = new mongoose.Schema(
  {
    parcelId: { type: String, required: true, unique: true, index: true, uppercase: true, trim: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    landowner: { type: String, required: true },
    landArea: { type: String, required: true },
    landUse: { type: String, required: true },
    marketValue: { type: String, required: true },
    landType: { type: String, enum: ['rural', 'urban'], required: true },
    documents: { type: [documentSchema], default: [] },
  },
  { timestamps: true, collection: 'landrecords' },
);

module.exports = mongoose.model('LandRecord', landRecordSchema);
