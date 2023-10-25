// Écoute l'événement "change_theme" et associe la fonction changeTheme
socket.on("change_theme", changeTheme);

// Fonction pour changer le thème en fonction des données reçues
function changeTheme(data) {
    // Change le background en rouge
    $('body').attr('theme', data.theme);
    $('h1').text(data.titre);
}

// Fonction pour gérer les clics sur les boutons de thème
function clicktheme() {
    // Lorsque le bouton "Diable" est cliqué
    $("#diable").click(() => {
        console.log("demon");
        // Émet un événement "change_theme" avec le thème "diable" et le titre "l'enfer !"
        socket.emit('change_theme', { theme: "diable", titre: "l'enfer !" });
    });
    // Lorsque le bouton "Zeus" est cliqué
    $("#zeus").click(() => {
        console.log("zeus");
        // Émet un événement "change_theme" avec le thème "zeus" et le titre "Olympe"
        socket.emit('change_theme', { theme: "zeus", titre: "Olympe" });
    });
    // Lorsque le bouton "Gotham" est cliqué
    $("#gotham").click(() => {
        console.log("batman");
        // Émet un événement "change_theme" avec le thème "gotham" et le titre "gotham"
        socket.emit('change_theme', { theme: "gotham", titre: "gotham" });
    });
    // Lorsque le bouton "Désert" est cliqué
    $("#desert").click(() => {
        console.log("desert");
        // Émet un événement "change_theme" avec le thème "desert" et le titre "Sahara"
        socket.emit('change_theme', { theme: "desert", titre: "Sahara" });
    });
    // Lorsque le bouton "Forêt" est cliqué
    $("#foret").click(() => {
        console.log("tree");
        // Émet un événement "change_theme" avec le thème "foret" et le titre "Planete !"
        socket.emit('change_theme', { theme: "foret", titre: "Planete !" });
    });
}

// Fonction pour mettre en surbrillance le bouton du thème actuel
function currentBut(){
    //$( "button" ).removeClass( "currentButton" )
    socket.on('change_theme', function(data)
    {
        console.log(data)
		$( "button" ).removeClass( "currentButton" )
        $( "#"+data.theme ).addClass( "currentButton" )
    });
}

// Appelle les fonctions pour gérer le changement de thème
currentBut();
clicktheme();
