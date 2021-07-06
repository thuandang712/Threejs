import { OrbitControls } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/controls/OrbitControls.js';

// Debug
const gui = new dat.GUI(); 

// Scene
const scene = new THREE.Scene(); // scene is like a container that holds objects, lights, and camera

// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); //field of view, aspect, near plane, far plane

// Renderer: to render graphic to the screen
const renderer = new THREE.WebGLRenderer({
   canvas: document.querySelector('#bg'), // target the canvas object
   antialias: true // to make high res
}); 

renderer.setPixelRatio( window.devicePixelRatio ); // to make high res
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

/* This will automatically create a canvas where the renderer draws its output;
use only if there is no canvas already created in the html
// document.body.appendChild( renderer.domElement ); */

// Create a sphere
const geometry = new THREE.SphereGeometry( 10, 32, 32 ); // create a sphere

// earth texture
const earthTexture = new THREE.TextureLoader().load('earth.jpg')

const material = new THREE.MeshStandardMaterial( { 
    //color: 0xff0000,
    map: earthTexture}); // map earth texture to the sphere

const sphere = new THREE.Mesh( geometry, material ); // mesh = geometry + material
scene.add( sphere ); // add sphere to the scene

// background texture
const spaceTexture = new THREE.TextureLoader().load('space_background.jpg');
scene.background = spaceTexture;


// Lights
const pointLight = new THREE.PointLight( 0xffffff ) // white
pointLight.position.set(10,10,10)
scene.add(pointLight)

// ambient light illuminates all objects in the scene equally
const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambientLight );

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)


// let user view the object freely
const controls = new OrbitControls(camera, renderer.domElement);


// add star to scene
function addStar() {
    const geometry = new THREE.SphereGeometry( 0.1, 10, 10 );
    const material = new THREE.MeshBasicMaterial({color: 0xffffff} );
    const star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(100) );
    star.position.set(x, y, z)

    scene.add( star );
}

Array(500).fill().forEach(addStar);


// This will create a loop that causes the renderer to draw the scene every time the screen is refreshed (60fps)
function animate() {
	requestAnimationFrame( animate );

    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.005;
    sphere.rotation.z += 0.01;

    controls.update()

	renderer.render( scene, camera );
}
animate();