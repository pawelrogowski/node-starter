// global object instead of window object
// console.log(global);

// has common core modules
// commonJS modules instead of ES6 modules

const os = require("os");

// console.log(os.type);
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname); // current directory
// console.log(__filename); // file name

const path = require("path");

// console.log(path.dirname(__filename)); // folder contating our file
// console.log(path.basename(__filename)); // just file name
// console.log(path.extname(__filename)); // just file extension

// console.log(path.parse(__filename)); // object with all the values
// console.log(path.parse(__filename).root); // object with all the values

// const math = require("./math");
const { add } = require("./math");
// console.log(math.add(2, 2));
console.log(add(2, 2));

// missing some JS APIs like fetch
