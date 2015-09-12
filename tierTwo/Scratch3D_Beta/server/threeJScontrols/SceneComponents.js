var SCENECOMPONENTS = {};
var SHAPES = {};
var CHARECTERS = {};
var MATERIALS = {};
var objControls = null;
SCENECOMPONENTS.OBJECTS = [];
/*
*Adds a new 
*/
SCENECOMPONENTS.addShape = function(shape, length, width, height, LocationX, LocationY, LocationZ, Physics, shapeID, Scene){
	console.log("Called SCENECOMPONENTS.addShape", shape);
	//Adds a new cube to our scene based off of the user supplied params
	if(shape=="Cube"){
	var cube = null;
	if(Physics=="On"){
		cube = new Physijs.BoxMesh(new THREE.CubeGeometry(length, width ,height), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
	cube = new THREE.Mesh(new THREE.CubeGeometry(length, width ,height), new THREE.MeshNormalMaterial());
	}
	cube.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(cube!=null){
			Scene.add(cube);
			cube.name = shapeID;
			console.log("THE NEW NAME OF ", cube.name);
			SHAPES[shapeID] = cube;
			SCENECOMPONENTS.OBJECTS.push(cube);
		}
	}

	//Adds a new Shpere to our scene based off of the supplied params
	if(shape=="Sphere"){
	var sphere = null;	
	if(Physics=="On"){
		sphere = new Physijs.SphereMesh(new THREE.SphereGeometry(length, 50,50), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
	sphere = new THREE.Mesh(new THREE.SphereGeometry(length, 50,50), new THREE.MeshNormalMaterial());
	}
	sphere.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(sphere!=null){
			Scene.add(sphere);
			sphere.name = shapeID;
			SHAPES[shapeID] = sphere;
			SCENECOMPONENTS.OBJECTS.push(sphere);
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
			circle.name = shapeID;
			SHAPES[shapeID] = circle;
			SCENECOMPONENTS.OBJECTS.push(circle);
		}
	}		

	//Adds a new Cylinder to our scene based off of the supplied params
	if(shape=="Cylinder"){
	var cylinder = null; 
	if(Physics=="On"){
		cylinder = new Physijs.CylinderMesh( new THREE.CylinderGeometry( length, width, height, 50 ), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
		cylinder = new THREE.Mesh( new THREE.CylinderGeometry( length, width, height, 50 ), new THREE.MeshNormalMaterial() );
	}
	cylinder.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(cylinder!=null){
			Scene.add(cylinder);
			cylinder.name = shapeID;
			SHAPES[shapeID] = cylinder;
			SCENECOMPONENTS.OBJECTS.push(cylinder);
		}
	}

//Adds a new Dodecahedron to our scene based off of the supplied params
	if(shape=="Dodecahedron"){
	var dodecahedron = null;
	if(Physics=="On"){
		dodecahedron = new Physijs.ConvexMesh( new THREE.DodecahedronGeometry(length, 0), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
		dodecahedron = new THREE.Mesh( new THREE.DodecahedronGeometry(length, 0), new THREE.MeshNormalMaterial());
	}
    
	dodecahedron.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(dodecahedron!=null){
			Scene.add(dodecahedron);
			dodecahedron.name = shapeID;
			SHAPES[shapeID] = dodecahedron;
			SCENECOMPONENTS.OBJECTS.push(dodecahedron);
		}
	}

	//Adds a new Icosahedron to our scene based off of the supplied params
	if(shape=="Icosahedron"){
	var icosahedron = null;
	if(Physics=="On"){
		icosahedron = new Physijs.ConvexMesh( new THREE.IcosahedronGeometry(length, 0), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
		icosahedron = new THREE.Mesh( new THREE.IcosahedronGeometry(length, 0), new THREE.MeshNormalMaterial());
		}
		icosahedron.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(icosahedron!=null){
			Scene.add(icosahedron);
			icosahedron.name = shapeID;
			SHAPES[shapeID] = icosahedron;
			SCENECOMPONENTS.OBJECTS.push(icosahedron);
		}
	}


//Adds a new Plane to our scene based off of the supplied params
	if(shape=="Plane"){
	var plane = null;
	if(Physics=="On"){
		plane = new Physijs.ConvexMesh( new THREE.PlaneGeometry( length, width, 32 ), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
	 plane = new THREE.Mesh( new THREE.PlaneGeometry( length, width, 32 ), new THREE.MeshNormalMaterial());
	 }
	 plane.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(plane!=null){
			Scene.add(plane);
			plane.name = shapeID;
			SHAPES[shapeID] = plane;
			SCENECOMPONENTS.OBJECTS.push(plane);
		}
	}

//Adds a new Ring to our scene based off of the supplied params
	if(shape=="Ring"){
		var ring = null;
		if(Physics=="On"){
			ring = new Physijs.ConvexMesh( new THREE.RingGeometry( parseFloat(length), parseFloat(width)+1, 32 ), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
			ring = new THREE.Mesh( new THREE.RingGeometry( parseFloat(length), parseFloat(width)+1, 32 ), new THREE.MeshNormalMaterial());
		}
			ring.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(ring!=null){
			Scene.add(ring);
			ring.name = shapeID;
			SHAPES[shapeID] = ring;
			SCENECOMPONENTS.OBJECTS.push(ring);
		}
	}

//Adds a new Torus to our scene based off of the supplied params
	if(shape=="Torus"){
		var torus;
		if(Physics=="On"){
			torus = new Physijs.ConvexMesh( new THREE.TorusGeometry( parseFloat(width), parseFloat(length), 32, 100 ), Physijs.createMaterial(new THREE.MeshNormalMaterial(),.4,.8),2);
	}else{
 			torus = new THREE.Mesh( new THREE.TorusGeometry( parseFloat(width), parseFloat(length), 32, 100 ), new THREE.MeshNormalMaterial() );
	}
		torus.position.set(LocationX,LocationY,LocationZ);
	//If the shape is created succesfully then it is added to the scene and to to the hash table with its key pointing to that specific object.
		if(torus!=null){
			Scene.add(torus);
			torus.name = shapeID;
			SHAPES[shapeID] = torus;
			SCENECOMPONENTS.OBJECTS.push(torus);
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
       obj.name = objID;
       SHAPES[objID] = obj;
       SCENECOMPONENTS.OBJECTS.push(obj);
       });
	   
}

SCENECOMPONENTS.addCharecter = function(Charecter, LocationX, LocationY, LocationZ, charecterID, Scene){
		console.log("SCENECOMPONENTS.addCharecter Called");
		if(Charecter=="Marine"){
		   var  blendMesh = new THREE.BlendCharacter();
				blendMesh.load( 'threeJScontrols/sceneCharecters/marine_anims.js', function ( geometry, materials ) {

				blendMesh.position.x = LocationX;
				blendMesh.position.y = LocationY;
				blendMesh.position.z = LocationZ;
				Scene.add( blendMesh );
				blendMesh.name = charecterID;
				SHAPES[charecterID] = blendMesh;
				SCENECOMPONENTS.OBJECTS.push(blendMesh);
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

			 var  blendMesh = new THREE.BlendCharacter();
				blendMesh.load( 'threeJScontrols/sceneCharecters/cat/Cat.js', function ( geometry, materials ) {

				blendMesh.position.x = LocationX;
				blendMesh.position.y = LocationY;
				blendMesh.position.z = LocationZ;
				Scene.add( blendMesh );
				blendMesh.name = charecterID;
				SHAPES[charecterID] = blendMesh;
				SCENECOMPONENTS.OBJECTS.push(blendMesh);
				var aspect = window.innerWidth / window.innerHeight;
				var radius = blendMesh.geometry.boundingSphere.radius;

				} );
		}
		if(Charecter=="Car"){

			var loader = new THREE.JSONLoader();
    			loader.load('threeJScontrols/sceneCharecters/Car.js', function modelLoadedCallback(geometry,materials) {
 				//material = new THREE.MeshBasicMaterial({color: 'blue'});
        		blendMesh = new THREE.Mesh( geometry, materials[0] );
        		blendMesh.rotation.y = Math.PI * -135 / 180;
        		blendMesh.position.y = 1;
				Scene.add( blendMesh );
				blendMesh.name = charecterID;
				SHAPES[charecterID] = blendMesh;
				SCENECOMPONENTS.OBJECTS.push(blendMesh);
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
				blendMesh.name = charecterID;
				SHAPES[charecterID] = blendMesh;
				SCENECOMPONENTS.OBJECTS.push(blendMesh);
			});
		}
		if(Charecter=="Cat1"){

			var loader = new THREE.JSONLoader();
    			loader.load('threeJScontrols/sceneCharecters/Cat1.js', function modelLoadedCallback(geometry,materials) {
 				//material = new THREE.MeshBasicMaterial({color: 'blue'});
        		blendMesh = new THREE.Mesh( geometry, materials[0] );
        		blendMesh.rotation.y = Math.PI * -135 / 180;
        		blendMesh.position.y = 0;
        		blendMesh.name = charecterID;
				Scene.add( blendMesh );
				SHAPES[charecterID] = blendMesh;
				SCENECOMPONENTS.OBJECTS.push(blendMesh);
			});
		}
		if(Charecter=="Lego Vader"){

			var loader = new THREE.JSONLoader();
    			loader.load('threeJScontrols/sceneCharecters/LegoDarthVader.js', function modelLoadedCallback(geometry,materials) {
 				//material = new THREE.MeshBasicMaterial({color: 'blue'});
        		blendMesh = new THREE.Mesh( geometry, materials[0] );
        		blendMesh.rotation.y = Math.PI * 180 / 180;
        		blendMesh.position.y = 1.5;
        		blendMesh.name = charecterID;
				Scene.add( blendMesh );
				SHAPES[charecterID] = blendMesh;
				SCENECOMPONENTS.OBJECTS.push(blendMesh);
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
				mesh.name = planetID;
				SHAPES[planetID] = mesh;
				SCENECOMPONENTS.OBJECTS.push(mesh);
				}else if(Planet=="Sun"){
				var mesh = THREEx.Planets.createSun(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				mesh.name = planetID;
				SHAPES[planetID] = mesh;
				SCENECOMPONENTS.OBJECTS.push(mesh);
				}else if(Planet=="Moon"){
				var mesh = THREEx.Planets.createMoon(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				mesh.name = planetID;
				SHAPES[planetID] = mesh;
				SCENECOMPONENTS.OBJECTS.push(mesh);
				}else if(Planet=="Mercury"){
				var mesh = THREEx.Planets.createMercury(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				mesh.name = planetID;
				SHAPES[planetID] = mesh;
				SCENECOMPONENTS.OBJECTS.push(mesh);
				}else if(Planet=="Venus"){
				var mesh = THREEx.Planets.createVenus(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				mesh.name = planetID;
				SHAPES[planetID] = mesh;
				SCENECOMPONENTS.OBJECTS.push(mesh);
				}else if(Planet=="Mars"){
				var mesh = THREEx.Planets.createMars(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				mesh.name = planetID;
				SHAPES[planetID] = mesh;
				SCENECOMPONENTS.OBJECTS.push(mesh);
				}else if(Planet=="Jupiter"){
				var mesh = THREEx.Planets.createJupiter(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				mesh.name = planetID;
				SHAPES[planetID] = mesh;
				SCENECOMPONENTS.OBJECTS.push(mesh);
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
				mesh.name = planetID;
				SHAPES[planetID] = mesh;
				SCENECOMPONENTS.OBJECTS.push(mesh);
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
				mesh.name = planetID;
				SHAPES[planetID] = mesh;
				SCENECOMPONENTS.OBJECTS.push(mesh);
				}else if(Planet=="Neptune"){
				var mesh = THREEx.Planets.createNeptune(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				mesh.name = planetID;
				SHAPES[planetID] = mesh;
				SCENECOMPONENTS.OBJECTS.push(mesh);
				}else if(Planet=="Pluto! #savepluto"){
				var mesh = THREEx.Planets.createPluto(diameter);
				mesh.position.x = LocationX;
				mesh.position.y = LocationY;
				mesh.position.z = LocationZ;
				Scene.add( mesh );
				mesh.name = planetID;
				SHAPES[planetID] = mesh;
				SCENECOMPONENTS.OBJECTS.push(mesh);
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

SCENECOMPONENTS.newPhysicsMaterial = function(material, friction, restitution, materialID){
	var materialOBJ;
	if(material=="MeshBasicMaterial"){
			materialOBJ = new Physijs.createMaterial( new THREE.MeshBasicMaterial(),friction,restitution);
		}else if(material=="MeshNormalMaterial"){
			materialOBJ = new Physijs.createMaterial( new THREE.MeshNormalMaterial(),friction,restitution);
		}else if(material=="MeshDepthMaterial"){
			materialOBJ = new Physijs.createMaterial( new THREE.MeshDepthMaterial(),friction,restitution);
		}else if(material=="MeshLambertMaterial"){
			materialOBJ = new Physijs.createMaterial( new THREE.MeshLambertMaterial(),friction,restitution);
		}else if(material=="MeshPhongMaterial"){
			materialOBJ = new Physijs.createMaterial( new THREE.MeshPhongMaterial(),friction,restitution);
		}
	if(materialOBJ!=null && materialID!=null){
		MATERIALS[materialID] = materialOBJ;
	}
}

SCENECOMPONENTS.setFriction = function(materialID, friction){
	if(materialID.indexOf("Physics") > -1){
	var material = MATERIALS[materialID];
		if(material!=null){
			material._physijs.friction = friction;
			//console.log(material.friction);
		}
	}
}

SCENECOMPONENTS.setRestitution = function(materialID, restitution){
	if(materialID.indexOf("Physics") > -1){
	var material = MATERIALS[materialID];
		if(material!=null){
			material._physijs.restitution = restitution;
			//console.log(material.restitution);
		}
	}
}

SCENECOMPONENTS.setWeight = function(objectID, weight){
	var shape = SHAPES[objectID];
	if(shape._physijs != null){
			if(shape!=null){
				shape.mass = weight;
				console.log(shape);
				SHAPES[objectID] = shape;
		}
	}
}

//Sets the Linear Velocity of a physics object
//Object must have a physics material applyed to it for this function to work
SCENECOMPONENTS.setLinearVelocity = function(objectID, x, y, z){
	var shape = SHAPES[objectID];
	if(shape._physijs != null){
				shape.setLinearVelocity(new THREE.Vector3(x,y,z));
				SHAPES[objectID] = shape;
	}
}
//Sets the Linear Velocity of a physics object
//Object must have a physics material applyed to it for this function to work
SCENECOMPONENTS.setAngularVelocity = function(objectID, x, y, z){
	var shape = SHAPES[objectID];
	if(shape._physijs != null){
				shape.setAngularVelocity(new THREE.Vector3(x,y,z));
				SHAPES[objectID] = shape;
	}
}

SCENECOMPONENTS.setMaterialTo = function(materialID, objectID, scene){
	var material = MATERIALS[materialID];
	var object = SHAPES[objectID];

	if(material!=null && object!=null){
		if(materialID.indexOf("Physics") > -1){
			
			temp = new Physijs.BoxMesh( object.geometry, material);
			temp.position.x = object.position.x;
			temp.position.y = object.position.y;
			temp.position.z = object.position.z;

			temp.rotation.x = object.rotation.x;
			temp.rotation.y = object.rotation.y;
			temp.rotation.z = object.rotation.z;

			temp.scale.x = object.scale.x;
			temp.scale.y = object.scale.y;
			temp.scale.z = object.scale.z;

			scene.remove(object);
			scene.add(temp);
			//scene.add(temp);
			//scene.getObjectById(object.id) = temp;
			console.log("Physics Material: ", temp);
			//object = 
			SHAPES[objectID] = temp;
			MATERIALS[materialID] = material;
			
		}else{
		object.material = material;
		MATERIALS[materialID] = material;
		SHAPES[objectID] = object;
		}
	}
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
			shape.__dirtyPosition = true;
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
			shape.__dirtyPosition = true;
			//}
		}
	}if(direction=="Up"){
		var shape = null;
		shape = SHAPES[shape_ID];
		if(shape!=null){
			//!!!!!!-----The -0 Helps javascript to recognize the following + opperator as an additon operator and not as a string concatination------!!!!!!
			shape.position.y = (shape.position.y-0) + (steps-0);
			shape.__dirtyPosition = true;
		}
	}if(direction=="Down"){
		var shape = null;
		shape = SHAPES[shape_ID];
		if(shape!=null){
			shape.position.y =  (shape.position.y - steps);
			shape.__dirtyPosition = true;
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
			shape.__dirtyPosition = true;
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
			shape.__dirtyPosition = true;
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
		shape.__dirtyRotation = true;
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
