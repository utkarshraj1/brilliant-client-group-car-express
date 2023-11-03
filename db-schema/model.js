const mongoose = require('mongoose');

// Sales
const SalesSchema = new mongoose.Schema({
  sales_id: {
    type: Number,
    required: true,
  },
  date_of_purchase: {
    type: String,
    // required: true,
  },
  customer_id: {
    type: Number,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  premium: {
    type: Number,
    required: true,
  },
  vehicle_segment: {
    type: String,
    required: true,
  },
  selling_price: {
    type: Number,
    required: true,
  },
  power_steering: {
    type: Boolean,
    required: true,
  },
  airbags: {
    type: Boolean,
    required: true,
  },
  sunroof: {
    type: Boolean,
    required: true,
  },
  matt_finish: {
    type: Boolean,
    required: true,
  },
  music_system: {
    type: Boolean,
    required: true,
  },
  customer_gender: {
    type: String,
    required: true,
  },
  customer_income_group: {
    type: String,
    required: true,
  },
  customer_region: {
    type: String,
    required: true,
  },
  customer_marital_status: {
    type: Boolean,
    required: true,
  },
});

const Sales = mongoose.model('sales', SalesSchema);

module.exports = {
  Sales,
};
