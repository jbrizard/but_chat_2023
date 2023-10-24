/*
 * Nom : Survey !
 * Description : Ce module fait des sondages incroyables !
 * Auteur(s) : Lolo et clecle
 */

module.exports =  {
	handleNewConnection: handleNewConnection, // permet d'appeler cette méthode dans server.js
}

// Initialisation des variables
var numVote1 = 0;
var numVote2 = 0;

var interval;

var choice1;
var choice2;

function handleNewConnection(socket, io)
{
    socket.on('survey', function(survey)
    {
        // Par sécurité, on encode les caractères spéciaux
        numVote1 = 0;
        numVote2 = 0;
        
        choice1 = survey['choice1'];
        choice2 = survey['choice2'];

        // Transmet le message à tous les utilisateurs (broadcast)
        io.sockets.emit('new_survey', 
            {
                name:socket.name, 
                surveyName:survey['surveyValue'], 
                choice1:choice1, 
                choice2:choice2
            }
        );
        clearInterval(interval);
        timer(io, socket);
    });	

    socket.on('count', function(counter, countId, temps)
    {
        var compterId = countId;
        var compteurTemps = temps;
        
        if (compterId == "surveyButton1")
            numVote1 += 1;
        else
            numVote2 += 1;
        
        io.sockets.emit('new_count', {
            numVote1:numVote1, 
            numVote2:numVote2, 
            n:counter['n'],
            compterId:compterId  
        });   
    });	
}

/**
 * Fonction gérant le timer
 */
function timer(io, socket)
{
	const departMinutes = 2;
	let temps = departMinutes * 60;
	interval = setInterval(() => {
	let minutes = parseInt(temps / 60, 10);
	let secondes = parseInt(temps % 60, 10);
	
	minutes = minutes < 10 ? "0" + minutes : minutes;
	secondes = secondes < 10 ? "0" + secondes : secondes;
	
    // Si le temps n'est pas écoulé on enleve 1 et on envoi au client de nouvelles informations
	if (temps > 0)
	{
	    temps = temps - 1;

        io.sockets.emit('new_time', {temps:temps, minutes:minutes, secondes:secondes});
	} 
    
    // Si le temps est écoulé on envoi au client l'information du temps et celle du résultat gagnant du sondage
    else
	{
		temps = 0;

        io.sockets.emit('new_time', {temps:temps, minutes:minutes, secondes:secondes});

        // Vérifie qu'elle vote a eu le plus de vote
        var winner = numVote1 - numVote2;
    
        io.sockets.emit('new_winner', {winner:winner, name:socket.name, choice1:choice1, choice2:choice2 });

		clearInterval(interval);
	}
	}, 1000)
	
}
 

