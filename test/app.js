import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

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