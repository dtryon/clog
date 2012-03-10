module.exports = function (app, service) {

	var dateFormatter = service.useModule('dateFormatter');
	var model = service.useModel('blog');
	var tagModel = service.useModel('tag');

	/*
		GET list of blogs page
	*/
	app.get('/blogs', function(req, res){
		
		var query = model.BlogPost.find({});

		query.where('date').lte(new Date());
		query.desc('date');
		query.limit(20);

		query.exec(function (err, blogs) {
			if (err) {
				console.log(err);
	  			// do something
	  		}

	  		var query = tagModel.Tag.find({});

			query.exec(function (err, tags) {
				if (err) {
					console.log(err);
		  			// do something
		  		}

				res.render('blogs/index', { title: 'Clogs', blogList: blogs, tagList: tags, dateFormatter: dateFormatter });
			});
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

	  		var newIP = true;
	  		if (blog.meta.uniqueIPs) {

	  			var registeredIPs = blog.meta.uniqueIPs;
	  			for(i=0;i<registeredIPs.length;i++) {
	  				if (registeredIPs[i] == req.connection.remoteAddress) {
	  					
	  					newIP = false;
	  				}
	  			}
	  		} else {
	  			blog.meta.uniqueIPs = [];
	  		}

	  		if (newIP) {
	  			blog.meta.uniqueIPs.push(req.connection.remoteAddress);
	  		}

	  		blog.save(function(err) {
	  			console.log(err);
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
		GET edit page for blog
	*/
	app.get('/blog/edit/:id', function(req, res){
	
		model.BlogPost.findById(req.params.id, function (err, blog){
	  		
	  		if (err) {
	  			console.log(err);
	  			// do something
	  		}

	  		var query = tagModel.Tag.find({});

			query.exec(function (err, tagList) {
				if (err) {
					console.log(err);
		  			// do something
		  		}

		  		console.log(blog.meta.tags);

		  		var query = tagModel.Tag.find( { _id: { $in : blog.meta.tags } } );

		  		query.exec(function (err, tags) {
		  			if (err) {
		  				console.log(err);
			  			// do something
			  		}

			  		var selectedTags = {};

			  		if (tags) {
			  			for(i=0;i<tags.length;i++) {
			  				selectedTags[tags[i].name] = tags[i].name;
			  			}
			  		}

		  			res.render('blogs/edit', { layout: 'editor-layout', title: 'Clog', blog: blog, tagList: tagList, selectedTags: selectedTags });	
		  		});
		  	});
		});
	});

	/*
		POST edit a blog
	*/
	app.post('/blogs/edit', function(req, res){

		model.BlogPost.findById(req.body.blog.id, function (err, blog){
	  		if (err) {
	  			console.log(err);
	  			// do something
	  		}

	  		if (blog.title != req.body.blog.title) {
	  			blog.title = req.body.blog.title;
	  		}

	  		if (req.body.blog.date) {
		  		if (blog.date != new Date(req.body.blog.date)) {
		  			blog.date = new Date(req.body.blog.date);
		  		}
		  	}

	  		if (blog.body != req.body.blog.body) {
	  			blog.body = req.body.blog.body;
	  		}

	  		blog.meta.tags = [];

	  		blog.save(function (err) {
		  		if (err) {
		  			console.log(err);
		  			// do something
		  		}

		  		if (req.body.tag) {

					var query;
					if (req.body.tag.ids instanceof Array) {
						
						blog.meta.tags = req.body.tag.ids;
						query = tagModel.Tag.find( { _id: { $in : req.body.tag.ids } } );
					} else {
						
						blog.meta.tags.push(req.body.tag.ids);
						query = tagModel.Tag.find( { _id: { $in : [req.body.tag.ids] } } );
					}

					query.exec(function (err, tags) {
			  			if (err) {
			  				console.log(err);
				  			// do something
				  		}

				  		if (tags) {
					  		for(i=0; i<tags.length; i++) {
					  			var tag = tags[i];
					  			
					  			if (tag.blogs.indexOf(blog._id) == -1) {
					  				tag.blogs.push(blog._id);
					  			}

							  	tag.save(function (err){
									if (err) {
										console.log(err);
										// do something
									}
								}); 
					  		}	
				  		}  		
			  		});
				}

				console.log(blog.meta.tags);

				blog.save(function (err) {
			  		if (err) {
			  			console.log(err);
			  			// do something
			  		}

					res.redirect('/blogs');
				});
					  		
			});
		});
	});

	/*
		POST a comment
	*/
	app.post('/blog/comment', function(req, res){
	
			model.BlogPost.findById(req.body.blogId, function(err, blog){
			if (err) {
				console.log(err);
				// do something
			}

			var newComment = new model.Comment();
			newComment.body = req.body.comment;
			newComment.date = new Date();

			blog.comments.push(newComment);
			
			blog.save(function (err){
				if (err) {
					console.log(err);
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
				console.log(err);
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
					console.log(err);
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
	  			console.log(err);
	  			// do something
	  		}

	  		blog.remove(function(err) {
	  			console.log(err);
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

			res.render('blogs/post', { layout: 'editor-layout', title: 'New Post', tagList: tags });
		});
	});

	/*
		POST new blog
	*/
	app.post('/blogs/post', function(req, res){

		if (req.body.blog.title != '') {
			var newBlog = new model.BlogPost();

			if (req.body.blog.date) {
				newBlog.date = new Date(req.body.blog.date);
			} else {
				newBlog.date = new Date();
			}
			newBlog.title = req.body.blog.title;
			newBlog.body = req.body.blog.body; 
			newBlog.meta.uniqueIPs = [];
			newBlog.meta.upvotes = 0;
			newBlog.meta.downvotes = 0;
			newBlog.meta.favs = 0;

			if (req.body.tag) {
				
				var query;
				if (req.body.tag.ids instanceof Array) {	
					newBlog.meta.tags = req.body.tag.ids;
					query = tagModel.Tag.find( { _id: { $in : req.body.tag.ids } } );
				} else {
					newBlog.meta.tags.push(req.body.tag.ids);
					query = tagModel.Tag.find( { _id: { $in : [req.body.tag.ids] } } );
				}

				query.exec(function (err, tags) {
		  			if (err) {
		  				console.log(err);
			  			// do something
			  		}

			  		if (tags) {
				  		for(i=0; i<tags.length; i++) {
				  			var tag = tags[i];
				  			
				  			tag.blogs.push(newBlog._id);

						  	tag.save(function (err){
								if (err) {
									console.log(err);
									// do something
								}
							}); 
				  		}	
			  		}  		
		  		});
			}

			newBlog.save(function (err) {
		  		if (err) {
		  			console.log(err);
		  			// do something
		  		}

				res.redirect('/blogs');
			});
		} else {
			res.redirect('back');
		}
	});
};


