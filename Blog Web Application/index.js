import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static pages
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs");;
});

// PORT
app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});