var characterSet = require('cli-character-set')
var logUpdate = require('log-update')
var padLeft = require('lodash.padleft')
var padRight = require('lodash.padright')
var themes = require('./themes')
var util = require('util')

var spun = 0

var ProgressBar = function (options) {
  options = options || {}

  this.width = options.width
  this.theme = options.theme
    ? options.theme
    : themes[characterSet()]

  this.baseName = ''
  this.name = ''
  this.progress = 0
}

ProgressBar.themes = themes

ProgressBar.prototype._getWritableTTYColumns = function () {
  // Writing to the final column wraps the line
  // We have to use stdout here, because Node's magic SIGWINCH handler only
  // updates process.stdout, not process.stderr
  return (this.width || process.stdout.columns) - 1
}

ProgressBar.prototype._getFrame = function () {
  return this.theme.spinner[spun = ++spun % this.theme.spinner.length]
}

ProgressBar.prototype._getFullName = function () {
  var self = this
  var subsection = self.name ? this.theme.subsection : ''
  return util.format('%s %s %s', self.baseName, subsection, self.name)
}

ProgressBar.prototype._getProgressBar = function () {
  var self = this
  var percentage = this.progress

  if (percentage > 1 || percentage < 0) {
    throw new Error('progressBar requires a value between 0 and 1')
  }

  function getComplete (percentage) {
    return padLeft('', (percentage * getProgressWidth()), self.theme.complete)
  }

  function getIncomplete (percentage) {
    var width = getProgressWidth() - (percentage * getProgressWidth())
    return padRight('', width, self.theme.incomplete)
  }

  // half column width minus delimiter characters
  function getProgressWidth () {
    return (self._getWritableTTYColumns() / 2) - 2
  }

  var complete = getComplete(percentage)
  var incomplete = getIncomplete(percentage)

  return this.theme.startgroup + complete + incomplete + this.theme.endgroup
}

ProgressBar.prototype.show = function (name, percentage) {
  this.baseName = name
  this.progress = percentage || this.progress
  this._draw()
}

ProgressBar.prototype.hide = function () {
  logUpdate.clear()
}

ProgressBar.prototype.pulse = function (name) {
  this.name = name || this.name
  this._draw()
}

ProgressBar.prototype._draw = function (line) {
  if (line) return logUpdate(line)

  var spinner = this.name ? this._getFrame() : ''
  var bar = this._getProgressBar(this.progress)
  var name = this._getFullName()

  logUpdate(util.format('%s %s %s', bar, spinner, name))
}

module.exports = ProgressBar
