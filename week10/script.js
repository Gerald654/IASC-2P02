import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/*** SETUP */
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}
/**** SCENE  */
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('white')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(0, 0, -20)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Orbit Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**LIGHTS */
// Directional Light
const directonalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directonalLight)

/**MESHES */
// Cube Geometry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

// cube material 
const redMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('red')
})
const greenMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('green')
})
const blueMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('blue')
})

const drawCube = (i, material) =>
{
    const cube = new THREE.Mesh(cubeGeometry, material)
    cube.position.x = (Math.random() - 0.5) * 10
    cube.position.z = (Math.random() - 0.5) * 10
    cube.position.y = i - 10

    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI

    scene.add(cube)
}

drawCube(greenMaterial)

/** TEXT PARSES */
let preset = {}

const uiobj = {
    text: '',
    textArray: [],
    term1: 'dudley',
    term2: 'snape',
    term3: 'quirrell',
    rotateCamera: false,
    reveal(){
        // save terms to uiobj
        preset = ui.save()

        // parse text and terms
        parseTextandTerms()

        // hide termsfolder ui
        termsFolder.hide()

        // show interactionFolder ui
        createInteractionFolder()

    }
}

// Text Parsers
// Load source text
fetch("https://raw.githubusercontent.com/amephraim/nlp/master/texts/J.%20K.%20Rowling%20-%20Harry%20Potter%201%20-%20Sorcerer's%20Stone.txt")
    .then(response => response.text())
    .then((data) =>
    {
        uiobj.text = data
       
    }
    )

    // Parse text and Terms
const parseTextandTerms = () =>
{
    // strip periods and downcase text
    const parsedText = uiobj.text.replaceAll(".", "").toLowerCase()
    //console.log(parsedText)

    // Tokenize text
    uiobj.textArray = parsedText.split(/[^\w']+/)
    
    // find term 1
    findTermInParsedText(uiobj.term1, redMaterial)

    // find term 1
    findTermInParsedText(uiobj.term2, greenMaterial)

    // find term 1
    findTermInParsedText(uiobj.term3, blueMaterial)
}

const findTermInParsedText = (term, material) =>
{
    for (let i=0; i < uiobj.textArray.length; i++)
    {
        if(uiobj.textArray[i] === term)
        {
        //console.log(i, term)
        const n = (100 / uiobj.textArray.length) * i * 0.2
        
        // call drawCube function using converted n value
        for(let a=0; a < 5; a++)
        {
            drawCube(n, material)
        }

        }
    }
}

//UI
const ui = new dat.GUI()

// Terms folder
const termsFolder = ui.addFolder('Enter Terms')

termsFolder
    .add(uiobj, 'term1')
    .name('Red Term')

termsFolder
    .add(uiobj, 'term2')
    .name('Green Term')

termsFolder
    .add(uiobj, 'term3')
    .name('Blue Term')

termsFolder
    .add(uiobj, 'reveal')
    .name('Reveal')

// Interaction folders
const createInteractionFolder = () =>
{
    // cubes folder
    const cubesFolder = ui.addFolder('Filter Terms')

    cubesFolder
        .add(redMaterial, 'visible')
        .name(`${uiobj.term1}`)

    cubesFolder
        .add(greenMaterial, 'visible')
        .name(`${uiobj.term2}`)

    cubesFolder
        .add(blueMaterial, 'visible')
        .name(`${uiobj.term3}`)

    // camera folder
    const cameraFolder = ui.addFolder('Camera')

    cameraFolder
        .add(uiobj, 'rotateCamera')
        .name('Rotate Camera')
}

/*** ANIMATION LOOP */
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return ElapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Orbit Controls
    controls.update()
    
    // camera rotation
    if(uiobj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime * 0.2) * 16
        camera.position.z = Math.cos(elapsedTime * 0.2) * 16
    }
    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()