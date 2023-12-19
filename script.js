////////// using all const so I can use them later /////////////
///////// trying to avoid css as much as possible //////////////
//////////////// DECLARE ALL MY CONST ////////////////////
const gameBoard = document.querySelector("#gameBoard");
////// ctx is what we draw on ////////
const ctx = gameBoard.getContext("2d") //game in 2d//
const scoreBoard = document.querySelector("#scoreBoard");
const resetButton = document.querySelector("#resetButton");
//// need game width/height in variable so I can access them ////////
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
///////////////// select my colors as variables to call them ////////////////////
const boardBackground = "lightblue";
const paddle1Color = "red";
const paddle2Color = "green";
const paddleBorder = "black";
const ballColor = "gold";
const ballBorderColor = "black"
///////////// make ball size(I'll make it a const) /////////////
const ballRadius = 10.5;
///////// how far paddles moves after hitting button ////////////
const paddleSpeed = 40;
let intervalID; ////// used to repeat a certian function at given time-interval///////
let ballSpeed = 1;
/////////////////// Coordinates of ball /////////////////
let ballxaxis = gameWidth / 2;
let ballyaxis = gameHeight / 2;
//////////////// direction the ball goes ////////////////////
let ballxaxisDirection = 0;
let ballyaxisDirection = 0;
///////////// Define playerScore/////////////////
let player1Score = 0;
let player2Score = 0;
//////////// Define 2 paddle objects //////////////
let paddle1 ={
    width: 18,
    height: 90,
    x: 0,
    y: 0,
}
let paddle2 ={
    width: 18,
    height: 90,
    x: gameWidth -18,
    y: gameHeight -90,
}
/////////// add eventlister to whole window to hear keydown events////////
////////// add event listener to reset button as well ///////////////////
window.addEventListener("keydown", changeDirection)
resetButton.addEventListener("click", resetGame);
/////////////// create my functions now //////////////////
startGame();

///// When game starts what happens?//////////
function startGame(){
    createBall();
    timeskip();
};
////// paddle function/////
function makePaddles(){
    ctx.StrokeStyle = paddleBorder;
// fillRect= draws a filled rectangle /// strokeRect= puts rectangle on canvas///// 
// got from W3 schools because I used canvas in html/////////
    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height); //// coordinates of paddle1/////
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
/// make sure the S in (strokeRect is lowercase)took me 2 hours o find this little problem smh
    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height); //// coordinates of paddle2/////
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};

////// call my function after a cdrtain timeframe//////
function timeskip(){
    intervalID = setTimeout(() => {
        eraseBoard();
        makePaddles();
        moveball();
        drawball(ballxaxis, ballyaxis);
        checkImpact();
        timeskip();  //// use timeskip again to make next round////
    }, 10) ///// this number is how often the process repeats///// 
};
////////// Get background //////////////////
function eraseBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight); 
};

function createBall(){
    ballSpeed = 1;
    //random num between 0 and 1 (if 1 ball moves to the right)
    //(else move to the left)
    if(Math.round(Math.random()) == 1){
        ballxaxisDirection = 1;
    }
    else{
        ballxaxisDirection = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballyaxisDirection = 1;
    }
    else{
        ballyaxisDirection = -1;
    }
    ballxaxis = gameWidth /2;
    ballyaxis = gameHeight / 2;
    drawball(ballxaxis, ballyaxis)
}

function moveball(){
ballxaxis += (ballSpeed * ballxaxisDirection);
ballyaxis += (ballSpeed * ballyaxisDirection);
};

/////// drawball function ////////
function  drawball(ballxaxis, ballyaxis){
ctx.fillStyle = ballColor;
ctx.StrokeStyle = ballBorderColor;
ctx.linewidth = 2;
ctx. beginPath();
ctx.arc(ballxaxis, ballyaxis, ballRadius, 0, 2 * Math.PI);
ctx.stroke();
ctx.fill();
};

function checkImpact(){
    // bounce off top border///////
    if(ballyaxis <= 0 + ballRadius){
        ballyaxisDirection *= -1;
    }
    // bounce off bottom border/////
    if(ballyaxis >= gameHeight - ballRadius){
        ballyaxisDirection *= -1;
    }
    //// if you touch left border//////
    if(ballxaxis <= 0){
        player2Score+=1;
        updateScore();
        createBall();
        return;
    }
    // if you touch right border////
    if(ballxaxis >= gameWidth){
        player1Score+=1;
        updateScore();
        createBall();
        return;
    }
    // bounce off paddle1 //////////
    if(ballxaxis <= (paddle1.x + paddle1.width + ballRadius)){
        if(ballyaxis > paddle1.y && ballyaxis < paddle1.y + paddle1.height){
            ballxaxis = (paddle1.x + paddle1.width) + ballRadius; //(if ball gets stuck)
            ballxaxisDirection *= -1;
            ballSpeed += 0.2;
        }
    }
    // bounce off paddle 2 ////////
    if(ballxaxis >= (paddle2.x - ballRadius)){
        if(ballyaxis > paddle2.y && ballyaxis < paddle2.y + paddle2.height){
            ballxaxis = paddle2.x - ballRadius; //(if ball gets stuck)
            ballxaxisDirection *= -1;
            ballSpeed += 1;
        }
    }
};

//////// in charge of moving paddles ////////
function changeDirection(event){ /// our parameter is event///
    const keyPressed = event.keyCode; /// find the number linked to keyboard///
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;
    console.log(keyPressed)
///// use switch to check key pressed/////////
//// case goes along with switch sort of like different instances////
    switch(keyPressed){
        case(paddle1Up):
        if(paddle1.y > 0){
            paddle1.y -= paddleSpeed;
        }
        break;
        case(paddle1Down):
        if(paddle1.y < gameHeight - paddle1.height){
            paddle1.y += paddleSpeed;
        } 
        break;
        case(paddle2Up):
        if(paddle2.y > 0) {
            paddle2.y -= paddleSpeed;
        }
        break;
        case(paddle2Down):
        if(paddle2.y < gameHeight - paddle2.height){
            paddle2.y += paddleSpeed;
        } 
        break;
    }
};

function updateScore(){
    scoreBoard.textContent = `${player1Score} : ${player2Score}`;
};
function resetGame(){
    player1Score = 0;
    player2Score = 0;
     paddle1 ={
        width: 18,
        height: 90,
        x: 0,
        y: 0,
    }
     paddle2 ={
        width: 18,
        height: 90,
        x: gameWidth -18,
        y: gameHeight -90,
    };
    ballSpeed = 1;
    ballxaxis = 0;
    ballyaxis = 0;
    ballxaxisDirection = 0;
    ballyaxisDirection = 0;
    updateScore();
    clearInterval(intervalID);
    startGame();
};



