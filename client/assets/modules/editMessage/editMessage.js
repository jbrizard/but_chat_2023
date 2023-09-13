var myId = '';

socket.on('myId', (id) => {
    setMyId(id);
    console.log(myId);
    
})


// Gestion des événements diffusés par le serveur
socket.on('new_message', () => {
    
    $('.message-' + myId).hover(function() {
        $(this).find('.edit').remove();
        $(this).append('<div class="edit">edit</div>');
}, function() {
    $(this).find('.edit').remove();
});
});





// Définir mon id
function setMyId(id)
{
    myId = id;
}