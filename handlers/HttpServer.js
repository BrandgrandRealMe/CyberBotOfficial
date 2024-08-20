const http = require('http');
const settings = require('../config.json');
const statusModule = require('../utils/StatusJSON.js');

const port = settings.PORT;
module.exports = (client) => {
  const handleRequest = async (req, res) => {
    if (req.url === '/status/raw') {
      try {
        const status = await statusModule();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(status));
      } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: 'Internal Server Error'
        }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');

    }
  };

  const server = http.createServer(handleRequest);

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}