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
function handleYoutube(io, youtubeSearch, pageToken) 
{
  console.log(pageToken);

    youTube.search(youtubeSearch, 2, {pageToken: pageToken}, function(error, result) {
      // Emit a message with the YouTube video data
      io.sockets.emit('new_youtubeSearch', result);
    });
};