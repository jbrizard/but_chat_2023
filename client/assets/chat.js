// Connexion au socket
var socket = io.connect(':8090');

// Demande un pseudo et envoie l'info au serveur
var name = prompt('Quel est votre pseudo ?');
socket.emit('user_enter', name);

// Gestion des événements diffusés par le serveur
socket.on('new_message', receiveMessage);

// Action quand on clique sur le bouton "Envoyer"
$('#send-message').click(sendMessage);

// Action quand on appuye sur la touche [Entrée] dans le champ de message (= comme Envoyer)
$('#message-input').keyup(function(evt)
{
	if (evt.keyCode == 13) // 13 = touche Entrée
		sendMessage();
});

// Action quand on clique sur le bouton Aide (?)
$('#help-toggle').click(function()
{
        $('#help-content').fadeToggle('fast');
});

// Action quand on clique sur le bouton Connected
$('#connected-toggle').click(function()
{
        $('#connected-content').fadeToggle('fast');
});


/**
 * Envoi d'un message au serveur
 */
function sendMessage()
{
	// Récupère le message, puis vide le champ texte
	var input = $('#message-input');
	var message = input.val();	
	input.val('');
	
	// On n'envoie pas un message vide
	if (message == '')
		return;
	
	// Envoi le message au serveur pour broadcast
	socket.emit('message', message);

	// Envoi le message au serveur pour feedback
	socket.emit('writing', false);
}

/**
 * Affichage d'un message reçu par le serveur
 */
function receiveMessage(data)
{
	$('#chat #messages').append(
		'<div class="message">'
			+ `<img class='avatar ${data.socketId}' src="${ data.avatar ? data.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTR3zZjipG0-Lf-MtJcieX_ASoCDA_6JfGxA&usqp=CAU" }"  />`
			+ '<div class="message-container">'
			+ '<span class="user">' + data.name  + '</span> ' 
			+ '<span class="message-content">' + data.message + '</span>'
			+ '</div>'
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}