const THREE = require('three');
const PointerLockControls = require('three-pointerlock');
const getScene = require('../getScene');
const pointerLocks = require('../pointLockers');
const letsMove = require('../letsMove');
const controls = require('../controls');
const getRenderer = require('./getRenderer');
const getLight = require('./getLight');
const getFloor = require('./getFloor');
const cubes = require('../cubes');
const blocker = require('../blocker');
// const OBJLoader = require('three-obj-loader');
// OBJLoader(THREE);
// const MTLLoader = require('three-mtl-loader');


// var player = {
//   height: 1.8,
//   speed: 0.2,
//   turnSpeed: Math.PI * 0.02
// };

// create the scene

const init = () => {
  // const camera = new THREE.PerspectiveCamera(75, -50, 1, 1000);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  //let's create the scene
  const scene = new THREE.Scene();
  //and our camera

  //camera.position.set(0, 0, -5);
  // camera.lookAt(0, 500, 0); // direction camera is looking
  getScene.init(scene);
  const pointerLockControls = new PointerLockControls(camera);
  blocker(pointerLockControls);
  scene.add(pointerLockControls.getObject());
  controls.init(scene, pointerLockControls);
  pointerLocks.init(pointerLockControls);

  const raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
  // create cubes
  const obj1 = cubes.getObj1();
  const obj2 = cubes.getObj2();
  const obj3 = cubes.getObj3();
  const obj4 = cubes.getObj4();
  const obj5 = cubes.getObj5();
  const obj6 = cubes.getObj6();

  scene.add(obj1, obj2, obj3, obj4, obj5, obj6);



  //objects
  // const loader = new MTLLoader();
  // loader.load('images/Oak_Green_01.mtl', function(materials) {
  //   materials.preload();
  //   const objLoader = new THREE.OBJLoader();
  //   objLoader.setMaterials(materials);
  //
  //   objLoader.load('images/Oak_Green_01.obj', function(tree) {
  //     scene.add(tree)
  //   })
  //
  // })

  //lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const light = getLight();
  scene.add(light);

  //let's get the floor

  const floor = getFloor();
  scene.add(floor);
  const objects = [floor];

  const renderer = getRenderer();
  document.body.appendChild(renderer.domElement);


  window.addEventListener('resize', onWindowResize, false);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  return {
    camera,
    scene,
    renderer,
    raycaster,
    objects
  };
}


module.exports = init;
