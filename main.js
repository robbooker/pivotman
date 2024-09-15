// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Little man object
const littleMan = {
  x: canvas.width / 2 - 25, // Start at the center
  y: canvas.height - 150,   // Feet on the ground
  width: 50,
  height: 100,
  jumpHeight: 150,
  isJumping: false,
  velocityY: 0,
  gravity: 0.6, // Reduced gravity to keep the man in the air longer
  image: new Image(),
};

// Load the little man image (you'll need to create a simple image for him)
littleMan.image.src = 'little-man.png'; // Create or find a simple man sprite

// Draw the little man on the canvas
function drawLittleMan() {
  ctx.drawImage(littleMan.image, littleMan.x, littleMan.y, littleMan.width, littleMan.height);
}

// Handle the jump mechanics
function jump() {
  if (!littleMan.isJumping) {
    littleMan.isJumping = true;
    littleMan.velocityY = -12; // Set an upward velocity (reduced for more controlled rise)
  } else {
    // If already jumping, boost him higher with an additional velocity increase
    littleMan.velocityY = -15; // Boosts him up higher when clicked while in the air
  }
}

// Update the man's position and handle jumping
function update() {
  if (littleMan.isJumping) {
    littleMan.y += littleMan.velocityY;
    littleMan.velocityY += littleMan.gravity;

    // If the little man hits the ground, stop the jump
    if (littleMan.y >= canvas.height - 150) {
      littleMan.y = canvas.height - 150; // Reset to ground level
      littleMan.isJumping = false;
      littleMan.velocityY = 0;
    }
  }
}

// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  drawLittleMan();
  update();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

// Add click event to trigger the jump
canvas.addEventListener('click', function(event) {
  const clickX = event.clientX - canvas.getBoundingClientRect().left;
  const clickY = event.clientY - canvas.getBoundingClientRect().top;

  // Check if the little man was clicked
  if (
    clickX >= littleMan.x &&
    clickX <= littleMan.x + littleMan.width &&
    clickY >= littleMan.y &&
    clickY <= littleMan.y + littleMan.height
  ) {
    jump();
  }
});