socket.on('point_view', receivePoint);
socket.on('disable_checkbox', disbaleCheckbox);


$('#tools').append(
    '<span id="score" class="score">' + 0 + '</span>' 
)

function receivePoint(data)
{    
    $('#score').text(data.score);
    $('#input-create-survey').click(sendSurvey);
}


function hilightMessage(message)
{  
    if ($('#message-hilight').is(':checked'))
    {
        message = '[b]'+message+'[]';
        $('#message-red-bold').prop( "checked", false );

    }
    return message;
}

function boldRedMessage(message)
{  
    if ($('#message-red-bold').is(':checked'))
    {
        $('#message-hilight').prop( "checked", false );
        message = '[cr-b]'+message+'[]';
    }
    return message;
}

function disbaleCheckbox(data)
{
    if(data == false){
        $('#message-hilight').prop( "checked", false );
        $('#message-hilight').prop("disabled", true);
        $('#message-red-bold').prop( "checked", false );
        $('#message-red-bold').prop("disabled", true);
    }else
    {
        $('#message-hilight').prop("disabled", false);
        $('#message-red-bold').prop("disabled", false);
    }
}

