module.exports = function (app, service) {

	/*
		GET home page
	*/
    app.get('/', function(req, res){
	
		res.render('index', { title: 'Clog ME' });	
	});
};