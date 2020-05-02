var thisUser="";


$(function() { 

    var userP = {username: "p", password: "p"};
    var users = [userP];
 
    $('#register-form').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                strongPassword: true
            },
            username: {
                required: true
            },
            name: {
                required: true,
                onlyLetters: true
            },
            birthday: {
                required: true
            } 
        },
    });

    $('#register-form').submit(function(event){
        event.preventDefault(); 
        if($('#register-form').valid()){
            register();
        }
    });

    $('#login-form').submit(function(event){
        event.preventDefault();
        login();
    });
    
    $.validator.addMethod('strongPassword', function(value, element) {
        return this.optional(element) 
          || value.length >= 6
          && /\d/.test(value)
          && /[a-z]/i.test(value);
      }, 'Your password must be at least 6 characters long and contain at least one number and one char\.')
    
    $.validator.addMethod('onlyLetters', function(value, element) {
        return !/\d/.test(value)
    }, 'Name must contain only letters\.')


   
    /*if doesnt work- switch to get element by id and set ids*/
    function register(){
        console.log("register func");
        let userName = document.getElementsByName('username')[0].value;
        let password = document.getElementsByName('password')[0].value;
        let fullName = document.getElementsByName('name')[0].value;
        let email = document.getElementById('email').value;
        /*let dateOfBirth = document.getElementsByName('birthday')[0].value;*/
        let user = {username: userName, password: password, fullName: fullName, email: email};
        users.push(user);
        console.log("user: " + userName + " added");
        window.alert(userName + " is now registered! Login to play.");
        showLoginPage();
    }

    function login(){
        console.log("login func");
        let userName = document.getElementsByName('usernameLogin')[0].value;
        let password = document.getElementsByName('passwordLogin')[0].value;
        for (index = 0; index < users.length; index++) {
            let currentUserName = users[index]['username'];
            let currentPassword = users[index]['username'];  
            if (userName==currentUserName && password==currentPassword) {
                thisUser = userName; /*To display his name when plating*/
                document.getElementById('Login').style.display="none"; /*hide login*/
                showSettingsButtonInMenu();
                showSettingsPage();
                return;
            }
        }
        window.alert("Wrong log in details. Please try again.");
    }

})

function getUserName() {
    return thisUser;
}

function showSettingsButtonInMenu() {
    document.getElementById('registerMenuButton').style.display="";
}

