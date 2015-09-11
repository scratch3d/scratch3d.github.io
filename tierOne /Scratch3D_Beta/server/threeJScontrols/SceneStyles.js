
var SCENESTYLES = {};
//new THREE.Mesh(new THREE.PlaneGeometry(300,300), new THREE.MeshNormalMaterial());


SCENESTYLES.gridSize = 20;


SCENESTYLES.GRID = function(){
var geo = new THREE.Geometry();
var material = new THREE.LineBasicMaterial({color: 'white'});
	

	var step = 1;
	for(var i = -SCENESTYLES.gridSize; i<= SCENESTYLES.gridSize; i+=step){
	geo.vertices.push(new THREE.Vector3(-SCENESTYLES.gridSize, -0.04, i));
	geo.vertices.push(new THREE.Vector3(SCENESTYLES.gridSize, -0.04, i));
	geo.vertices.push(new THREE.Vector3(i, -0.04, -SCENESTYLES.gridSize));
	geo.vertices.push(new THREE.Vector3(i, -0.04, SCENESTYLES.gridSize));
	}


	var line = new THREE.Line(geo, material, THREE.LinePieces);
	return line;
}