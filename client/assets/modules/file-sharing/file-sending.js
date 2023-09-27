// Vide l'input (au début) file pour évité l'envoi non intentionnel de fichier
document.getElementById("file-input").value = null;

// Ecoute de file sharings
socket.on('file_share', receiveFile);

// (Click du bouton ou "Enter") pour envoyer des fichier (on peut donc envoyer des fichier et messages en même temps)
$('#send-message').click(() => {
	sendFile();
});

$('#message-input').keyup(function(evt)
{
	if (evt.keyCode == 13) sendFile(); // (possible d'envoyer un message ET un fichier en même temps)
});



/**
 * Envoi d'un fichier
 */
function sendFile()
{
	// creation de la variable vide blob
	let blob;
	const fileInput = document.getElementById("file-input");
	// vérification si un fichier a été donné (et arret si pas de fichier)
    if(fileInput.files.length == 0){
        return;
	}
	// récuperation du fichier et conversion en blob
	blob = new Blob([fileInput.files[0]],{type: "octet-stream"});

	// Envoi le message au serveur pour broadcast
	socket.emit('send_file', {name: fileInput.files[0].name, blob: blob});
	// Vide l'input pour éviter les envoi de fichier en doublons
	document.getElementById("file-input").value = null;

}

/**
 * Fonction qui display no medias (fait appel à une autre fonction qui fait la gestion des formats)
 */
function receiveFile(data)
{
	$('#chat #messages').append(
		'<div class="message">'
			+ '<span class="user">' + data.name  + '</span> ' 
			+ mediaDisplay(data)
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}

/**
 * Gestion des formats (different lecteur en fonction du format)
 */
function mediaDisplay(data)
{
	switch (data.format)
	{
		// pour les images
		case "image/jpeg":
		case "image/gif":
		case "image/png":
			return (
				'<a href="/../uploads/' + data.fileName + '" target="_blank" rel="noopener noreferrer">' 
					+ '<img src="/../uploads/' + data.fileName + '">' 
				+ '</a>'
			);
			break;
		// pour les video
		case "video/mp4":
			return (
				'<video controls autoplay src="/../uploads/' + data.fileName + '">'
			);
			break;
		// pour les fichier compressé
		case "application/zip":
		case "application/vnd.rar":
			return (
				'<a href="/../uploads/' + data.fileName + '">' + data.fileName + '</a>'
			);
			break;
		// pour l'audio
		case "audio/mpeg":
			return (
				'<audio controls autoplay src="/../uploads/' + data.fileName + '"></audio>'
			);
			break;
		// pdf
		case "application/pdf":
			return (
				'<object type="application/pdf" data=/../uploads/' + data.fileName + '></object>'
			);
			break;
		default:
			break;
	}
}