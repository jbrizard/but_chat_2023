socket.on('new_survey', receiveSurvey);
socket.on('new_time', receiveTime);
socket.on('new_count', receiveCount);
socket.on('new_winner', receiveWinner);

$('#button-survey').click(formSurvey);

/**
 * Envoie d'un sondage au serveur
 */
function sendSurvey()
{
	// Récupère les infos du sondage, puis vide les champs de texte
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
	
	// On n'envoie pas un sondage vide
	if (survey == '' || choice1 == '' || choice2 == '' )
		return;
	
	// Envoi le sondage au serveur pour broadcast
	socket.emit('survey', survey);
}

function formSurvey()
{
	$('#tools').append(
		'<div id="createSurvey">'
			+'<input type="text" id="survey-input" maxlength="28" placeholder="Intitulé du sondage"/>'
			+'<input type="text" id="choice1" maxlength="20"placeholder="Réponse 1"/>'
			+'<input type="text" id="choice2" maxlength="20" placeholder="Réponse 2"/>'
			+'<input type="button" id="input-create-survey" value="Créer un sondage" />'
		+'</div>'
	)
	$('#input-create-survey').click(sendSurvey);
}

/**
 * Affiche le temps restant reçu par le serveur
 */
function receiveTime(data)
{
	// Cré l'emplacement du timer
	$('#timer').replaceWith(
		'<p id="timer"></p>'
	)
	
	// Créé la variable du timer et le rempli avec les infos du timer venant du serveur
	const timerElement = document.getElementById("timer");
	timerElement.innerText = `${data.minutes}:${data.secondes}`;
	
	// Supprime le timer si le timer arrive à 0
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
	// Vide le conteneur avec la classe survey  et le rempli en fonction des informations de sondage du serveur
	$('.survey').replaceWith('');
	$('#surveys').append(
		'<div class="survey">'
			+ '<p id="timer"><p>' 
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

	// Initialise les variables de bouttons
	var button1 = $('#surveyButton1');
	var button2 = $('#surveyButton2');
	
	// 
	button1.click(surveyClickCount);
	button2.click(surveyClickCount);

	$('#createSurvey').replaceWith('');
	$('#button-survey').prop('disabled', true);	

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
	var pointCheck = true
	socket.emit('count', counter, countId);
	$('.surveyButtons').prop('disabled', true);
	socket.emit('point', pointCheck)
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
	
/**
 * Affiche le résultat gagnant du sondage reçu par le serveur
 */
function receiveWinner(data)
{
	$('#button-survey').prop('disabled', false);	
	$('.survey').replaceWith('');
	if (data.winner < 0)
	{
		$('#chat #messages').append(
			'<div class="message">'
				+ '<span class="winner">Résultat :</span> ' 
				+ data.choice2
			 + '</div>'
		)
		.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
	}
	if (data.winner > 0)
	{
		$('#chat #messages').append(
			'<div class="message">'
				+ '<span class="winner">Résultat :</span> ' 
				+ data.choice1
			 + '</div>'
		)
		.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
	}
	if (data.winner == 0)
	{
		$('#chat #messages').append(
			'<div class="message">'
				+ '<span class="winner">Résultat :</span> ' 
				+ data.choice1 + ' et ' + data.choice2
			 + '</div>'
		)
		.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
	}	
}
