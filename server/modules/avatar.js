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
function addAvatar(io, socket, avatar, callback)
{
	const preventAvatar = socket.avatar;
	if (avatar.name)
	{
		// Récupère l'extension
		var ext = path.extname(avatar.name).toLowerCase();

		// Enregistre le fichier temporairement
		fs.writeFile("../client/assets/tmp/upload/" + socket.id + "-" + Date.now() + ext, avatar.file, (err) => 
		{
			callback({ message: err ? "failure : " + err : "success" });
		});
		socket.avatar = "./tmp/upload/" + socket.id + "-" + Date.now() + ext
	}
	else 
	{
		socket.avatar = "./modules/avatar/defaultAvatar.png"
	}
	if (condition) {
		
	}
	console.log(socket.avatar, preventAvatar);
	if (preventAvatar != socket.avatar) 
	{
		var transformedPath = path.resolve("../client/assets", preventAvatar);
		fs.unlinkSync(transformedPath, (err) => {
			if (err) 
			{
				console.log(err);
			}
		});


		
	}

	io.sockets.emit('new_avatar', {socketId: socket.id, avatar: socket.avatar});

}
