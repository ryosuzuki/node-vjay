var Point, opt, points, sketch, stats;

stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

sketch = Sketch.create();

points = [];

opt = {
  count: 100,
  followMouse: true,
  range: 40,
  speed: .2,
  radiusMin: 30,
  radiusMax: 40,
  fill: true,
  lineWidth: 1,
  stroke: true,
  hue: 120,
  hueCycle: true
};

Point = function() {
  return this.init();
};

Point.prototype.init = function() {
  var newX, newY;
  newX = opt.followMouse ? sketch.mouse.x : sketch.width / 2;
  newY = opt.followMouse ? sketch.mouse.y : sketch.height / 2;
  this.anchorX = newX;
  this.anchorY = newY;
  this.x = newX;
  this.y = newY;
  this.vx = 0;
  this.vy = 0;
  this.radius = random(opt.radiusMin, opt.radiusMax);
  this.hue = opt.hue;
  return this.setTarget(1);
};

Point.prototype.setTarget = function(i) {
  this.targetX = this.anchorX + random(-opt.range, opt.range) * (i / points.length);
  return this.targetY = this.anchorY + random(-opt.range, opt.range) * (i / points.length);
};

Point.prototype.update = function(i) {
  var angle, ax, ay, dist, dx, dy;
  dx = this.targetX - this.x;
  dy = this.targetY - this.y;
  dist = sqrt(dx * dx + dy * dy);
  angle = atan2(dy, dx);
  ax = cos(angle) * opt.speed * (i / points.length);
  ay = sin(angle) * opt.speed * (i / points.length);
  if (abs(dist) <= opt.speed) {
    return this.setTarget(i);
  } else {
    this.vx += ax;
    this.vy += ay;
    this.x += this.vx * (sketch.dt / 16);
    return this.y += this.vy * (sketch.dt / 16);
  }
};

Point.prototype.render = function(i) {
  var newLineWidth, newRadius;
  if (opt.fill) {
    newRadius = .1 + this.radius * (i / points.length);
    sketch.beginPath();
    sketch.arc(this.x, this.y, newRadius, 0, TWO_PI);
    sketch.closePath();
    sketch.fillStyle = 'hsla(' + this.hue + ', 80%, 30%, ' + (i / points.length) + ')';
    sketch.fill();
  }
  if (opt.stroke) {
    newRadius = .1 + this.radius * (i / points.length);
    newLineWidth = opt.lineWidth * (i / points.length);
    sketch.beginPath();
    sketch.arc(this.x, this.y, newRadius + (newLineWidth / 2), 0, TWO_PI);
    sketch.closePath();
    sketch.lineWidth = newLineWidth;
    sketch.strokeStyle = 'hsla(' + this.hue + ', 80%, 65%, ' + (i / points.length) + ')';
    return sketch.stroke();
  }
};

sketch.setup = function() {
  var customContainer, gui, guiMovement, guiStyle;
  sketch.mouse.x = sketch.width / 2;
  sketch.mouse.y = sketch.height / 2;
  gui = new dat.GUI({
    autoPlace: false
  });
  gui.add(opt, 'count').min(10).max(300).step(1).name('Circle Amount');
  gui.add(opt, 'followMouse').name('Follow Mouse');
  guiMovement = gui.addFolder('Movement');
  guiMovement.add(opt, 'range').min(0).max(300).step(1).name('Range');
  guiMovement.add(opt, 'speed').min(0).max(2).step(.01).name('Speed');
  guiMovement.open();
  guiStyle = gui.addFolder('Style');
  guiStyle.add(opt, 'radiusMin').min(1).max(200).step(1).name('Minimum Radius');
  guiStyle.add(opt, 'radiusMax').min(1).max(200).step(1).name('Maximum Radius');
  guiStyle.add(opt, 'lineWidth').min(1).max(30).step(1).name('Stroke Width');
  guiStyle.add(opt, 'stroke').name('Stroke');
  guiStyle.add(opt, 'fill').name('Fill');
  guiStyle.add(opt, 'hue').min(0).max(360).step(1).name('Hue').listen();
  guiStyle.add(opt, 'hueCycle').name('Cycle Hue');
  guiStyle.open();
  customContainer = document.getElementById('gui');
  return customContainer.appendChild(gui.domElement);
};

sketch.update = function() {
  var i, point, _results;
  if (opt.hueCycle) {
    if (opt.hue < 360) {
      opt.hue += .5;
    } else {
      opt.hue = 0;
    }
  }
  if (points.length <= opt.count) {
    points.push(new Point());
  } else {
    points.length = opt.count;
    point = points.shift();
    point.init();
    points.push(point);
  }
  i = points.length;
  _results = [];
  while (i--) {
    _results.push(points[i].update(i));
  }
  return _results;
};

sketch.draw = function() {
  var i;
  stats.begin();
  sketch.globalCompositeOperation = 'lighter';
  i = points.length;
  while (i--) {
    points[i].render(i);
  }
  return stats.end();
};
