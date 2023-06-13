const fs = require("fs");

const rs = fs.createReadStream("./files/lorem.txt", "utf-8");

const ws = fs.createWriteStream("./files/new-lorem.txt");

// rs.on("data", (dataChunk) => {
//   ws.write(dataChunk);
// });

rs.pipe(ws);
