let winType = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // 3 block
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // 3 row
  [0, 4, 8],
  [2, 4, 6], // 3 diagonal
];

enum Player {
  X = "X",
  O = "O", // 用 Player.X 作为添加的 class 类名
}

let step: number; //下完 9 步出现平局
let isWin = false;
let currentPlayer: Player;
let restart = document.querySelector("#restart") as HTMLButtonElement;
let message = document.querySelector("#message") as HTMLDivElement;
let winner = document.querySelector("#winner") as HTMLParagraphElement;
let cells = document.querySelectorAll(".cell"); //get all cells
// console.log(cells); //NodeList (伪数组)
let x = document.getElementsByName("background"); //hover 棋牌变换 X ，O
function checkBackground() {
  for (let i = 0; i < x.length; i++) {
    x[i].setAttribute("hover", currentPlayer);
  }
}

//第一次做的事情，和重新开始时是一样的，直接优化代码
// cells.forEach((cell, index) => {
//   let cellNode = cell as HTMLDivElement;
//   cellNode.addEventListener("click", clickCell, { once: true });
// });
startGame();

function clickCell(event: MouseEvent) {
  let target = event.target as HTMLDivElement; //<div class="">节点
  target.classList.add(currentPlayer); //添加属性add class x/o
  step++;

  isWin = checkWin(currentPlayer);
  if (isWin) {
    message.style.display = "block";
    // console.log("当前玩家获胜：", currentPlayer);
    winner.innerHTML = currentPlayer + " Won!";
    step = 0;
    return;
  }

  if (step === 9) {
    message.style.display = "block";
    winner.innerHTML = " Draw 🤝";
    // console.log("平局");
    return;
  }

  currentPlayer = currentPlayer === Player.X ? Player.O : Player.X; //切换玩家

  target.classList.add("no-hover"); //取消还可以继续 hover 的效果
  //更改 hover 效果的背景 X ，O
  checkBackground();
}

function checkWin(player: Player): boolean {
  return winType.some((item) => {
    //比如【0，1，2】获胜
    let cellIndex1 = item[0]; //拿到0
    let cellIndex2 = item[1];
    let cellIndex3 = item[2];

    let cell1 = cells[cellIndex1]; //拿到每个 cell
    let cell2 = cells[cellIndex2];
    let cell3 = cells[cellIndex3];
    //三个元素是否都是同一个 x 或者 o
    if (
      cell1.classList.contains(player) &&
      cell2.classList.contains(player) &&
      cell3.classList.contains(player)
    ) {
      return true;
    }

    return false;
  });
}

restart.addEventListener("click", startGame);

function startGame() {
  step = 0; // 重置步数
  message.style.display = "none"; //隐藏游戏结束提示框
  currentPlayer = Player.X; //默认开始玩家为 X
  cells.forEach((item) => {
    item.classList.remove(Player.O, Player.X, "no-hover"); //隐藏棋子，重置 hover 下棋提示
    item.removeEventListener("click", clickCell); //解除上次绑定事件
    item.addEventListener("click", clickCell, { once: true }); //重新绑上新的事件
  });
  checkBackground(); //重置 hover 下棋提示为 X
}
