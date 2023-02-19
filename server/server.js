const http = require('http');
const app = require('./app');
const { HOST, PORT } = require('./config/server.json');

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`server started on ${HOST}:${PORT}`);
});
