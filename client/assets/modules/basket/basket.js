appendBasketMarkup();

var ball = $('.ball');
var ballWidth = ball.width();
var ballHeight = ball.height();
var scores = $('#basket-scores');
var bounceAudio = $('#basket-bounce')[0];
var swishAudio = $('#basket-swish')[0];
var othersMousePos = $('#others-mouse-pos');
var rightBound, bottomBound;
var ballPos;
var mousePos = {x:0, y:0};
var relativeMousePos = {x:0, y:0};
var enterFrameInterval = null;

bounceAudio.volume = .1;

socket.on('start_basket', startBasket);
socket.on('stop_basket', stopBasket);

$(window).resize(onResizeBasket);
onResizeBasket();

function startBasket()
{
	$(document).on('mousemove', mouseMove);

	// Gestion des événements diffusés par le serveur
	socket.on('basket_ball_move', onBasketBallMove);
	socket.on('basket_set_current_player', onSetCurrentPlayer);

	// Lance la boucle FPS
	enterFrameInterval = setInterval(onEnterFrame, 10);
	
	ball.fadeIn(1500);
	scores.fadeIn(1500);
}

function stopBasket()
{
        $(document).off('mousemove', mouseMove);
        
	socket.off('basket_ball_move', onBasketBallMove);
	socket.off('basket_set_current_player', onSetCurrentPlayer);
        
        clearInterval(enterFrameInterval);
        
        ball.fadeOut(500);
        scores.fadeOut(500);
        
	othersMousePos.empty();
}

/**
 * Méthode appelée lorsque la souris bouge
 */
function mouseMove(e)
{
	mousePos = {
		x:e.pageX,
		y:e.pageY
	}
	
	relativeMousePos.x = mousePos.x / rightBound;
	relativeMousePos.y = mousePos.y / bottomBound;
}

/**
 * Méthode FPS : appelée x fois par secondes pour envoyer la position de la souris
 */
function onEnterFrame()
{
	// récupère la position réelle de la balle
	var ballPos = {
		x:ball.offset().left,
		y:ball.offset().top,
	};
	
	// envoi un événement au serveur en transmettant la position de la souris (relative et réelle)
	// et la position réelle de la balle (car le serveur ne connaît que sa position "relative")
	socket.emit('mouseInteraction', relativeMousePos, mousePos, ballPos);
}

/**
 * Méthode appelée lorsque le serveur met à jour la position de la souris
 */
function onBasketBallMove(data)
{
	ballPos = data.pos;
	
	// positionne la balle avec les données envoyée par le serveur
	// sachant que le serveur renvoie une position "relative" (en pourcentage),
	// donc on multiplie par les dimensions de l'écran
	ball.css({
		left:data.pos.x * rightBound / 100,
		top:data.pos.y * bottomBound / 100,
		transform:'rotate(' + data.rot + 'deg)'
	});
	
	// si on touche le sol = déclenche le son "bounce" (volume adapté en fonction de la vélocité)
	if (data.touchFloor && Math.abs(data.vy) > 0.3)
	{
		bounceAudio.currentTime = 0;
		bounceAudio.volume = Math.abs(data.vy) / 1 * .05 + .05;
		bounceAudio.play();
	}
	
	// vide le conteneur avec les position des autres joueurs
	othersMousePos.empty();
	
	// affiche la position de chaque joueur sauf de nous-même
	for (var i in data.othersMousePos)
	{
		var mp = data.othersMousePos[i];
		
		var x = Math.round(mp.relativeMousePos.x * rightBound);
		var y = Math.round(mp.relativeMousePos.y * bottomBound);
		
		if (mp.id == socket.id)
			continue;
		
		var div = $('<div class="mouse-pos"></div>');
		div.css({
			'left': x,
			'top': y,
			'background-color': mp.color
		});
		othersMousePos.append(div);
	}
}

function onSetCurrentPlayer(data)
{
	if (data != null)
	{
		scores.find('#stats').empty().html(
			'Meilleur joueur : ' + data.bestPlayer.name + ' (' + data.bestPlayer.numTouches + ') !'
		);
		
		scores.find('#current-player').empty().html(
			'' + data.name + ' a la balle (' + data.numTouches + ') !'
		);
		
		var score = $('<div class="basket-score">' + data.numTouches + '</div>');
		score.css({
			left:ballPos.x * rightBound / 100,
			top:ballPos.y * bottomBound / 100 - 50,
		});
		
		$('body').append(score);
		
		score.animate({
			top:ballPos.y * bottomBound / 100 - 300,
			opacity:0
		}, {
			duration:1500,
			complete:function()
			{
				score.remove();
			}
		});
	}
	else
	{
		$('#basket-scores #current-player').html(
			'Attrapez la balle !'
		);
	}
}

/**
 * Méthode appelée lorsqu'on redimensionne la fenêtre
 */
function onResizeBasket()
{
	rightBound = $(window).width() - ballWidth;
	bottomBound = $(window).height() - ballHeight;
}

function log(msg)
{
	console.log(msg);
}


function appendBasketMarkup()
{
	$('body').append(
		  '<div id="basket">'
		+ 		'<div id="others-mouse-pos"></div>'
		+		'<div class="ball"></div>'
		+ '</div>'
		+ '<div id="basket-scores">'
		+ 		'<div id="current-player"></div>'
		+		'<div id="stats">'
		+		'<strong>Meilleur joueur : <span class="best-player">???</span></strong>'
		+ '</div>'
		+ '<audio id="basket-bounce" src="modules/basket/bounce.mp3" autostart="0"></audio>'
	);
}
