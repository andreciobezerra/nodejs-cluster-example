const express = require("express");
const port = 3000;

function startServer() {
  const server = express();

  console.log(`Worker ${process.pid} started`);

  server.get('/', function (_, res) {
    const result = Array
      .from({ length: 10000 }, (_, i) => i)
      .reduce((acc, elem) => acc += Math.atan(elem) * Math.tan(elem), 0);

    console.log(`Result number is ${result} - on process ${process.pid}`);

    res.send(`Result number is ${result}`);
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = startServer;