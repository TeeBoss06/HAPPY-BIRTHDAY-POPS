// Wait until the user clicks anywhere to start the music and confetti
window.addEventListener("click", () => {
  const bgMusic = document.getElementById("bgMusic");
  const tapText = document.getElementById("tapText");
  const pageContent = document.querySelector(".page-content");
  bgMusic.volume = 0;

  // Fade out the "Tap to start" text
  if (tapText) {
    tapText.style.transition = "opacity 1s ease";
    tapText.style.opacity = "0";
    setTimeout(() => {
      tapText.style.display = "none";

      // Reveal the page by removing blur
      if (pageContent) {
        pageContent.classList.add("active");
      }
    }, 1000);
  }

  // Play background music with fade-in
  bgMusic.play().then(() => {
    let currentVolume = 0;
    const fadeInterval = setInterval(() => {
      if (currentVolume < 1) {
        currentVolume += 0.02;
        bgMusic.volume = currentVolume;
      } else {
        clearInterval(fadeInterval);
      }
    }, 200);

    // 🎉 Trigger confetti after 1 second
    setTimeout(() => {
      launchConfetti();
    }, 1000);
  }).catch((err) => {
    console.log("Error playing music:", err);
  });
}, { once: true }); // ensures it only runs once no matter how many clicks


// 🎊 Confetti launcher function
function launchConfetti() {
  const duration = 5 * 1000; // confetti duration (in ms)
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
