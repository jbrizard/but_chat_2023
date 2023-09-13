// Chargement des dépendances
var express = require('express');	// Framework Express
var http = require('http');		// Serveur HTTP
var ioLib = require('socket.io');	// WebSocket
var ent = require('ent');		// Librairie pour encoder/décoder du HTML
var path = require('path');		// Gestion des chemins d'accès aux fichiers	
var fs = require('fs');			// Accès au système de fichier

// Chargement des modules perso
var daffy = require('./modules/daffy.js');
var basket = require('./modules/basket.js');
var gifAPI = require('./modules/gif-api.js');

// Initialisation du serveur HTTP
var app = express();

var server = http.createServer(app);

// Initialisation du websocket
var io = ioLib(server);

// Traitement des requêtes HTTP (une seule route pour l'instant = racine)
app.get('/', function(req, res)
{
	res.sendFile(path.resolve(__dirname + '/../client/chat.html'));
});
  
// Traitement des fichiers "statiques" situés dans le dossier <assets> qui contient css, js, images...
app.use(express.static(path.resolve(__dirname + '/../client/assets')));

// Initialisation du module Basket
basket.init(io);

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
	});
	
	// Réception d'un message
	socket.on('message', function(message)
	{
		// Par sécurité, on encode les caractères spéciaux
		message = ent.encode(message);
		
		// Transmet le message à tous les utilisateurs (broadcast)
		io.sockets.emit('new_message', {name:socket.name, message:message});
		
		// Transmet le message au module Daffy (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		daffy.onMessage(io, message);
		
		// Transmet le message au module Basket
		basket.onMessage(io, message);
	});

	socket.on('search_gif', function(search_term)
	{
		gifAPI.handleSearch(io, socket, search_term);
	});

	socket.on('send_gif', function(data)
	{
		gifAPI.handleGif(io, socket, {name: socket.name, data: data});
	});
});

// Lance le serveur sur le port 8090 (http://localhost:8090)
server.listen(8090);
