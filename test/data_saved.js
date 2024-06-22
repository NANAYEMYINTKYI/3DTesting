import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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
let bones = {};
let animationData;
const clock = new THREE.Clock();

// Load animation data
fetch('data_saved.json')
  .then(response => response.json())
  .then(data => {
    animationData = data.scene.actors[0].body;
    // Start the animation once data is loaded
    animate();
  })
  .catch(error => console.error('Error loading animation data:', error));

// Load GLTF model
const loader = new GLTFLoader();
loader.load(
  "/Rokoko/1.gltf",
  function (gltf) {
    model = gltf.scene;
    model.scale.set(1, 1, 1); // Adjust scale if necessary
    scene.add(model);

    // Store references to bones
    model.traverse((node) => {
      if (node.isBone) {
        bones[node.name] = node;
        console.log("Bone found:", node.name);
      }
    });

    model.position.set(0, 0, 0);
  },
  undefined,
  function (error) {
    console.error('Error loading GLTF model:', error);
  }
);

function applyAnimation(time) {
  if (!animationData || !model) return;

  for (let boneName in animationData) {
    if (bones[boneName]) {
      const boneData = animationData[boneName];
      const bone = bones[boneName];

      // Apply position
      bone.position.set(
        boneData.position.x,
        boneData.position.y,
        boneData.position.z
      );

      // Apply rotation (assuming the rotation is a quaternion)
      bone.quaternion.set(
        boneData.rotation.x,
        boneData.rotation.y,
        boneData.rotation.z,
        boneData.rotation.w
      );
    }
  }

  // Apply face animation if available
  if (animationData.face) {
    // You'll need to implement face animation separately
    // as it depends on how your model handles facial expressions
    console.log("Face animation data available but not implemented");
  }
}

function animate() {
  requestAnimationFrame(animate);

  // Apply animation
  applyAnimation(clock.getElapsedTime());

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});