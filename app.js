import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let newItems = [];
app.get("/", (req,res) => {
    let options = {weekday: "long", year: "numeric", month:"long", day:"numeric"};
    let today = new Date();
    let currentDay = today.toLocaleDateString("en-US", options);

    res.render("list.ejs", {day: currentDay, newListItems: newItems});
});

app.post("/", (req,res) => {
    let newItem = req.body["newItem"];
    newItems.push(newItem);
    res.redirect("/")
});

app.listen(port, () =>{
    console.log(`Server listening on port ${port}.`);
});