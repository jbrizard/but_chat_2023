// Écouter l'historique initial des messages
socket.on('messageHistory', (history) => 
{
    history.forEach((message) => 
	{
      // Afficher chaque message dans votre interface utilisateur
      receiveMessage(message);
    });
});

// Message de connection à la connexion
socket.on('welcome', (user) => 
{
	welcomeUser(user);
});

// Afficher l'historique
function receiveMessage(data)
{
	if (data.message != null) 
	{
		// Affiche le message de l'historique
		$('#chat #messages').append(
			'<div class="message">'
				+ `<img class='avatar ${data.socketId}' src="${ data.avatar ? data.avatar : "./modules/avatar/defaultAvatar.png" }"  />`
				+ '<div class="message-container">'
				+ '<span class="user">' + data.name  + '</span> ' 
				+ '<span class="message-content">' + data.message + '</span>'
				+ '</div>'
			+ '</div>'
		)
		.scrollTop(function(){ return this.scrollHeight })// scrolle en bas du conteneur
	} else 
	{
		// Message de connection dans l'historique
		welcomeUser(data.name);
	}
}

/**
 * Message de connection
 */
function welcomeUser(user)
{
	$('#chat #messages').append(
		'<div class="welcomeUser">'
			+ '<span><strong>' + user  + '</strong> vient de se connecter</span> ' 
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}