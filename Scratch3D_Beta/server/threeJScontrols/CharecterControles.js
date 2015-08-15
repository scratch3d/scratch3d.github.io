var CHARECTERCONTROLS = {};


var tweenRotiaion;
var tweenPosition;
var rotation = {x: 0, y: 0, z: 0};
var position = { x : 0, y: 0, z: 0 };
var targetRotation = { x : 0, y: 0, z: 0 }
var targetPostion = { x : 0, y: 0, z: 0 };


CHARECTERCONTROLS.moveForward = function(blendMesh, steps){
			blendMesh.stopAll();
			blendMesh.play('walk');
			/*
			**Rotates the charecter to proper direction
			**
			*/
			rotation =  { x : blendMesh.rotation.x, y: blendMesh.rotation.y, z: blendMesh.rotation.z};
			var radi = Math.PI * -0 / 180;
			targetRotation = { x : rotation.x, y: radi, z: rotation.x};
			console.log((radi*100)+500);
			tweenRotiaion = new TWEEN.Tween(rotation).to(targetRotation, ((radi*100)+500));
			tweenRotiaion.onUpdate(function(){
    			blendMesh.rotation.y = rotation.y;
				});
			tweenRotiaion.onComplete(function(){
    			tweenPosition.start();
				});
			
			/*
			**
			**
			*/

			position =  { x : blendMesh.position.x, y: blendMesh.position.y, z: blendMesh.position.z};
			targetPostion = { x : blendMesh.position.x, y: blendMesh.position.y, z: blendMesh.position.z + parseFloat(-steps)};
			tweenPosition = new TWEEN.Tween(position).to(targetPostion, 2000);
			tweenPosition.onUpdate(function(){
    			blendMesh.position.z = position.z;
				});
			tweenPosition.onComplete(function(){
				blendMesh.stopAll();
				blendMesh.play('idle');
    			TWEEN.removeAll();
				});
			tweenRotiaion.start();
			
		}



CHARECTERCONTROLS.moveBack = function(blendMesh, steps){
			blendMesh.stopAll();
			blendMesh.play('walk');
			/*
			**Rotates the charecter to proper direction
			**
			*/
			rotation =  { x : blendMesh.rotation.x, y: blendMesh.rotation.y, z: blendMesh.rotation.z};
			var radi = Math.PI * -180 / 180;
			targetRotation = { x : rotation.x, y: radi, z: rotation.x};
			console.log((radi*100)+500);
			tweenRotiaion = new TWEEN.Tween(rotation).to(targetRotation, ((radi*100)+500));
			tweenRotiaion.onUpdate(function(){
    			blendMesh.rotation.y = rotation.y;
				});
			tweenRotiaion.onComplete(function(){
    			tweenPosition.start();
				});
			
			/*
			**
			**
			*/

			position =  { x : blendMesh.position.x, y: blendMesh.position.y, z: blendMesh.position.z};
			targetPostion = { x : blendMesh.position.x, y: blendMesh.position.y, z: blendMesh.position.z + parseFloat(steps)};
			tweenPosition = new TWEEN.Tween(position).to(targetPostion, 2000);
			tweenPosition.onUpdate(function(){
    			blendMesh.position.z = position.z;
				});
			tweenPosition.onComplete(function(){
				blendMesh.stopAll();
				blendMesh.play('idle');
    			TWEEN.removeAll();
				});
			tweenRotiaion.start();
			
		}










	CHARECTERCONTROLS.moveRight = function(blendMesh, steps){
			blendMesh.stopAll();
			blendMesh.play('walk');
			/*
			**Rotates the charecter to proper direction
			**
			*/
			rotation =  { x : blendMesh.rotation.x, y: blendMesh.rotation.y, z: blendMesh.rotation.z};
			var radi = Math.PI * -90 / 180;
			targetRotation = { x : rotation.x, y: radi, z: rotation.x};
			console.log((radi*100)+500);
			tweenRotiaion = new TWEEN.Tween(rotation).to(targetRotation, ((radi*100)+500));
			tweenRotiaion.onUpdate(function(){
    			blendMesh.rotation.y = rotation.y;
				});
			tweenRotiaion.onComplete(function(){
    			tweenPosition.start();
				});
			
			/*
			**
			**
			*/

			position =  { x: blendMesh.position.x, y: blendMesh.position.y, z: blendMesh.position.z};
			targetPostion = { x: blendMesh.position.x +parseFloat(steps), y: blendMesh.position.y, z: blendMesh.position.z};
			console.log("Target postion right", targetPostion);
			tweenPosition = new TWEEN.Tween(position).to(targetPostion, 2000);
			tweenPosition.onUpdate(function(){
    			blendMesh.position.x = position.x;
				});
			tweenPosition.onComplete(function(){
				blendMesh.stopAll();
				blendMesh.play('idle');
    			TWEEN.removeAll();
				});
			tweenRotiaion.start();
			
		}





CHARECTERCONTROLS.moveLeft = function(blendMesh, steps){
			blendMesh.stopAll();
			blendMesh.play('walk');
			/*
			**Rotates the charecter to proper direction
			**
			*/
			rotation =  { x : blendMesh.rotation.x, y: blendMesh.rotation.y, z: blendMesh.rotation.z};
			var radi = Math.PI * -270 / 180;
			targetRotation = { x : rotation.x, y: radi, z: rotation.x};
			console.log((radi*100)+500);
			tweenRotiaion = new TWEEN.Tween(rotation).to(targetRotation, ((radi*100)+500));
			tweenRotiaion.onUpdate(function(){
    			blendMesh.rotation.y = rotation.y;
    			console.log("tweening");
				});
			tweenRotiaion.onComplete(function(){
    			tweenPosition.start();
				});
			
			/*
			**
			**
			*/

			position =  { x: blendMesh.position.x, y: blendMesh.position.y, z: blendMesh.position.z};
			targetPostion = { x: blendMesh.position.x +(-parseFloat(steps)), y: blendMesh.position.y, z: blendMesh.position.z};
			tweenPosition = new TWEEN.Tween(position).to(targetPostion, 2000);
			tweenPosition.onUpdate(function(){
    			blendMesh.position.x = position.x;
				});
			tweenPosition.onComplete(function(){
				blendMesh.stopAll();
				blendMesh.play('idle');
    			TWEEN.removeAll();
				});
			tweenRotiaion.start();
			
		}
