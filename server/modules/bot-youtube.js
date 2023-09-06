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
youTube.setKey('AIzaSyAZvHRVOdjklHIwt9kw1Laih0VIovM-RjM');

/**
 * Le bot renvoie une vidéo youtube basé sur ce que l'utilisateur rentre
 */
function handleYoutube(io, message) 
{
    // Est-ce que l'on appelle le bot youtube ?
    if (message.includes('/youtube')) 
    {
        // Si oui, lancer une recherche Youtube 
        youTube.search(message.replace('/youtube',''), 2, function(error, result) 
        {
                //Faire un message avec la vidéo youtube
                io.sockets.emit('new_message', 
                {
                  name: 'Youtube',
                  message: `<iframe class="bot-youtube" src="https://www.youtube.com/embed/${result.items[0].id.videoId}"> </iframe>`
                });
          });
    }
}
