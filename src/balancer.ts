import { createServer } from 'http';

export const runBalancer = (port: number) => {
  createServer(function (req, res) {
    res.writeHead(200);
    res.end(`Load balancer process ${process.pid} closed`);
  }).listen(port);

  console.log(`Load balancer process ${process.pid} listen: ${port}`);
};
