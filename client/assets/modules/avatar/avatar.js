
/**
 * On transmet une image vers le serveur
 */
function upload(files) {
    socket.emit("upload", files[0], (status) => {
      console.log(status);
    });
  }