const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    short: { type: String, required: true },
    description: String,
    date: String,
    status: { type: String, default: 'pending' },
    activeLabel: String,
  },
  { _id: false },
);

const paymentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    date: { type: String, default: '—' },
    status: { type: String, default: 'Pending' },
  },
  { _id: false },
);

const documentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: String, required: true },
    plot: String,
    area: String,
    match: { type: Number, default: 0 },
    status: { type: String, default: 'Processing...' },
    action: { type: String, default: 'View' },
    flagged: Boolean,
    pending: Boolean,
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    parcelId: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'compensated'],
      default: 'pending',
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    risk: { type: String, default: 'Low' },
    stages: { type: [stageSchema], default: [] },
    compensation: {
      landArea: { type: String, default: '0' },
      marketValue: { type: String, default: '0' },
      multiplier: { type: String, default: 'Urban' },
      landUse: { type: String, default: 'Agricultural — Irrigated' },
      solatiumRate: { type: Number, default: 0.1 },
      payments: { type: [paymentSchema], default: [] },
    },
    documents: { type: [documentSchema], default: [] },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

projectSchema.index({ createdBy: 1, parcelId: 1 }, { unique: true });

module.exports = mongoose.model('Project', projectSchema);
