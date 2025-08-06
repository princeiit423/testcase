require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const path = require("path");
const ejs= require("ejs");

const authRoutes = require("./routes/auth");
const githubRoutes = require("./routes/github");
const aiRoutes = require("./routes/ai");


require("./services/passport");

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}));

app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// View engine for EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/auth", authRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
});

app.get("/dashboard", async (req, res) => {
  if (!req.user) return res.redirect("/");
  const username = req.user.profile.username;
  const token = req.user.accessToken;

  const axios = require("axios");
  try {
    const repos = await axios.get("https://api.github.com/user/repos", {
      headers: { Authorization: `token ${token}` },
    });
    res.render("dashboard", { user: req.user.profile, repos: repos.data });
  } catch (err) {
    res.status(500).send("Failed to load dashboard");
  }
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
