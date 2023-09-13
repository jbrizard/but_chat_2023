socket.on('new_survey', receiveSurvey);
socket.on('new_time', receiveTime);
socket.on('new_count', receiveCount);
socket.on('new_winner', receiveWinner);

$('#create-survey').click(sendSurvey);

/**
 * Envoie d'un sondage au serveur
 */
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

/**
 * Affiche le temps restant reçu par le serveur
 */
function receiveTime(data)
{
	$('#surveys').append(
		'<span id="timer"></span>'
	)
	
	const timerElement = document.getElementById("timer");
	timerElement.innerText = `${data.minutes}:${data.secondes}`;
	
	if (data.secondes == 0)
	{
		timerElement.innerText = '';
	}
}

/**
 * Affichage du sondage reçu par le serveur
 */
function receiveSurvey(data)
{	
	$('.survey').replaceWith('');
	$('#surveys').append(
		'<div class="survey">'
			+ '<span class="user">' + data.name  + '</span> ' 
			+ '<h2 class="title">' + data.surveyName  + '</h2> ' 
			+ '<div id="surveyChoice1">'
				+'<button class="surveyButtons" id="surveyButton1">' + data.choice1 + '</button>' 
				+ '<p id="count1" class="count"></p>'
			+'</div>'
			+ '<div id="surveyChoice2">'
				+'<button class="surveyButtons" id="surveyButton2">' + data.choice2 + '</button>' 
				+ '<p id="count2" class="count"></p>'
			+'</div>'
	     + '</div>'
	)

	var button1 = $('#surveyButton1');
	var button2 = $('#surveyButton2');
	
	button1.click(surveyClickCount);
	button2.click(surveyClickCount);
}

/**
 * Desactive les buttons au click et initialise le vote
 */
function surveyClickCount()
{
	var n;
	var addVote = 1;
	var counter = {addVote, n}
	var countId = this.id
	socket.emit('count', counter, countId);
	$('.surveyButtons').prop('disabled', true);	
}

/**
 * Affiche le nombre de vote reçu par le serveur
 */
function receiveCount(data)
{
	if (data.compterId == "surveyButton1")
	{
		$('#count1').replaceWith('<p id="count1">'+data.numVote1+'</p>');
	}
	else
	{
		$('#count2').replaceWith('<p id="count2">'+data.numVote2+'</p>');
	}
	
}
	
/**
 * Affiche le résultat gagnant du sondage reçu par le serveur
 */
function receiveWinner(data)
{
	$('.survey').replaceWith('');
	if (data.winner < 0)
	{
		$('#chat #messages').append(
			'<div class="message">'
				+ '<span class="winner">Résultat</span> ' 
				+ data.choice1
			 + '</div>'
		)
		.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
	}
	if (data.winner > 0)
	{
		$('#chat #messages').append(
			'<div class="message">'
				+ '<span class="winner">Résultat</span> ' 
				+ data.choice2
			 + '</div>'
		)
		.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
	}
	if (data.winner == 0)
	{
		$('#chat #messages').append(
			'<div class="message">'
				+ '<span class="winner">Résultat</span> ' 
				+ data.choice2 + 'et' + data.choice2
			 + '</div>'
		)
		.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
	}	
}
