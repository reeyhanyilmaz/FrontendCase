export default function decorate(block) {
  const slider = document.querySelector(".section.upcomingevents-container .upcomingevents.block");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });

  // div
  const upcomingPartDoubleDiv = document.querySelectorAll(".upcomingevents.block h4");
  upcomingPartDoubleDiv.forEach((item) => {
    console.log("upcomingPartDoubleDiv :>> ", item.closest("div"));
    const parentDiv = item.closest("div");
    parentDiv.classList.add("upcomingpart-item-div");
  });

  // about buttons
  const button = document.querySelectorAll(".upcomingpart-item-div p a");
  button.forEach((item) => {
    if (item.textContent.trim() === "REGISTER") {
      item.classList.add("register-button");
      item.parentElement.classList.add("register-addtocal-parent");
    } else if (item.textContent.trim() === "ADD TO CALENDER") {
      item.classList.add("addtocal-button");
      item.parentElement.classList.add("register-addtocal-parent");
    } else if (item.textContent.trim() === "") {
      return;
    } else {
      item.classList.add("other-button");
    }
  });

  const createWrapDiv = document.createElement("div");
  createWrapDiv.className = "button-wrap-div";
}
