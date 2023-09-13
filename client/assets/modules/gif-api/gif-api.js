
let apikey = "LIVDSRZULELA";
let lmt = 8;

let search_term = "excited";

let url = `https://g.tenor.com/v1/search?q=${search_term}&key=${apikey}&limit=${lmt}`

console.log(url);
fetch(url)
  .then((data) => {
    return data.json();
  })
  .then((jsonData) => {
    return console.log(jsonData)
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });