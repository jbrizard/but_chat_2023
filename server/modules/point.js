/*
 * Nom : Point !
 * Description : Ce module fait des sondages incroyables !
 * Auteur(s) : Lolo et clecle
 */

module.exports =  {
	handleNewConnection: handleNewConnection, // permet d'appeler cette méthode dans server.js
    replaceTag: replaceTag,
}

function handleNewConnection(socket, io)
{
    var score = 0;
    var pointCheck = [false, false, false, false, false];

    socket.on('point', function(data)
        {
            console.log(data, 'rttt');
            
            switch (true) {
                case data === "lolo et clecle <3" && pointCheck[0] === false:
                    pointCheck[0] = true;
                    score +=20
                    socket.emit('point_view', score)
                    break;
                case data === "merci" && pointCheck[1] === false:
                    pointCheck[1] = true;
                    score +=20
                    break;
                case data === "bonjour" && pointCheck[2] === false:
                    pointCheck[2] = true;
                    score +=10
                    break;
                case data === "bg" && pointCheck[3] === false:
                    pointCheck[3] = true;
                    score +=5
                    break;
                case data === "dokkan" && pointCheck[4] === false:
                    pointCheck[4] = true;
                    score +=15
                    break;
                default:
                    break;
            }
            console.log(score);
            if (data.includes("[b]" || "[cr]" )) {
                // Réduisez le score de 5
                score -= 5;
            }

            if(score > 0){
                console.log(score, 'man');
                socket.emit('disable_checkbox',true);
            }else
            {
                socket.emit('disable_checkbox',false);
            }
            socket.emit('point_view', 
                {
                    score:score
                })
        });	
        

        
}

function replaceTag(message){
    message = message.replace("[b]", "<span class='bold'>");
    message = message.replace("[cr]", "<span class='color-red'>");
    message = message.replace("[]", "</span>");
    return message
}