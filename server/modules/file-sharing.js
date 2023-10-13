/*
 * Nom : File sharing ! :)
 * Description : Module permettant le partage de fichier (et peut être la visualisation)...
 * Auteur(s) : Justin
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleFile: handleFile
}

// import de "File system"
const fs = require('fs');
// MIME recognition
var mime = require('mime-types');


const { v4: uuidv4 } = require('uuid');

/**
 * Reçoit le fichier (en blob) et analyse son format
 * L'enregistre dans le dossier "/client/assets/uploads" chaque fichier ayant un hash different pour les différencier
 * Et pour finir envoie les fichier aux utilisateurs
 */
function handleFile(io, username, socketId, avatar, idMessage, date , props)
{
	// definition de variables vides
	let blob, format, fileId;
	// stocke le blob et définit le format du fichier
	blob = props.blob;
	format = mime.lookup(props.name);
	// définition du hash
	fileId = uuidv4();
	
	// enregistrement du fichier
	fs.writeFile('../client/assets/uploads/'+fileId+props.name, blob, err => {
		if (err) {
		  console.error(err);
		}
		// success ici
	});

	// Envoi du fichier (liens vers le fichier) aux autres users
	io.sockets.emit('file_share', {name: username, socketId: socketId, avatar: avatar, idMessage: idMessage, date: date, fileName: fileId+props.name, format: format});


}
