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

        game.nextPlayer();
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

  return {
    currentPlayer,
    nextPlayer,
  };
})();
