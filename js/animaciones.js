$(document).ready(function () {

/* -------------------------------- 

Animacion menu ppal para House y Senator

-------------------------------- */
function mostrarContent(json,subir, esconder, section1, section2,section3,section4,section5,section6,titulo) {
    showNav();
    numberOfParty(json);
    printNumbOfReps(json,titulo);
    engaged(json);
    voted(json);
    $(subir).slideUp(1000);
    $(esconder).hide(1300);
    $(section1).delay(800).slideDown(1000);
    $(section2).delay(500).show(1000);
    $(section3).delay(500).show(1000);
    $(section4).delay(500).show(1000);
    $(section5).delay(500).show(1000);
    $(section6).delay(500).show(1000);
    printTable(json,"SENATOR");
}

/* -------------------------------- 

Animacion menu ppal para About y Contact

-------------------------------- */

function animacion(subir, esconder, section1,section2){
    $(subir).slideUp(1000);
    $(esconder).hide(1300);
    $(section1).delay(800).slideDown(1000);
    $(section2).delay(800).slideDown(1000);
    showNav();
}

/* -------------------------------- 

Animacion para esconder o mostrar Menu ppal

-------------------------------- */
function showNav() {
    var nav = document.getElementById('global--nav');
    if (nav.style.display === 'none') {
        nav.style.display = 'block';
    }
    else {
        nav.style.display = 'none';
    }
}

});  //cierra funcion inicial