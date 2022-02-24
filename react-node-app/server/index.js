const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const build_path = "../capstone-frontend/my-app/build";

app.use(express.static(path.resolve(__dirname, build_path)));

// Have Node serve the files for our built React app
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, build_path, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
