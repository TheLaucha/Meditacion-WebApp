// Select DOM
const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  // Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  // Time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  //Get length of the outline
  const outlineLength = outline.getTotalLength();
  // Duration
  let fakeDuration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Pick different sounds
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      activarOpacidad(sound);
      checkPlaying(song);
    });
  });

  function activarOpacidad(activar) {
    sounds.forEach((sound) => {
      sound === activar
        ? sound.classList.add("active")
        : sound.classList.remove("active");
    });
  }

  // Play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  // Select time
  timeSelect.forEach((el) => {
    el.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  // Create a funciont specific to stop and play sounds
  const checkPlaying = (song) => {
    if (song.src === "") {
      song.src = "../sounds/rain.mp3";
    }
    if (song.paused) {
      song.play();
      video.play();
      play.src = "../images/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "../images/play.svg";
    }
  };

  // Animated the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    // Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "../images/play.svg";
      video.pause();
    }
  };
};

app();
