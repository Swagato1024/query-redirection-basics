const http = require("node:http");
const { handler } = require("./handler");
const PORT = 8080;

const server = http.createServer(handler);

server.listen(PORT, () => {
  console.log("server start listening", PORT);
});
