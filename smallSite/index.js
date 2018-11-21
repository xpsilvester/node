let http=require("http"); //引入核心http模块
let fs=require("fs");
let mime=require("mime"); //解决文件类型
let url=require("url");
//创建一个函数，req代表客户端，res代表服务器可写流
let listener=(req,res)=>{
//res是可写流，有write和end
 let {query,pathname}=url.parse(req.url,true);
 if(pathname==="/"){
  //设置编码
  res.setHeader('Content-Type','text/html;charset=utf-8');
  fs.createReadStream('index.html').pipe(res);
 }else{
  if(fs.existsSync(`.${pathname}`)) {
   //mime 第三方包 npm install mime --save
   //mime.lookup可以通过文件路径后缀判断是什么类型的
   res.setHeader('Content-Type', mime.getType(pathname)+';charset=utf-8');
   fs.createReadStream(`.${pathname}`).pipe(res);
  }else{
   res.statusCode=404;
   res.end();
  }
 }

}
let port=4000;
//创建一个服务，放入一个监听函数，
let server=http.createServer(listener);
//
server.listen(port,function () {
 //启动成功后
 console.log(`start${port}`);
})