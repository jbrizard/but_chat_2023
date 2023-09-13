/*
 * Nom : Historique
 * Description : Ce module permet de récupérer l'historique des messages
 * Auteur(s) : Nathan Dolard Villard
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	getHistory: getHistory // permet d'appeler cette méthode dans server.js -> message.getHistory(...)
}

/**
 * On transmet une image (file) qui est ajoutée temporairement au serveur
 */
function getHistory(io, socket, messageHistory, name)
{
	// Envoyer l'historique des messages au nouveau client qui se connecte
    socket.emit('messageHistory', messageHistory)
    // Message de connection dans le chat
    io.sockets.emit('welcome', name);
    // Connaitre mon id
    socket.emit('myId', socket.id);
    // Ajouter le message de connection dans l'historique
    messageHistory.push({name:name, message:null, socketId: socket.id, avatar: socket.avatar });

}
