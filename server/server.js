// Chargement des dépendances
var express = require('express');	// Framework Express
var http = require('http');		// Serveur HTTP
var ioLib = require('socket.io');	// WebSocket
var ent = require('ent');		// Librairie pour encoder/décoder du HTML
var path = require('path');		// Gestion des chemins d'accès aux fichiers	
var fs = require('fs');			// Accès au système de fichier
var moment = require('moment');

// Chargement des modules perso
var daffy = require('./modules/daffy.js');
var feedback  = require('./modules/feedback.js');
var connected  = require('./modules/connected.js');
var avatar = require('./modules/avatar.js');
var identification = require('./modules/identification.js');
var blague = require('./modules/bot-blague.js');
var fileSharing = require('./modules/file-sharing.js');
var basket = require('./modules/basket.js');
var gifAPI = require('./modules/gif-api.js');
var history = require('./modules/history.js');
var editMessage = require('./modules/editMessage.js');

// Initialisation du serveur HTTP
var app = express();

var server = http.createServer(app);

// Initialisation du websocket
var io = ioLib(server, {
		maxHttpBufferSize: 10 * 1024 * 1024, //10MB
});

// Traitement des requêtes HTTP (une seule route pour l'instant = racine)
app.get('/', function(req, res)
{
	res.sendFile(path.resolve(__dirname + '/../client/chat.html'));
});
  
// Traitement des fichiers "statiques" situés dans le dossier <assets> qui contient css, js, images...
app.use(express.static(path.resolve(__dirname + '/../client/assets')));

// Initialisation du module Basket
basket.init(io);
// Historique des messages
const messageHistory = [];

// Gestion des connexions au socket
io.sockets.on('connection', function(socket)
{
	// Ajoute le client au jeu de basket
	basket.addClient(socket);

	// Arrivée d'un utilisateur
	socket.on('user_enter', function(name)
	{
		// Stocke le nom de l'utilisateur dans l'objet socket
		socket.name = name;

		socket.avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTR3zZjipG0-Lf-MtJcieX_ASoCDA_6JfGxA&usqp=CAU';

		connected.connected(io,io.sockets.sockets);

		// Envoyer l'historique des messages au nouveau client qui se connecte
		history.getHistory(io, socket, messageHistory, name);
	});

	socket.on('disconnect', function() {
		io.sockets.emit('disconnected', socket.id);
	});


	// Réception d'un message
	socket.on('message', function(message)
	{
		// Par sécurité, on encode les caractères spéciaux
		message = ent.encode(message);

		// Date
		const date = Date.now();

		// ID du message
		const idMessage = socket.id + date;

		// Ajoute le message à la liste des messages
		messageHistory.push({name:socket.name, message:message, socketId: socket.id, avatar: socket.avatar, idMessage : idMessage, date: moment(date).locale('fr').calendar() });
		
		// Transmet le message à tous les utilisateurs (broadcast)
		io.sockets.emit('new_message', {name:socket.name, message:message, socketId: socket.id, avatar: socket.avatar, idMessage : idMessage, date: moment(date).locale('fr').calendar() });
		
		// Transmet le message au module Daffy (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
    daffy.onMessage(io, message);

		// Identifie la personne rechercher
		identification.ping(io, socket.name, socket.id, message);
    
    //Transmet le message au module bot-blague
		blague.handleBlague(io, message);
	
		// Transmet le message au module Basket
		basket.onMessage(io, message);
	});

	// Un utilisateur est en train d'écrire
	socket.on('writing', function(writing)
	{
		if (writing) {
			feedback.writing(io, socket.name, socket.id);
		}
		else
		{
			feedback.stopWriting(io, socket.name, socket.id);
		}
	});

	// Un utilisateur à identifier un autre utilisateur

	

	// Utilisation du module avatar pour uploader une image
	socket.on("upload", (image, callback) => 
	{
		avatar.addAvatar(io, socket, image, callback, messageHistory);
	});

	socket.on('search_gif', function(search_term)
	{
		gifAPI.handleSearch(socket, search_term);
	});

	socket.on('send_gif', function(data)
	{
		gifAPI.handleGif(io, {name: socket.name, data: data});
	});
	
  	socket.on('send_file', function(props)
	{
		fileSharing.handleFile(io, socket.name, props);
	});
	// Modification d'un message
	socket.on('submit_edited_message', (data) => 
	{
		editMessage.editMessage(io, socket, data, messageHistory);
	}
	)
});


// Lance le serveur sur le port 8090 (http://localhost:8090)
server.listen(8090);
