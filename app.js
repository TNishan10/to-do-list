import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// Array to store new items
let newItems = [];

// Routes
app.get("/", (req, res) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date();
  const currentDay = today.toLocaleDateString("en-US", options);

  res.render("list", { day: currentDay, newListItems: newItems });
});

app.post("/", (req, res) => {
  const newItem = req.body.newItem;
  newItems.push(newItem);
  res.redirect("/");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});