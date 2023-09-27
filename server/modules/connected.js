/*
 * Nom : Connected
 * Description : Ce module affiche qui est connecté
 * Auteur(s) : Alexandre BELLET, Aurélien THIERRY
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
  connected: connected // permet d'appeler cette méthode dans server.js -> connected.connected(...)
}

// Fonction qui récupère les info de connections du dernier socket et les ajoute aux autres données des sockets déjà présentent
function connected(io,sockets) 
{
  // Initialisation d'un tableau dans lequel est inséré toutes les données des sockets
  let userConnected = [];

  sockets.forEach(socket => {
    userConnected.push({
      name: socket.name,
      id: socket.id,
      avatar: socket.avatar
    });
    
  });

  // Envoie les info du tableau à tous les sockets connectés
  io.sockets.emit('user_connected',userConnected)
}