/*
 * Nom : Survey !
 * Description : Ce module fait des sondages incroyables !
 * Auteur(s) : Lolo et clecle
 */


module.exports =  {
	handleNewConnection: handleNewConnection, // permet d'appeler cette méthode dans server.js
}

var numVote = 0;
var numVote2 = 0;

function handleNewConnection(socket)
{
    socket.on('survey', function(survey)
    {
        // Par sécurité, on encode les caractères spéciaux
        // survey = ent.encode(survey.surveyValue);

        // Transmet le message à tous les utilisateurs (broadcast)
        io.sockets.emit('new_survey', {name:socket.name, surveyName:survey['surveyValue'], choice1:survey['choice1'], choice2:survey['choice2']});
        
    });	

    socket.on('count', function(counter, countId)
    {
        var compterId = countId;
        if (data.compterId == "surveyButton1")
        {
            numVote += counter['addVote'];
            io.sockets.emit('new_count', {count:numVote, n:counter['n'], compterId:compterId  });

        }
        else
        {
            numVote2 += counter['addVote'];
            io.sockets.emit('new_count', {count:numVote2, n:counter['n'], compterId:compterId  });

        }
        
    });	
}
 

