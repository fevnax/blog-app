import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5500;

// Blog Array
let blogs = [];
let blogCounter = 1;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static pages
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/create", (req, res) => {
    const blogTitle = req.body['form-title'];
    const blogDescription = req.body['form-desc'];
    const blogDetails = { id: blogCounter++, title: blogTitle, description: blogDescription };
    blogs.push(blogDetails);
    res.redirect('/blogs');
});

app.get("/blogs", (req, res) => {
    res.render("blogs.ejs", { blogs: blogs });
});

app.get("/blogs/:id/edit", (req, res) => {
    const blogId = parseInt(req.params.id);
    const blog = blogs.find(b => b.id === blogId);

    if (blog) {
        res.render("edit.ejs", { blog: blog });
    } else {
        res.status(404).send("Blog not found");
    }
});

app.post("/blogs/:id/edit", (req, res) => {
    const blogId = parseInt(req.params.id);
    const blogIndex = blogs.findIndex(b => b.id === blogId);

    if (blogIndex !== -1) {
        blogs[blogIndex].title = req.body['form-title'];
        blogs[blogIndex].description = req.body['form-desc'];
        res.redirect('/blogs');
    } else {
        res.status(404).send("Blog not found");
    }
});

app.post("/blogs/:id/delete", (req, res) => {
    const blogId = parseInt(req.params.id);
    const blogIndex = blogs.findIndex(b => b.id === blogId);

    if (blogIndex !== -1) {
        blogs.splice(blogIndex, 1);
        res.redirect('/blogs');
    } else {
        res.status(404).send("Blog not found");
    }
});

// PORT
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});