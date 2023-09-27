//reception du feedback
socket.on('ping', receivePing);

//gestion du front en fonction du feedback
function receivePing(data) {
    data.identifieds.forEach(identified => {
        if (identified == name) {

            let msg = document.querySelector('.message:last-of-type');

            msg.classList.add('ping');

            // Vérifie si les notifications sont prises en charge par le navigateur
            if ("Notification" in window) {
                // Demande la permission d'afficher des notifications
                Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                        // Crée une nouvelle notification
                        var notification = new Notification("Vous avez un nouveau message", {
                        body: msg.childNodes[1].childNodes[0].textContent+" vous a identifié",
                        icon: msg.childNodes[0].src // Optionnel : spécifiez une icône
                        });
                
                        // Gère les événements liés à la notification (par exemple, click, close, etc.)
                        notification.onclick = function () {
                        // Code à exécuter lorsque l'utilisateur clique sur la notification
                        window.focus();
                        notification.close();
                        };
                
                    }
                });
            }
        };
    });
};