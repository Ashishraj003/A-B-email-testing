const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  variants: [{ type: String, required: true }],
  results: [{
    variant: String,
    sent: { type: Number, default: 0 },
    opened: { type: Number, default: 0 },
    clicked: { type: Number, default: 0 }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Experiment', experimentSchema);
