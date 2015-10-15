var ProgressBar = require('../bar')
var bar = new ProgressBar()

bar.show('Foo', 0.75)

setInterval(function () {
  bar.pulse('bar')
}, 50)
