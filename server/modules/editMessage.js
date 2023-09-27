/*
 * Nom : EditMessage
 * Description : Ce module permet de modifier un de ses messages
 * Auteur(s) : Nathan Dolard Villard
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	editMessage: editMessage // permet d'appeler cette méthode dans server.js -> editMessage.editMessage(...)
}

/**
 * On transmet une image (file) qui est ajoutée temporairement au serveur
 */
function editMessage(io, socket, data)
{
	// Envoyer le nouveau message à tout le monde
	io.sockets.emit('new_message_edited', {message:data.message, socketId: socket.id, idMessage : data.id });
	

}
