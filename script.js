// 🎂 Tap-to-start functionality
window.addEventListener("click", () => {
  const bgMusic = document.getElementById("bg-music");
  const tapText = document.getElementById("tapText");
  const pageContent = document.querySelector(".page-content");

  if (!bgMusic) return;

  // Fade out the "Tap to start" text
  if (tapText) {
    tapText.style.transition = "opacity 1s ease";
    tapText.style.opacity = "0";
    setTimeout(() => {
      tapText.style.display = "none";

      // Remove blur from page content
      if (pageContent) pageContent.classList.add("active");
    }, 1000);
  }

  // Play background music
  bgMusic.play().catch((err) => {
    console.log("Error playing music:", err);
  });

  // Trigger confetti after 1 second
  setTimeout(() => {
    launchConfetti();
  }, 1000);
}, { once: true }); // only run once

// 🎊 Confetti launcher function
function launchConfetti() {
  const duration = 5 * 1000; // 5 seconds
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
