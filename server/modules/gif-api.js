/*
 * Nom : gif API
 * Description : Module permettant la recherche et l'envoi de gif (api tenor)
 * Auteur(s) : Justin
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleSearch: handleSearch, // permet d'appeler cette méthode dans server.js -> gifAPI.handleSearch(...)
    handleGif: handleGif
}
const request = require('request');

/**
 * Fonction de recherche de gif correspondant au terme de recherche
 * Qui utilise l'API de tenor
 */
function handleSearch(io, socket, search_term){
    // enregistrement de clé API (publique que tout le monde utilise)
    let apikey = "LIVDSRZULELA";
    // Limite de résultats
    let lmt = 12;
    // URL de requette API
    let url = `https://g.tenor.com/v1/search?q=${search_term}&key=${apikey}&limit=${lmt}`

    // Envoi de la requette et emition des résultats vers l'utilisateur
    request(url, function (error, response, body) {
        io.sockets.emit('search_gif_result', JSON.parse(body));
    });

}

/**
 * Envoi des gif au autres utilisateurs
 */
function handleGif(io, data){
    io.sockets.emit('receive_gif', data);
}