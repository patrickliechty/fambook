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

  app.param('imagename',function(req, res, next){
    if(/\.jpg/.test(req.url) || /\.png/.test(req.url)){
      next();
    } else {
      next('route');
    }
  });

  app.get('/getangularimage/:imagename', function(req, res) {
    //console.log("APP=", app);
    //console.log("app.dynamicViewHelpers=", app.dynamicViewHelpers);
    console.log("req.params.imagename=" + req.params.imagename);
    //console.log("req.img.val=" + app.dynamicViewHelpers.img(req.params.imagename));
    var imagePath = app.dynamicViewHelpers.img(req.params.imagename).call(req.params.imagename);
    console.log("imagePath1=", imagePath)
    if(imagePath === '') {
      imagePath = '/img/' + req.params.imagename;
    }
    console.log("imagePath2=", imagePath)
    res.redirect(imagePath);
  });
}
