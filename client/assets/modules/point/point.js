socket.on('point_view', pointView);

var pointCheck = [false, false, false, false, false];

$('#tools').append(
    '<span id="score" class="score">' + 0 + '</span>' 
)

$('#send-message').click(sendPoint);

$('#message-input').keyup(function(evt)
{
	if (evt.keyCode == 13) // 13 = touche Entrée
		sendPoint();
});


function sendPoint(message)
{

    console.log(message);

    switch (true) {
        case message === "lolo et clecle <3" && pointCheck[0] === false:
            pointCheck[0] = true;
            socket.emit('point', 20);
            break;
        case message === "merci" && pointCheck[1] === false:
            pointCheck[1] = true;
            console.log('1st step 2');
            socket.emit('point', 20);
            break;
        case message === "bonjour" && pointCheck[2] === false:
            pointCheck[2] = true;
            console.log('1st step 2');
            socket.emit('point', 10);
            break;
        case message === "bg" && pointCheck[3] === false:
            pointCheck[3] = true;
            console.log('1st step 2');
            socket.emit('point', 5);
            break;
        case message === "dokkan" && pointCheck[4] === false:
            pointCheck[4] = true;
            console.log('1st step 2');
            socket.emit('point', 15);
            break;
        default:
            console.log('papapa');
            console.log(pointCheck, 'check2');
            break;
    }
}

function pointView(data)
{

    $('#score').text(data.score);
    $('#input-create-survey').click(sendSurvey);

}


function hilightMessage(message)
{  
    if ($('#message-hilight').is(':checked'))
    {
        message = '[b]'+message+'[]';
        socket.emit('point', -5);
    }
    return message;
}
