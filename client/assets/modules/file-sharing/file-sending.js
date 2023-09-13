// empty file input to avoid non intentionnal sending of files
document.getElementById("file-input").value = null;

// listen for file sharings
socket.on('file_share', receiveFile);

// (click button or press "Enter") like messages to send file (so you can send both files and image simultaneously)
$('#send-message').click(() => {
	sendFile(); // (possible d'envoyer un message ET un fichier en même temps)
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
	let blob;
	const fileInput = document.getElementById("file-input");

    if(fileInput.files.length == 0){
        return;
	}

	blob = new Blob([fileInput.files[0]],{type: "octet-stream"});

	// Envoi le message au serveur pour broadcast
	socket.emit('send_file', {name: fileInput.files[0].name, blob: blob});
	document.getElementById("file-input").value = null;

}


function receiveFile(data){
	$('#chat #messages').append(
		'<div class="message">'
			+ '<span class="user">' + data.name  + '</span> ' 
			+ mediaDisplay(data)
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}

function mediaDisplay(data){

	switch (data.format) {
		case "image/jpeg":
		case "image/gif":
		case "image/png":
			return (
				'<a href="/../uploads/' + data.fileName + '" target="_blank" rel="noopener noreferrer">' 
					+ '<img src="/../uploads/' + data.fileName + '">' 
				+ '</a>'
			);
			break;
		// video
		case "video/mp4":
			return (
				'<video controls autoplay src="/../uploads/' + data.fileName + '">'
			);
			break;
		// compressed
		case "application/zip":
		case "application/vnd.rar":
			return (
				'<a href="/../uploads/' + data.fileName + '">' + data.fileName + '</a>'
			);
			break;
		// audio
		case "audio/mpeg":
			return (
				'<audio controls autoplay src="/../uploads/' + data.fileName + '"></audio>'
			);
			break;
		// pdf application/pdf
		case "application/pdf":
			return (
				'<object type="application/pdf" data=/../uploads/' + data.fileName + '></object>'
			);
			break;
		default:
			break;
	}





}