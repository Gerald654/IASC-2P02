import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth / 2.5,
    height: window.innerWidth / 2.5,
    aspectRatio: 1
}

/***********
** SCENE **
***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(3, 0, 20)
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

/***********
** LIGHTS **
************/
// Directional Light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/***********
** MESHES **
************/
// Cube Geometry
const sphereGeometry = new THREE.SphereGeometry(0.5)

// Cube Materials
const yellowMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('yellow')
})
const yellowMaterial2 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('yellow')
})
const yellowMaterial3 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('yellow')
})
const yellowMaterial4 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('yellow')
})
const yellowMaterial5 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('yellow')
})

const orangeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('orange')
})
const orangeMaterial2 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('orange')
})
const orangeMaterial3 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('orange')
})
const orangeMaterial4 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('orange')
})
const orangeMaterial5 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('orange')
})

const redMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('red')
})
const redMaterial2 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('red')
})
const redMaterial3 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('red')
})
const redMaterial4 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('red')
})
const redMaterial5 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('red')
})

const drawSphere = (i, material) =>
{
    const sphere = new THREE.Mesh(sphereGeometry, material)
    sphere.position.y = i - 10
    sphere.position.x = (Math.random() - 0.5) * 10
    sphere.position.z = (Math.random() - 0.5) * 10
    

    sphere.rotation.x = Math.random() * 2 * Math.PI
    sphere.rotation.y = Math.random() * 2 * Math.PI
    sphere.rotation.z = Math.random() * 2 * Math.PI

    scene.add(sphere)
}



/**********************
** TEXT PARSERS & UI **
***********************/
let preset = {}

const uiobj = {
    text: '',
    textArray: [],
    term1: 'vowed',
    term2: 'nature',
    term3: 'idea',
    term4: 'thought',
    term5: 'revenge',
    term6: 'encountered',
    term7: 'carnival',
    term8: 'vaults',
    term9: 'nitre',
    term10: 'cough',
    term11: 'hesitated',
    term12: 'drink',
    term13: 'wine',
    term14: 'tier',
    term15: 'masonry',
    rotateCamera: false
}

// Text Parsers
// Parse Text and Terms
const parseTextandTerms = () =>
{
    // Strip periods and downcase text
    const parsedText = uiobj.text.replaceAll(".", "").toLowerCase()
    //console.log(parsedText)

    // Tokenize text
    uiobj.textArray = parsedText.split(/[^\w']+/)
    //console.log(uiobj.textArray)

    // Find term 1
    findTermInParsedText(uiobj.term1, yellowMaterial)

    // Find term 2
    findTermInParsedText(uiobj.term2, yellowMaterial2)

    // Find term 3
    findTermInParsedText(uiobj.term3, yellowMaterial3)
    findTermInParsedText(uiobj.term4, yellowMaterial4)
    findTermInParsedText(uiobj.term5, yellowMaterial5)
    findTermInParsedText(uiobj.term6, orangeMaterial)
    findTermInParsedText(uiobj.term7, orangeMaterial2)
    findTermInParsedText(uiobj.term8, orangeMaterial3)
    findTermInParsedText(uiobj.term9, orangeMaterial4)
    findTermInParsedText(uiobj.term10, orangeMaterial5)
    findTermInParsedText(uiobj.term11, redMaterial)
    findTermInParsedText(uiobj.term12, redMaterial2)
    findTermInParsedText(uiobj.term13, redMaterial3)
    findTermInParsedText(uiobj.term14, redMaterial4)
    findTermInParsedText(uiobj.term15, redMaterial5)

}

const findTermInParsedText = (term, material) =>
{
    for (let i=0; i < uiobj.textArray.length; i++)
    {
        //console.log(i, uiobj.textArray[i])
        if(uiobj.textArray[i] === term)
        {
         //console.log(i, term)
         // convert i into n, which is a value between 0 and 20
         const n = (100 / uiobj.textArray.length) * i * 0.2
         
         // call drawCube function 5 times using converted n value
         for(let a=0; a < 5; a++)
         {
            drawSphere(n, material)
         }

        }
    }
}

// Load source text
fetch("https://raw.githubusercontent.com/Gerald654/IASC-2P02/main/assignment2/Assets/poe.txt")
    .then(response => response.text())
    .then((data) =>
    {
        uiobj.text = data
        parseTextandTerms()
    }
    )

// UI
const ui = new dat.GUI({
    container: document.querySelector('#parent1')
})

// Interaction Folders
    // Cubes Folder
    const cubesFolder = ui.addFolder('Filter Terms')

    cubesFolder
        .add(yellowMaterial, 'visible')
        .name(`${uiobj.term1}`)
    cubesFolder
        .add(yellowMaterial2, 'visible')
        .name(`${uiobj.term2}`)
    cubesFolder
        .add(yellowMaterial3, 'visible')
        .name(`${uiobj.term3}`)
    cubesFolder
        .add(yellowMaterial4, 'visible')
        .name(`${uiobj.term4}`)
    cubesFolder
        .add(yellowMaterial5, 'visible')
        .name(`${uiobj.term5}`)

    cubesFolder
        .add(orangeMaterial, 'visible')
        .name(`${uiobj.term6}`)
    cubesFolder
        .add(orangeMaterial2, 'visible')
        .name(`${uiobj.term7}`)
    cubesFolder
        .add(orangeMaterial3, 'visible')
        .name(`${uiobj.term8}`)
    cubesFolder
        .add(orangeMaterial4, 'visible')
        .name(`${uiobj.term9}`)
    cubesFolder
        .add(orangeMaterial5, 'visible')
        .name(`${uiobj.term10}`)

    cubesFolder
        .add(redMaterial, 'visible')
        .name(`${uiobj.term11}`)
    cubesFolder
        .add(redMaterial2, 'visible')
        .name(`${uiobj.term12}`)
    cubesFolder
        .add(redMaterial3, 'visible')
        .name(`${uiobj.term13}`)
    cubesFolder
        .add(redMaterial4, 'visible')
        .name(`${uiobj.term14}`)
    cubesFolder
        .add(redMaterial5, 'visible')
        .name(`${uiobj.term15}`)

    // Camera Folder
    const cameraFolder = ui.addFolder('Camera')

    cameraFolder
        .add(uiobj, 'rotateCamera')
        .name('Rotate Camera')

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Orbit Controls
    controls.update()

    // Camera Rotation
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