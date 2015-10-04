/***********************************************************/
/***********************************************************/
/*****************Html Three Js Code ***********************/
var sceneWindow = null;
var $3dmodal = null;
var loadingDocument = false;
var htmlCode = "<html><head><title>Scratch3d</title><style>body { margin: 0; }canvas { width: 100%; height: 100% }</style></head><body><div id='container' style='width:1425px; height:720px;'></div><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/three.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/CameraControls.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/SceneComponents.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/TrackballControls.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/SceneStyles.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/OBJLoader.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/threex.grassground.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/BlendCharacter.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/CharecterControles.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/tween.min.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/FirstPersonControls.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/lookAtControls.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/fpvObjectControles.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/threex.planets-master/threex.planets.js'></script><script type='text/javascript' src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/Physics/CollisionRayCaster.js'></script><!-- load the font files --><script src='fonts/gentilis_bold.typeface.js'></script><script src='fonts/gentilis_regular.typeface.js'></script><script src='fonts/optimer_bold.typeface.js'></script><script src='fonts/optimer_regular.typeface.js'></script><script src='fonts/helvetiker_bold.typeface.js'></script><script src='fonts/helvetiker_regular.typeface.js'></script><script src='fonts/droid/droid_sans_regular.typeface.js'></script><script src='fonts/droid/droid_sans_bold.typeface.js'></script><script src='fonts/droid/droid_serif_regular.typeface.js'></script><script src='fonts/droid/droid_serif_bold.typeface.js'></script><script>var scene = new THREE.Scene();var cube = null;var camera = new THREE.PerspectiveCamera( 75, document.getElementById('container').offsetWidth/document.getElementById('container').offsetHeight, 0.1, 1000 );var renderer = new THREE.WebGLRenderer();renderer.setSize(document.getElementById('container').offsetWidth,document.getElementById('container').offsetHeight);document.getElementById('container').appendChild( renderer.domElement );function init_window(sceneStyle){console.log('Init Window');init_Scene(sceneStyle);init_Render();init_Camera(6,8,5.6);if(RENDERER==null || SCENE==null || CAMERA==null){return false;}else {firstRender(SCENE, CAMERA); animate(); console.log('RUNN CALLED'); return true;}}//INITIALIZES THE RENDERER OBJECTfunction init_Render(){console.log('init_Render', window.devicePixelRatio );RENDERER = new THREE.WebGLRenderer({ alpha: alpha });RENDERER.setSize(window.innerWidth, window.innerHeight);document.body.appendChild(RENDERER.domElement);}//INITIALIZES THE CAMERA OBJECT//@params Y postion, Z postion, X rotation function init_Camera(posY, posZ, rotaX){console.log('init_Camera');CAMERA = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);CAMERA.position.x = 1; CAMERA.position.y = 1;CAMERA.position.z = 1;CAMERA.rotation.x = 0.0;CAMERA.rotation.y = 0.0;CAMERA.rotation.z = 0.0;}function init_Scene(sceneStyle){SCENE = new THREE.Scene;//Turns the gravity of the scene on to a defualt of -50 along the y axis/*if(sceneStyle[1]=='On'){console.log('gravity: ', sceneStyle[1]);SCENE.setGravity(new THREE.Vector3( 0, -50, 0 ));}*///Creates a basic grid sceneif(sceneStyle[0]=='Grid'){var light= new THREE.AmbientLight( 0x020202 );SCENE.add( light );SCENESTYLES.gridSize = parseInt(sceneStyle[1])*parseInt(sceneStyle[2]);var plane = SCENESTYLES.GRID();SCENE.add(plane);}else if(sceneStyle[0]=='Space'){var light= new THREE.AmbientLight( 0x020202 );SCENE.add( light );var light= new THREE.AmbientLight( 0x020202 );SCENE.add( light );// add a light in frontvar light= new THREE.DirectionalLight('white', 1);light.angle = (Math.PI/5);light.position.set(0.5, 0.5, 2);SCENE.add( light );// add a light behindvar light= new THREE.DirectionalLight('white', 1);light.angle = (Math.PI/5);light.position.set(-0.5, 2.5, -2);SCENE.add( light );var starFeild = THREEx.Planets.createStarfield(parseInt(sceneStyle[1]));SCENE.add(starFeild);}//////////////////////////////Creates a Flat grass scene///////////////////////////else if(sceneStyle[0]=='Grass'){console.log(sceneStyle);alpha = true;//Straight from https://github.com/jeromeetienne/threex.grassground//Thanks jeromeetienne for all the amazing game extentions!!!///////////////////////////////////////////////////////////////////////////////////ADD Light//////////////////////////////var light= new THREE.AmbientLight( 0x020202 );SCENE.add( light );// add a light in frontvar light= new THREE.DirectionalLight('white', 1);light.position.set(0.5, 0.5, 2);SCENE.add( light );// add a light behindvar light= new THREE.DirectionalLight('white', 1);light.position.set(-0.5, 2.5, -2);SCENE.add( light );/////////////////////////////////////////////////////////////////////////////////////Adds Sky//////////////////////////////////////////////////////////////////////////////////////////// directly from @mrdoob in http://mrdoob.com/lab/javascript/webgl/clouds/var canvas= document.createElement( 'canvas' );var context= canvas.getContext( '2d' );canvas.width= 32;canvas.height= window.innerHeight;var gradient= context.createLinearGradient( 0, 0, 0, canvas.height );gradient.addColorStop(0 , '#1e4877');gradient.addColorStop(0.5, '#4584b4');context.fillStyle= gradient;context.fillRect(0, 0, canvas.width, canvas.height);var url= canvas.toDataURL('image/png');document.body.style.background= 'url(' + url + ')';/////////////////////////////////////////////////////////////////////////////////////Adds Ground///////////////////////////////////////////////////////////////////////////////////////var groundMesh = new THREEx.GrassGround({width : 10, // the width of the mesh, default to 1 height : 10, // the height of the mesh, default to 1 repeatX : sceneStyle[1], // the number of time the texture is repeated in X, default to 1 repeatY : sceneStyle[2], // the number of time the texture is repeated in Y, default to 1});//Scales Mesh resulting in a smother grass look gets the average between width and height (((parseInt(sceneStyle[1])+(parseInt(sceneStyle[1]))/2)groundMesh.scale.multiplyScalar((parseInt(sceneStyle[1])+parseInt(sceneStyle[2]))/2);SCENE.add(groundMesh);}}//-----------------------------------------------------------------------------function onWindowResize() { CAMERA.aspect = window.innerWidth / window.innerHeight; CAMERA.updateProjectionMatrix(); RENDERER.setSize( window.innerWidth, window.innerHeight ); }//RENDERS THE THE RENDER OBJECT FOR THE FIRST TIME ONCE THE WINDOW IS CREATEDfunction firstRender(scene, camera){RENDERER.render(scene, camera);} function render(){var delta = 0.75*clock.getDelta();CollisionDetection.update();if(TrackBallControls){RENDERER.render(SCENE, CAMERA);if(controls!=null){controls.update(delta);}}else{if(controls!=null){controls.update(delta);}RENDERER.render(SCENE, CAMERA);}//THREE.AnimationHandler.update( delta );} //Gloabal variables for hadeling camera updatesvar INV_MAX_FPS = 1/60;var frameDelta = 0;function animate(){//THREE.AnimationHandler.update( delta );//TWEEN.update();//SCENE.simulate(); // run physicsif(objControls!=null){objControls.update(clock.getDelta());}requestAnimationFrame(animate);render();}</script></body></html>";
/*****************Html Three Js Code ***********************/
/***********************************************************/
/***********************************************************/

/***********************************************************/
/***********************************************************/
/***************Extension Local Data ***********************/

    var descriptor = {
        blocks: [],

        menus: {
            Scenes: ['Grid','Grass','Space','Blank'],
            Toggle: ['On','Off'],
            Camera: ['Perspective'],
            CameraRotation: ['Left', 'Right', 'Up', 'Down', 'Roll Left', 'Roll Right'],
            CameraOrbit: ['Orbit Left', 'Orbit Right', 'Orbit Up', 'Orbit Down'],
            CameraControls: ['First Person', 'Mouse/Trackball'],
            Sides: ['Back', 'Front'],
            Move: ['Left', 'Right', 'Up', 'Down','Forward','Back'],
            Shapes: ['Cube', 'Sphere', 'Circle','Cylinder', 'Dodecahedron', 'Icosahedron', 'Plane', 'Ring', 'Torus'],
            Planets: ['Earth', 'Sun','Moon', 'Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto! #savepluto'],   
            Materials:['MeshBasicMaterial', 'MeshNormalMaterial','MeshDepthMaterial', 'MeshLambertMaterial','MeshPhongMaterial'],
            Images:['Crate', 'Brick', 'Earth', 'Moon', 'Grass','dirt'],
            Keys: ['space', 'up arrow', 'down arrow', 'right arrow', 'left arrow', 'a',  'b',  'c',  'd',  'e',  'f',  'g',  'h', 'i',  'j',  'k',  'l',  'm',  'n',  'o',  'p',  'q',  'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',], 
            Charecters: ['Marine','Car', 'Cat', 'Cat1', 'Lego Vader', 'Pirate Ship'],
            Lights: ['Ambient','Directional','Point'],
            Axis3: ['X','Y','Z'],
            Axis2: ['X','Y'],
            MouseOptions: ['Click', 'Down', 'Up', 'Double Click'],
        }
    };

   
/***************Extension Local Data ***********************/
/***********************************************************/
/***********************************************************/


(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.initWorld = function(sceneType, width, height){
        sceneWindow =  window.open();
        sceneWindow.document.write(htmlCode);
        
    };
    ext.uploadFile = function(){
        console.log("Space");
        sceneWindow.document.init_window("Space");
    };



    //Reloads The extention to update block data
    function updateExtension(){
    ScratchExtensions.unregister('scratch3d');
    ScratchExtensions.register('scratch3d', descriptor, ext);
    }

    // Block and block menu descriptions
        descriptor.blocks.push(['', 'New 3D World %m.Scenes Width: %n Height: %n', 'initWorld', 'Grass', 10, 10]);
        descriptor.blocks.push(['r', 'New Shape', 'newShape']);
        descriptor.blocks.push(['null', 'Upload', 'uploadFile']);
    //

    // Register the extension
    ScratchExtensions.register('scratch3d', descriptor, ext);
})({});

