var myId = '';

socket.on('myId', (id) => {
    setMyId(id);
    console.log(myId);
    
})

// Gestion des événements diffusés par le serveur
socket.on('new_message', () => {
    
    $('.message-' + myId).hover(function() {
        $(this).find('.edit').remove();
        $(this).append('<div class="edit"><button onclick="editMessage($(this).parent().parent().attr(\'id\'))">🖊️</button></div>');
}, function() {
    $(this).find('.edit').remove();
});
});


// Définir mon id
function setMyId(id)
{
    myId = id;
}

// Action quand on appuye sur la touche [Entrée] dans le champ de message (= comme Envoyer)
$('#edit-input').keyup(function(evt)
{
    console.log();
	if (evt.keyCode == 13) // 13 = touche Entrée
		
    console.log("edit submited");
});

function editMessage(id)
{
    console.log('editMessage', id); 
    $('#' + id + " > .message-container > .message-content")
    .replaceWith(function() {
        return $("<div>").append(
            $("<input>", {
                id: "edit-input",
                class: "edit-input",
                type: "text",
                value: $(this).text()
            }),
            $("<span>", {
                class: "additional-span",
                text: "Additional content"
            })
        );
    });
}