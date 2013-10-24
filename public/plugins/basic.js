

$.drawMousePos = function() {
//	if (e.clientX < 0 || clientY < 0) return;
	console.log(event.x);
}

$.fn.drawCircle = function(volume) {
	cq(this[0])
	.arc(70, 70, volume, 0, Math.PI*2, false)
	.arc(470, 170, 2 * volume, 0, Math.PI*2, false)
	.arc(270, 470, 0.5 * volume, 0, Math.PI*2, false)
	.arc(370, 570, 3 * volume, 0, Math.PI*2, false)
	.fill();
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

}

