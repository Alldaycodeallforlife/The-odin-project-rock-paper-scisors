const container = document.querySelector("#container");
const resizeButton = document.querySelector("#resize");

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function paintSquare(square) {
  // First hover: give the square a random color at 10% opacity.
  // Every later hover: add 10% more, so it is fully colored after 10 hovers.
  let opacity = Number(square.dataset.opacity);

  if (opacity === 0) {
    square.style.backgroundColor = randomColor();
  }

  opacity = Math.min(opacity + 0.1, 1);
  square.dataset.opacity = opacity;
  square.style.opacity = opacity;
}

function createGrid(size) {
  container.innerHTML = ""; // remove the old grid
  const squareSize = `${100 / size}%`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = squareSize;
    square.style.height = squareSize;
    square.dataset.opacity = 0;
    square.addEventListener("mouseenter", () => paintSquare(square));
    container.appendChild(square);
  }
}

resizeButton.addEventListener("click", () => {
  const answer = prompt("Squares per side? (1-100)");
  if (answer === null) return; // user pressed Cancel

  const size = Number(answer);
  if (!Number.isInteger(size) || size < 1 || size > 100) {
    alert("Please enter a whole number from 1 to 100.");
    return;
  }
  createGrid(size);
});

createGrid(16);
