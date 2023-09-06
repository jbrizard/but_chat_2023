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
function writing(io, user, id)
{
    io.sockets.emit('feedback',
    {
        name: user,
        status: true,
        id: id
    });
}

function stopWriting(io, user, id)
{
    io.sockets.emit('feedback',
    {
        name: user,
        status: false,
        id: id
    });
}