module.exports = function (mongoose) {

	var modelObject = {};

	var Schema = mongoose.Schema
	  , ObjectId = Schema.ObjectId;

	var TagSchema = new Schema({
		  name				: String
		, blogs				: [String]
	});

	modelObject.TagSchema = TagSchema;
	modelObject.Tag = mongoose.model('Tag', TagSchema);

	return modelObject;
};