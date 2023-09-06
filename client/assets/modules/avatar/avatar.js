
/**
 * Mettre à jour tout les avatars de tous ces messages de l'utilisateur qui vient de changer son avatar
 */

socket.on("new_avatar", (data) => 
{ 
  //  pour tous les class de socketId, on met à jour l'attribut src
  $(`.${data.socketId}`).attr("src", `${data.avatar}?r=${Date.now()}`);
}
)

/**
 * On transmet une image vers le serveur
 */
function upload(files) {
    socket.emit("upload", {file: files[0], name: files[0] ? files[0].name : null}, (status) => {
      console.log(status);
    });
  }

