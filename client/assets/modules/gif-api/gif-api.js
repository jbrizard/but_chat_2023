const input = document.querySelector("#gif-panel input");
const button = document.querySelector("#gif-panel button");
let i = 0;

button.addEventListener("click",() => {
  searchGif(input.value);
})


// listen for file sharings
socket.on('search_gif_result', searchGifResult);

socket.on('receive_gif', receivingGif);




function searchGif(search_term){
  socket.emit('search_gif', search_term);
}


function searchGifResult(data){
  const resultsDom = document.querySelector("#gif-panel #results");
  resultsDom.innerHTML = "";
  for(const element of data.results){
    let img = document.createElement("img");
    img.src = element.media[0].nanogif.url;
    img.onclick = () => {sendGif(element)};
    resultsDom.appendChild(img);
  }
}

function sendGif(data){
  socket.emit('send_gif', data);
}

function receivingGif(infos){

  $('#chat #messages').append(
		'<div class="message">'
			+ '<span class="user">' + infos.name  + '</span> ' 
			+ `<img src="${infos.data.media[0].mediumgif.url}" alt="${infos.data.content_description}">`
	     + '</div>'
	)
	.scrollTop(function(){ return this.scrollHeight });  // scrolle en bas du conteneur
}