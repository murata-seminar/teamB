// プレイヤーの関数
let playerImages = []; // プレイヤーの画像配列
let currentImageIndex = 0; // 現在の画像のインデックス
let player;
// タイマーの関数
let record;
let t = 0;
// 状況の関数
let gameState = "start";
// ブロックの関数
let blocks = [];
let interval;
// 砂漠背景の関数
let sabakuImg1
let sabotenImg;
let sunImg;
let angle = 0;


// スタート画面の描画
function drawStartScreen() {
  background(0);
  textAlign(CENTER);
  fill(255);
  textSize(32);
  text("Animal Run", width / 2, height / 2);
  // Startボタンの四角の図形を描画
  stroke(255);
  noFill();
  rect(400, 400, 200, 50);
  // Startボタンのテキストを描画
  noStroke();
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Start", 400, 400);

  imageMode(CENTER);
  image(playerImages[currentImageIndex], 600, 400, 80, 60);
}

// ゲームオーバー画面に描画
function drawGameOverScreen() {
  background(0);
  textAlign(CENTER);
  fill(255);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 50);


  // Retryボタンの四角の図形を描画
  rectMode(CENTER);
  stroke(255);
  noFill();
  rect(400, 400, 200, 50);

  // Retryボタンのテキストを描画
  noStroke();
  fill(255);
  textSize(20);
  text("Retry", 400, 400);

  // Menuボタンの四角の図形を描画
  stroke(255);
  noFill();
  rect(400, 450, 200, 50);

  // Menuボタンのテキストを描画
  noStroke();
  fill(255);
  textSize(20);
  text("Menu", 400, 450);
}



function mouseClicked() {
  // Startボタンの範囲内でクリックされたか判定
  if (mouseX >= 300 && mouseX <= 500) {
    if (mouseY >= 375 && mouseY <= 425) {
      if (gameState === "start" || gameState === "gameover") {
        gameState = "game";
        resetGame();
      }
    }
  }
  // Retryボタンの範囲内でクリックされたか判定
  if (mouseX >= 300 && mouseX <= 500) {
    if (mouseY >= 375 && mouseY <= 425) {
      if (gameState === "gameover") {
        gameState = "game";
        resetGame();
      }
    }
  }
  // Menuボタンの範囲内でクリックされたか判定
  if (mouseX >= 300 && mouseX <= 500) {
    if (mouseY >= 425 && mouseY <= 475) {
      if (gameState === "gameover") {
        gameState = "start";
      }
    }
  }
  // Playerボタンの範囲内でクリックされたか判定
  if (mouseX >= 560 && mouseX <= 640) {
    if (mouseY >= 375 && mouseY <= 425) {
      if (gameState === "start") {
        nextImage();
      }
    }
  }
}




// ゲームオーバー判定
function checkGameOver() {
  if (player.y > height) {
    gameState = "gameover";
  }
}

// プレイヤーとブロックの当たり判定
function checkCollision(player, block) {
  if (
    player.x + 40 > block.posX - block.sizeX / 2 &&
    player.x - 40 < block.posX + block.sizeX / 2 &&
    player.y + 30 > block.posY - block.sizeY / 2 &&
    player.y - 30 < block.posY + block.sizeY / 2
  ) {
    // ブロックの側面にプレイヤーが衝突した場合
    if (
      player.x + 40 > block.posX - block.sizeX / 2 &&
      player.x + 40 < block.posX - block.sizeX / 2 + 5
    ) {
      gameState = "gameover";
    }
    return true;
  }
  return false;
}

function checkLanding(player, block) {
  if (
    player.y + 30 >= block.posY - block.sizeY / 2 &&
    player.y + 30 <= block.posY + block.sizeY / 2 &&
    player.x + 40 > block.posX - block.sizeX / 2 &&
    player.x - 40 < block.posX + block.sizeX / 2
  ) {
    return true;
  }
  return false;
}

// プレイヤーの場所更新
function updatePosition(entity) {
  if(entity.loading == false) {
   entity.x += entity.vx;
    entity.y += entity.vy;
  } else {
    entity.x = 200,
    entity.y = 200
  }

  if (entity.y >= height) {
    if (gameState === "game") {
      gameState = "gameover";
    }
  }

  // ブロックとの当たり判定
  for (let i = 0; i < blocks.length; i++) {
    if (checkCollision(entity, blocks[i])) {
      if (entity.vy > 0) {
        entity.vy = 0;
        entity.jumping = false;
      }
    }
  }

  // ブロックの一番上に着地したかの判定
  let highestBlock = null;
  for (let i = 0; i < blocks.length; i++) {
    if (checkLanding(entity, blocks[i])) {
      if (!highestBlock || blocks[i].posY < highestBlock.posY) {
        highestBlock = blocks[i];
      }
    }
  }

  if (highestBlock) {
    entity.y = highestBlock.posY - highestBlock.sizeY / 2 - 30;
    entity.vy = 0;
    entity.jumping = false;
  }
}


// プレイヤー作成
function createPlayer() {
  return {
    x: 200,
    y: 300,
    vx: 0,
    vy: 0,
    jumping: false, // ジャンプ中かどうかを示すフラグ
    loading: false,
    rotation: 0, // 回転角度を示す変数
  };
}

// 重力
function applyGravity(entity) {
  if(entity.loading == false) {
   entity.vy += 0.15;
  }
}

// ジャンプ
function applyJump(entity) {
  entity.vy = -5;
  entity.jumping = true; // ジャンプ中フラグをtrueに設定
  entity.rotation = 0; // 回転角度をリセット
}

//判定
function judgement(entity) {
  for(let i = 0; i < blocks.length; i++) {
    if(blocks[i].posX - blocks[i].sizeX < entity.x && blocks[i].posX + blocks[i].sizeX > entity.x) {
      if(blocks[i].posY - blocks[i].sizeY / 2 < entity.y) {
        entity.y = blocks[i].posY - blocks[i].sizeY / 2;
        entity.vy = 0;
      }
    }
  }
}


// プレイヤー描画
function drawPlayer(entity) {
  if (entity.jumping) {
    push();
    translate(entity.x, entity.y);
    if (entity.vy < 0) {
      rotate(radians(-30));
    } else {
      rotate(radians(30));
    }
    imageMode(CENTER);
    image(playerImages[currentImageIndex], 0, 0, 80, 60); // 画像を描画
    pop();
  } else {
    imageMode(CENTER);
    image(playerImages[currentImageIndex], entity.x, entity.y, 80, 60); // 画像を描画
  }
}

// タイマー
function timer(entity) {
  if(frameCount < 420) {
    entity.loading = true;
    record = 6 - Math.floor(frameCount / 60);
    noStroke();
    fill(0);
    textSize(100);
    textAlign(CENTER, CENTER);
    text(record, 50, 50);
  } else {
    entity.loading = false;
  record = Math.floor(t / 60);

  noStroke();
  fill(0);
  textSize(100);
  textAlign(CENTER, CENTER);
  text(record, 50, 50);
  t += 1
  }
}

// リセット
function resetGame() {
  player = createPlayer();
  record = 0;
}

// マウスでジャンプ
function mousePressed() {
  if (gameState === "game") {
    applyJump(player);
  }
}

// プレイヤー選択進み
function nextImage() {
  currentImageIndex++;
  if (currentImageIndex >= playerImages.length) {
    currentImageIndex = 0;
  }
}

// 砂漠背景の描画
function sabaku() {

  image(sabakuImg, width / 2, height / 2, 800, 600);
  image(sabotenImg, 100, 300, 100, 100);
  image(sabotenImg, 400, 350, 100, 100);

  angle += 0.01;
  push();
  imageMode(CENTER);

  translate(650, 100);
  rotate(angle);
  image(sunImg, 0, 0, 150, 150);
  pop();

}



function preload() {
  // 画像をロード
  playerImages.push(loadImage('uma.png'));
  playerImages.push(loadImage('kame.png'));
  playerImages.push(loadImage('chi-ta-.png'));
  playerImages.push(loadImage('neko.png'));
  sabakuImg = loadImage('sabaku.jpg');
  sabotenImg = loadImage('cactus.png');
  sunImg = loadImage('sun.png');
}

function setup() {
  createCanvas(800, 600); // 800 x 600 ピクセル。今回このサイズでやっていきます
  rectMode(CENTER); //四角形の基準点を中心に変更
  player = createPlayer();
}



function draw() {
  sabaku();
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "game") {
    judgement(player);
    updatePosition(player);
    applyGravity(player);
    drawPlayer(player);
    checkGameOver();
    timer(player);
    //ブロックの追加
    intarval = 100;
    if (frameCount % intarval == 1) {
      blocks.push(new Block());
    }

    // ブロックの削除
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].posX < -100) {
        blocks.splice(i, 1);
      }
    }

    //ブロックの作成
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].move();
      blocks[i].display();
    }
  } else if (gameState === "gameover") {
    drawGameOverScreen();
    t = 0;
  }
}



class Block {
  constructor() {
    this.sizeX = random(50, 100);
    this.sizeY = 400;
    this.posX = width;
    this.posY = random(500, 600);
    this.velocity = -2;
  }

  move() {
    this.posX += this.velocity;
  }

  display() {
    fill(0);
    rect(this.posX, this.posY, this.sizeX, this.sizeY);
  }
}
