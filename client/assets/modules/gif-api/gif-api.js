const input = document.querySelector("#gif-panel input");
const button = document.querySelector("#gif-panel button");
const gifPanel = document.querySelector("#gif-panel");

let i = 0;

button.addEventListener("click",() => {
  searchGif(input.value);
})

document.querySelector('#send-gif').addEventListener("click", () => {
  gifPanel.style.display = "flex";
})

// listen for file sharings
socket.on('search_gif_result', searchGifResult);
socket.on('receive_gif', receivingGif);


function searchGif(search_term){
  socket.emit('search_gif', search_term);
}


function searchGifResult(data){
  const resultsDom = document.querySelector("#gif-panel #results");
  resultsDom.querySelectorAll("div").forEach(el => el.innerHTML = "")
  data.results.forEach((element, index) => {
    let img = document.createElement("img");
    img.src = element.media[0].nanogif.url;
    img.onclick = () => {sendGif(element)};

    if(index > (data.results.length / 2)){
      document.querySelector("#gif-panel #results>div:last-of-type").appendChild(img);
    }else{
      document.querySelector("#gif-panel #results>div:first-of-type").appendChild(img);
    }


  });
}

function sendGif(data){
  gifPanel.style.display = "none";
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