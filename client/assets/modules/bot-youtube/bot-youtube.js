//Ouvre la boite de dialogue pour chercher des vidéos youtube
var openMenuButton = document.getElementById('open-youtube');
var menu = document.getElementById('bot-youtube');
openMenuButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Action quand on appuye sur la touche [Entrée] dans le champ de message (= comme Envoyer)
$('#message-youtube').keyup(function(evt)
{
	console.log('keyup')
	if (evt.keyCode == 13) // 13 = touche Entrée
	searchOnYoutube();
});

// Gestion des événements diffusés par le serveur
socket.on('new_youtubeSearch', receiveSearchYoutube);

// Action quand on clique sur le bouton "Envoyer"
$('#send-youtube').click(emptyYoutubeResults);
$('#send-youtube').click(searchOnYoutube);

//
$(document).on('click', '.result-youtube', displayYoutube);

/**
 * Affichage de la vidéo youtube dans le chat
 */
function displayYoutube() {
    console.log("Clicked on video: ");
    var videoId = $(this).attr("videoid");
    socket.emit('sendVideo', videoId);
  }

  function emptyYoutubeResults() {
    $('#youtube-results').empty(); 
  }
/**
 * Affichage de la recherche youtube reçu par le serveur
 */
function receiveSearchYoutube(data) {
    console.log('received');
    var resultElement = $(
        '<div class="result-youtube" videoid="' + data.youtubeId + '">' +
        data.youtubeThumbnail +
        data.youtubeTitle +
        '</div>'
    );
    $('#youtube-results').append(resultElement);
}

/**
 * Envoie de la recherche youtube au serveur
 */
function searchOnYoutube()
{
	// Récupère le message, puis vide le champ texte
	var input = $('#message-youtube');
	var searchYoutube = input.val();	
	input.val('');
	
	// On n'envoie pas un message vide
	if (searchYoutube == '')
		return;
	
	// Envoi le message au serveur pour broadcast
	socket.emit('youtubeSearch', searchYoutube);
}
