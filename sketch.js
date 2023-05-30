// プレイヤーの関数
let playerImages = []; // プレイヤーの画像配列
let currentImageIndex = 0; // 現在の画像のインデックス
let player;
let jumpCount = 0;
let jumpCounts = [1, 3, 2, 2,];
// アイテムの関数
let items = [];
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
// ビーチ背景の関数
let beachImg;
// 森背景の関数
let forestImg;
let back_states = "sabaku";

// スタート画面の描画
function drawStartScreen() {
  background(0);
  if(back_states == "sabaku"){
    image(sabakuImg, 400, 300, 800, 600);
  }else if(back_states == "sea"){
    image(beachImg, 400, 300, 800, 600);
  }else if(back_states == "forest"){
    image(forestImg, 400, 300, 800, 600);
  }
  textAlign(CENTER);
  fill(255);
  textSize(48);
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
  //現在選択している動物を描画
  imageMode(CENTER);
  image(playerImages[currentImageIndex], 600, 400, 80, 60);
  textSize(16);
  text("Click to select animal\n↓", 600, 340);
  if(currentImageIndex === 0) {
    textSize(12);
    text("馬\n連続ジャンプ可能回数：1回\nジャンプ力：高い", 600, 460);
  }else if(currentImageIndex === 1) {
    textSize(12);
    text("亀\n連続ジャンプ可能回数：3回\nジャンプ力：低い", 600, 460);
  }else if(currentImageIndex === 2) {
    textSize(12);
    text("チーター\n連続ジャンプ可能回数：2回\nジャンプ力：とても高い", 600, 460);
  }else if(currentImageIndex === 3) {
    textSize(12);
    text("猫\n連続ジャンプ可能回数：2回\nジャンプ力：普通", 600, 460);
  }
  // 砂漠ボタンの四角の図形を描画
  stroke(255);
  noFill();
  rect(200, 250, 100, 50);
  // 背景（砂漠）ボタンのテキストを描画
  noStroke();
  fill(255);
  textSize(20);
  text("砂漠", 200, 250);
  // 海ボタンの四角の図形を描画
  stroke(255);
  noFill();
  rect(200, 350, 100, 50);
  // 背景（海）ボタンのテキストを描画
  noStroke();
  fill(255);
  textSize(20);
  text("海", 200, 350);
  // 森ボタンの四角の図形を描画
  stroke(255);
  noFill();
  rect(200, 450, 100, 50);
  // 背景（森）ボタンのテキストを描画
  noStroke();
  fill(255);
  textSize(20);
  text("森", 200, 450);
  //現在選択中の背景
  if(back_states == "sabaku"){
    textSize(12);
    text('現在のステージ：砂漠', 80, 300);
    image(sabakuImg, 80, 350, 80, 60);
  }else if(back_states == "sea"){
    textSize(12);
    text('現在のステージ：海', 80, 300);
    image(beachImg, 80, 350, 80, 60);
  }else if(back_states == "forest"){
    textSize(12);
    text('現在のステージ：森', 80, 300);
    image(forestImg, 80, 350, 80, 60);
  }
}

// ゲームオーバー画面に描画
function drawGameOverScreen() {
  background(0);
  if(back_states == "sabaku"){
    image(sabakuImg, 400, 300, 800, 600);
  }else if(back_states == "sea"){
    image(beachImg, 400, 300, 800, 600);
  }else if(back_states == "forest"){
    image(forestImg, 400, 300, 800, 600);
  }
  textAlign(CENTER);
  fill(255);
  textSize(64);
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

  textSize(50);
  text("記録" + record + "m", width / 2, 150);
}



function mouseClicked() {
  // Startボタンの範囲内でクリックされたか判定
  if (mouseX >= 300 && mouseX <= 500) {
    if (mouseY >= 375 && mouseY <= 425) {
      if (gameState === "start" || gameState === "gameover") {
        song1.loop();
        song2.loop();
        song3.play();
        if(back_states == "sabaku" || back_states == "forest" || back_states == "sea") {
        gameState = "game";
        resetGame();
        }
      }
    }
  }
  // Retryボタンの範囲内でクリックされたか判定
  if (mouseX >= 300 && mouseX <= 500) {
    if (mouseY >= 375 && mouseY <= 425) {
      if (gameState === "gameover") {
        song3.play();
        gameState = "game";
        resetGame();
      }
    }
  }
  // Menuボタンの範囲内でクリックされたか判定
  if (mouseX >= 300 && mouseX <= 500) {
    if (mouseY >= 425 && mouseY <= 475) {
      if (gameState === "gameover") {
        song3.play();
        gameState = "start";
      }
    }
  }
  // Playerボタンの範囲内でクリックされたか判定
  if (mouseX >= 560 && mouseX <= 640) {
    if (mouseY >= 375 && mouseY <= 425) {
      if (gameState === "start") {
        song3.play();
        nextImage();
      }
    }
  }
  // 砂漠ボタンの範囲内でクリックされたか判定
  if (mouseX >= 150 && mouseX <= 250) {
    if (mouseY >= 225 && mouseY <= 275) {
      if (gameState === "start") {
        song3.play();
        back_states = "sabaku";
      }
    }
  }
  // 海ボタンの範囲内でクリックされたか判定
  if (mouseX >= 150 && mouseX <= 250) {
    if (mouseY >= 325 && mouseY <= 375) {
      if (gameState === "start") {
        song3.play();
        back_states = "sea";
      }
    }
  }
  // 森ボタンの範囲内でクリックされたか判定
  if (mouseX >= 150 && mouseX <= 250) {
    if (mouseY >= 425 && mouseY <= 475) {
      if (gameState === "start") {
        song3.play();
        image(forestImg, width / 2, height / 2, 800,600);
        back_states = "forest";
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
    jumpCount = 0;
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
  const gravity = [0.13, 0.4, 0.1, 0.2]; // 画像インデックスごとの重力の値
  if (entity.loading == false) {
    entity.vy += gravity[currentImageIndex]; // 重力を適用
  }
}

// ジャンプ
function applyJump(entity, n) {
  const maxJumpCount = jumpCounts[currentImageIndex]; // 現在の画像インデックスに対応する連続ジャンプ可能回数を取得
  if (jumpCount < maxJumpCount) { // 連続ジャンプ可能回数未満の場合のみジャンプを適用
    entity.vy = n;
    entity.jumping = true; // ジャンプ中フラグをtrueに設定
    entity.rotation = 0; // 回転角度をリセット
    jumpCount++; // 連続ジャンプ回数を増やす
  }
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
  blocks = [];
  frameCount = 0;
  entity.loading = true;
  timer(player);
  updatePosition(player);
}

// マウスでジャンプ
function mousePressed() {
  if (gameState === "game") {
    applyJump(player, -5);
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

// ビーチ背景の描画
function sea(){
  image(beachImg, width / 2, height / 2, 800,600)
  image(sunImg,700,10,150,150);
}

// 森背景の描画
function forest(){
  image(forestImg, width / 2, height / 2, 800,600);
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
  beachImg = loadImage('beach.jpeg');
  forestImg = loadImage('forest.jpeg');
  hosiImage = loadImage('hosi.png');
  isiImage = loadImage('isi.png');
  blockImage = loadImage('block.jpg');
    //音楽の読み込み
  
    song1=createAudio('Short_8Bit_01.mp3');
    song2=createAudio('ゆったりお散歩.mp3');
    song3=createAudio('選択2.mp3');
    song4=createAudio('ファニージャンプ.mp3');
}

function setup() {
  createCanvas(800, 600); // 800 x 600 ピクセル。今回このサイズでやっていきます
  rectMode(CENTER); //四角形の基準点を中心に変更
  player = createPlayer();
  //song1.loop();
  //song2.loop();
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
    song2.volume(0);
  } else if (gameState === "game") {
    song1.volume(0);
    song2.volume(1.0);
      if(back_states == "forest") {
        forest();
      } else if(back_states == "sabaku") {
        sabaku();
      } else if(back_states == "sea") {
        sea();
      }
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
    if (frameCount % 120 === 0) { // 2秒ごとにアイテムを追加
      items.push(new Item());
    }

    // アイテムの削除
    for (let i = items.length - 1; i >= 0; i--) {
      if (items[i].posX < -items[i].size) {
        items.splice(i, 1);
      }
    }

    // アイテムの移動と描画
    for (let i = 0; i < items.length; i++) {
      items[i].move();
      items[i].display();

      // プレイヤーとの当たり判定
      if (
        player.x + 40 > items[i].posX &&
        player.x - 40 < items[i].posX + items[i].size &&
        player.y + 30 > items[i].posY &&
        player.y - 30 < items[i].posY + items[i].size
      ) if (frameCount > 420) {
        if (items[i].type === "obstacle") {
          gameState = "gameover";
        } else if (items[i].type === "powerup") {
          jumpCount = 0;
          applyJump(player, -7);
          jumpCount = 0;
        }
        items.splice(i, 1); // アイテムを削除
      }
    }
  } else if (gameState === "gameover") {
    drawGameOverScreen();
    t = 0;
    song1.volume(1.0);
    song2.volume(0);
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
    image(blockImage, this.posX, this.posY, this.sizeX, this.sizeY);
  }
}

class Item {
  constructor() {
    this.size = 30;
    this.posX = width;
    this.posY = random(height - this.size);
    this.velocity = -3;
    this.type = random(["obstacle", "powerup"]); // "obstacle"：ゲームオーバーになるアイテム, "powerup"：ジャンプ力が上がるアイテム
  }

  move() {
    this.posX += this.velocity;
  }

  display() {
    imageMode(CENTER);
    if (this.type === "obstacle") {
      image(isiImage, this.posX, this.posY, this.size, this.size);
    } else if (this.type === "powerup") {
      image(hosiImage, this.posX, this.posY, this.size, this.size);
    }
  }
}
