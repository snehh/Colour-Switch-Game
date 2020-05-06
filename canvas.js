var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

window.addEventListener("resize", function(){

    obs1.x = window.innerWidth/2;
    c.clearRect(0,0,innerWidth,innerHeight);

});

function getDist( x1, y1, x2, y2 ){

    var x= Math.pow(x1-x2,2);
    var y= Math.pow(y1-y2,2);

    var dist = Math.sqrt(x+y);
    return dist;
}

var flag = 0;
function collideReact(obs){

    this.obs = new Obstacle(obs);
    if((obs.u>3.4-Math.PI*2/3 && obs.u<2.9 && p.y>obs.y)||(obs.u>3.3+Math.PI/3 && obs.u<3.3+Math.PI && p.y<obs.y))
        p.color = "pink";
    else{
        window.removeEventListener("mousedown", bounce);
        flag = 1;
    }

}

function Obstacle(x,y,r1,r2,u){

    this.x = x;
    this.y = y;
    this.r1 = r1;
    this.r2 = r2;
    this.u = u;

    this.draw = function(){
        c.beginPath();
        //c.moveTo(this.x+this.r1*Math.cos(this.u+Math.PI/6-0.025) , this.y+this.r1*Math.sin(this.u+Math.PI/6-0.025));
        c.arc(this.x,this.y,this.r2,this.u+Math.PI/6-0.025,this.u+Math.PI*1.5+0.025,1);
        //c.lineTo(this.x+this.r1*Math.cos(this.u+Math.PI*1.5) , this.y+this.r1*Math.sin(this.u+Math.PI*1.5));
        c.arc(this.x,this.y,this.r1,this.u+Math.PI*1.5+0.02,this.u+Math.PI/6-0.02,0);
        c.fillStyle = "red";
        c.fill();
        c.closePath();

        c.beginPath();
        //c.moveTo(this.x+this.r1*Math.cos(this.u+Math.PI*5/6-0.025) , this.y+this.r1*Math.sin(this.u+Math.PI*5/6-0.025));
        c.arc(this.x,this.y,this.r2,this.u+Math.PI*5/6-0.025,this.u+Math.PI/6+0.025,1);
        //c.lineTo(this.x+this.r1*Math.cos(this.u+Math.PI/6) , this.y+this.r1*Math.sin(this.u+Math.PI/6));
        c.arc(this.x,this.y,this.r1,this.u+Math.PI/6+0.02,this.u+Math.PI*5/6-0.02,0);
        c.fillStyle = "blue";
        c.fill();
        c.closePath();

        c.beginPath();
        //c.moveTo(this.x+this.r1*Math.cos(this.u+Math.PI*1.5-0.025) , this.y+this.r1*Math.sin(this.u+Math.PI*1.5-0.025));
        c.arc(this.x,this.y,this.r2,this.u+Math.PI*1.5-0.025,this.u+Math.PI*5/6+0.025,1);
        //c.lineTo(this.x+this.r1*Math.cos(this.u+Math.PI*5/6) , this.y+this.r1*Math.sin(this.u+Math.PI*5/6));
        c.arc(this.x,this.y,this.r1,this.u+Math.PI*5/6+0.02,this.u+Math.PI*1.5-0.02,0);
        c.fillStyle = "green";
        c.fill();
        c.closePath();
    }

    this.update = function(){   
        this.u += 0.008;
        if(this.u >= Math.PI*2)
            this.u -= Math.PI*2;
        this.draw();
    }

}

function bounce(){
    p.dy = -2.5;
}

function Player(y, dy, radius){

    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.color = "red";
    this.gravity = 0.1;

    this.draw = function(){
        c.beginPath();
        c.arc(window.innerWidth/2, this.y, this.radius, 0, Math.PI*2);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){

        window.addEventListener("mousedown", bounce);

        if (flag == 1){
            window.removeEventListener("mousedown", bounce);
            this.gravity = 0.5;
        }

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

var u=0;
var p = new Player(350,2,20);
var obs1 = new Obstacle(window.innerWidth/2, 200, 100, 75, 0);

function animate(){
    requestAnimationFrame(animate);

    c.clearRect(0,0,window.innerWidth,window.innerHeight);

    obs1.update();
    p.update();
    
    if((getDist(0,obs1.y,0,p.y-p.radius)<obs1.r1 && getDist(0,obs1.y,0,p.y+p.radius)>obs1.r2) || (getDist(0,obs1.y,0,p.y+p.radius)<obs1.r1 && getDist(0,obs1.y,0,p.y-p.radius)>obs1.r2))

        collideReact(obs1);
    else 
        p.color = "red";

}

animate();
