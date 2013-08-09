function Main( el, config ) {

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