// function sendSurvey()
// {
// 	// Récupère le message, puis vide le champ texte
// 	var surveyInput = $('#survey-input');
// 	var survey = surveyInput.val();	
// 	surveyInput.val('');
	
// 	// On n'envoie pas un message vide
// 	if (survey == '')
// 		return;
	
// 	// Envoi le message au serveur pour broadcast
// 	socket.emit('survey', survey);
// }

// function receiveSurvey(data)
// {
// 	$('#chat #surveys').append(
// 		'<div class="survey">'
// 			+ '<span class="user">' + data.name  + '</span> ' 
// 			+ data.survey 
// 	     + '</div>'
// 	)
// 	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
// }