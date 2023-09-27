﻿// Chargement des dépendances
var express = require('express');	// Framework Express
var http = require('http');		// Serveur HTTP
var ioLib = require('socket.io');	// WebSocket
var ent = require('ent');		// Librairie pour encoder/décoder du HTML
var path = require('path');		// Gestion des chemins d'accès aux fichiers	
var fs = require('fs');			// Accès au système de fichier

// Chargement des modules perso
var daffy = require('./modules/daffy.js');
var avatar = require('./modules/avatar.js');
var history = require('./modules/history.js');
var editMessage = require('./modules/editMessage.js');

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

// Historique des messages
const messageHistory = [];

// Gestion des connexions au socket
io.sockets.on('connection', function(socket)
{
	// Arrivée d'un utilisateur
	socket.on('user_enter', function(name)
	{
		// Stocke le nom de l'utilisateur dans l'objet socket
		socket.name = name;
		socket.avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTR3zZjipG0-Lf-MtJcieX_ASoCDA_6JfGxA&usqp=CAU"

		// Envoyer l'historique des messages au nouveau client qui se connecte
		history.getHistory(io, socket, messageHistory, name);
		
	});
	;
	
	// Réception d'un message
	socket.on('message', function(message)
	{
		// Par sécurité, on encode les caractères spéciaux
		message = ent.encode(message);

		// ID du message
		const idMessage = socket.id + Date.now();

		// Ajoute le message à la liste des messages
		messageHistory.push({name:socket.name, message:message, socketId: socket.id, avatar: socket.avatar, idMessage : idMessage });
		
		// Transmet le message à tous les utilisateurs (broadcast)
		io.sockets.emit('new_message', {name:socket.name, message:message, socketId: socket.id, avatar: socket.avatar, idMessage : idMessage });
		
		// Transmet le message au module Daffy (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		daffy.handleDaffy(io, message);
	});

	// Utilisation du module avatar pour uploader une image
	socket.on("upload", (image, callback) => 
	{
		avatar.addAvatar(io, socket, image, callback, messageHistory);
	});

	// Modification d'un message
	socket.on('submit_edited_message', (data) => 
	{
		editMessage.editMessage(io, socket, data);
	}
	)
});

// Lance le serveur sur le port 8090 (http://localhost:8090)
server.listen(8090);
