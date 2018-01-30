var express = require('express');  
var router = express.Router();  
var jade = require('jade');  
  
// Compile a function  
var fn = jade.compile('hello world #name', {});  
  
// Render the function  
var html = fn({name:'liu'});  
console.log(html);  
  
// 渲染字符串  
var rtn = jade.render('.csser.com hello,#{name}', { name: 'liuchuanchuan' });  
console.log(rtn);  
  
  
// 渲染文件  
var city_names = [  
    'wuhan',  
    'tianjin',  
    'beijing',  
    'shanghai'  
];  
  
var city_scores = [  
    '60',  
    '62',  
    '80',  
    '70'  
];  
  
/* GET home page. */  
router.get('/', function(req, res, next) {  
  res.render('index', { citys: city_names, cscores: city_scores, name:'liuchuanchuan',h1:'who are you'});  
});  
  
  
module.exports = router;  