window.home = {};

window.home.frameRate = 30;
window.home.Monkey = function(x, y, speed) {
	this.leftArmRotation = 0;
	this.leftArmDirection = 1;
	this.rightArmRotation = 0;
	this.rightArmDirection = -1;
	this.bob = Math.random() * this.maxBob * 2 - this.maxBob;
	if (this.bob > 0) {
		this.bobDirection = 1;
	} else {
		this.bobDirection = -1;
	}
	this.offset = {x:x, y:y};
	this.speed = speed;
}
window.home.Monkey.prototype.maxBob = 5;
window.home.Monkey.prototype.bobSpeed = 0.05;
window.home.Monkey.prototype.head = new Image();
window.home.Monkey.prototype.head.src = 'images/monkey/head.png' 
window.home.Monkey.prototype.leftArm = new Image();
window.home.Monkey.prototype.leftArm.src = 'images/monkey/left arm.png' 
window.home.Monkey.prototype.leftArmOffset = {x:-14, y:9};
window.home.Monkey.prototype.rightArm = new Image();
window.home.Monkey.prototype.rightArm.src = 'images/monkey/right arm.png' 
window.home.Monkey.prototype.rightArmOffset = {x:27, y:22};
window.home.Monkey.prototype.draw = function() {
	if (this.bob > this.maxBob || this.bob < -this.maxBob) {
		this.bobDirection *= -1;
	}
	this.bob += this.bobSpeed * this.bobDirection * this.speed;
	this.offset.y += this.bob;
    window.home.context.drawImage(this.head, this.offset.x, this.offset.y);
	this.drawLeftArm();
	this.drawRightArm();
	this.offset.y -= this.bob;
	this.drawWater();
}
window.home.Monkey.prototype.drawLeftArm = function() {
	if (this.leftArmRotation < 0 || this.leftArmRotation > 90) {
		this.leftArmDirection *= -1;
	}
	this.leftArmRotation += this.speed * this.leftArmDirection;
	window.home.context.save();
	window.home.context.translate(this.offset.x + this.leftArmOffset.x + this.leftArm.width, this.offset.y + this.leftArmOffset.y + this.leftArm.height);
	window.home.context.rotate(this.leftArmRotation * Math.PI / 180);
    window.home.context.drawImage(this.leftArm, -this.leftArm.width, -this.leftArm.height, this.leftArm.width, this.leftArm.height);
	window.home.context.restore();
}
window.home.Monkey.prototype.drawRightArm = function() {
	if (this.rightArmRotation < -90 || this.rightArmRotation > 0) {
		this.rightArmDirection *= -1;
	}
	this.rightArmRotation += this.speed * this.rightArmDirection;
	window.home.context.save();
	window.home.context.translate(this.offset.x + this.rightArmOffset.x, this.offset.y + this.rightArmOffset.y + this.rightArm.height);
	window.home.context.rotate(this.rightArmRotation * Math.PI / 180);
    window.home.context.drawImage(this.rightArm, 0, -this.rightArm.height, this.rightArm.width, this.rightArm.height);
	window.home.context.restore();
}
window.home.Monkey.prototype.drawWater = function() {
	window.home.context.fillRect(this.offset.x - 20, this.offset.y + this.head.height - this.maxBob, 100, this.maxBob * 2);
}

window.home.monkeys = [
    new window.home.Monkey(175, 200, 3),
	new window.home.Monkey(325, 200, 6),
	new window.home.Monkey(475, 200, 4)
];

window.home.load = function() {
	window.home.canvas = document.createElement('canvas');
	window.home.context = window.home.canvas.getContext('2d');
	window.home.iphone = new Image();
	window.home.iphone.onload = function() {
	    window.home.canvas.width = window.home.iphone.width;
	    window.home.canvas.height = window.home.iphone.height;
	}
	window.home.iphone.src = 'images/iphone.png'
	document.getElementById('body').appendChild(window.home.canvas);
	setInterval(function(){
		window.home.drawBackground();
		window.home.drawMonkeys();
	}, 30);
}

window.home.drawBackground = function() {
	var gradient = window.home.context.createLinearGradient(0, 0, 0, window.home.canvas.height);
	gradient.addColorStop(0.0,'rgb(80, 80, 200)');
	gradient.addColorStop(0.25,'rgb(55, 80, 200)');
	gradient.addColorStop(0.65,'rgb(55, 125, 255)');
	gradient.addColorStop(1.0,'rgb(25, 55, 150)');
	window.home.context.fillStyle = gradient;
	window.home.context.fillRect(50, 25, window.home.canvas.width - 100, window.home.canvas.height - 50);
    window.home.context.drawImage(window.home.iphone, 0, 0);
}

window.home.drawMonkeys = function() {
	for (var i = 0; i < window.home.monkeys.length; i++) {
		window.home.monkeys[i].draw();
	}
}
