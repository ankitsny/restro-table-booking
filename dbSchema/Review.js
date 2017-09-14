var mongoose = require('mongoose');


var reviewSchema = new mongoose.Schema({
    reviewedOn: { type: Date, default: Date.now },                              // Review Date
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },  // RestaurantId, 
    tableId: { type: mongoose.Types.ObjectId },                                 // TableId, optional, good to have for analytics

    stars: Number,                                                              // Number of stars
    reviewText: String,                                                         // Users feedback

    // reviewers details
    name: { type: String, default: 'User' },                                    // users name
    email: String,                                                              // users email
    phone: String,                                                              // users phone number

    // also need to store the userId, for this, need to build login/signup system
    // INFO: Skip it for now
    //userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});

reviewSchema.post('init', function () {
    this._original = this.toObject();
});

reviewSchema.post('remove', function (review) {
    return updateRestaurant(review);
});

reviewSchema.post('save', function (review) {
    return updateRestaurant(review);
});

reviewSchema.post('findOneAndUpdate', function (review) {
    return updateRestaurant(review);
});


function updateRestaurant(_this) {
    var Review = _this.model('Review');
    var Restaurant = _this.model('Restaurant');

    Review
        .find({ restaurantId: _this.restaurantId, approved: true })
        .exec(function (err, reviews) {
            if (err) {
                console.log("MIDDLEWARE: reviewSchema: " + JSON.stringify(err, null, 2));
                return;
            }
            var reviewLength = 0;
            var ratingLength = 0;
            var ratingSum = 0;
            reviews.forEach(function (review) {
                ++reviewLength;
                if (review.stars) {
                    ++ratingLength;
                    ratingSum += review.stars;
                }
            });
            var approvedReviewsLength = reviewLength;
            var averageStars = (ratingSum / ratingLength) || null;
            Restaurant
                .findOneAndUpdate(
                { _id: _this.restaurantId },
                { $set: { averageRating: averageStars, reviewCount: approvedReviewsLength } })
                .exec(function (err, restaurant) {
                    if (err) {
                        console.log("MIDDLEWARE: reviewSchema: " + JSON.stringify(err, null, 2));
                        return;
                    }
                });
        });
}



module.exports = mongoose.model('Review', reviewSchema);