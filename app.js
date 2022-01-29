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

  console.log(board);

  const boxes = Array.from(document.getElementsByClassName('cell'));

  boxes.forEach((box) => {
    box.addEventListener('click', boxClickHandler, { once: true });
  });

  let currentPlayer = game.firstPlayer;

  function boxClickHandler(e) {
    let cell = e.target;

    cell.textContent = currentPlayer.marker;

    if (currentPlayer === game.firstPlayer) {
      currentPlayer = game.secondPlayer;
    } else {
      currentPlayer = game.firstPlayer;
    }
  }
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
