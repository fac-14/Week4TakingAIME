const http = require("http");

const router = require("./router");

const server = http.createServer(router);

const port = process.env.PORT || 8070;

server.listen(port);

console.log(`Server is up and running on ${port}`);
