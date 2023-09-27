var myId = '';

// Récuperer mon id
socket.on('myId', (id) => 
{
    setMyId(id);
    console.log(myId);
    
})

// Gestion des événements diffusés par le serveur
socket.on('new_message', () => 
{
    
    $('.message-' + myId).hover(function() 
    {
        $(this).find('.edit').remove();
        if ($("input").hasClass("edit-input") == false) 
        {
            $(this).append('<div class="edit"><button onclick="editMessage($(this).parent().parent().attr(\'id\'))">🖊️</button></div>');
        }

    }, function() 
    {
        $(this).find('.edit').remove();
    });
});

// Reception des messages edités
socket.on('new_message_edited', (data) =>
{
    editMessageForAll(data);
})


// Définir mon id
function setMyId(id)
{
    myId = id;
}

// Action quand on appuye sur la touche [Entrée] dans le champ de message (= Envoyer)
function submitEdition (evt, thisElt) 
{
    // valeur du champ
    const newMessage = thisElt[0].value;
    // récupérer id
    const id = evt.srcElement.id

    if (evt.keyCode == 13) 
    {
        // Envoyer le nouveau message au serveur
        socket.emit('submit_edited_message', {message: newMessage, id: id});
    }
};

// Apparition de l'input qui changera le texte du message
function editMessage(id)
{
    $('#' + id + " > .message-container > .message-content")
    .replaceWith(function() 
    {
        return $("<div>").append(
            $("<input>", 
            {
                id: "edit-input-" + id,
                class: "edit-input",
                type: "text",
                value: $(this).text(),
                placeholder: "Edit message",
                onkeyup: `if (event.keyCode === 13) submitEdition(event, $(this));`
            }),
            $("<span>", 
            {
                class: "additional-span",
                text: "Additional content"
            })
        );
    });
}


// Fonction pour modifier le message pour tout les utilisateurs
function editMessageForAll (data)
{
    const {message, socketId, idMessage} = data;
    const contentMessageCtr = "#" + idMessage.replace("edit-input-", "") + ' > .message-container > .message-content';
    const containerMessageCtr = "#" + idMessage.replace("edit-input-", "") + ' > .message-container';
    const newMessage = message.length > 0 ? message : "Supprimé"

    if (socketId == myId) {
        $('#' + idMessage).parent()
    .replaceWith(function() 
    {
        return $("<span>", 
        {
            class: "message-content",
            text: message
        }
        )
    });
    } else {
        $(contentMessageCtr).replaceWith(function()
        {
            return $("<span>", 
            {
                class: "message-content" + message.length == 0 && "deletedMessage",
                text: message
            }
            )
        })
    }
    if ($(containerMessageCtr +" > span").hasClass("editedMessage") == false) 
    {
        $(containerMessageCtr).append(
            $("<span>",
            {
                class: "editedMessage",
                text: message.length > 0 ? "Modifié" : "Supprimé"
            })
        )
    } else {
        $(".editedMessage").text(message.length > 0 ? "Modifié" : "Supprimé");
    }
    
    
    
}