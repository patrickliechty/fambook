function Main( el, config ) {

  //var worker = require('worker.js');
  $(document).on('ControlsReady', function() {
//    setTimeout(function() {
//      FS.Controls.init($('.feed'), function() {
//      })
//    }, 10000);

  });
}

module.exports = function( config ) {
  return new Main( config.container, config );
};