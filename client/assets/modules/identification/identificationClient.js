//reception du feedback
socket.on('ping', receivePing);

//gestion du front en fonction du feedback
function receivePing(data) {
    data.identifieds.forEach(identified => {
        if (identified == name) {

            let msg = document.querySelector('.message:last-of-type');

            msg.classList.add('ping');
        };
    });
};