import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 70, 300)
// Load and display the first model by default
let currentModel;
const loader = new GLTFLoader();
loader.load('./public/Rokoko/1.gltf', (gltf) => {
    currentModel = gltf.scene;
    scene.add(currentModel);
    document.getElementById('model-container').appendChild(renderer.domElement);
    animate();
});

// Handle model selection
const modelSelect = document.getElementById('model-select');
modelSelect.addEventListener('change', (event) => {
    const selectedModel = event.target.value;
loader.load(selectedModel, (gltf) => { 
        if (currentModel) {
            scene.remove(currentModel);
        }
        currentModel = gltf.scene;
        scene.add(currentModel);
    });
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}