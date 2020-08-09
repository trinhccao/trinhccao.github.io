'use strict';
const game = document.getElementById('game');
const gameRows = parseInt(game.getAttribute('data-row'));
const gameCols = parseInt(game.getAttribute('data-col'));
const gameCells = gameRows * gameCols;
const href = location.href;
const path = href.substr(0, href.lastIndexOf('/') + 1) + 'img/';
const actors = {
  data: [
    { 'id': '001', 'img': path + '001.jpg' },
    { 'id': '002', 'img': path + '002.jpg' },
    { 'id': '003', 'img': path + '003.jpg' },
    { 'id': '004', 'img': path + '004.jpg' },
    { 'id': '005', 'img': path + '005.jpg' },
    { 'id': '006', 'img': path + '006.jpg' },
    { 'id': '007', 'img': path + '007.jpg' },
    { 'id': '008', 'img': path + '008.jpg' },
    { 'id': '009', 'img': path + '009.jpg' },
    { 'id': '010', 'img': path + '010.jpg' }
  ],
  randomPick: function () {
    let picked = this.data[Math.floor(Math.random() * this.data.length)];
    this.pickedActors.push(picked);
    return picked;
  },
  pickedActors: []
};

function generateHTML(row, col) {
  if (row % 2 !== 0 || col % 2 !== 0) {
    console.log('Both row and column must be even.');
    return;
  }
  let renderedCell = 0;
  let flag = false;
  let rowElems = [];
  for (let row = 1; row <= gameRows; row++) {
    let rowElem = document.createElement('div');
    rowElem.classList.add('row');
    let colElems = [];
    for (let col = 1; col <= gameCols; col++) {
      let colElem = document.createElement('div');
      colElem.classList.add('col');
      let cell = document.createElement('button');
      cell.setAttribute('type', 'button');
      cell.classList.add('cell', 'active');
      cell.disabled = true;
      let actor;
      if (renderedCell < gameCells / 2) {
        actor = actors.randomPick();
      } else {
        if (!flag) {
          actors.pickedActors = shuffleArray(actors.pickedActors);
          flag = true;
        }
        actor = actors.pickedActors.pop();
      }
      cell.setAttribute('data-id', actor.id);
      cell.style.backgroundImage = `url(${actor.img})`;
      colElem.appendChild(cell);
      colElems.push(colElem);
      renderedCell++;
    }
    colElems.forEach((colElem) => {
      rowElem.appendChild(colElem);
    });
    rowElems.push(rowElem);
  }
  rowElems.forEach((rowElem) => {
    game.appendChild(rowElem);
  });
}

function shuffleArray(arr) {
  let shuffle = [...arr];
  for (let i = 0; i < shuffle.length; i++) {
    let temp = shuffle[i];
    let rand = Math.floor(Math.random() * shuffle.length);
    shuffle[i] = shuffle[rand];
    shuffle[rand] = temp;
  }
  return shuffle;
}

window.onload = function () {
  generateHTML(gameRows, gameCols);
  let cells = document.querySelectorAll('.cell');
  setTimeout(() => {
    cells.forEach((cell) => {
      cell.classList.remove('active');
      cell.disabled = false;
      cell.addEventListener('click', checkClicked);
    });
  }, 3000);

  let clickedCells = [];
  let catched = 0;
  function checkClicked() {
    this.classList.toggle('active');
    (clickedCells[0] !== this) ? clickedCells.push(this) : null;

    if (clickedCells.length === 2) {
      switch (clickedCells[0].getAttribute('data-id') === clickedCells[1].getAttribute('data-id')) {
        case true:
          clickedCells.forEach((cell) => {
            cell.removeEventListener('click', checkClicked);
            cell.classList.add('active');
          });
          catched += 2;
          clickedCells = [];
          break;
        case false:
          cells.forEach((cell) => {
            cell.disabled = true;
          });
          setTimeout(() => {
            clickedCells.forEach((cell) => {
              cell.classList.remove('active');
            });
            cells.forEach((cell) => {
              cell.disabled = false;
            });
            clickedCells = [];
          }, 1500);
          break;
      }
      if (catched === gameCells) {
        alert('You win!');
      }
    }
  }
}
