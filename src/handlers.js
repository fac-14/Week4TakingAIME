const fs = require('fs');
const path = require('path');
const emojiObj = require('./emojis.json');

const handleHomeRoute = (request, response) => {
  fs.readFile(path.join(__dirname, "..", "public", "index.html"), (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, 'Content-type: text/html');
      response.end("<h1>Sorry, we've had an error on our end 😣</h1>")
    } else {
      response.writeHead(200, 'Content-Type: text/html');
      response.end(file);
    }
  })
}

const handlePublic = (request, response, url) => {

  const extension = url.split('.')[1];

  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    jpg: 'image/jpg',
    png: 'image/png',
    json: 'application/json'
  }

  fs.readFile(path.join(__dirname, '..', url), (error, file) =>{
    if (error) {
      console.log(error);
      response.writeHead(500, 'Content-type: text/html');
      response.end("<h1>Sorry, we've had an error on our end 😣</h1>")
    } else {
      response.writeHead(200, `Content-Type: ${extensionType[extension]}`);
      response.end(file);
    }
  })
}

  const handleAutoCompleteQuery = (request, response, url) => {
    var query = url.split('?q=')[1];
    query = query.split('&')[0];
    var resultArr = [];
    var searchEmoji = function (query) {
      emojiObj.forEach((emoji) => {
        if (emoji.name.indexOf(query) !== -1) {
          resultArr.push(emoji.name);
        }
      });
      if (resultArr.length > 5) {
        return resultArr.slice(0, 5);
      }
      else {
        return resultArr;
      }
      
    };
    var result = searchEmoji(query);
    response.writeHead(200, "Content-Type: text/html");
    response.end(JSON.stringify(result));
  };

  const handleSubmit = (request, response, url) => {
    var query = url.split('?q=')[1];
    query = query.split('&')[0];
    var resultArr = [];
    for (var i = 0; i < emojiObj.length; i++) {
      console.log(emojiObj[i].name.indexOf(query));
      if (emojiObj[i].name.indexOf(query) !== -1) {
        resultArr.push(emojiObj[i]);
        break;
      }
    }
    var result = resultArr;
    console.log(resultArr);
    response.writeHead(200, "Content-Type: text/html");
    response.end(JSON.stringify(result));
  };


module.exports = { handleHomeRoute, handlePublic, handleAutoCompleteQuery, handleSubmit };