const Restaurant = require('../dbSchema/Restautant');

async function getRestaurants(id) {
  try {
    const restaurant = id ? await Restaurant.findById(id).exec() : await Restaurant.find().exec();
    return { err: null, restaurant };
  } catch (err) {
    return { err };
  }
}

exports.getRestaurants = async (req, res) => {
  // INFO: if id is passed then this function will return one doc
  // if id is not passed then it will return array of docs/restaurant
  // TODO: Implement pagination for second case
  const { err, restaurant } = await getRestaurants(req.params.id);
  if (err) return res.status(500).send({ err });
  if (!restaurant) return res.status(404).send({ message: 'Invalid id' });
  return res.status(200).send(restaurant);
};

exports.postRestaurant = async (req, res) => {
  // TODO: verify the body, before creating a new record
  new Restaurant(req.body)
    .save((err, restaurant) => {
      if (err) { return res.status(500).send({ err: 'Internal Server Error' }); }
      return res.status(200).send({ restaurant });
    });
};

exports.putRestaurant = async (req, res) => res.status(200).send({});

exports.patchRestaurant = async (req, res) => {
  res.status(200).send({});
};

exports.deleteRestaurant = async (req, res) => res.status(200).send({});
