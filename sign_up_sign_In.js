
$(function() { 

    var userP = {username: "p", password: "p"};
    var users = {userP};
    var thisUser;
 
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
        console.log("reg func");
        let userName = document.getElementsByName('username').value;
        let password = document.getElementsByName('password').value;
        let fullName = document.getElementsByName('name').value;
        let email = document.getElementsByName('email').value;
        let dateOfBirth = document.getElementsByName('birthday').value;
        let user = {userName: userName, password: password, fullName: fullName, email:email, dateOfBirth: dateOfBirth};
        users.push(user);
    }

    function login(){
        console.log("login func");
        let userName = document.getElementsByName('usernameLogin').value;
        let password = document.getElementsByName('passwordLogin').value;
        for (index = 0; index < users.length; index++) {
            let currentUsetName = users[index][username];
            let currentPassword = users[index][username];
            
            if (userName==currentUsetName && password==currentPassword) {
                thisUser = userName; /*To display his name when plating*/
                document.getElementById('Login').style.display="none"; /*hide login*/
                showGame();
                document.write("good");

                return;
            }
        }
        document.write("Wrong detailes!")
    }

    function showGame(){
        document.getElementById('score').style.display="";
        document.getElementById('time').style.display="";
        document.getElementById('game').style.display="";
    }






    

})

