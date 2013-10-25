
$.drawOrbit = function() {
	var canvas = window.canvas;
	var ctx = window.ctx;

	var rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);}
	ctx.lineCap = 'round';
	var orbs = [];
	var orbCount = 30;
	var radius;

	function createOrb(mx,my){
	  var dx = (canvas.width / 2) - mx;
		var dy = (canvas.heigth / 2) - my;
		var dist = Math.sqrt(dx * dx + dy * dy);
		var angle = Math.atan2(dy, dx);
		orbs.push({
			x: mx,
			y: my,
			lastX: mx,
			lastY: my,
			hue: 0,
			colorAngle: 0,
			angle: angle + Math.PI/2,
			//size: .5+dist/250,
			size: rand(1,3)/2,
			centerX: canvas.width/2,
			centerY:  canvas.heigth/2,		
			radius: dist,
			speed: (rand(5,10)/1000)*(dist/750)+.015,
			alpha: 1 - Math.abs(dist)/canvas.width,
			draw: function() {			
				ctx.strokeStyle = 'hsla('+this.colorAngle+',100%,50%,1)';	
				ctx.lineWidth = this.size;			
				ctx.beginPath();
				ctx.moveTo(this.lastX, this.lastY);
				ctx.lineTo(this.x, this.y);
				ctx.stroke();
			},	
			update: function(){
				var mx = this.x;
				var my = this.y;	
				this.lastX = this.x;
				this.lastY = this.y;
				var x1 = canvas.width/2;
				var y1 =  canvas.heigth/2;
				var x2 = mx;
				var y2 = my;		
				var rise = y1-y2;
				var run = x1-x2;
				var slope = -(rise/run);
				var radian = Math.atan(slope);
				var angleH = Math.floor(radian*(180/Math.PI));		
				if(x2 < x1 && y2 < y1){angleH += 180;}		
				if(x2 < x1 && y2 > y1){angleH += 180;}		
				if(x2 > x1 && y2 > y1){angleH += 360;}		
				if(y2 < y1 && slope =='-Infinity'){angleH = 90;}		
				if(y2 > y1 && slope =='Infinity'){angleH = 270;}		
				if(x2 < x1 && slope =='0'){angleH = 180;}
				if(isNaN(angleH)){angleH = 0;}
				
				this.colorAngle = angleH;
				this.x = this.centerX + Math.sin(this.angle*-1) * this.radius;
				this.y = this.centerY + Math.cos(this.angle*-1) * this.radius;
				this.angle += this.speed;
			
			}
		});
	}

	function orbGo(e){
		var mx = e.pageX - canvas.offsetLeft;
		var my = e.pageY - canvas.offsetTop;		
		createOrb(mx,my);
	}

	function turnOnMove(){
		canvas.addEventListener('mousemove', orbGo, false);	
	}

	function turnOffMove(){
		canvas.removeEventListener('mousemove', orbGo, false);	
	}

	function toggleTrails(){
		trail = trailCB. canvas.heigthecked;
	}

	function clear(){
	 orbs = []; 
	}

	canvas.addEventListener('mousedown', orbGo, false);
	canvas.addEventListener('mousedown', turnOnMove, false);
	canvas.addEventListener('mouseup', turnOffMove, false);
	trailCB.addEventListener(' canvas.heigthange', toggleTrails, false);
	clearer.addEventListener('click', clear, false);

	var count = 100;
	while(count--){
			createOrb(canvas.width / 2, canvas.heigth / 2 + (count*2));
	}

	var loop = function(){
	  window.requestAnimFrame(loop);
		if(trail){
			ctx.fillStyle = 'rgba(0,0,0,.1)';
			ctx.fillRect(0, 0, canvas.width, canvas.heigth);
		} else {
			ctx.clearRect(0, 0, canvas.width, canvas.heigth);
		}
		var i = orbs.length;
		while(i--){	
			var orb = orbs[i];	
			var updateCount = 3;
			while(updateCount--){
			orb.update();		
			orb.draw(ctx);
			}
			
		}
	}
            
	loop();
}

