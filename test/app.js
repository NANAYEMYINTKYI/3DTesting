import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Scene setup
let scene, renderer, camera;

// Load and display the first model by default
let currentModel;
const loader = new GLTFLoader();
loader.load("./public/monkey_dancing/scene.gltf", (gltf) => {
  setupDefaultScene();
  currentModel = gltf.scene;
  scene.add(currentModel);
  document.getElementById("model-container").appendChild(renderer.domElement);
  animate();
});

// Handle model selection
const modelSelect = document.getElementById("model-select");
modelSelect.addEventListener("change", (event) => {
  const selectedModel = event.target.value;
  loader.load(selectedModel, (gltf) => {
    if (currentModel) {
      scene.remove(currentModel);
    }
    currentModel = gltf.scene;
    setupSceneForModel(selectedModel);
    scene.add(currentModel);
  });
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
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

function setupSceneForModel(modelPath) {
  // Remove the existing renderer's DOM element
  document.getElementById("model-container").innerHTML = "";

  // Setup scene, renderer, camera, and lighting based on the selected model
  if (modelPath === "./public/Rokoko/1.gltf") {
    // Setup for Model 1
    renderer.setClearColor(0xffffff); // Set background color to white
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10); // Set camera position

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 20);
    scene.add(pointLight);
  } else if (modelPath === "./public/monkey_dancing/scene.gltf") {
    // Setup for Model 2
    renderer.setClearColor(0x00ff00);
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 700);
    camera.position.set(4, 100, 300);
  } else if (modelPath === "./public/stupidmonkey/simio_monkey_dancing/scene.gltf") {
    // Setup for Model 3
    const scene = new THREE.Scene();
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x00ff00);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 1, 5)

    // Lighting setup
    const spotlight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
    spotlight.position.set(0, 25, 0);
    scene.add(spotlight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
  }

  // Add the renderer's DOM element
  document.getElementById("model-container").appendChild(renderer.domElement);
}