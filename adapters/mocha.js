(function () {

  window.completedTests = 0;
  window.testsPassed = null;

  function JepsoReporter(runner, root) {
    Mocha.reporters.HTML.call(this, runner, root);
    runner.on('pass', function () {
      window.completedTests++;
    })
    runner.on('fail', function(){
      window.testsPassed = false;
    });
    runner.on('end', function () {
      window.testsPassed = window.testsPassed === null;
    })
  }
  JepsoReporter.prototype = Mocha.reporters.HTML.prototype;

  if (Mocha.reporters.Progress) {
    //patch so that we don't fail tests just because
    //we can't render the progress
    var oldDraw = Mocha.reporters.Progress.prototype.draw;
    Mocha.reporters.Progress.prototype.draw = function (ctx) {
      try {
        return oldDraw.apply(this, arguments);
      } catch (ex) {
        return this;
      }
    }
  }

  //fix a bug in mocha with early versions of firefox
  //see https://github.com/visionmedia/mocha/pull/724
  mocha.globals(['navigator', 'getInterface']);
  mocha.reporter(JepsoReporter);

}());