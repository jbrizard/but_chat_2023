/*
 * Nom : Point !
 * Description : Ce module distributs des points !
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

    socket.on('message', function(data)
        {
            data = data.toLowerCase();            
            switch (true) {
                case data === "lolo et clecle <3" && pointCheck[0] === false:
                    pointCheck[0] = true;
                    score +=20
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
                case data === "dokkan battle" && pointCheck[4] === false:
                    pointCheck[4] = true;
                    score +=15
                    break;
                default:
                    data;
                    break;
            }
            if (data.includes("[b]"))
            {
                // Réduisez le score de 5
                score -= 5;
            }
            if (data.includes("[cr-b]"))
            {
                // Réduisez le score de 5
                score -= 5;
            }

            if(score > 0)
            {
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
    message = message.replace("[b]", "<span class='bg-c'>");
    message = message.replace("[cr-b]", "<span class='cr-b'>");
    message = message.replace("[]", "</span>");
    return message
}