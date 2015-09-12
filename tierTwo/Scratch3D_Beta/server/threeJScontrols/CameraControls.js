var CAMERACONTROLS = {};

//Controls The Rotastion of the camera based on a user supplied direction, a user supplied degree on ratation and the camera object to be rotated
CAMERACONTROLS.rotate = function(direction, degree, camera){
	console.log("Direction", direction);
	if(direction == "Left"){
		camera.rotation.y = camera.rotation.y + (degree*(Math.PI/180));
	}if(direction == "Right"){
		camera.rotation.y = camera.rotation.y + (-1*(degree*(Math.PI/180)));
	}if(direction == "Up"){
		camera.rotation.x = camera.rotation.x + (degree*(Math.PI/180));
	}if(direction == "Down"){
		camera.rotation.x = camera.rotation.x + (-1*(degree*(Math.PI/180)));
	}if(direction == "Roll Left"){
		camera.rotation.z = camera.rotation.z + (degree*(Math.PI/180));
	}if(direction == "Roll Right"){
		camera.rotation.z = camera.rotation.z + (-1*(degree*(Math.PI/180)));
	}
}
/*
*Orbits the camera around a given point in space
*/
CAMERACONTROLS.orbit = 	function(direction,orbitPoint, degrees, camera){
	
	var x = camera.position.x;
	var z = camera.position.z;
	var y = camera.position.y;
	//camera.position.y = 1;
	var rotUnits = degrees* Math.PI/180;
	var cosD = Math.cos(rotUnits);
	var sinD = Math.sin(rotUnits);
	
	if(direction=="Orbit Left"){
		camera.position.x = (x * cosD) - (z * sinD);
		camera.position.z = (z * cosD) + (x * sinD);
		camera.lookAt(orbitPoint);
	}if(direction=="Orbit Right"){
		var rotaionX = camera.rotation.x;
		camera.position.x = (x * cosD) + (z * sinD);
		camera.position.z = (z * cosD) - (x * sinD);
		camera.lookAt(orbitPoint);
	}if(direction=="Orbit Up"){
		camera.position.y = (y * cosD) + (z * sinD);
		camera.position.z = (z * cosD) - (y * sinD);
		camera.rotation.x = camera.rotation.x + (-1*rotUnits);
	}if(direction=="Orbit Down"){
		camera.position.y = (y * cosD) - (z * sinD);
		camera.position.z = (z * cosD) + (y * sinD);
		camera.rotation.x = camera.rotation.x + rotUnits;
	}
		//camera.lookAt(orbitPoint);1.501 mm	
}

/*
*Moves the camera to a new postion based on a user supplied direction and delta value
*/
CAMERACONTROLS.move = function(direction, steps, camera){
	if(direction=="Left"){
		camera.position.x = camera.position.x - steps;
	}if(direction=="Right"){
		camera.position.x = (camera.position.x + steps);
	}if(direction=="Up"){
	camera.position.y = (camera.position.y + steps);
	}if(direction=="Down"){
	camera.position.y = (camera.position.y - steps);
	}if(direction=="Forward"){
	camera.position.z = (camera.position.z - steps);
	}if(direction=="Back"){
	camera.position.z = (camera.position.z + steps);
	}
}

CAMERACONTROLS.lookAt = function(object, camera){
	//camera.lookAt(object);
}