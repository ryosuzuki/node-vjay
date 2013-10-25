$.drawMousePos = function() {
//	if (e.clientX < 0 || clientY < 0) return;
	console.log(event.x);
}


$.drawFftBars = function(freqByteData) {
	var canvas = window.canvas;
	var ctx = window.ctx;

	var fftBarsCount = 512;
	for (var i = 0; i < fftBarsCount; i++) {
		var magnitude = freqByteData[i];
		var xlog = i * 5;
		ctx.beginPath();
		ctx.fillStyle = "rgb(255, 145, 0)";
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillRect(xlog, canvas.height, 2, -magnitude);
		ctx.closePath();
	}
}


$.drawCircle = function(volume) {	
	var ctx = window.ctx;

	ctx.beginPath();
	ctx.arc(50, 50, volume * 0.5, 0, Math.PI*2, false);
	ctx.fillStyle = "rgb(255, 145, 0)";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(770, 120, volume * 2, 0, Math.PI*2, false);
	ctx.fillStyle = "rgb(255, 145, 0)";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(1270, 270, volume * 1.0, 0, Math.PI*2, false);
	ctx.fillStyle = "rgb(255, 145, 0)";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(170, 370, volume * 1.5, 0, Math.PI*2, false);
	ctx.fillStyle = "rgb(255, 145, 0)";
	ctx.fill();
	ctx.closePath();

}

$.drawTime = function() { 
	var ctx = window.ctx;

	var size = 200;
	var xpos = 200;
	var ypos = 200;

	var dateFormat = new DateFormat("HH:mm:ss");
	var str = dateFormat.format(new Date());

	ctx.font = size + "px" + "'Tulpen One'";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
	ctx.fillText(str, xpos, ypos);
}

