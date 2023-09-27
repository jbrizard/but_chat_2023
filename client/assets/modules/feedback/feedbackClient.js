// Envoie au serveur si l'utilisateur écris ou non
$('#message-input').keyup(function()
{
    let writing = $(this).val().length > 0;
    // console.log(writing);
    socket.emit('writing', writing);
});

//reception du feedback
socket.on('feedback', receiveFeedback);

//gestion du front en fonction du feedback
function receiveFeedback(data) {

    //Quelqu'un est en train d'écrire mais ce n'est pas l'utilisateur actif
    if (data.status && name != data.name) 
    {
        
        //On verifie si la personne qui écrit est déjà anoncée ou non
        let here = false;
        let writers = document.querySelectorAll('#connected-content li#' + data.id + '>div>p:nth-of-type(2)');
        writers.forEach(writer => 
        {
            if (writer.id == data.id) 
            {
            here = true;
            }
        });

        // L'utilisateur n'est pas encore affiché alors on l'affiche
        if (!here) {
            
            $('#connected-content li#' + data.id + '>div').append('<p id="' + data.id + '"><span></span><span></span><span></span> est en train d\'écrire</p>');
        }  
    }

    // On veut supprimer l'utilisateur de l'affichage
    if (!data.status)
    {
        // On recherche l'utilisateur pour le supprimer
        let writers = document.querySelectorAll('#connected-content li#' + data.id + '>div>p:nth-of-type(2)');
        writers.forEach(writer => 
        {
        if (writer.id == data.id) 
        {
            writer.remove();
        }
        });
    }
}