module.exports =  {
	launchTarget: launchTarget // permet d'appeler cette méthode dans server.js -> target.handle(...)
}

// Déclaration de nouvelles variables
var images = []; // Liste des images aléatoires
var gameInterval; // Interval pour gérer le jeu pendant 30 secondes
var gameStarted = false; // Indique si le jeu a commencé
var gameDuration = 30; // Durée du jeu en secondes
var gameEndTime; // Heure de fin du jeu
var playerScores = {}; // Scores des joueurs
var nombreTarget = 0; // Nombre de cibles
var positionsTarget = {}; // Positions des cibles
var randomVal = 10; // Valeur aléatoire
var Target = 0; // Nombre de cibles
var tabX = []; // Tableau des positions X
var tabY = []; // Tableau des positions Y
var stategame = false; // État du jeu
var wave = 0; // Numéro de vague

// Fonction pour démarrer le jeu
function launchTarget(io, message) {
    if (message == '/Target start') {
        positionAndNumber(randomVal); // Génère des positions et un nombre de cibles
        startGame(io); // Démarre le jeu
        stategame = true; // Met l'état du jeu à vrai
    }
}

// Fonction pour générer des positions et un nombre de cibles
function positionAndNumber(randomVal) {
    nombreTarget = Math.floor(Math.random() * randomVal) + 1; // Génère un nombre aléatoire de cibles
    for (var i = 0; i < nombreTarget; i++) {
        var positionX = Math.random(); // Génère une position X aléatoire
        tabX.push(positionX); // Ajoute la position X au tableau
        var positionY = Math.random(); // Génère une position Y aléatoire
        tabY.push(positionY); // Ajoute la position Y au tableau
    }
}

// Fonction pour démarrer le jeu
function startGame(io) {
    gameStarted = true;
    gameEndTime = Date.now() + gameDuration * 1000; // Calcule l'heure de fin du jeu
    playerScores = {}; // Réinitialise les scores des joueurs

    // Émet un message aux clients pour commencer le jeu
    io.sockets.emit('start_game', { nombre: nombreTarget, positionsX: tabX, positionsY: tabY });
    io.sockets.emit('new_message',
        {
            name: 'Target Master!',
            message: `<span>Le jeu vient de commencer, vous avez ${gameDuration} secondes!</span>`
        });
    // Démarre l'intervalle pour gérer le jeu
    gameInterval = setInterval(function () {
        if (Date.now() >= gameEndTime && stategame == true) {
            endGame(io); // Fin du jeu
        } else if (Date.now() >= gameEndTime - (gameDuration / 2) * 1000 && Date.now() <= gameEndTime - (gameDuration / 2 + 1) * 1000) {
            // Gestion de la mi-jeu (peut être ajoutée ici)
        } else if (Date.now() != gameEndTime) {
            gestionWave(io); // Gestion des vagues (peut être ajoutée ici)
        }
    }, 1000);
}

// Fonction pour mettre fin au jeu
function endGame(io, data) {
    if (stategame == true) {
        clearInterval(gameInterval);
        io.sockets.emit('new_message',
            {
                name: 'Target Master!',
                message: `<span>Le jeu est terminé!</span>`
            });

        io.sockets.emit('game_end', { game: "end" });
    }
    stategame = false;
}

// Fonction pour gérer les vagues du jeu
function gestionWave(io) {
    if (stategame == true && wave == 1) {
        tabX = [];
        tabY = [];
        positionAndNumber(randomVal);
        io.sockets.emit('wave', { nombre: nombreTarget, positionsX: tabX, positionsY: tabY })
        wave = wave - 1;
    } else if (stategame == true && wave == 0) {
        wave++;
    }
}

