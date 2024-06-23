import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1); // Set clear color to black for contrast
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5); // Move camera back a bit to see objects

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);


let model;

const loader = new GLTFLoader();
loader.load(
  '/Rokoko/1.gltf',
  function (gltf) {
    console.log('Model loaded successfully:', gltf);
    model = gltf.scene;
    model.scale.set(1, 1, 1); // Adjust scale if necessary
    scene.add(model);

    // Log model structure and properties (logging and debugging purposes)
    if (model) {
      model.traverse((node) => {
        console.log(node.name, node.type);
        if (node.isMesh) {
          console.log('Material:', node.material);
        } else if (node.isBone) {
          console.log(node.name);
          console.log('Position:', node.position);
          console.log('Rotation:', node.rotation);
        }
      });
    }
    model.position.set(0, 0, 0);
  },
  undefined,
  function (error) {
    console.error('An error occurred while loading the model:', error);
  }
);
let righthand; // Ensure righthand is defined
let rotationSpeed = 0.01; // Set a rotation speed
const maxRotationY = Math.PI / 4; // Maximum rotation in the Y axis (45 degrees)
const minRotationY = -Math.PI / 4; // Minimum rotation in the Y axis (-45 degrees)
const maxRotationX = Math.PI / 6; // Maximum rotation in the X axis (30 degrees)
const minRotationX = -Math.PI / 4; // Minimum rotation in the X axis (-45 degrees)
const maxRotationZ = Math.PI / 6; // Maximum rotation in the Z axis (30 degrees)
const minRotationZ = -Math.PI / 4; // Minimum rotation in the Z axis (-45 degrees)

let rotatedirection = 1; // Initial rotation direction

function selectpart() {
  if (model) {
    model.traverse((node) => {
      if (node.isBone && node.name === 'RightShoulder') {
        righthand = node;
      }
    });
  }
}

function adjustmovement() {
  if (righthand) {
    // Check if the rotation is within constraints
    if (righthand.rotation.z >= maxRotationZ) {
      rotatedirection = 1; // Switch to rotating left
    } else if (righthand.rotation.z <= minRotationZ) {
      rotatedirection = -1; // Switch to rotating right
    }

    righthand.rotation.z += rotationSpeed * rotatedirection;
    // console.log(`Right hand rotation: (${righthand.rotation.x}, ${righthand.rotation.y}, ${righthand.rotation.z})`);
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  selectpart(); // Ensure we select the part
  adjustmovement(); // Adjust the movement
  renderer.render(scene, camera);
}

animate();


// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
