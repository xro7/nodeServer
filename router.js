
module.exports = function(app){
	
	//app.get('/register',site.register);

	app.get('/',function(req,res){
		res.end("Server is up and running");
	});



};