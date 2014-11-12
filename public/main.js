


$(function(){
	window.canvas = document.getElementById('main');
	window.ctx = window.canvas.getContext('2d');

	var canvas = window.canvas; 
  var ctx = window.ctx;

	$.drawSpotlight();
	$.drawPumpkin(0);
	$.drawPumpkin(1);
	$.drawPumpkin(2);
	$.drawPumpkin(3);
	$.drawPumpkin(4);
	$.drawPumpkin(5);
	$.drawPumpkin(6);

//	$.leapMotion();

	var isChrome = window.chrome
	if(isChrome){
	  var context = new webkitAudioContext();
	  var analyser = context.createAnalyser();

	  navigator.getUserMedia = ( navigator.getUserMedia    || navigator.webkitGetUserMedia ||
				     navigator.mozGetUserMedia ||navigator.msGetUserMedia);
	  if (navigator.getUserMedia) {
	    navigator.webkitGetUserMedia( {video: false, audio: true}, function(stream) {
	      var microphone = context.createMediaStreamSource(stream);
	      microphone.connect(analyser);		
	    }, function(){ console.warn("Error getting audio stream from getUserMedia")} );
	  }
	}
	
	drawAnimation();

  function drawAnimation() {
    window.webkitRequestAnimationFrame(drawAnimation, canvas);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (analyser != undefined) {
	    var freqByteData = new Uint8Array(analyser.frequencyBinCount);
	    analyser.getByteFrequencyData(freqByteData); 

	  	var volume = getAverageVolume(freqByteData);
			$.drawFftBars(freqByteData);
			$.drawCircle(volume);
		}
		$.drawTime();



//		$.drawOrbit();
  }

  resize();

	function resize() {

	  var canvas = window.canvas
	  var canvasRatio = canvas.height / canvas.width;
	  var windowRatio = window.innerHeight / window.innerWidth;
	  var width;
	  var height;

	  if (windowRatio < canvasRatio) {
	      height = window.innerHeight;
	      width = height / canvasRatio;
	  } else {
	      width = window.innerWidth;
	      height = width * canvasRatio;
	  }

	  canvas.style.width = width + 'px';
	  canvas.style.height = height + 'px';

	  var canvas = document.getElementById('spotlight');
	  var canvasRatio = canvas.height / canvas.width;
	  var windowRatio = window.innerHeight / window.innerWidth;
	  var width;
	  var height;

//	  if (windowRatio < canvasRatio) {
//	      height = window.innerHeight;
//	      width = height / canvasRatio;
//	  } else {
	      width = window.innerWidth;
	      height = width * canvasRatio;
//	  }

	  canvas.style.width = width + 'px';
	  canvas.style.height = height + 'px';

	};

	window.addEventListener('resize', resize, false);


});



var context = new webkitAudioContext();
var source = null;
var analyser = context.createAnalyser();
var bufsize = 512

var myParticleObject;

var curve = null;
var midiVelo = 10;
var midiCount = 1.0;
var midiOnOff = 0;
var mojiCount = 0;
var mojiAlpha = 0;
var kanji = 0;
var mojiX = 0;
var mojiY = 0;
var mojiCode = 0;
var midiText;
var midiColor1 = 0xFF;
var midiColor2 = 0xFF;
var BAR_WIDTH = 600;
var BAR_WIDTH2 = 2;
var divide = 1;
var midiVol = 41;
var ampOfst = 120;
var pressedShift = 0;

var mouseX = -1;
var mouseY = -1;

var s3idx = 0;

var fontCtg = 0;

navigator.getUserMedia = ( navigator.getUserMedia    || navigator.webkitGetUserMedia ||
			   navigator.mozGetUserMedia ||navigator.msGetUserMedia);
if (navigator.getUserMedia) {
  navigator.webkitGetUserMedia( {video: false, audio: true}, function(stream) {
    var microphone = context.createMediaStreamSource(stream);
    microphone.connect(analyser);
    //var video = document.querySelector('video');
    //video.src = window.URL.createObjectURL(stream);

    //video.onloadedmetadata = function(e) {
    //};
  }, function (){ console.warn("Error getting audio stream from getUserMedia")} );
}

/*

function Setup() {
	var steps = 256; //parseInt(document.getElementById("steps").value);
	if(steps < 1)
		steps = 1;
	curve = new Float32Array(steps);	// Make Curve (length = steps)
	for(var i = 0; i < steps; ++i) {
		curve[i] = 2 * i / (steps - 1) - 1;
	}
	shaper.curve = curve;		// set curve to WaveShaper
}

Setup();
*/

var canvas = document.getElementById('mask');
var ctx = canvas.getContext('2d');

var db_canvas = {
	0: document.getElementById("db0"),
	1: document.getElementById("db1")
};

var db_flip = 0;

db_canvas[1-db_flip].style.visibility='hidden';
db_canvas[db_flip].style.visibility='visible';

//db_flip = 1 - db_flip;

var ctx2 = db_canvas[db_flip].getContext('2d');


const CANVAS_HEIGHT = canvas.height;
const CANVAS_WIDTH = canvas.width;

const CANVAS_HEIGHT2 = canvas.height;
const CANVAS_WIDTH2 = canvas.width;

var maskOn = 0;
var numMask = 1;
var maskFocus = 0;
var maskPart = null;
var maskLine = null;
var maskX1 = null;
var maskY1 = null;
var maskX2 = null;
var maskY2 = null;
var maskX3 = null;
var maskY3 = null;
var maskX4 = null;
var maskY4 = null;
var maskProgress = null;
var circleX = CANVAS_WIDTH2 / 2;
var circleY = CANVAS_HEIGHT2 / 2;

var dist = 1;
var count = 0;
var lineOn = 1;
var fftOn = 0;
var circleOn = 0;
var waveOn = 0;
var colorbarOn = 0;
var ptOn = 0;
var kenjiOn = 0;
var clockOn = 1;

var menuOn = 0;
var leapOn = 1;
var debugNo = 0;
var fontOn = 0;
var fontCode = 0;

var numHLed = 16;
var numWLed = 22;

var text1 = "夢生未来輝空光行真実白葵蒼碧仰証灯里朱曙賭秋邁進鮮烈繊細彷彿伝説禁断梓春夏歩勇樹朝潮海固宴花導姿乳守栄町世界歴参謀超爆凶器鼓舞懺悔斬撃皇帝狼桃牙悶絶獅泳都交迷酔酒呑容秘密救昇降将校惹熟女架懐福吹払拭駆早速奇跡愛情委偉潜隠密回廊偕老席新臨逐圧倒赦縁今日平和専念千年勝葛藤芸萌築乙葉静香清潔響鏡北極眩吟醸敬聡恵蛍轟盛定理科聖賢森雫旬駿瞬間純粋羽幅瞬浄志銀誠成人雪刹那泉仙善禅奏想像創造霜宇宙天大吟醸鷹佑音楽力能月綴恒翼昌永橙虎願信伸鋼楓朝名誉炎命尊富幸茜鐘朱彩砂泉詠詠踊叶絹衣澄汐留梢琴歴史咲穏忍潤舞宝誓太鼓雷継七望希美椿姫苺壱弐参岬南優悠愛恋";

var leapFrame = null;

(function() {

window.audio = new Audio();

//audio.src = 'http://api.soundcloud.com/tracks/65661435/stream' + '?client_id=YOUR_CLIENT_ID';
audio.src = 'http://api.soundcloud.com/tracks/63265727/stream' + '?client_id=YOUR_CLIENT_ID';
//audio.src = 'http://api.soundcloud.com/tracks/66647094/stream' + '?client_id=YOUR_CLIENT_ID';
//audio.src = 'http://api.soundcloud.com/tracks/28676631/stream' + '?client_id=YOUR_CLIENT_ID';

audio.controls = true;
//audio.autoplay = true;
audio.loop = true;
//audio.play();

var img = 0;

function initMask() {
	maskPart = new Array(numMask);
	maskLine = new Array(numMask);
	maskX1 = new Array(numMask);
	maskY1 = new Array(numMask);
	maskX2 = new Array(numMask);
	maskY2 = new Array(numMask);
	maskX3 = new Array(numMask);
	maskY3 = new Array(numMask);
	maskX4 = new Array(numMask);
	maskY4 = new Array(numMask);
	maskProgress = new Array(numMask);

/*
	var def_width = 280;
	var def_interval = def_width + 40;
	var def_xpos = 100;
	for (var i = 0; i < numMask; i++) {
		maskPart[i] = 1;
		maskLine[i] = 1;
		maskX1[i] = def_xpos + def_interval*i;
		maskY1[i] = 100;
		maskX2[i] = def_xpos + def_interval*i;
		maskY2[i] = CANVAS_HEIGHT - 100;
		maskX3[i] = def_xpos + def_width + def_interval*i;
		maskY3[i] = CANVAS_HEIGHT - 100;
		maskX4[i] = def_xpos + def_width + def_interval*i;
		maskY4[i] = 100;
		maskProgress[i] = 0;
	}
*/
	var def_xpos = 200;
	var def_ypos = 200;
	var def_width = 400;
	var def_height = 300;

	maskPart[0] = 1;
	maskX1[0] = def_xpos;
	maskY1[0] = def_ypos;
	maskX2[0] = def_xpos;
	maskY2[0] = def_ypos + def_height;
	maskX3[0] = def_xpos + def_width;
	maskY3[0] = def_ypos + def_height;
	maskX4[0] = def_xpos + def_width;
	maskY4[0] = def_ypos;
}

function drawMask() {
	if (maskOn == 0) return;

	if (maskPart[0]) {
		ctx.fillStyle = 'rgba(0, 0, 0, 1)';
		ctx.fillRect(maskX1[0], maskY1[0], maskX3[0] - maskX1[0], maskY3[0] - maskY1[0]);
	}
/*
	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = 'rgba(0, 0, 0, 1)';
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	ctx.lineWidth = 20;
	ctx.strokeStyle = 'rgba(200, 200, 200, 1.0)';
	ctx.lineJoin = "round";
	ctx.lineCap = "butt";

	var lineSpeed = 8;

	for (var i = 0; i < numMask; i++) {
		if (maskPart[i] && maskLine[i]) {
			ctx.globalCompositeOperation = "source-over";
			ctx.beginPath();
			ctx.moveTo(maskX1[i], maskY1[i]);
			var progress = maskProgress[i];
			if (progress < maskY2[i] - maskY1[i]) {
				ctx.lineTo(maskX2[i], maskY1[i] + progress);
				ctx.stroke();
				maskProgress[i] += lineSpeed;
			} else {
				ctx.lineTo(maskX2[i], maskY2[i]);
				progress -= (maskY2[i] - maskY1[i]);
				if (progress < maskX3[i] - maskX2[i]) {
					ctx.lineTo(maskX2[i] + progress, maskY3[i]);
					ctx.stroke();
					maskProgress[i] += lineSpeed;
				} else {
					ctx.lineTo(maskX3[i], maskY3[i]);
					progress -= (maskX3[i] - maskX2[i]);
					if (progress < maskY3[i] - maskY4[i]) {
						ctx.lineTo(maskX4[i], maskY3[i] - progress);
						ctx.stroke();
						maskProgress[i] += lineSpeed;
					} else {
						ctx.lineTo(maskX4[i], maskY4[i]);
						progress -= (maskY3[i] - maskY4[i]);
						if (progress < maskX4[i] - maskX1[i]) {
							ctx.lineTo(maskX4[i] - progress, maskY1[i]);
						} else {
							ctx.closePath();
						}
						ctx.stroke();
						maskProgress[i] += lineSpeed;
					}
				}
			}
		}
		if (maskPart[i]) {
			ctx.globalCompositeOperation = "destination-out";
			ctx.beginPath();
			ctx.moveTo(maskX1[i], maskY1[i]);
			ctx.lineTo(maskX2[i], maskY2[i]);
			ctx.lineTo(maskX3[i], maskY3[i]);
			ctx.lineTo(maskX4[i], maskY4[i]);
			ctx.closePath();
			ctx.fill();
			maskProgress[i]++;
		}
	}
*/
}

function drawMousePos() {
	if (mouseX < 0 || mouseY < 0) return;
	var aTextX = String(mouseX);
	var aTextY = String(mouseY);
	var size = 50;
	ctx2.font = size + 'px' + "'Open Sans Condensed'";
	ctx2.textAlign = "center";
	ctx2.textBaseline = "bottom";
	ctx2.fillText("(" + aTextX + "," + aTextY + ")", mouseX, mouseY);
}

function drawSnow(volume) {
	console.log('hoge');
	ctx2.beginPath();
	var raduius = volume;
	ctx2.arc(70, 70, raduius, 0, Math.PI*2, false);
	ctx2.arc(470, 170, 2 * raduius, 0, Math.PI*2, false);
	ctx2.arc(270, 470, 0.5 * raduius, 0, Math.PI*2, false);
	ctx2.arc(370, 570, 3 * raduius, 0, Math.PI*2, false);
	ctx2.fill();

	ctx2.beginPath();
	ctx2.moveTo(50, 0); 
	ctx2.lineTo(100, 100);
	ctx2.lineTo(0, 100);
	ctx2.lineTo(50, 0);
	ctx2.fill();

	ctx2.beginPath();
	ctx2.moveTo(200, 00); 
	ctx2.lineTo(250, 100);
	ctx2.lineTo(150, 100);
	ctx2.lineTo(200, 0);
	ctx2.fill();

	ctx2.beginPath();
	ctx2.moveTo(50, 0); 
	ctx2.lineTo(100, 100);
	ctx2.lineTo(0, 100);
	ctx2.lineTo(50, 0);
	ctx2.fill();

	ctx2.beginPath();
	ctx2.fillRect(50, 150, 150, 50);

}



function drawClock() {
	if (clockOn == 0) return;
	
	var size = 200;
	var xpos = 200;
	var ypos = CANVAS_HEIGHT / 2;
	ctx2.font = size + 'px' + "'Tulpen One'";
	ctx2.textAlign = "center";
	ctx2.textBaseline = "middle";
	ctx2.fillStyle = 'rgba(255, 255, 255, 0.9)';

	var dateFormat = new DateFormat("HH:mm:ss");
	var str = dateFormat.format(new Date());
	ctx2.fillText(str, xpos, ypos);
}

function drawLeap() {
	if (leapFrame == null) return;
	if (leapFrame.hands.length < 1) return;
	if (fontOn) return;

	ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	for (var i = 0; i < leapFrame.hands.length; i++) {
		for (var j = 0; j < leapFrame.hands[i].fingers.length; j++) {
			var x = leapFrame.hands[i].fingers[j].tipPosition[0];
			var y = leapFrame.hands[i].fingers[j].tipPosition[1];
			var z = leapFrame.hands[i].fingers[j].tipPosition[2];
			
			x = (x + 200) / 300 * CANVAS_WIDTH2;
			y = CANVAS_HEIGHT2 - ((y) / 400 * CANVAS_HEIGHT2);
			z = Math.abs(z + 200) * 0.7;
			var aText = String(j+1);
			ctx.fillStyle = 'rgba(255, 255, 255, 1)';
			if (j == 0) {
				var aSize = (z / 5) + 'px';
				ctx.font = aSize + "'Offside'";
				ctx.fillText("Sascacci", x, y);
			} else if (j == 1) {
				var aSize = (z / 5) + 'px';
				ctx.font = aSize + "'Offside'";
				ctx.fillText("Switch", x, y);
			} else if (j == 2) {
				var aSize = (z / 5) + 'px';
				ctx.font = aSize + "'Offside'";
				ctx.fillText("Static", x, y);
			} else if (j == 3) {
				var aSize = (z / 4) + 'px';
				ctx.font = aSize + "'Offside'";
				ctx.fillText("State", x, y);
			} else if (j == 4) {
				var aSize = (z / 3) + 'px';
				ctx.font = aSize + "'Offside'";
				ctx.fillText("Sync", x, y);
			} 
			ctx.fillStyle = 'rgba(200, 200, 200, 0.2)';
			ctx.beginPath();
			ctx.arc(x, y, z/2, 0, Math.PI*2, false);
			ctx.fill();
		}
	}
}

function drawFont(ave) {
	if (fontOn > 0) {
		var ranX = Math.floor(Math.random() * ave / 20);
		var ranY = Math.floor(Math.random() * ave / 20);

		var aSize = fontOn + 'px';
		ctx2.font = aSize + "'Times New Roman'";
		ctx2.fillStyle = 'rgba('+ Math.max(midiColor1, 255) +', '+ midiColor1 +', '+ midiColor2 +', '+ ave / 80 +')';
		var aText = String.fromCharCode(fontCode);
		ctx2.textAlign = "center";
		ctx2.textBaseline = "middle";
		ctx2.fillText(aText, circleX + ranX, circleY + ranY);
	}
}

function ledOn(x, y, a) {

	var cSize = 10;
	var aSize = 20;
	var aInterval = 35;
	var xOfst = 20;
	var yOfst = 20;

	if (x >= numWLed || x < 0) return;
	if (y >= numHLed || y < 0) return;
	if (a < 0.1) a = 0.1;

	ctx2.beginPath();
	ctx2.arc(x*aInterval+xOfst, y*aInterval+yOfst, 40, 0, Math.PI*2, false);
	var grad  = ctx2.createRadialGradient(x*aInterval+xOfst, y*aInterval+yOfst, cSize, x*aInterval+xOfst, y*aInterval+yOfst, aSize);

	grad.addColorStop(0,'rgba('+ midiColor2 +', '+ Math.max(midiColor1, midiColor2) +', 255, '+ a +')');
	grad.addColorStop(1,'rgba('+ midiColor2 +', '+ Math.max(midiColor1, midiColor2) +', 255, 0)');

	ctx2.fillStyle = grad;
	ctx2.fill();
}

var fontTable = null;

function initFontTable( count ) {
/*
	fontTable = new Array(count);
	for (var i = 0; i < count; i++){
		fontTable[i] = new Array(count);
	}
	for (var i = 0; i < count; i++){
		for (var j = 0; j < count; j++){
			fontTable[i][j] = Math.floor(Math.random() * 96 + 8592);
		}
	}
*/
}

function rafCallback(time) {
	window.webkitRequestAnimationFrame(rafCallback, canvas);

	var freqByteData = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(freqByteData); 

	var freqByteDataA = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteTimeDomainData(freqByteDataA);

	var space = Math.round(Math.max(1, BAR_WIDTH / 15));
	var SPACER_WIDTH = BAR_WIDTH;
	if (dist) {
		SPACER_WIDTH = BAR_WIDTH2;
	}
	if (SPACER_WIDTH <= 2) SPACER_WIDTH++;
	var numBars = Math.round(CANVAS_HEIGHT2 / SPACER_WIDTH);
	if (dist) {
		numBars = Math.round(CANVAS_WIDTH / SPACER_WIDTH);
	}

	var space2 = Math.round(Math.max(1, BAR_WIDTH2 / 15));
	var SPACER_WIDTH2 = BAR_WIDTH2;
	if (SPACER_WIDTH2 <= 2) SPACER_WIDTH2++;
	var numBars2 = Math.round(CANVAS_HEIGHT2 / SPACER_WIDTH2);
	if (dist) {
		numBars2 = Math.round(CANVAS_WIDTH2 / SPACER_WIDTH2);
	}

	var dataAve = getAverageVolume(freqByteData);
	if (dist) {
		count += (dataAve / 10);
		if (count > 500) {
			count = 0;
		}
	} else {
		count += Math.round(dataAve / 1000);
		if (count > freqByteDataA.length) {
			count = 0;
		}
	}

	ctx2.clearRect(0, 0, CANVAS_WIDTH2, CANVAS_HEIGHT2);
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
/*
	ctx2.fillStyle = 'white';
	ctx2.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
*/
	var ave = 0;
	for (var i = 0; i < analyser.frequencyBinCount; i++) {
		ave += freqByteData[i] * i;
	}
	ave /= 50000;
	
	ave = Math.floor(ave);
	
	if (dist == 1 && lineOn) {
		var barPosY = (CANVAS_HEIGHT - BAR_WIDTH) / 2;
		var barx = 0;
		var i = 0;
		while (barx < CANVAS_WIDTH) {
			var freqIdx = Math.floor(count + i);
			if (freqIdx >= analyser.frequencyBinCount) freqIdx -= analyser.frequencyBinCount;
			if (freqIdx < 0) freqIdx = 10;  
			var magnitude = freqByteData[freqIdx];

			var wavIdx = Math.floor(count + i);
			if (wavIdx >= freqByteDataA.length) wavIdx -= freqByteDataA.length
			if (wavIdx < 0) wavIdx = 10;  

			var magnitudeA = Math.abs(freqByteDataA[wavIdx]);
			if (i >= freqByteDataA.length) {
				magnitudeA = Math.abs(freqByteDataA[freqByteDataA.length - (i - freqByteDataA.length) - 1]);
			}
			magnitudeA -= ampOfst;
			if (magnitudeA < 0) magnitudeA = 0;
			var magAlpha = magnitudeA / (midiVol);
			ctx2.fillStyle = 'rgba('+ midiColor2 +', '+ Math.max(midiColor1, midiColor2) +', '+ Math.max(midiColor1,255 - magnitude + i) +', '+ magAlpha +')';
			var addW = Math.random() * 2;
			ctx2.fillRect(barx, barPosY, BAR_WIDTH2 + addW, BAR_WIDTH);
			barx += (SPACER_WIDTH + addW);
			i++;
		}
	} else if (dist == 0 && lineOn) {
		for (var i = 0; i <= numBars; i++) {
			var j = (i * space) - count;
			if (j >= freqByteDataA.length) j -= analyser.frequencyBinCount;
			if (j < 0) j += analyser.frequencyBinCount;
			var magnitudeA = Math.abs(freqByteDataA[j]);
			magnitudeA -= ampOfst;
			if (magnitudeA < 0) magnitudeA = 0;
			var magAlpha = magnitudeA / (midiVol);
			ctx2.fillStyle = 'rgba('+ Math.max(midiColor1, 150 - j) +', '+ Math.max(midiColor1, 200 - ave + j) +', '+ Math.max(midiColor1, ave) +', '+ magAlpha +')';
			ctx2.fillRect(0, i * SPACER_WIDTH, CANVAS_WIDTH2 / divide, BAR_WIDTH);
		}

		if (divide == 2) {
			for (var i = 0; i <= numBars2; i++) {
				var j = (i * space2) + 50 + count;
				if (j >= freqByteDataA.length) j -= analyser.frequencyBinCount;
				var magnitudeA = Math.abs(freqByteDataA[j]);
				magnitudeA -= ampOfst;
				if (magnitudeA < 0) magnitudeA = 0;
				var magAlpha = magnitudeA / (midiVol);

				ctx2.fillStyle = 'rgba('+ Math.max(midiColor2, 255 - freqByteData[j] + i) +', '+ Math.max(midiColor2, 200) +', '+ Math.max(midiColor2, freqByteData[j]) +', '+ magAlpha +')';
				ctx2.fillRect(CANVAS_WIDTH2 / 2, i * SPACER_WIDTH2 - SPACER_WIDTH2 / 2, CANVAS_WIDTH2 / 2, BAR_WIDTH2);
			}
		}
	} else if (dist == 2 && lineOn) {
		var RECT_SIZE = 100;
		var numBarX = Math.round(CANVAS_WIDTH / RECT_SIZE);
		var numBarY = Math.round(CANVAS_HEIGHT / RECT_SIZE);

		var k = 0;
		for (var j = 0; j < numBarY; j++) {
			for (var i = 0; i <= numBarX; i++) {
				var freqIdx = Math.floor(count + k);
				if (freqIdx >= analyser.frequencyBinCount) freqIdx -= analyser.frequencyBinCount;
				if (freqIdx < 0) freqIdx = 10;
				var magnitude = freqByteData[freqIdx];
				var idx = (k * numBarX) % freqByteDataA.length;
				var magnitudeA = Math.abs(freqByteDataA[idx]);
				magnitudeA -= ampOfst;
				if (magnitudeA < 0) magnitudeA = 0;
				var magAlpha = magnitudeA / (midiVol);
				
				if (BAR_WIDTH2 != 2) {
					ctx2.fillStyle = 'rgba('+ Math.floor(Math.random() * 255) +', '+ Math.floor(Math.random() * 255) +', '+ Math.floor(Math.random() * 255) +', '+ magAlpha +')';
				} else {
					ctx2.fillStyle = 'rgba('+ Math.max(midiColor2, 255 - magnitude + k) +', '+ Math.max(midiColor2, 200) +', '+ Math.max(midiColor1, magnitude) +', '+ magAlpha +')';
				}
				if (magAlpha > 0.5) {
					ctx2.fillRect(i * RECT_SIZE, RECT_SIZE*j, RECT_SIZE, RECT_SIZE);
				}
				k++;
			}
		}
	} else if (dist == 3 && lineOn) {
		var line_interval = BAR_WIDTH;
		var numBarX = Math.round(CANVAS_WIDTH / line_interval);
		var numBarY = Math.round(CANVAS_HEIGHT / line_interval);

		for (var i = 1; i < numBarX; i++) {
			var idx = (i * numBarX) % freqByteDataA.length;
			var magnitudeA = Math.abs(freqByteDataA[idx]);
			magnitudeA -= ampOfst;
			if (magnitudeA < 0) magnitudeA = 0;
			var magAlpha = magnitudeA / (midiVol);

			ctx2.fillStyle = 'rgba('+ midiColor2 +', '+ Math.max(midiColor1, midiColor2) +', '+ Math.max(midiColor1,255 - magnitudeA + i) +', '+ magAlpha +')';
			ctx2.fillRect(line_interval*i, 0, BAR_WIDTH2, CANVAS_HEIGHT);
		}

		for (var i = 1; i < numBarY; i++) {
			var idx = Math.round(Math.random() * freqByteDataA.length);
			var magnitudeA = Math.abs(freqByteDataA[idx]);
			magnitudeA -= ampOfst;
			if (magnitudeA < 0) magnitudeA = 0;
			var magAlpha = magnitudeA / (midiVol);
				
			ctx2.fillStyle = 'rgba('+ midiColor2 +', '+ Math.max(midiColor1, midiColor2) +', '+ Math.max(midiColor1,255 - magnitudeA + i) +', '+ magAlpha +')';
			ctx2.fillRect(0, line_interval*i, CANVAS_WIDTH, BAR_WIDTH2);
		}
	} else if (dist == 4 && lineOn) {
		var ranX = Math.floor(Math.random() * ave / 20);
		var ranY = Math.floor(Math.random() * ave / 20);

		var magnitude = dataAve * 2 + 100;
		var i = 0;
		
		while (magnitude > 0) { 
			var magnitudeA = Math.abs(freqByteDataA[i]);
			i++;
			magnitudeA -= ampOfst;
			if (magnitudeA < 0) magnitudeA = 0;
			var magAlpha = magnitudeA / (midiVol);

			ctx2.beginPath();
			ctx2.lineWidth = 2;
			ctx2.arc(circleX + ranX, circleY + ranY, magnitude, 0, Math.PI*2, false);
			if (BAR_WIDTH2 > 3) {
				ctx2.fillStyle = 'rgba('+ Math.max(midiColor2, 0) +', '+ Math.max(midiColor2, 200) +', '+ Math.max(midiColor1, 0) +', '+ magAlpha +')';
				ctx2.fill();
				break;
			}
			if (BAR_WIDTH2 == 3) {
				var grad  = ctx2.createRadialGradient(circleX + ranX, circleY + ranY,20,circleX + ranX, circleY + ranY,magnitude);
				grad.addColorStop(0,'rgba(200, 200, 200, 1)');
				grad.addColorStop(0.5,'rgba(200, 200, 200, '+ magAlpha +')');
				grad.addColorStop(1,'rgba(200, 200, 200, 0)');
				ctx2.fillStyle = grad;
				ctx2.fill();
				break;
			}
			ctx2.strokeStyle = 'rgba('+ Math.max(midiColor2, 0) +', '+ Math.max(midiColor2, 200) +', '+ Math.max(midiColor1, 0) +', '+ magAlpha +')';
			ctx2.stroke();
			magnitude -= 2;
		}
	} else if (dist == 5 && lineOn) {
		var totalw = CANVAS_WIDTH2;
		var barh = 300;
		var bary = Math.floor((CANVAS_HEIGHT2 - barh) / 2);
		var barx = 0;
		var barend = barx + totalw;
		var barw = 0;
		var i = 0;

		while (barx < barend) { 
			var magnitudeA = Math.abs(freqByteDataA[i]);
			magnitudeA -= ampOfst;
			//if (i >= freqByteDataA.length) magnitudeA = freqByteDataA[freqByteDataA.length - (i - freqByteDataA.length) - 1];
			i++;
			if (magnitudeA < 0) magnitudeA = 0;
			var magAlpha = magnitudeA / (midiVol);

			var r = Math.floor(Math.random() * 255);
			var g = Math.floor(Math.random() * 255);
			var b = Math.floor(Math.random() * 255);
			var a = Math.random();
			var interval = Math.floor(Math.random() * 5);
			barx += (barw + interval);
			barw = Math.floor(magnitudeA * 0.7) + 3;
			if (count % 5 == 0) {
				ctx2.fillStyle = 'rgba('+ r +', '+ g +', '+ b +', '+ magAlpha +')';
			} else {
				ctx2.fillStyle = 'rgba('+ r +', '+ r +', '+ r +', '+ magAlpha +')';
			}
			ctx2.fillRect(barx, bary, barw, barh);
			
			var aSize = barw + 'px';
			var number;
			if (BAR_WIDTH2 == 2) {
				ctx2.font = aSize + "'Offside'";
				number = Math.floor(Math.random() * 25 + 65);
			} else {
				ctx2.font = aSize + "'Press Start 2P'";
				number = Math.floor(Math.random() * 10 + 48);
			}
			var aText = "S3 SWEET SOUL SUITES";//String.fromCharCode(number);
			ctx2.textAlign = "left";
			ctx2.textBaseline = "bottom";
			var idx = Math.floor(s3idx % aText.length);
			ctx2.fillText(aText[idx], barx, bary);
			s3idx++;
		}
	} else if (dist == 6 && lineOn) {
		var line_interval = 20;
		var numBarX = Math.round(CANVAS_WIDTH / line_interval);
		var numBarY = Math.round(CANVAS_HEIGHT / line_interval);

		for (var i = 1; i < numBarX; i++) {
			if (i % 5 == 0) continue;
			for (var j = 1; j < numBarY; j++) {
				if (j % 5 == 0) continue;
				var idx = (i + j) % freqByteDataA.length;
				var magnitudeA = Math.abs(freqByteDataA[idx]);
				magnitudeA -= ampOfst;
				if (magnitudeA < 0) magnitudeA = 0;
				var magAlpha = magnitudeA / (midiVol);
				ctx2.fillStyle = 'rgba('+ midiColor2 +', '+ Math.max(midiColor1, midiColor2) +', '+ Math.max(midiColor1,255 - magnitudeA + i) +', '+ magAlpha +')';

				var aSize = magnitudeA / 10 ;
				if (BAR_WIDTH2 != 2) {
					ctx2.fillRect(line_interval*i, line_interval*j, aSize, aSize);
				} else {
					ctx2.beginPath();
					ctx2.arc(line_interval*i, line_interval*j, aSize, 0, Math.PI*2, false);
					ctx2.fill();
				}
			}
		}
	} else if (dist == 7 && lineOn) {
		var k = 0;
		for (var i = 0; i < numWLed; i++) {
			for (var j = 0; j < numHLed; j++) {
				var magnitudeA = Math.abs(freqByteDataA[k % freqByteDataA.length]);
				magnitudeA -= ampOfst;
				if (magnitudeA < 0) magnitudeA = 0;
				//magnitudeA /= (midiVol);
				k += 2;
				ledOn(i, j, 1 - magnitudeA);
			}
		}
	} else if (dist == 8 && lineOn) {
		var interval = 50;
		var numX = Math.round(CANVAS_WIDTH / interval);
		var numY = Math.round(CANVAS_HEIGHT / interval);

		var k = 0;
		for (var j = 0; j < numY; j++) {
			var ofst = 0;
			if (j % 2) ofst = -interval/2;
			for (var i = 0; i <= numX; i++) {
				var magnitudeA = Math.abs(freqByteDataA[k % freqByteDataA.length]);
				magnitudeA -= ampOfst;
				if (magnitudeA < 0) magnitudeA = 0;
				var magAlpha = magnitudeA / (midiVol);
				k += 2;
				ctx2.fillStyle = 'rgba('+ midiColor2 +', '+ Math.max(midiColor1, midiColor2) +', '+ Math.max(midiColor1,255 - magnitudeA + k) +', '+ magAlpha +')';
				ctx2.beginPath();
				ctx2.moveTo(interval*i+ofst, CANVAS_HEIGHT - interval*j);
				ctx2.lineTo(interval*(i+1)+ofst, CANVAS_HEIGHT - interval*j);
				ctx2.lineTo(interval*(2*i+1)/2+ofst, CANVAS_HEIGHT - interval*(j+1));
				ctx2.closePath();
				ctx2.fill();
			}
		}
	} else if (dist == 9 && lineOn) {
		var magnitude = dataAve * 2 + 50;
		ctx2.lineWidth = 2;
		ctx2.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
		for (var i = 0; i < 20; i++) {
			var magnitudeA = Math.abs(freqByteDataA[i]);
			magnitudeA -= ampOfst;
			if (magnitudeA < 0) magnitudeA = 0;
			var magAlpha = magnitudeA / (midiVol);

			var radW = magnitude;
			var radH = magnitude - 10*i;
			if (radH < 0) radH = 1;
			var x = 0;
			var y = 0;
			
			ctx2.rotate( i*dataAve * Math.PI / 180 );
			ctx2.beginPath();
			ctx2.bezierCurveTo(x, y - radH, x + radW , y - radH, x + radW, y);
			ctx2.bezierCurveTo(x + radW, y, x + radW, y + radH, x, y + radH);
			ctx2.bezierCurveTo(x, y + radH, x - radW, y + radH, x - radW, y);
			ctx2.bezierCurveTo(x - radW, y, x - radW, y - radH, x, y - radH);
			ctx2.strokeStyle = 'rgba('+ Math.max(midiColor2, 0) +', '+ Math.max(midiColor2, 200) +', '+ Math.max(midiColor1, 0) +', '+ magAlpha +')';
			ctx2.stroke();
			
			magnitude -= 4;
		}
		ctx2.setTransform(1, 0, 0, 1, 0, 0);
	}
	if (waveOn && BAR_WIDTH2 != 2) {
		var barPosY = CANVAS_HEIGHT / 2;
		ctx2.fillStyle = 'rgba('+ Math.max(midiColor1, 200) +', 200, '+ Math.max(midiColor2, 200) +', 1.0)';
		var barW = 2; // BAR_WIDTH2
		var space = 2;
		var numOfRect = CANVAS_WIDTH2 / (barW + space);
		for (var i = 0; i < numOfRect; i++) {
			var magnitudeA = freqByteDataA[i];
			if (i >= freqByteDataA.length) magnitudeA = freqByteDataA[freqByteDataA.length - (i - freqByteDataA.length) - 1];
			magnitudeA -= ampOfst;
			magnitudeA *= (30 / midiVol);
			if (magnitudeA >= 0) {
				ctx2.fillRect(i * (barW + space), barPosY - magnitudeA, barW, magnitudeA);
			} else {
				ctx2.fillRect(i * (barW + space), barPosY, barW, -magnitudeA);
			}
			
		}		
	} else if (waveOn && BAR_WIDTH2 == 2) {
		var barPosY = CANVAS_HEIGHT / 2;
		ctx2.beginPath();
		ctx2.lineJoin = "round";
		ctx2.lineWidth = 5;
		ctx2.strokeStyle = 'rgba('+ Math.max(midiColor1, 200) +', 200, '+ Math.max(midiColor2, 200) +', 1.0)';
		for (var i = 0; i < (CANVAS_WIDTH2 / 2); i++) {
			var magnitudeA = freqByteDataA[i];
			if (i >= freqByteDataA.length) magnitudeA = freqByteDataA[freqByteDataA.length - (i - freqByteDataA.length) - 1];
			magnitudeA -= ampOfst;
			magnitudeA *= (40 / midiVol);
			if (i == 0) {
				ctx2.moveTo(i * 2, barPosY + magnitudeA);
			} else {
				ctx2.lineTo(i * 2, barPosY + magnitudeA);
			}
		}
		ctx2.stroke();
	}

	if (midiVelo > 0) {
		var ranX = Math.floor(Math.random() * ave / 10);
		var ranY = Math.floor(Math.random() * ave / 10);

		var aSize = midiVelo*5 + 'px';
		ctx2.font = aSize + "'Times New Roman'";
		//ctx2.fillStyle = 'rgba('+ Math.max(midiColor1, 0) +', '+ Math.max(midiColor2, 200) +', '+ Math.max(midiColor1, 0) +', 0.9)';
		ctx2.fillStyle = 'rgba(255, 255, 255, 1)';
		var aText = String.fromCharCode(mojiCode);
		ctx2.textAlign = "center";
		ctx2.textBaseline = "middle";
		if (mojiCode == 7) {
			ctx2.fillText(text1[kanji], CANVAS_WIDTH2 / 2 + ranX, CANVAS_HEIGHT2 / 2 + ranY);
			ctx2.fillText(text1[kanji], CANVAS_WIDTH2 / 2 + ranX, CANVAS_HEIGHT2 / 2 + ranY);
		} else {
			ctx2.fillText(aText, CANVAS_WIDTH2 *1/ 5 + ranX, CANVAS_HEIGHT2 / 2 + ranY);
			ctx2.fillText(aText, CANVAS_WIDTH2 *4/ 5 + ranX, CANVAS_HEIGHT2 / 2 + ranY);
		}
	}
	
	drawFont(ave);
	
	drawClock();
	
	var volume = getAverageVolume(freqByteData);
	drawSnow(volume);

	if (ptOn) {
		ptdraw();
	}
	if (kenjiOn) {
		myParticleObject.update();
	}
	drawMousePos();
	
//	if (fftOn) {
		var fftBars = 512;
		var rainbow = new Rainbow();
		rainbow.setNumberRange(1, fftBars - 1);
		rainbow.setSpectrum('orange', 'yellow');
		for (var i = 0; i < fftBars; i++) {
			var magnitude = freqByteData[i];
			//var xlog = Math.LOG10E * Math.log(i*50)*200 - 200;
			var xlog = i * 5;
			ctx2.fillStyle = rainbow.colourAt(i);
			ctx2.fillRect(xlog, CANVAS_HEIGHT, 2, -magnitude);
		}
//	}
	drawMask();
	drawLeap();
}

function onLoad(e) {
	source = context.createMediaElementSource(audio);

	analyser.fftSize = 1024;
	analyser.connect(context.destination);

	img = new Image();
	img.src = "circle.png";

	myParticleObject = new ParticleObject(ctx2, ctx2);

	myParticleObject.init();

	myParticleObject.resetTimer();

	ptinit();
	initMask();
	initFontTable(100);

	rafCallback();
}


// Need window.onload to fire first. See crbug.com/112368.
window.addEventListener('load', onLoad, false);
})();

function getAverageVolume(array) {
        var values = 0;
        var average;
        var max = 0;
        var length = array.length;

        for (var i = 0; i < length; i++) {
            values += Math.abs(array[i]);
        }
        average = values / length;
        return average;
}

var midi=null;
var inputs=null;
var outputs=null;
var input=null;
var input2=null;
var input3=null;
var output=null;
var log=null;

function runTest() {
	if (!log) {
		log = document.getElementById("log");
		navigator.requestMIDIAccess( success, failure );
	}
}

function handleMIDIMessage1( ev ) {
}

function changeLine()
{
	if (dist == 1) {
		dist = 2;
		count = 0;
	} else if (dist == 2) {
		dist = 3;
		count = 0;
		BAR_WIDTH2 = 2;
		BAR_WIDTH = 40;
	} else if (dist == 3) {
		dist = 4;
		count = 0;
		BAR_WIDTH2 = 2;
		BAR_WIDTH = 2;
	}  else if (dist == 4) {
		dist = 5;
		count = 0;
		BAR_WIDTH2 = 2;
		BAR_WIDTH = 2;
	} else if (dist == 5) {
		dist = 6;
		count = 0;
		BAR_WIDTH2 = 2;
		BAR_WIDTH = 2;
	} else if (dist == 6) {
		dist = 7;
		count = 0;
		BAR_WIDTH2 = 2;
		BAR_WIDTH = 2;
	}  else if (dist == 7) {
		dist = 8;
		count = 0;
		BAR_WIDTH2 = 2;
		BAR_WIDTH = 2;
	}  else if (dist == 8) {
		dist = 9;
		count = 0;
		BAR_WIDTH2 = 2;
		BAR_WIDTH = 2;
	} else if (dist == 0) {
		dist = 1;
		BAR_WIDTH = 600;
		BAR_WIDTH2 = 2;
		count = 0;
	} else {
		ctx2.setTransform(1, 0, 0, 1, 0, 0);
		dist = 0;
		BAR_WIDTH = 2;
		BAR_WIDTH2 = 2;
		count = 0;
	}
}

function changePrm()
{
	if (dist == 1) {
		if (BAR_WIDTH2 > 2) {
			BAR_WIDTH2 = 2;
		} else {
			BAR_WIDTH2 = 100;
		}
	} else if (dist == 2) {
		if (BAR_WIDTH2 == 2) {
			BAR_WIDTH2 = 6;
		} else {
			BAR_WIDTH2 = 2;
		}
	} else if (dist == 3) {
		if (BAR_WIDTH2 == 2) {
			BAR_WIDTH2 = 6;
		} else if (BAR_WIDTH2 == 6){
			BAR_WIDTH2 = 38;
		} else {
			BAR_WIDTH2 = 2;
		}
	}  else if (dist == 4) {
		if (BAR_WIDTH2 == 2) {
			BAR_WIDTH2 = 3;
		} else if (BAR_WIDTH2 == 3){
			BAR_WIDTH2 = 38;
		} else {
			BAR_WIDTH2 = 2;
		}
	} else if (dist == 5) {
		if (BAR_WIDTH2 == 2) {
			BAR_WIDTH2 = 3;
		} else {
			BAR_WIDTH2 = 2;
		}
	} else if (dist == 0) {
		if (divide == 1) {
			if (BAR_WIDTH == 2) {
				BAR_WIDTH = 100;
			} else if (BAR_WIDTH == 100){
				BAR_WIDTH = 300;
			} else {
				BAR_WIDTH = 2;
				divide = 2;
			}
		} else {
			if (BAR_WIDTH == 2) {
				BAR_WIDTH = 100;
				BAR_WIDTH2 = 100;
			} else if (BAR_WIDTH == 100){
				BAR_WIDTH = 300;
				BAR_WIDTH2 = 300;
			} else {
				BAR_WIDTH = 2;
				BAR_WIDTH2 = 2;
				divide = 1;
			}
		}
	} else {
		if (BAR_WIDTH2 == 2) {
			BAR_WIDTH2 = 3;
		} else {
			BAR_WIDTH2 = 2;
		}
	}
}

function changeFontCtg()
{
	var rand = Math.random();
	
	switch (fontCtg) {
	default:
	case 0:
		if (rand > 0.5) {
			mojiCode = Math.floor(Math.random() * 21 + 9600);
		} else {
			mojiCode = Math.floor(Math.random() * 16 + 9632);
		}
		break;
	case 1:
		if (rand < 0.4) {
			mojiCode = 9774; // peace
		} else if (rand < 0.6) {
			mojiCode = 9760; // dokuro
		} else if (rand < 0.8) {
			mojiCode = 9762; // nukes
		} else {
			mojiCode = Math.floor(Math.random() * 4 + 9728); // 天気
		}
		break;
	case 2:
		// 矢印
		mojiCode = Math.floor(Math.random() * 96 + 8592);
		break;
	case 3:
		// 象形文字
		mojiCode = Math.floor(Math.random() * 1136 + 4640);
		break;
	case 4:
		// 矢印その他
		mojiCode = Math.floor(Math.random() * 2496 + 8592);
		break;
	case 5:
		// 点字
		mojiCode = Math.floor(Math.random() * 256 + 10240);
		break;
	case 6:
		if (rand > 0.5) {
			// リサイクル
			mojiCode = Math.floor(Math.random() * 12 + 9843);
		} else {
			// 丸数字
			mojiCode = Math.floor(Math.random() * 10 + 9461);
		}
		break;
	}
}

function handleMIDIMessage2( ev ) {
	// testing - just reflect.
	if (ev.data.length >= 2) {
		//log.innerText += "Message on input 2: 0x" + ev.data[0].toString(16) + " 0x" + ev.data[1].toString(16) + " 0x" + ev.data[2].toString(16) + "\n";
		var data = ev.data;
		var data16 = [ ev.data[0].toString(16), ev.data[1].toString(16), ev.data[2].toString(16)];

		switch(data[0] & 0xF0) {
		case 0xB0: // CC
			switch(data[1]) {
			case 0:
				cssRotY = Math.round(-data[2]*2) % 360;
				db_canvas[0].style.WebkitTransform = 'rotateX('+ cssRotX +'deg) rotateY('+ cssRotY +'deg) scale('+ cssSize +')';
				break;
			case 1:
				cssRotX = Math.round(data[2] * 90 / 127);
				db_canvas[0].style.WebkitTransform = 'rotateX('+ cssRotX +'deg) rotateY('+ cssRotY +'deg) scale('+ cssSize +')';
				break;
			case 2:
				midiColor1 = 255 - data[2]*2;
				break;
			case 3:
			case 13:
				midiColor2 = 255 - data[2]*2;
				mojiY -= (data[2] - 64);
				break;
			case 4:
				circleX = (data[2]) / 127 * CANVAS_WIDTH2;
				break;
			case 5:
				circleY = CANVAS_HEIGHT2 - (data[2] / 127 * CANVAS_HEIGHT2);
				break;
			case 12:
				BAR_WIDTH2 = 129 - data[2];
				break;
			case 92:
				if (data[2] == 0) {
					midiColor1 = 255;
					midiColor2 = 255;
				}
				break;
			case 93:
				cssRotY = Math.round(-data[2]*2) % 360;
				cssRotX = Math.round(data[2] * 90 / 127);
				db_canvas[0].style.WebkitTransform = 'rotateX('+ cssRotX +'deg) rotateY('+ cssRotY +'deg) scale('+ cssSize +')';
				break;
			}
			break;
		case 0x80:
			midiVelo = 0;
			midiOnOff = 0;
			fontOn = 0;
			break;
		case 0x90:
			if(data[2]==0) {
				midiVelo = 0;
				midiOnOff = 0;
				fontOn = 0;
			} else {
				switch(data[1]) { // Note No
				case 20:
					BAR_WIDTH2 = 2;
					break;
				case 21:
					BAR_WIDTH2 = 120;
					if (dist == 3) {
						BAR_WIDTH2 = 38;
					}	
					break;
				case 22:
					BAR_WIDTH2 = 600;
					if (dist) {
						BAR_WIDTH2 = 800;
					}
					if (dist == 3) {
						BAR_WIDTH2 = 100;
					}	
					break;
				case 23:
					if (lineOn == 1) {
						lineOn = 0;
					} else {
						lineOn = 1;
					}
					break;
				case 24:
					if (maskOn == 1) {
						maskOn = 0;
					} else {
						maskOn = 1;
					}
					break;
				case 25:
					if (divide == 1) {
						divide = 2;
					} else {
						divide = 1;
					}
					break;
				case 30:
					BAR_WIDTH = 2;
					if (dist) {
						BAR_WIDTH = 600;
					}
					if (dist == 3) {
						BAR_WIDTH = 40;
					}	
					break;
				case 31:
					BAR_WIDTH = 120;
					if (dist == 3) {
						BAR_WIDTH = 10;
					}	
					break;
				case 32:
					BAR_WIDTH = 600;
					if (dist) {
						BAR_WIDTH = 20;
					}
					break;
				case 33:
					fontOn = data[2];
					var rand = Math.random();
					if (rand < 0.4) {
						fontCode = 10084; // heart
					} else if (rand < 0.6) {
						fontCode = 9774; // peace
					} else if (rand < 0.8) {
						fontCode = 10026; // star
					} else {
						fontCode = 9776+11; // niconico
						//fontCode = 9888+4; // gender
					}
					//myParticleObject.formChangeFunc(data[2]);
					break;
				case 34:
					changeLine();
					break;
				case 35:
					midiVelo = data[2];
					midiOnOff = 1;
					midiCount = 10;
					mojiAlpha = 1.0;
					changeFontCtg();
					mojiX = Math.floor(Math.random() * 1000) + 150;
					mojiY = 450 + Math.floor(Math.random() * 400);
					break;
				case 40:
					// 漢字
					midiVelo = data[2];
					mojiCode = 7;
					kanji = Math.floor(Math.random() * text1.length);
					break;
				case 41:
					// peace
					midiVelo = data[2];
					mojiCode = 9774;
					break;
				case 42:
					// dokuro
					midiVelo = data[2];
					mojiCode = 9760;
					break;
				case 43:
					// nukes
					midiVelo = data[2];
					mojiCode = 9762;
					break;
				case 44:
					// 天気
					midiVelo = data[2];
					mojiCode = Math.floor(Math.random() * 4 + 9728);
					break;
				case 45:
					// 矢印
					midiVelo = data[2];
					mojiCode = Math.floor(Math.random() * 96 + 8592);
					break;
				case 46:
					// 象形文字
					midiVelo = data[2];
					mojiCode = Math.floor(Math.random() * 1136 + 4640);
					break;
				case 47:
					// 矢印その他
					midiVelo = data[2];
					mojiCode = Math.floor(Math.random() * 2496 + 8592);
					break;
				case 48:
					// 点字
					midiVelo = data[2];
					mojiCode = Math.floor(Math.random() * 256 + 10240);
					break;
				case 49:
					// リサイクル
					midiVelo = data[2];
					mojiCode = Math.floor(Math.random() * 12 + 9843);
					break;
				case 50:
					// 丸数字
					midiVelo = data[2];
					mojiCode = Math.floor(Math.random() * 10 + 9461);
					break;
				case 60:
				case 61:
				case 62:
				case 63:
				//case 64:
				//case 65:
					if (maskPart[data[1] - 60] == 1) {
						maskPart[data[1] - 60] = 0;
					} else {
						maskPart[data[1] - 60] = 1;
					}
					break;
				case 66:
				case 67:
				case 68:
				case 69:
				//case 70:
				//case 71:
					if (maskLine[data[1] - 66] == 1) {
						maskLine[data[1] - 66] = 0;
						maskProgress[data[1] - 66] = 0;
					} else {
						maskLine[data[1] - 66] = 1;
						maskProgress[data[1] - 66] = 1;
					}
					break;
				default:
					myParticleObject.formChangeFunc(data[2]);
					midiText = "えっ？";
					break;
				}
			}
			break;
		default:
			break;
		}
	}
}

function success( m ) {
	midi = m;

	inputs = midi.getInputs();
	if (inputs.length >= 2) {
		input1 = midi.getInput( inputs[0] );
		input1.onmessage = handleMIDIMessage1;
		input2 = midi.getInput( inputs[1] );
		input2.onmessage = handleMIDIMessage2;
		if (inputs.length >= 3) {
			input3 = midi.getInput( inputs[2] );
			input3.onmessage = handleMIDIMessage2;
		}
	}

	outputs = midi.getOutputs();
	if (outputs.length) {
		output = midi.getOutput( outputs[0] );
		output.send( [0xb0, 0x00, 0x7f] );	// If the first device is a Novation Launchpad, this will light it up!
	}
}

function failure( error ) {
	alert( "Failed to initialize MIDI - " + ((error.code==1) ? "permission denied" : ("error code " + error.code)) );
}

var press1 = 0;
var press2 = 0;
var press3 = 0;
var press4 = 0;

function move_sub() {
	mouseX = event.x;
	mouseY = event.y;

	if (press1 && pressedShift) {
		if (event.x > 0) maskX1[maskFocus] = event.x;
		if (event.y > 0) maskY1[maskFocus] = event.y;
	}
	//if (press2 && pressedShift) {
	if (press2 && pressedShift) {
		if (event.x > 0) maskX2[maskFocus] = event.x;
		if (event.y > 0) maskY2[maskFocus] = event.y;
	}
	if (press3 && pressedShift) {
		if (event.x > 0) maskX3[maskFocus] = event.x;
		if (event.y > 0) maskY3[maskFocus] = event.y;
	}
	if (press4 && pressedShift) {
		if (event.x > 0) maskX4[maskFocus] = event.x;
		if (event.y > 0) maskY4[maskFocus] = event.y;
	}
	
}


function Process(ev) { }

var ptCOUNT;
var ptNUM;

var lineNums;
var friction;

var position_x;
var position_y;

var velocity_x;
var velocity_y;

var friction_x;
var friction_y;

var ease_x;
var ease_y;

function ptinit() {
	ptCOUNT = 30;
	ptNUM = 40;

	friction = .8;

	position_x = new Array(ptCOUNT);
	for (var i = 0; i < ptCOUNT; i++){
		position_x[i] = new Array(ptNUM);
	}
	position_y = new Array(ptCOUNT);
	for (var i = 0; i < ptCOUNT; i++){
		position_y[i] = new Array(ptNUM);
	}

	velocity_x = new Array(ptNUM);
	velocity_y = new Array(ptNUM);

	friction_x = new Array(ptNUM);
	friction_y = new Array(ptNUM);

	ease_x = new Array(ptNUM);
	ease_y = new Array(ptNUM);

	for (var i = 0; i<ptNUM; i++){
		for (var j = 0; j<ptCOUNT; j++){
			position_x[j][i] = 0;
			position_y[j][i] = 0;
		}

		velocity_x[i] = 0;
		velocity_y[i] = 0;

		friction_x[i] = Math.random() * 30 + 10;
		friction_y[i] = Math.random() * 30 + 10;

		ease_x[i] = Math.random() * 8 + 2;
		ease_y[i] = Math.random() * 8 + 2;
	}
}

function ptupdate()
{
	var mouseX = (255 - midiColor1) * (CANVAS_WIDTH2 - 300) / 255 + 150;
	var mouseY = midiColor2 * (CANVAS_HEIGHT2 - 300) / 255 + 150;

	for (var i = 0; i<ptNUM; i++){
		for (var j = 0; j<ptCOUNT - 1; j++){
			position_x[j][i] = position_x[j + 1][i];
			position_y[j][i] = position_y[j + 1][i];
		}

		position_x[ptCOUNT - 1][i] += velocity_x[i];
		position_y[ptCOUNT - 1][i] += velocity_y[i];

		velocity_x[i] += (((mouseX - position_x[ptCOUNT - 1][i]) * ease_x[i]) - velocity_x[i]) / friction_x[i];
		velocity_y[i] += (((mouseY - position_y[ptCOUNT - 1][i]) * ease_y[i]) - velocity_y[i]) / friction_y[i];

		velocity_x[i] *= friction;
		velocity_y[i] *= friction;
	}
}

function ptdraw()
{
	ptupdate();
	ctx2.lineWidth = 1;

	for (var i = 0; i<ptNUM-1; i++){
		for (var j = 0; j<ptCOUNT -2 ; j++){
			var colAlpha  = ((j + 1) / 15);
			ctx2.beginPath();
			ctx2.lineJoin = "round";
			ctx2.strokeStyle = 'rgba(255, 255, 255, '+ colAlpha +')';
			ctx2.moveTo(position_x[j][i], position_y[j][i]);
			ctx2.lineTo(position_x[j+1][i], position_y[j+1][i]);
			ctx2.stroke();
		}
	}
}

var cssRotX = 0;
var cssRotY = 0;
var cssSize = 1.0;

window.addEventListener('keydown', function(e) {

	debugNo = e.keyCode;
	mouseX = -1;
	mouseY = -1;

	if (e.keyCode == 32) { // space
		midiVelo = 100;
		midiOnOff = 1;
		midiCount = 10;
		mojiAlpha = 1.0;
		if (Math.random() > 0.5) {
			mojiCode = Math.floor(Math.random() * 21 + 9600);
		} else {
			mojiCode = Math.floor(Math.random() * 16 + 9632);
		}
		mojiX = Math.floor(Math.random() * 1000) + 150;
		mojiY = 450 + Math.floor(Math.random() * 400);
	}
	if (e.keyCode == 16) { // [Shift]
		pressedShift = 1;
	}

	if (e.keyCode == 49) { // [1]
		press1 = 1;
		if (pressedShift == 0) maskFocus = 0;
	}
	if (e.keyCode == 50 || e.keyCode == 222) { // [2]
		press2 = 1;
		if (pressedShift == 0) maskFocus = 1;
	}
	if (e.keyCode == 51) { // [3]
		press3 = 1;
		if (pressedShift == 0) maskFocus = 2;
	}
	if (e.keyCode == 52) { // [4]
		press4 = 1;
		if (pressedShift == 0) maskFocus = 3;
	}

	if (e.keyCode == 65) { // [A]
		if (pressedShift) {
			if (ampOfst > 10) ampOfst -= 10;
		} else {
			ampOfst += 10;
		}
	}
	if (e.keyCode == 66) { // [B]
	}
	if (e.keyCode == 67) { // [C]
		colorbarOn = 1-colorbarOn;
	}
	if (e.keyCode == 68) { // [D]
		if (pressedShift) {
			midiVol += 10;
		} else {
			if (midiVol > 10) midiVol -= 10;
		}
	}
	if (e.keyCode == 70) { // [F]
		fftOn = 1-fftOn;
	}
	if (e.keyCode == 71) { // [G]
		fontCtg++;
		if (fontCtg > 6) fontCtg = 0;
	}
	if (e.keyCode == 75) { // [K]
		if (kenjiOn == 0) {
			myParticleObject.resetTimer();
			kenjiOn = 1;
		} else {
			kenjiOn = 0;
		}
//		myParticleObject.transfer();
	}
	if (e.keyCode == 76) { // [L]
		lineOn = 1- lineOn;
	}
	if (e.keyCode == 77) { // [M]
		if (maskOn == 1) {
			maskOn = 0;
		} else {
			maskProgress[0] = 0;
			maskProgress[1] = 0;
			maskOn = 1;
		}
	}
	if (e.keyCode == 78) { // [N]
		leapOn = 1-leapOn;
	}
	if (e.keyCode == 79) { // [O]
		if (pressedShift) {
			changePrm();
		} else {
			changeLine();
		}
	}
	if (e.keyCode == 80) { // [P]
		/*
		if (!audio.paused) {
			audio.pause();
		} else {
			audio.play();
		}
		*/
		runTest();
	}
	if (e.keyCode == 82) { // [R]
		cssRotX = 0;
		cssRotY = 0;
		cssSize = 1.0;
		db_canvas[0].style.WebkitTransform = 'rotateX(0deg) rotateY(0deg) scale(1.0)';
		db_canvas[1].style.WebkitTransform = 'rotateX(0deg) rotateY(0deg) scale(1.0)';
	}
	if (e.keyCode == 83) { // [S]
		if (pressedShift) {
			cssSize += 0.1;
		} else {
			if (cssSize > 0.1) cssSize -= 0.1;
		}
		db_canvas[0].style.WebkitTransform = 'rotateX('+ cssRotX +'deg) rotateY('+ cssRotY +'deg) scale('+ cssSize +')';
		db_canvas[1].style.WebkitTransform = 'rotateX('+ cssRotX +'deg) rotateY('+ cssRotY +'deg) scale('+ cssSize +')';
	}
	if (e.keyCode == 84) { // [T]
		clockOn = 1- clockOn;
	}
	if (e.keyCode == 85) { // [U]
		if (menuOn == 0) {
			menuOn = 1;
			document.getElementById("menu").style.visibility="visible";
		} else {
			menuOn = 0;
			document.getElementById("menu").style.visibility="hidden";
		}
	}
	if (e.keyCode == 87) { // [W]
		waveOn = 1-waveOn;
	}
	if (e.keyCode == 88) { // [X]
		if (pressedShift) {
			if (cssRotX < 350) cssRotX += 5
		} else {
			if (cssRotX > -350) cssRotX -= 5;
		}
		db_canvas[0].style.WebkitTransform = 'rotateX('+ cssRotX +'deg) rotateY('+ cssRotY +'deg) scale('+ cssSize +')';
		db_canvas[1].style.WebkitTransform = 'rotateX('+ cssRotX +'deg) rotateY('+ cssRotY +'deg) scale('+ cssSize +')';
	}
	if (e.keyCode == 89) { // [Y]
		if (pressedShift) {
			if (cssRotY < 350) cssRotY += 5;
		} else {
			if (cssRotY > -350) cssRotY -= 5;
		}
		db_canvas[0].style.WebkitTransform = 'rotateX('+ cssRotX +'deg) rotateY('+ cssRotY +'deg) scale('+ cssSize +')';
		db_canvas[1].style.WebkitTransform = 'rotateX('+ cssRotX +'deg) rotateY('+ cssRotY +'deg) scale('+ cssSize +')';
	}
}, false);

window.addEventListener('keyup', function(e) {
	if (e.keyCode == 32) { // space
		midiVelo = 0;
		midiOnOff = 0;
	}
	if (e.keyCode == 16) { // [Shift]
		pressedShift = 0;
	}
	if (e.keyCode == 49) { // [1]
		press1 = 0;
	}
	if (e.keyCode == 50 || e.keyCode == 222) { // [2]
		press2 = 0;
	}
	if (e.keyCode == 51) { // [3]
		press3 = 0;
	}
	if (e.keyCode == 52) { // [4]
		press4 = 0;
	}
}, false);


