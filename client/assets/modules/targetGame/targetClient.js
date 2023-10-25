
socket.on('start_game', gameMaster)
function gameMaster(data, io){
  displayTarget(data)
  socket.on('wave', gestionMaster)
  socket.on('game_end',endGame)

}


function displayTarget(data){
  
      let nombrecons = data.nombre;
      console.log(data)
      console.log(nombrecons)
      for (let i=0 ;i<nombrecons;i++){
        let posactualx = data.positionsX[i];
        let posactualy = data.positionsY[i];
        positionWithinScreen(posactualx, posactualy)
      }
      shootTarget();

}


function positionWithinScreen(percentX, percentY) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
 

  const left = percentX * screenWidth;
  const top = percentY * screenHeight;

  $('<div class="target">👹​</div>').appendTo('body')
  .css({ left:left, top:top });
}

let score = 0; // Variable pour stocker le score

// Cette fonction sera appelée lorsque vous cliquez sur une cible
function onClickTarget() {
  $(this).remove(); // Supprime la cible cliquée
  score++; // Augmente le score de 1
  console.log("Score: " + score); // Affiche le score dans la console
}

function shootTarget() {
  // Ajoute un gestionnaire de clic aux éléments avec la classe "target"
  $('.target').click(onClickTarget);
  console.log('lancementshoot')
}

// socket.on('wave', gestionMaster)
function gestionMaster (data, io){
  $('.target').remove();
  displayTarget(data);
  console.log(data);

}

function endGame(io){
  $('.target').remove();
  // console.log({score:score, pseudo:socket.name})
  // socket.emit("score",{score:score, pseudo:socket.name })
	// Récupère le message, puis vide le champ texte
  console.log(score);
	var message = `Mon score est de ${score}`;	
	socket.emit('message', message);
  
  score = 0;

}