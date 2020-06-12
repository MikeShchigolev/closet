
import MVisi3D from '../visi3D/MVisi3D.js';
import SceneSB from '../../../common/SceneSB.js';
import PLSceneSettingBig from '../../../common/PLSceneSettingBig.js';

export default function AppView (_contentHTML, _stage) {
	var self = this;

	this.content = new PIXI.Container();
	_stage.addChild(this.content);

	this.visi3D = null;
	this.width = 100;
	this.height = 100;
	this.otstup = 2;
	this.config = '{"ambient":{"works":true,"active":true,"color":"#ffffff","intensity":0.4},"shadow":{"works":true,"active":true,"mapSize":4096,"color":"0xffffff","bias":-0.0016,"intensity":0.79,"radius":1.58,"renderSingleSided":true,"bAlphaForCoating":false,"fixation":false,"rotationX":0.48,"rotationZ":0,"distance":1000,"cubWidth":1000,"cubHeight":1000,"shadowMapCullFace":2},"smcShadow":{"works":true,"active":true,"wh":512},"sky":{"works":true,"active":true,"color":"0xffffff","link":"resources/6964570fd29905fbf1a421cf99110505.jpeg","radius":1000},"mirror":{"works":true,"link":"null","exposure":-1,"gamma":-1},"visi3D":{"works":true,"fov":45,"far":20000}}';

	this.init = function () {
		this.visi3D = new MVisi3D(_contentHTML, this.content, false, true, true, true, true);
		this.visi3D.renderer.setClearColor(0xe5e5e5, 1);
		this.visi3D.utility.debug = true;
		window.visi3D = this.visi3D;
		var geometry = new THREE.CubeGeometry(200, 200, 200);
		// for (var i = 0; i < geometry.faces.length; i++) {
		// 	geometry.faces[i].color.setHex( Math.random() * 0xffffff );
		// }
		var texture = new THREE.TextureLoader().load( 'resources/grass_difuse.jpg', function () {
			self.visi3D.intRend = 1;
		});

		var material = new THREE.MeshBasicMaterial( { 
			map: texture
		});
		this.mesh = new THREE.Mesh(geometry, material);
		this.visi3D.rotationX = Math.PI / 4;
		this.visi3D.rotationZ = Math.PI / 4;

		window.targetObject = this.mesh;

		this.visi3D.groupObject.add( this.mesh );

		this.visi3D.event3DArr.addChild(this.mesh);
		this.visi3D.event3DArr.eventSob.addEvent('down', this.onDown);
		this.visi3D.event3DArr.eventSob.addEvent('over', this.onOver);
		this.visi3D.event3DArr.eventSob.addEvent('out', this.onOut);
		this.visi3D.event3DArr.eventSob.addEvent('up', this.onUp);
		this.visi3D.event3DArr.eventSob.addEvent('move', this.onMove);

		this.sceneSB = new SceneSB();
		this.sceneSettingBig = new PLSceneSettingBig(
			this.content, 
			this.otstup,
			this.otstup,
			this.sceneSB.array,
			function () {}
		);
		this.sceneSettingBig.setObj(JSON.parse(this.config));

		this.visi3D.sizeWindow(
			this.sceneSettingBig.width,
			this.otstup,
			this.width - this.sceneSettingBig.width - this.otstup * 2,
			this.height - this.otstup * 2
		);
	};

	this.onDown = function (e) {
		trace('<<>>--onDown--', e);
	};

	this.onOver = function (e) {
		trace('<<>>--onOver--', e);
	};

	this.onOut = function (e) {
		trace('<<>>--onOut--', e);
	};

	this.onUp = function (e) {
		trace('<<>>--onUp--', e);
	};

	this.onMove = function (e) {
		trace('<<>>--onMove--', e);
	};


	this.sizeWindow = function (_width, _height) {
		this.width = _width;
		this.height = _height;
		if (this.visi3D === null) return;

		this.visi3D.sizeWindow(
			this.sceneSettingBig._width + this.otstup,
			this.otstup,
			this.width - this.sceneSettingBig._width - this.otstup * 2,
			this.height - this.otstup * 2
		);
		this.sceneSettingBig.height = this.height - this.otstup * 2;
	};

	this.update = function () {
		if (this.visi3D === null) return;
		this.visi3D.upDate();
	};

	this.init();

}

AppView.prototype.constructor = AppView;

Object.defineProperties(AppView.prototype, {});
