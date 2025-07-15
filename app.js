const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const Task = require("./models/tasks");
const User = require("./models/user");
const methodOverride = require('method-override');
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("./utils/jwt");
const cookieParser = require("cookie-parser");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(cookieParser());

// --- JWT Middleware ---
function requireLogin(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect("/signin");
    let payload;
    try {
        payload = verifyToken(token);
    } catch (e) {
        return res.redirect("/signin");
    }
    req.user = payload;
    next();
}


main()
  .then(() => console.log("Connected to server successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todo-db");
}


app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    try {
        const user = new User({ username, password: hash });
        await user.save();
        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/todos");
    } catch (e) {
        res.send("Error: " + e.message);
    }
});

app.get("/signin", (req, res) => {
    res.render("signin.ejs");
});

app.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("Invalid Username or Password");
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true });
        return res.redirect("/todos");
    }
    res.status(400).send("Invalid Username or Password");
});

app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/signin");
});

// --- Todo Routes ---
app.get("/todos", requireLogin, async (req, res) => {
    const tasks = await Task.find({ user: req.user.userId });
    res.render("todo.ejs", { tasks });
});

app.post("/tasks", requireLogin, async (req, res) => {
    const description = req.body.description || req.body["toDo[name]"];
    if (!description) return res.redirect("/todos");
    const task = new Task({ description, user: req.user.userId });
    await task.save();
    res.redirect("/todos");
});

app.post("/todos/:id/delete", requireLogin, async (req, res) => {
    await Task.deleteOne({ _id: req.params.id, user: req.user.userId });
    res.redirect("/todos");
});


app.get("/todos/:id/edit", requireLogin, async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) return res.redirect("/todos");
    res.render("edit.ejs", { task });
});

app.post("/todos/:id/edit", requireLogin, async (req, res) => {
    const desc = req.body.description;
    await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user.userId },
        { description: desc }
    );
    res.redirect("/todos");
});

// --- Start Server ---
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
// now can you add tailwind and framer motion to my website to look it little futuristic without touching the backend files