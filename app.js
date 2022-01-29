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

  startGame();

  function startGame() {
    boxes.forEach((box, i) => {
      box.addEventListener('click', playTurn, { once: true });

      function playTurn(e) {
        let cell = e.target;

        cell.textContent = game.currentPlayer.marker;

        board[i] = game.currentPlayer.marker;

        if (game.isWinner()) {
          console.log('Winner');
          modal.style.display = 'flex';
        } else if (game.isDraw()) {
          console.log('Draw');
          modal.style.display = 'flex';
        } else {
          game.nextPlayer();
          console.log(game.currentPlayer.marker);
        }
      }
    });
  }

  const restartButton = document.getElementById('restart');

  restartButton.addEventListener('click', () => {
    boxes.forEach((box, i) => {
      box.textContent = '';
      board[i] = '';
    });
    startGame();
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
    currentPlayer,
    nextPlayer,
    isWinner,
    isDraw,
  };
})();
