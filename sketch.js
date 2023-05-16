//----エンティティ関連の関数 ----------------------------------------------
function updatePosition(entity) {
  entity.x += entity.vx;
  entity.y += entity.vy;
}
function createBlock(y) {
  return {
    x:900 ,
    y,
    vx: -2,
    vy: 0
  };
}


function drawBlock(entity) {
  rect(entity.x, entity.y, 100, 400);
}
function blockIsAlive(entity) {
  // ブロックの位置が生存圏内なら true を返す。
  // -100 は適当な値（ブロックが見えなくなる位置であればよい）
  return -100 < entity.x;
}


let playerX = 30;
let playerY = 250;
let blocks;
//----ゲーム全体に関わる部分 ----------------------------------------------

function addBlockPair() {
  let y = random(-300, -100);
  
  //blocks.push(createBlock(y));
  blocks.push(createBlock(y + 600)); // 下のブロック
}
//
//----setup/draw 他 ------------------------------------------------------

function setup() {
  createCanvas(800, 600); // 800 x 600 ピクセル。今回このサイズでやっていきます
  rectMode(CENTER); //四角形の基準点を中心に変更
  blocks = [];
  //（ここに初期化処理が入る）

}

function draw() {
  //（ここにデータ操作処理が入る）
  fill(0);
  rect(playerX, playerY, 20, 20 );
  
  if (frameCount % 120 === 1) addBlockPair(blocks); // 一定間隔で追加
  blocks = blocks.filter(blockIsAlive); // 生きているブロックだけ残す
  //updatePosition(player);
  for (let block of blocks) updatePosition(block);
  //background(0);
  //drawPlayer(player);
  for (let block of blocks) drawBlock(block);


}

function mousePressed(){
  //（ここにマウスボタンを押したときの処理が入る）
}
