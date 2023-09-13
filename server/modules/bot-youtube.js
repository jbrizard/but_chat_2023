/*
 * Nom : Bot Youtube
 * Description : Ce module donne une vidéo youtube lorsque que l'on appelle avec /youtube [video youtube]
 * Auteur : Adrien
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports = {
    handleYoutube: handleYoutube,
  };

// Appelle Youtube node
var YouTube = require('youtube-node');

// Créer une page Youtube
var youTube = new YouTube();

// Entre la clé unique pour utiliser l'API Youtube
youTube.setKey('AIzaSyCvhVH3bWqHvUE2MILcejO2NRY-7NcHigg');

/**
 * Le bot renvoie une vidéo youtube basé sur ce que l'utilisateur rentre
 */
function handleYoutube(io, youtubeSearch) 
{
   
  youTube.search(youtubeSearch, 2, function(error, result) {
    // Emit a message with the YouTube video data
    result.items.forEach(video => {
        io.sockets.emit('new_youtubeSearch', {
            youtubeThumbnail: `<img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.thumbnails.default.url}" class="youtube-thumbnail">`,
            youtubeTitle: `<span>${video.snippet.title}</span>`,
            youtubeId: video.id.videoId 
        });
    });
});

}

//</span><br><iframe fs="0" controls="0" color="blue" class="bot-youtube" src="https://www.youtube.com/embed/${result.items[0].id.videoId}?modestbranding=0&autostart=1&controls=0&showinfo=0"> </iframe>