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
    console.log('zqgrqg,lqlg,rq');
    
    socket.on('point', function(awesomeCheck)
        {
            console.log('test');
            if (awesomeCheck==true) {
                score +=10;
                    console.log(score);
                    socket.emit('point_view', 
                    {
                        score:score
                    });
            }      
            

            
        });	
}

function replaceTag(message){
    message = message.replace("[b]", "<span class='bold'>");
    message = message.replace("[cr]", "<span class='color-red'>");
    message = message.replace("[]", "</span>");
    return message
}