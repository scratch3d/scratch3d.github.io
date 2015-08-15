/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 *
 * @edited John Goodwin / https://github.com/goodwinj14
 */

 THREE.fpvObjectControles = function(object, domElement){

 	this.object = object;
 	this.domElement = ( domElement !== undefined ) ? domElement : document;
 	
 	this.moveSpeed = 1.0;
 	this.lookSpeed = 0.1;

 	this.autoSpeedFactor = 0.0;

 	this.lat = 0;
 	this.lon = 0;
 	this.phi = 0;
 	this.theta = 0;

 	this.moveForward = false;
	this.moveBackward = false;
	this.moveLeft = false;
	this.moveRight = false;
	this.rotateLeft = false;
	this.rotateRight = false;
	this.rotateUp = false;
	this.rotateDown = false;

	this.viewHalfX = 0;
	this.viewHalfY = 0;


	if ( this.domElement !== document ) {

		this.domElement.setAttribute( 'tabindex', -1 );

	}

	//
	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	};


	this.onKeyDown = function ( event ) {

		//event.preventDefault();

		switch ( event.keyCode ) {

			case 38: /*up*/this.moveForward = true; break;
			//case 87: /*W*/ this.rotateUp = true; break;

			//case 37: /*left*/ this.moveLeft = true; break;
			case 37: /*left*/ this.rotateLeft = true; break;

			case 40: /*down*/ this.moveBackward = true; break;
			//case 83: /*S*/ 	this.rotateDown = true; break;

			//case 39: /*right*/ this.moveRight = true; break;
			case 39: /*right*/ 	this.rotateRight = true; break;

			case 82: /*R*/ this.moveUp = true; break;
			case 70: /*F*/ this.moveDown = true; break;

		}

	};


	this.onKeyUp = function ( event ) {

		switch ( event.keyCode ) {

			case 38: /*up*/ this.moveForward = false; break;
			//case 87: /*W*/ 	this.rotateUp = false; break;

			case 37: /*left*/ this.rotateLeft = false; break;
			//case 65: /*A*/ 	this.rotateLeft = false; break;

			case 40: /*down*/ this.moveBackward = false; break;
			case 83: /*S*/ 	this.rotateDown = false; break;

			//case 39: /*right*/ this.moveRight = false; break;
			case 39: /*right*/ 	this.rotateRight = false; break;

			case 82: /*R*/ this.moveUp = false; break;
			case 70: /*F*/ this.moveDown = false; break;

		}

	};


	//Update Function
	this.update = function(delta){


		//X,Y,Z movment Controles

		var actualMoveSpeed = delta * this.moveSpeed;
		
		if ( this.moveForward ) { this.object.translateZ( actualMoveSpeed);}
		//if ( this.moveForward ) {this.object.translateZ( -actualMoveSpeed);}
		if ( this.moveBackward ){ this.object.translateZ( -actualMoveSpeed);}

		if ( this.moveUp ) this.object.translateY( actualMoveSpeed );
		if ( this.moveDown ) this.object.translateY( - actualMoveSpeed );

		//Rotation and look Direction
		var actualLookSpeed = this.lookSpeed*delta;
		lon = THREE.Math.degToRad( actualLookSpeed );
		if ( this.rotateLeft ) this.object.rotation.y = this.object.rotation.y + (lon);
		if ( this.rotateRight ) this.object.rotation.y = this.object.rotation.y - (lon);
	}


	window.addEventListener( 'keydown', bind( this, this.onKeyDown ), false );
	window.addEventListener( 'keyup', bind( this, this.onKeyUp ), false );

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	};

	this.handleResize();

 };

