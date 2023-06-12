const fs = require("fs");
const path = require("path");

// we use path.join instead of normal string beucase some systems use different slashes for filepaths, this way we get correctly parsed path every time
fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);

// writeFile has similar syntax to readFile
// - utf8 is by default
// - we dont have data in our callback
// - if the file does not exist we dont get an error, instead the file is created
// you need to specify what to write before callback
// it replaces ALL contents of the file

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "nice to meet you Paweł",
//   (err) => {
//     if (err) throw err;
//     console.log("write complete");
//   }
// );

// appendFile will add to a file, it will also create one if it doesn't exist

// fs.appendFile(
//   path.join(__dirname, "files", "test.txt"),
//   "Testing appendFile",
//   (err) => {
//     if (err) throw err;
//     console.log("append complete");
//   }
// );

//fs is async so console.log  below will execute before any read/write
console.log("hello");

// exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.error(`there was an uncaught exception error: ${err}`);
  process.exit(1);
});

// In a situation where we want to create a file and then append, we might encounter a situation where due to async nature of writeFile and appendFile our appendFile creates a file before writeFile and our writeFile writes over it because it finished later. To avoid such situations we can place our appendFile inside a callback of writeFile

fs.writeFile(
  path.join(__dirname, "files", "nestedTest.txt"),
  "Nice to meet you Paweł.",
  (err) => {
    if (err) throw err;
    console.log("write complete");

    fs.appendFile(
      path.join(__dirname, "files", "nestedTest.txt"),
      "\nYes it is.",
      (err) => {
        if (err) throw err;
        console.log("append complete");
      }
    );
  }
);

// now imagine that we want to rename a file after we create and append it, we would need to nest another callback, it's called callback hell because it can really quicky become really hard to read and debug. To avoid such situations we can use async/await with promises which is provided by fs.promises, examples in asyncFileOperation.js
