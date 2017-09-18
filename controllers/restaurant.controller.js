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

exports.putRestaurant = async (req, res) => {
  // TODO: Verify the incoming data
  Restaurant
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec((err, restaurant) => {
      if (err) return res.status(500).send({ err: 'Internal Server Error' });
      return res.status(200).send({ restaurant });
    });
};

exports.patchRestaurant = async (req, res) => {
  // TODO: verify incoming data
  Restaurant
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec((err, restaurant) => {
      if (err) return res.status(500).send({ err: 'Internal Server Error' });
      return res.status(200).send({ restaurant });
    });
};

exports.deleteRestaurant = async (req, res) => {
  Restaurant
    .findByIdAndRemove(req.params.id)
    .exec((err) => {
      if (err) return res.status(500).send({ err: 'Internal Server Error' });
      return res.status(204).send({ message: 'Deleted' });
    });
};


// controlleres for tables sub-document
async function getTables(id, tId) {
  try {
    const condn = { _id: id };
    if (tId) condn['tables._id'] = tId;
    const restaurant = await Restaurant
      .findOne(condn)
      .select('tables')
      .exec();

    if (!restaurant || !restaurant.tables.length) { return { err: new Error('Table not found') }; }
    if (tId && !restaurant.tables.$) return { err: new Error('Invalid Table') };
    return { err: null, tables: tId ? restaurant.tables.$ : restaurant.tables };
  } catch (err) {
    return { err };
  }
}


exports.getTables = async (req, res) => {
  // TODO: verify all incoming data;
  const { err, tables } = await getTables(req.params.id, req.params.tId || null);
  if (err) return res.status(500).send({ err });
  return res.status(200).send({ tables });
};

exports.postTables = async (req, res) => {
  // TODO: verify all incoming data;
  // multiple or single table can be created on one request
  if (req.body && !Array.isArray(req.body)) req.body = [req.body];
  Restaurant
    .findByIdAndUpdate(
      req.params.id,
      { $push: { tables: { $each: req.body } } },
      { new: true },
    )
    .exec((err, restaurant) => {
      if (err) return res.status(500).send({ err });
      if (!restaurant) return res.status(404).send({ message: 'Invalid Restaurant' });
      return res.status(200).send({ restaurant });
    });
};

exports.putTables = async (req, res) => {
  // TODO: verify all incoming data
  Restaurant
    .findOneAndUpdate(
      { _id: req.params.id, 'tables._id': req.params.tId },
      { 'tables.$': req.body },
      { new: true },
    )
    .exec((err, restaurant) => {
      if (err) return res.status(500).send({ err });
      if (!restaurant) return res.status(404).send({ message: 'Invalid restauranr or table' });
      return res.status(200).send({ restaurant });
    });
};

exports.patchTables = async (req, res) => {
  // TODO: verify all incoming data

  Restaurant
    .findOneAndUpdate(
      { _id: req.params.id, 'tables._id': req.params.tId },
      { 'tables.$': req.body },
      { new: true },
    ).exec((err, restaurant) => {
      if (err) return res.status(500).send({ err });
      if (!restaurant) return res.status(404).send({ message: 'Invalid restaurant or table' });
      return res.status(200).send({ restaurant });
    });
};

exports.deleteTables = async (req, res) => {
  // TODO: verify all incoming data
  Restaurant
    .findByIdAndUpdate(
      req.params.id,
      { $pull: { tables: { _id: req.params.tId } } },
    )
    .exec((err) => {
      if (err) return res.status(500).send({ err });
      return res.status(204).send({ message: 'deleted' });
    });
};
