var myId = '';

// Récuperer mon id
socket.on('myId', (id) => 
{
    setMyId(id);
    
})

// Gestion des événements diffusés par le serveur
socket.on('new_message', () => 
{
    
    $('.message-' + myId).hover(function() 
    {
        $(this).find('.edit').remove();
        if ($("textarea").hasClass("edit-input") == false && $("containerMessageCtr > span").hasClass("deletedMessage") == false) 
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
    updateEditedMessageForAll(data);
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

    // Envoyer le nouveau message au serveur
    socket.emit('submit_edited_message', {message: newMessage, id: id});
};

// Apparition de l'input qui changera le texte du message
function editMessage(id)
{
    $('#' + id + " > .message-container > .message-content")
    .replaceWith(function() 
    {
        return $("<div>", {class: "edit-input-container"}).append(
            $("<textarea>", 
            {
                id: "edit-input-" + id,
                class: "edit-input",
                type: "text",
                val: $(this).text(),
                placeholder: "Edit message",
                onkeydown: `if (event.keyCode === 13 && event.ctrlKey) submitEdition(event, $(this));`
            }),
            $("<span>", 
            {
                class: "edit-instructions",
                text: "Appuyer sur [Ctrl] + [Entrée] pour valider",
                
            })
        );
    });
}


// Fonction pour modifier le message pour tout les utilisateurs
function updateEditedMessageForAll (data)
{
    const {message, socketId, idMessage} = data;
    const contentMessageCtr = "#" + idMessage.replace("edit-input-", "") + ' > .message-container > .message-content';
    const containerMessageCtr = "#" + idMessage.replace("edit-input-", "") + ' > .message-container';

    if (socketId == myId) {
        $('#' + idMessage).parent()
        .replaceWith(function() 
    {
        return $("<span>", 
        {
            class: "message-content",
            text: message
        }
        );
    });
    } else {
        $(contentMessageCtr).replaceWith(function()
        {
            return $("<span>", 
            {
                class: "message-content",
                text: message
            }
            );
        })
    }
    if ($(containerMessageCtr +" > span").hasClass("editedMessage") == false && $(containerMessageCtr +" > span").hasClass("deletedMessage") == false) 
    {
        $(containerMessageCtr).append(
            $("<span>",
            {
                class: message.length > 0  && /[a-zA-Z]/.test(message) ? "editedMessage" : "deletedMessage",
                text: message.length > 0  && /[a-zA-Z]/.test(message) ? "(Modifié)" : "(Supprimé)"
            })
        )
    } else {
        $(".editedMessage").attr("class", message.length > 0  && /[a-zA-Z]/.test(message) ? "editedMessage" : "deletedMessage").text(message.length > 0  && /[a-zA-Z]/.test(message) ? "(Modifié)" : "(Supprimé)");
    }
    
}