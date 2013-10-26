
$.leapMotion = function() {

	var active = 0;

	Leap.loop(function(obj) {
//		if (obj.hands.length < 1) return;	q
	/*
		var x;
		var y;
		var z;

		for (var i = 0; i < obj.pointables.length; i++) {
			var pointable = obj.pointables[i];
			var pos = pointable.tipPosition;
			x = pos[0];
			y = pos[1];
			z = pos[2];
			break;
		}
	*/
		var hand = obj.hands[0];
		var x = hand.palmPosition[0];
		var y = hand.palmPosition[1];
		var z = hand.palmPosition[2];

		leapFrame = obj;

		if (obj.hands.length == 2) {
			hand = obj.hands[1];
			x -= hand.palmPosition[0];
			y -= hand.palmPosition[1];
			z += hand.palmPosition[2];
			z /= 2;
			//mouseX = hand.fingers.length;
		}


		console.log(x);

		var canvas = window.canvs;
		var ctx = window.ctx;

		x = x * 3;
		z = z;

		ctx.beginPath();
		ctx.arc(x, z, 20, 0, Math.PI*2, false);
		ctx.fillStyle = "rgb(255, 145, 0)";
		ctx.fill();
		ctx.closePath();


/*
		circleX = (x + 100) / 300 * CANVAS_WIDTH2;
		circleY = CANVAS_HEIGHT2 - ((y-100) / 400 * CANVAS_HEIGHT2);

		if (z >= 0 && active == 0 && obj.hands.length >= 1 && obj.hands[0].fingers.length <= 1) {
			active = 1;
		}
		if (active == 2 && (obj.hands.length < 1 || obj.hands[0].fingers.length > 1) ) {
			active = 0;
		}
		
		if (active == 1) {
			db_canvas[0].style.WebkitTransform = 'rotateX(0deg) rotateY(0deg) scale(1.0)';
			db_canvas[1].style.WebkitTransform = 'rotateX(0deg) rotateY(0deg) scale(1.0)';
			active = 2;
			return;
		}
		if (active == 2 || maskPart[1]) {
			return;
		}
		
		
	//	midiColor1 = Math.round(x);
	//	midiColor2 = Math.round(y);


		cssRotY = Math.round(x*2) % 360;
		cssRotX = Math.round(y/2) % 360;
		cssSize = z / 50;
		if (cssSize < 0) cssSize = 0;

		db_canvas[0].style.WebkitTransform = 'rotateX('+ cssRotX +'deg) rotateY('+ cssRotY +'deg) scale('+ cssSize +')';
		db_canvas[1].style.WebkitTransform = 'rotateX('+ cssRotX +'deg) rotateY('+ cssRotY +'deg) scale('+ cssSize +')';

		//document.body.style.background = "hsl(" + hue + "," + saturation + "%,50%)";

*/

	});

}
