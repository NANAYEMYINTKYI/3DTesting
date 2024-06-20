import * as THREE from "three";
import * as monkey1Module from "./src/monkey1.js";
import * as monkey2Module from "./src/monkey2.js";
import * as RococotestModule from "./src/Rococotest.js";

// Scene setup
let scene, renderer, camera;

// Load and display the first model by default
let currentModel;
setupDefaultScene();
currentModel = monkey1Module.default.createModel();
scene.add(currentModel.scene);
document.getElementById("model-container").appendChild(renderer.domElement);
animate();

// Handle model selection
const modelSelect = document.getElementById("model-select");
modelSelect.addEventListener("change", (event) => {
  const selectedModel = event.target.value;
  if (currentModel) {
    scene.remove(currentModel.scene);
    currentModel.disposeResources();
  }

  if (selectedModel === "monkey1") {
    currentModel = monkey1Module.default.createModel();
  } else if (selectedModel === "monkey2") {
    currentModel = monkey2Module.default.createModel();
  } else if (selectedModel === "Rococotest") {
    currentModel = RococotestModule.default.createModel();
  }

  scene.add(currentModel.scene);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  if (currentModel && currentModel.updateAnimation) {
    currentModel.updateAnimation();
  }
  renderer.render(scene, camera);
}

// Setup functions for different models
function setupDefaultScene() {
  // Setup scene, renderer, and camera for the default model
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x00ff00);
  renderer.setPixelRatio(window.devicePixelRatio);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 700);
  camera.position.set(4, 100, 300);
}

// Handle window resize
window.addEventListener("resize", () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
});