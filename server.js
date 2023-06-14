const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3500;

const app = express();

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
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
