/*
 * Nom : Bot Youtube
 * Description : Ce module donne une liste de vidéo youtube
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
youTube.setKey('AIzaSyDrjtxylM2qHRr_54xwuSaTQKq8NEuFhi0');

/**
 * Le bot renvoie une vidéo youtube basé sur ce que l'utilisateur rentre
 */
function handleYoutube(socket, youtubeSearch, pageToken) 
{
    youTube.search(youtubeSearch, 3, {pageToken: pageToken}, function(error, result) {
      //Envoyer la vidéo Youtube
      socket.emit('new_youtubeSearch', result);
    });
};

