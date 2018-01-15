//在初始化时可用传入一个Socket.IO的参数socket

var Chat = function(socket){
	this.socket=socket;
};
//发送聊天消息的函数
Chat.prototype.sendMessage=function(room,text){
	var message={
		room:room,
		text:text
	};
	this.socket.emit('message',message);
}

//变更房间的函数
Chat.prototype.changeRoom=function(room){
	this.socket.emit('join',{
		newRoom:room
	});
};

//处理聊天命令
Chat.prototype.processCommand=function(command){
	var words=command.split(' ');
	//从第一个单词开始解析命令
	var command=words[0].substring(1,words[0].length).toLowerCase();

	var message = false;

	switch(command){
		//处理房间的变换/创建
		case 'join':
			words.shift();
			var room = words.join(' ');
			this.changeRoom(room);
			break;

		//处理更名尝试
		case 'nick':
			words.shift();
			var name=words.join(' ');
			this.socket.emit('nameAttempt',name);
			break;
		//如果命令无法识别，返回错误消息
		default:
			message='Unrecognized command.';
			break;
	}

	return message;
}