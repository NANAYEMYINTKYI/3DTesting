//spine1 is the one above hip 
//used this as spine in JSON
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
let spine1Bone;

// Function to identify and store the Spine1 bone
function identifySpine1Bone() {
  if (model) {
    model.traverse((node) => {
      if (node.isBone && node.name === "Spine1") {
        spine1Bone = node;
        console.log("Spine1 bone identified:", spine1Bone.name);
      }
    });
  }
}

// Function to animate the Spine1
function animateSpine1(time) {
  if (spine1Bone) {
    // // Torso twisting movement
    // spine1Bone.rotation.y = Math.sin(time * 0.5) * 0.5; // Twist left and right
    
    // // Slight forward/backward tilt
    // spine1Bone.rotation.x = Math.sin(time * 0.3) * 0.1;
    
    // Subtle side-to-side lean
    spine1Bone.rotation.z = Math.sin(time * 1.1) * 0.2;
  }
}

const loader = new GLTFLoader();
loader.load(
  "/Rokoko/1.gltf",
  function (gltf) {
    model = gltf.scene;
    model.scale.set(1, 1, 1);
    scene.add(model);

    // Log model structure and properties
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

    // Identify Spine1 bone after model is loaded
    identifySpine1Bone();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

let time = 0;

function animate() {
  requestAnimationFrame(animate);

  time += 0.03; // Controls the speed of the animation
  animateSpine1(time);

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});