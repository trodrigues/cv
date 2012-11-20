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

    if(self.req.query.nojs){
      data = data.replace(/<!--NOJS-->(.|\n|\r)*<!--\/NOJS-->/gm, '');
    }

    if(self.req.query.onefile){
      var css = fs.readFileSync(__dirname + '/public/styles.css');
      var js = fs.readFileSync(__dirname + '/public/main.js');
      data = data.replace(/<link.*"all".*>/g, '<style>\n'+ css + '\n</style>');
      data = data.replace(/<link.*"print".*>/g, '');
      data = data.replace(/<script.*"main\.js".*><\/script>/g, '<script>\n'+ js +'\n</script>');
    }

    self.res.statusCode = 200;
    self.res.setHeader('Content-Length', data.length);
    self.res.setHeader('Content-Type', 'text/html');
    self.res.setHeader('Transfer-Encoding', 'chunked');
    self.res.end(data, 'utf-8');
  });
});


app.start(3031);