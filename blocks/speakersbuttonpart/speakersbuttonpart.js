export default function decorate(block) {
  const speakersButtonDiv = document.querySelector(".section.speakersbuttonpart-container .button-container");
  console.log("speakersButtonDiv :>> ", speakersButtonDiv);
  speakersButtonDiv.parentElement.classList.add("speakers-button-div");
}
