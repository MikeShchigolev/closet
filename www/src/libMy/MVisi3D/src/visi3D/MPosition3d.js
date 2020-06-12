import MUtility from './MUtility.js';
import MSky from './MSky.js';
import MSmc from './MSmc.js';

export default function MPosition3d (_parent, _content2d) {
	var self = this;

	this.parent = _parent;
	this.content2d = _content2d;
	this.drag = true;
	this.zdvigX = 0;
	this.sPixi = undefined;

	this.pause = false;
	this.minMaxX = new THREE.Vector2(0, 2.5);

	this.zume = new THREE.Vector3(1, 30, 10);

	this.point = new THREE.Vector2(0, 0);
	this.point1 = new THREE.Vector2(0, 0);
	this.b = 0;

	this.minZum = 0;
	this.maxZum = 5000;
	this.powerZum = 5;

	this.distMinMaxBox = 500;


	this.isDragPan = _parent._isDragPan;
	this.isRotateScene = false;

	var sceneRotationY = 0;


	this.getStage = function (c) {
		if (c.parent == undefined) return c;
		else return this.getStage(c.parent);
		return null;
	};


	this.stageMoveNew = function (e) {

		if (self.pause == true) return;
		if (self.drag == false) return;

		if (e.data && self.isDragPan && isMovePan) {
			handleMouseMovePan(e.data.originalEvent);
			return;
		}

		if (e.data && self.isRotateScene && e.data.originalEvent.shiftKey) {
			self.parent.scene.rotation.y = sceneRotationY + (pl102.global.x - self.point1.x) * 0.01;
			self.parent.intRend = 1;
		} else {

			self.parent.rotationX = self.point.y - (pl102.global.y - self.point1.y) * 0.01;
			if (self.minMaxX.x > self.parent.rotationX) self.parent.rotationX = self.minMaxX.x;
			if (self.minMaxX.y < self.parent.rotationX) self.parent.rotationX = self.minMaxX.y;
			self.parent.rotationZ = self.point.x + (pl102.global.x - self.point1.x) * 0.01;
		}
	};

	this.stageUpNew = function (e) {

		if (pl102.isMouseEvents) {
			self.sPixi.off('mouseup', self.stageUpNew);
			self.sPixi.off('mousemove', self.stageMoveNew);
		}

		if (pl102.isTouchEvents) {
			self.sPixi.off('touchend', self.stageUpNew);
			self.sPixi.off('touchmove', self.stageMoveNew);
		}
	};

	this.mouseUpp = function (e) {
		self.parent.intRend = 1;
	};


	// if (pl102.isMouseEvents) {
	// 	self.sPixi.on('mouseup', self.mouseUpp);
	// }

	// if (pl102.isTouchEvents) {
	// 	self.sPixi.on('touchend', self.mouseUpp);
	// }

	var isMovePan = false;

	this.mouseDown = function (e) {

		if (self.pause == true) return;
		if (self.drag == false) return;

		isMovePan = false;
		if (self.isDragPan && e && e.data.originalEvent.button === 1) {
			isMovePan = true;
			handleMouseDownPan(e.data.originalEvent);
		}

		self.point.y = self.parent.rotationX;
		self.point.x = self.parent.rotationZ;
		if (self.isRotateScene) {
			sceneRotationY = self.parent.scene.rotation.y;
		}


		self.point1.x = pl102.global.x;
		self.point1.y = pl102.global.y;

		// self.parent.tween.stop();

		// stage.addEventListener("stagemousemove", self.stageMoveNew);
		// stage.addEventListener("stagemouseup", self.stageUpNew);
		// window.document.addEventListener('mousemove',    self.stageMoveNew, true);
		// window.document.addEventListener('mouseup',    self.stageUpNew, true);
		if (pl102.isMouseEvents) {
			self.sPixi.off('mouseup', self.stageUpNew);
			self.sPixi.off('mousemove', self.stageMoveNew);
			self.sPixi.on('mouseup', self.stageUpNew);
			self.sPixi.on('mousemove', self.stageMoveNew);
		}

		if (pl102.isTouchEvents) {
			self.sPixi.off('touchend', self.stageUpNew);
			self.sPixi.off('touchmove', self.stageMoveNew);
			self.sPixi.on('touchend', self.stageUpNew);
			self.sPixi.on('touchmove', self.stageMoveNew);
		}
	};

	// self.sPixi.on('mousedown', self.mouseDown);
	// main.contentCurs.addEventListener( 'mousedown', this.mouseDown); /// TODO убрал это
	// contentHTML.addEventListener('mousedown',    this.mouseDown, true);

	// self.parent.parent.parent.stage.addEventListener( 'mousedown', this.mouseDown);
	var www;
	this.mousewheel = function (e) {

		if (self.pause == true) return;
		if (self.drag == false) return;


		www = self.parent._zume + (-e.delta) * self.powerZum;
		if (www < self.minZum) www = self.minZum;
		if (www > self.maxZum) www = self.maxZum;
		self.parent.zume = www;
		self.parent.intRend = 1;
	};

	if (this.content2d != undefined) {
		this.sPixi = this.getStage(this.content2d);
		this.sPixi.interactive = true;

		if (pl102.devas == false) {
			_content2d.on('mousedown', this.mouseDown);
			pl102Wheel.on(_content2d, 'mousewheel', this.mousewheel);
		} else {
			_content2d.on('touchstart', this.mouseDown);
		}
	}


	var panOffset = new THREE.Vector3();
	var panStart = new THREE.Vector2();
	var panEnd = new THREE.Vector2();
	var panDelta = new THREE.Vector2();

	function handleMouseDownPan (event) {
		panStart.set(event.clientX, event.clientY);
	}

	function handleMouseMovePan (event) {
		panEnd.set(event.clientX, event.clientY);
		panDelta.subVectors(panEnd, panStart);
		self.moveCamXY(panDelta);
		panStart.copy(panEnd);
	}
	var panLeft = (function () {
		var v = new THREE.Vector3();
		return function panLeft (distance, objectMatrix) {
			v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
			v.multiplyScalar(-distance);
			panOffset.add(v);
		};
	}());

	var panUp = (function () {
		var v = new THREE.Vector3();
		return function panUp (distance, objectMatrix) {
			v.setFromMatrixColumn(objectMatrix, 1); // get Y column of objectMatrix
			v.multiplyScalar(distance);
			panOffset.add(v);
		};
	}());
	var pan = (function () {
		return function pan (deltaX, deltaY) {
			var element = self.parent.renderer.domElement;
			if (self.parent.camera.isPerspectiveCamera) {
				var targetDistance = Math.max(self.parent.zume, 10);
				targetDistance *= Math.tan((self.parent.camera.fov / 2) * Math.PI / 180.0);
				// we actually don't use screenWidth, since perspective camera is fixed to screen height
				panLeft(2 * deltaX * targetDistance / element.clientHeight, self.parent.camera.matrixWorld);
				panUp(2 * deltaY * targetDistance / element.clientHeight, self.parent.camera.matrixWorld);
			} else {
				console.warn('WARNING: camera neither perspective.');
			}
		};
	}());

	this.moveCamXY = function (v) {
		panOffset.set(0, 0, 0);
		self.parent.camera.updateMatrixWorld();
		self.parent.scene.updateMatrixWorld();
		if (arguments.length > 1) {
			v = {
				x: arguments[0],
				y: arguments[1]
			};
		}
		pan((v.x || 0), (v.y || 0));
		self.parent.xVerh += panOffset.x;
		self.parent.yVerh += -panOffset.y;
		self.parent.zVerh += panOffset.z;

		self.parent.xVerh = Math.max(Math.min(self.parent.xVerh, self.distMinMaxBox), -self.distMinMaxBox);
		self.parent.zVerh = Math.max(Math.min(self.parent.zVerh, self.distMinMaxBox), -self.distMinMaxBox);
		self.parent.yVerh = Math.max(Math.min(self.parent.yVerh, self.distMinMaxBox), -self.distMinMaxBox);
		panOffset.set(0, 0, 0);
	};

}
