//variables for setup

let container;
let camera;
let renderer;
let scene;
let house;

function init() {
  container = document.querySelector('.scene');

  // create scene
  scene = new THREE.Scene();

  // camera
  const fov = 35; //field of view
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1; //near limit
  const far = 500; //far limit

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0,0,8);

  //light
  const ambient = new THREE.AmbientLight(0x404044, 10);
  scene.add(ambient);

  // directional light
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(15,15,30);
  scene.add(light);

  //renderer
  renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load model
  let loader = new THREE.GLTFLoader();
  loader.load("./3d/scene.gltf", function(gltf){
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  house.rotation.z += 0.005;
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth/container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);
console.log("Hello there!");
console.log("I am Asher!");