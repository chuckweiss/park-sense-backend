const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();

const PORT = 5001;

app.use(express.json());

const uri = `mongodb+srv://chuck:Hello1234@cluster0.izjuq.mongodb.net/parksense?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.get("/", async (req, res) => {
  res.json({ status: "Hi!" });
});

const main = async () => {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(database);

  app.get("/api/", async (req, res) => {
    const data = await db.listCollections().toArray();
    res.json(data.map((collection) => collection.name));
  });

  app.get("/api/:name", async (req, res) => {
    const name = req.params.name;
    const collection = db.collection(name);
    const lot = await collection.find({}).toArray();
    res.json(lot);
  });
};

main().then(console.log).catch(console.error);
// .finally(() => client.close());
