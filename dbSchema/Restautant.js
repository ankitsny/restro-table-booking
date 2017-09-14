var mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({
    name: String,                                           // name of the restaurant
    openingTime: { type: Date, required: true },            // opening time of the restaurant
    closingingTime: { type: Date, required: true },         // Closing time of the restaurant
    address: {                                              // Address of the restaurant
        line1: String,                                      // INFO: lat, lng can be used to use maps
        line2: String,
        city: String,
        country: String,
        zipCode: Number
    },

    tables: [{                                              // each restaurant will have limited tables
        capacity: Number,                                   // each table will have sitting capacity
        shape: { type: String, enum: ['rectangular', 'circular'], default: 'circular' }
    }],

    // for reviews we have separate collection
    // its good to store avg rating and review count on restaurant schema itself
    // it will reduse the db calls to get reviews data from Reviews Collection
    // INFO: also we can store top 5 reviews in Restaurant Schema itself
    averageRating: Number, // This will be auto calculated by the triggers(mongoose middleware)
    reviewCount: Number // This will be auto calculated by the triggers(mongoose middleware)

});

module.exports = mongoose.model('Restaurant', restaurantSchema);