const startServer = require("./server");
const cluster = require("cluster");
const totalCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  Array
    .from({ length: totalCPUs })
    .forEach(() => cluster.fork());

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });

} else {
  startServer();
}