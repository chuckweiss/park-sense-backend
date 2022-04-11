const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();

const inventory = require("./src/inventory");
const profiles = require("./src/profiles");
const orders = require("./src/orders");

const PORT = 5000;

app.use(express.json());

const priv = require("./private");
const password = priv.password;
const database = priv.database;
const uri = `mongodb+srv://chuck:${password}@cluster0.izjuq.mongodb.net/${database}?retryWrites=true&w=majority`;
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
  const inv = db.collection("inventory");

  inventory(app, inv);
  profiles(app, db.collection("profiles"));
  orders(app, db.collection("orders"));
};

main().then(console.log).catch(console.error);
// .finally(() => client.close());
