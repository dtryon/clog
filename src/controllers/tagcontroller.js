module.exports = function (app, service) {

	var model = service.useModel('tag');
	
	/*
		GET home page
	*/
    app.get('/tags', function(req, res){
	
		var query = model.Tag.find({});

		query.exec(function (err, tags) {
			if (err) {
				console.log(err);
	  			// do something
	  		}
			res.render('tags/index', { title: 'Clog tags', tagList: tags });
		});	
	});

	/*
		GET new tag
	*/
    app.get('/tags/new', function(req, res){
	
		res.render('tags/new', { title: 'New Tag' });
	});

	/*
		POST new tag
	*/
    app.post('/tags/new', function(req, res){
	
		var newTag = new model.Tag();
		newTag.name = req.body.tag.name;		

		newTag.save(function (err) {
	  		if (err) {
	  			console.log(err);
	  			// do something
	  		}

			res.redirect('/tags');
		});
	});
};