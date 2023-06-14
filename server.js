const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logEvents");
const { errorHandler } = require("./middleware/errorHandler");
const cors = require("cors");
const PORT = process.env.PORT || 3500;
const app = express();

// custom middleware logger
app.use(logger);

//enable cross origin resource sharing
const whitelist = [
  "http://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccesStatus: 200,
};
app.use(cors(corsOptions));

// buit-in middleware to handle url-encoded data
// in other words, form data:
// `contact-type: application/x-www-form-urlencoded`
app.use(express.urlencoded({ extended: false }));
// middleware for json
app.use(express.json());
// middleware for servring static files
app.use(express.static(path.join(__dirname, "/public")));

// NOTE, Express handles the routes like a waterfall
app.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("^/$|new-page.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("^/$|old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); // 301 - permanently moved
});

// route handlers

// chained function
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("hello world!");
  }
);

//more common way to chain
const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
  res.send("finished");
};
// theres no difference between both functions, but grouping middleware in an array is a good practice
// app.get("/chain", one, two, three);
app.get("/chain", [one, two, three]);

// serve custom 404 page for any other path
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
