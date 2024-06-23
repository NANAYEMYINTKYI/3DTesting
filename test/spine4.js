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
let spine4Bone;

// Function to identify and store the Spine4 bone
function identifySpine4Bone() {
  if (model) {
    model.traverse((node) => {
      if (node.isBone && node.name === "Spine4") {
        spine4Bone = node;
        console.log("Spine4 bone identified:", spine4Bone.name);
      }
    });
  }
}

// Function to animate the Spine4
function animateSpine4(time) {
  if (spine4Bone) {
    // Subtle twisting movement
    spine4Bone.rotation.y = Math.sin(time * 0.5) * 0.5; // Slight twist left and right
    
    // // Breathing-like movement
    // spine4Bone.rotation.x = Math.sin(time * 0.5) * 0.05 + 0.05; // Slight forward tilt with "breathing" motion
    
    // // Very subtle side-to-side lean
    // spine4Bone.rotation.z = Math.sin(time * 0.3) * 0.03;
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

    // Identify Spine4 bone after model is loaded
    identifySpine4Bone();
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
  animateSpine4(time);

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// import * as THREE from "three";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// // Scene setup
// const scene = new THREE.Scene();

// // Renderer setup
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.outputColorSpace = THREE.SRGBColorSpace;
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0x00ff00);
// renderer.setPixelRatio(window.devicePixelRatio);
// document.body.appendChild(renderer.domElement);

// // Camera setup
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 1, 2);

// // Lighting setup
// const spotlight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
// spotlight.position.set(0, 25, 0);
// scene.add(spotlight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(5, 10, 7.5);
// scene.add(directionalLight);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// let model;
// let leftShoulderBone;
// let leftArmBone;
// let leftForearmBone;
// let leftHandBone;

// // Function to identify and store the left arm bones
// function identifyLeftArmBones() {
//   if (model) {
//     model.traverse((node) => {
//       if (node.isBone) {
//         switch(node.name) {
//           case "LeftShoulder":
//             leftShoulderBone = node;
//             break;
//           case "LeftArm":
//             leftArmBone = node;
//             break;
//           case "LeftForeArm":
//             leftForearmBone = node;
//             break;
//           case "LeftHand":
//             leftHandBone = node;
//             break;
//         }
//       }
//     });
//     console.log("Left arm bones identified:", 
//       leftShoulderBone?.name, 
//       leftArmBone?.name, 
//       leftForearmBone?.name, 
//       leftHandBone?.name
//     );
//   }
// }

// // Function to animate the left arm
// function animateLeftArm(time) {
//   if (leftShoulderBone) {
//     // Shoulder movement
//     leftShoulderBone.rotation.y = Math.sin(time * 0.5) * 0.2; // Slight rotation
//     leftShoulderBone.rotation.z = Math.sin(time * 0.7) * 0.15; // Up and down movement
//   }
  
//   if (leftArmBone) {
//     // Upper arm movement
//     leftArmBone.rotation.x = Math.sin(time) * 0.5; // Forward and backward swing
//     leftArmBone.rotation.z = Math.cos(time * 0.8) * 0.2; // Slight side to side
//   }
  
//   if (leftForearmBone) {
//     // Forearm movement
//     leftForearmBone.rotation.x = Math.sin(time * 1.2) * 0.3; // Elbow bend
//   }
  
//   if (leftHandBone) {
//     // Hand movement
//     leftHandBone.rotation.x = Math.sin(time * 1.5) * 0.2; // Wrist flexion
//     leftHandBone.rotation.y = Math.cos(time * 1.3) * 0.1; // Slight wrist rotation
//   }
// }

// const loader = new GLTFLoader();
// loader.load(
//   "/Rokoko/1.gltf",
//   function (gltf) {
//     model = gltf.scene;
//     model.scale.set(1, 1, 1);
//     scene.add(model);

//     // Log model structure and properties
//     if (model) {
//       model.traverse((node) => {
//         console.log(node.name, node.type);
//         if (node.isMesh) {
//           console.log("Material:", node.material);
//         } else if (node.isBone) {
//           console.log(node.name);
//           console.log("Position:", node.position);
//           console.log("Rotation:", node.rotation);
//         }
//       });
//     }
//     model.position.set(0, 0, 0);

//     // Identify left arm bones after model is loaded
//     identifyLeftArmBones();
//   },
//   undefined,
//   function (error) {
//     console.error(error);
//   }
// );

// let time = 0;

// function animate() {
//   requestAnimationFrame(animate);

//   time += 0.03; // Controls the speed of the animation
//   animateLeftArm(time);

//   renderer.render(scene, camera);
// }

// animate();

// // Handle window resize
// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });