const input = document.querySelector("#gif-panel input");
const button = document.querySelector("#gif-panel button");
const gifPanel = document.querySelector("#gif-panel");


button.addEventListener("click",() => {
  searchGif(input.value);
})

let panelOn = false;
document.querySelector('#send-gif').addEventListener("click", () => {

  if(!panelOn){
    gifPanel.style.display = "grid";
    panelOn = !panelOn;
  }else{
    gifPanel.style.display = "none";
    panelOn = !panelOn;
  }
})

// Ecoute du retour de recherche et du reçu d'un gif
socket.on('search_gif_result', searchGifResult);
socket.on('receive_gif', receivingGif);

/**
 * Envoit la requette de recherche de gif avec commme attibut "un des mots clés"
 */
function searchGif(search_term)
{
  socket.emit('search_gif', search_term);
}

/**
 * Affiche les résultat de recherche de gif
 */
function searchGifResult(data)
{
  // Selectionne le conteneur de résultats de recherche de gif
  const resultsDom = document.querySelector("#gif-panel #results");

  // suprime les précédents résultats
  resultsDom.querySelectorAll("div").forEach(el => el.innerHTML = "");

  // Affichage des résultats (création des éléments html)
  data.results.forEach((element, index) => {
    let img = document.createElement("img");

    img.src = element.media[0].nanogif.url;

    img.onclick = () => {sendGif(element)};

    if(index > (data.results.length / 2))
    {
      document.querySelector("#gif-panel #results>div:last-of-type").appendChild(img);
    }else{
      document.querySelector("#gif-panel #results>div:first-of-type").appendChild(img);
    }


  });
}

/**
 * Désactive le panel et envoi le gif selectionné
 */
function sendGif(data)
{
  gifPanel.style.display = "none";

  socket.emit('send_gif', data);
}

/**
 * Affiche les gif envoyé par les autres utilisateurs
 */
function receivingGif(data)
{
  $('#chat #messages').append(
		'<div id="' + data.idMessage + '" class="message message-' + data.socketId + '">'
			+ `<img class='avatar ${data.socketId}' src="${ data.avatar ? data.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTR3zZjipG0-Lf-MtJcieX_ASoCDA_6JfGxA&usqp=CAU" }"  />`
			+ '<div class="message-container">'
			+ '<div class="headerMessage">'
			+ '<span class="user">' + data.name  + '</span> ' 
			+ '<span class="messageDate">' + data.date  + '</span> '
			+ '</div>'
			+ `<img src="${data.data.media[0].mediumgif.url}" alt="${data.data.content_description}">`
			+ '</div>'
	     + '</div>'
	).scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur


	
}