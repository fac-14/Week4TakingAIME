const { handleHomeRoute, handlePublic } = require("./handlers");

const router = (request, response) => {
  const url = request.url;

  if (url === "/") {
    handleHomeRoute(request, response, url);
  } else if (url.indexOf("/public/") !== -1) {
    handlePublic(request, response, url);
  } else if (url.indexOf("?q=") !== -1) {
    response.writeHead(404, "Content-Type: text/html");
    response.end("<h1>Doing the right stuff</h1>");
  } else {
    response.writeHead(404, "Content-Type: text/html");
    response.end("<h1>404 Not Found - Beached As! 🐳 </h1>");
  }
};

module.exports = router;
