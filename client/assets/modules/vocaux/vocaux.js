/*
 * Nom : Messages vocaux
 * Description : Ce module permet l'envoie de messages vocaux
 * Auteur(s) : Samuel Juanola Dorian Engelvin
 */

let blob;
const date =new Date();
let audioChunks = [];
let rec;
//On désactive les boutons stop et envoyer
$("#stopRecording").attr('disabled', 'disabled');
$("#sendRecord").attr('disabled', 'disabled');

//demarre l'enregistrement du message vocale
$("#startRecording").on("click", function(){
  startRecording();
  $("#stopRecording").removeAttr('disabled');
  $("#startRecording").attr('disabled', 'disabled');
});

/**
 * Stop l'enregistrement
 * rec.stop() met l'etat de rec en inactif pour la fonction recordFunction
 */
$("#stopRecording").on("click", function (e) {
  $("#sendRecord").removeAttr('disabled');
  $("#stopRecording").attr('disabled', 'disabled');
  rec.stop();
});
/**
 * Envoi de l'enregistrement au serveur avec socket.emit (on met en parametre un nom de fichier et le blob qui contient l'audio)
 * On remet les bt en etat initial 
 * Afin de ne pas cumuler les audios @audiChunks est remis à zéro
 */
$('#sendRecord').on('click', function(e){
  $("#startRecording").removeAttr('disabled');
  $("#sendRecord").attr('disabled', 'disabled');
  $("#stopRecording").attr('disabled', 'disabled');
  socket.emit('send_file', {name: `msgVoc${date.getHours()}.mp3`, blob: blob});
  audioChunks = [];
})

//Appelle lafonction d'acces au micro
function startRecording(){
  startusingBrowserMicrophone(true);
}

/**
 * Demandel'acces au micro et attend une reponse.
 * Unefois la reponse obtenu, l'enregistrement commence en appelantla fonction recordFunction
 */
function startusingBrowserMicrophone(boolean) {
  getUserMedia({ audio: boolean }).then((stream) => {
    recordFunction(stream);
  });
}
/**
 * Fonction pour obtenir les droits d'acces au micro
 * legacy api estl a au cas ou si mediaDevice ne fonctionne pas(permet une plus grand compatibilité sur les navigateurs)
 */
async function getUserMedia(constraints) {
  if (window.navigator.mediaDevices) {
    return window.navigator.mediaDevices.getUserMedia(constraints);
  }
  
  let legacyApi =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  if (legacyApi) {
    return new Promise(function (resolve, reject) {
      legacyApi.bind(window.navigator)(constraints, resolve, reject);
    });
  } else {
      alert("user api not supported");
  }
}

/**
 * @stream Represente le contenu audio
 * La fonction enregistre le message vocal notamment grâce à l'objet MediaRecorder 
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
 * Des que l'etat de @rec est inactif alors l'enregistrement stop et est sauvegardé
 */
function recordFunction(stream) {
  rec = new MediaRecorder(stream);
  rec.start();
  rec.ondataavailable = (e) => { 
    audioChunks.push(e.data);
    if (rec.state == "inactive") {
      blob = new Blob(audioChunks, { type: "octet-stream" });
    }
  };
}

 