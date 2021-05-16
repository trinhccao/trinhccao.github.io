'use strict';
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const btnStart = document.getElementById('start');
const btnRestart = document.getElementById('restart');
const fx = new Audio('audio/collision.mp3');
const bgm = new Audio('audio/bgm.mp3');
var images = {}, backgrounds = [], car = {}, enemies = [], score = 0;
var enemiesSprite = [0, 262, 547];

function loadImage(url) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (err) => {
      alert('Lỗi!\nTải các file cần thiết thất bại.');
      reject(err);
    };
    image.src = url;
  });
}

class Car {
  constructor(image, x, y, width, height) {
    this.context = canvas.getContext('2d');
    this.image = image;
    this.dx = x;
    this.dy = y;
    this.width = width;
    this.height = height;
    this._moveLeft = false;
    this._moveRight = false;
    this.speedX = 8;
    this.speedY = 10;
  }
  moveLeft() {
    this._moveLeft = true;
  }
  moveRight() {
    this._moveRight = true;
  }
  render() {
    this.context.drawImage(this.image, this.dx, this.dy,
      this.width, this.height);
  }
  update() {
    if (this._moveRight) {
      this.dx += this.speedX;
      } else if (this._moveLeft) {
          this.dx -= this.speedX;
        }
    if (this.dx < 30) this.dx =30;
    if (this.dx > canvas.width - (this.width + 33))
      this.dx = canvas.width - (this.width + 33);
  }
}

class Background extends Car {
  constructor(image, x, y, width, height) {
    super(image, x, y, width, height);
  }
  update() {
    this.dy += car.speedY;
    if (this.dy === 0) {
      backgrounds.splice(0, 1);
      backgrounds.push(new Background(images.background,
        0, -images.background.height, canvas.width, canvas.height));
    } else if (this.dy > 0 && this.dy < this.speedY) {
      backgrounds.splice(0, 1);
      backgrounds.push(new Background(images.background,
        0, -images.background.height + this.dy, canvas.width, canvas.height));
    }
  }
}

class Enemy extends Car {
  constructor(image, sx, sy, swidth, sheight, x, y, width, height) {
    super(image, x, y, width, height);
    this.sx = sx;
    this.sy = sy;
    this.swidth = swidth;
    this.sheight = sheight;
    this.speed = 2;
  }
  render() {
    this.context.drawImage(this.image, this.sx, this.sy,
      this.swidth, this.sheight, this.dx, this.dy, this.width, this.height);
  }
  update() {
    this.dy += this.speed + this.speedY;
    if (this.dy >= canvas.height) {
      score += 10;
      enemies.splice(enemies.indexOf(this), 1);
    }
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const responseEnemies = (() => {
  var count = 0;
  return function() {
    count++;
    if (count === 120) {
      let spriteY = enemiesSprite[randomInt(0, enemiesSprite.length - 1)];
      let side = randomInt(0, 1);
      let dy = randomInt(263, 406);
      if (side === 0) {
        enemies.push(new Enemy(images.enemies, 4, spriteY,
          118, 240, 30, -dy, 100, 203));
      } else {
        enemies.push(new Enemy(images.enemies, 4, spriteY,
          118, 240, 168, -dy, 100, 203));
      }
      count = 0;
    }
  };
})();

function detectCollision() {
  let collisionX = false;
  let collisionY = false;
  for (let i = 0; i < enemies.length; i++) {
    if (car.dx + car.width - 1 > enemies[i].dx &&
      car.dx + 2 < enemies[i].dx + enemies[i].width) collisionX = true;
    if (car.dy <= enemies[i].dy + enemies[i].height &&
      car.dy + car.height >= enemies[i].dy) collisionY = true;
    if (collisionX && collisionY) {
      return true;
    } else {
      return false;
    }
  }
}

function startGame() {
  btnStart.style = 'display: none';
  btnRestart.style = 'display: none';
  bgm.loop = true;
  bgm.play();
  backgrounds.push(new Background(images.background, 0, 0, canvas.width,
    canvas.height));
  backgrounds.push(new Background(images.background, 0, -canvas.height,
    canvas.width, canvas.height));
  car = new Car(images.car, 30, canvas.height - 250, 100, 200);
  updateGame();
}

function restartGame() {
  backgrounds = [], car = {}, enemies = [], score = 0;
  startGame();
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < backgrounds.length; i++) {
    backgrounds[i].render();
  }
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].render();
  }
  car.render();
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = 'red';
  ctx.fillText('Điểm: ' + score, 10, 30);
  if (detectCollision()) {
    btnRestart.style = 'display: block';
    bgm.pause();
    bgm.currentTime = 0;
    fx.currentTime = 0;
    fx.play();
    return;
  }
  for (let i = 0; i < backgrounds.length; i++) {
    backgrounds[i].update();
  }
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
  }
  car.update();
  responseEnemies();
  window.requestAnimationFrame(updateGame);
}

window.addEventListener('keydown', (evt) => {
  switch(evt.keyCode || evt.which) {
    case 37: car.moveLeft();
      break;
    case 38: console.log('Up');
      break;
    case 39: car.moveRight();
      break;
    case 40: console.log('Down');
  }
});
window.addEventListener('keyup', (evt) => {
  switch(evt.keyCode || evt.which) {
    case 37: car._moveLeft = false;
      break;
    case 38: car._speedUp = false;
      break;
    case 39: car._moveRight = false;
      break;
    case 40: console.log('Down');
  }
});

loadImage('images/background.png').then((image) => {
  images.background = image;
  loadImage('images/car.png').then((image) => {
    images.car = image;
    loadImage('images/enemies.png').then((image) => {
      images.enemies = image;
      btnStart.style = 'display: block';
    });
  });
});
