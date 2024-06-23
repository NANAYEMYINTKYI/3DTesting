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
let hipBone;

// Function to identify and store the hip bone
function identifyHipBone() {
    if (model) {
        model.traverse((node) => {
            if (node.isBone && node.name === "Hips") {  // Make sure this matches your model's hip bone name
                hipBone = node;
                console.log("Hip bone identified:", hipBone);
            }
        });
    }
}

// Function to animate the hip
function animateHip(time) {
    if (hipBone) {
        // Create a swaying motion
        // hipBone.position.x = Math.sin(time * 0.5) * 0.05; // Side-to-side movement ลอยเปนผีเลย ตัวตรงเฉยแต่โยกซ้ายขวา
        // hipBone.position.y = Math.abs(Math.sin(time * 1)) * 0.03; // Slight up and down movement แนวแกนyปกติเลย
        
        // Add a slight rotation
        hipBone.rotation.z = Math.sin(time * 0.3) * 0.1; // Rotation around vertical axis แกว่งเป็นลูกตุ้มนาฬิกา
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

        // Identify hip bone after model is loaded
        identifyHipBone();
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
    animateHip(time);

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});