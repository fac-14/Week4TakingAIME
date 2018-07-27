const {
  handleHomeRoute,
  handlePublic,
  handleAutoCompleteQuery,
  handleSubmit
} = require("./handlers");

const router = (request, response) => {
  const url = request.url;

  if (url === "/") {
    handleHomeRoute(response);
  } else if (url.indexOf("/public/") !== -1) {
    handlePublic(request, response);
  } else if (url.indexOf("&submit=true") !== -1) {
    handleSubmit(request, response);
  } else if (url.indexOf("?q=") !== -1) {
    handleAutoCompleteQuery(request, response);
  } else {
    response.writeHead(404, "Content-Type: text/html");
    response.end("<h1>404 Not Found - Beached As! 🐳 </h1>");
  }
};

module.exports = router;
