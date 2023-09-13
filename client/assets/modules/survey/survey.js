socket.on('new_survey', receiveSurvey);
socket.on('new_count', receiveCount);

$('#create-survey').click(sendSurvey);

function sendSurvey()
{
	

	// Récupère le message, puis vide le champ texte
	var surveyInput = $('#survey-input');
	var choice1Input = $('#choice1');
	var choice2Input = $('#choice2');
	var choice1 = choice1Input.val();
	var choice2 = choice2Input.val();
	var surveyValue = surveyInput.val();
	var survey = {choice1, choice2, surveyValue};
	surveyInput.val('');
	choice1Input.val('');
	choice2Input.val('');


	
	
	// On n'envoie pas un message vide
	if (survey == '' || choice1 == '' || choice2 == '' )
		return;
	
	// Envoi le message au serveur pour broadcast
	socket.emit('survey', survey);

	}


function receiveSurvey(data)
{	
	$('.survey').replaceWith('');
	$('#surveys').append(
		'<div class="survey">'
			+ '<span class="user">' + data.name  + '</span> ' 
			+ '<h2 class="title">' + data.surveyName  + '</h2> ' 
			+ '<div id="surveyChoice1">'
				+'<button id="surveyButton1">' + data.choice1 + '</button>' 
				+ '<p id="count1" class="count"></p>'
			+'</div>'
			+ '<div id="surveyChoice2">'
				+'<button id="surveyButton2">' + data.choice2 + '</button>' 
				+ '<p id="count2" class="count"></p>'
			+'</div>'
	     + '</div>'
	)
	var button1 = $('#surveyButton1');
	var button2 = $('#surveyButton2');
	
	button1.click(surveyClickCount);
	button2.click(surveyClickCount);
}


function surveyClickCount()
{
	var n;
	var addVote = 1;
	var counter = {addVote, n}
	var countId = this.id
	socket.emit('count', counter, countId);
	console.log(this.id);
	
}



function receiveCount(data)
{
	console.log(data.id);
	if (data.compterId == "surveyButton1")
	{
		$('#count1').replaceWith('<p>'+data.numVote1+'</p>');
	}
	else
	{
		$('#count2').replaceWith('<p>'+data.numVote2+'</p>');
	}
	
}
	

	