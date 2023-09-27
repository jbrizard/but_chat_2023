/*
 * Nom : Bot Blague
 * Description : Ce module fait des blague lorsque que l'on appelle avec /blague
 * Auteur : Adrien
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports = {
    handleBlague: handleBlague,
  };
  
/**
 * Le bot renvoie une blague à partir d'un fichier Json
 */
function handleBlague(io, message) 
{
    // Passe le message en minuscules
    message = message.toLowerCase();
  
    // Est-ce que l'on apelle le bot de blague
    if (message.includes('/blague')) 
    {
      const jokeRandom = getRandomJoke();
  
      // Si oui, envoie une blague
      io.sockets.emit('new_message', 
      {
        name: 'BotBlague',
        message: `<span>${jokeRandom.title}</span>`,
      });

      //Envoie la réponse/la suite de la blague après 2 secondes 
      setTimeout(() => {
        io.sockets.emit('new_message', {
          name: 'BotBlague',
          message: `<span>${jokeRandom.text}</span>`,
        });
      }, 2000);

    }
}

/**
* Retourne une blague aléatoire du fichier JSON : "blagues.json"
*/
function getRandomJoke() 
{
    //Fichier JSON contenant les blagues
    const jokeData = require('./blagues.json'); 

    //Défini un nombre aléatoire basé sur le nombre de blague
    const randomIndex = Math.floor(Math.random() * jokeData.length);

    //Retourne la blague situé au nombre tiré précédement 
    return jokeData[randomIndex];
}