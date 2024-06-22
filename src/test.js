import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { KeyframeTrack, AnimationClip } from 'three';

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
let model, mixer, clock = new THREE.Clock();

loader.load('/mixamo/mixamo.gltf', function(gltf) {
    model = gltf.scene;
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);

            // Create keyframe tracks for animation
            const neckRotationKF = new KeyframeTrack('mixamorig1Neck.rotation[y]', [0, 1, 2], [0, Math.PI / 4, 0]);
            const handRotationKF = new KeyframeTrack('mixamorig1LeftHand.rotation[z]', [0, 1, 2], [0, -Math.PI / 4, 0]);

            // Create an animation clip containing the keyframe tracks
            const clip = new AnimationClip('dance', 3, [neckRotationKF, handRotationKF]);
            const action = mixer.clipAction(clip);
            action.play();

            animate(); // Start the animation loop
        }, undefined, function(error) {
            console.error(error);
        });

        // Define basic lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5).normalize();
        scene.add(directionalLight);

function animate() {
    requestAnimationFrame(animate);

    if (mixer) {
        const delta = clock.getDelta();
        mixer.update(delta);
    }

    renderer.render(scene, camera);
}