socket.on('user_connected', receiveUserConnected);

function receiveUserConnected(data) {
    // Dès qu'un nouvel utilisateur (socket) se connecte, on réinitialise l'affichage des sockets connectés
    $('#connected-content *').remove();

    // Pour chaque socket, on affiche le nom et l'avatar de l'utilisateur
    data.forEach(user => {
        $('#connected-content').append('<li id="' + user.id + '"><img/><div><p>' + user.name + '</p></div></li>');
    });
}

socket.on('disconnected', userDisconnected);

// Enlève le socket qui s'est déconnecté
function userDisconnected(id) {
    //console.log(id);
    $('#connected-content li#' + id).remove();
}