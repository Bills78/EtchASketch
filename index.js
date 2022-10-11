const board = document.querySelector(".board");
const volume = document.querySelector("#volume");
const number = document.querySelector(".number");
const resetBtn = document.querySelector(".reset");
const colorBtn = document.querySelector(".color");
const classicBtn = document.querySelector(".classic");

let globalColor;

const reset = () => {
  board.textContent = "";
};

const createSquares = function (vol, option) {
  number.textContent = `${vol.value}`;
  const totalSquares = vol.value * vol.value;
  const pixelsPerSqr = 400 / vol.value;
  const makeBlack = (e) => (e.target.style.backgroundColor = "black");
  for (i = 1; i <= totalSquares; i++) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const square = document.createElement("div");
    square.className = "square";
    square.style.width = `${pixelsPerSqr}px`;
    square.style.height = `${pixelsPerSqr}px`;
    if (option == "black") {
      square.addEventListener("mousedown", makeBlack);
      square.addEventListener("mouseover", (e) => {
        if (e.buttons == 1) makeBlack(e);
      });
    } else if (option == "color") {
      square.addEventListener("mousedown", (e) => {
        e.target.style.backgroundColor = `#${randomColor}`;
      });
      square.addEventListener("mouseover", (e) => {
        if (e.buttons == 1) {
          e.target.style.backgroundColor = `#${randomColor}`;
        }
      });
    }

    board.append(square);
  }
};

createSquares(volume, "black");
globalColor = "black";

colorBtn.addEventListener("click", (e) => {
  globalColor = "color";
  reset();
  createSquares(volume, globalColor);
});

classicBtn.addEventListener("click", (e) => {
  globalColor = "black";
  reset();
  createSquares(volume, globalColor);
});

volume.addEventListener("change", (e) => {
  reset();
  createSquares(e.target, globalColor);
});

resetBtn.addEventListener("click", (e) => {
  reset();
  createSquares(volume, globalColor);
});
