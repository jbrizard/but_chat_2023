/*
 * Nom : Avatar
 * Description : Ce module permet d'ajouter un avatar à l'utilisateur
 * Auteur(s) : Nathan Dolard Villard
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	addAvatar: addAvatar // permet d'appeler cette méthode dans server.js -> avatar.addAvatar(...)
}

/**
 * On transmet une image qui est ajoutée temporairement au serveur
 */
function addAvatar(io, avatar)
{
    
	// // Passe le message en minuscules (recherche insensible à la casse)
	// message = message.toLowerCase();
	
	// // Est-ce qu'il contient une référence à Daffy ?
	// if (message.includes('daffy'))
	// {
	// 	// Si oui, envoie la réponse de Daffy...
	// 	io.sockets.emit('new_message',
	// 	{
	// 		name:'Daffy!!',
	// 		message:'<span class="daffy">Coin Coin !</span>'
	// 	});
	// }
}
