import * as THREE from 'three';
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
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 1, 5)


// Ground setup
//const groundGeometry = new THREE.PlaneGeometry(40, 40, 32, 32);
//groundGeometry.rotateX(-Math.PI / 2);
//const groundMaterial = new THREE.MeshStandardMaterial({
    //color: 0x555555,
    //side: THREE.DoubleSide
//});
//const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
//scene.add(groundMesh);

// Lighting setup
const spotlight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
spotlight.position.set(0, 25, 0);
scene.add(spotlight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

let model;
let mixer;

// Load the GLTF model
const loader = new GLTFLoader();
loader.load(
    '/monkey_dancing/scene.gltf', // Corrected path
    function (gltf) {
        model = gltf.scene;
        model.scale.set(1, 1, 1); // Adjust scale if necessary
        scene.add(model);

        // Initialize the animation mixer and play all animations
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
        });
    },
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    // Update the mixer for animations
    if (mixer) {
        mixer.update(delta);
    }
    renderer.render(scene, camera);
}

const clock = new THREE.Clock();
animate();


// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
