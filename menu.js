function showWelcomePage() {    
    document.getElementById('welcome').style.display="";

    document.getElementById('Register').style.display="none";
    document.getElementById('Login').style.display="none";
    document.getElementById('Settings').style.display="none";
    document.getElementById('About').style.display="none";
    hideGame();
    stop();
}

function showRegisterPage() {
    document.getElementById('Register').style.display="";

    document.getElementById('welcome').style.display="none";
    document.getElementById('Login').style.display="none";
    document.getElementById('Settings').style.display="none";
    document.getElementById('About').style.display="none";
    hideGame();
    stop();
}

function showLoginPage() {
    document.getElementById('Login').style.display="";

    document.getElementById('Register').style.display="none";
    document.getElementById('welcome').style.display="none";
    document.getElementById('Settings').style.display="none";
    document.getElementById('About').style.display="none";
    hideGame();
    stop();

}

function showSettingsPage() {
    document.getElementById('Settings').style.display="";

    document.getElementById('Register').style.display="none";
    document.getElementById('Login').style.display="none";
    document.getElementById('welcome').style.display="none";
    document.getElementById('About').style.display="none";
    hideGame();
    stop();

}

function showAboutPage() {
    stop();
    var modal = document.getElementById("About");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
      // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    window.onkeydown = function( event ) {
        if ( event.keyCode == 27 ) {
            modal.style.display = "none";
        }
    };
    hideGame();
}

function hideGame() {
    document.getElementById('gameDetails').style.display="none";
    document.getElementById('game').style.display="none";
}

function showGame(){
    document.getElementById('gameDetails').style.display="";
    document.getElementById('game').style.display="";
    showSettings();
    Start();
    ResetGame();
}



