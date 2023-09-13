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
 * Lorsqu'on appelle Daffy, il répond...
 */
function handleFile(io, props, socket)
{
	let blob, format, fileId;
	blob = props.blob;
	format = mime.lookup(props.name);

	console.log(format);

	fileId = uuidv4();
	
	fs.writeFile('../client/assets/uploads/'+fileId+props.name, blob, err => {
		if (err) {
		  console.error(err);
		}
		// file written successfully
	});


	io.sockets.emit('file_share', {name: socket.name, fileName: fileId+props.name, format: format});


}
