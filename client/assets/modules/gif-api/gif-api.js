const input = document.querySelector("#gif-panel input");
const button = document.querySelector("#gif-panel button");
const gifPanel = document.querySelector("#gif-panel");


button.addEventListener("click",() => {
  searchGif(input.value);
})

document.querySelector('#send-gif').addEventListener("click", () => {
  gifPanel.style.display = "grid";
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
function receivingGif(infos)
{
  $('#chat #messages').append(
		'<div class="message">'
			+ '<span class="user">' + infos.name  + '</span> ' 
			+ `<img src="${infos.data.media[0].mediumgif.url}" alt="${infos.data.content_description}">`
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}