const router = require('express').Router();

const bookingController = require('../controllers/booking.controller');


router
  .route('/')
  .get(bookingController.getBookings)
  .post(bookingController.postBooking)
  .put(bookingController.putBooking)
  .patch(bookingController.patchBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
