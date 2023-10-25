// Chargement des dépendances
var express = require('express');  // Framework Express
var http = require('http');        // Serveur HTTP
var ioLib = require('socket.io');  // WebSocket
var ent = require('ent');          // Librairie pour encoder/décoder du HTML
var path = require('path');        // Gestion des chemins d'accès aux fichiers
var fs = require('fs');            // Accès au système de fichier

// Chargement des modules personnels
var daffy = require('./modules/daffy.js');
var theme = require('./modules/theme.js');
var target = require('./modules/target.js');

// Initialisation du serveur HTTP
var app = express();
var server = http.createServer(app);

// Initialisation du websocket
var io = ioLib(server);

// Traitement des requêtes HTTP (une seule route pour l'instant = racine)
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/chat.html'));
});

// Traitement des fichiers "statiques" situés dans le dossier <assets> qui contient css, js, images...
app.use(express.static(path.resolve(__dirname + '/../client/assets')));
// Gestion des connexions au socket
io.sockets.on('connection', function(socket) {
  // Arrivée d'un utilisateur
  socket.on('user_enter', function(name) {
    // Stocke le nom de l'utilisateur dans l'objet socket
    socket.name = name;
  });

  // Réception d'un message
  socket.on('message', function(message) {
    // Par sécurité, on encode les caractères spéciaux
    message = ent.encode(message);

    // Transmet le message au module theme
    message = theme.handleTheme(io, message);

    // Transmet le message à tous les utilisateurs (broadcast)
    io.sockets.emit('new_message', { name: socket.name, message: message });

    // Transmet le message au module Daffy (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
    daffy.handleDaffy(io, message);
    // Transmet le message au module Target (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
    target.launchTarget(io, message);
  });

  // Reçoit le changement de thème d'un utilisateur et l'envoie aux autres utilisateurs pour qu'ils l'appliquent
  socket.on('change_theme', function(data) {
    io.sockets.emit('change_theme', data);
  });
});

// Lance le serveur sur le port 8090 (http://localhost:8090)
server.listen(8090);
