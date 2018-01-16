//内置的http模块提供了HTTP服务器和客户端功能
var http=require('http');
//内置的path模块提供了与文件系统路径相关的功能
var fs=require('fs');
var path=require('path');
//附加的mime模块有根据文件扩展名得出MIME类型的能力
var mime=require('mime');

//cache是用来缓存文件内容的对象
var cache={};

//文件不存在时发送404错误
function send404(response){
	response.writeHead(404,{'Content-Type':'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
}

//提供文件数据服务，发送文件内容
function sendFile(response,filePath,fileContents){
    response.writeHead(
       200,
       {"content-Type":mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}

//判断文件是否缓存，如果是就返回。如果没缓存，就从硬盘读取并返回。如果不存在则返回404
function serveStatic(response,cache,absPath){
	//检查文件是否缓存在内存中
	if(cache[absPath]){
		//从内存中返回文件
		sendFile(response,absPath,cache[absPath]);
	}else{
		fs.exists(absPath,function(exists){
			//检查文件是否存在
			if(exists){
				fs.readFile(absPath,function(err,data){
					//从硬盘中读取文件
					if(err){
						send404(response);
					}else{
						cache[absPath]=data;
						sendFile(response,absPath,data);
					}
				})
			}else{
				send404(response);
			}
		});
	}
}

//创建HTTP服务器
var server=http.createServer(function(request,response){
	//创建HTTP服务器，用匿名函数定义对每个请求的处理行为
	var filePath=false;
	if(request.url=='/'){
		//默认返回HTML文件
		filePath='public/index.html';
	}else{
		//将URL路径转为文件的相对路径
		filePath='public'+request.url;
	}
	var absPath='./'+filePath;
	//返回静态文件
	serveStatic(response,cache,absPath);
});

server.listen(3000,function(){
	console.log("Server listening on port 3000.");
});

//添加socket
var chatServer=require('./lib/chat_server');
chatServer.listen(server);