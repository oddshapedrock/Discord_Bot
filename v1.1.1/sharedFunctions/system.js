const startUp = new Date();

const runTime = function() {
  seconds = Number((new Date() - startUp) / 1000);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);

  let time = {
    days: d,
    hours: h,
    minutes: m,
    seconds: s
  }
  return time;
}

module.exports = {
  runTime
}
