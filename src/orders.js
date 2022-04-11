const URL = "/api/orders";

module.exports = async (app, collection) => {
  app.get(URL, async (req, res) => {
    res.json(await collection.find({}).toArray());
  });

  app.post(URL, async (req, res) => {
    await collection.insertOne(req.body);
  });
};
