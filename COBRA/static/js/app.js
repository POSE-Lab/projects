const canvas = document.getElementById('poseCanvas');
const width = canvas.width = 500;  // Set canvas width
const height = canvas.height = 500; // Set canvas height

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

renderer.setSize(width, height);

// Load background image
const textureLoader = new THREE.TextureLoader();
textureLoader.load('static/images/object.png', (texture) => {
    scene.background = texture; // Set the loaded texture as the scene background
}, undefined, (error) => {
    console.error('Error loading texture:', error); // Log any error
});

// Add lighting (Phong shading works with point light)
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// Load the PLY file using PLYLoader
const loader = new THREE.PLYLoader();
loader.load('../static/models/object.ply', function (geometry) {
  geometry.computeVertexNormals(); // Compute normals if not available in the file
  
  // Set up a material with Phong shading
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,  // Object color
    specular: 0x555555,  // Phong highlight color
    shininess: 30       // Shininess of the object
  });

  const object = new THREE.Mesh(geometry, material);
  scene.add(object);

  // Optional: Positioning the object
  object.position.set(0, 0, 0);
  object.scale.set(1, 1, 1);  // Scale as needed

// Position the camera so that the cube is visible
camera.position.z = -300;

// Function to update cube position and rotation based on sliders
function updateCube() {
    const translateX = parseFloat(document.getElementById('translateX').value);
    const translateY = parseFloat(document.getElementById('translateY').value);
    const translateZ = parseFloat(document.getElementById('translateZ').value);
    
    const rotateX = THREE.MathUtils.degToRad(parseFloat(document.getElementById('rotateX').value));
    const rotateY = THREE.MathUtils.degToRad(parseFloat(document.getElementById('rotateY').value));
    const rotateZ = THREE.MathUtils.degToRad(parseFloat(document.getElementById('rotateZ').value));

    cube.position.set(translateX, translateY, translateZ);
    cube.rotation.set(rotateX, rotateY, rotateZ);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    updateCube();  // Update the cube's position and rotation
    renderer.render(scene, camera);
}

// Start the animation
animate();
});
