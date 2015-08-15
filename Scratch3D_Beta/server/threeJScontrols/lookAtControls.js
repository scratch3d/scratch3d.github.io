/**
 * @author John Goodwin / https://github.com/goodwinj14
 */

THREE.LookAtControls = function ( camera, lookAtObj ) {

	this.object = camera;
	this.lookAtObj = lookAtObj 
	this.targetPosition = new THREE.Vector3( 0, 0, 0 );

	this.lookAtBack = false;
	this.lookAtFront = false;
	this.lookAtLeft = false;
	this.lookAtRight = false;
	this.lookAtTop = false;
	this.lookAtBottom = false;
	this.distenceFromObj = 15;
	

	this.update = function( delta ) {
		//Sets lookat postion
		

		//Sets the xyz cordinets of the camera
		//this.object.position.x = this.targetPosition.x;
		//this.object.position.y = this.targetPosition.y + 4;
		//this.object.position.z = this.targetPosition.y + 10;

		//sets Look at angle Front, Back, Left, Right
		if(this.lookAtBack){
			this.object.position.x = this.lookAtObj.position.x+(Math.sin(this.lookAtObj.rotation.y) * (-this.distenceFromObj));
			this.object.position.y = this.lookAtObj.position.y + 10;
			this.object.position.z = this.lookAtObj.position.z+(Math.cos(this.lookAtObj.rotation.y) * (-this.distenceFromObj));
			this.targetPosition.x = this.lookAtObj.position.x;
			this.targetPosition.y = this.lookAtObj.position.y+5;
			this.targetPosition.z = this.lookAtObj.position.z;
			
			this.object.lookAt( this.targetPosition );
		}
		else if(this.lookAtFront){
		this.object.position.x = this.lookAtObj.position.x+(Math.sin(this.lookAtObj.rotation.y) * (this.distenceFromObj));
		this.object.position.y = this.lookAtObj.position.y + 10;
		this.object.position.z = this.lookAtObj.position.z+(Math.cos(this.lookAtObj.rotation.y) * (this.distenceFromObj));
		this.targetPosition.x = this.lookAtObj.position.x;
		this.targetPosition.y = this.lookAtObj.position.y+5;
		this.targetPosition.z = this.lookAtObj.position.z;
		
		this.object.lookAt( this.targetPosition );
		}
		else if(this.lookAtLeft){
		this.object.position.x = this.lookAtObj.position.x+(Math.cos(this.lookAtObj.rotation.y) * (-this.distenceFromObj));
		this.object.position.y = this.lookAtObj.position.y + 10;
		this.object.position.z = this.lookAtObj.position.z+ (Math.sin(this.lookAtObj.rotation.y) * (this.distenceFromObj));
		this.targetPosition.x = this.lookAtObj.position.x;
		this.targetPosition.y = this.lookAtObj.position.y+5;
		this.targetPosition.z = this.lookAtObj.position.z;
		
		this.object.lookAt( this.targetPosition );
		}
		else if(this.lookAtRight){
		this.object.position.x = this.lookAtObj.position.x+(Math.cos(this.lookAtObj.rotation.y) * (this.distenceFromObj));
		this.object.position.y = this.lookAtObj.position.y + 10;
		this.object.position.z = this.lookAtObj.position.z+ (Math.sin(this.lookAtObj.rotation.y) * (-this.distenceFromObj));
		this.targetPosition.x = this.lookAtObj.position.x;
		this.targetPosition.y = this.lookAtObj.position.y+5;
		this.targetPosition.z = this.lookAtObj.position.z;
		
		this.object.lookAt( this.targetPosition );
		}
		else if(this.lookAtTop){
		this.object.position.x = this.lookAtObj.position.x;
		this.object.position.y = (this.lookAtObj.position.y + this.distenceFromObj);
		this.object.position.z = this.lookAtObj.position.z;

		this.targetPosition.x = this.lookAtObj.position.x;
		this.targetPosition.y = this.lookAtObj.position.y;
		this.targetPosition.z = this.lookAtObj.position.z;
		this.object.lookAt( this.targetPosition );

		//Ratation Must occure after this.object.lookAt() is exicuted
		this.object.rotation.z = this.lookAtObj.rotation.y;
		}
		else if(this.lookAtBottom){
		this.object.position.x = this.lookAtObj.position.x;
		this.object.position.y = (this.lookAtObj.position.y - this.distenceFromObj);
		this.object.position.z = this.lookAtObj.position.z;

		this.targetPosition.x = this.lookAtObj.position.x;
		this.targetPosition.y = this.lookAtObj.position.y;
		this.targetPosition.z = this.lookAtObj.position.z;
		this.object.lookAt( this.targetPosition );

		//Ratation Must occure after this.object.lookAt() is exicuted
		this.object.rotation.z = (-this.lookAtObj.rotation.y);
		}


	};
};
