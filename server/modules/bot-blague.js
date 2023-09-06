/*
 * Nom : Daffy !
 * Description : Ce module ne fait pas grand chose... quand on appelle Daffy, il répond !
 * Auteur(s) : Jérémie Brizard
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

      //Envoie la réponse/suite de la blague
      io.sockets.emit('new_message', 
      {
        name: 'BotBlague',
        message: `<span>${jokeRandom.text}</span>`
      });
    }
}

  /**
 * Permet de choisir un nombre aléatoire et un blague du fichier JSON de blague
 */
  function getRandomJoke() 
  {
    const jokeData = require('./blagues.json');
    const randomIndex = Math.floor(Math.random() * jokeData.length);
    return jokeData[randomIndex];
  }