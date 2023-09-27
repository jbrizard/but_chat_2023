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

//définition des token (null si non définis)
let nextPageToken = null;
let prevPageToken = null;

// Gestion des événements diffusés par le serveur
socket.on('new_youtubeSearch', receiveSearchYoutube);

// Action quand on clique sur le bouton "Envoyer"
document.querySelector('#send-youtube').addEventListener("click", () => searchOnYoutube(null))

//Envoyer la video sur le chat au click
$(document).on('click', '.result-youtube', displayYoutube);

// Ecouter le clic du bouton Suivant
$('#nextButton').click(function () 
{
  searchOnYoutube(nextPageToken);
});

// Ecouter le clic du bouton Précédent 
$('#prevButton').click(function () 
{
  searchOnYoutube(prevPageToken);
});

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
  //Pour chaque video, ajouté une miniature et le titre
  data.items.forEach((video) => 
  {
    let resultElement = $(
      '<div class="result-youtube" videoid="' + video.id.videoId + '">' +
      `<img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.thumbnails.default.url}" class="youtube-thumbnail">` +
      `<span>${video.snippet.title}</span>` +
      '</div>'
    );
    //Mettre les résultats
    $('#youtube-results').append(resultElement);
  });

  // Vérifier si les pages Token ne sont pas vide 
  if(data.nextPageToken != undefined)
  {
    nextPageToken = data.nextPageToken;
  }
  else
  {
    nextPageToken = null;
  }

  if(data.prevPageToken != undefined)
  {
    prevPageToken = data.prevPageToken;
  }
  else
  {
    prevPageToken = null;
  }
  
};

/**
 * Envoie de la recherche youtube au serveur
 */
function searchOnYoutube(pageToken) 
{
  // Récupère le message, puis vide le champ texte
  let input = document.querySelector("#message-youtube");
  let searchYoutube = input.value;

  // On n'envoie pas un message vide
  if (searchYoutube == '') return;

  //Vide les résultats
  emptyYoutubeResults();

  console.log('Lancement de la recherche sur Youtube (front)');

  // Envoi le message au serveur pour broadcast
  socket.emit('youtubeSearch', searchYoutube, pageToken);
};