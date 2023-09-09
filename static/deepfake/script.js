const uploadForm = document.getElementById('uploadForm');
const imageInput = document.getElementById('imageInput');
const resultContainer = document.getElementById('resultContainer');
const alertMessage = document.getElementById('alertMessage');
const imageContainer = document.getElementById('imageContainer');
const uploadedImage = document.getElementById('uploadedImage');
const animationOverlay = document.getElementById('animationOverlay');

uploadForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const file = imageInput.files[0];
  
  if (!file) {
    alertMessage.textContent = "Please select an image first.";
    alertMessage.style.display = 'block';
    return;
  }
  
  alertMessage.style.display = 'none';

  const reader = new FileReader();
  
  reader.onload = function() {
    uploadedImage.src = reader.result;
    imageContainer.style.display = 'block'; // Display the uploaded image

    // Simulate deepfake detection with an animation (replace with your actual detection logic)
    simulateDeepfakeDetection();
  };
  
  reader.readAsDataURL(file);
});

function simulateDeepfakeDetection() {
  animationOverlay.style.display = 'block'; // Display the animation overlay (e.g., loader)
  
  // Simulate detection delay with a timeout (replace with your actual detection logic)
  setTimeout(function() {
    animationOverlay.style.display = 'none'; // Hide the animation overlay
    const isDeepfake = detectDeepfake(uploadedImage);

    if (isDeepfake) {
      showResult('fake');
    } else {
      showResult('real');
    }
  }, 3000); // Simulated detection time (3 seconds in this example)
}

function showResult(result) {
  resultContainer.innerHTML = `The image is ${result}`;
  resultContainer.style.display = 'block';
}

function detectDeepfake(image) {
  // Simulate detection with a random boolean value
  return Math.random() < 0.5;
}
