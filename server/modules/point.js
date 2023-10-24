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
    // Set le score de l'utilisateur lors de sa connexion à 0
    var score = 0;
    // Tableau répertoriant si une condition d'obtention de point a été rempli selon son index
    var pointCheck = [false, false, false, false, false, false];

    socket.on('message', function(data)
        {           
            // Switch attribuant les points à l'utilisateur s'il remplit les conditions, vérifie également si la condition a déjà été complété.
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
                case data === "dokkan" && pointCheck[4] === false:
                    pointCheck[4] = true;
                    score +=15
                    break;
                case data === "survey" && pointCheck[5] === false:
                    pointCheck[5] = true;
                    score +=20
                    break;
                default:
                    data;
                    break;
            }

            // Enleve des points à l'utilisateur si le texte contient des éléments de style
            if (data.includes("[b]"))
            {
                score -= 5;
            }
            if (data.includes("[cr-b]"))
            {
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

/**
 * Fonction s'occupant de styliser le text selon son contenu 
 */
function replaceTag(message){
    message = message.replace("[b]", "<span class='bg-c'>");
    message = message.replace("[cr-b]", "<span class='cr-b'>");
    message = message.replace("[]", "</span>");
    return message
}