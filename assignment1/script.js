import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/***SETUP */
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}
/***SCENE */
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(5.6, 2.3, 7)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**MESHES */
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

// cavewall
const caveWallGeometry = new THREE.PlaneGeometry(10, 5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

// barrierWall
const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI * 0.5
barrierWall.position.set(5, -1.5, 0)
scene.add(barrierWall)

// caveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.y = -2.5
scene.add(caveFloor)

// OBJECTS
// sphere main
const sphereGeometry = new THREE.SphereGeometry(0.7)
const sphereMaterial = new THREE.MeshNormalMaterial()
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(9, 4.8, 0)
sphere.castShadow = true
scene.add(sphere)

// wall 1
const walliGeometry = new THREE.BoxGeometry(0.2, 0.5)
const walliMaterial = new THREE.MeshNormalMaterial()
const walli = new THREE.Mesh(walliGeometry, walliMaterial)
walli.position.set(10, 4.8, 1.3)
walli.castShadow = true
scene.add(walli)

// wall 6
const wallviGeometry = new THREE.BoxGeometry(0.2, 0.5)
const wallviMaterial = new THREE.MeshNormalMaterial()
const wallvi = new THREE.Mesh(wallviGeometry, wallviMaterial)
wallvi.position.set(10, 4.8, -1.3)
wallvi.castShadow = true
scene.add(wallvi)

// sun
const sunGeometry = new THREE.SphereGeometry(0.3)
const sunMaterial = new THREE.MeshLambertMaterial({
    emissive: new THREE.Color('orange'),
    emissiveIntensity: 20
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)
// Directional light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
) 
directionalLight.target = caveWall
directionalLight.position.set(18, 2.4, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)

//Directional Light Helper
//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/**UI */
/*
const ui = new dat.GUI()

const uiObject = {}

uiObject.reset = () =>
{
    directionalLight.position.set(8.6, 1.7, 0)
}

// Directional light
const lightPositionFolder = ui.addFolder('Directonal Light Position')

lightPositionFolder
    .add(directionalLight.position, 'x')
    .min(-10)
    .max(20)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(uiObject, 'reset')
    .name('Reset position')
*/
/* DOM INTERACTIONS */
// domOject
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false,
    fifthChange: false
}
// continue reading
document.querySelector('#continue-reading').onclick = function() {
    document.querySelector('#part-two').classList.remove('hidden')
    document.querySelector('#part-one').classList.add('hidden')
    domObject.part = 2
}

// restart
document.querySelector('#restart').onclick = function() {
    document.querySelector('#part-two').classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
    domObject.part = 1

    // reset domObject changes
    domObject.firstChange = false
    domObject.secondChange = false
    domObject.thirdChange = false
    domObject.fourthChange = false
    domObject.fifthChange = false

    // reset directional light
    directionalLight.position.set(10, 2.5, 0)
}

// first change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true
}
// second change
document.querySelector('#second-change').onclick = function() {
    domObject.secondChange = true
}
// third change
document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange = true
}
// fourth change
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}
// fitfth change
document.querySelector('#fifth-change').onclick = function() {
    domObject.fifthChange = true
}

/***ANIMATION LOOP */
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate objects
    //torusKnot.rotation.y = elapsedTime
    //torusKnot.position.z = Math.sin(elapsedTime * 0.5) * 2

    // update directional light helper
    //directionalLightHelper.update()

    // log camera position

    // Update sun position to match directional light position

    sun.position.copy(directionalLight.position)

    // Controls
    controls.update()

    // DOM INTERACTIONS

    // part 1
    if(domObject.part === 1){
        camera.position.set(1.1, 0.3, 1.3)
        camera.lookAt(-5, 0, 1.5)
    }

    // part 2
    if(domObject.part === 2){
        camera.position.set(9.9, 3.5, 18)
        camera.lookAt(0, 0, 0)
    }
    // first change
    if(domObject.firstChange){
        walli.position.y = 1.5
        wallvi.position.y = 1.5
    }

    // second change 
    if(domObject.secondChange){
        sphere.position.z = Math.sin(elapsedTime * 0.5) * 1.4

        
    }
    // third-change
    if(domObject.thirdChange){
        sphere.position.z = 0

    }
    // fourth-change
    if(domObject.fourthChange){
        directionalLight.position.z = Math.sin(elapsedTime * 0.2) * 17
        walli.castShadow = false
        wallvi.castShadow = false
        sphere.castShadow = false
    }
    // fifth change
    if(domObject.fifthChange){
        sphere.position.y = 1.5
    }
    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()