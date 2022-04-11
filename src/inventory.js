const URL = "/api/inventory";

module.exports = async (app, collection) => {
  app.get(URL, async (req, res) => {
    const inv = await collection.find({}).toArray();
    res.json(inv);
  });

  app.post(URL, async (req, res) => {
    await collection.insertOne(req.body);
  });

  app.patch(URL, async (req, res) => {
    const data = {
      text: req.body.text,
      amount: req.body.amount,
      date: req.body.date,
    };

    await collection.updateOne({ text: data.text }, { $set: data });
  });

  app.delete(URL, async (req, res) => {
    await collection.deleteMany({ text: req.body.text });
  });
};
