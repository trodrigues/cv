var flatiron = require('flatiron'),
    connect = require('connect'),
    fs = require('fs'),
    Stream = require('stream'),
    app = flatiron.app;

app.use(flatiron.plugins.http);

app.http.before = [
  connect.static(__dirname + '/public')
];


app.router.get('/', function () {
  var self = this;
  fs.readFile(__dirname + '/index.html', 'utf-8', function(err, data) {
    if(!self.req.query.address){
      data = data.replace(/<!--HIDDEN-->(.|\n|\r)*<!--\/HIDDEN-->/gm, '');
    }

    self.res.statusCode = 200;
    self.res.setHeader('Content-Length', data.length);
    self.res.setHeader('Content-Type', 'text/html');
    self.res.setHeader('Transfer-Encoding', 'chunked');
    self.res.end(data, 'utf-8');
  });
});


app.start(3031);