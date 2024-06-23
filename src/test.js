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

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

let model;

//reset bone rotation
// function resetBoneRotations(object) {
//   object.traverse((node) => {
//     if (node.isBone) {
//       node.rotation.set(0, 0, 0);
//     }
//   });
// }

const loader = new GLTFLoader();
loader.load(
  "/Rokoko/1.gltf",
  function (gltf) {
    model = gltf.scene;
    model.scale.set(1, 1, 1); // Adjust scale if necessary
    scene.add(model);

    // if (gltf.animations && gltf.animations.length > 0) {
    //   console.log("Model contains animations:", gltf.animations.length);
    //   // Reset all bone rotations to ensure no animation is applied
    //   // resetBoneRotations(model);
    // }

    // Log model structure and properties(logging and debugging purposes)
    if (model) {
      model.traverse((node) => {
        console.log(node.name, node.type);
        if (node.isMesh) {
          console.log("Material:", node.material);
        } else if (node.isBone) {
          console.log(node.name);
          console.log("Position:", node.position);
          console.log("Rotation:", node.rotation);
        }
      });
    }
    model.position.set(0, 0, 0);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
let rotatedirection = 2
// Animation parameters
const rotationSpeed = 0.05; // radians per frame
// RotationDegree
const minRotationY= Math.PI ; // (-45 degrees)
const maxRotationY = -Math.PI; // (45 degrees)
let LeftFoot;

function selectpart() {
  if (model) {
    model.traverse((node) => {
      if (node.isBone && node.name === "LeftFoot") {
        LeftFoot = node;
      }
    });
  }
}
function adjustmovement() {
  // Example: Accessing and manipulating bones
  selectpart();
  if (function adjustmovement() {
    // Example: Accessing and manipulating bones
    selectpart();
    if (LeftFoot) {
      // Check if the rotation is within constraints
      if (LeftFoot.rotation.y >= maxRotationY) {
        rotatedirection = -1; // Switch to rotating left
      } else if (LeftFoot.rotation.y <= minRotationY) {
        rotatedirection = 1; // Switch to rotating right
      }
  
      LeftFoot.rotation.y += rotationSpeed * rotatedirection;
      //console.log(`Neck rotation: (${neckbone.rotation.x}, ${neckbone.rotation.y}, ${neckbone.rotation.z})`);
    }
  }) {
    // Check if the rotation is within constraints
    if (LeftFoot.rotation.y >= maxRotationY) {
      rotatedirection = -1; // Switch to rotating left
    } else if (LeftFoot.rotation.y <= minRotationY) {
      rotatedirection = 1; // Switch to rotating right
    }

    LeftFoot.rotation.y += rotationSpeed * rotatedirection;
    //console.log(`Neck rotation: (${neckbone.rotation.x}, ${neckbone.rotation.y}, ${neckbone.rotation.z})`);
  }
}

function animate() {
  requestAnimationFrame(animate);
  adjustmovement();
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});