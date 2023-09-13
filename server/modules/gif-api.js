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
 */
function handleSearch(io, socket, search_term){
    let apikey = "LIVDSRZULELA";
    let lmt = 12;

    let url = `https://g.tenor.com/v1/search?q=${search_term}&key=${apikey}&limit=${lmt}`

    request(url, function (error, response, body) {
        io.sockets.emit('search_gif_result', JSON.parse(body));
    });

}

function handleGif(io, socket, data){
    io.sockets.emit('receive_gif', data);
}