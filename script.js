// 🎂 Universal Tap/Click-to-start
function startBirthdayPage() {
  const bgMusic = document.getElementById("bg-music");
  const tapText = document.getElementById("tapText");
  const pageContent = document.querySelector(".page-content");

  if (!bgMusic) return;

  // Fade out the tapText
  if (tapText) {
    tapText.style.transition = "opacity 1s ease";
    tapText.style.opacity = "0";
    setTimeout(() => {
      tapText.style.display = "none";
      if (pageContent) pageContent.classList.add("active");
    }, 1000);
  }

  // Play background music with fade-in
  bgMusic.play().then(() => {
    let currentVolume = 0;
    const fadeIn = setInterval(() => {
      if (currentVolume < 1) {
        currentVolume += 0.02;
        bgMusic.volume = currentVolume;
      } else {
        clearInterval(fadeIn);
      }
    }, 200);

    // Confetti after 1 second
    setTimeout(() => {
      launchConfetti();
    }, 1000);
  }).catch((err) => console.log("Error playing music:", err));
}

// Attach the listener to both window and document for maximum compatibility
["click", "touchstart"].forEach(evt => {
  window.addEventListener(evt, startBirthdayPage, { once: true });
});

// 🎊 Confetti launcher
function launchConfetti() {
  const duration = 5 * 1000;
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
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// 🔇 Auto-pause/fade music when leaving tab/app
document.addEventListener("visibilitychange", function() {
  const music = document.getElementById("bg-music");
  if (!music) return;

  if (document.hidden) {
    // Fade out
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
    // Resume & fade in
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
    }).catch(err => console.log("Autoplay blocked:", err));
  }
});
