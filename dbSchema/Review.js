const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
  reviewedOn: { type: Date, default: Date.now }, // Review Date
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }, // RestaurantId
  // TableId, optional, good to have for analytics
  tableId: { type: mongoose.Schema.Types.ObjectId },
  stars: Number, // Number of stars
  reviewText: String, // Users feedback

  // reviewers details
  name: { type: String, default: 'User' }, // users name
  email: String, // users email
  phone: String, // users phone number

  // also need to store the userId, for this, need to build login/signup system
  // INFO: Skip it for now
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});

reviewSchema.post('init', () => {
  this._original = this.toObject();
});

reviewSchema.post('remove', review => updateRestaurant(review));

reviewSchema.post('save', review => updateRestaurant(review));

reviewSchema.post('findOneAndUpdate', review => updateRestaurant(review));


function updateRestaurant(_this) {
  const Review = _this.model('Review');
  const Restaurant = _this.model('Restaurant');

  Review
    .find({ restaurantId: _this.restaurantId, approved: true })
    .exec((err, reviews) => {
      if (err) {
        console.log(`MIDDLEWARE: reviewSchema: ${JSON.stringify(err, null, 2)}`);
        return;
      }
      let reviewLength = 0;
      let ratingLength = 0;
      let ratingSum = 0;
      reviews.forEach((review) => {
        reviewLength += 1;
        if (review.stars) {
          ratingLength += 1;
          ratingSum += review.stars;
        }
      });
      const approvedReviewsLength = reviewLength;
      const averageStars = (ratingSum / ratingLength) || null;
      Restaurant
        .findOneAndUpdate(
          { _id: _this.restaurantId },
          { $set: { averageRating: averageStars, reviewCount: approvedReviewsLength } },
        )
        .exec((err2, restaurant) => {
          if (err2) {
            console.log(`MIDDLEWARE: reviewSchema: ${JSON.stringify(err2, null, 2)}`);
          }
        });
    });
}


module.exports = mongoose.model('Review', reviewSchema);
