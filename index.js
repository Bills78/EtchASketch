const board = document.querySelector(".board");
const volume = document.querySelector("#volume");
const number = document.querySelector(".number");
const resetBtn = document.querySelector(".reset");
const colorBtn = document.querySelector(".color");
const classicBtn = document.querySelector(".classic");
const fadeBtn = document.querySelector(".fade");

let globalColor;

const reset = () => {
  board.textContent = "";
};

const createSquares = function (vol, option) {
  number.textContent = `${vol.value}`;
  const totalSquares = vol.value * vol.value;
  const pixelsPerSqr = 400 / vol.value;
  const makeBlack = (e) => (e.target.style.backgroundColor = "black");
  const randomColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
  };
  for (i = 1; i <= totalSquares; i++) {
    const square = document.createElement("div");
    square.className = "square";
    square.style.width = `${pixelsPerSqr}px`;
    square.style.height = `${pixelsPerSqr}px`;
    switch (option) {
      case "black":
        square.addEventListener("mousedown", makeBlack);
        square.addEventListener("mouseover", (e) => {
          if (e.buttons == 1) makeBlack(e);
        });
        break;
      case "color":
        square.addEventListener("mousedown", (e) => {
          e.target.style.backgroundColor = `#${randomColor()}`;
        });
        square.addEventListener("mouseover", (e) => {
          if (e.buttons == 1) {
            e.target.style.backgroundColor = `#${randomColor()}`;
          }
        });
        break;
      case "fade":
        square.addEventListener("mousedown", (e) => {
          if (e.target.style.backgroundColor == "") {
            e.target.style.backgroundColor = "black";
            e.target.style.opacity = 0.1;
          } else {
            e.target.style.opacity = parseFloat(e.target.style.opacity) + 0.1;
          }
        });
        square.addEventListener("mouseover", (e) => {
          if (e.buttons == 1 && e.target.style.backgroundColor == "") {
            e.target.style.backgroundColor = "black";
            e.target.style.opacity = 0.1;
          } else if (e.buttons == 1) {
            e.target.style.opacity = parseFloat(e.target.style.opacity) + 0.1;
          }
        });
    }
    board.append(square);
  }
};

createSquares(volume, "black");
globalColor = "black";

fadeBtn.addEventListener("click", (e) => {
  globalColor = "fade";
  reset();
  createSquares(volume, globalColor);
});

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
