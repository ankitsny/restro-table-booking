var router = require('express').Router();
var reviewController = require('../controllers/review.controller');

// INFO: use middlewares for authentication

router
    .route('/')
    .get(reviewController.getReviews)
    .post(reviewController.postReview)
    .put(reviewController.putReview)
    .patch(reviewController.patchReview)
    .delete(reviewController.deleteReview);


module.exports = router;