var join = require('path').join;
var write = require('fs').writeFileSync;
var hljs = require('highlight.js');
var jade = require('jade');
jade.filters.html = function (str) {
  return '<pre><code>' + hljs.highlight('xml', str).value.replace(/\n/g, '\\n') + '</code></pre>';
};

function build(next) {
  jade.renderFile(join(__dirname, 'index.jade'), {}, function (err, res) {
    if (err) return next(err);
    write(join(__dirname, 'index.html'), res);
    next();
  });
}

var connect = require('connect');
connect(function (req, res, next) {
  build(next);
}, connect.static(__dirname))
.listen(3000);