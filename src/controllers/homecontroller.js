module.exports = function (app, service) {
	
	var model = service.useModel('tag');

	/*
		GET home page
	*/
    app.get('/', function(req, res){
	
		var query = model.Tag.find({});

		query.exec(function (err, tags) {
			if (err) {
				console.log(err);
	  			// do something
	  		}
			res.render('index', { title: 'Clog Me', tags: tags });
		});	
	});
};