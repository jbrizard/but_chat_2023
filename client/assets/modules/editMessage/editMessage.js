var myId = '';


socket.on('myId', (id) => {
    setMyId(id);
    console.log(myId);
    
})


// Définir mon id
function setMyId(id)
{
    myId = id;
}