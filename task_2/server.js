const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const submissions = [];

app.get("/", (req, res) => {
  res.render("index", { error: null });
});

app.post("/submit", (req, res) => {
  const { username, email, age } = req.body;

  let errors = [];
  if (!username || username.length < 3) errors.push("Username must be at least 3 characters.");
  if (!email || !email.includes("@")) errors.push("Enter a valid email address.");
  if (!age || isNaN(age) || age < 18) errors.push("Age must be a number and at least 18.");

  if (errors.length > 0) {
    return res.render("index", { error: errors.join(" ") });
  }

  submissions.push({ username, email, age });

  res.render("response", { username, email, age, submissions });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
