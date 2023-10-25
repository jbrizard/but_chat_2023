// Connexion au socket
var socket = io.connect(':8090');

const emojisManager = new EmojisManager()
let toggleEmojisPannel = false;

// Demande un pseudo et envoie l'info au serveur
var name = prompt('Quel est votre pseudo ?');
socket.emit('user_enter', name);

// Gestion des événements diffusés par le serveur
socket.on('new_message', receiveMessage);

const chess = new ChessChat(document.querySelector('.users-proposal'), socket, name)

const input = $('#message-input');

// Action quand on clique sur le bouton "Envoyer"
$('#send-message').click(sendMessage);

// Action quand on appuye sur la touche [Entrée] dans le champ de message (= comme Envoyer)
input.keyup(function(evt)
{
	if (evt.keyCode == 13) // 13 = touche Entrée
		sendMessage();
});

// Action quand on clique sur le bouton Aide (?)
$('#help-toggle').click(function()
{
	$('#help-content').fadeToggle('fast');
});

input.keyup(function(e)
{
	input.val(emojisManager.setEmojisInMessage(input.val()))
	chess.stringAnalyse(input.val())
});



$('#set-emoji').click(function() {
	toggleEmojisPannel = !toggleEmojisPannel

	if (toggleEmojisPannel === true) {
		let emojis = emojisManager.getEmojis()

		$('#chat').css('position','relative')
		$('#tools').append(
		`
		<div id="pannel-emojis">
			${emojis.map(emoji => {
				return `<button id="pannel-emojis-button-${emoji.codes}" class="pannel-emojis-button">${emoji.emoji}</button>`
			}).join('')}
		</div>
		`
		)
		$('.pannel-emojis-button').click((item) => {
			let val = item.target.id.split('pannel-emojis-button-').join('')
			let index = emojis.findIndex((element) => element.codes === val)
			input.val(`${input.val()}${emojis[index].emoji}`)
		})
	}
	else {
		$('#pannel-emojis').remove()
	}
})



/**
 * Envoi d'un message au serveur
 */
function sendMessage()
{
	// Récupère le message, puis vide le champ texte
	var message = input.val();	

	input.val('');
	
	// On n'envoie pas un message vide
	if (message == '')
		return;
	
	// Envoi le message au serveur pour broadcast
	socket.emit('message', message)
	
}

/**
 * Affichage d'un message reçu par le serveur
 */
function receiveMessage(data)
{
	let newMessage = emojisManager.setEmojisInMessage(data.message)

	$('#chat #messages').append(
		'<div class="message">'
			+ '<span class="user">' + data.name  + '</span> ' 
			+ newMessage 
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}
