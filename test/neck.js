import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Scene setup
const scene = new THREE.Scene();

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x00ff00);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 2);

// Lighting setup
const spotlight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
spotlight.position.set(0, 25, 0);
scene.add(spotlight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

let model;
let neckBone;

// Function to identify and store the Neck bone
function identifyNeckBone() {
  if (model) {
    model.traverse((node) => {
      if (node.isBone && node.name === "Neck") {
        neckBone = node;
        console.log("Neck bone identified:", neckBone.name);
      }
    });
  }
}

// Function to animate the Neck
function animateNeck(time) {
  if (neckBone) {
    // Neck movement
    neckBone.rotation.x = Math.sin(time * 1.5) * 0.5; // Neck flexion ก้มเงย
    neckBone.rotation.y = Math.cos(time * 1.3) * 0.5; // Neck rotation ส่ายหน้าซ้ายขวา
    neckBone.rotation.z = Math.cos(time * 1.3) * 0.5; // Neck rotation เอียงคอซ้ายขวา
  }
}

// Load the model
const loader = new GLTFLoader();
loader.load(
  "/Rokoko/1.gltf",
  function (gltf) {
    model = gltf.scene;
    model.scale.set(1, 1, 1);
    scene.add(model);

    // Identify neck bone after model is loaded
    identifyNeckBone();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

let time = 0;

// Update the animate function to include Neck animation
function animate() {
  requestAnimationFrame(animate);
  time += 0.03; // Controls the speed of the animation
  animateNeck(time);
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});