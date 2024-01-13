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

  const targetDate = new Date("05/05/2024 14:00");

  const h3 = document.querySelector(".hero-container .left-div h3");
  const countdownObject = [
    { id: "days", text: "Days" },
    { id: "hours", text: "Hours" },
    { id: "minutes", text: "Minutes" },
    { id: "seconds", text: "Seconds" },
  ];

  const countdownContent = countdownObject
    .map(
      (item) => `
    <div class="countdown-content">
      <div class="countdown-number" id=${item.id}></div>
      <p>${item.text}</p>
    </div>`
    )
    .join("");

  const countdown = `<div id="countdown">${countdownContent}</div>`;
  h3.insertAdjacentHTML("afterend", countdown);

  function updateCountdown() {
    const currentDate = new Date();
    const timeRemaining = targetDate - currentDate; // kalan süre
    const secondsRemaining = Math.floor(timeRemaining / 1000);
    const days = Math.floor(secondsRemaining / (24 * 60 * 60));
    const hours = Math.floor((secondsRemaining % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((secondsRemaining % (60 * 60)) / 60);
    const seconds = secondsRemaining % 60;

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    // eğer hedef tarih geçmişse
    if (timeRemaining < 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").innerHTML = "Etkinlik Başladı!";
    }
  }

  updateCountdown();

  // her saniye geri sayımı güncelle
  const countdownInterval = setInterval(updateCountdown, 1000);
}
