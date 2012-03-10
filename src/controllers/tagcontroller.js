module.exports = function (app, service) {

	var dateFormatter = service.useModule('dateFormatter');
	var model = service.useModel('tag');
	var blogModel = service.useModel('blog');
	
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
		GET tag by id
	*/
    app.get('/tag/:id', function(req, res){
	
		model.Tag.findById(req.params.id, function (err, tag){
	  		if (err) {
	  			console.log(err);
	  			// do something
	  		}
	  		
	  		var query = blogModel.BlogPost.find( { _id: { $in : tag.blogs } } );
	  		query.where('date').lte(new Date());
	  		
	  		query.exec(function (err, blogs) {
	  			if (err) {
	  				console.log(err);
		  			// do something
		  		}

		  		var query = model.Tag.find({});

				query.exec(function (err, tags) {
					if (err) {
						console.log(err);
			  			// do something
			  		}
					res.render('tags/detail', { title: tag.name, blogs: blogs, tagList: tags, dateFormatter: dateFormatter });	
				});	
	  		});
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

	/*
		POST delete tag
	*/
    app.post('/tags/delete/:id', function(req, res){
	
		model.Tag.findById(req.params.id, function (err, tag){
	  		if (err) {
	  			console.log(err);
	  			// do something
	  		}

	  		tag.remove(function(err) {
	  			console.log(err);
	  			// do something
	  		});

	  		res.redirect('back');
		});
	});
};