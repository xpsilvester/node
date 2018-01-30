var express=require('express');
var router = express.Router();  
var jade = require('jade');  
var db = require("./db.js");

router.get('/', function(req, res, next) {
	res.render('login', {title:'login'});
});



/* 实现登录验证功能 */  

router.get('/verify', function(req, res, next) {
	//页面传值
	var name=req.query.name;
 	var pwd=req.query.pwd; 
 	var selectSQL = "select * from user where name = '"+name+"' and password = '"+pwd+"'";

	//从数据库查询 
	db.query(selectSQL, function(err,results) {
	  if (err) throw err;
	  if (results.length==0)
	  	res.send('用户名或密码错误');
	  else
	    res.render('test', {name:'login',testResults:results});
	});
	
}); 

/* 实现登录验证功能 */  
router.get('/register', function(req, res, next) {
	//页面传值
	var name=req.query.name;
 	var pwd=req.query.pwd; 
 	var user={name:name,password:pwd};

 	//验证账户是否存在
 	db.query("select * from user where name = '"+name+"'", function(err,results) {
	  if (err) throw err;
	  if (results.length!=0)
	  	res.send('用户名已存在');
	  else
	    //从插入数据库 
		db.query('insert into user set ?',user,function(err,results) {
		  if (err) throw err;
		  res.send('注册成功！');
		});
	});
}); 



module.exports = router;