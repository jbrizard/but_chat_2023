socket.on('point_view', receivePoint);
socket.on('disable_checkbox', disbaleCheckbox);

// Affiche un score de base à 0
$('#tools').append(
    '<span id="score" class="score">' + 0 + '</span>' 
)

/**
 * Reçoit les points envoyé depuis le server dans la span id="score"
 */
function receivePoint(data)
{    
    $('#score').text(data.score);
    $('#input-create-survey').click(sendSurvey);
}

/**
 * Fonction surlignant le message de l'utilisateur
 */
function hilightMessage(message)
{  
    if ($('#message-hilight').is(':checked'))
    {
        message = '[b]'+message+'[]';
        $('#message-red-bold').prop( "checked", false );
    }

    return message;
}

/**
 * Fonction qui met en gras et en rouge le message de l'utilisateur
 */
function boldRedMessage(message)
{  
    if ($('#message-red-bold').is(':checked'))
    {
        $('#message-hilight').prop( "checked", false );
        message = '[cr-b]'+message+'[]';
    }

    return message;
}

/**
 * Fonction qui selon le booléen data active ou désactive les checkbox
 */
function disbaleCheckbox(data)
{
    if(data == false){
        $('#message-hilight').prop( "checked", false );
        $('#message-hilight').prop("disabled", true);
        $('#message-red-bold').prop( "checked", false );
        $('#message-red-bold').prop("disabled", true);
    }
    else
    {
        $('#message-hilight').prop("disabled", false);
        $('#message-red-bold').prop("disabled", false);
    }
}

