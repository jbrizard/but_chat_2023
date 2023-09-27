// socket.on('point_view', pointView);

// // var awesomeCheck = 0;


// // function sendPoint()
// // {

// //     var input = $('#message-input');

// //     input.submit(function (e) {
// //         e.preventDefault(); // Empêche le formulaire de se soumettre normalement
// //         const awesome= champTexte.val().toLowerCase(); // Récupérez le texte en minuscules

// //         // Vérifiez si le texte contient "awesome"
// //         if (awesome.includes("awesome") && awesomeCheck==0) {
// //             var awesomeCheck = true
// //             console.log('1st step');
// //             socket.emit('point', awesomeCheck);
// //         } else {
// //             awesome.empty(); // Efface le résultat précédent
// //         }

        
// //     });


// $('#send-message').click(sendPoint);
// var awesomeCheck = false;

// console.log('1st step 1');
// // }
// function sendPoint() {
   

//     // console.log(input);
//     ; // Initialisez awesomeCheck à false en dehors de la fonction
    
//     // const awesome = input.val().toLowerCase(); // Récupérez la valeur de l'input
//     var awesome = $('#message-input').val();
//     var papa1 = $('#message-input');
// 	var papa = papa1.val();
//     console.log(papa);
//     console.log('1st step 1 ff');
//     // Vérifiez si la valeur contient "awesome" et si awesomeCheck est à false
//     if (awesome.includes("awesome") && awesomeCheck==false) {
//         awesomeCheck = true; // Définissez awesomeCheck sur true pour éviter les répétitions
//         console.log('1st step 2');
//         socket.emit('point', awesomeCheck);
//     } else {
//         // input.val(''); // Effacez le contenu de l'input
//     }
    
// }


// function pointView(data)
// {


// 	$('#tools').append(
// 		'<div id="pointView">'+
//             '<p id="score">'+data.score+'</p>'
// 		+'</div>'
// 	)
// 	$('#input-create-survey').click(sendSurvey);
// }

// Assurez-vous que la variable awesomeCheck est définie en dehors de la fonction sendPoint.
var awesomeCheck = false;

// Cette ligne doit être en dehors de la fonction sendPoint.
$('#send-message').click(sendPoint);

function sendPoint() {
    // Vous pouvez obtenir la valeur de l'input directement dans la fonction.
    console.log($('#message-input').val())
    var awesome = $('#message-input').val();
    console.log('1st step 1');
    console.log(awesome);
    
    // Vérifiez si la valeur contient "awesome" et si awesomeCheck est à false
    if (awesome.includes("awesome") && !awesomeCheck) {
        awesomeCheck = true; // Définissez awesomeCheck sur true pour éviter les répétitions
        console.log('1st step 2');
        socket.emit('point', awesomeCheck);
    } else {
        // Si vous souhaitez effacer le contenu de l'input, vous pouvez le faire ici.
        // $('#message-input').val('');
    }
}

function pointView(data) {
    $('#tools').append(
        '<div id="pointView">' +
        '<p id="score">' + data.score + '</p>' +
        '</div>'
    );
    // Assurez-vous que l'élément #input-create-survey existe dans votre HTML
    $('#input-create-survey').click(sendSurvey);
}


function hilightMessage(message)
{  
    if ($('#message-hilight').is(':checked'))
        message = '[b]'+message+'[]';
    return message;
}
