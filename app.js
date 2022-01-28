const createPlayer = (name, marker) => {
  return { name, marker };
};

const createBoxes = () => {
  const boardElement = document.getElementById('board');

  const box = document.createElement('div');
  box.classList.add('cell');

  boardElement.appendChild(box);
};

const gameBoard = () => {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push('');

    createBoxes();
  }
};

gameBoard();
