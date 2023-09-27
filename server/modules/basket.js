/*
 * Nom : Basket !
 * Description : Une balle de basket qui rebondit dans tous les coins...
 * Auteur(s) : Jérémie Brizard
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	init:init,
	addClient: addClient,
	onMessage
}

var _io;
var gravity = 0.1;
var bounceRatio = 0.8;
var friction = 0.005;
var maxPower = 200;
var vx = 0;
var vy = 0;
var pos = {x:0, y:0};
var rot = 0;
var sockets = {};
var ballWidth = 80;
var currentPlayer = null;
var currentUserNumTouches = 0;
var bestPlayer = {name:null, numTouches:0};
var started = false;
var playInterval = null;


/**
 * Initialisation du module
 */
function init(io)
{
	_io = io;
}

/**
 * Connexion d'un client : gestion des événements liés au module Basket
 */
function addClient(socket)
{
	sockets[socket.id] = socket;
	socket.color = getRandomColor();
	
	// événement envoyé par chaque client 30 fois par secondes
	socket.on('mouseInteraction', function(relativeMousePos, mousePos, ballPos)
	{
		socket.relativeMousePos = relativeMousePos;
		socket.mousePos = mousePos;
		
		mouseInteraction(socket, mousePos, ballPos);
	});
	
	socket.on('mouseDown', function(pos)
	{
		socket.dragging = true;
	});
	
	socket.on('mouseUp', function(pos)
	{
		socket.dragging = false;		
	});
	
	socket.on('disconnect', function()
	{
		removeClient(socket);
	});
	
	// si le jeu est lancé, donne l'instruction au client de lancer également
	if (started)
		socket.emit('start_basket');
}

/**
 * Déconnexion d'un client
 */
function removeClient(socket)
{
	delete sockets[socket.id];
}

/**
 * Attend la commande /basket pour lancer le jeu !
 */
function onMessage(io, message)
{
        if (message == '/basket')
        {
                io.sockets.emit('new_message', {
					name: 'Basket !',
					message: 'Utilisez "/basket start" pour lancer le jeu ou "/basket stop" pour l\'arrêter',
					avatar: "<img src='/modules/avatar/bot.png' alt='Bot avatar' width='30px'>"
				});
                return;
        }
        
	if (message == '/basket start' && !started)
	{
		started = true;
		
		playInterval = setInterval(onEnterFrame, 10);
		
		io.sockets.emit('start_basket');
	}
        if (message == '/basket stop' && started)
        {
                clearInterval(playInterval);
                
                io.sockets.emit('stop_basket');
                
                started = false;
        }
}

/**
 * Fonction appelée 30 fois par secondes :
 * 	- calcul de la position de la balle en appliquant les différentes forces
 *	- transmission en broadcast de la position de la balle et des autres utilisateurs
 */
function onEnterFrame()
{
	// applique la gravité (augmente la vélocité verticale)
	vy += gravity;
	
	// incrémente la position de la balle
	pos.x += vx;
	pos.y += vy;
	
	// modifie la rotation de la balle en fonction de la vélocité sur l'axe X
	rot += vx * 15;
	
	// mur de droite
	if (pos.x >= 100){
		pos.x = 100;
		vx *= -bounceRatio;
	}
	// mur de gauche
	else if (pos.x <= 0){
		pos.x = 0;
		vx *= -bounceRatio;
	}
	
	// est-ce que la balle touche le sol ?
	var touchFloor = false;
	
	// mur du sol
	if (pos.y >= 100)
	{
		pos.y = 100;
		
		// rebond
		vy *= -bounceRatio;
		
		// friction avec le sol (ralentit la vitesse sur l'axe X)
		vx += vx > 0 ? -friction : friction;
		
		touchFloor = true;
		
		// si on atteint une certaine limite, la balle s'arrête complètement
		if (Math.abs(vx) < 0.01) vx = 0;
		if (Math.abs(vy) < 0.1) vy = 0;
		
		currentPlayer = null;
		currentUserNumTouches = 0;
		
		_io.sockets.emit('basket_set_current_player', null);
	}
	// mur du plafond
	else if (pos.y <= 0)
	{
		pos.y = 0;
		vy *= -bounceRatio;
	}
	
	// stockage des positions de chaque utilisateur
	var othersMousePos = [];
	
	for (var i in sockets)
	{
		var socket = sockets[i];
		
		if (socket.relativeMousePos)
		{
			othersMousePos.push({
				id:socket.id,
				color:socket.color,
				relativeMousePos:socket.relativeMousePos
			});
		}
	}
	
	// transmission à chaque client
	for (var i in sockets)
	{
		var socket = sockets[i];
		
		socket.emit('basket_ball_move', 
		{
			pos:pos,							// position de la balle
			rot:rot,							// rotation de la balle
			vx:vx,								// vélocité X
			vy:vy,								// vélocité Y
			touchFloor:touchFloor,				// est-ce qu'on vient de toucher le sol ?
			othersMousePos:othersMousePos		// position des autres utilisateurs
		});
	}
}

/**
 * Gestion des interactions souris-balle
 */
function mouseInteraction(socket, mousePos, ballPos)
{
	// mouseInteractionIdle = laps de temps avant de pouvoir re-toucher la balle de nouveau (évite les saccades)
	if (socket.mouseInteractionIdle)
		return;
	
	// calcule la distance entre la balle et la souris
	var dx = ballPos.x - (mousePos.x - ballWidth / 2);
	var dy = ballPos.y - (mousePos.y - ballWidth / 2);
	var d = Math.sqrt(dx * dx + dy * dy);
	
	// si la souris touche touche la balle....
	if (d <= ballWidth / 2)
	{
		// calcule l'angle entre la balle et la souris
		var a = Math.atan2(dy, dx);
		
		// modifie la vélocité X et Y de la balle en fonction de l'angle avec la souris
		vx = Math.cos(a) * .6;
		vy = Math.sin(a) * 4;	// modification beaucoup plus importante sur l'axe Y pour pouvoir "jongler" avec la balle...
		
		// temporisation avant de pouvoir retoucher la balle
		socket.mouseInteractionIdle = true;
		
		currentPlayer = socket;
		currentUserNumTouches++;
		
		if (currentUserNumTouches > bestPlayer.numTouches){
			bestPlayer.name = socket.name;
			bestPlayer.numTouches = currentUserNumTouches;
		}
		
		_io.sockets.emit('basket_set_current_player', {id:socket.id, name:socket.name, numTouches:currentUserNumTouches, bestPlayer:bestPlayer});
		
		setTimeout(function()
		{
			socket.mouseInteractionIdle = false;
		}, 30);
	}
}

/**
 * Renvoie une couleur aléatoire
 */
function getRandomColor()
{
	var letters = '0123456789ABCDEF';
	var color = '#';
	
	for (var i = 0; i < 6; i++)
	{
		color += letters[Math.floor(Math.random() * 16)];
	}
	
	return color;
}