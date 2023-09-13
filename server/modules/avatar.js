/*
 * Nom : Avatar
 * Description : Ce module permet d'ajouter un avatar à l'utilisateur
 * Auteur(s) : Nathan Dolard Villard
 */
var path = require('path');	
var fs = require('fs');	// Accès au système de fichier

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	addAvatar: addAvatar // permet d'appeler cette méthode dans server.js -> avatar.addAvatar(...)
}

/**
 * On transmet une image (file) qui est ajoutée temporairement au serveur
 */
function addAvatar(io, socket, avatar, callback, history)
{
	const previousAvatar = socket.avatar;
	if (avatar.name)
	{
		// Récupère l'extension
		var ext = path.extname(avatar.name).toLowerCase();

		// Nom du fichier
		const fileName = socket.id + "-" + Date.now() + ext;

		// Enregistre le fichier temporairement
		fs.writeFile("../client/assets/tmp/upload/" + fileName, avatar.file, (err) => 
		{
			callback({ message: err ? "failure : " + err : "success" });
			if (err) {
				socket.avatar = "./modules/avatar/defaultAvatar.png";
			}
		});
		socket.avatar = "./tmp/upload/" + fileName;
		
	}
	else 
	{
		socket.avatar = "./modules/avatar/defaultAvatar.png";
	}
	history.map((item) => 
	{
		if( item.socketId == socket.id && item.avatar != socket.avatar)
		{
			item.avatar = socket.avatar;
		}
	})
	// Suppression de l'ancienne image
	if (previousAvatar != socket.avatar && previousAvatar != undefined) 
	{
		var transformedPath = path.resolve("../client/assets", previousAvatar);
		fs.unlinkSync(transformedPath, (err) => {
			if (err) 
			{
				console.log(err);
			}
		});
	}

	// envoie le nouvel avatar à l'utilisateur
	socket.emit('new_avatar', {socketId: socket.id, avatar: socket.avatar});
	// envoie le nouvel avatar à tout les utilisateurs
	io.sockets.emit('new_avatar_for_all', {socketId: socket.id, avatar: socket.avatar});

}
