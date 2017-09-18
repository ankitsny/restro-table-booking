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

router
  .route('/id/tables/tId?')
  .get(restaurantController.getTables)
  .post((req, res) => res.status(200).send('post'))
  .put((req, res) => res.status(200).send('put'))
  .patch((req, res) => res.status(200).send('patch'))
  .delete((req, res) => res.status(200).send('delete'));


module.exports = router;
