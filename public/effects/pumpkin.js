$(function(){
	function down() {
		$("#pumpkin-1, #pumpkin-4, #pumpkin-7").animate({
			top: "500px"
		}, 10000, function() {
			$(".pumpkin").css({
				top: "-500px"
			});
			down();
		});
		$("#pumpkin-2, #pumpkin-5").animate({
			top: "500px"
		}, 7000, function() {
			$(".pumpkin").css({
				top: "-500px"
			});
			down();
		});
		$("#pumpkin-3, #pumpkin-6").animate({
			top: "500px"
		}, 4000, function() {
			$(".pumpkin").css({
				top: "-500px"
			});
			down();
		});

	}

	down();

	var angle = 0;
	setInterval(function(){
    angle += 3;
		$(".pumpkin").rotate(angle);
	},50);

});


$.drawPumpkin = function(id) { 

	var canvas = 	$('.pumpkin')[id];
	var ctx = canvas.getContext('2d');
	
	var unit = canvas.width / 10;

 	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate(Math.PI / (id + 1));

	var color = "rgb(255, 164, 0)";

	ctx.beginPath();
	ctx.scale(0.7, 1.0);
	ctx.arc(unit * 1.0, unit * 4, unit, 0, Math.PI*2, false);
	ctx.arc(unit * 1.5, unit * 4, unit, 0, Math.PI*2, false);
	ctx.arc(unit * 2.0, unit * 4, unit, 0, Math.PI*2, false);
	ctx.arc(unit * 2.5, unit * 4, unit, 0, Math.PI*2, false);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(unit * 1.0, unit * 3.3);
	ctx.lineTo(unit * 1.5, unit * 4);
	ctx.lineTo(unit * 0.5, unit * 4);
	ctx.lineTo(unit * 1.0, unit * 3.3);
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(unit * 2.5, unit * 3.3);
	ctx.lineTo(unit * 3.0, unit * 4);
	ctx.lineTo(unit * 2.0, unit * 4);
	ctx.lineTo(unit * 2.5, unit * 3.3);
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(unit * 1.2, unit * 4.4);
	ctx.lineTo(unit * 1.0, unit * 4.8);
	ctx.lineTo(unit * 0.8, unit * 4.4);
	ctx.lineTo(unit * 1.2, unit * 4.4);
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(unit * 2.8, unit * 4.4);
	ctx.lineTo(unit * 2.6, unit * 4.8);
	ctx.lineTo(unit * 2.4, unit * 4.4);
	ctx.lineTo(unit * 2.8, unit * 4.4);
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fill();
	ctx.closePath();

	ctx.fillRect(unit * 1.0, unit * 4.4, unit * 1.7, unit * 0.1);


}