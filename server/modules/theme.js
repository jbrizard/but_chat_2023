/*
 * Nom : Theme
 * Description : Ce module affiche un diable quand on écrit "666" et change le thème de la page
 * Auteur(s) : Lucca Collas, Yoann Le Bihan
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleTheme: handleTheme // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
}

/**
 * Lorsqu'on appelle Daffy, il répond...
 */
function handleTheme(io, message)
{
	// Passe le message en minuscules (recherche insensible à la casse)
	message = message.toLowerCase();
	
	// Est-ce qu'il est égale à "666" ?
	if (message == "666")
	{
		// Si oui, le message est 😈
		message = '<span class="diable">😈</span>';

        io.sockets.emit('change_theme', {theme:"diable", titre: "l'enfer !"});
	}
	else if ( message == "zeus")
	{
		// Si oui, le message est ⚡
		message = '<span class="zeus">⚡</span>';

        io.sockets.emit('change_theme', {theme:"zeus", titre: "L’olympe !"});
	}
	else if ( message == "batman")
	{
		// Si oui, le message est 🦇
		message = '<span class="gotham">🦇</span>';

        io.sockets.emit('change_theme', {theme:"gotham", titre: "Gohtam City !"});
	}
	else if ( message == "desert")
	{
		// Si oui, le message est 🦇
		message = '<span class="desert">🏜️</span>';

        io.sockets.emit('change_theme', {theme:"desert", titre: "Sahara"});
	}
	else if ( message == "foret")
	{
		// Si oui, le message est 🦇
		message = '<span class="foret">🌳</span>';

        io.sockets.emit('change_theme', {theme:"foret", titre: "Amazonie"});
	}
    return message
}