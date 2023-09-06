// Envoie au serveur si l'utilisateur écris ou non
$('#message-input').keyup(function()
{
  let writing = $(this).val().length > 0;
  console.log(writing);
  socket.emit('writing', writing);
});