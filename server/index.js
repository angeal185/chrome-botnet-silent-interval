// test server
const http = require('http'),
fs = require('fs'),
config = require('./config');

const port = config.server.port,
server = http.createServer()


server.on('request', function(req, res){
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  res.writeHead(200, config.server.headers);
  return res.end('<html><head></head><body></body></html>')

});

server.on('error', function(err){
  return console.error('error:'+ err)
});

server.listen(port, function(){
  console.log('Server listening on port:'+ port)
});
