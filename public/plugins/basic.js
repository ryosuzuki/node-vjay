

$.drawMousePos = function() {
//	if (e.clientX < 0 || clientY < 0) return;
	console.log(event.x);
}


$.fn.freq = function(freqByteData) {
	var fftBars = 512;
	var rainbow = new Rainbow();
	rainbow.setNumberRange(1, fftBars - 1);
	rainbow.setSpectrum('orange', 'yellow');
	for (var i = 0; i < fftBars; i++) {
		var magnitude = freqByteData[i];
		//var xlog = Math.LOG10E * Math.log(i*50)*200 - 200;
		var xlog = i * 5;
		cq(this[0])
		.fillStyle(rainbow.colourAt(i))
		.fillRect(xlog, 600, 2, -magnitude);
	}
}

$.fn.drawCircle = function(freqByteData) {	
	var volume = getAverageVolume(freqByteData);
	cq(this[0])
	.arc(70, 70, volume, 0, Math.PI*2, false)
	.fill();
//	.arc(470, 170, 2 * volume, 0, Math.PI*2, false)
//	.arc(270, 470, 0.5 * volume, 0, Math.PI*2, false)
//	.arc(370, 570, 3 * volume, 0, Math.PI*2, false)
//	.fill();
}

$.fn.drawTime = function() { 

	var size = 200;
	var xpos = 200;
	var ypos = 200;

	var dateFormat = new DateFormat("HH:mm:ss");
	var str = dateFormat.format(new Date());

	cq(this[0])	
	.font(size + "px" + "'Tulpen One'")
	.textBaseline("middle")
	.textAlign("center")
	.fillStyle("rgba(255, 255, 255, 0.9)")
	.fillText(str, xpos, ypos);
}


/*
	context.beginPath();
	context.moveTo(50, 0); 
	context.lineTo(100, 100);
	context.lineTo(0, 100);
	context.lineTo(50, 0);
	context.fill();

	context.beginPath();
	context.moveTo(200, 00); 
	context.lineTo(250, 100);
	context.lineTo(150, 100);
	context.lineTo(200, 0);
	context.fill();

	context.beginPath();
	context.moveTo(50, 0); 
	context.lineTo(100, 100);
	context.lineTo(0, 100);
	context.lineTo(50, 0);
	context.fill();

	context.beginPath();
	context.fillRect(50, 150, 150, 50);
*/
