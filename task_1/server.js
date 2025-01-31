const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const { username, email } = req.body;
  res.render("response", { username, email });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
