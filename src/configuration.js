//configuration module 
//All express and connect configuration must there
module.exports = function(app, express){
    app.configure(function() {
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.logger(':method :url :status'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({secret: 'bingo was his name-o'}));
        app.use(express.compiler({src: __dirname + '/public', enable: ['less']}));
        app.use(app.router);
        app.use(express.static(__dirname + '/public'));
    });

    app.configure('development', function() {
        app.use(express.errorHandler({dumpExceptions: true, showStack: true})); 
    });
    
    app.configure('production', function() {
      app.use(express.errorHandler()); 
    });
};