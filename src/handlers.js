const fs = require("fs");
const path = require("path");
const emojiObj = require("./emojis.json");

const handleHomeRoute = (response) => {
  fs.readFile(
    path.join(__dirname, "..", "public", "index.html"),
    (error, file) => {
      if (error) {
        console.log(error);
        response.writeHead(500, "Content-type: text/html");
        response.end("<h1>Sorry, we've had an error on our end 😣</h1>");
      } else {
        response.writeHead(200, "Content-Type: text/html");
        response.end(file);
      }
    }
  );
};

const handlePublic = (request, response) => {
  const extension = request.url.split(".")[1];

  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    jpg: "image/jpg",
    png: "image/png",
    json: "application/json"
  };

  fs.readFile(path.join(__dirname, "..", url), (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, "Content-type: text/html");
      response.end("<h1>Sorry, we've had an error on our end 😣</h1>");
    } else {
      response.writeHead(200, `Content-Type: ${extensionType[extension]}`);
      response.end(file);
    }
  });
};

const handleAutoCompleteQuery = (request, response) => {
  //extracting user query
  var query = request.url.split("?q=")[1];
  query = query.split("&")[0];
  var resultArr = [];
  //search emoji database for matching emoji names
  var searchEmoji = function(query) {
    emojiObj.forEach(emoji => {
      //checks if emoji name contains user query
      if (emoji.name.indexOf(query) !== -1) {
        resultArr.push(emoji.name);
      }
    });
    //returns first five results
    if (resultArr.length > 5) {
      return resultArr.slice(0, 5);
    } else {
      return resultArr;
    }
  };
  var result = searchEmoji(query);
  response.writeHead(200, "Content-Type: text/html");
  response.end(JSON.stringify(result));
};

const handleSubmit = (request, response) => {
  //extracting user query
  var query = request.url.split("?q=")[1];
  query = query.split("&")[0];
  if (query.indexOf("+") !== -1) {
    query = query.split("+").join(" ");
  }
  var resultArr = [];
  //finds first emoji in database whose name includes query
  for (var i = 0; i < emojiObj.length; i++) {
    if (emojiObj[i].name.indexOf(query) !== -1) {
      resultArr.push(emojiObj[i]);
      break;
    }
  }
  if (resultArr.length > 0) {
    //if matching emoji, return it
    response.writeHead(200, "Content-Type: text/html");
    response.end(JSON.stringify(resultArr));
  } else {
    //else return error message
    response.writeHead(200, "Content-Type: text/html");
    response.end(JSON.stringify("sorry no emoji :("));
  }
};

module.exports = {
  handleHomeRoute,
  handlePublic,
  handleAutoCompleteQuery,
  handleSubmit
};
