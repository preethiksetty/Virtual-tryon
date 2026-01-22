// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set the background to a gradient color
scene.background = new THREE.Color(0xadd8e6); // Light blue background

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// OrbitControls for interactivity
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Camera positioning
camera.position.set(0, 1.5, 2); // Closer view of the model

// Load the base models (human models 1-4)
const loader = new THREE.GLTFLoader();
let baseModel;
let currentModelIndex = 0;

// Define model positions and sizes
const modelPositions = [
    { position: new THREE.Vector3(0, -1, 0), scale: new THREE.Vector3(0.5, 0.5, 0.5) }, // Model 1
    { position: new THREE.Vector3(0, -1, 0), scale: new THREE.Vector3(0.5, 0.5, 0.5) }, // Model 2
    { position: new THREE.Vector3(0, 1.055, 0), scale: new THREE.Vector3(0.23, 0.2425, 0.23) }, // Model 3
    { position: new THREE.Vector3(0, -1, 0), scale: new THREE.Vector3(0.5, 0.478, 0.5) }, // Model 4
];

// Define clothing items and their specific positions and scales
const clothingItems = {
    tops: [
        //{ path: 'assets/tops/top1.glb', position: new THREE.Vector3(0, -1.6, 0), scale: new THREE.Vector3(1.43, 1.65, 1.45) },
        { path: 'assets/tops/top2.glb', position: new THREE.Vector3(0, -0.87, 0.1), scale: new THREE.Vector3(1.3, 1.15, 1.9) },
        { path: 'assets/tops/top3.glb', position: new THREE.Vector3(0, -0.7988, 0.0835), scale: new THREE.Vector3(0.034, 0.027, 0.055) },
        { path: 'assets/tops/top4.glb', position: new THREE.Vector3(0, -1.15, 0.1), scale: new THREE.Vector3(1.38, 1.42, 1.41) },
        { path: 'assets/tops/top5.glb', position: new THREE.Vector3(0, -0.85, 0), scale: new THREE.Vector3(0.0013, 0.0011, 0.0025) },
        { path: 'assets/tops/top6.glb', position: new THREE.Vector3(0, -0.9, 0.08), scale: new THREE.Vector3(1.15, 1.148, 1.87) },
        //{ path: 'assets/tops/top7.glb', position: new THREE.Vector3(0, -6, 0), scale: new THREE.Vector3(0.5, 0.5, 0.5) },
        //{ path: 'assets/tops/top8.glb', position: new THREE.Vector3(0, -6, 0), scale: new THREE.Vector3(0.7, 0.7, 1) },
    ],
    bottoms: [
        { path: 'assets/bottoms/bottom1.glb', position: new THREE.Vector3(0, -1, 0.2), scale: new THREE.Vector3(1.58, 1.55, 1.55) },
        { path: 'assets/bottoms/bottom2.glb', position: new THREE.Vector3(0, -0.41, 0.07), scale: new THREE.Vector3(0.73, 0.65, 1) },
        //{ path: 'assets/bottoms/bottom3.glb', position: new THREE.Vector3(0, -1, 0.1), scale: new THREE.Vector3(1.55, 1.2, 1.65) },
        { path: 'assets/bottoms/bottom4.glb', position: new THREE.Vector3(0, -1.07, 0.13), scale: new THREE.Vector3(1.29,1.22, 1.53) },
    ],
    glasses: [
        { path: 'assets/glasses/glass1.glb', position: new THREE.Vector3(0, 1.145, 0.2), scale: new THREE.Vector3(0.12, 0.12, 0.12) },
        { path: 'assets/glasses/glass2.glb', position: new THREE.Vector3(0, 1.125, 0.25), scale: new THREE.Vector3(0.0009, 0.0009, 0.0009) },
        { path: 'assets/glasses/glass3.glb', position: new THREE.Vector3(0, 1.08, 0.2), scale: new THREE.Vector3(0.008, 0.008, 0.008) },
        { path: 'assets/glasses/glass4.glb', position: new THREE.Vector3(0, 1.145, 0.15), scale: new THREE.Vector3(0.13, 0.13, 0.13) },
    ],
    hats: [
        { path: 'assets/hats/hat1.glb', position: new THREE.Vector3(0.08, 1.275, 0.05), scale: new THREE.Vector3(0.16, 0.16, 0.16) },
        { path: 'assets/hats/hat2.glb', position: new THREE.Vector3(0, 1.23, 0), scale: new THREE.Vector3(0.15, 0.15, 0.15) },
        { path: 'assets/hats/hat3.glb', position: new THREE.Vector3(-0.05, 1.41, 0.12), scale: new THREE.Vector3(2.5, 2.5, 2.5) },
        { path: 'assets/hats/hat4.glb', position: new THREE.Vector3(0, 1.39, 0), scale: new THREE.Vector3(0.13, 0.13, 0.13) },
    ],
};

let currentClothing = {
    tops: null,
    bottoms: null,
    glasses: null,
    hats: null,
};

// Function to apply clothing with specific size and position
function applyClothing(category, index) {
    if (currentClothing[category]) {
        scene.remove(currentClothing[category]);
    }

    const { path, position, scale } = clothingItems[category][index];
    loader.load(
        path,
        (gltf) => {
            currentClothing[category] = gltf.scene;
            currentClothing[category].position.copy(position);
            currentClothing[category].scale.copy(scale);
            scene.add(currentClothing[category]);
        },
        undefined,
        (error) => console.error(`Error loading ${category}:`, error)
    );
}

// Switch between models
function switchModel() {
    if (baseModel) {
        scene.remove(baseModel);
    }

    currentModelIndex = (currentModelIndex + 1) % modelPositions.length;
    const modelGLTF = `assets/models/model${currentModelIndex + 1}.glb`;

    loader.load(
        modelGLTF,
        (gltf) => {
            baseModel = gltf.scene;
            const { position, scale } = modelPositions[currentModelIndex];
            baseModel.scale.set(scale.x, scale.y, scale.z);
            baseModel.position.set(position.x, position.y, position.z);
            scene.add(baseModel);
        },
        undefined,
        (error) => console.error('Error loading model:', error)
    );
}

// Event listeners for clothing buttons
let currentIndices = { tops: 0, bottoms: 0, glasses: 0, hats: 0 };

document.getElementById('topBtn').addEventListener('click', () => {
    currentIndices.tops = (currentIndices.tops + 1) % clothingItems.tops.length;
    applyClothing('tops', currentIndices.tops);
});

document.getElementById('bottomBtn').addEventListener('click', () => {
    currentIndices.bottoms = (currentIndices.bottoms + 1) % clothingItems.bottoms.length;
    applyClothing('bottoms', currentIndices.bottoms);
});

document.getElementById('hatBtn').addEventListener('click', () => {
    currentIndices.hats = (currentIndices.hats + 1) % clothingItems.hats.length;
    applyClothing('hats', currentIndices.hats);
});

document.getElementById('glassesBtn').addEventListener('click', () => {
    currentIndices.glasses = (currentIndices.glasses + 1) % clothingItems.glasses.length;
    applyClothing('glasses', currentIndices.glasses);
});

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
