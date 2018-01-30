var express=require('express');
var router = express.Router();  
var jade = require('jade');  
var db = require("./db.js");
  
/* GET test page. */  

router.get('/', function(req, res, next) { 
	//从数据库取值 
	db.query('SELECT * FROM userstest', function(err,results) {
	  if (err) throw err;
	  res.render('test', {name:'testName',testResults:results});
	});
	
}); 


module.exports = router;