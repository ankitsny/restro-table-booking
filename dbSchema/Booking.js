const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  tableId: { type: mongoose.Schema.Types.ObjectId },
  bookedOn: { type: Date, default: Date.now },
  startTime: Date,
  endTime: Date,

  bookingStatus: { type: String, enum: ['CONFIRMED', 'CANCELLED', 'BLOCKED'] },

  // Users details
  name: String,
  email: String,
  phone: Number,

  // store userId
  // INFO: skip it for now
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});

bookingSchema.index({ restaurantId: true });
bookingSchema.index({ restaurantId: 1, tableId: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
