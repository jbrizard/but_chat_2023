// Écouter l'historique initial des messages
socket.on('messageHistory', (history) => {
    history.forEach((message) => {
        console.log(message);
      // Afficher chaque message dans votre interface utilisateur
      receiveMessage(message);
    });
  });


  function receiveMessage(data)
{
	$('#chat #messages').append(
		'<div class="message">'
			+ `<img class='avatar ${data.socketId}' src="${ data.avatar ? data.avatar : "./modules/avatar/defaultAvatar.png" }"  />`
			+ '<div class="message-container">'
			+ '<span class="user">' + data.name  + '</span> ' 
			+ '<span class="message-content">' + data.message + '</span>'
			+ '</div>'
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}