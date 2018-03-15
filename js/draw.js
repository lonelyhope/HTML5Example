//在画布上绘制图形
function draw() {
	var canvas = document.getElementById('drawInMe');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.moveTo(120.0,32.0);
		ctx.bezierCurveTo(120.0,36.4,116.4,40.0,112.0,40.0);
		ctx.lineTo(8.0,40.0);
		ctx.bezierCurveTo(3.6,40.0,0.0,36.4,0.0,32.0);
		ctx.lineTo(112.0,0.0);
		ctx.bezierCurveTo(116.4,0.0,120.0,3.6,120.0,8.0);
		ctx.lineTo(120.0,32.0);
		ctx.closePath();
		ctx.fill();
		ctx.lineWidth = 2.0;
		ctx.strokeStyle = "rgb(255,255,255)";
		ctx.stroke();
	}
}

// 画对角线
function drawDiagonal() {
    var canvas = document.getElementById('diagonal');
    var context = canvas.getContext('2d');
    
    // 保存当前绘图状态
    context.save();
    
    // 向右下方移动上下文
    context.translate(70, 140);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(70, -70);
    context.stroke();
    
    // 恢复原有绘图状态
    context.restore();
}

// 处理树干填充
function gradient(context) {
	// 创建一条颜色渐变的水平线，并以此填充树干
	var trunkGradient = context.createLinearGradient(-10, 100, 10, 100);
	trunkGradient.addColorStop(0, '#663300');
	trunkGradient.addColorStop(0.4, '#996600');
	trunkGradient.addColorStop(1, '#552200');
	context.fillStyle = trunkGradient;
	context.fillRect(-10, 100, 20, 50);

	// 创建阴影， 应用竖直渐变
	var canopyShadow = context.createLinearGradient(-10, 100, -10, 150);
	// 放射性渐变：createRadialGradient(x0, y0, r0, x1, y1, r1)
	canopyShadow.addColorStop(0, 'rgba(0, 0, 0, 0.5');
	canopyShadow.addColorStop(0.25, 'rgba(0, 0, 0, 0.0)');
	context.fillStyle = canopyShadow;
	context.fillRect(-10, 100, 20, 50);
}

// 画树
function createCanopyPath(context) {
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(-30, 50);
	context.lineTo(-10, 50);
	context.lineTo(-50, 100);
	context.lineTo(0, 100);
	
	context.lineTo(50, 100);
	context.lineTo(10, 50);
	context.lineTo(30, 50);
	context.closePath();

	context.lineWidth = 4;
	linejoin = ['bevel', 'round', 'miter']
	context.lineJoin = linejoin[2];
	context.strokeStyle = '#663300';
	context.lineCap = 'butt';
	
	// 对当前图形中所有闭合点内部的像素点进行填充
	context.fillStyle = '#339900';
	context.fill();
	context.stroke();
	
	// context.fillStyle = '#663300'
	// context.fillRect(-10, 100, 20, 50);
	// context.drawImage(bark, -10, 100, 20, 50);
	gradient(context);
}

// 画小路
function drawContour(context) {
	context.moveTo(-10, 0);
	// 第一组代表控制点；第二组指曲线终点
	// bezierCurveTo arcTo arc
	context.quadraticCurveTo(250, -30, 505, -100);

	// context.strokeStyle = '#663300';
	// 直接令 strokeStyle 为 图片
	context.strokeStyle = context.createPattern(sand, 'repeat');
	context.lineWidth = 20;
}

function draw(context, fun, pos, scaling = {x:1, y:1}, rotates = 0) {
	context.save();
	context.translate(pos.x, pos.y);
	context.scale(scaling.x, scaling.y);
	// 旋转以弧度为单位
	context.rotate(rotates);
	fun(context);
	context.stroke();
	context.restore();
}


// 画图
function drawTrails() {
	var trail = document.getElementById('trail');
	var context = trail.getContext('2d');
	
	var pos = {
		x: 0,
		y: 0
	}

	pos.x = 0;
	pos.y = 280;
	draw(context, drawContour, pos);

	positons = [{x: 50, y: 110}, {x: 180, y: 100}, {x: 300, y: 100}];
	scalings = [{x: 1, y: 1}, {x: 0.8, y: 0.8}, {x: 0.7, y: 0.7}];
	// 如果以下代码放在drawContour前面，则width=20，why?
	for (index in positons) {
		draw(context, createCanopyPath, positons[index], scalings[index]);
	}

	
	// context.beginPath();
	// context.moveTo(0, 0);
	// context.lineTo(50, 50);
	// context.lineTo(50, 0);
	// context.closePath();
	// context.stroke();
}

// load image
var sand = new Image();
sand.src = './images/sand.jpg'; // path?
sand.onload = function() {
	// 要在图片加载完后才可处理canvas
	drawTrails();
}

// window.addEventListener('load', drawTrails, false);

function createHotGraph() {
	// 初始化
	var hotGraph = document.getElementById('hotGraph');
	var context = hotGraph.getContext('2d');
	

}