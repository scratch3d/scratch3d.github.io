/***********************************************************/
/***********************************************************/
/*****************Html Three Js Code ***********************/
var sceneWindow = null;
var $3dmodal = null;
var loadingDocument = false;
var htmlCode = "<html><head><title>Scratch3d</title><style>body { margin: 0; }canvas { width: 100%; height: 100% }</style></head><body><div id='container' style='width:1425px; height:720px;'></div><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/three.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/CameraControls.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/SceneComponents.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/TrackballControls.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/SceneStyles.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/OBJLoader.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/threex.grassground.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/BlendCharacter.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/CharecterControles.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/tween.min.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/FirstPersonControls.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/lookAtControls.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/fpvObjectControles.js'></script><script src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/threeJScontrols/threex.planets-master/threex.planets.js'></script><script type='text/javascript' src='http://scratch3d.github.io/tierTwo/Scratch3D_Beta/server/Physics/CollisionRayCaster.js'></script><script>function init_window(sceneStyle){console.log('Init Window');init_Scene(sceneStyle);init_Render();init_Camera(6,8,5.6);if(RENDERER==null || SCENE==null || CAMERA==null){return false;}else {firstRender(SCENE, CAMERA); animate(); console.log('RUNN CALLED'); return true;}}function connectionTest(message){console.log(message);return message;} </script></body></html>";
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
        console.log("Space3", sceneWindow.document);
        console.log("Hello",sceneWindow.connectionTest("World"));
        var sceneParams = [sceneType, width, height];
        sceneWindow.init_window(sceneParams);
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

