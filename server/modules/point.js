/*
 * Nom : Point !
 * Description : Ce module fait des sondages incroyables !
 * Auteur(s) : Lolo et clecle
 */



module.exports =  {
	handleNewConnection: handleNewConnection, // permet d'appeler cette méthode dans server.js
}




function handleNewConnection(socket, io)
{
    var score = 0;
    console.log('zqgrqg,lqlg,rq');
    
    socket.on('point', function(pointCheck)
        {
            console.log('test');
            if (pointCheck==true) {
                score +=10;
                    console.log(score);
                    socket.emit('point_view', 
                    {
                        score:score
                    });
            }      
            

            
        });	
}