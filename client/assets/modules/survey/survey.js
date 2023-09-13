socket.on('new_survey', receiveSurvey);
socket.on('new_count', receiveCount);

$('#button-survey').click(formSurvey);


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
function formSurvey()
{
	$('#tools').append(
		'<div id="createSurvey">'
			+'<input type="text" id="survey-input" maxlength="20" placeholder="Intitulé du sondage"/>'
			+'<input type="text" id="choice1" maxlength="20"placeholder="Réponse 1"/>'
			+'<input type="text" id="choice2" maxlength="20" placeholder="Réponse 2"/>'
			+'<input type="button" id="input-create-survey" value="Créer un sondage" />'
		+'</div>'
	)
	$('#input-create-survey').click(sendSurvey);

}

function receiveSurvey(data)
{	
	$('.survey').replaceWith('');
	$('#surveys').append(
		'<div class="survey">' 
			+ '<h2 class="title">' + data.surveyName  + '</h2> '
			+ `<p class="user"> C'est `+ data.name  + ' qui à créé le sondage :)</p> '
			+ '<section class="Choices">' 
				+ '<div id="surveyChoice1">'
					+'<button class="surveyButtons" id="surveyButton1">' + data.choice1 + '</button>' 
					+ '<p id="count1" class="count"></p>'
				+'</div>'
				+ '<div id="surveyChoice2">'
					+'<button class="surveyButtons" id="surveyButton2">' + data.choice2 + '</button>' 
					+ '<p id="count2" class="count"></p>'
				+'</div>'
			+ '</section>'
			+'<section class="graph">'
				+ '<aside class="bar" id="barNum1"></aside>'
				+ '<aside class="bar" id="barNum2"></aside>'
			+ '</section>'  
	     + '</div>'
	)
	var button1 = $('#surveyButton1');
	var button2 = $('#surveyButton2');
	
	button1.click(surveyClickCount);
	button2.click(surveyClickCount);

	$('#createSurvey').css('display','none');
}


function surveyClickCount()
{
	var n;
	var addVote = 1;
	var counter = {addVote, n}
	var countId = this.id
	socket.emit('count', counter, countId);
	console.log(this.id);
	$('.surveyButtons').prop('disabled', true);

	
}



function receiveCount(data)
{
	if (data.compterId == "surveyButton1")
	{
		console.log(data.numVote1);
		$('#count1').replaceWith('<p id="count1">'+data.numVote1+'</p>');
	}
	else
	{
		$('#count2').replaceWith('<p id="count2">'+data.numVote2+'</p>');
	}
	voteBar(data.numVote1, data.numVote2);
}

function voteBar(numVote1, numVote2)
{
	var totalVote = numVote1 + numVote2;
	var porcentNum1 = (numVote1 / totalVote)*48;
	var porcentNum2 = (numVote2 / totalVote)*48;
	console.log(numVote2);
	$('#barNum1').css("width", porcentNum1+'%');
	$('#barNum2').css("width", porcentNum2+'%');
}
	

	