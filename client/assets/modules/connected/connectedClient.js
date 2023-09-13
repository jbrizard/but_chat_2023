socket.on('user_connected', receiveUserConnected);

function receiveUserConnected(data) {
    
    $('#connected-content *').remove();

    data.forEach(user => {
        $('#connected-content').append('<li id="' + user.id + '"><img src="' + user.avatar + '"/><div><p>' + user.name + '</p></div></li>');
    });
}

socket.on('disconnected', userDisconnected);

function userDisconnected(id) {
    $('#connected-content li#' + id).remove();
}


socket.on('new_avatar_for_all',changeAvatar);

function changeAvatar(data) 
{
    $('#connected-content li#' + data.socketId +'>img').attr('src',data.avatar);
}