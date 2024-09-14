const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"], // React frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200, // For legacy browsers
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../client/build")));

//dummy user
const user = {
  id: 1,
  email: "xyz@gmail.com",
  password: "xyz", // In a real app, use hashed passwords
};

app.use(express.json());

app.post("/test", (req, res) => {
  res.send("Test route"); //working
});

//working
app.post("/api/login", (req, res) => {
  console.log("login successful!");
  const { email, password } = req.body;
  if (email == user.email && password == user.password) {
    //generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    //send token back to client
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
  }
});

// Example protected route
app.get("/api/dashboard", (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; //after removing Bearer

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Forbidden" });
      } else {
        res.json({ message: "Dashboard data from server", user });
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// All other requests should be redirected to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

//catch all route should be written at last
app.use((req, res) => {
  console.log("other api");
  res.status(404).send("Route not found");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
