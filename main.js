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
let angle=0;


// スタート画面の描画
function drawStartScreen() {
    background(0);
    textAlign(CENTER);
    fill(255);
    textSize(32);
    text("Enter Start", width / 2, height / 2);
    imageMode(CENTER);
    image(playerImages[currentImageIndex], width / 2, height / 2 + 50, 80, 60);
}
 
// ゲームオーバー画面に描画
function drawGameOverScreen() {
    background(0);
    textAlign(CENTER);
    fill(255);
    textSize(32);
    text("Game Over", width / 2, height / 2 - 50);
    textSize(20);
    text("Press Enter for Retry", width / 2, height / 2 + 20);
    text("Press Esc for Main Menu", width / 2, height / 2 + 50);
}

// ゲームオーバー判定
function checkGameOver() {
    if (player.y > height) {
      gameState = "gameover";
    }
}

// プレイヤーの場所更新
function updatePosition(entity) {
    entity.x += entity.vx;
    entity.y += entity.vy;
}
  
// プレイヤー作成
function createPlayer() {
    return {
      x: 200,
      y: 300,
      vx: 0,
      vy: 0,
      jumping: false, // ジャンプ中かどうかを示すフラグ
      rotation: 0, // 回転角度を示す変数
    };
}

// 重力
function applyGravity(entity) {
    entity.vy += 0.15;
}

// ジャンプ
function applyJump(entity) {
    entity.vy = -10;
    entity.jumping = true; // ジャンプ中フラグをtrueに設定
    entity.rotation = 0; // 回転角度をリセット
}
  
// プレイヤー描画
function drawPlayer(entity) {
  if (entity.jumping) {
    // ジャンプ中は斜めに描写され、少しずつ回転する
    push();
    translate(entity.x, entity.y);
    if (entity.vy < 0) {
      rotate(radians(-30));
    } else {
      rotate(radians(30));
    }
    image(playerImages[currentImageIndex], 0, 0, 80, 60); // 画像を描画
    pop();
  
    // 回転角度を更新
    if (entity.vy < 0 && entity.rotation < 120) {
      entity.rotation += 1;
    } else if (entity.vy >= 0 && entity.rotation > -120) {
      entity.rotation -= 1;
    }
  } else {
    // ジャンプ中でない場合は通常の描画
    imageMode(CENTER);
    image(playerImages[currentImageIndex], entity.x, entity.y, 80, 60); // 画像を描画
  }
}

// タイマー
function timer(){
    record = Math.floor(t/60);
      
    noStroke();
    fill(0);
    textSize(100);
    textAlign(CENTER, CENTER);
    text(record, 50, 50);
    t += 1
  }
  
  // キーボードが押されたとき
  function keyPressed() {
    if (keyCode === ENTER) {
      if (gameState === "start" || gameState === "gameover") {
        gameState = "game";
        resetGame();
      }
    } else if (keyCode === ESCAPE) {
      if (gameState === "gameover") {
        gameState = "start";
      }
    } else if (keyCode === LEFT_ARROW && gameState === "start") {
      previousImage();
    } else if (keyCode === RIGHT_ARROW && gameState === "start") {
      nextImage();
    }
  }

  // リセット
function resetGame() {
    player = createPlayer();
  }
  
  // マウスでジャンプ
  function mousePressed() {
    if (gameState === "game") {
      applyJump(player);
    }
  }
  
  // プレイヤー選択戻り
  function previousImage() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
      currentImageIndex = playerImages.length - 1;
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
  function sabaku(){
  
    image(sabakuImg,width / 2,height / 2,800,600);
    image(sabotenImg,100,300,100,100);
    image(sabotenImg,400,350,100,100);
    
    angle += 1;
    push();
    imageMode(CENTER);
  
    translate(650, 100);
    rotate(angle);
    image(sunImg,0,0,150,150);
    pop();
    
  }
  


function preload() {
    // 画像をロード
    playerImages.push(loadImage('uma.png'));
    playerImages.push(loadImage('kame.png'));
    playerImages.push(loadImage('chi-ta-.png'));
    playerImages.push(loadImage('neko.png'));
    sabakuImg=loadImage('sabaku.jpg');
    sabotenImg=loadImage('cactus.png');
    sunImg=loadImage('sun.png');
  }
  
function setup() {
  createCanvas(800, 600); // 800 x 600 ピクセル。今回このサイズでやっていきます
  rectMode(CENTER); //四角形の基準点を中心に変更
  angleMode(DEGREES);
  player = createPlayer();
}



function draw() {
    sabaku();
  if (gameState === "start") {
    drawStartScreen();
    record = 0;
  } else if (gameState === "game") {
    updatePosition(player);
    applyGravity(player);
    drawPlayer(player);
    checkGameOver();
    timer();
    //ブロックの追加
    intarval = 100;
    if (frameCount % intarval == 1) {
        blocks.push(new Block());
    }
  
  // ブロックの削除
  for(let i = 0; i < blocks.length; i++) {
    if(blocks[i].posX < -100) {
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
  }
}


  
class Block {
  constructor() {
    this.sizeX = random(50, 300);
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
