
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
const canvas = document.querySelector('.webgl2')

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
camera.position.set(0, 0, 20)
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
// Sphere Geometry
const torusGeometry = new THREE.TorusGeometry(0.5)

// Sphere Materials
const blueMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('blue')
})
const blueMaterial2 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('blue')
})
const purpleMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('purple')
})
const purpleMaterial2 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('purple')
})

const blackMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('black')
})
const blackMaterial2 = new THREE.MeshStandardMaterial({
    color: new THREE.Color('black')
})

const drawTorus = (i, material) =>
{
    const torus = new THREE.Mesh(torusGeometry, material)
    torus.position.y = (Math.random() - 0.5) * 10
    torus.position.z = (Math.random() - 0.5) * 10
    torus.position.x = i - 10

    torus.rotation.x = Math.random() * 2 * Math.PI
    torus.rotation.y = Math.random() * 2 * Math.PI
    torus.rotation.z = Math.random() * 2 * Math.PI

    torus.randomizer = Math.random()

    scene.add(torus)
}


/**********************
** TEXT PARSERS & UI **
***********************/
let preset = {}

const uiobj = {
    text: '',
    textArray: [],
    term1: 'encountered',
    term2: 'carnival',
    term3: 'jest',
    term4: 'cough',
    term5: 'masonry',
    term6: 'satisfied',
    rotateCamera: false,
    animateBubbles: false
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
    findTermInParsedText(uiobj.term1, blueMaterial)
    findTermInParsedText(uiobj.term2, blueMaterial2)
    // Find term 2
    findTermInParsedText(uiobj.term3, purpleMaterial)
    findTermInParsedText(uiobj.term4, purpleMaterial2)
    // Find term 3
    findTermInParsedText(uiobj.term5, blackMaterial)
    findTermInParsedText(uiobj.term6, blackMaterial2)

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
         
         // call drawsphere function 5 times using converted n value
         for(let a=0; a < 5; a++)
         {
            drawTorus(n, material)
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
    container: document.querySelector('#parent2')
})

// Interaction Folders
    // spheres Folder
    const spheresFolder = ui.addFolder('Filter Terms')

    spheresFolder
        .add(blueMaterial, 'visible')
        .name(`${uiobj.term1}`)
        spheresFolder
        .add(blueMaterial2, 'visible')
        .name(`${uiobj.term2}`)

    spheresFolder
        .add(purpleMaterial, 'visible')
        .name(`${uiobj.term3}`)
        spheresFolder
        .add(purpleMaterial2, 'visible')
        .name(`${uiobj.term4}`)

    spheresFolder
        .add(blackMaterial, 'visible')
        .name(`${uiobj.term5}`)
        spheresFolder
        .add(blackMaterial2, 'visible')
        .name(`${uiobj.term6}`)

    spheresFolder
        .add(uiobj, 'animateBubbles')
        .name('Animate Torus')

    // Camera Folder
    const cameraFolder = ui.addFolder('Camera')

    cameraFolder
        .add(uiobj, 'rotateCamera')
        .name('Rotate Camera')

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()
console.log(scene.children)

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

    // Animate Bubbles
    if(uiobj.animateBubbles){
        for(let i=0; i < scene.children.length; i++)
        {
            if(scene.children[i].type === "Mesh")
            {
                scene.children[i].scale.x = Math.sin(elapsedTime * scene.children[i].randomizer)
                scene.children[i].scale.y = Math.sin(elapsedTime * scene.children[i].randomizer)
                scene.children[i].scale.z = Math.sin(elapsedTime * scene.children[i].randomizer)
            }
        }
    }

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()
