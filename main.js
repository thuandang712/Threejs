import { OrbitControls } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/controls/OrbitControls.js';

var earthOrbitRadius = 100,
    earthOrbitAngle = 0,
    earthOrbitSpeed = 0.2;

// // Debug
// const gui = new dat.GUI(); 

// Threejs needs three basic things: scene, camera and renderer
// Scene
const scene = new THREE.Scene(); // scene is like a container that holds objects, lights, and camera

// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); //field of view, aspect, near plane, far plane
// set camera position
camera.position.setY(80);
camera.position.setZ(50);

// Renderer: to render graphic to the screen
const renderer = new THREE.WebGLRenderer({
   canvas: document.querySelector('#bg'), // target the canvas object
   antialias: true // to make high resolution
}); 

renderer.setPixelRatio( window.devicePixelRatio ); // to make high resolution
renderer.setSize( window.innerWidth, window.innerHeight ); // set size of the renderer

/* This will automatically create a canvas where the renderer draws its output;
use only if there is no canvas already created in the html
// document.body.appendChild( renderer.domElement ); */

// ------------Objects--------- //
// Create the earth
const earthTexture = new THREE.TextureLoader().load('earth.jpg')

const earth = new THREE.Mesh( // mesh = geometry + material
    new THREE.SphereGeometry( 5, 32, 32 ), // create a sphere, radius, width segment, height segment.
    new THREE.MeshStandardMaterial({ // mesh standard material is affected by light
        //color: 0xff0000,
        map: earthTexture // map earth texture to the sphere
    })
); 

scene.add( earth ); // add earth to the scene

// Create the sun
const sunTexture = new THREE.TextureLoader().load('sun.jpg')

const sun = new THREE.Mesh(
    new THREE.SphereGeometry ( 20, 32, 32),
    new THREE.MeshBasicMaterial({ // mesh basic material is not be affected by lights
        map: sunTexture
    })
);

scene.add(sun)
// ------------Objects--------- //

// Add background
const spaceTexture = new THREE.TextureLoader().load('space_background.jpg');
scene.background = spaceTexture;


// ------------Lights--------- //
const pointLight = new THREE.PointLight( 0xffffff ) // white
pointLight.position.set(30,30,30)

// ambient light illuminates all objects in the scene equally
const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add(pointLight, ambientLight);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)
// ------------Lights--------- //

// This will let user view the object freely
const controls = new OrbitControls(camera, renderer.domElement);

// add star to scene
// function addStar() {
//     const geometry = new THREE.SphereGeometry( 0.1, 10, 10 );
//     const material = new THREE.MeshBasicMaterial({color: 0xffffff} );
//     const star = new THREE.Mesh( geometry, material );

//     const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(100) );
//     star.position.set(x, y, z)

//     scene.add( star );
// }

// Array(1000).fill().forEach(addStar);

// var theEarthobj = new THREE.Object3D()
// theEarthobj.rotation.z = 23.439281 * Math.PI / 180; //tilt of earth in radians;
// scene.add(theEarthobj)
// var axes = new THREE.AxisHelper(10);
// earth.add(axes);
// theEarthobj.add(earth)


// This function will create a loop that causes the renderer to draw the scene every time the screen is refreshed (60fps)
function animate() {
	requestAnimationFrame( animate );
    render();
}

function render() {

    // run the earth's orbit around the Sun
    earthOrbitAngle += earthOrbitSpeed; 
    var radians = earthOrbitAngle * Math.PI / 180; // degree to radian
    // update earth's position
    earth.position.x = Math.cos(radians) * earthOrbitRadius;
    earth.position.z = Math.sin(radians) * earthOrbitRadius;

    controls.update()

	renderer.render( scene, camera );
}

animate();