/*
 * Nom : Pendu !
 * Description : Ce module déclenche le pendu
 * Auteur(s) : Samuel Juanola
 */

const { response } = require("express");

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handlePendu: handlePendu, // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
    handleReponse: handleReponse
}

/**
 * Lorsqu'on tape start:pendu le jeu demarre
 */
let mysteryWord ='';

let foundLetters = [];

let allLetters = [];

let hiddenWord ='';

let nbVie=0;

let startGame=false;

function handlePendu(io, word)
{
    startGame=true;
    hiddenWord='';
    foundLetters= [];
    allLetters= [];
    nbVie=0;
	// Passe le message en minuscules (recherche insensible à la casse)
	mysteryWord =word.toLowerCase();
    
	console.log(mysteryWord);


    {
       
       for (let index = 0; index < mysteryWord.length; index++) {
        hiddenWord += '_ ';
       }

       sendBotMessage(io, 'le jeu commence');
       sendBotMessage(io,hiddenWord);

    }


}

function handleReponse(io, reponse)
{
    if(startGame)
    {
       
        hiddenWord='';
        console.log(reponse, 'type :', typeof reponse, 'longueur', reponse.length);
        if (reponse.length>1 || reponse.length==0)
        {
            sendBotMessage(io,'Il faut écrire une seule lettre');
        }
        else
        {
            if(allLetters.includes(reponse))
            {
                sendBotMessage(io,'Vous avez déjà essayé cette lettre')
            }
            else
            {
            
                allLetters.push(reponse);    
                console.log(mysteryWord);
        
                if (mysteryWord.includes(reponse))
                {
                    foundLetters.push(reponse);
                }
                else
                {
                    nbVie++;
                    sendBotDisplay(io);
                }
    
                hiddenWord= updateHiddenWord();
                sendBotMessage(io,hiddenWord);
                checkIfWinnerOrLoser(io); 
            }
         
        }
       
    }

   
}


function updateHiddenWord() {
    let hiddenWord = "";
    for (let i = 0; i < mysteryWord.length; i++) {
      if (foundLetters.indexOf(mysteryWord[i]) !== -1) 
      {
        hiddenWord += mysteryWord[i];
      } 
      else 
      {
        hiddenWord += "_";
      }
    }
    return hiddenWord;
  }

function checkIfWinnerOrLoser(io)
{
    if(hiddenWord.indexOf('_')==-1)
    {
        sendBotMessage(io,'Bravo vous avez gagné :D');
        startGame=false;
    }else if(nbVie>=9)
    {
        sendBotMessage(io, `Vous avez perdu :(((( Le mot mystère était ${mysteryWord} `);
        startGame=false;
    }else
    {
        return
    }
}

function sendBotDisplay(io)
{
    let html = ``

    for (let i = 0; i < nbVie; i++) {
        html += `<div id="part-${i + 1}"></div>`;
      }

    io.sockets.emit('new_message',
    {
        name:'BOT_Pendu',
        message:
        `
        <section class="response">
            ${html}           
        </section>
        `
    });
}

function sendBotMessage(io, reponse)
{
   
    io.sockets.emit('new_message',
    {
        name:'BOT_Pendu',
        message:`<span class="pendu">${reponse}</span>`
    });

}

