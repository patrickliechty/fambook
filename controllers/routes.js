module.exports = function(app) {
  
  /* Optionally include this to use this alternative template when wanting to create your own header and footer
  app.set("view options", {
    layout: "layout/layout-skills"
  });
  */
  
//  app.get('/:page', function(req, res){
//    res.render(req.params.page, {});
//  });

  app.get('/', app.restrict(), function(req, res){
    res.render("index", {'user': req.user});
  });

  app.get('/workerdata', function(req, res){
    res.send("{'test': 'worker.data'}");
  });

  app.get(/^\/partials\/(.*)/, function(req, res) {
    res.partial('partials/' + req.params[0]);
  });
}
