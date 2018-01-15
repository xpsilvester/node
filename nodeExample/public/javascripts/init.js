//客户端程序初始化逻辑
var socket=io.connect();

$(document).ready(function(){
	var chatApp=new Chat(socket);
	//显示更名尝试的结果
	socket.on('nameResult',function(result){
		var message;

		if(result.success){
			message = 'You are now known as '+result.name+'.';
		}else{
			message = result.message;
		}
		$('#messages').append(divSystemContentElement(message));
	});
	//显示房间变更结果
	socket.on('joinResult',function(result){
		$('#room').text(result.room);
		$('#messages').append(divSystemContentElement('Room changed.'));
	});
	//显示接收到的消息
	socket.on('message',function(message){
		var newElement=$('<div></div>').text(message.text);
		$('#messages').append(newElement);
	});
	//显示可用房间列表
	socket.on('rooms',function(rooms){
		$('#room-list').empty();

		for(var room in rooms){
			room = room.substring(1,room.length);
			if(room != ''){
				$('#room-list').append(divEscapedContentElement(room));
			}
		}
		//点击房间名可以换到那个房间中
		$('#room-list div').click(function(){
			chatApp.processCommand('/join'+$(this).text());
			$('#send-message').focus();
		});
	});
	//定期请求可用房间列表
	setInterval(function(){
		socket.emit('room');
	},1000);

	$('#send-message').focus();

	$('#send-form').submit(function() {
		processUserInput(chatApp,socket);
		return false;
	});
});