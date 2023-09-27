/*
 * Nom : Pendu !
 * Description : Ce module déclenche le pendu
 * Auteur(s) : Samuel Juanola Dorian Engelvin
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
       //Masque le mot avec des _ séparés d'un espace
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
            sendBotMessage(io,'Il faut écrire une seule lettre');   //On verifie si le message contient bien une seule lettre
        }
        else
        {
            if(allLetters.includes(reponse))
            {
                sendBotMessage(io,'Vous avez déjà essayé cette lettre') //Ensuite on verfiei que la lettre n'a pas déjà été proposée
            }
            else
            {
            
                allLetters.push(reponse);    
                console.log(mysteryWord);
        
                //On regarde si la lettre est présente dans le mot
                if (mysteryWord.includes(reponse))
                {
                    foundLetters.push(reponse);
                }
                else
                {
                    nbVie++;
                    sendBotDisplay(io);
                }
                //On met a jour le mot mystereavec les lettres trouvées
                hiddenWord= updateHiddenWord();
                sendBotMessage(io,hiddenWord);
                checkIfWinnerOrLoser(io); 
            }
         
        }
       
    }

   
}

/**
 * Fonction qui réecrit le mot mystere avec les reponses correctement placées
 */
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

/**
 * On regarde si il y'a un gagnant en regardant si mystery word conteint encore des underscore
 */
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

/**
 * Gère l'affichage du dessin du pendu en fonction du nombre de vie qui est incrémenté lors d'une mauvaise réponse
 */
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

/**
 * @reponse message à mettre en paramètre que le bot répètra
 * Fait dire un message de la part du bot pendu 
 */
function sendBotMessage(io, reponse)
{
   
    io.sockets.emit('new_message',
    {
        name:'BOT_Pendu',
        message:`<span class="pendu">${reponse}</span>`
    });

}

