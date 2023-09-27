// Image par default pour l'avatar en haut à droite
$("#imagePreview").css("background-image", "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTR3zZjipG0-Lf-MtJcieX_ASoCDA_6JfGxA&usqp=CAU)");

/**
 * Mettre à jour tout les avatars de tous ces messages de l'utilisateur qui vient de changer son avatar
 */

socket.on("new_avatar_for_all", (data) => 
{ 
    //  pour tous les class de socketId, on met à jour l'attribut src
    $(`.${data.socketId}`).attr("src", data.avatar);
});

/**
 * Merttre à jour notre photo en haut à droite
 */
socket.on("new_avatar", (data) => 
{ 
    // Mettre à jour l'image de profil en haut à droite 
    $("#imagePreview").css("background-image", `url(${data.avatar})`);
});


/**
 * On transmet une image vers le serveur
 */
function upload(files) 
{
    socket.emit("upload", {file: files[0], name: files[0] ? files[0].name : null}, (status) => 
    {
        // Message success or error
        $('body').append(`<p class="alertAvatar">${status.message === "success" ? "Votre avatar a bien été enregistré" : "Erreur lors de l'enregistrement de votre avatar"}</p>`);
        $('.alertAvatar').css("background-color", status.message === "success" ? "rgba(0, 255, 0, 0.8)" : "rgba(255, 0, 0, 0.8)");
        
        // On efface le message après 4 secondes
        setTimeout(() => 
        {
          $('.alertAvatar').remove();
        }
        , 4000);
    });
}

