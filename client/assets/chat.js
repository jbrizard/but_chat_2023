// Connexion au socket
var socket = io.connect(':8090');

// Demande un pseudo et envoie l'info au serveur
var name = prompt('Quel est votre pseudo ?');
socket.emit('user_enter', name);

// Gestion des événements diffusés par le serveur
socket.on('new_message', receiveMessage);

const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');


// Action quand on clique sur le bouton "Envoyer"
$('#send-message').click(sendMessage);

$(document).on("click",'#send-word',sendMysteryWord);


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

$('#pendu-icone').click(function()
{
	$('#pendu-menu').toggleClass('hidden');
	$('#game-selection').toggleClass('hidden');	
})

$('#start-game').click(function()
{
	$('#game-box').toggleClass('hidden');
})

$('.yes').click(function()
{
	$('.yes').text('Choisissez le mot')
	$('.yes').append(`<input id="mystery-word" type="text"/><input id="send-word"  type="button" value="Envoyer" />`)
});

$('.api').click(function()
{
	sendAPIWord()
	$('#game-box').toggleClass('hidden');
});

$('.stop').click(function()
{	
	$('#pendu-menu').toggleClass('hidden');
	$('#game-selection').toggleClass('hidden');	
	$('#game-box').toggleClass('hidden');
});

$('#record-box').hide();

$("#open-recording").click(function(){
	$('#record-box').toggle();
})
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
	if(message.includes("/clear")){ document.querySelector("#chat #messages").innerHTML =""; return;} //TODO remove for finnal fusion
	// Envoi le message au serveur pour broadcast
	// socket.emit('message', removeAccents(message));
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
		'<div id="' + data.idMessage + '" class="message message-' + data.socketId + '">'
			+ `<img class='avatar ${data.socketId}' src="${ data.avatar ? data.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTR3zZjipG0-Lf-MtJcieX_ASoCDA_6JfGxA&usqp=CAU" }"  />`
			+ '<div class="message-container">'
			+ '<div class="headerMessage">'
			+ '<span class="user">' + data.name  + '</span> ' 
			+ '<span class="messageDate">' + data.date  + '</span> '
			+ '</div>'
			+ '<span class="message-content">' + data.message + '</span>'
			+ '</div>'
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}

function sendMysteryWord()
{
	$('#pop-up').addClass('hidden');
	// Récupère le message, puis vide le champ texte
	var input = $('#mystery-word');
	var mysteryWord = input.val();	
	console.log(mysteryWord);
	input.val('');
	
	// On n'envoie pas un message vide
	if (mysteryWord == '')
	{
		alert('champ vide');
		
	}else
	{
		socket.emit('start-game', removeAccents(mysteryWord));
	}
	
	
	// Envoi le message au serveur pour broadcast
	
}

async function sendAPIWord()
{
	
	const response = await getWord();
	
	console.log(response);
	let mysteryWord = response[0].name;
	
	console.log('reponse sans accent : ',removeAccents(mysteryWord));
	socket.emit('start-game', removeAccents(mysteryWord));
}

function getWord()
{
	return fetch('https://trouve-mot.fr/api/random')
	.then((response) => response.json())
	.then ((data) => {
		return data;
	})
	.catch((error) => {
		throw error;
	});


}