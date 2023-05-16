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

let record;
let i=0;


function timer(){
  record = Math.floor(i/60);
    
  noStroke();
  fill(0);
  textSize(100);
  textAlign(CENTER, CENTER);
  text(record, 50, 50);
  i += 1
}


function addBlockPair() {
  let y = random(-300, -100);
  
  //blocks.push(createBlock(y));
  blocks.push(createBlock(y + 600)); // 下のブロック
}

function setup() {
  createCanvas(400, 400);
  blocks = [];
  
}


function draw() {
  background(220);
  fill(0);
  rect(playerX, playerY, 20, 20 );
  timer();
  
   // ブロックの追加と削除
  if (frameCount % 120 === 1) addBlockPair(blocks); // 一定間隔で追加
  blocks = blocks.filter(blockIsAlive); // 生きているブロックだけ残す
  //updatePosition(player);
  for (let block of blocks) updatePosition(block);
  //background(0);
  //drawPlayer(player);
  for (let block of blocks) drawBlock(block);


 
}





  
