var winType = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
var Player;
(function (Player) {
    Player["X"] = "X";
    Player["O"] = "O";
})(Player || (Player = {}));
var step; //下完 9 步出现平局
var isWin = false;
var currentPlayer;
var restart = document.querySelector("#restart");
var message = document.querySelector("#message");
var winner = document.querySelector("#winner");
var cells = document.querySelectorAll(".cell"); //get all cells
// console.log(cells); //NodeList (伪数组)
var x = document.getElementsByName("background"); //hover 棋牌变换 X ，O
function checkBackground() {
    for (var i = 0; i < x.length; i++) {
        x[i].setAttribute("hover", currentPlayer);
    }
}
//第一次做的事情，和重新开始时是一样的，直接优化代码
// cells.forEach((cell, index) => {
//   let cellNode = cell as HTMLDivElement;
//   cellNode.addEventListener("click", clickCell, { once: true });
// });
startGame();
function clickCell(event) {
    var target = event.target; //<div class="">节点
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
function checkWin(player) {
    return winType.some(function (item) {
        //比如【0，1，2】获胜
        var cellIndex1 = item[0]; //拿到0
        var cellIndex2 = item[1];
        var cellIndex3 = item[2];
        var cell1 = cells[cellIndex1]; //拿到每个 cell
        var cell2 = cells[cellIndex2];
        var cell3 = cells[cellIndex3];
        //三个元素是否都是同一个 x 或者 o
        if (cell1.classList.contains(player) &&
            cell2.classList.contains(player) &&
            cell3.classList.contains(player)) {
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
    cells.forEach(function (item) {
        item.classList.remove(Player.O, Player.X, "no-hover"); //隐藏棋子，重置 hover 下棋提示
        item.removeEventListener("click", clickCell); //解除上次绑定事件
        item.addEventListener("click", clickCell, { once: true }); //重新绑上新的事件
    });
    checkBackground(); //重置 hover 下棋提示为 X
}
