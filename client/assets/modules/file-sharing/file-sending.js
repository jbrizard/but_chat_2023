// empty file input to avoid non intentionnal sending of files
document.getElementById("file-input").value = null;

// listen for file sharings
socket.on('file_share', receiveFile);

// (click button or press "Enter") like messages to send file (so you can send both files and image simultaneously)
$('#send-message').click(() => {
	sendFile(); // ! made by justin (possible d'envoyer un message ET une image)
});

$('#message-input').keyup(function(evt)
{
	if (evt.keyCode == 13) sendFile(); // ! made by justin (possible d'envoyer un message ET une image)
});



/**
 * Envoi d'un fichier
 */
function sendFile()
{
	let blob, format, name;
	const fileInput = document.getElementById("file-input");

    if(fileInput.files.length == 0){
        return;
	}

	name = fileInput.files[0].name;
	blob = new Blob([fileInput.files[0]],{type: "octet-stream"});
	format = fileInput.files[0].type;

	console.log(format);
	document.getElementById("file-input").value = null;

	// Envoi le message au serveur pour broadcast
	socket.emit('send_file', {name, blob, format});
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
			return (
				'<a id="media-content" href="/../uploads/' + data.fileName + '" target="_blank" rel="noopener noreferrer">' 
					+ '<img src="/../uploads/' + data.fileName + '">' 
				+ '</a>'
			);
		case "image/png":
			return (
				'<a id="media-content" href="/../uploads/' + data.fileName + '" target="_blank" rel="noopener noreferrer">' 
					+ '<img src="/../uploads/' + data.fileName + '">' 
				+ '</a>'
			);
			break;
		default:
			break;
	}





}