/**
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin 	/ http://mark-lundin.com
 * @Edited By John Goodwin
 */

THREE.CompleteCameraControls = function ( object, domElement ) {

	var _this = this;
	var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };

	//**Obeject to hold the mapping of keyEvents to camera controls 
	//**The defualt comands can be changed by calling the assignKeyToCamMoveCtrl function
	//** or the assignKeyToCamRotateCtrl and passing in the new keys you want mapped to a given control	
	//var camMoveCommandMap = {MOVEUP: 88/*X*/, MOVEDOWN: 90/*Z*/, MOVELEFT: 37/*LEFTARROW*/, MOVERIGHT: 39/*RIGHTARROW*/, MOVEFORWARD: 38/*UPARROW*/, MOVEBACK: 40/*DOWNARROW*/};
	//var camRotateCommandMap = {ROTATEUP: 87/*W*/, ROTATEDOWN: 83/*S*/, ROTATELEFT: 65/*A*/, ROTATERIGHT: 68/*D*/,};
	//*******************************************************************//
	//*******************************************************************//
	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;

	this.screen = { left: 0, top: 0, width: 0, height: 0 };

	//**First Person Controles**//
	this.moveForward = false;
	this.moveBackward = false;
	this.moveLeft = false;
	this.moveRight = false;
	this.rotateLeft = false;
	this.rotateRight = false;
	this.rotateUp = false;
	this.rotateDown = false;

	this.lat = 0;
	this.lon = 0;
	this.phi = 0;
	this.theta = 0;

	this.enabled = true;

	this.movementSpeed = 1.0;
	this.lookSpeed = 0.005;

	this.lookVertical = false;
	this.autoForward = false;

	this.activeLook = true;

	this.constrainVertical = false;
	this.verticalMin = 0;
	this.verticalMax = Math.PI;

	this.autoSpeedFactor = 0.0;

	this.mouseX = 0;
	this.mouseY = 0;

	this.mouseDragOn = false;

	this.viewHalfX = 0;
	this.viewHalfY = 0;
	//**FPV End**//

	//CAMERA COMAND BLOCKS CONTROLE
	this.noMove = false;
	this.move_X_Distance = 0;
	this.move_Y_Distance = 0;
	this.move_Z_Distance = 0;

	this.TrackballControls = false;
	this.FirstPersonControls = false;

	this.rotateSpeed = 1.0;
	this.zoomSpeed = 1.2;
	this.panSpeed = 0.3;

	
	this.noRotate = false;
	this.noZoom = false;
	this.noRoll = false;

	this.staticMoving = false;
	this.dynamicDampingFactor = 0.2;

	this.minDistance = 0;
	this.maxDistance = Infinity;

	//this.keys = [65 /*A*/, 66 /*B*/, 67 /*C*/, 68 /*D*/, 69 /*E*/, 70 /*F*/, 71 /*G*/, 72 /*H*/, 73 /*I*/ ,74 /*J*/, 75 /*K*/, 76 /*L*/, 77 /*M*/, 78 /*N*/, 79 /*O*/, 80 /*P*/, 81 /*Q*/, 82 /*R*/, 83 /*S*/, 84 /*T*/, 85 /*U*/, 86 /*V*/, 87 /*P*/, 88 /*X*/, 89 /*P*/, 90 /*Z*/,];
	//this.keys = [ 65 /*A*/, 83 /*S*/, 68 /*D*/ ];

	// internals

	this.target = new THREE.Vector3();

	var EPS = 0.000001;
	var camMoveSteps = 0.5;
	var lastPosition = new THREE.Vector3();

	
	this.rotateStart = new THREE.Vector3();
	this.rotateEnd = new THREE.Vector3();

	var _state = STATE.NONE,
	_prevState = STATE.NONE,

	_eye = new THREE.Vector3(),

	_zoomStart = new THREE.Vector2(),
	_zoomEnd = new THREE.Vector2(),

	_touchZoomDistanceStart = 0,
	_touchZoomDistanceEnd = 0;

	// for reset

	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.up0 = this.object.up.clone();

	// events

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start'};
	var endEvent = { type: 'end'};


	// methods

	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.screen.left = 0;
			this.screen.top = 0;
			this.screen.width = window.innerWidth;
			this.screen.height = window.innerHeight;

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			var box = this.domElement.getBoundingClientRect();
			// adjustments come from similar code in the jquery offset() function
			var d = this.domElement.ownerDocument.documentElement;
			this.screen.left = box.left + window.pageXOffset - d.clientLeft;
			this.screen.top = box.top + window.pageYOffset - d.clientTop;
			this.screen.width = box.width;
			this.screen.height = box.height;

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	};

	this.handleEvent = function ( event ) {

		if ( typeof this[ event.type ] == 'function' ) {

			this[ event.type ]( event );

		}

	};

	var getMouseOnScreen = ( function () {

		var vector = new THREE.Vector2();

		return function ( pageX, pageY ) {

			vector.set(
				( pageX - _this.screen.left ) / _this.screen.width,
				( pageY - _this.screen.top ) / _this.screen.height
			);

			return vector;

		};

	}() );

	var getMouseProjectionOnBall = ( function () {

		var vector = new THREE.Vector3();
		var objectUp = new THREE.Vector3();
		var mouseOnBall = new THREE.Vector3();

		return function ( pageX, pageY ) {

			mouseOnBall.set(
				( pageX - _this.screen.width * 0.5 - _this.screen.left ) / (_this.screen.width*.5),
				( _this.screen.height * 0.5 + _this.screen.top - pageY ) / (_this.screen.height*.5),
				0.0
			);
			var length = mouseOnBall.length();

			if ( _this.noRoll ) {

				if ( length < Math.SQRT1_2 ) {

					mouseOnBall.z = Math.sqrt( 1.0 - length*length );

				} else {

					mouseOnBall.z = .5 / length;
					
				}

			} else if ( length > 1.0 ) {

				mouseOnBall.normalize();

			} else {

				mouseOnBall.z = Math.sqrt( 1.0 - length * length );

			}

			_eye.copy( _this.object.position ).sub( _this.target );

			vector.copy( _this.object.up ).setLength( mouseOnBall.y )
			vector.add( objectUp.copy( _this.object.up ).cross( _eye ).setLength( mouseOnBall.x ) );
			vector.add( _eye.setLength( mouseOnBall.z ) );

			return vector;

		};

	}() );
	
	//**************************************************//
	//function to rotate camera based on a given key event
	this.keyRotateCamera = (function() {

	var axis = new THREE.Vector3(),
		quaternion = new THREE.Quaternion();

		return function(){
			var angle = Math.acos( _this.rotateStart.dot( _this.rotateEnd ) / _this.rotateStart.length() / _this.rotateEnd.length() );

		}

	}());
	//**************************************************//
	//**************************************************//

	this.rotateCamera = (function(){

		var axis = new THREE.Vector3(),
			quaternion = new THREE.Quaternion();


		return function () {

			var angle = Math.acos( _this.rotateStart.dot( _this.rotateEnd ) / _this.rotateStart.length() / _this.rotateEnd.length() );

			if ( angle ) {

				axis.crossVectors( _this.rotateStart, _this.rotateEnd ).normalize();

				angle *= _this.rotateSpeed;

				quaternion.setFromAxisAngle( axis, -angle );

				_eye.applyQuaternion( quaternion );
				_this.object.up.applyQuaternion( quaternion );

				_this.rotateEnd.applyQuaternion( quaternion );

				if ( _this.staticMoving ) {

					_this.rotateStart.copy( _this.rotateEnd );

				} else {

					quaternion.setFromAxisAngle( axis, angle * ( _this.dynamicDampingFactor - 1.0 ) );
					_this.rotateStart.applyQuaternion( quaternion );

				}

			}
		}

	}());

	this.zoomCamera = function () {

		if ( _state === STATE.TOUCH_ZOOM_PAN ) {

			var factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
			_touchZoomDistanceStart = _touchZoomDistanceEnd;
			_eye.multiplyScalar( factor );

		} else {

			var factor = 1.0 + ( _zoomEnd.y - _zoomStart.y ) * _this.zoomSpeed;

			if ( factor !== 1.0 && factor > 0.0 ) {

				_eye.multiplyScalar( factor );

				if ( _this.staticMoving ) {

					_zoomStart.copy( _zoomEnd );

				} else {

					_zoomStart.y += ( _zoomEnd.y - _zoomStart.y ) * this.dynamicDampingFactor;

				}

			}

		}

	};


	this.checkDistances = function () {

		if ( !_this.noZoom) {

			if ( _eye.lengthSq() > _this.maxDistance * _this.maxDistance ) {

				_this.object.position.addVectors( _this.target, _eye.setLength( _this.maxDistance ) );

			}

			if ( _eye.lengthSq() < _this.minDistance * _this.minDistance ) {

				_this.object.position.addVectors( _this.target, _eye.setLength( _this.minDistance ) );

			}

		}

	};


	//**********************************************************************//
	//********************Scratch Block Camera Controls*********************//
	//**********************************************************************//
	this.moveCamera = (function(){

		var mouseChange = new THREE.Vector2(),
			objectUp = new THREE.Vector3(),
			move = new THREE.Vector3(_this.move_X_Distance,_this.move_Y_Distance,_this.move_Z_Distance);
		return function () {
			move.x = _this.move_X_Distance;
			move.y = _this.move_Y_Distance;
			move.z = _this.move_Z_Distance;
			_this.object.position.add( move );
			_this.target.add( move );
			_this.move_X_Distance = 0.0;
			_this.move_Y_Distance = 0.0;
			_this.move_Z_Distance = 0.0;
		}

	}());

	
	//**********************************************************************//
	//********************************END*******************************//
	//**********************************************************************//
	

	this.onKeyDown = function ( event ) {

		//event.preventDefault();

		switch ( event.keyCode ) {

			case 38: /*up*/_this.moveForward = true; break;
			case 87: /*W*/ _this.rotateUp = true; break;

			case 37: /*left*/ _this.moveLeft = true; break;
			case 65: /*A*/ _this.rotateLeft = true; break;

			case 40: /*down*/ _this.moveBackward = true; break;
			case 83: /*S*/ 	_this.rotateDown = true; break;

			case 39: /*right*/ _this.moveRight = true; break;
			case 68: /*D*/ 	_this.rotateRight = true; break;

			case 82: /*R*/ _this.moveUp = true; break;
			case 70: /*F*/ _this.moveDown = true; break;

		}

	};


	this.onKeyUp = function ( event ) {

		switch ( event.keyCode ) {

			case 38: /*up*/ _this.moveForward = false; break;
			case 87: /*W*/ 	_this.rotateUp = false; break;

			case 37: /*left*/ _this.moveLeft = false; break;
			case 65: /*A*/ 	_this.rotateLeft = false; break;

			case 40: /*down*/ _this.moveBackward = false; break;
			case 83: /*S*/ 	_this.rotateDown = false; break;

			case 39: /*right*/ _this.moveRight = false; break;
			case 68: /*D*/ 	_this.rotateRight = false; break;

			case 82: /*R*/ _this.moveUp = false; break;
			case 70: /*F*/ _this.moveDown = false; break;

		}

	};



	function mousedown( event ) {

	if(_this.TrackballControls){
		//Track Ball Controls For Mouse Down
		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		if ( _state === STATE.NONE ) {

			_state = event.button;

		}

		if ( _state === STATE.ROTATE && !_this.noRotate ) {

			_this.rotateStart.copy( getMouseProjectionOnBall( event.pageX, event.pageY ) );
			_this.rotateEnd.copy( _this.rotateStart );

		} else if ( _state === STATE.ZOOM && !_this.noZoom ) {

			_zoomStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
			_zoomEnd.copy(_zoomStart);

		} 

		document.addEventListener( 'mousemove', mousemove, false );
		document.addEventListener( 'mouseup', mouseup, false );

		_this.dispatchEvent( startEvent );

	}else if(_this.FirstPersonControls){

		//First Person On Mouse Down
		if ( this.domElement !== document ) {

			_this.domElement.focus();

		}

		event.preventDefault();
		event.stopPropagation();

		if ( _this.activeLook ) {

			switch ( event.button ) {

				case 0: _this.moveForward = true; break;
				case 2: _this.moveBackward = true; break;

			}

		}

		_this.mouseDragOn = true;

	}



	}

	function mousemove( event ) {

	if(_this.TrackballControls){
		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		if ( _state === STATE.ROTATE && !_this.noRotate ) {

			_this.rotateEnd.copy( getMouseProjectionOnBall( event.pageX, event.pageY ) );

		} else if ( _state === STATE.ZOOM && !_this.noZoom ) {

			_zoomEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

		} 
	}else if(_this.FirstPersonControls){

		if ( _this.domElement === document ) {

			_this.mouseX = event.pageX - _this.viewHalfX;
			_this.mouseY = event.pageY - _this.viewHalfY;

		} else {

			_this.mouseX = event.pageX - _this.domElement.offsetLeft - _this.viewHalfX;
			_this.mouseY = event.pageY - _this.domElement.offsetTop - _this.viewHalfY;

		}
	}

	}

	function mouseup( event ) {

	if(_this.TrackballControls){
		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		_state = STATE.NONE;

		document.removeEventListener( 'mousemove', mousemove );
		document.removeEventListener( 'mouseup', mouseup );
		_this.dispatchEvent( endEvent );
	}else if(_this.FirstPersonControls){

	}

	}

	function mousewheel( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		var delta = 0;

		if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta / 40;

		} else if ( event.detail ) { // Firefox

			delta = - event.detail / 3;

		}

		_zoomStart.y += delta * 0.01;
		_this.dispatchEvent( startEvent );
		_this.dispatchEvent( endEvent );

	}

	function touchstart( event ) {

		if ( _this.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:
				_state = STATE.TOUCH_ROTATE;
				_this.rotateStart.copy( getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				_this.rotateEnd.copy( _this.rotateStart );
				break;

			case 2:
				_state = STATE.TOUCH_ZOOM_PAN;
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt( dx * dx + dy * dy );

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				break;

			default:
				_state = STATE.NONE;

		}
		_this.dispatchEvent( startEvent );


	}

	function touchmove( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		switch ( event.touches.length ) {

			case 1:
				_this.rotateEnd.copy( getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				break;

			case 2:
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				_touchZoomDistanceEnd = Math.sqrt( dx * dx + dy * dy );

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				break;

			default:
				_state = STATE.NONE;

		}

	}

	function touchend( event ) {

		if ( _this.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:
				_this.rotateEnd.copy( getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				_this.rotateStart.copy( _this.rotateEnd );
				break;

			case 2:
				_touchZoomDistanceStart = _touchZoomDistanceEnd = 0;

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				break;

		}

		_state = STATE.NONE;
		_this.dispatchEvent( endEvent );

	}

	//Called When the code is first run
	this.update = function (delta ) {

		//******************************************************//
		//*************First person controls update*************//
		//******************************************************//
		if(_this.TrackballControls){
		_eye.subVectors( _this.object.position, _this.target );

		if ( !_this.noRotate ) {

			_this.rotateCamera();

		}

		if ( !_this.noZoom ) {

			_this.zoomCamera();

		}

		if ( !_this.noMove ) {

			_this.moveCamera();

		}

		_this.object.position.addVectors( _this.target, _eye );

		_this.checkDistances();

		_this.object.lookAt( _this.target );

		if ( lastPosition.distanceToSquared( _this.object.position ) > EPS ) {

			_this.dispatchEvent( changeEvent );

			lastPosition.copy( _this.object.position );

		}
	}
	//******************************************************//
	//*************First person controls update*************//
	//******************************************************//
	else if(_this.FirstPersonControls){
	
		if ( _this.enabled === false ) return;

		if ( _this.heightSpeed ) {

			var y = THREE.Math.clamp( _this.object.position.y, _this.heightMin, _this.heightMax );
			var heightDelta = y - _this.heightMin;

			_this.autoSpeedFactor = delta * ( heightDelta * _this.heightCoef );

		} else {

			_this.autoSpeedFactor = 0.0;

		}

		var actualMoveSpeed = delta * _this.movementSpeed;

		if ( _this.moveForward || ( _this.autoForward && !_this.moveBackward ) ) _this.object.translateZ( - ( actualMoveSpeed + _this.autoSpeedFactor ) );
		if ( _this.moveBackward ) _this.object.translateZ( actualMoveSpeed );

		if ( _this.moveLeft ) _this.object.translateX( - actualMoveSpeed );
		if ( _this.moveRight ) _this.object.translateX( actualMoveSpeed );

		if ( _this.moveUp ) _this.object.translateY( actualMoveSpeed );
		if ( _this.moveDown ) _this.object.translateY( - actualMoveSpeed );

		var actualLookSpeed = delta * _this.lookSpeed;

		if ( !_this.activeLook ) {

			//actualLookSpeed = 0;

		}

		var verticalLookRatio = 1;

		if ( _this.constrainVertical ) {

			verticalLookRatio = Math.PI / ( _this.verticalMax - _this.verticalMin );

		}

		var targetPosition = _this.target,
			position = _this.object.position;

		//Rotate along x axis
		if (_this.rotateLeft) _this.lon -= 50 * actualLookSpeed;
		else if (_this.rotateRight) _this.lon += 50 * actualLookSpeed;
		if (_this.rotateUp && _this.lookVertical) _this.lat += 50 * actualLookSpeed * verticalLookRatio;
		else if (_this.rotateDown && _this.lookVertical) _this.lat -= 50 * actualLookSpeed * verticalLookRatio;
		_this.lat = Math.max( - 85, Math.min( 85, _this.lat ) );
		_this.phi = THREE.Math.degToRad( 90 - _this.lat );

		_this.theta = THREE.Math.degToRad( _this.lon );

		if ( _this.constrainVertical ) {

			_this.phi = THREE.Math.mapLinear( _this.phi, 0, Math.PI, _this.verticalMin, _this.verticalMax );
		}
	}

	};

	this.reset = function () {

		_state = STATE.NONE;
		_prevState = STATE.NONE;

		_this.target.copy( _this.target0 );
		_this.object.position.copy( _this.position0 );
		_this.object.up.copy( _this.up0 );

		_eye.subVectors( _this.object.position, _this.target );

		_this.object.lookAt( _this.target );

		_this.dispatchEvent( changeEvent );

		lastPosition.copy( _this.object.position );

	};

	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

	this.domElement.addEventListener( 'mousedown', mousedown, false );

	this.domElement.addEventListener( 'mousewheel', mousewheel, false );
	this.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false ); // firefox

	this.domElement.addEventListener( 'touchstart', touchstart, false );
	this.domElement.addEventListener( 'touchend', touchend, false );
	this.domElement.addEventListener( 'touchmove', touchmove, false );

	window.addEventListener( 'keydown', bind( this, this.onKeyDown ), false );
	window.addEventListener( 'keyup', bind( this, this.onKeyUp ), false );

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	};

	this.handleResize();

	// force an update at start
	this.update();

};

THREE.TrackballControls.prototype = Object.create( THREE.EventDispatcher.prototype );

