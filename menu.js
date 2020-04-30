function showWelcomePage() {    
    welcomePage=document.getElementById('welcome').style.display="";

    welcomePage=document.getElementById('Register').style.display="none";
    welcomePage=document.getElementById('Login').style.display="none";
    welcomePage=document.getElementById('Settings').style.display="none";
    welcomePage=document.getElementById('About').style.display="none";
    document.getElementById('game').style.display="none";
    document.getElementById('time').style.display="none";
    document.getElementById('score').style.display="none";

}

function showRegisterPage() {
    welcomePage=document.getElementById('Register').style.display="";

    welcomePage=document.getElementById('welcome').style.display="none";
    welcomePage=document.getElementById('Login').style.display="none";
    welcomePage=document.getElementById('Settings').style.display="none";
    welcomePage=document.getElementById('About').style.display="none";
    document.getElementById('game').style.display="none";
    document.getElementById('time').style.display="none";
    document.getElementById('score').style.display="none";
}

function showLoginPage() {
    welcomePage=document.getElementById('Login').style.display="";

    welcomePage=document.getElementById('Register').style.display="none";
    welcomePage=document.getElementById('welcome').style.display="none";
    welcomePage=document.getElementById('Settings').style.display="none";
    welcomePage=document.getElementById('About').style.display="none";
    document.getElementById('game').style.display="none";
    document.getElementById('time').style.display="none";
    document.getElementById('score').style.display="none";
}

function showSettingsPage() {
    welcomePage=document.getElementById('Settings').style.display="";

    welcomePage=document.getElementById('Register').style.display="none";
    welcomePage=document.getElementById('Login').style.display="none";
    welcomePage=document.getElementById('welcome').style.display="none";
    welcomePage=document.getElementById('About').style.display="none";
    document.getElementById('game').style.display="none";
    document.getElementById('time').style.display="none";
    document.getElementById('score').style.display="none";
}

function showAboutPage() {
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
  
    document.getElementById('game').style.display="none";
    document.getElementById('time').style.display="none";
    document.getElementById('score').style.display="none";
}


