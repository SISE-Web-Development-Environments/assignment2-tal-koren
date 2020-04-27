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
    welcomePage=document.getElementById('About').style.display="";

    welcomePage=document.getElementById('Register').style.display="none";
    welcomePage=document.getElementById('Login').style.display="none";
    welcomePage=document.getElementById('Settings').style.display="none";
    welcomePage=document.getElementById('welcome').style.display="none";
    document.getElementById('game').style.display="none";
    document.getElementById('time').style.display="none";
    document.getElementById('score').style.display="none";
}


