socket.on('user_connected', receiveUserConnected);

function receiveUserConnected(data) {
    
    $('#connected-content *').remove();

    data.forEach(user => {
        $('#connected-content').append('<li id="' + user.id + '"><img/><div><p>' + user.name + '</p></div></li>');
    });
}

socket.on('disconnected', userDisconnected);

function userDisconnected(id) {
    console.log(id);
    $('#connected-content li#' + id).remove();
}