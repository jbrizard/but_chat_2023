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

function handleNewConnection(socket, io)
{
    socket.on('survey', function(survey)
    {
        // Par sécurité, on encode les caractères spéciaux
        // survey = ent.encode(survey.surveyValue);
        numVote1 = 0;
        numVote2 = 0;
            
        // Transmet le message à tous les utilisateurs (broadcast)
        io.sockets.emit('new_survey', 
            {
                name:socket.name, 
                surveyName:survey['surveyValue'], 
                choice1:survey['choice1'], 
                choice2:survey['choice2']
            }
        );
        
    });	

    socket.on('count', function(counter, countId)
    {
        var compterId = countId;
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
 

