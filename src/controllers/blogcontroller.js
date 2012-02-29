module.exports = function (app, service) {

	var dateFormatter = service.useModule('dateFormatter');
	var model = service.useModel('blog');
	var tagModel = service.useModel('tag');

	/*
		GET list of blogs page
	*/
	app.get('/blogs', function(req, res){
		
		var query = model.BlogPost.find({});

		query.desc('date');
		query.limit(20);

		query.exec(function (err, blogs) {
			if (err) {
	  			// do something
	  		}
			res.render('blogs/index', { title: 'Clogs', blogList: blogs, dateFormatter: dateFormatter });
		});
		
	});

	/*
		GET blog detail page
	*/
	app.get('/blog/:id', function(req, res){
	
		model.BlogPost.findById(req.params.id, function (err, blog){
	  		
	  		if (err) {
	  			console.log(err);
	  			// do something
	  		}

	  		blog.meta.views++;
	  		blog.save(function(err) {
	  			// do something
	  		});

	  		var query = tagModel.Tag.find( { _id: { $in : blog.meta.tags } } );

	  		query.exec(function (err, tags) {
	  			if (err) {
	  				console.log(err);
		  			// do something
		  		}
	  		
	  			res.render('blogs/detail', { title: 'Clog', blog: blog, tags: tags, dateFormatter: dateFormatter });	
	  		});

	  		
		});
	});

	/*
		POST a comment
	*/
	app.post('/blog/comment', function(req, res){
	
			model.BlogPost.findById(req.body.blogId, function(err, blog){
			if (err) {
				// do something
			}

			var newComment = new model.Comment();
			newComment.body = req.body.comment;
			newComment.date = new Date();

			blog.comments.push(newComment);
			
			blog.save(function (err){
				if (err) {
					// do something
				}
			}); 

			res.contentType('json');
	  		res.send({ text: newComment.body, date: newComment.date });
		});	
	});

	/*
		POST a vote
	*/
	app.post('/blog/vote', function(req, res){
	
			model.BlogPost.findById(req.body.blogId, function(err, blog){
			if (err) {
				// do something
			}

			if(req.body.voteType == '+')
			{
				blog.meta.upvotes++;
			} else {
				blog.meta.downvotes++;
			}

			var voteCount = blog.meta.upvotes - blog.meta.downvotes;
			
			blog.save(function (err){
				if (err) {
					// do something
				}
			}); 

			res.contentType('json');
	  		res.send({ count: voteCount });
		});	
	});

	/*
		POST delete blog
	*/
	app.post('/blog/delete', function(req, res){

		model.BlogPost.findById(req.body.blog.id, function (err, blog){
	  		if (err) {
	  			// do something
	  		}

	  		blog.remove(function(err) {
	  			// do something
	  		});

	  		res.redirect('back');
		});
	});

	/*
		GET blog post form
	*/
	app.get('/blogs/post', function(req, res){
	
		var query = tagModel.Tag.find({});

		query.exec(function (err, tags) {
			if (err) {
				console.log(err);
	  			// do something
	  		}

			res.render('blogs/post', { title: 'New Post', tagList: tags });
		});
	});

	/*
		POST new blog
	*/
	app.post('/blogs/post', function(req, res){

		var newBlog = new model.BlogPost();
		newBlog.date = new Date();
		newBlog.title = req.body.blog.title;
		newBlog.body = req.body.blog.body; 
		newBlog.meta.views = 0;
		newBlog.meta.upvotes = 0;
		newBlog.meta.downvotes = 0;
		newBlog.meta.favs = 0;
		newBlog.meta.tags.push(req.body.tag.id);

		newBlog.save(function (err) {
	  		if (err) {
	  			console.log(err);
	  			// do something
	  		}

	  		tagModel.Tag.findById(req.body.tag.id, function (err, tag){
			  	if (err) {
			  		console.log(err);
			  		// do something
			  	}

			  	tag.blogs.push(newBlog._id);

			  	tag.save(function (err){
					if (err) {
						console.log(err);
						// do something
					}
				}); 
			});

			res.redirect('/blogs');
		});

	});
};

