/*
 * Nom : Feedback
 * Description : Ce module affiche qui est en train d'écrire
 * Auteur(s) : Alexandre BELLET, Aurélien THIERRY
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
    writing: writing, // permet d'appeler cette méthode dans server.js -> feedback.writing(...)
    stopWriting: stopWriting // permet d'appeler cette méthode dans server.js -> feedback.stopWriting(...)

}

/**
 * Lorsqu'on appelle Feedback ...
 */

// Fonction qui anime l'utilisateur qui est en train d'écrire
function writing(io, user, id)
{
    io.sockets.emit('feedback',
    {
        name: user,
        status: true,
        id: id
    });
}

// Fonction qui stop l'animation de l'utilisateur en train d'écrire après un envoie ou une annulation de message
function stopWriting(io, user, id)
{
    io.sockets.emit('feedback',
    {
        name: user,
        status: false,
        id: id
    });
}