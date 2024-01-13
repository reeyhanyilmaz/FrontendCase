export default function decorate(block) {
  // right part
  const buttons = document.querySelector(".hero-container .button-container");
  const rightPartDiv = buttons.closest("div");
  rightPartDiv.classList.add("right-div");

  // left part (text, coundown)
  const leftPart = rightPartDiv.previousElementSibling;
  leftPart.classList.add("left-div");

  //kapsayici div
  const heroContenDiv = rightPartDiv.parentElement;
  heroContenDiv.classList.add("hero-content-div");
}
