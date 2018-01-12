var socketio=require('socket.io');
var io;
var guestNumber=1;
var nickName={};
var namesUsed=[];
var currentRoom={};

exports.listen=function(server){
	//启动Socket.IO服务器，允许它搭载在已有的HTTP服务器上
	io=socketio.listen(server);

	io.set('log level',1);

	//定义每个用户连接的处理逻辑
	io.sockets.on('connection',function(socket){
		//在用户连接上来时赋予其一个访客名
		guestNumber=assignGuestName(socket,guestNumber,nickName,namesUsed);
		//在用户连接上来时把他放入聊天室Lobby里
		joinRoom(socket,'Lobby');

		//处理用户的消息，更名，以及聊天室的创建和变更
		handleMessageBroadcasting(socket,nickName);
		handleNameChangeAttempts(socket,nickName,namesUsed);
		handleRoomJoining(socket);

		//用户发出请求时，向其提供已经被占用的聊天室的列表
		socket.on('room',function(){
			socket.emit('rooms',io.sockets.manager.rooms);
		});
		//定义用户断开连接后的清除逻辑
		handleClientDisconnection(socket,nickName,namesUsed);
	})
}

//分配用户昵称

