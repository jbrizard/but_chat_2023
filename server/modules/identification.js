/*
 * Nom : Identification
 * Description : Ping un user lorsque son nom est appelé '@nom'
 * Auteur(s) : Alexandre BELLET / Aurélien THIERRY
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	ping: ping // permet d'appeler cette méthode dans server.js -> identification.ping(...)
}

function ping(io, user, id, message)
{
	
	
	if (message.includes('@'))
	{
		let userConnected = [];

        io.sockets.sockets.forEach(socket => {
            userConnected.push({
                name: socket.name,
                id: socket.id,
                avatar: socket.avatar
            });
        });
        
        let identified = [];

        userConnected.forEach(user => {
            if (message.includes(user.name))
            {
                identified.push(user.name);
            }

            io.sockets.emit('ping',
                {
                    identifieds: identified,
                    message: message
                });
        });
        
	}
}