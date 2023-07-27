const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

const createBoxes = (amount) => {
  const boxesContainer = document.getElementById("boxes");
  boxesContainer.innerHTML = ""; // nie jestem pewien z treści zadania czy powinienem usunść poprzednie boxy, jeśli nie to wystarczy usunąć linijkę
  let size = 30;
  for (let i = 0; i < amount; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.style.width = `${size}px`;
    box.style.height = `${size}px`;
    box.style.backgroundColor = getRandomColor();
    boxesContainer.appendChild(box);
    size += 10;
  }
};
const destroyBoxes = () => {
  const boxesContainer = document.getElementById("boxes");
  boxesContainer.innerHTML = "";
};

const createButton = document.querySelector('button[data-action="create"]');
const destroyButton = document.querySelector('button[data-action="destroy"]');

createButton.addEventListener("click", () => {
  const inputAmount = document.querySelector(".js-input").value;
  createBoxes(inputAmount);
});

destroyButton.addEventListener("click", () => {
  destroyBoxes();
});
