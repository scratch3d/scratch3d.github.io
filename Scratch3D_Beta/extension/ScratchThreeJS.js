
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-66361143-1', 'auto');
  ga('send', 'pageview');

(function(ext) {
	var win = null;
	var canvas = null;
	var ctx = null;
	var lastKeyEvent = null;
	//var liveURL = "http://localhost:8888/main.html";
	var shapes = [];
	var materials = [];
	var charecters = [];
	//var liveURL = "http://033ae09.netsolhost.com//gsd2014team5/Localhost/main.html";
	var liveURL = "http://scratch3d.github.io/Scratch3D_Beta/server/scratch3d.html";
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };    
	
	//Sets up the connection to the Three.js server 
	//Opens the window and 
	//A wait block is required for this function do to the fact that we must wait for the entire 
	//three.js file to load befor we can countinue exicuting our program.
	ext.initWorld = function(scene, width, height, cameraType, callback) {
		//Opens the three.js window
		//win = window.open (liveURL, "", "width=window.width, height=window.height");
		//Test URLS
		window.addEventListener("message", receiveMessage, false);
		
		function receiveMessage()
		{
			console.log(event.data);
			lastKeyEvent = event.data;
    	}
		win = window.open (liveURL, "", "width=window.width, height=window.height");

		/*
		**Checks Browser Version in win returns null
		**
		*/
		if(win==null){
			var browserData = navigator.userAgent;
			if(browserData.indexOf("Safari")>-1){
			alert("This extension must open in a separate window. \rTo run please enable pop-ups from this site. \rTo enable PopUps: \rClick Safari, \rClick Preferences, \rClick security, \rUncheck Block pop-up windows, \rThen refresh page. ");
			}
		}
		//**//
		
        setTimeout(function (){
			var message = "INIT_"+scene+","+width+","+height;
			win.postMessage(message,liveURL);
			callback(); //Calls back to Scaratch proggram to allow exicution flow to reStart once the page has been loaded
        }, 1000);
	};

	



	//Rotates the camera in a user supplied direction by a user supplied number of degrees
	ext.rotateCamera = function(direction, degrees){
		
		//Checks to make sure the user has supplied a Direction 
		if(direction != "Direction" && degrees != 0){
		//Creates the message to be sent to the main.html 
		//Messge will be formated as tag, turn direction, number of degrees to rotate. exp.  "CAMERAROTATE_Left,15"	
		var message = "CAMERAROTATE_"+direction + "," + degrees;
		//Sends Message to the main.htlm event listener with the rotate tags along with user supplied params 
		win.postMessage(message, liveURL);
		console.log("Direction: ", direction, "Degrees: ", degrees);
		}
	} 
	
	
	ext.orbitCamera = function(direction){
		var message = "CAMERAORBIT_" + direction;
		win.postMessage(message, liveURL);
		console.log("orbit Camera Called", message);
	}
	
	ext.moveCamera = function(direction, steps){
		var message = "CAMERAMOVE_"+direction+","+steps;
		win.postMessage(message, liveURL);
		console.log("Move Camera Called", message);
	}

	ext.cameraFallow = function(objectID, direction){
		var message = "CAMERAFOLLOW_"+objectID+","+direction;
		win.postMessage(message, liveURL);
	}
	
	ext.createShape = function(shape, l,w,h, locX,locY, locZ){
		console.log("desc", descriptor);
		console.log("ext", ext);
		var shapeID = generatID(shape);
		shapes.push(shapeID);
		var message = "CREATESHAPE_"+shape+','+l+','+w+','+h+','+locX+','+locY+','+locZ+','+shapeID;
		win.postMessage(message, liveURL);
		return shapeID;
	}
	
	//Applies a given material to a given mesh and map a inage if supplied
	ext.applyMaterial = function(Material, shape_id, color, imageURL){
		var message = "APPLYMATERIAL_"+Material+','+shape_id +','+color+','+imageURL;
		win.postMessage(message, liveURL);
	}

	//Creates a new Material Variable
	ext.createMaterial = function(material){
		var materialID = generatID(material);
		materials.push(materialID);
		var message = "CREATEMATERIAL_" + material+','+materialID;
		win.postMessage(message, liveURL);
		return materialID;
	}

	ext.setObjectMaterial = function(materialID, ObjectID){
		if(shapes.indexOf(ObjectID)>-1&& materials.indexOf(materialID)>-1){
		var message = "SETMATERIAL_"+materialID+','+ObjectID;
		win.postMessage(message, liveURL);
		}
	}

	ext.materialColor = function(materialID, color){
		if(materials.indexOf(materialID)>-1){
		var message = "SETMATERIALCOLOR_"+materialID+','+color;
		win.postMessage(message, liveURL);	
		}
	}

	ext.setImage = function(materialID, url){
		path = 'images/'+url+'.jpg';
    console.log(path);
		if(materials.indexOf(materialID)>-1){
		var message = "SETMATERIALIMAGE_"+materialID+','+path;
		win.postMessage(message, liveURL);	
		}
	}
	ext.applyObjControls = function(shape_id, moveSpeed, lookSpeed){
		//Makes sure that the shape we are trying to move has been created
		console.log("Passed if Statment");
		if(shapes.indexOf(shape_id)>-1){
		var message = "APPLYOBJCONTRLS_"+shape_id+','+moveSpeed+','+lookSpeed;
		win.postMessage(message, liveURL);
		}
	}
	ext.moveShape = function(shape_id, direction, steps){
		//Makes sure that the shape we are trying to move has been created
		if(shapes.indexOf(shape_id)>-1){
		var message = "MOVESHAPE_"+shape_id+','+direction+','+steps;
		win.postMessage(message, liveURL);
		}
	}

  ext.rotateShape = function(shape_id, direction, steps){
    //Makes sure that the shape we are trying to move has been created
    if(shapes.indexOf(shape_id)>-1){
    var message = "ROTATESHAPE_"+shape_id+','+direction+','+steps;
    win.postMessage(message, liveURL);
    }
  }

	ext.camControls = function(controlType, moveSpeed, lookSpeed){
		var message = "SETCAMERACONTROLS_"+controlType+','+moveSpeed+','+lookSpeed;
		win.postMessage(message, liveURL);
	}

	ext.lookAt = function(object){
		console.log("Look At: ", object);
		var message = "SETCAMERALOOKAT_"+object;
		win.postMessage(message, liveURL);
	}

	ext.loadOBJ = function(URL){
		var objID = generatID("OBJ");
		shapes.push(objID);
		var message = "LOADOBJ_"+URL+','+objID;
		win.postMessage(message, liveURL);
		return objID;
	}

  ext.scaleObj = function(objectID, X, Y, Z){
    if(shapes.indexOf(objectID)>-1){
    var message = "SCALEOBJ_"+objectID+','+X+','+Y+','+Z;
    win.postMessage(message, liveURL);
    }
  }
	ext.add_Charecter = function(Charecter, locX, locY, locZ){
		console.log("ext.add_Charecter called ");
		var charecterID = generatID("CHARECTER");
		charecters.push(charecterID);
		shapes.push(charecterID);
		console.log("Charecter ID: ", charecterID);
		var message = "ADDCHARECTER_"+Charecter+','+locX+','+locY+','+locZ+','+charecterID;
		console.log("Charecter Message: ", message);
		win.postMessage(message, liveURL);
		return charecterID;
	}


  ext.addPlanet = function(Planet, locX, locY, locZ, diameter){
    var planetID = generatID("PLANET");
    shapes.push(planetID);
    var message = "ADDPLANET_"+Planet+','+locX+','+locY+','+locZ+','+diameter+','+planetID;
    win.postMessage(message, liveURL);
    return planetID;
  }

  ext.addLight = function(lightType, color, Intensity, locX, locY, locZ){
      var lightID = generatID("LIGHT");
      shapes.push(lightID);
      var message = "ADDLIGHT_"+lightType+','+color+','+Intensity+','+locX+','+locY+','+locZ+','+lightID;
      win.postMessage(message, liveURL);

      return lightID;
  }

	ext.key_Pressed = function(key) {
       // Reset alarm_went_off if it is true, and return true
       // otherwise, return false.

       //Checks to see if we are looking for a key command exp. "left arrow"
       //If so we the check to see if that key has been pressed 
       //If it has been pressed we then return true exectuing the code stack below the when pressed block
       if(key=='up arrow'){
       	if (lastKeyEvent == 38) {
           lastKeyEvent = null;
           return true;
           }
       }else if(key=="space"){
       	if (lastKeyEvent == 32) {
           lastKeyEvent = null;
           return true;
           }
       }else if(key=='down arrow'){
       	if (lastKeyEvent == 40) {
           lastKeyEvent = null;
           return true;
           }
       }else if(key=='right arrow'){
       	if (lastKeyEvent == 39) {
           lastKeyEvent = null;
           return true;
           }
       }else if(key=='left arrow'){
       	if (lastKeyEvent == 37) {
           lastKeyEvent = null;
           return true;
           }
       }
       //If a letter was entered insted of a command key
       else if(key=='a'){
       if (lastKeyEvent == 65) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*B*/
       else if(key=='b'){
       if (lastKeyEvent == 66) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*C*/
       else if(key=='c'){
       if (lastKeyEvent == 67) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*D*/
       else if(key=='d'){
       if (lastKeyEvent == 68) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*E*/
       else if(key=='e'){
       if (lastKeyEvent == 69) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*F*/
       else if(key=='f'){
       if (lastKeyEvent == 70) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*G*/
       else if(key=='g'){
       if (lastKeyEvent == 71) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*H*/
       else if(key=='h'){
       if (lastKeyEvent == 72) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*I*/
       else if(key=='i'){
       if (lastKeyEvent == 73) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*J*/
       else if(key=='j'){
       if (lastKeyEvent == 74) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*K*/
       else if(key=='k'){
       if (lastKeyEvent == 75) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*l*/
       else if(key=='l'){
       if (lastKeyEvent == 76) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*M*/
       else if(key=='m'){
       if (lastKeyEvent == 77) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*N*/
       else if(key=='n'){
       if (lastKeyEvent == 78) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*O*/
       else if(key=='o'){
       if (lastKeyEvent == 79) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*P*/
       else if(key=='p'){
       if (lastKeyEvent == 80) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*Q*/
       else if(key=='q'){
       if (lastKeyEvent == 81) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*R*/
       else if(key=='r'){
       if (lastKeyEvent == 82) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*S*/
       else if(key=='s'){
       if (lastKeyEvent == 83) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*T*/
       else if(key=='t'){
       if (lastKeyEvent == 84) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*U*/
       else if(key=='u'){
       if (lastKeyEvent == 85) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*V*/
       else if(key=='v'){
       if (lastKeyEvent == 86) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*W*/
       else if(key=='w'){
       if (lastKeyEvent == 87) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*X*/
       else if(key=='x'){
       if (lastKeyEvent == 88) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*Y*/
       else if(key=='y'){
       if (lastKeyEvent == 89) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*Z*/
       else if(key=='z'){
       if (lastKeyEvent == 90) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*0*/
       else if(key=='0'){
       if (lastKeyEvent == 48) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*1*/
       else if(key=='1'){
       if (lastKeyEvent == 49) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*2*/
       else if(key=='2'){
       if (lastKeyEvent == 50) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*3*/
       else if(key=='3'){
       if (lastKeyEvent == 51) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*4*/
       else if(key=='4'){
       if (lastKeyEvent == 52) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*5*/
       else if(key=='5'){
       if (lastKeyEvent == 53) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*6*/
       else if(key=='6'){
       if (lastKeyEvent == 54) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*7*/
       else if(key=='7'){
       if (lastKeyEvent == 55) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*8*/
       else if(key=='8'){
       if (lastKeyEvent == 56) {
           lastKeyEvent = null;
           return true;
       }
       }
       /*9*/
       else if(key=='9'){
       if (lastKeyEvent == 57) {
           lastKeyEvent = null;
           return true;
       }
       }
       return false;
    };

	// Block and block menu descriptions
    var descriptor = {
        blocks: [
      // Block type, block name, function name, param1 default value, param2 default value
      ['w', 'New 3D World %m.Scenes Width: %n Height: %n %m.Camera', 'initWorld', "Grass", 10, 10 , "Camera Type",ext],
      //['', 'Set Camera Controls  Up: %m.Keys Down: %m.Keys Left: %m.Keys Right: %m.Keys ', 'camControlsMove', 'w', 's','a','d'],
      ['', 'Add Camera Controls %m.CameraControls Move Speed: %n Look Speed: %n ', 'camControls','First Person', '200', '50'],
			//The camera orbit block to allow users to orbit the camera around a given point
			['', " Camera Look At: %s  %m.Sides","cameraFallow", "Variable", "Back"],
			     //The camera move block allows a user to move the camera in both the positive and negative direction of the X,Y, and Z axis.
      ['', " Move Camera  %m.Move  %n steeps ","moveCamera", "Direction", "1"],
      //The camera rotate block to allow users to rotate the view of the camra "Left", "Right", "Up" and "Down"
			['', "Rotate Camera %m.CameraRotation %n Degrees" , 'rotateCamera', "Direction", "1"],
			//The camera orbit block to allow users to orbit the camera around a given point
			//NEEDS TO BE FIXED LEAVE OUT FOR NOW!!!!
      //['', " Camera Orbit  %m.CameraOrbit ","orbitCamera", "Direction"],
//


			['r', 'New Shape %m.Shapes Size: %n %n %n Location: X: %n Y: %n Z: %n', 'createShape', 'Cube', '1','1','1','0','0','0'],
      ['r', 'New Light %m.Lights  Color: %s Intensity: %n X: %s Y: %s Z: %s','addLight','Ambient','white','0.7','0','0','0'],
      ['r', "New %m.Charecters Location: X: %n Y: %n Z: %n" , "add_Charecter", "Marine", '1','1','1'],
      ['r', 'New Planet %m.Planets X: %n Y: %n Z: %n Diameter: %n' ,'addPlanet','Earth','0','0','0','1'],
		        //Creates a new empty matrial and returns its object ID
      ['r', 'New Material %m.Materials', 'createMaterial','MeshBasicMaterial'],
      ['', 'Change Material %s to Color %s', 'materialColor', 'Variable','Random'],
      ['', 'Set %s Image %m.Images', 'setImage', 'Material', 'Crate'],

      ['', "Move %s %m.Move %n Steps" , 'moveShape', "Variable", "Left", 1],

      ['', "Rotate %s %m.Axis Degrees: %n " , 'rotateShape', "Variable", "Y", 1],
      
			//Adds a smothe movment control to any given object
			['', "Apply FPV Controls to Object: %s Move Speed: %n Turn Speed: %n" , 'applyObjControls', "Variable", "1", "2"],
			
			//Sets a given material to a given object
			['', 'Apply %s to %s', 'setObjectMaterial', 'Material', 'Shape'],

			['', 'Scale %s X: %n Y: %n Z: %n', 'scaleObj',"Variable", "1.0", "1.0", "1.0"],
			['h', "When %m.Keys  Pressed" , 'key_Pressed', "space"],
			['r', "Load Object URL: %s", "loadOBJ","http://goodwinj14.github.io/ThreeJS/server/threeJScontrols/shiptriangle.obj"],
        ],
		
		menus: {
		        Scenes: ['Grid','Grass','Space','Blank'],
				Camera: ['Perspective'],
				CameraRotation: ['Left', 'Right', 'Up', 'Down', 'Roll Left', 'Roll Right'],
				CameraOrbit: ['Orbit Left', 'Orbit Right', 'Orbit Up', 'Orbit Down'],
				CameraControls: ["First Person", "Mouse/Trackball"],
        Sides: ["Back", "Front"],
				Move: ['Left', 'Right', 'Up', 'Down','Forward','Back'],
				Shapes: ['Cube', 'Sphere', 'Circle','Cylinder', 'Dodecahedron', 'Icosahedron', 'Plane', 'Ring', 'Torus'],
		    Planets: ['Earth', 'Sun','Moon', 'Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto! #savepluto'],	
        Materials:['MeshBasicMaterial', 'MeshNormalMaterial','MeshDepthMaterial', 'MeshLambertMaterial','MeshPhongMaterial'],
		    Images:['Crate', 'Brick', 'Earth', 'Moon'],
		    Keys: ['space', 'up arrow', 'down arrow', 'right arrow', 'left arrow', 'a',  'b',  'c',  'd',  'e',  'f',  'g',  'h', 'i',  'j',  'k',  'l',  'm',  'n',  'o',  'p',  'q',  'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',], 
		    Charecters: ['Marine','Car', 'Cat', 'Cat1', 'Lego Vader', 'Pirate Ship'],
		    Lights: ['Ambient','Directional','Point'],
        Axis: ['X','Y','Z'],
        }
    };

    // Register the extension
   ScratchExtensions.register('Scratch Three JS', descriptor, ext);
})({});

//Generates A random id key to go with a newly created object
var idCounter = 0;
function generatID(objectType){
	idCounter++;
	return objectType + idCounter;
}



/*
**Returns The Browser Type and Version 
**
*/

Podium = {};
Podium.keydown = function(k) {
    var oEvent = document.createEvent('KeyboardEvent');

    // Chromium Hack
    Object.defineProperty(oEvent, 'keyCode', {
                get : function() {
                    return this.keyCodeVal;
                }
    });     
    Object.defineProperty(oEvent, 'which', {
                get : function() {
                    return this.keyCodeVal;
                }
    });     

    if (oEvent.initKeyboardEvent) {
        oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
    } else {
        oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
    }

    oEvent.keyCodeVal = k;

    if (oEvent.keyCode !== k) {
        alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
    }

    document.dispatchEvent(oEvent);
}
