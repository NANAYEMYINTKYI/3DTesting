import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera
(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z=5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
let model;

loader.load('/model/mixamo.gltf', function (gltf) {
    model = gltf.scene;
    scene.add(model);
    // Example: Traversing the model to log its structure
    if (model) {
        model.traverse(node => {
        console.log(node.name, node.type);
        if (node.isMesh) {
            console.log('Geometry:', node.geometry);
            console.log('Material:', node.material);
        } else if (node.isBone) {
            console.log('Bone:', node.name);
            console.log('Position:', node.position);
            console.log('Rotation:', node.rotation);
        }
        });
    }
    // Optional: Adjust position, scale, or rotation of the model here
    model.position.set(0, 0, 0); // Example position adjustment
    //model.rotation.set(0, Math.PI / 2, 0); // Example initial rotation adjustment
}, undefined, function (error) {
    console.error(error);
});

// Define basic lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);
let rotatedirection=1;
// Animation parameters
const rotationSpeed = 0.02; // radians per frame
// RotationDegree
const minRotationY = -Math.PI / 4; // (-45 degrees) 
const maxRotationY = Math.PI / 4;  // (45 degrees) 
let neckbone;
function selectpart(){
    if (model) {
        model.traverse(node => {
            if (node.isBone && node.name === 'mixamorig1Neck') {
                neckbone=node;
            }
        });
    }
}
function adjustmovement(){
    // Example: Accessing and manipulating bones
    selectpart();
    if (neckbone) {
        // Check if the rotation is within constraints
        if (neckbone.rotation.y >= maxRotationY) {
            rotatedirection = -1; // Switch to rotating left

        }
        else if (neckbone.rotation.y <= minRotationY) {
            rotatedirection = 1; // Switch to rotating right
        }
        
        neckbone.rotation.y += rotationSpeed * rotatedirection;
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
main.js