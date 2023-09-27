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
$('#send-youtube').click(searchOnYoutube);

//Envoyer la video sur le chat au click
$(document).on('click', '.result-youtube', displayYoutube);

/**
 * Affichage de la vidéo youtube dans le chat
 */
function displayYoutube() 
{
    console.log("Clicked on video: ");
    var videoId = $(this).attr("videoid");
    socket.emit('sendVideo', videoId);
  }

/**
 * Vider les résultas Youtube
 */
function emptyYoutubeResults() 
{
  console.log('Vidage des résultats')
  $('#youtube-results').empty(); 
}

/**
 * Affichage de la recherche youtube reçu par le serveur
 */
function receiveSearchYoutube(data) 
{
  console.log('Requete Youtube reçue');
  var resultElement = $(
    '<div class="result-youtube" videoid="' + data.youtubeId + '">' +
    data.youtubeThumbnail +
    data.youtubeTitle +
    '</div>'
  );
  
  nextPageToken = $(data.youtubeNextPageToken);
  prevPageToken = $(data.youtubePrevPageToken);
  console.log(nextPageToken, prevPageToken);
  $('#youtube-results').append(resultElement);

};

/**
 * Envoie de la recherche youtube au serveur
 */
function searchOnYoutube(token) 
{
  // Récupère le message, puis vide le champ texte
  var input = $('#message-youtube');
  var searchYoutube = input.val();

  // On n'envoie pas un message vide
  if (searchYoutube == '') return;
  emptyYoutubeResults();
  console.log('Lancement de la recherche sur Youtube (front)');
  // Envoi le message au serveur pour broadcast
  socket.emit('youtubeSearch',searchYoutube, token);
}


// Ecouter le clique du bouton Suivant
$('#nextButton').click(function () {
  console.log(nextPageToken.selector);
  searchOnYoutube(nextPageToken);
});

// Ecouter le clique du bouton Précédent 
$('#prevButton').click(function () {
  console.log(prevPageToken.selector);
  searchOnYoutube(prevPageToken);
});


// youtubeNextPageToken: result.nextPageToken,
// youtubePrevPageToken: result.previousPageToken
// {pageToken: pageTokens}