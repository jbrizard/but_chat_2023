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
			+ '<h2 id="title">' + data.surveyName  + '</h2> ' 
			+ '<div id="surveyChoice1">'
				+'<button id="button1">' + data.choice1 + '</button>' 
				+ '<p id="count1" class="count"></p>'
			+'</div>'
			+ '<div id="surveyChoice2">'
				+'<button id="button2">' + data.choice2 + '</button>' 
				+ '<p id="count2" class="count"></p>'
			+'</div>'
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}


function counter()
{
	var n;
	var count = 1;
	var counter = {count, n}
	socket.emit('count', counter);
	console.log('titi');
	
}
var button1 = $('#button1');
var button2 = $('#button2');

button1.click(counter(), n=1);
button2.click(counter(), n=2);
console.log('erovjievo');

function receiveCount(data)
{
	console.log('ouiouiouiouioui');
	
	$('#count1').replaceWith('<p>brbrtbrb</p>');
}
	

	