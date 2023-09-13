/*
 * Nom : EditMessage
 * Description : Ce module permet de modifier un de ses messages
 * Auteur(s) : Nathan Dolard Villard
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	editMessage: editMessage // permet d'appeler cette méthode dans server.js -> message.editMessage(...)
}

/**
 * On transmet une image (file) qui est ajoutée temporairement au serveur
 */
function editMessage(io, socket, avatar, callback)
{
	// envoie le nouvel avatar à l'utilisateur
	// socket.emit('new_avatar', {socketId: socket.id, avatar: socket.avatar});

}
