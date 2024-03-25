import * as THREE from "three"

/****SETUP */

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
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

/***MESHES */
//Cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshNormalMaterial()
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

cube.position.set(-1, -4, -3)
scene.add(cube)

/***ANIMATION LOOP */
const clock = new THREE.Clock()

// Animate
const animation = () => {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()