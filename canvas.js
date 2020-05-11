var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

for(var t=0; t<4; t++)
    document.getElementsByClassName("a")[t].classList.add("Erase");

for(var t=0; t<3; t++)
    document.getElementsByClassName("b")[t].classList.remove("Erase");


window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
});

//     for( var i=0; i<obstacleArray.length; i++ )
//         obstacleArray[i].x = window.innerWidth/2;
//     c.clearRect(0,0,innerWidth,innerHeight);

// });

if(localStorage.getItem("highscore") == null)
    localStorage.setItem("highscore",0);

function getDist( x1, y1, x2, y2 ){

    var x= Math.pow(x1-x2,2);
    var y= Math.pow(y1-y2,2);

    var dist = Math.sqrt(x+y);
    return dist;
}


function Obstacle3(x,y,r1,r2,u,col){

    this.x = x;
    this.y = y;
    this.r1 = r1;
    this.r2 = r2;
    this.u = u;
    this.r = 10;
    this.add = 0.1;
    this.col = col;
    var r = (Math.random() - 0.5);
    this.speed = Math.random()*0.01 + 0.008;
    if(score >= 9)
        this.speed += 0.016;
    else if(score >= 4)
        this.speed += 0.008;
    if(r<0) this.speed *= -1;

    var flag1 = 0, flag2 = 0;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.r2,this.u+Math.PI/6,this.u+Math.PI*1.5,1);
        c.arc(this.x,this.y,this.r1,this.u+Math.PI*1.5,this.u+Math.PI/6,0);
        c.fillStyle = colorArray[this.col];
        c.fill();
        c.closePath();

        c.beginPath();
        c.arc(this.x,this.y,this.r2,this.u+Math.PI*5/6,this.u+Math.PI/6,1);
        c.arc(this.x,this.y,this.r1,this.u+Math.PI/6,this.u+Math.PI*5/6,0);
        c.fillStyle = colorArray[this.col + 1];
        c.fill();
        c.closePath();

        c.beginPath();
        c.arc(this.x,this.y,this.r2,this.u+Math.PI*1.5,this.u+Math.PI*5/6,1);
        c.arc(this.x,this.y,this.r1,this.u+Math.PI*5/6,this.u+Math.PI*1.5,0);
        c.fillStyle = colorArray[this.col +2];
        c.fill();
        c.closePath();
    }

    this.point = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.r, Math.PI*2, 0);
        c.fillStyle = colorArray[p.col];
        c.fill();
        
    }

    this.swapDraw = function(){

        c.beginPath();
        c.moveTo(this.x, this.y-200);
        c.arc(this.x, this.y-200, 15, 0, Math.PI/2);
        c.fillStyle = colorArray[0];
        c.fill();
        c.beginPath();
        c.moveTo(this.x, this.y-200);
        c.arc(this.x, this.y-200, 15, Math.PI/2, Math.PI);
        c.fillStyle = colorArray[1];
        c.fill();
        c.beginPath();
        c.moveTo(this.x, this.y-200);
        c.arc(this.x, this.y-200, 15, Math.PI, Math.PI*1.5);
        c.fillStyle = colorArray[2];
        c.fill();
        c.beginPath();
        c.moveTo(this.x, this.y-200);
        c.arc(this.x, this.y-200, 15, Math.PI*3/2, 0);
        c.fillStyle = colorArray[3];
        c.fill();
    }

    this.update = function(){   
        this.u += this.speed;
        if(this.u <= 0)
            this.u += Math.PI*2;
        if(this.u >= Math.PI*2)
            this.u -= Math.PI*2;
        this.draw();

        if((p.y - p.radius > this.y - 200 + 15)&&(flag2 == 0)){
            this.swapDraw();
        }
        else if(flag2 == 0){
            flag2 = 1;
            p.col++;
        }
        
        if(p.y - p.radius <= this.y + this.r){
            if(flag1 == 0){
                score++;
                flag1 = 1;
            }
            this.add = 0;
            this.r = 0;
        }
        
        this.point();
        this.r += this.add;
        if(this.r >= 15)
            this.add = -0.1;
        if(this.r <= 5 && this.r > 1)
            this.add = 0.1;

       
    }

    this.collideReact = function(){
    if(!((this.u>3.4-Math.PI*2/3 && this.u<2.9 && p.y>this.y)||(this.u>3.3+Math.PI/3 && this.u<3.3+Math.PI && p.y<this.y)))
    {
        gameOver();
    }

}

}

function Obstacle4(x,y,r1,r2,u,col){

    this.x = x;
    this.y = y;
    this.r1 = r1;
    this.r2 = r2;
    this.u = u;
    this.r = 10;
    this.add = 0.1;
    this.col = col;
    var r = (Math.random() - 0.5);
    this.speed = Math.random()*0.01 + 0.008;
    if(score >= 9)
        this.speed += 0.016;
    else if(score >= 4)
        this.speed += 0.008;
    if(r<0) this.speed *= -1;
    var flag1 = 0, flag2 = 0;

    this.draw = function(){

        c.beginPath();
        c.arc(this.x,this.y,this.r2,this.u+Math.PI*.5,this.u+0,1);
        c.arc(this.x,this.y,this.r1,this.u+0,this.u+Math.PI*.5,0);
        c.fillStyle = colorArray[this.col];
        c.fill();
        c.closePath();

        c.beginPath();
        c.arc(this.x,this.y,this.r2,this.u+Math.PI,this.u+Math.PI*.5,1);
        c.arc(this.x,this.y,this.r1,this.u+Math.PI*.5,this.u+Math.PI,0);
        c.fillStyle = colorArray[this.col + 1];
        c.fill();
        c.closePath();

        c.beginPath();
        c.arc(this.x,this.y,this.r2,this.u+Math.PI*1.5,this.u+Math.PI,1);
        c.arc(this.x,this.y,this.r1,this.u+Math.PI,this.u+Math.PI*1.5,0);
        c.fillStyle = colorArray[this.col + 2];
        c.fill();
        c.closePath();

        c.beginPath();
        c.arc(this.x,this.y,this.r2,this.u+Math.PI*2,this.u+Math.PI*1.5,1);
        c.arc(this.x,this.y,this.r1,this.u+Math.PI*1.5,this.u+Math.PI*2,0);
        c.fillStyle = colorArray[this.col + 3];
        c.fill();
        c.closePath();
    }

    this.point = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.r, Math.PI*2, 0);
        c.fillStyle = colorArray[p.col];
        c.fill();
        
    }

    this.swapDraw = function(){
         
        c.beginPath();
        c.moveTo(this.x, this.y-200);
        c.arc(this.x, this.y-200, 15, 0, Math.PI/2);
        c.fillStyle = colorArray[0];
        c.fill();
        c.beginPath();
        c.moveTo(this.x, this.y-200);
        c.arc(this.x, this.y-200, 15, Math.PI/2, Math.PI);
        c.fillStyle = colorArray[1];
        c.fill();
        c.beginPath();
        c.moveTo(this.x, this.y-200);
        c.arc(this.x, this.y-200, 15, Math.PI, Math.PI*1.5);
        c.fillStyle = colorArray[2];
        c.fill();
        c.beginPath();
        c.moveTo(this.x, this.y-200);
        c.arc(this.x, this.y-200, 15, Math.PI*3/2, 0);
        c.fillStyle = colorArray[3];
        c.fill();
    }


    this.update = function(){   
        this.u += this.speed;
        if (this.u <= 0)
            this.u += Math.PI*2;
        if(this.u >= Math.PI*2)
            this.u -= Math.PI*2;
        this.draw();

        if((p.y - p.radius > this.y - 200 + 15)&&(flag2 == 0)){
            this.swapDraw();
        }
        else if(flag2 == 0){
            flag2 = 1;
            p.col++;
        }
        
        if(p.y - p.radius <= this.y + this.r){ 
            if(flag1 == 0){
                score++;
                flag1 = 1;
            }
            this.r = 0;
            this.add = 0;
        }
        this.point();
        this.r += this.add;
        if(this.r >= 15)
            this.add = -0.1;
        if(this.r <= 5 && this.r > 1)
            this.add = 0.1;
    }

    this.collideReact = function(){
        if(!((this.u>0.16 && this.u<1.28 && p.y>this.y) || (this.u>0.16+Math.PI && this.u<1.28+Math.PI && p.y<this.y)))
        {
            gameOver();
        }
    }

}

function bounce(){
    p.dy = -2.5;
}

function Player(y, dy, radius, col){

    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.col = col;
    this.gravity = 0.1;

    this.draw = function(){
        c.beginPath();
        c.arc(window.innerWidth/2, this.y, this.radius, 0, Math.PI*2);
        c.fillStyle = colorArray[this.col];
        c.fill();
    }

    this.update = function(){

        window.addEventListener("mousedown", bounce);

        if(togglePause != -1)
            this.draw();
        this.y += this.dy;

        if(this.y + 20 >= window.innerHeight){
            this.dy = 0;
            this.y = window.innerHeight - 20;
        }
        else{
        this.dy += this.gravity;
        }
          
    }
}

var colorArray = ["#DE7070","#BFE8E1","#178A94","#2B374B","#DE7070","#BFE8E1","#178A94"];
//                   red    off white    blue   dark blue       

var u=0;
var colVariable = 0;
var score = 0;
var p = new Player(450,2,20,0);

var obstacleArray = [];
obstacleArray.push(new Obstacle3(window.innerWidth/2, 100, 100, 85, 0, colVariable++));

function animate(){

    c.clearRect(0,0,window.innerWidth,window.innerHeight);

    if(score > localStorage.getItem("highscore")){
        localStorage.setItem("highscore", score);
        document.getElementById("highscore").innerHTML = "Best: " + localStorage.getItem("highscore");
    }

    if(colVariable>=4)
        colVariable-=4;

    if(p.col >= 4)
        p.col-=4;

    if(obstacleArray[obstacleArray.length-1].y >= 200){
        var random = Math.random();
        if(random < 0.5)
            obstacleArray.push(new Obstacle3(window.innerWidth/2, -200, 100, 85, 0, colVariable++));
        else 
            obstacleArray.push(new Obstacle4(window.innerWidth/2, -200, 100, 85, 0, colVariable++));
    }
    
    if(obstacleArray[0].y - obstacleArray[0].r1 > window.innerHeight)
        obstacleArray.splice(0,1);

    for(var i=0; i<obstacleArray.length; i++){
        obstacleArray[i].update();
    }

    p.update();

    if (p.y < 400){
        for( i=0; i<obstacleArray.length; i++)
            obstacleArray[i].y += 400 - p.y;
        p.y += 400 - p.y;
    }
    for(i=0;i<obstacleArray.length;i++)
        if((getDist(0,obstacleArray[i].y,0,p.y-p.radius)<obstacleArray[i].r1 && getDist(0,obstacleArray[i].y,0,p.y+p.radius)>obstacleArray[i].r2) || (getDist(0,obstacleArray[i].y,0,p.y+p.radius)<obstacleArray[i].r1 && getDist(0,obstacleArray[i].y,0,p.y-p.radius)>obstacleArray[i].r2))
            obstacleArray[i].collideReact();
        else 
            p.color = colorArray[0];


    if(togglePause == 1)
        requestAnimationFrame(animate);

    document.getElementsByTagName("h6")[0].innerHTML = (score);

}

function startGame(){
    document.getElementById("onStart").innerHTML = " ";
    window.removeEventListener("click", startGame);
    animate();
}

function gameOver(){
    window.removeEventListener("mousedown", bounce);
    togglePause = -1;
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for(var t=0; t<3; t++)
        document.getElementsByClassName("b")[t].classList.add("Erase");
    for(var t=0; t<4; t++)
        document.getElementsByClassName("a")[t].classList.remove("Erase");

    document.getElementById("finScore").innerHTML = "Your score: " + score;
    document.getElementById("high").innerHTML = "Best score: " + localStorage.getItem("highscore");

    window.addEventListener("keydown", function(event){
        if(event.keyCode == 13)
            location.reload();
    });
}

var togglePause = 1;

p.draw();
obstacleArray[0].draw();
obstacleArray[0].point();
if(localStorage.getItem("highscore") != 0)
    document.getElementById("highscore").innerHTML = "Best: " + localStorage.getItem("highscore");
window.addEventListener("click", startGame);


window.addEventListener("keydown", function(event){
    if(event.keyCode == 80){
        if(togglePause == 1){
            this.document.getElementById("pause").innerHTML = "Paused";
            togglePause = 0;
        }
        else if(togglePause == 0){
            this.document.getElementById("pause").innerHTML = " ";
            togglePause = 1;
            animate();
        }
    }
});



