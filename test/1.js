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
let mixer;

const loader = new GLTFLoader();
loader.load(
  "/Rokoko/1.gltf",
  function (gltf) {
    model = gltf.scene;
    model.scale.set(1, 1, 1); // Adjust scale if necessary
    scene.add(model);

    // Initialize the animation mixer and play all animations
    // mixer = new THREE.AnimationMixer(model);
    // gltf.animations.forEach((clip) => {
    //   mixer.clipAction(clip).play();
    // });

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

// let rotatedirection = 1;
// const rotationSpeed = 0.02;
// const minRotationY = -Math.PI / 4;
// const maxRotationY = Math.PI / 4;
// let rightleg;

// function selectpart() {
//   if (model) {
//     model.traverse((node) => {
//       if (node.isBone && node.name === "mixamorig1RightLeg") {
//         rightleg = node;
//       }
//     });
//   }
// }

// function adjustmovement() {
//   selectpart();
//   if (rightleg) {
//     if (rightleg.rotation.y >= maxRotationY) {
//       rotatedirection = -1;
//     } else if (rightleg.rotation.y <= minRotationY) {
//       rotatedirection = 1;
//     }
//     rightleg.rotation.y += rotationSpeed * rotatedirection;
//   }
// }

const clock = new THREE.Clock();

// function animate() {
//   requestAnimationFrame(animate);

//   const delta = clock.getDelta();
//   if (mixer) {
//     mixer.update(delta);
//   }

//   adjustmovement();
//   renderer.render(scene, camera);
// }

// animate();
 renderer.render(scene, camera);

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});