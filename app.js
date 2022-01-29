const createPlayer = (name, marker) => {
  return { name, marker };
};

const createBox = () => {
  const boardElement = document.getElementById('board');

  const box = document.createElement('div');
  box.classList.add('cell');

  boardElement.appendChild(box);
};

const gameBoard = () => {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push('');

    createBox();
  }

  const boxes = Array.from(document.getElementsByClassName('cell'));

  let currentPlayer = game.firstPlayer;

  boxes.forEach((box, i) => {
    box.addEventListener(
      'click',
      (e) => {
        let cell = e.target;

        cell.textContent = currentPlayer.marker;

        board[i] = currentPlayer.marker;

        if (currentPlayer === game.firstPlayer) {
          currentPlayer = game.secondPlayer;
        } else {
          currentPlayer = game.firstPlayer;
        }
      },
      { once: true }
    );
  });
};

const game = (() => {
  let firstPlayer = createPlayer('Player 1', 'X');
  let secondPlayer = createPlayer('Player 2', 'O');

  return {
    firstPlayer,
    secondPlayer,
  };
})();

gameBoard();
