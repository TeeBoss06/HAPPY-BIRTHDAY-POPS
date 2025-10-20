// 🎂 Tap-to-start functionality
window.addEventListener("click", () => {
  const bgMusic = document.getElementById("bg-music");
  const tapText = document.getElementById("tapText");
  const pageContent = document.querySelector(".page-content");

  if (!bgMusic) return;

  bgMusic.volume = 0;

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

// 🔇 Auto-pause / fade background music when user leaves the page
document.addEventListener("visibilitychange", function() {
  const music = document.getElementById("bg-music");
  if (!music) return;

  if (document.hidden) {
    // Fade out smoothly
    let vol = music.volume;
    const fadeOut = setInterval(() => {
      if (vol > 0.02) {
        vol -= 0.02;
        music.volume = vol;
      } else {
        music.pause();
        clearInterval(fadeOut);
      }
    }, 50);
  } else {
    // Resume playing and fade in
    music.play().then(() => {
      let vol = music.volume;
      const fadeIn = setInterval(() => {
        if (vol < 1) {
          vol += 0.02;
          music.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    }).catch((err) => {
      console.log("Autoplay blocked:", err);
    });
  }
});
