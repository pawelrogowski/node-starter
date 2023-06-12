fsPromises = require("fs").promises; // or require("fs/promises")
path = require("path");

const fileOperations = async () => {
  try {
    //store the original data in a variable
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "fileOperations.txt"),
      "utf8"
    );
    // log stored data
    console.log(data);
    //write the store data to a file
    await fsPromises.writeFile(
      path.join(__dirname, "files", "fileOperations.txt"),
      data
    );

    //add "Greetings Mortals" to our file
    await fsPromises.appendFile(
      path.join(__dirname, "files", "fileOperations.txt"),
      "\nGreetings Mortals"
    );
    //rename a file
    await fsPromises.rename(
      path.join(__dirname, "files", "fileOperations.txt"),
      path.join(__dirname, "files", "renamedFile.txt")
    );
  } catch (err) {
    console.error(err);
  }
};

fileOperations();
