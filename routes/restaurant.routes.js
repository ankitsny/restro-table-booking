const router = require('express').Router();
const restaurantController = require('../controllers/restaurant.controller');

// INFO: use middlewares for authentication

router
  .route('/:id?')
  .get(restaurantController.getRestaurants)
  .post(restaurantController.postRestaurant)
  .put(restaurantController.putRestaurant)
  .patch(restaurantController.patchRestaurant)
  .delete(restaurantController.deleteRestaurant);


module.exports = router;
