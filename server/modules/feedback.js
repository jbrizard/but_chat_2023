/*
 * Nom : Feedback
 * Description : Ce module affiche qui est en train d'écrire
 * Auteur(s) : Alexandre BELLET, Aurélien THIERRY
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	writing: writing // permet d'appeler cette méthode dans server.js -> feedback.writeOn(...)
}

/**
 * Lorsqu'on appelle Feedback ...
 */
function writing(io, message)
{
	
}