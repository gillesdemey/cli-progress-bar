var ProgressBar = require('./bar')
var progressbar = new ProgressBar()

progressbar.show('Foo', 0.75)

setInterval(function () {
  progressbar.pulse('bar')
}, 50)
