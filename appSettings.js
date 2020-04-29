$(function() {

    function randomizeSettings(){
        document.getElementById("ballsNumber").value = getRandomBetween(50,90);
        document.getElementById("ghostNumber").value = getRandomBetween(1,4);
        document.getElementById("gameTime").value = getRandomBetween(60,600);
        document.getElementById("_5color").value = getRandomColor();
        document.getElementById("_15color").value = getRandomColor();
        document.getElementById("_25color").value = getRandomColor();
    }

    randomizeSettingsButton.addEventListener("click", randomizeSettings);

    $('#settings-form').validate({
    rules: {
        ballsNumber: {
          required: true,
          range: [50, 90]
        },
        ghostNumber: {
            required: true,
            range: [1, 4]
        
        },
        gameTime: {
            required: true,
            range: [60, 600]
        }
    }
    });

    $('#settings-form').submit(function(event){
    event.preventDefault(); 
    if($('#settings-form').valid()){
        /*saving settings*/

        /*simple settings*/
        let ballsNum = document.getElementById("ballsNumber").value;
        let ghostNum = document.getElementById("ghostNumber").value;
        let gameTime = document.getElementById("gameTime").value;
        let _5color =  document.getElementById("_5color").value;
        let _15color =  document.getElementById("_15color").value;
        let _25color =  document.getElementById("_25color").value;

        /*direction keys - arrows if empty*/
        let rightKey = "";
        if (document.getElementById("rightKey").value=="") {
            rightKey = 39; /*right arrow key*/
        }
        else {
            rightKey=document.getElementById("rightKey").value.charCodeAt(0);
        }
        let leftKey = "";
        if (document.getElementById("leftKey").value=="") {
            leftKey = 37; /*left arrow key*/
        }
        else {
            leftKey=document.getElementById("leftKey").value.charCodeAt(0);
        }
        let upKey = "";
        if (document.getElementById("upKey").value=="") {
            upKey = 38; /*up arrow key*/
        }
        else {
            upKey=document.getElementById("upKey").value.charCodeAt(0);
        }
        let downKey = "";
        if (document.getElementById("downKey").value=="") {
            downKey = 40; /*down arrow key*/
        }
        else {
            downKey=document.getElementById("upKey").value.charCodeAt(0);
        }
        updateSettingsInApp(ballsNum, ghostNum, gameTime, _5color, _15color, _25color,
                                rightKey, leftKey, upKey, downKey);
    }
    });



    function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
    }

    function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
    }

})