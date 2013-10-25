

$.drawSpotlight = function() {
//	var canvas = window.canvas;
//	var ctx = window.ctx;

	var canvas = document.getElementById('spotlight');
	var ctx = canvas.getContext('2d');


	var orange = "#FF9100";
	var purple = "#4d004d";

	var color = purple;

	$("body").css("background", color);
	
	var dateFormat = new DateFormat("HH:mm:ss");
	var str = dateFormat.format(new Date());

	var displayText = "Happy Halloween";
	var textColor = color;
	var textStyle = "normal normal bold 100px Bigelow Rules";
	var minCircleRadius = 40;
	var maxCircleRadius = 140;
	var circleRadiusProximity = 5;
	var minCircleOpacity = .2;
	var maxCircleOpacity = .9;
	var circleOpacityProximity = 1000;
	var colors = {
		'beam1': '255,255,255',
		'beam2': '255,255,255',
		'beam3': '255,255,255',
		'beam4': '255,255,255',
		'beam5': '255,255,255',
		'beam6': '255,255,255',
	}

	beams = [];
	i = 0;
	for (color in colors) {
		beams[color] = {};
		beams[color].fillColor 	= colors[color];
		beams[color].shiftX = beams[color].moveX = Math.random() * 2 > 1 ? parseInt(Math.random() * canvas.width / 2) - minCircleRadius : parseInt(Math.random() * canvas.width / -2) + minCircleRadius;
		beams[color].shiftY = beams[color].moveY = Math.random() * 2 > 1 ? parseInt(Math.random() * canvas.height / 2) - minCircleRadius : parseInt(Math.random() * canvas.height / -2) + minCircleRadius;
		i++;
	}

	setInterval(function() {
		canvas.width = canvas.width;

		for (beam in beams) {
			currentBeam = beams[beam];
			if (currentBeam.shiftX > currentBeam.moveX) { currentBeam.shiftX--; }
			if (currentBeam.shiftX < currentBeam.moveX) { currentBeam.shiftX++; }
			if (currentBeam.shiftY > currentBeam.moveY) { currentBeam.shiftY--; }
			if (currentBeam.shiftY < currentBeam.moveY) { currentBeam.shiftY++; }
			if (currentBeam.shiftX == currentBeam.moveX && currentBeam.shiftY == currentBeam.moveY) {
				currentBeam.moveX 		= Math.random() * 2 > 1 ? parseInt(Math.random() * canvas.width / 2) - minCircleRadius : parseInt(Math.random() * canvas.width / -2) + minCircleRadius;
				currentBeam.moveY 		= Math.random() * 2 > 1 ? parseInt(Math.random() * canvas.height / 2) - minCircleRadius : parseInt(Math.random() * canvas.height / -2) + minCircleRadius;
			}
			circleRadius = maxCircleRadius - ((Math.abs(currentBeam.shiftX) + Math.abs(currentBeam.shiftY)) / circleRadiusProximity);
			if (circleRadius < minCircleRadius) { circleRadius = minCircleRadius; }

			circleOpacity = maxCircleOpacity - ((Math.abs(currentBeam.shiftX) + Math.abs(currentBeam.shiftY)) / circleOpacityProximity);
			if (circleOpacity < minCircleOpacity) { circleOpacity = minCircleOpacity; }

			ctx.fillStyle = 'rgba('+currentBeam.fillColor+', '+circleOpacity+')';
			ctx.beginPath();
			ctx.arc(canvas.width/2 + currentBeam.shiftX, canvas.height/2 + currentBeam.shiftY, circleRadius, 0, 2*Math.PI);
			ctx.fill();
		}

	  	ctx.fillStyle = textColor;
	  	ctx.font = textStyle;
	  	ctx.textAlign = 'center';
		ctx.fillText(displayText, canvas.width/2, canvas.height/2 + 40);
	}, 100/60);
}

