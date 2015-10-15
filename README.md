# Usage

A simple CLI progress bar, inspired by Gauge.

```javascript
var ProgressBar = require('cli-progress-bar')

var bar = new ProgressBar()

bar.show("Foo", 0.75)

bar.pulse("bar")

bar.hide()
```

![screenshot 2015-10-15 02 58 33](https://cloud.githubusercontent.com/assets/868844/10502089/a7a483c0-72e8-11e5-90c8-1c2786639c49.png)

# API

### `var bar = new ProgressBar([options])`

* **options** – *(optional)* An option object.

The **options** object can have the following properties, all of which are
optional:

* theme: defaults to `ProgressBar.themes.unicode` if the terminal supports
  unicode according to [cli-character-set], otherwise it defaults to `ProgressBar.themes.ascii` or `ProgressBar.themes.cp437` for Windows.
* width: sets a desired width (in columns) of the entire progress indicator, not just the bar. The progress bar itself will take up about half of the column width. Additional text may overflow the desired with. By default it uses the number of available columns of the TTY.

### `gauge.show([name, [completed]])`

* **name** – *(optional)* The name of the current thing contributing to progress. Defaults to the last value used, or "".
* **completed** – *(optional)* The portion completed as a value between 0 and 1. Defaults to the last value used, or 0.

### `gauge.hide()`

Removes the gauge from the terminal.

### `gauge.pulse([name])`

* **name** – *(optional)* The specific thing that triggered this pulse

Spins the spinner in the gauge to show output. If **name** is included then
it will be combined with the last name passed to `gauge.show` using the
subsection property of the theme (typically a right facing arrow).
