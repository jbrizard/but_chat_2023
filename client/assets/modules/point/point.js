socket.on('point_view', receivePoint);
socket.on('disable_checkbox', disbaleCheckbox);


$('#tools').append(
    '<span id="score" class="score">' + 0 + '</span>' 
)

function sendPoint(message)
{
    message = message.toLowerCase()  
    
    console.log(message);
        
   
}

function receivePoint(data)
{
    console.log(data.score);
    
    $('#score').text(data.score);
    $('#input-create-survey').click(sendSurvey);
}


function hilightMessage(message)
{  
    if ($('#message-hilight').is(':checked'))
    {
        message = '[b]'+message+'[]';
    }
    return message;
}

function disbaleCheckbox(data)
{
    if(data == false){
        $('#message-hilight').prop( "checked", false );
        $('#message-hilight').prop("disabled", true);
    }else
        $('#message-hilight').prop("disabled", false);
}