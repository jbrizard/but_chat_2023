/*
 * Nom : Connected
 * Description : Ce module affiche qui est connecté
 * Auteur(s) : Alexandre BELLET, Aurélien THIERRY
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
  connected: connected // permet d'appeler cette méthode dans server.js -> connected.connected(...)
}

function connected(io,sockets) 
{
  let userConnected = [];

  sockets.forEach(socket => {
    userConnected.push({
      name: socket.name,
      id: socket.id
    });
    
  });

  io.sockets.emit('user_connected',userConnected)
}