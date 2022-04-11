const URL = "/api/profiles";

module.exports = (app, collection) => {
  app.get(URL, async (req, res) => {
    const data = await collection.find({}).toArray();
    const profiles = {};
    for (const profile of data) {
      profiles[profile.name] = profile;
    }
    res.json(profiles);
  });

  app.put(URL, async (req, res) => {
    const data = req.body.items;

    for (const [name, profile] of Object.entries(data)) {
      delete profile._id;
      await collection.updateOne(
        { name: name },
        { $set: profile },
        { upsert: true }
      );
    }
  });
};
