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
socket.on('welcome', (data) => 
{
	const {name, date} = data
	welcomeUser(name, date);
});

// Afficher l'historique
function receiveMessage(data)
{
	console.log('====================================');
	console.log(data.message);
	console.log('====================================');
	if (data.message != null) 
	{
		// Affiche le message de l'historique
		$('#chat #messages').append(
			'<div id="' + data.idMessage + '" class="message message-' + data.socketId + '">'
				+ `<img class='avatar ${data.socketId}' src="${ data.avatar ? data.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTR3zZjipG0-Lf-MtJcieX_ASoCDA_6JfGxA&usqp=CAU" }"  />`
				+ '<div class="message-container">'
				+ '<div class="headerMessage">'
				+ '<span class="user">' + data.name  + '</span> ' 
				+ '<span class="messageDate">' + data.date  + '</span> '
				+ '</div>' 
				+  (/[a-zA-Z]/.test(data.message) ? '<span class="message-content">' + data.message + '</span>' : '<span class="deletedMessage"> (Supprimé) </span>')
				+ '</div>'
			+ '</div>'
		)
		.scrollTop(function(){ return this.scrollHeight })// scrolle en bas du conteneur
	} else 
	{
		// Message de connection dans l'historique
		welcomeUser(data.name, data.date);
	}
}

/**
 * Message de connection
 */
function welcomeUser(user, date)
{
	$('#chat #messages').append(
		'<div class="welcomeUser">'
			+ '<span class="date"> '+ date +' </span> '
			+ '<span><strong>' + user  + '</strong> vient de se connecter</span> ' 
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}