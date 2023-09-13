/*
 * Nom : Survey !
 * Description : Ce module fait des sondages incroyables !
 * Auteur(s) : Lolo et clecle
 */


module.exports =  {
	handleNewConnection: handleNewConnection, // permet d'appeler cette méthode dans server.js
}

var numVote1 = 0;
var numVote2 = 0;

var choice1;
var choice2;

function handleNewConnection(socket, io)
{
    socket.on('survey', function(survey)
    {
        // Par sécurité, on encode les caractères spéciaux
        // survey = ent.encode(survey.surveyValue);
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
        timer();
    });	

    socket.on('count', function(counter, countId, temps)
    {
        var compterId = countId;
        var compteurTemps = temps;
        
        if (compterId == "surveyButton1")
        {
            numVote1 += 1;

            io.sockets.emit('new_count', {numVote1:numVote1, n:counter['n'], compterId:compterId  });
        }   
        else
        {
            numVote2 += counter['addVote'];

            io.sockets.emit('new_count', {numVote2:numVote2, n:counter['n'], compterId:compterId  });
        }

    });	


function timer()
{
	const departMinutes = 0.1;
	let temps = departMinutes * 60;
	var interval = setInterval(() => {
	let minutes = parseInt(temps / 60, 10);
	let secondes = parseInt(temps % 60, 10);
	
	minutes = minutes < 10 ? "0" + minutes : minutes;
	secondes = secondes < 10 ? "0" + secondes : secondes;
	
	if (temps > 0)
	{
	    temps = temps - 1;
        io.sockets.emit('new_time', {temps:temps, minutes:minutes, secondes:secondes});
	} else
	{
		temps = 0;
        io.sockets.emit('new_time', {temps:temps, minutes:minutes, secondes:secondes});
        var winner = numVote1 - numVote2;
    
        io.sockets.emit('new_winner', {winner:winner, name:socket.name, choice1:choice1, choice2:choice2 });

		clearInterval(interval);
	}
	}, 1000)
	
}

}
 

