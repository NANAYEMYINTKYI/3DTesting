import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
let model;

loader.load(
  "monkey_dancing/test/test-2.gltf",
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
    if (model) {
        model.traverse((node) => {
          console.log(node.name, node.type);
          if (node.isMesh) {
            //console.log("Geometry:", node.geometry);
            console.log("Material:", node.material);
          } else if (node.isBone) {
            console.log(node.name);
            console.log("Position:", node.position);
            console.log("Rotation:", node.rotation);
          }
        });
      }
      model.position.set(0,0,0);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Define basic lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);
let rotatedirection = 1;
// Animation parameters
const rotationSpeed = 0.02; // radians per frame
// RotationDegree
const minRotationY = -Math.PI / 4; // (-45 degrees)
const maxRotationY = Math.PI / 4; // (45 degrees)
let rightleg;
function selectpart() {
  if (model) {
    model.traverse((node) => {
      if (node.isBone && node.name === "mixamorig1RightLeg") {
        rightleg = node;
      }
    });
  }
}
function adjustmovement() {
  // Example: Accessing and manipulating bones
  selectpart();
  if (rightleg) {
    // Check if the rotation is within constraints
    if (rightleg.rotation.y >= maxRotationY) {
      rotatedirection = -1; // Switch to rotating left
    } else if (rightleg.rotation.y <= minRotationY) {
      rotatedirection = 1; // Switch to rotating right
    }

    rightleg.rotation.y += rotationSpeed * rotatedirection;
    //console.log(`Neck rotation: (${neckbone.rotation.x}, ${neckbone.rotation.y}, ${neckbone.rotation.z})`);
  }
}
// Define an animation loop function
function animate() {
  requestAnimationFrame(animate);
  adjustmovement();
  renderer.render(scene, camera);
}
// Start animation loop
animate();


