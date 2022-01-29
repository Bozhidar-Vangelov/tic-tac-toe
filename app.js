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

  boxes.forEach((box, i) => {
    box.addEventListener(
      'click',
      (e) => {
        let cell = e.target;

        cell.textContent = game.currentPlayer.marker;

        board[i] = game.currentPlayer.marker;

        console.log(game.isDraw());

        if (game.isWinner()) {
          console.log('Winner');
        } else if (game.isDraw()) {
          console.log('Draw');
        } else {
          game.nextPlayer();
        }
      },
      { once: true }
    );
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
        return gameBoard.board[index] === currentPlayer.marker;
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
