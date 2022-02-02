const createPlayer = (name, marker) => {
  return { name, marker };
};

const createBox = () => {
  const boardElement = document.getElementById('board');

  const box = document.createElement('div');
  box.classList.add('cell');

  boardElement.appendChild(box);
};

const gameBoard = (() => {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push('');

    createBox();
  }

  const boxes = Array.from(document.getElementsByClassName('cell'));
  const modal = document.getElementById('modal');
  const modalText = document.getElementById('modalText');

  startGame();

  function startGame() {
    boxes.forEach((box) => {
      box.removeEventListener('click', playTurn);
      box.addEventListener('click', playTurn, { once: true });
    });
  }

  function playTurn(e) {
    let boardElement = e.target.parentElement;
    let cell = e.target;
    let i = undefined;

    for (let j = 0; j < boardElement.children.length; j++) {
      console.log(cell);
      if (cell === boardElement.children[j]) {
        i = j;
      }
    }

    cell.textContent = game.currentPlayer.marker;

    board[i] = game.currentPlayer.marker;

    console.log(board);
    console.log(game.currentPlayer, i + 1);

    if (game.isWinner()) {
      modalText.textContent = `${game.currentPlayer.marker} won the game!`;
      modal.style.display = 'flex';
      console.log('Win');

      return;
    } else if (game.isDraw()) {
      modalText.textContent = 'Draw';
      modal.style.display = 'flex';
      console.log('Draw');

      return;
    } else {
      game.nextPlayer();
    }
  }

  const restartButton = document.getElementById('restart');

  restartButton.addEventListener('click', () => {
    boxes.forEach((box, i) => {
      box.textContent = '';
      board[i] = '';
    });
    startGame();
    game.currentPlayer = game.firstPlayer;
    modal.style.display = 'none';
  });

  return {
    board,
  };
})();

const game = (() => {
  const firstPlayer = createPlayer('Player 1', 'X');
  const secondPlayer = createPlayer('Player 2', 'O');

  let currentPlayer = firstPlayer;

  function nextPlayer() {
    this.currentPlayer === firstPlayer
      ? (this.currentPlayer = secondPlayer)
      : (this.currentPlayer = firstPlayer);
  }

  function isWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombinations.some((combination) => {
      return combination.every((index) => {
        return gameBoard.board[index] === this.currentPlayer.marker;
      });
    });
  }

  function isDraw() {
    return gameBoard.board.every((item) => {
      return item !== '';
    });
  }

  return {
    firstPlayer,
    currentPlayer,
    nextPlayer,
    isWinner,
    isDraw,
  };
})();
