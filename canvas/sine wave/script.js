const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');

cvs.height = innerHeight;
cvs.width = innerWidth;

// utility fnctions
function Control(){
    this.gap;
    this.range = function(object,property,min,max){
        if(this.gap === undefined){
            this.gap = (max - min) / 300;
        }
        this.value = object[property] + this.gap;
        if(this.value >= max || this.value <= min){
            this.gap =- this.gap
        }
        object[property] = this.value;
        
    }
   
}    
var wave = {
    y:innerHeight / 2,
    length: 0.001,
    amplitude:0,
    frequency:0.01
}

var color =  {
    h:50,
    s:40,
    l:40
}


var increment = wave.frequency

var draw = () =>{
    ctx.beginPath();
    ctx.moveTo(0,cvs.height / 2);
    for(var i = 0;i < innerWidth;i++){
        ctx.lineTo(i,wave.y + Math.sin(i * wave.length + increment) * wave.amplitude);
        
    }
    ctx.strokeStyle = `hsl(${color.h},${color.s}%,${color.l}%)`;
    ctx.stroke();
    ctx.closePath();
    
    
    increment += wave.frequency;
}

// controllers
var h = new Control();
var amplitude = new Control();
var length = new Control();
var s = new Control();


function loop(){
    
    ctx.fillStyle = "rgba(0,0,0,0.02)";
    ctx.fillRect(0,0,cvs.width,cvs.height);
    // ctx.clearRect(0,0,cvs.width,cvs.height)
    draw();
    
    // playing with values
    h.range(color,'h',0,255);
    s.range(color,'s',20,70);
    amplitude.range(wave,'amplitude',-180,180);
    length.range(wave,'length',0,0.01);
    
    requestAnimationFrame(loop);
    
}

loop();