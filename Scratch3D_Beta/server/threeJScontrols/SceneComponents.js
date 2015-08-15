var SCENECOMPONENTS = {};
var SHAPES = {};
var CHARECTERS = {};
var MATERIALS = {};
var objControls = null;
/*
*Adds a new 
*/
SCENECOMPONENTS.addShape = function(shape, length, width, height, LocationX, LocationY, LocationZ, shapeID, Scene){
	console.log("Called SCENECOMPONENTS.addShape", shape);
	//Adds a new cube to our scene based off of the user supplied params
	if(shape=="Cube"){
	var cube = null;	
	cube = new THREE.Mesh(new THREE.CubeGeometry(length, width ,height), new THREE.MeshNormalMaterial());
	cube.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(cube!=null){
			Scene.add(cube);
			SHAPES[shapeID] = cube;
		}
	}

	//Adds a new Shpere to our scene based off of the supplied params
	if(shape=="Sphere"){
	var sphere = null;	
	sphere = new THREE.Mesh(new THREE.SphereGeometry(length, 50,50), new THREE.MeshNormalMaterial());
	sphere.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(sphere!=null){
			Scene.add(sphere);
			SHAPES[shapeID] = sphere;
		}
	}

	//Adds a new Circle to our scene based off of the supplied params
	if(shape=="Circle"){
	var circle = null;

	circle = new THREE.Mesh( new THREE.CircleGeometry( length, 32), new THREE.MeshNormalMaterial());	
	circle.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(circle!=null){
			Scene.add(circle);
			SHAPES[shapeID] = circle;
		}
	}		

	//Adds a new Cylinder to our scene based off of the supplied params
	if(shape=="Cylinder"){
	var cylinder = null;

	cylinder = new THREE.Mesh( new THREE.CylinderGeometry( length, width, height, 50 ), new THREE.MeshNormalMaterial() );
	cylinder.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(cylinder!=null){
			Scene.add(cylinder);
			SHAPES[shapeID] = cylinder;
		}
	}

//Adds a new Dodecahedron to our scene based off of the supplied params
	if(shape=="Dodecahedron"){
	var dodecahedron = null;

    dodecahedron = new THREE.Mesh( new THREE.DodecahedronGeometry(length, 0), new THREE.MeshNormalMaterial());
	dodecahedron.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(dodecahedron!=null){
			Scene.add(dodecahedron);
			SHAPES[shapeID] = dodecahedron;
		}
	}

	//Adds a new Icosahedron to our scene based off of the supplied params
	if(shape=="Icosahedron"){
	var icosahedron = null;
		icosahedron = new THREE.Mesh( new THREE.IcosahedronGeometry(length, 0), new THREE.MeshNormalMaterial());
		icosahedron.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(icosahedron!=null){
			Scene.add(icosahedron);
			SHAPES[shapeID] = icosahedron;
		}
	}


//Adds a new Plane to our scene based off of the supplied params
	if(shape=="Plane"){
	var plane = null;
	 plane = new THREE.Mesh( new THREE.PlaneGeometry( length, width, 32 ), new THREE.MeshNormalMaterial());
	 plane.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(plane!=null){
			Scene.add(plane);
			SHAPES[shapeID] = plane;
		}
	}

//Adds a new Ring to our scene based off of the supplied params
	if(shape=="Ring"){
		var ring = null;
			ring = new THREE.Mesh( new THREE.RingGeometry( parseFloat(length), parseFloat(width)+1, 32 ), new THREE.MeshNormalMaterial());
			ring.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(ring!=null){
			Scene.add(ring);
			SHAPES[shapeID] = ring;
		}
	}

//Adds a new Torus to our scene based off of the supplied params
	if(shape=="Torus"){
		var torus;
 		torus = new THREE.Mesh( new THREE.TorusGeometry( parseFloat(width), parseFloat(length), 32, 100 ), new THREE.MeshNormalMaterial() );
		torus.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(torus!=null){
			Scene.add(torus);
			SHAPES[shapeID] = torus;
		}
	}


}

/*
**Adds a new object to the scene loaded from an outside source
*/
SCENECOMPONENTS.addOBJ = function(url, objID, Scene){

			//Loads at .OBJ file from an outside url and adds it to the sceen
			var objLoader = new THREE.OBJLoader();
    		var material = new THREE.MeshNormalMaterial();
    		objLoader.load(url, function (obj) {
       		obj.traverse(function (child) {

            if (child instanceof THREE.Mesh) {
                child.material = material;
            }

       	 });
       	console.log("LOADed Object: ", obj);
       obj.scale.set(.7,.7,.7);
       Scene.add(obj);
       SHAPES[objID] = obj;
       });
	   
}

SCENECOMPONENTS.addCharecter = function(Charecter, LocationX, LocationY, LocationZ, charecterID, Scene){
		console.log("SCENECOMPONENTS.addCharecter Called");
		if(Charecter=="Marine"){
		   var  blendMesh = new THREE.BlendCharacter();
				blendMesh.load( 'threeJScontrols/sceneCharecters/marine_anims.js', function ( geometry, materials ) {

				blendMesh.rotation.y = Math.PI * -135 / 180;
				Scene.add( blendMesh );
				SHAPES[charecterID] = blendMesh;
				var aspect = window.innerWidth / window.innerHeight;
				var radius = blendMesh.geometry.boundingSphere.radius;


				// Set default weights

				blendMesh.animations[ 'idle' ].weight = 1 / 3;
				blendMesh.animations[ 'walk' ].weight = 1 / 3;
				blendMesh.animations[ 'run' ].weight = 1 / 3;
				blendMesh.play('idle');
				} );
		}
		if(Charecter=="Cat"){

			var loader = new THREE.JSONLoader();
    			loader.load('threeJScontrols/sceneCharecters/Cat.js', function modelLoadedCallback(geometry,materials) {
 				//material = new THREE.MeshBasicMaterial({color: 'blue'});
        		blendMesh = new THREE.Mesh( geometry, materials[0] );
        		blendMesh.rotation.y = Math.PI * -135 / 180;
        		blendMesh.position.y = 4.2;
				Scene.add( blendMesh );
				SHAPES[charecterID] = blendMesh;
			});
		}
		if(Charecter=="Car"){

			var loader = new THREE.JSONLoader();
    			loader.load('threeJScontrols/sceneCharecters/Car.js', function modelLoadedCallback(geometry,materials) {
 				//material = new THREE.MeshBasicMaterial({color: 'blue'});
        		blendMesh = new THREE.Mesh( geometry, materials[0] );
        		blendMesh.rotation.y = Math.PI * -135 / 180;
        		blendMesh.position.y = 1;
				Scene.add( blendMesh );
				SHAPES[charecterID] = blendMesh;
			});
		}
		if(Charecter=="Pirate Ship"){

			var loader = new THREE.JSONLoader();
    			loader.load('threeJScontrols/sceneCharecters/pirateShip.js', function modelLoadedCallback(geometry,materials) {
 				//material = new THREE.MeshBasicMaterial({color: 'blue'});
        		blendMesh = new THREE.Mesh( geometry, materials[0] );
        		blendMesh.rotation.y = Math.PI * -135 / 180;
        		blendMesh.position.y = 0;
				Scene.add( blendMesh );
				SHAPES[charecterID] = blendMesh;
			});
		}
		if(Charecter=="Cat1"){

			var loader = new THREE.JSONLoader();
    			loader.load('threeJScontrols/sceneCharecters/Cat1.js', function modelLoadedCallback(geometry,materials) {
 				//material = new THREE.MeshBasicMaterial({color: 'blue'});
        		blendMesh = new THREE.Mesh( geometry, materials[0] );
        		blendMesh.rotation.y = Math.PI * -135 / 180;
        		blendMesh.position.y = 0;
				Scene.add( blendMesh );
				SHAPES[charecterID] = blendMesh;
			});
		}
		if(Charecter=="Lego Vader"){

			var loader = new THREE.JSONLoader();
    			loader.load('threeJScontrols/sceneCharecters/LegoDarthVader.js', function modelLoadedCallback(geometry,materials) {
 				//material = new THREE.MeshBasicMaterial({color: 'blue'});
        		blendMesh = new THREE.Mesh( geometry, materials[0] );
        		blendMesh.rotation.y = Math.PI * 180 / 180;
        		blendMesh.position.y = 1.5;
				Scene.add( blendMesh );
				SHAPES[charecterID] = blendMesh;
			});
		}
		
}

SCENECOMPONENTS.addPlanet = function(Planet, LocationX, LocationY, LocationZ, diameter, planetID, Scene){

				if(Planet=="Earth"){
				var mesh = THREEx.Planets.createEarth(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				var cloud	= THREEx.Planets.createEarthCloud();
				mesh.add(cloud);
				Scene.add( mesh );
				SHAPES[planetID] = mesh;
				}else if(Planet=="Sun"){
				var mesh = THREEx.Planets.createSun(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				SHAPES[planetID] = mesh;
				}else if(Planet=="Moon"){
				var mesh = THREEx.Planets.createMoon(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				SHAPES[planetID] = mesh;
				}else if(Planet=="Mercury"){
				var mesh = THREEx.Planets.createMercury(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				SHAPES[planetID] = mesh;
				}else if(Planet=="Venus"){
				var mesh = THREEx.Planets.createVenus(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				SHAPES[planetID] = mesh;
				}else if(Planet=="Mars"){
				var mesh = THREEx.Planets.createMars(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				SHAPES[planetID] = mesh;
				}else if(Planet=="Jupiter"){
				var mesh = THREEx.Planets.createJupiter(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				SHAPES[planetID] = mesh;
				}else if(Planet=="Saturn"){
				var mesh = THREEx.Planets.createSaturn(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				mesh.receiveShadow	= true;
				mesh.castShadow		= true;
				var ring	= THREEx.Planets.createSaturnRing();
				ring.receiveShadow	= true;
				ring.castShadow		= true;
				mesh.add(ring);
				Scene.add( mesh );
				SHAPES[planetID] = mesh;
				}else if(Planet=="Uranus"){
				var mesh = THREEx.Planets.createUranus(diameter)
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				mesh.receiveShadow	= true;
				mesh.castShadow		= true;
				var ring	= THREEx.Planets.createUranusRing();
				ring.receiveShadow	= true;
				ring.castShadow		= true;
				mesh.add(ring);
				Scene.add( mesh );
				SHAPES[planetID] = mesh;
				}else if(Planet=="Neptune"){
				var mesh = THREEx.Planets.createNeptune(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				SHAPES[planetID] = mesh;
				}else if(Planet=="Pluto! #savepluto"){
				var mesh = THREEx.Planets.createPluto(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				SHAPES[planetID] = mesh;
				}
}

SCENECOMPONENTS.addLight = function(lightType,color,intensity,locX,locY,locZ,lightID,scene){
	var color = new THREE.Color(color);
	if(lightType=="Ambient"){
		var light = new THREE.AmbientLight(color.getHex());
		light.position.x = locX;
		light.position.y = locY;
		light.position.z = locZ;
		scene.add( light );
		SHAPES[lightID] = light;
		console.log("Ambient Light");
	}else if(lightType=="Area"){
	    var light = new THREE.AreaLight( color.getHex(), intensity );
		light.position.set( locX, locY, locZ );
		light.width = 10;
		light.height = 1;
		scene.add(light);
		SHAPES[lightID] = light;
		console.log("Area Light");
	}else if(lightType=="Directional"){
		var light	= new THREE.DirectionalLight( color.getHex(), intensity )
		light.position.set( locX, locY, locZ );
		scene.add( light );
		SHAPES[lightID] = light;
	}else if(lightType=="Point"){
		var light = new THREE.PointLight( color.getHex(), intensity, 100 );
		light.position.set( locX, locY, locZ );
		scene.add( light );
		SHAPES[lightID] = light;
		console.log("Point Light");
	}
}

SCENECOMPONENTS.newMaterial = function(material, materialID){
	var materialOBJ;
	if(material=="MeshBasicMaterial"){
			materialOBJ = new THREE.MeshBasicMaterial();
		}else if(material=="MeshNormalMaterial"){
			materialOBJ = new THREE.MeshNormalMaterial();
		}else if(material=="MeshDepthMaterial"){
			materialOBJ = new THREE.MeshDepthMaterial();
		}else if(material=="MeshLambertMaterial"){
			materialOBJ = new THREE.MeshLambertMaterial();
		}else if(material=="MeshPhongMaterial"){
			materialOBJ = new THREE.MeshPhongMaterial();
		}
	if(materialOBJ!=null && materialID!=null){
		MATERIALS[materialID] = materialOBJ;
	}
}

SCENECOMPONENTS.setMaterialTo = function(materialID, objectID){
	var material = MATERIALS[materialID];
	var object = SHAPES[objectID];

	if(material!=null && object!=null){
		object.material = material;
	}
	MATERIALS[materialID] = material;
	SHAPES[objectID] = object;
}

SCENECOMPONENTS.setMaterialColor = function(materialID, color){
	var material = MATERIALS[materialID];
	if(material!=null){
		if(color.toUpperCase()!="NULL" && color.toUpperCase()!="RANDOM"){
			material.color =  new THREE.Color(color);
		}else if(color.toUpperCase()=="RANDOM"){
			material.color =  new THREE.Color( (Math.random() * 0xffffff));
			console.log(".setMaterialColor: ", material);
		}
	}
	
	MATERIALS[materialID] = material;
}

SCENECOMPONENTS.setMaterialImage = function(materialID, urlPath){
var material = MATERIALS[materialID];
console.log("SCENECOMPONENTS.", urlPath);
	if(material!=null){
			material.map = THREE.ImageUtils.loadTexture(urlPath);
			material.wrapAround = true;
		}
	MATERIALS[materialID] = material;
}

SCENECOMPONENTS.applyMaterial = function(material, shape_ID, _color, imageURL){

		var shape = null;
		shape = SHAPES[shape_ID];
		var color = _color;
		var image;
		if(color.toUpperCase()=="RANDOM"){
			color = Math.random() * 0xffffff;
		}else if(color.toUpperCase()=="NULL"){
			color = null;
		}
		var material;
		if(material=="MeshBasicMaterial"){
			material = new THREE.MeshBasicMaterial({color: color});
			shape.material = material;
		}else if(material=="MeshNormalMaterial"){
			material = new THREE.MeshNormalMaterial();
			shape.material = material;
		}else if(material=="MeshDepthMaterial"){
			material = new THREE.MeshDepthMaterial({color: color});
			shape.material = material;
		}else if(material=="MeshLambertMaterial"){
			material = new THREE.MeshLambertMaterial({color: color});
			shape.material = material;
		}else if(material=="MeshPhongMaterial"){
			material = new THREE.MeshPhongMaterial({color: color});
			shape.material = material;
		}
		//Checks if there is a image and wraps it around the shape if so
		if(imageURL!="Image URL"){
			material.map = THREE.ImageUtils.loadTexture(imageURL);
			material.wrapAround = true;
		}
		console.log("SCENECOMPONENTS: ", shape);
	}

SCENECOMPONENTS.move = function(shape_ID, direction, steps){
	//var temp = shape_ID + ", " + direction + ", " + steps;
	//We call parseFloat to help javascript tell the difference between the arithmatic + and string concatination +
	
	//!!!!!!-----The -0 Helps javascript to recognize the following + opperator as an additon operator and not as a string concatination------!!!!!!  
	if(direction=="Left"){
		var shape = null;
		shape = SHAPES[shape_ID];
		
		if(shape!=null){
			/**REVERTBACK TO USING CHARECTERCONTROLS WHEN TESTING IS DONE
			**!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			**
			if(shape_ID.indexOf("CHARECTER")>=0){

				CHARECTERCONTROLS.moveLeft(shape, steps);
			}else{*/
			shape.position.x = (shape.position.x - steps);
		//}
		}
	}if(direction=="Right"){
		var shape = null;
		shape = SHAPES[shape_ID];
		if(shape!=null){
			/**REVERTBACK TO USING CHARECTERCONTROLS WHEN TESTING IS DONE
			**!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			**
			if(shape_ID.indexOf("CHARECTER")>=0){

				CHARECTERCONTROLS.moveRight(shape, steps);
			}else{*/
			shape.position.x = (shape.position.x-0) + (steps-0);
			//}
		}
	}if(direction=="Up"){
		var shape = null;
		shape = SHAPES[shape_ID];
		if(shape!=null){
			//!!!!!!-----The -0 Helps javascript to recognize the following + opperator as an additon operator and not as a string concatination------!!!!!!
			shape.position.y = (shape.position.y-0) + (steps-0);
		}
	}if(direction=="Down"){
		var shape = null;
		shape = SHAPES[shape_ID];
		if(shape!=null){
			shape.position.y =  (shape.position.y - steps);
		}
	}if(direction=="Forward"){
		var shape = null;
		shape = SHAPES[shape_ID];
		if(shape!=null){
			/**REVERTBACK TO USING CHARECTERCONTROLS WHEN TESTING IS DONE
			**!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			**
			if(shape_ID.indexOf("CHARECTER")>=0){

				CHARECTERCONTROLS.moveForward(shape, steps);
			}else{*/
			shape.position.z = (shape.position.z - steps);
			//}
		}
	}if(direction=="Back"){
		var shape = null;
		shape = SHAPES[shape_ID];
		if(shape!=null){
			/**REVERTBACK TO USING CHARECTERCONTROLS WHEN TESTING IS DONE
			**!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			**
			if(shape_ID.indexOf("CHARECTER")>=0){

				CHARECTERCONTROLS.moveBack(shape, steps);
			}else{*/
			shape.position.z = (shape.position.z-0) + (steps-0);
			//}
		}
	}
}

SCENECOMPONENTS.rotate = function(shape_ID, direction, degrees){
	var shape = null;
	shape = SHAPES[shape_ID];
	if(shape!=null){
		var ion = THREE.Math.degToRad(degrees);

		if(direction=="Y"){shape.rotation.y = (shape.rotation.y + ion);}
		else if(direction=="X"){shape.rotation.x = (shape.rotation.x + ion);}
		else if(direction=="Z"){shape.rotation.z = (shape.rotation.z + ion);}
	}
}
SCENECOMPONENTS.getCharecter = function(charecterID){
	var charecter = CHARECTERS[charecterID];
	console.log(charecterID, charecter);
	return charecter;
}

SCENECOMPONENTS.getShape = function(shape_ID){
	var shape = SHAPES[shape_ID];
	return shape;
}
