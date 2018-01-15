//函数divSystemContentElement用来显示系统创建的受信内容，而不是其他用户创建的。
function divEscapedContentElement(message){
	return $('<div></div>').text(message);
}
function divSystemContentElement(message){
	return $('<div></div>').html('<i>'+message+'</i>');
}

//处理原始的用户输入
//如果用户输入的内容以斜杠（/）开头，它会将其作为聊天命令处理。如果不是，就作为聊天消息发送
//给服务器并广播给其他用户，并添加到用户所在聊天室的聊天文本中。
function processUserInput(chatApp,socket){
	var message=$('#send-message').val();
	var systemMessage;

	//如果用户输入的内容以斜杠（/）开头，将其作为聊天命令
	if(message.chatAt(0) == '/'){
		systemMessage = chatApp.processCommand(message);
		if(systemMessage){
			$('#message').append(divSystemContentElement(systemMessage));
		}
	}else{
		//将非命令输入广播给其他用户
		chatApp.sendMessage($('#room').text(),message);
		$('#messages').append(divEscapedContentElement(message));
		$('#messages').scrollTop($('#messages').prop('scrollHeight'));
	}

	$('#send-message').val('');
}

