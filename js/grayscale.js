//覆盖原图生成画布，并在画布上绘制原图的灰度图

function converToGS(img){
	if (!Modernizr.canvas) return;
	//存储原始的彩色版
	img.color = img.src;
	alert(img.color);
	//创建灰度版
	img.grayscale = createGSCanvas(img);
	alert(img.grayscale);
	//在 mouseover/out 时间发生时切换图片
	img.onmouseover = function() {
		this.src = this.color;
	}
	img.onmouseout = function() {
		this.src = this.grayscale;
	}
	img.onmouseout();
}

function createGSCanvas(img) {
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;

	var ctx = canvas.getContext("2d");
	ctx.drawImage(img,0,0);

	//getImageData 只能操作与脚本位于用一个域中的图片
	var c = ctx.getImageData(0,0,img.width,img.height);
	for (i = 0; i < c.height; i++) {
		for (j = 0; j < c.width; j++) {
			var x = (i * 4) * c.width + (j * 4);
			var r = c.data[x];
			var g = c.data[x + 1];
			var b = c.data[x + 2];
			c.data[x] = c.data[x + 1] = c.data[x + 2] = (r + g + b) / 3;
		}
	}

	ctx.putImageData(c,0,0,0,0,c.width,c.height);
	return canvas.toDataURL();
}

window.onload = function() {
	converToGS(document.getElementById('sakura'));
}
