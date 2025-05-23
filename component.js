document.addEventListener("DOMContentLoaded", function () {
  const sceneEl = document.querySelector("a-scene");
  let arSystem;
  sceneEl.addEventListener("loaded", function () {
    arSystem = sceneEl.systems["mindar-image-system"];
  });

  const exampleModel1 = document.querySelector("#example-model1");

  const exampleModel2 = document.querySelector("#example-model2");

  const exampleModel3 = document.querySelector("#example-model3");

  const splashScreen = document.getElementById("splashScreen");
  const startButton = document.getElementById("startButton");
  const arScene = document.querySelector("a-scene");
  const showImageButton = document.getElementById("showImageButton");
  const imageContainer = document.getElementById("imageContainer");
  const closeImageButton = document.getElementById("closeImageButton");
  const scoreTracker = document.getElementById("scoreTracker");
  const coinTracker = document.getElementById("coinTracker");
  const claimScreen = document.getElementById("claimScreen");
  const claimButton = document.getElementById("claimButton");
  const audioElement1 = document.querySelector("#sound1");
  const audioElement2 = document.querySelector("#sound2");
  const audioElement3 = document.querySelector("#startGame");
  const audioElement4 = document.querySelector("#sound3");
  const audioElementInfo1 = document.querySelector("#soundInfo1");
  const audioElementInfo2 = document.querySelector("#soundInfo2");
  const audioElementInfo3 = document.querySelector("#soundInfo3");

  let score = 0;
  let coinsLeft = 3;
  let claimedTreasures = new Set();
  let currentTarget = null;

  // Hide elements initially
  showImageButton.style.display = "none";
  arScene.style.display = "none";
  scoreTracker.style.display = "none";
  coinTracker.style.display = "none";
  claimScreen.style.display = "none";

  startButton.addEventListener("click", function () {
    splashScreen.style.display = "none";
    arScene.style.display = "block";
    showImageButton.style.display = "block";
    scoreTracker.style.display = "block";
    coinTracker.style.display = "block";
    audioElement3.play();
  });

  // Show the PNG image when the button is clicked
  showImageButton.addEventListener("click", function () {
    imageContainer.style.display = "flex";
    audioElement1.play();
  });

  // Close the PNG image when the close button is clicked
  closeImageButton.addEventListener("click", function () {
    imageContainer.style.display = "none";
    audioElement1.play();
  });

  // Function to update the score
  function updateScore() {
    score += 100; // Example: add 100 points per clue found
    scoreTracker.textContent = `Score: ${score}`;
  }

  // Function to update coins left
  function updateCoinsLeft() {
    coinsLeft -= 1;
    coinTracker.textContent = `Koin tersisa: ${coinsLeft}`;

    // Function to show winning screen
    if (coinsLeft === 0) {
      showWinScreen();
    }

    function collectCoin() {
      if (coinsLeft > 0) {
        coinsLeft--;
        updateCoinsLeft();
      }
    }

    function showWinScreen() {
      const winScreen = document.getElementById("winScreen");
      winScreen.style.display = "block";
      scoreTracker.style.display = "none";
      coinTracker.style.display = "none";
      showImageButton.style.display = "none";
      audioElement2.play();
    }
  }

  claimButton.addEventListener("click", () => {
    if (currentTarget !== null && !claimedTreasures.has(currentTarget)) {
      updateScore();
      updateCoinsLeft();
      claimedTreasures.add(currentTarget);
      claimScreen.style.display = "none";
      console.log("Coin claimed!");
      audioElement1.play();
    }
  });

  // arReady event
  sceneEl.addEventListener("arReady", (event) => {
    console.log("MindAR is ready");
  });

  // arError event
  sceneEl.addEventListener("arError", (event) => {
    console.log("MindAR failed to start");
  });

  // detect target found
  sceneEl.addEventListener("targetFound", (event) => {
    console.log("target found", event);
    audioElement4.play();

    // Use a more robust way to determine the target
    const target = event.target;
    currentTarget = target.id || "unknown";

    console.log("Current target:", currentTarget);

    // Play audio only if target1 is detected
    if (currentTarget === "target1") {
      audioElementInfo1.play();
    }

    // Play audio only if target2 is detected
    if (currentTarget === "target2") {
      audioElementInfo2.play();
    }

    // Play audio only if target3 is detected
    if (currentTarget === "target3") {
      audioElementInfo3.play();
    }

    if (!claimedTreasures.has(currentTarget)) {
      claimScreen.style.display = "block";
    }
  });

  // detect target lost
  sceneEl.addEventListener("targetLost", (event) => {
    console.log("target lost");
    claimScreen.style.display = "none";
    currentTarget = null;
  });
});
