
module.exports = function (mongoose) {
	var modelObject = {};

	var Schema = mongoose.Schema
	  , ObjectId = Schema.ObjectId;

	var CommentSchema = new Schema({
		  body				: String
		, date				: Date
	});

	var BlogPostSchema = new Schema({
		  author			: ObjectId
		, title				: String
		, body				: String
		, buf				: Buffer
		, date				: Date
		, comments			: [CommentSchema]
		, meta				: {
							  upvotes	: Number
							, downvotes	: Number
							, favs		: Number
							, views		: Number
							, tags		: [String]
		}
	});

	modelObject.Comment = mongoose.model('Comment', CommentSchema);
	modelObject.BlogPost = mongoose.model('BlogPost', BlogPostSchema);

	return modelObject;
};

