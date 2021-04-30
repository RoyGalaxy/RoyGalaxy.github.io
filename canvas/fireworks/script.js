const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');

cvs.height = innerHeight;
cvs.width = innerWidth;


// Universal Variables
const gravity = 0.02;
const friction = 0.99;
var power = 8;
var particleCount = 400
const angleIncrement = (Math.PI * 2) / particleCount;
const explode = new Audio('explode.mp3');

// Touch Cordinates
var touch = {
    x:undefined,
    y:undefined
}



function Particle(x,y,radius,color,velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.opacity = 1;
    
    this.draw = () => {
        ctx.beginPath();
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    this.update = () => {
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.velocity.y += gravity
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.opacity -= 0.005;
        this.draw();
    }
}


var particles = [];
function createParticles(){
    for(var i = 0;i < particleCount;i++){
        particles.push(new Particle(touch.x,touch.y,2,`hsl(${Math.random() * 360},50%,50%)`,{
            x:Math.cos(i * angleIncrement) * power * Math.random(),
            y:Math.sin(i * angleIncrement) * power * Math.random()
        }));
    }
}


// Animating canvas
function loop(){
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,cvs.width,cvs.height);
    
    for(var i =0;i < particles.length;i++){
        if(particles[i].opacity - 0.005 <= 0){
            particles.splice(i,1);
        }
        else{
            particles[i].update();
        }
    }
    
    requestAnimationFrame(loop);
}

loop();


// Getting Touch Cordinates
addEventListener('click',(event) => {
        explode.pause();
        explode.currentTime = 0.00;
        explode.play();
    
    touch.x = event.clientX;
    touch.y = event.clientY;
    createParticles();
    
});