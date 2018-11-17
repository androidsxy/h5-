//点击开始游戏   startpage消失  游戏开始
//随机出现食物，出现三节蛇开始运动
//上下左右，改变反向运动
//判断迟到食物   食物消失  蛇加一
//判断游戏结束  显示分数

var snakeMove;
var speed = 200;
var startGameBool = true;
var startPaushBool = true;
window.onload = function() {
    this.content = document.getElementById("content");
    this.startPage = document.getElementById("startPage");
    this.lose = document.getElementById('loser');
    this.loserScore = document.getElementById('loserScore');
    this.close = document.getElementById('close');
    this.startP = document.getElementById('startP');
    this.startBtn = document.getElementById("startBtn");
    this.audio = document.getElementById("audio");
    init();
}

function play() {
    audio.play();
}

function stop() {
    audio.pause();
}

function moveStop() {
    stop();
    audio.setAttribute("src", "sound/move.mp3");
    audio.removeAttribute("loop");
    play();
    audio.onended = function() {
        audio.setAttribute("src", "sound/background.mp3");
        audio.setAttribute("loop", 'loop');
        play();
    };
}

function init() {
    //地图
    console.log(content);
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    console.log(mapW);
    console.log(mapH);
    this.mapDiv = content;
    //食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //蛇
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [
            [3, 1, 'head'],
            [2, 1, 'body'],
            [1, 1, 'body']
        ]
        //游戏属性
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    this.score = 0;
    bindEvent();
}

function startGame() {
    play();
    startPage.style.display = "none";
    startP.style.display = 'block';
    food();
    snake();
    bindEvent();
}

function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    console.log(food.style.left);
    console.log(food.style.top);
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}

function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        switch (this.direct) {
            case 'right':
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)';
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)';
                break;
            default:
                break;
        }
    }
}

function move() {
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch (this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }
    removeClass('snake');
    snake();
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        moveStop();
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch (this.direct) {
            case 'right':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            default:
                break;
        }
        this.score += 1;
        var scoreBox = document.getElementById('score');
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] > this.mapW / 20) {
        relodGame();
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] > this.mapH / 20) {
        relodGame();
    }
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (snakeHX == this.snakeBody[i][0] && snakeHY == this.snakeBody[i][1]) {
            relodGame();
        }
    }
}

function relodGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    this.snakeBody = [
            [3, 1, 'head'],
            [2, 1, 'body'],
            [1, 1, 'body']
        ]
        //游戏属性
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    this.lose.style.display = 'block';
    this.loserScore.innerHTML = this.score;
    this.score = 0;
    var scoreBox = document.getElementById('score');
    scoreBox.innerHTML = this.score;
    startGameBool = true;
    startPaushBool = true;
    startP.setAttribute("src", "images/start.png");
    stop();
    audio.setAttribute("src", "sound/jieshu.mp3");
    audio.removeAttribute("loop");
    play();
    audio.onended = function() {
        audio.setAttribute("src", "sound/background.mp3");
        audio.setAttribute("loop", 'loop');
    };
}

function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

function bindEvent() {
    close.onclick = function() {
        lose.style.display = 'none';
    }
    startBtn.onclick = function() {
        startAndPaush();
    }
    startP.onclick = function() {
        startAndPaush();
    }
}

function setDerict(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
    }
}

function startAndPaush() {
    if (startPaushBool) {
        if (startGameBool) {
            startGame();
            startGameBool = false;
        }
        startP.setAttribute("src", 'images/pause.png')
        document.onkeydown = function(e) {
            var code = e.keyCode;
            setDerict(code);
        }
        snakeMove = setInterval(function() {
            move();
        }, speed);
        startPaushBool = false;
    } else {
        startP.setAttribute("src", "images/start.png");
        clearInterval(snakeMove);
        document.onkeydown = function(e) {
            e.returnValue = false;
            return false;
        };
        startPaushBool = true;
    }
}