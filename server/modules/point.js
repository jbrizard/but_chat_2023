module.exports =  {
	handleNewConnection: handleNewConnection, // permet d'appeler cette méthode dans server.js
}


var score;

function handleNewConnection(socket, io)
{
    socket.on('point', function(awesomeCheck)
        {
            if (awesomeCheck == true) {
                score +=10;
            }
            
            // Transmet le message à tous les utilisateurs (broadcast)
            io.sockets.emit('point_view', 
                {
                    score:score
                }
            );
            clearInterval(interval);
            timer(io, socket);
        });	
}