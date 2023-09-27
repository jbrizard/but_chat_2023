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
    
    socket.on('point', function(data)
        {
            console.log('test');

                score +=data
                if(score > 0)
                {
                    console.log(score);
                    socket.emit('disable_checkbox',true);
                }else
                    socket.emit('disable_checkbox',false);
                socket.emit('point_view', 
                {
                    score:score
                });
                
        });	
}

function replaceTag(message){
    message = message.replace("[b]", "<span class='bg-c'>");
    message = message.replace("[cr-b]", "<span class='cr-b'>");
    message = message.replace("[]", "</span>");
    return message
}