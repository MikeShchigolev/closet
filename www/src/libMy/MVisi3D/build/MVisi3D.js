(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("MVISI3D", [], factory);
	else if(typeof exports === 'object')
		exports["MVISI3D"] = factory();
	else
		root["MVISI3D"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "MVisi3D/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./MVisi3D/src/visi3D/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./MVisi3D/src/visi3D/MEffectArray.js":
/*!********************************************!*\
  !*** ./MVisi3D/src/visi3D/MEffectArray.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MEffectArray;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function MEffectArray(_visi3D, _startArray) {
  var self = this;
  this.visi3D = _visi3D;
  this._startArray = []; // _startArray;

  this._width = _visi3D._width;
  this._height = _visi3D._height;
  this.scene = this.visi3D.scene;
  this.camera = this.visi3D.camera;
  this.renderer = this.visi3D.renderer;
  this.composer = new THREE.EffectComposer(this.renderer);
  this.RENDER_PASS = false;
  this.OUTLINE_PASS = false;
  this.OUTLINE_COLOR = '#0000ff';
  this.OUTLINE_COLOR1 = '#ff0000';
  this.STRJSON = '{"edgeGlow":0,"usePatternTexture":false,"edgeThickness":1,"edgeStrength":3,"downSampleRatio":2,"pulsePeriod":0}';
  this.SAOJSON = '{"saoBlur":true,"output":0,"saoBias":0,"saoBlurDepthCutoff":0,"saoBlurRadius":8,"saoBlurStdDev":4,"saoIntensity":0.18,"saoKernelRadius":100,"saoMinResolution":0,"saoScale":11.58}';
  this.TAA_PASS = false;
  this.SAMPLE_LEVEL = 0;
  this.STEREO_PASS = false;
  this.SHADER_PASS = false;
  this.SAO_PASS = false;
  this.SSAO_PASS = false;
  this._renderPass = this.RENDER_PASS;
  this._outlinePass = this.OUTLINE_PASS;
  this._outlineColor = this.OUTLINE_COLOR;
  this._outlineColor1 = this.OUTLINE_COLOR1;
  this._strJSON = this.STRJSON;
  this._taaPass = this.TAA_PASS;
  this._sampleLevel = this.SAMPLE_LEVEL;
  this._stereoPass = this.STEREO_PASS;
  this._shaderPass = this.SHADER_PASS;
  this._saoPass = this.SAO_PASS;
  this._saoJSON = this.SAOJSON;

  this.jsonCheck = function (_text) {
    if (_text == undefined) return false;
    if (typeof _text !== 'string') return false;
    if (_text.indexOf('":') == -1) return false;
    if (_text.indexOf('}') == -1) return false;
    if (_text === 'null') return false;

    try {
      JSON.parse(_text);
    } catch (e) {
      return false;
    }

    return true;
  };

  this.setObjInObj = function (_o, _str) {
    if (this.jsonCheck(_str) == false) return;

    var _o1 = JSON.parse(_str);

    var t;

    for (var s1 in _o1) {
      for (var s in _o) {
        if (s == s1) {
          t = _typeof(_o1[s]);

          if (t == 'object') {
            this.setObjInObj(_o[s], _o1[s]);
          } else {
            _o[s] = _o1[s];
          }
        }
      }
    }
  };

  this.array = [];
  this.object = {};

  this.init = function () {
    if (this.array.length != 0) return;
    var sah = 0; // RenderPass Нх нужно не знаю но нужно, наверно проверить FIXE  js/postprocessing/TAARenderPass.js

    this.array[sah] = new EffectScene(new THREE.RenderPass(this.scene, this.camera));
    this.array[sah].type = 'RenderPass'; // this.composer.addPass(this.array[sah].effect);

    sah++;
    this.array[sah] = new EffectScene(new THREE.OutlinePass(new THREE.Vector2(this._width, this._height), this.scene, this.camera));
    this.array[sah].type = 'OutlinePass';
    this.array[sah].effect.visibleEdgeColor = new THREE.Color(this._outlineColor);
    this.array[sah].effect.hiddenEdgeColor = new THREE.Color(this._outlineColor1);
    sah++;
    this.array[sah] = new EffectScene(new THREE.TAARenderPass(this.scene, this.camera));
    this.array[sah].type = 'TAARenderPass';
    /* sah++;
    		// Сглаживание
    this.array[sah] = new EffectScene(new THREE.StereoEffect(THREE.FXAAShader));
    this.array[sah].type = 'StereoEffect';
    
    */

    sah++; // Сглаживание

    this.array[sah] = new EffectScene(new THREE.ShaderPass(THREE.FXAAShader));
    this.array[sah].type = 'ShaderPass'; // this.composer.addPass(this.array[sah].effect);

    this.array[sah].effect.uniforms['resolution'].value.set(1 / this._width, 1 / this._height);

    this.array[sah].sizeWindow = function (_w, _h) {
      this.effect.uniforms['resolution'].value.set(1 / _w, 1 / _h);
    };

    sah++; // this.array[sah].effect.renderToScreen = false/*this._bSao ? false : true*/;
    // composer.addPass(effectFXAA);
    // SAO  тенюхи на кружочках

    var prevFar = this.camera.far;
    var prevNear = this.camera.near;
    this.camera.far = 10;
    this.camera.near = 3;
    this.array[sah] = new EffectScene(new THREE.SAOPass(this.scene, this.camera, true, true)); // this.array[sah].effect.renderToScreen = true;

    this.array[sah].type = 'SAOPass';
    this.camera.far = prevFar;
    this.camera.near = prevNear; // var s = '{"saoBlur":true,"output":0,"saoBias":0,"saoBlurDepthCutoff":0,"saoBlurRadius":8,"saoBlurStdDev":4,"saoIntensity":0.18,"saoKernelRadius":100,"saoMinResolution":0,"saoScale":11.58}';

    sah++;
    /**/

    /* var prevFar = this.camera.far;
    var prevNear = this.camera.near;
    this.camera.far = 10;
    this.camera.near = 3;
    this.array[sah] = new EffectScene(new THREE.SAOPass(this.scene, this.camera, true, true));
    // this.array[sah].effect.renderToScreen = true;
    this.array[sah].type = 'SSAOPass';
    this.camera.far = prevFar;
    this.camera.near = prevNear;
    
    sah++; */

    for (var i = 0; i < this.array.length; i++) {
      this.object[this.array[i].type] = this.array[i];
    }

    var rr; // this.dragOutline()

    this.setObjInObj(this.object['SAOPass'].effect.params, this._saoJSON);
    this.setObjInObj(this.object['OutlinePass'].effect, this._strJSON);
    this.sizeWindow(this._width, this._height);
  };

  var p = -1;

  this.setValue = function (_key, _key1, _param) {
    if (_key == 'outline') {
      if (this.object['OutlinePass'].activ == true) this.object['OutlinePass'].effect.selectedObjects = _param;
    }
  };

  this.drawRender = function () {
    this.clear();

    if (this._renderPass == true) {
      this.object['RenderPass'].activ = true;
      this.clear(true);
      this.object['RenderPass'].effect.renderToScreen = true;
      this.composer.addPass(this.object['RenderPass'].effect);
    }

    if (this._outlinePass == true) {
      this.object['OutlinePass'].activ = true; // this.clear(true)
      // this.object['OutlinePass'].effect.renderToScreen = true;

      this.composer.addPass(this.object['OutlinePass'].effect);
    }

    if (this._taaPass == true) {
      this.object['TAARenderPass'].activ = true;
      this.clear(true);
      this.object['TAARenderPass'].effect.renderToScreen = true;
      this.composer.addPass(this.object['TAARenderPass'].effect);
    }

    if (this._shaderPass == true) {
      this.object['ShaderPass'].activ = true;
      this.clear(true);
      this.object['ShaderPass'].effect.renderToScreen = true;
      this.composer.addPass(this.object['ShaderPass'].effect);
    }

    if (this._saoPass == true) {
      this.object['SAOPass'].activ = true;
      this.clear(true);
      this.object['SAOPass'].effect.renderToScreen = true;
      this.composer.addPass(this.object['SAOPass'].effect);
    }

    if (this._ssaoPass == true) {
      this.object['SSAOPass'].activ = true;
      this.clear(true);
      this.object['SSAOPass'].effect.renderToScreen = true;
      this.composer.addPass(this.object['SSAOPass'].effect);
    }
  };

  this.redrag = function () {
    var a = [];

    for (var i = 1; i < self.array.length; i++) {
      if (self.array[i].activ == true) {
        a.push(self.array[i].type);
      }
    }

    this.startArray = a;
  };

  this.setArrayMash = function (_tip, _array) {// if (this.array.length == 0) return;

    /* if (_tip == 'OutlinePass') {
    	this.object[_tip].effect.selectedObjects = _array;
    } */
  };

  var b = true;

  this.render = function () {
    b = false;
    if (this.array.length == 0) return;

    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i]._activ != false) {
        this.array[i].render();
        b = true;
      }
    }

    if (b == true) this.composer.render();
    return b;
  };

  this.sizeWindow = function (_width, _height) {
    this._width = _width;
    this._height = _height;
    if (this.array.length == 0) return;
    this.composer.setSize(this._width, this._height);

    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i].sizeWindow) this.array[i].sizeWindow(_width, _height);
    }
  };

  this.clear = function (b) {
    if (b == undefined) this.composer.passes.length = 0;

    for (var i = 0; i < this.array.length; i++) {
      if (b == undefined) this.array[i].activ = false;
      this.array[i].effect.renderToScreen = false;
      this.array[i].effect.unbiased = false;
    }
  };
}

MEffectArray.prototype = {
  set activ(v) {
    if (this._activ != v) {
      this._activ = v;
    }
  },

  get activ() {
    return this._activ;
  },

  set startArray(v) {
    this._startArray = v;
  },

  get startArray() {
    return this._startArray;
  },

  set renderPass(v) {
    if (this._renderPass != v) {
      this._renderPass = v;
      this.drawRender();
    }
  },

  get renderPass() {
    return this._renderPass;
  },

  set outlinePass(v) {
    if (this._outlinePass != v) {
      this._outlinePass = v;
      this.drawRender();
    }
  },

  get outlinePass() {
    return this._outlinePass;
  },

  set outlineColor(v) {
    if (this._outlineColor != v) {
      this._outlineColor = v;
      this.object['OutlinePass'].effect.visibleEdgeColor = new THREE.Color(this._outlineColor);
      trace(this._outlineColor, '   ', this.object['OutlinePass'].effect.visibleEdgeColor);
    }
  },

  get outlineColor() {
    return this._outlineColor;
  },

  set outlineColor1(v) {
    if (this._outlineColor1 != v) {
      this._outlineColor1 = v;
      this.object['OutlinePass'].effect.hiddenEdgeColor = new THREE.Color(this._outlineColor1);
    }
  },

  get outlineColor1() {
    return this._outlineColor1;
  },

  set strJSON(v) {
    if (this._strJSON != v) {
      this._strJSON = v;
      this.setObjInObj(this.object['OutlinePass'].effect, this._strJSON); // this.dragOutline();
    }
  },

  get strJSON() {
    return this._strJSON;
  },

  set taaPass(v) {
    if (this._taaPass != v) {
      this._taaPass = v;
      this.drawRender();
    }
  },

  get taaPass() {
    return this._taaPass;
  },

  set sampleLevel(v) {
    if (this._sampleLevel != v) {
      this._sampleLevel = v;
      this.object['TAARenderPass'].effect.sampleLevel = this._sampleLevel;
    }
  },

  get sampleLevel() {
    return this._sampleLevel;
  },

  set shaderPass(v) {
    if (this._shaderPass != v) {
      this._shaderPass = v;
      this.drawRender();
    }
  },

  get shaderPass() {
    return this._shaderPass;
  },

  set saoPass(v) {
    if (this._saoPass != v) {
      this._saoPass = v;
      this.drawRender();
    }
  },

  get saoPass() {
    return this._saoPass;
  },

  set saoJSON(v) {
    if (this._saoJSON != v) {
      this._saoJSON = v;
      this.setObjInObj(this.object['SAOPass'].effect.params, this._saoJSON); // this.dragOutline();
    }
  },

  get saoJSON() {
    return this._saoJSON;
  }

};

function EffectScene(_effect) {
  var self = this;
  this.type = 'null';
  this.effect = _effect;
  this._activ = false;

  this.render = function () {};
}

EffectScene.prototype = {
  set activ(v) {
    if (this._activ != v) {
      this._activ = v;
    }
  },

  get activ() {
    return this._activ;
  }

};
/**
 * @author alteredq / http://alteredqualia.com/
 * @authod mrdoob / http://mrdoob.com/
 * @authod arodic / http://aleksandarrodic.com/
 * @authod fonserbc / http://fonserbc.github.io/
*/

THREE.StereoEffect = function (renderer) {
  var _stereo = new THREE.StereoCamera();

  _stereo.aspect = 0.5;

  this.setSize = function (width, height) {
    renderer.setSize(width, height);
  };

  this.render = function (scene, camera) {
    scene.updateMatrixWorld();
    if (camera.parent === null) camera.updateMatrixWorld();

    _stereo.update(camera);

    var size = renderer.getSize();
    renderer.setScissorTest(true);
    renderer.clear();
    renderer.setScissor(0, 0, size.width / 2, size.height);
    renderer.setViewport(0, 0, size.width / 2, size.height);
    renderer.render(scene, _stereo.cameraL);
    renderer.setScissor(size.width / 2, 0, size.width / 2, size.height);
    renderer.setViewport(size.width / 2, 0, size.width / 2, size.height);
    renderer.render(scene, _stereo.cameraR);
    renderer.setScissorTest(false);
  };
};
/**
 * Created by tpowellmeto on 29/10/2015.
 *
 * peppers ghost effect based on http://www.instructables.com/id/Reflective-Prism/?ALLSTEPS
 */


THREE.PeppersGhostEffect = function (renderer) {
  var scope = this;
  scope.cameraDistance = 15;
  scope.reflectFromAbove = false; // Internals

  var _halfWidth, _width, _height;

  var _cameraF = new THREE.PerspectiveCamera(); // front


  var _cameraB = new THREE.PerspectiveCamera(); // back


  var _cameraL = new THREE.PerspectiveCamera(); // left


  var _cameraR = new THREE.PerspectiveCamera(); // right


  var _position = new THREE.Vector3();

  var _quaternion = new THREE.Quaternion();

  var _scale = new THREE.Vector3(); // Initialization


  renderer.autoClear = false;

  this.setSize = function (width, height) {
    _halfWidth = width / 2;

    if (width < height) {
      _width = width / 3;
      _height = width / 3;
    } else {
      _width = height / 3;
      _height = height / 3;
    }

    renderer.setSize(width, height);
  };

  this.render = function (scene, camera) {
    scene.updateMatrixWorld();
    if (camera.parent === null) camera.updateMatrixWorld();
    camera.matrixWorld.decompose(_position, _quaternion, _scale); // front

    _cameraF.position.copy(_position);

    _cameraF.quaternion.copy(_quaternion);

    _cameraF.translateZ(scope.cameraDistance);

    _cameraF.lookAt(scene.position); // back


    _cameraB.position.copy(_position);

    _cameraB.quaternion.copy(_quaternion);

    _cameraB.translateZ(-scope.cameraDistance);

    _cameraB.lookAt(scene.position);

    _cameraB.rotation.z += 180 * (Math.PI / 180); // left

    _cameraL.position.copy(_position);

    _cameraL.quaternion.copy(_quaternion);

    _cameraL.translateX(-scope.cameraDistance);

    _cameraL.lookAt(scene.position);

    _cameraL.rotation.x += 90 * (Math.PI / 180); // right

    _cameraR.position.copy(_position);

    _cameraR.quaternion.copy(_quaternion);

    _cameraR.translateX(scope.cameraDistance);

    _cameraR.lookAt(scene.position);

    _cameraR.rotation.x += 90 * (Math.PI / 180);
    renderer.clear();
    renderer.setScissorTest(true);
    renderer.setScissor(_halfWidth - _width / 2, _height * 2, _width, _height);
    renderer.setViewport(_halfWidth - _width / 2, _height * 2, _width, _height);

    if (scope.reflectFromAbove) {
      renderer.render(scene, _cameraB);
    } else {
      renderer.render(scene, _cameraF);
    }

    renderer.setScissor(_halfWidth - _width / 2, 0, _width, _height);
    renderer.setViewport(_halfWidth - _width / 2, 0, _width, _height);

    if (scope.reflectFromAbove) {
      renderer.render(scene, _cameraF);
    } else {
      renderer.render(scene, _cameraB);
    }

    renderer.setScissor(_halfWidth - _width / 2 - _width, _height, _width, _height);
    renderer.setViewport(_halfWidth - _width / 2 - _width, _height, _width, _height);

    if (scope.reflectFromAbove) {
      renderer.render(scene, _cameraR);
    } else {
      renderer.render(scene, _cameraL);
    }

    renderer.setScissor(_halfWidth + _width / 2, _height, _width, _height);
    renderer.setViewport(_halfWidth + _width / 2, _height, _width, _height);

    if (scope.reflectFromAbove) {
      renderer.render(scene, _cameraL);
    } else {
      renderer.render(scene, _cameraR);
    }

    renderer.setScissorTest(false);
  };
};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author marklundin / http://mark-lundin.com/
 * @author alteredq / http://alteredqualia.com/
 */


THREE.ParallaxBarrierEffect = function (renderer) {
  var _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  var _scene = new THREE.Scene();

  var _stereo = new THREE.StereoCamera();

  var _params = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat
  };

  var _renderTargetL = new THREE.WebGLRenderTarget(512, 512, _params);

  var _renderTargetR = new THREE.WebGLRenderTarget(512, 512, _params);

  var _material = new THREE.ShaderMaterial({
    uniforms: {
      'mapLeft': {
        type: 't',
        value: _renderTargetL.texture
      },
      'mapRight': {
        type: 't',
        value: _renderTargetR.texture
      }
    },
    vertexShader: ['varying vec2 vUv;', 'void main() {', '	vUv = vec2( uv.x, uv.y );', '	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );', '}'].join('\n'),
    fragmentShader: ['uniform sampler2D mapLeft;', 'uniform sampler2D mapRight;', 'varying vec2 vUv;', 'void main() {', '	vec2 uv = vUv;', '	if ( ( mod( gl_FragCoord.y, 2.0 ) ) > 1.00 ) {', '		gl_FragColor = texture2D( mapLeft, uv );', '	} else {', '		gl_FragColor = texture2D( mapRight, uv );', '	}', '}'].join('\n')
  });

  var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), _material);

  _scene.add(mesh);

  this.setSize = function (width, height) {
    renderer.setSize(width, height);
    var pixelRatio = renderer.getPixelRatio();

    _renderTargetL.setSize(width * pixelRatio, height * pixelRatio);

    _renderTargetR.setSize(width * pixelRatio, height * pixelRatio);
  };

  this.render = function (scene, camera) {
    scene.updateMatrixWorld();
    if (camera.parent === null) camera.updateMatrixWorld();

    _stereo.update(camera);

    renderer.render(scene, _stereo.cameraL, _renderTargetL, true);
    renderer.render(scene, _stereo.cameraR, _renderTargetR, true);
    renderer.render(_scene, _camera);
  };
};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author marklundin / http://mark-lundin.com/
 * @author alteredq / http://alteredqualia.com/
 * @author tschw
 */


THREE.AnaglyphEffect = function (renderer, width, height) {
  // Matrices generated with angler.js https://github.com/tschw/angler.js/
  // (in column-major element order, as accepted by WebGL)
  this.colorMatrixLeft = new THREE.Matrix3().fromArray([1.0671679973602295, -0.0016435992438346148, 0.0001777536963345483, // r out
  -0.028107794001698494, -0.00019593400065787137, -0.0002875397040043026, // g out
  -0.04279090091586113, 0.000015809757314855233, -0.00024287120322696865 // b out
  ]); //		red						green 						blue  						in

  this.colorMatrixRight = new THREE.Matrix3().fromArray([-0.0355340838432312, -0.06440307199954987, 0.018319187685847282, // r out
  -0.10269022732973099, 0.8079727292060852, -0.04835830628871918, // g out
  0.0001224992738571018, -0.009558862075209618, 0.567823588848114 // b out
  ]);

  var _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  var _scene = new THREE.Scene();

  var _stereo = new THREE.StereoCamera();

  var _params = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat
  };
  if (width === undefined) width = 512;
  if (height === undefined) height = 512;

  var _renderTargetL = new THREE.WebGLRenderTarget(width, height, _params);

  var _renderTargetR = new THREE.WebGLRenderTarget(width, height, _params);

  var _material = new THREE.ShaderMaterial({
    uniforms: {
      'mapLeft': {
        type: 't',
        value: _renderTargetL.texture
      },
      'mapRight': {
        type: 't',
        value: _renderTargetR.texture
      },
      'colorMatrixLeft': {
        type: 'm3',
        value: this.colorMatrixLeft
      },
      'colorMatrixRight': {
        type: 'm3',
        value: this.colorMatrixRight
      }
    },
    vertexShader: ['varying vec2 vUv;', 'void main() {', '	vUv = vec2( uv.x, uv.y );', '	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );', '}'].join('\n'),
    fragmentShader: ['uniform sampler2D mapLeft;', 'uniform sampler2D mapRight;', 'varying vec2 vUv;', 'uniform mat3 colorMatrixLeft;', 'uniform mat3 colorMatrixRight;', // These functions implement sRGB linearization and gamma correction
    'float lin( float c ) {', '	return c <= 0.04045 ? c * 0.0773993808 :', '			pow( c * 0.9478672986 + 0.0521327014, 2.4 );', '}', 'vec4 lin( vec4 c ) {', '	return vec4( lin( c.r ), lin( c.g ), lin( c.b ), c.a );', '}', 'float dev( float c ) {', '	return c <= 0.0031308 ? c * 12.92', '			: pow( c, 0.41666 ) * 1.055 - 0.055;', '}', 'void main() {', '	vec2 uv = vUv;', '	vec4 colorL = lin( texture2D( mapLeft, uv ) );', '	vec4 colorR = lin( texture2D( mapRight, uv ) );', '	vec3 color = clamp(', '			colorMatrixLeft * colorL.rgb +', '			colorMatrixRight * colorR.rgb, 0., 1. );', '	gl_FragColor = vec4(', '			dev( color.r ), dev( color.g ), dev( color.b ),', '			max( colorL.a, colorR.a ) );', '}'].join('\n')
  });

  var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), _material);

  _scene.add(mesh);

  this.setSize = function (width, height) {
    renderer.setSize(width, height);
    var pixelRatio = renderer.getPixelRatio();

    _renderTargetL.setSize(width * pixelRatio, height * pixelRatio);

    _renderTargetR.setSize(width * pixelRatio, height * pixelRatio);
  };

  this.render = function (scene, camera) {
    scene.updateMatrixWorld();
    if (camera.parent === null) camera.updateMatrixWorld();

    _stereo.update(camera);

    renderer.render(scene, _stereo.cameraL, _renderTargetL, true);
    renderer.render(scene, _stereo.cameraR, _renderTargetR, true);
    renderer.render(_scene, _camera);
  };

  this.dispose = function () {
    if (_renderTargetL) _renderTargetL.dispose();
    if (_renderTargetR) _renderTargetR.dispose();
  };
};
/*
 * @author zz85 / https://github.com/zz85
 *
 * Ascii generation is based on http://www.nihilogic.dk/labs/jsascii/
 * Maybe more about this later with a blog post at http://lab4games.net/zz85/blog
 *
 * 16 April 2012 - @blurspline
 */


THREE.AsciiEffect = function (renderer, charSet, options) {
  // its fun to create one your own!
  charSet = charSet === undefined ? ' .:-=+*#%@' : charSet; // ' .,:;=|iI+hHOE#`$';
  // darker bolder character set from https://github.com/saw/Canvas-ASCII-Art/
  // ' .\'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$'.split('');

  if (!options) options = {}; // Some ASCII settings

  var bResolution = !options['resolution'] ? 0.15 : options['resolution']; // Higher for more details

  var iScale = !options['scale'] ? 1 : options['scale'];
  var bColor = !options['color'] ? false : options['color']; // nice but slows down rendering!

  var bAlpha = !options['alpha'] ? false : options['alpha']; // Transparency

  var bBlock = !options['block'] ? false : options['block']; // blocked characters. like good O dos

  var bInvert = !options['invert'] ? false : options['invert']; // black is white, white is black

  var strResolution = 'low';
  var width, height;
  var domElement = document.createElement('div');
  domElement.style.cursor = 'default';
  var oAscii = document.createElement('table');
  domElement.appendChild(oAscii);
  var iWidth, iHeight;
  var oImg;

  this.setSize = function (w, h) {
    width = w;
    height = h;
    renderer.setSize(w, h);
    initAsciiSize();
  };

  this.render = function (scene, camera) {
    renderer.render(scene, camera);
    asciifyImage(renderer, oAscii);
  };

  this.domElement = domElement; // Throw in ascii library from http://www.nihilogic.dk/labs/jsascii/jsascii.js

  /*
  * jsAscii 0.1
  * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
  * MIT License [http://www.nihilogic.dk/licenses/mit-license.txt]
  */

  function initAsciiSize() {
    iWidth = Math.round(width * fResolution);
    iHeight = Math.round(height * fResolution);
    oCanvas.width = iWidth;
    oCanvas.height = iHeight; // oCanvas.style.display = "none";
    // oCanvas.style.width = iWidth;
    // oCanvas.style.height = iHeight;

    oImg = renderer.domElement;

    if (oImg.style.backgroundColor) {
      oAscii.rows[0].cells[0].style.backgroundColor = oImg.style.backgroundColor;
      oAscii.rows[0].cells[0].style.color = oImg.style.color;
    }

    oAscii.cellSpacing = 0;
    oAscii.cellPadding = 0;
    var oStyle = oAscii.style;
    oStyle.display = 'inline';
    oStyle.width = Math.round(iWidth / fResolution * iScale) + 'px';
    oStyle.height = Math.round(iHeight / fResolution * iScale) + 'px';
    oStyle.whiteSpace = 'pre';
    oStyle.margin = '0px';
    oStyle.padding = '0px';
    oStyle.letterSpacing = fLetterSpacing + 'px';
    oStyle.fontFamily = strFont;
    oStyle.fontSize = fFontSize + 'px';
    oStyle.lineHeight = fLineHeight + 'px';
    oStyle.textAlign = 'left';
    oStyle.textDecoration = 'none';
  }

  var aDefaultCharList = ' .,:;i1tfLCG08@'.split('');
  var aDefaultColorCharList = ' CGO08@'.split('');
  var strFont = 'courier new, monospace';
  var oCanvasImg = renderer.domElement;
  var oCanvas = document.createElement('canvas');

  if (!oCanvas.getContext) {
    return;
  }

  var oCtx = oCanvas.getContext('2d');

  if (!oCtx.getImageData) {
    return;
  }

  var aCharList = bColor ? aDefaultColorCharList : aDefaultCharList;
  if (charSet) aCharList = charSet;
  var fResolution = 0.5;

  switch (strResolution) {
    case 'low':
      fResolution = 0.25;
      break;

    case 'medium':
      fResolution = 0.5;
      break;

    case 'high':
      fResolution = 1;
      break;
  }

  if (bResolution) fResolution = bResolution; // Setup dom

  var fFontSize = 2 / fResolution * iScale;
  var fLineHeight = 2 / fResolution * iScale; // adjust letter-spacing for all combinations of scale and resolution to get it to fit the image width.

  var fLetterSpacing = 0;

  if (strResolution == 'low') {
    switch (iScale) {
      case 1:
        fLetterSpacing = -1;
        break;

      case 2:
      case 3:
        fLetterSpacing = -2.1;
        break;

      case 4:
        fLetterSpacing = -3.1;
        break;

      case 5:
        fLetterSpacing = -4.15;
        break;
    }
  }

  if (strResolution == 'medium') {
    switch (iScale) {
      case 1:
        fLetterSpacing = 0;
        break;

      case 2:
        fLetterSpacing = -1;
        break;

      case 3:
        fLetterSpacing = -1.04;
        break;

      case 4:
      case 5:
        fLetterSpacing = -2.1;
        break;
    }
  }

  if (strResolution == 'high') {
    switch (iScale) {
      case 1:
      case 2:
        fLetterSpacing = 0;
        break;

      case 3:
      case 4:
      case 5:
        fLetterSpacing = -1;
        break;
    }
  } // can't get a span or div to flow like an img element, but a table works?
  // convert img element to ascii


  function asciifyImage(canvasRenderer, oAscii) {
    oCtx.clearRect(0, 0, iWidth, iHeight);
    oCtx.drawImage(oCanvasImg, 0, 0, iWidth, iHeight);
    var oImgData = oCtx.getImageData(0, 0, iWidth, iHeight).data; // Coloring loop starts now

    var strChars = ''; // console.time('rendering');

    for (var y = 0; y < iHeight; y += 2) {
      for (var x = 0; x < iWidth; x++) {
        var iOffset = (y * iWidth + x) * 4;
        var iRed = oImgData[iOffset];
        var iGreen = oImgData[iOffset + 1];
        var iBlue = oImgData[iOffset + 2];
        var iAlpha = oImgData[iOffset + 3];
        var iCharIdx;
        var fBrightness;
        fBrightness = (0.3 * iRed + 0.59 * iGreen + 0.11 * iBlue) / 255; // fBrightness = (0.3*iRed + 0.5*iGreen + 0.3*iBlue) / 255;

        if (iAlpha == 0) {
          // should calculate alpha instead, but quick hack :)
          // fBrightness *= (iAlpha / 255);
          fBrightness = 1;
        }

        iCharIdx = Math.floor((1 - fBrightness) * (aCharList.length - 1));

        if (bInvert) {
          iCharIdx = aCharList.length - iCharIdx - 1;
        } // good for debugging
        // fBrightness = Math.floor(fBrightness * 10);
        // strThisChar = fBrightness;


        var strThisChar = aCharList[iCharIdx];

        if (strThisChar === undefined || strThisChar == ' ') {
          strThisChar = '&nbsp;';
        }

        if (bColor) {
          strChars += "<span style='" + 'color:rgb(' + iRed + ',' + iGreen + ',' + iBlue + ');' + (bBlock ? 'background-color:rgb(' + iRed + ',' + iGreen + ',' + iBlue + ');' : '') + (bAlpha ? 'opacity:' + iAlpha / 255 + ';' : '') + "'>" + strThisChar + '</span>';
        } else {
          strChars += strThisChar;
        }
      }

      strChars += '<br/>';
    }

    oAscii.innerHTML = '<tr><td>' + strChars + '</td></tr>'; // console.timeEnd('rendering');
    // return oAscii;
  } // end modified asciifyImage block

};
/**
*
* Supersample Anti-Aliasing Render Pass
*
* @author bhouston / http://clara.io/
*
* This manual approach to SSAA re-renders the scene ones for each sample with camera jitter and accumulates the results.
*
* References: https://en.wikipedia.org/wiki/Supersampling
*
*/


THREE.SSAARenderPass = function (scene, camera, clearColor, clearAlpha) {
  THREE.Pass.call(this);
  this.scene = scene;
  this.camera = camera;
  this.sampleLevel = 4; // specified as n, where the number of samples is 2^n, so sampleLevel = 4, is 2^4 samples, 16.

  this.unbiased = true; // as we need to clear the buffer in this pass, clearColor must be set to something, defaults to black.

  this.clearColor = clearColor !== undefined ? clearColor : 0x000000;
  this.clearAlpha = clearAlpha !== undefined ? clearAlpha : 0;
  if (THREE.CopyShader === undefined) console.error('THREE.SSAARenderPass relies on THREE.CopyShader');
  var copyShader = THREE.CopyShader;
  this.copyUniforms = THREE.UniformsUtils.clone(copyShader.uniforms);
  this.copyMaterial = new THREE.ShaderMaterial({
    uniforms: this.copyUniforms,
    vertexShader: copyShader.vertexShader,
    fragmentShader: copyShader.fragmentShader,
    premultipliedAlpha: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false
  });
  this.camera2 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene2 = new THREE.Scene();
  this.quad2 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), this.copyMaterial);
  this.quad2.frustumCulled = false; // Avoid getting clipped

  this.scene2.add(this.quad2);
};

THREE.SSAARenderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
  constructor: THREE.SSAARenderPass,
  dispose: function dispose() {
    if (this.sampleRenderTarget) {
      this.sampleRenderTarget.dispose();
      this.sampleRenderTarget = null;
    }
  },
  setSize: function setSize(width, height) {
    if (this.sampleRenderTarget) this.sampleRenderTarget.setSize(width, height);
  },
  render: function render(renderer, writeBuffer, readBuffer) {
    if (!this.sampleRenderTarget) {
      this.sampleRenderTarget = new THREE.WebGLRenderTarget(readBuffer.width, readBuffer.height, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat
      });
      this.sampleRenderTarget.texture.name = 'SSAARenderPass.sample';
    }

    var jitterOffsets = THREE.SSAARenderPass.JitterVectors[Math.max(0, Math.min(this.sampleLevel, 5))];
    var autoClear = renderer.autoClear;
    renderer.autoClear = false;
    var oldClearColor = renderer.getClearColor().getHex();
    var oldClearAlpha = renderer.getClearAlpha();
    var baseSampleWeight = 1.0 / jitterOffsets.length;
    var roundingRange = 1 / 32;
    this.copyUniforms['tDiffuse'].value = this.sampleRenderTarget.texture;
    var width = readBuffer.width;
    var height = readBuffer.height; // render the scene multiple times, each slightly jitter offset from the last and accumulate the results.

    for (var i = 0; i < jitterOffsets.length; i++) {
      var jitterOffset = jitterOffsets[i];

      if (this.camera.setViewOffset) {
        this.camera.setViewOffset(width, height, jitterOffset[0] * 0.0625, jitterOffset[1] * 0.0625, // 0.0625 = 1 / 16
        width, height);
      }

      var sampleWeight = baseSampleWeight;

      if (this.unbiased) {
        // the theory is that equal weights for each sample lead to an accumulation of rounding errors.
        // The following equation varies the sampleWeight per sample so that it is uniformly distributed
        // across a range of values whose rounding errors cancel each other out.
        var uniformCenteredDistribution = -0.5 + (i + 0.5) / jitterOffsets.length;
        sampleWeight += roundingRange * uniformCenteredDistribution;
      }

      this.copyUniforms['opacity'].value = sampleWeight;
      renderer.setClearColor(this.clearColor, this.clearAlpha);
      renderer.render(this.scene, this.camera, this.sampleRenderTarget, true);

      if (i === 0) {
        renderer.setClearColor(0x000000, 0.0);
      }

      renderer.render(this.scene2, this.camera2, this.renderToScreen ? null : writeBuffer, i === 0);
    }

    if (this.camera.clearViewOffset) this.camera.clearViewOffset();
    renderer.autoClear = autoClear;
    renderer.setClearColor(oldClearColor, oldClearAlpha);
  }
}); // These jitter vectors are specified in integers because it is easier.
// I am assuming a [-8,8) integer grid, but it needs to be mapped onto [-0.5,0.5)
// before being used, thus these integers need to be scaled by 1/16.
//
// Sample patterns reference: https://msdn.microsoft.com/en-us/library/windows/desktop/ff476218%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396

THREE.SSAARenderPass.JitterVectors = [[[0, 0]], [[4, 4], [-4, -4]], [[-2, -6], [6, -2], [-6, 2], [2, 6]], [[1, -3], [-1, 3], [5, 1], [-3, -5], [-5, 5], [-7, -1], [3, 7], [7, -7]], [[1, 1], [-1, -3], [-3, 2], [4, -1], [-5, -2], [2, 5], [5, 3], [3, -5], [-2, 6], [0, -7], [-4, -6], [-6, 4], [-8, 0], [7, -4], [6, 7], [-7, -8]], [[-4, -7], [-7, -5], [-3, -5], [-5, -4], [-1, -4], [-2, -2], [-6, -1], [-4, 0], [-7, 1], [-1, 2], [-6, 3], [-3, 3], [-7, 6], [-3, 6], [-5, 7], [-1, 7], [5, -7], [1, -6], [6, -5], [4, -4], [2, -3], [7, -2], [1, -1], [4, -1], [2, 1], [6, 2], [0, 4], [4, 4], [2, 5], [7, 5], [5, 6], [3, 7]]];
/**
 *
 * Temporal Anti-Aliasing Render Pass
 *
 * @author bhouston / http://clara.io/
 *
 * When there is no motion in the scene, the TAA render pass accumulates jittered camera samples across frames to create a high quality anti-aliased result.
 *
 * References:
 *
 * TODO: Add support for motion vector pas so that accumulation of samples across frames can occur on dynamics scenes.
 *
 */

THREE.TAARenderPass = function (scene, camera, params) {
  if (THREE.SSAARenderPass === undefined) {
    console.error('THREE.TAARenderPass relies on THREE.SSAARenderPass');
  }

  THREE.SSAARenderPass.call(this, scene, camera, params);
  this.sampleLevel = 0;
  this.accumulate = false;
};

THREE.TAARenderPass.JitterVectors = THREE.SSAARenderPass.JitterVectors;
THREE.TAARenderPass.prototype = Object.assign(Object.create(THREE.SSAARenderPass.prototype), {
  constructor: THREE.TAARenderPass,
  render: function render(renderer, writeBuffer, readBuffer, delta) {
    if (!this.accumulate) {
      THREE.SSAARenderPass.prototype.render.call(this, renderer, writeBuffer, readBuffer, delta);
      this.accumulateIndex = -1;
      return;
    }

    var jitterOffsets = THREE.TAARenderPass.JitterVectors[5];

    if (!this.sampleRenderTarget) {
      this.sampleRenderTarget = new THREE.WebGLRenderTarget(readBuffer.width, readBuffer.height, this.params);
      this.sampleRenderTarget.texture.name = 'TAARenderPass.sample';
    }

    if (!this.holdRenderTarget) {
      this.holdRenderTarget = new THREE.WebGLRenderTarget(readBuffer.width, readBuffer.height, this.params);
      this.holdRenderTarget.texture.name = 'TAARenderPass.hold';
    }

    if (this.accumulate && this.accumulateIndex === -1) {
      THREE.SSAARenderPass.prototype.render.call(this, renderer, this.holdRenderTarget, readBuffer, delta);
      this.accumulateIndex = 0;
    }

    var autoClear = renderer.autoClear;
    renderer.autoClear = false;
    var sampleWeight = 1.0 / jitterOffsets.length;

    if (this.accumulateIndex >= 0 && this.accumulateIndex < jitterOffsets.length) {
      this.copyUniforms['opacity'].value = sampleWeight;
      this.copyUniforms['tDiffuse'].value = writeBuffer.texture; // render the scene multiple times, each slightly jitter offset from the last and accumulate the results.

      var numSamplesPerFrame = Math.pow(2, this.sampleLevel);

      for (var i = 0; i < numSamplesPerFrame; i++) {
        var j = this.accumulateIndex;
        var jitterOffset = jitterOffsets[j];

        if (this.camera.setViewOffset) {
          this.camera.setViewOffset(readBuffer.width, readBuffer.height, jitterOffset[0] * 0.0625, jitterOffset[1] * 0.0625, // 0.0625 = 1 / 16
          readBuffer.width, readBuffer.height);
        }

        renderer.render(this.scene, this.camera, writeBuffer, true);
        renderer.render(this.scene2, this.camera2, this.sampleRenderTarget, this.accumulateIndex === 0);
        this.accumulateIndex++;
        if (this.accumulateIndex >= jitterOffsets.length) break;
      }

      if (this.camera.clearViewOffset) this.camera.clearViewOffset();
    }

    var accumulationWeight = this.accumulateIndex * sampleWeight;

    if (accumulationWeight > 0) {
      this.copyUniforms['opacity'].value = 1.0;
      this.copyUniforms['tDiffuse'].value = this.sampleRenderTarget.texture;
      renderer.render(this.scene2, this.camera2, writeBuffer, true);
    }

    if (accumulationWeight < 1.0) {
      this.copyUniforms['opacity'].value = 1.0 - accumulationWeight;
      this.copyUniforms['tDiffuse'].value = this.holdRenderTarget.texture;
      renderer.render(this.scene2, this.camera2, writeBuffer, accumulationWeight === 0);
    }

    renderer.autoClear = autoClear;
  }
});
module.exports = exports["default"];

/***/ }),

/***/ "./MVisi3D/src/visi3D/MEvent3D.js":
/*!****************************************!*\
  !*** ./MVisi3D/src/visi3D/MEvent3D.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MEvent3D;

// то что возврощаеться от событий
function MEvent3D() {
  this.target = undefined;
  this.face = undefined;
  this.point = undefined;
  this.faceIndex = undefined;
  this.type = undefined;
  this.uv = undefined;
  this.originalEvent = undefined;

  this.copy = function () {
    var r = new Event3D();
    r.target = this.target;
    r.face = this.face;
    r.point = this.point;
    r.faceIndex = this.faceIndex;
    r.type = this.type;
    r.uv = this.uv;
    r.originalEvent = this.originalEvent;
    return r;
  };
}

module.exports = exports["default"];

/***/ }),

/***/ "./MVisi3D/src/visi3D/MEvent3DArr.js":
/*!*******************************************!*\
  !*** ./MVisi3D/src/visi3D/MEvent3DArr.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MEvent3DArr;

var _MEventSob = _interopRequireDefault(__webpack_require__(/*! ./MEventSob.js */ "./MVisi3D/src/visi3D/MEventSob.js"));

var _MEvent3D = _interopRequireDefault(__webpack_require__(/*! ./MEvent3D.js */ "./MVisi3D/src/visi3D/MEvent3D.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MEvent3DArr(par, camera, contentHTML, stage) {
  this.parent = par;
  var self = this;
  this.camera = camera;
  this.raycaster = new THREE.Raycaster();
  this.intersects;
  this.point = new THREE.Vector2(0, 0);
  this.pointWH = new THREE.Vector2(0, 0);
  this.arrChild = [];
  this.uuid = 'nullMy';
  this.obj3d;
  this.eventSob = new _MEventSob.default();
  this.event3D = new _MEvent3D.default();
  this.xzNull = 'xzNull';
  this.poiskName = 'xzPoisk';
  this.tokoName = 'null';
  this._activ = true;
  this.rect = {
    x: 0,
    y: 0,
    width: 100,
    height: 100
  };

  this.setRect = function (x, y, w, h) {
    this.rect.x = x;
    this.rect.y = y;
    this.rect.width = w;
    this.rect.height = h;
  };

  this.removeChild = function (child) {
    for (var i = 0; i < this.arrChild.length; i++) {
      if (child.uuid == this.arrChild[i].uuid) {
        this.arrChild.splice(i, 1);
        i = i - 1;
        if (i < 0) i = 0;
      }
    }
  };

  this.addChild = function (child) {
    this.arrChild.push(child);
  };

  var cameraPosition;
  this.boolNum = -1;
  this.boolNumOld = -1;
  this.event;

  this.mouseRay = function () {
    if (this._activ == false) return;
    this.rayPusk();
    this.boolNum = this.getGoodParam();

    if (this.boolNum == -1) {
      if (this.uuid != 'nullMy') {
        this.eventSob.dispatcherEvent('out', this.event3D);
        this.uuid = 'nullMy';
      }
    } else {
      if (this.uuid != 'nullMy') {
        // обьект есть
        if (this.uuid != this.intersects[this.boolNum].object.uuid) {
          // это новый обьект
          this.eventSob.dispatcherEvent('out', this.event3D);
          this.uuid = this.intersects[this.boolNum].object.uuid;
          this.event3D.target = this.intersects[this.boolNum].object;
          this.event3D.face = this.intersects[this.boolNum].face;
          this.event3D.point = this.intersects[this.boolNum].point;
          this.event3D.faceIndex = this.intersects[this.boolNum].faceIndex;
          this.event3D.uv = this.intersects[this.boolNum].uv;
          this.event3D.originalEvent = self.event;
          this.eventSob.dispatcherEvent('over', this.event3D);
        } else {
          this.event3D.face = this.intersects[this.boolNum].face;
          this.event3D.point = this.intersects[this.boolNum].point;
          this.event3D.faceIndex = this.intersects[this.boolNum].faceIndex;
          this.event3D.uv = this.intersects[this.boolNum].uv;
          this.event3D.originalEvent = self.event;
          this.eventSob.dispatcherEvent('move', this.event3D);
        }
      } else {
        this.uuid = this.intersects[this.boolNum].object.uuid;
        this.event3D.target = this.intersects[this.boolNum].object;
        this.event3D.face = this.intersects[this.boolNum].face;
        this.event3D.point = this.intersects[this.boolNum].point;
        this.event3D.faceIndex = this.intersects[this.boolNum].faceIndex;
        this.event3D.uv = this.intersects[this.boolNum].uv;
        this.event3D.originalEvent = self.event;
        this.eventSob.dispatcherEvent('over', this.event3D);
      }
    }

    this.boolNumOld = this.boolNum;
  };

  this.getPosition = function (s) {
    var str = this.poiskName;

    if (s != undefined) {
      this.poiskName = s;
    } else {
      this.poiskName = 'xzPoisk';
    }

    this.restartPoint();
    this.rayPusk();
    this.poiskName = str;

    if (this.intersects.length != 0) {
      // var t =this.getGoodParam()
      var t = this.intersects.length - 1;
      if (t == -1) t = 0;
      return this.intersects[t];
    }

    return null;
  };

  var e3D = new _MEvent3D.default(); // Относительно имени возврощает евент

  this.getNameEvent = function (str) {
    this.restartPoint();
    this.rayPusk();

    if (this.intersects.length != 0) {
      for (var i = 0; i < this.intersects.length; i++) {
        if (this.intersects[i].object.parent != undefined) {
          if (this.intersects[i].object.name == str) {
            e3D.target = this.intersects[this.boolNum].object;
            e3D.face = this.intersects[this.boolNum].face;
            e3D.point = this.intersects[this.boolNum].point;
            e3D.faceIndex = this.intersects[this.boolNum].faceIndex;
            e3D.uv = this.intersects[this.boolNum].uv;
            e3D.originalEvent = self.event;
            return e3D;
          }
        }
      }
    }

    return null;
  };

  this.testVisiParam = function (_obj3d) {
    if (_obj3d.visible == false) return false;

    if (_obj3d.parent != undefined) {
      return this.testVisiParam(_obj3d.parent);
    } else {
      if (_obj3d.type == 'Scene') return true;else return false;
    }

    return true;
  };

  this.getGoodParam = function () {
    if (this.intersects.length != 0) {
      var i;

      for (i = 0; i < this.intersects.length; i++) {
        if (this.testVisiParam(this.intersects[i].object) != false) {
          if (this.intersects[i].object.notActiv != undefined) {
            this.intersects.splice(i, 1);
            i = 0;
          }
        }
      }

      if (this.intersects.length == 0) return -1;

      for (i = 0; i < this.intersects.length; i++) {
        if (this.testVisiParam(this.intersects[i].object) != false) {
          if (this.intersects[i].object.name == this.poiskName) {
            return i;
          }
        }
      }

      for (i = 0; i < this.intersects.length; i++) {
        if (this.testVisiParam(this.intersects[i].object) != false) {
          if (this.intersects[i].object.name != this.xzNull) {
            return i;
          }
        }
      }
    }

    return -1;
  }; // пускаем лучь


  this.rayPusk = function () {
    cameraPosition = new THREE.Vector3();
    cameraPosition.setFromMatrixPosition(this.camera.matrixWorld); // world position

    this.raycaster.ray.origin.copy(cameraPosition);
    this.raycaster.ray.direction.set(this.point.x, this.point.y, 0.5).unproject(this.camera).sub(cameraPosition).normalize();
    this.intersects = this.raycaster.intersectObjects(this.arrChild, true);
  };

  this.naCont = false;

  this.mousemove = function (e) {
    if (self.naCont == false) return;
    if (e.data != undefined) self.event = e.data.originalEvent;else self.event = e;
    if (self._activ == false) return; // self.event.preventDefault();

    self.restartPoint(e);
    self.mouseRay();

    if (self.intersects.length) {
      self.event.preventDefault();
    }
  };

  this.zdvigX = 0;
  this.scale = 1;
  this.pV = new THREE.Vector2(0, 0);

  this.restartPoint = function (e) {
    self.pV.x = pl102.global.x;
    self.pV.y = pl102.global.y;

    if (self.isRect(self.pV) == true) {
      self.point.x = -((this.rect.x - self.pV.x) / this.rect.width) * 2 - 1;
      self.point.y = -(-((this.rect.y - self.pV.y) / this.rect.height) * 2 - 1);
    } else {
      if (self.point.x != 99999) {
        self.point.x = 99999;
      }
    }
  };

  this.isRect = function (point) {
    if (point.x >= this.rect.x && point.x <= this.rect.x + this.rect.width) {
      if (point.y >= this.rect.y && point.y <= this.rect.y + this.rect.height) {
        return true;
      }
    }

    return false;
  };

  this.mouseup = function (e) {
    if (e.data != undefined) self.event = e.data.originalEvent;else self.event = e;
    if (self._activ == false) return;

    if (self.boolNumOld == -1) {
      self.eventSob.dispatcherEvent('up', null);
    } else {
      self.event3D.originalEvent = self.event;
      self.eventSob.dispatcherEvent('up', self.event3D);
    }

    if (self.intersects.length) {
      self.event.preventDefault();
    }
  };

  this.mousedown = function (e) {
    if (e.data != undefined) self.event = e.data.originalEvent;else self.event = e;
    self.restartPoint(e);
    if (self._activ == false) return;

    if (self.boolNumOld == -1) {
      self.eventSob.dispatcherEvent('down', null);
    } else {
      self.event3D.originalEvent = self.event;
      self.eventSob.dispatcherEvent('down', self.event3D);
    }

    if (self.intersects.length) {
      self.event.preventDefault();
    }
  };

  this.mouseout = function (e) {
    self.naCont = false;
    self.restartPoint(e);
    self.point.x = 99999;
    self.mouseRay();
  };

  this.mouseover = function (e) {
    self.naCont = true;
    self.restartPoint(e);
    self.mouseRay();
  };

  this.mousewheel = function (e) {
    if (e.data != undefined) self.event = e.data.originalEvent;else self.event = e;
    self.restartPoint(e);
    if (self._activ == false) return;

    if (self.boolNumOld == -1) {
      self.eventSob.dispatcherEvent('down', null);
    } else {
      self.event3D.originalEvent = self.event;
      self.eventSob.dispatcherEvent('wheel', e);
    }
  };

  this.addDragEvent = function (cont) {
    cont.on('mousemove', self.mousemove);
    cont.on('mouseup', self.mouseup);
    cont.on('mousedown', self.mousedown);
    cont.on('mouseout', self.mouseout);
    cont.on('mouseover', self.mouseover);
    pl102Wheel.on(cont, 'mousewheel', self.mousewheel);
  };

  this.removeDragEvent = function (cont) {
    cont.off('mousemove', self.mousemove);
    cont.off('mouseup', self.mouseup);
    cont.off('mousedown', self.mousedown);
    cont.off('mouseout', self.mouseout);
    cont.off('mouseover', self.mouseover);
    pl102Wheel.off(cont, 'mousewheel', self.mousewheel);
  };

  this.sizeWindow = function (_width, _height) {
    this.pointWH.x = _width;
    this.pointWH.y = _height;
  };
}

MEvent3DArr.prototype = {
  set activ(v) {
    if (this._activ == v) return;
    this._activ = v;
  },

  get activ() {
    return this._activ;
  }

};
module.exports = exports["default"];

/***/ }),

/***/ "./MVisi3D/src/visi3D/MEventSob.js":
/*!*****************************************!*\
  !*** ./MVisi3D/src/visi3D/MEventSob.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MEventSob;

// 'евент диспатча'
function MEventSob() {
  this.event = undefined;
  this.arrSobName = ['up', 'down', 'move', 'out', 'over', 'wheel'];
  this.arrSob = [[], [], [], [], [], []];
  this.pozSob = undefined;

  this.dispatcherEvent = function (tipSob, event) {
    for (var i = 0; i < this.arrSobName.length; i++) {
      if (this.arrSobName[i] == tipSob) {
        if (event) event.type = tipSob;

        for (var j = 0; j < this.arrSob[i].length; j++) {
          this.arrSob[i][j](event);
        }
      }
    }
  };

  this.removeEvent = function (str, fun) {
    for (var i = 0; i < this.arrSobName.length; i++) {
      if (this.arrSobName[i] == str) {
        for (var j = 0; j < this.arrSob[i].length; j++) {
          if (this.arrSob[i][j] == fun) {
            this.arrSob[i].splice(j, 1);
          }
        }
      }
    }
  };

  this.addEvent = function (str, fun) {
    for (var i = 0; i < this.arrSobName.length; i++) {
      if (this.arrSobName[i] == str) {
        this.arrSob[i].push(fun);
      }
    }
  };
}

module.exports = exports["default"];

/***/ }),

/***/ "./MVisi3D/src/visi3D/MFocus.js":
/*!**************************************!*\
  !*** ./MVisi3D/src/visi3D/MFocus.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MFocus;

function MFocus(visi3D) {
  var self = this;
  this.visi3D = visi3D;
  this.box3 = new THREE.Box3(); // 3d bound

  this.rectScreen = new Rectangle();
  this.world = new Rectangle(0, 0, 100, 100); //

  this.targetObject = null; // если нужно по обекту подстраиватся THREE.Object3D || null тогда по arrPoint

  this.arrPoint = []; // точки 3d для расчета

  this.isMoveCam = false;
  this.isFromGeometry = false; // подстраивать по геометрии или по bounds

  this._offset = 0; // отступ границ

  this._active = true;
  this._debug = false;
  var offsetVector = new THREE.Vector2();
  var vec = new THREE.Vector2();
  var center3 = new THREE.Vector3();

  this.upDate = function () {
    if (!self.active) {
      return;
    }

    this.updateBound3d();
    if (self.box3.isEmpty()) return; // console.time('zumeVisi3D');

    this.visi3D.xVerh = center3.x;
    this.visi3D.zVerh = center3.z;
    this.visi3D.yVerh = -center3.y;
    self.zumeVisi3D();

    if (self.isMoveCam) {
      doZoom();
      var maxCountStep = 10;
      var countStep = 0;

      while (offsetVector.length() > 2 && ++countStep < maxCountStep) {
        this.visi3D.position3d.moveCamXY(offsetVector);
        doZoom();
      }
    } // console.timeEnd('zumeVisi3D');


    if (self.debugFocus) self.debugFocus.upDate();
  };

  function doZoom() {
    self.zumeVisi3D();
    offsetVector.set(self.world.x + self.world.width / 2, self.world.y + self.world.height / 2);
    vec.set(self.rectScreen.x + self.rectScreen.width / 2, self.rectScreen.y + self.rectScreen.height / 2);
    offsetVector.sub(vec).divideScalar(2);
  }

  this.zumeVisi3D = function () {
    var eps = 0.01;
    var low = 0;
    var high = 60000;
    var mid;
    var val;
    var maxCountStep = 20;
    var countStep = 0;

    while (low < high) {
      // ищем бинарным поиском
      if (++countStep > maxCountStep) break;
      mid = (low + high) / 2;
      val = mid;
      self.visi3D.zume = val;

      if (Math.abs(low - mid) < eps || Math.abs(high - mid) < eps || mid < eps) {
        break;
      } else {
        self.updateRectScreen();

        if (self.isZoomIn()) {
          high = mid;
        } else {
          low = mid + 1;
        }
      }
    }
  }; // пересчет 3д бокса


  this.updateBound3d = function () {
    self.box3.makeEmpty();

    if (self.targetObject) {
      // console.time('bound')
      self.box3.copy(self.getCompoundBoundingBox(self.targetObject)); // console.timeEnd('bound')
      // console.time('from')
      // self.box3.setFromObject(self.targetObject);
      // console.timeEnd('from')
    } else {
      for (var i = 0; i < self.arrPoint.length; i++) {
        self.box3.expandByPoint(self.arrPoint[i]);
      }
    }

    self.box3.getCenter(center3);
  };

  this.updateRectScreen = function () {
    this.visi3D.camera.updateMatrixWorld();
    this.visi3D.scene.updateMatrixWorld();

    if (self.targetObject && self.isFromGeometry) {
      var boxs = self.getBoxObject(self.targetObject);
      self.box3.copy(boxs.box3);
      self.box3.getCenter(center3);
      self.setRectFromBox(self.rectScreen, boxs.box2);
    } else {
      self.setRectFromBox(self.rectScreen, self.boxToScreen(self.box3));
    }

    self.updateWorldSize();
  };

  this.setRectFromBox = function (r, b2) {
    r.x = b2.min.x;
    r.y = b2.min.y;
    r.width = b2.max.x - b2.min.x;
    r.height = b2.max.y - b2.min.y;
  };

  this.getCompoundBoundingBox = function () {
    var box3 = new THREE.Box3();
    var boundingBox = new THREE.Box3();

    function traverseBound(node) {
      var geometry = node.geometry;
      if (geometry === undefined) return;
      if (!geometry.boundingBox) geometry.computeBoundingBox();
      boundingBox.copy(geometry.boundingBox);
      boundingBox.applyMatrix4(node.matrixWorld);
      box3.union(boundingBox);
    }

    return function (object) {
      object.updateMatrixWorld(true);
      box3.makeEmpty();
      object.traverseVisible(traverseBound);
      return box3;
    };
  }();

  this.boxToScreen = function () {
    var b2 = new THREE.Box2();
    var arrP = []; // крайние точки

    for (var i = 0; i < 8; i++) {
      arrP[i] = new THREE.Vector3();
    }

    return function boxToScreen(b3) {
      b2.makeEmpty();
      arrP[0].set(b3.min.x, b3.min.y, b3.min.z);
      arrP[1].set(b3.min.x, b3.max.y, b3.min.z);
      arrP[2].set(b3.max.x, b3.min.y, b3.min.z);
      arrP[3].set(b3.max.x, b3.max.y, b3.min.z);
      arrP[4].set(b3.min.x, b3.min.y, b3.max.z);
      arrP[5].set(b3.min.x, b3.max.y, b3.max.z);
      arrP[6].set(b3.max.x, b3.min.y, b3.max.z);
      arrP[7].set(b3.max.x, b3.max.y, b3.max.z);

      for (var i = 0; i < arrP.length; i++) {
        b2.expandByPoint(self.toScreenXY(arrP[i]));
      }

      return b2;
    };
  }();

  this.getBoxObject = function () {
    var box2 = new THREE.Box2();
    var box3 = new THREE.Box3();
    var res = {
      box2: box2,
      box3: box3
    };
    var i, l;
    var v1 = new THREE.Vector3();

    function traverseGeom(node) {
      var geometry = node.geometry;

      if (geometry !== undefined) {
        if (geometry.isGeometry) {
          var vertices = geometry.vertices;

          for (i = 0, l = vertices.length; i < l; i++) {
            v1.copy(vertices[i]).applyMatrix4(node.matrixWorld);
            box3.expandByPoint(v1);
            box2.expandByPoint(self.toScreenXY(v1));
          }
        } else if (geometry.isBufferGeometry) {
          var attribute = geometry.attributes.position;

          if (attribute !== undefined) {
            for (i = 0, l = attribute.count; i < l; i++) {
              v1.fromBufferAttribute(attribute, i).applyMatrix4(node.matrixWorld);
              box3.expandByPoint(v1);
              box2.expandByPoint(self.toScreenXY(v1));
            }
          }
        }
      }
    }

    return function getBoxObject(object) {
      object.updateMatrixWorld(true);
      box2.makeEmpty();
      box3.makeEmpty();
      object.traverseVisible(traverseGeom);
      return res;
    };
  }();

  var vectorScreen = new THREE.Vector2();
  var vector3 = new THREE.Vector3();

  this.toScreenXY = function (v3) {
    // 3d world vector to screen
    vector3.copy(v3);
    vector3.project(self.visi3D.camera);
    vectorScreen.x = Math.round((vector3.x + 1) * self.visi3D._width / 2);
    vectorScreen.y = Math.round((-vector3.y + 1) * self.visi3D._height / 2);
    return vectorScreen;
  };

  this.updateWorldSize = function () {
    self.world.x = self.offset;
    self.world.y = self.offset;
    self.world.width = this.visi3D._width - self.offset * 2;
    self.world.height = this.visi3D._height - self.offset * 2;
  };

  this.isZoomIn = function () {
    return self.rectScreen.x > self.world.x && self.rectScreen.x + self.rectScreen.width < self.world.x + self.world.width && self.rectScreen.y > self.world.y && self.rectScreen.y + self.rectScreen.height < self.world.y + self.world.height;
  };
}

MFocus.prototype = {
  set offset(v) {
    this._offset = v || 0;
  },

  get offset() {
    return this._offset;
  },

  set debug(v) {
    this._debug = v;

    if (v && !this.debugFocus) {
      this.debugFocus = new MFocusDebug(this);
    }

    if (this.debugFocus) this.debugFocus.active = v;
  },

  get debug() {
    return this._debug;
  },

  set active(v) {
    this._active = v;
    if (!v) this.debug = false;
  },

  get active() {
    return this._active;
  }

};

function MFocusDebug(mFocus) {
  var self = this;
  this.mFocus = mFocus;
  var content3d = visi3D.scene;
  var content2d = main.stage;
  var boxHelper = new BoxHelper(1, materialAlphaRed);
  content3d.add(boxHelper);
  var graphics = new PIXI.Graphics();
  graphics.hitArea = new PIXI.Rectangle(0, 0, 0, 0);
  content2d.addChild(graphics);
  self.active = false;
  boxHelper.visible = graphics.visible = self.active;

  this.upDate = function () {
    boxHelper.visible = graphics.visible = self.active;
    if (!self.active) return;
    graphics.clear();
    graphics.position.set(visi3D._x, visi3D._y);
    graphics.lineStyle(1, 0, 1);
    graphics.drawRect(mFocus.world.x, mFocus.world.y, mFocus.world.width, mFocus.world.height);
    graphics.lineStyle(1, 0xff0000, 1);
    graphics.drawRect(mFocus.rectScreen.x, mFocus.rectScreen.y, mFocus.rectScreen.width, mFocus.rectScreen.height);
    boxHelper.width = mFocus.box3.max.x - mFocus.box3.min.x;
    boxHelper.depth = mFocus.box3.max.y - mFocus.box3.min.y;
    boxHelper.height = mFocus.box3.max.z - mFocus.box3.min.z;
    mFocus.box3.getCenter(boxHelper.position);
  };
}

module.exports = exports["default"];

/***/ }),

/***/ "./MVisi3D/src/visi3D/MFoto3D.js":
/*!***************************************!*\
  !*** ./MVisi3D/src/visi3D/MFoto3D.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MFoto3D;

/*
 
*/
function MFoto3D() {
  // для фотографирования 3д
  var self = this;
  var SCREEN_WIDTH = 256;
  var SCREEN_HEIGHT = 256;
  var scene = new THREE.Scene(); // var camera = new THREE.PerspectiveCamera(54, SCREEN_WIDTH / SCREEN_HEIGHT, 0.01, 1000000);

  var camera = new THREE.OrthographicCamera(SCREEN_WIDTH / -2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / -2, 0.001, 10000);
  var clock = new THREE.Clock();
  var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true
  });
  camera.position.set(200, 200, 200);
  scene.add(camera); // var ctx = renderer.context.canvas.getContext("webgl");

  this.camera = camera;
  this.fotoContainer = new THREE.Object3D();
  scene.add(this.fotoContainer);
  scene.background = new THREE.Color(0x0096ff);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  renderer.localClippingEnabled = true; //

  var contentHTML = document.createElement('div');
  contentHTML.style.position = 'absolute';
  contentHTML.style.bottom = '0px';
  contentHTML.style.left = '0px'; // contentHTML.style.zIndex = '150';

  contentHTML.appendChild(renderer.domElement);
  this.contentHTML = contentHTML;
  this.canvas = renderer.domElement;
  this.contentHTML = contentHTML; // document.body.appendChild(contentHTML);

  var ambientLight = new THREE.AmbientLight("#ffffff", 1);
  scene.add(ambientLight); // var sunLight = new THREE.DirectionalLight('rgb(255,255,255)', 0.9);
  // scene.add(sunLight);
  // helper debug

  var gridHelper = new THREE.GridHelper(1000, 10);
  var axesHelper = new THREE.AxesHelper(100);
  var boxHelper = new THREE.BoxHelper(this.fotoContainer, 0xffff00);
  scene.add(gridHelper);
  scene.add(axesHelper);
  scene.add(boxHelper);
  var arrHelper = [axesHelper, gridHelper, boxHelper];

  function animate() {
    render();
    boxHelper.setFromObject(self.fotoContainer);
  }

  function render() {
    renderer.render(scene, camera);
  }

  this.render = render;
  animate();
  var box = new THREE.Box3();
  var center = new THREE.Vector3();
  this.box = box;
  this.center = center;

  this.setSize = function (width, height) {
    // размер рендера
    SCREEN_WIDTH = width;
    SCREEN_HEIGHT = height;
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.updateProjectionMatrix();
  };

  this.addObjFoto = function (obj) {
    // this.fotoContainer.children.length = 0;
    // obj.position.set(0, 0, 0);
    // obj.visible = true;
    this.fotoContainer.add(obj);
    boxHelper.setFromObject(this.fotoContainer);
  };

  this.removeObjFoto = function (obj) {
    this.fotoContainer.remove(obj);
  };

  this.moveToObj = function (obj) {
    box.setFromObject(obj || self.fotoContainer);
    var w = box.max.x - box.min.x;
    var h = box.max.z - box.min.z;
    self.moveToRect(box.min.x, box.min.z, w, h);
  };

  this.moveToRect = function (x, y, w, h) {
    // здвинуть на рект
    x += w / 2;
    y += h / 2;
    center.set(x, 0, y);
    camera.position.set(center.x, 9000, center.z);
    camera.lookAt(center);
    orbitControls.target.set(center.x, center.y, center.z);

    if (camera.type === 'OrthographicCamera') {
      var s = Math.max(h, w);
      camera.zoom = 1;
      camera.left = s / -2;
      camera.right = s / 2;
      camera.top = s / 2;
      camera.bottom = s / -2;
      camera.aspect = s / s;
    }

    camera.updateProjectionMatrix(); // render();
  };

  this.getFoto = function (imgWH) {
    /// получить b64
    imgWH = imgWH || 1024;

    for (var i = 0; i < arrHelper.length; i++) {
      arrHelper[i].visible = false;
    }

    var prev = scene.background;
    scene.background = null;
    renderer.setSize(imgWH, imgWH);
    render();
    var imgData = renderer.domElement.toDataURL("image/png");
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    scene.background = prev;

    for (var j = 0; j < arrHelper.length; j++) {
      arrHelper[j].visible = true;
    }

    render();
    return imgData;
  };

  this.getCanvas = function (imgWH) {
    imgWH = imgWH || 1024;

    for (var i = 0; i < arrHelper.length; i++) {
      arrHelper[i].visible = false;
    }

    var prev = scene.background;
    scene.background = null;
    var wh = renderer.getSize();

    if (wh.width != imgWH || wh.height != imgWH) {
      renderer.setSize(imgWH, imgWH);
    }

    render(); // todo delete
    // setTimeout(function() {
    //     renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    //     scene.background = prev;
    //     for (var j = 0; j < arrHelper.length; j++) {
    //         arrHelper[j].visible = true;
    //     }
    //     render();
    // }, 1);

    return renderer.domElement;
  }; // дебаг управление todo delete


  var orbitControls = new THREE.OrbitControls(camera, contentHTML);
  orbitControls.enableKeys = false;
  orbitControls.minDistance = 1;
  orbitControls.minZoom = 1;
  orbitControls.maxZoom = 1;
  orbitControls.addEventListener('change', function () {
    animate();
  });
}

module.exports = exports["default"];

/***/ }),

/***/ "./MVisi3D/src/visi3D/MPosition3d.js":
/*!*******************************************!*\
  !*** ./MVisi3D/src/visi3D/MPosition3d.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MPosition3d;

var _MUtility = _interopRequireDefault(__webpack_require__(/*! ./MUtility.js */ "./MVisi3D/src/visi3D/MUtility.js"));

var _MSky = _interopRequireDefault(__webpack_require__(/*! ./MSky.js */ "./MVisi3D/src/visi3D/MSky.js"));

var _MSmc = _interopRequireDefault(__webpack_require__(/*! ./MSmc.js */ "./MVisi3D/src/visi3D/MSmc.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MPosition3d(_parent, _content2d) {
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
    if (c.parent == undefined) return c;else return this.getStage(c.parent);
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
  }; // if (pl102.isMouseEvents) {
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
    self.point1.y = pl102.global.y; // self.parent.tween.stop();
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
  }; // self.sPixi.on('mousedown', self.mouseDown);
  // main.contentCurs.addEventListener( 'mousedown', this.mouseDown); /// TODO убрал это
  // contentHTML.addEventListener('mousedown',    this.mouseDown, true);
  // self.parent.parent.parent.stage.addEventListener( 'mousedown', this.mouseDown);


  var www;

  this.mousewheel = function (e) {
    if (self.pause == true) return;
    if (self.drag == false) return;
    www = self.parent._zume + -e.delta * self.powerZum;
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

  function handleMouseDownPan(event) {
    panStart.set(event.clientX, event.clientY);
  }

  function handleMouseMovePan(event) {
    panEnd.set(event.clientX, event.clientY);
    panDelta.subVectors(panEnd, panStart);
    self.moveCamXY(panDelta);
    panStart.copy(panEnd);
  }

  var panLeft = function () {
    var v = new THREE.Vector3();
    return function panLeft(distance, objectMatrix) {
      v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix

      v.multiplyScalar(-distance);
      panOffset.add(v);
    };
  }();

  var panUp = function () {
    var v = new THREE.Vector3();
    return function panUp(distance, objectMatrix) {
      v.setFromMatrixColumn(objectMatrix, 1); // get Y column of objectMatrix

      v.multiplyScalar(distance);
      panOffset.add(v);
    };
  }();

  var pan = function () {
    return function pan(deltaX, deltaY) {
      var element = self.parent.renderer.domElement;

      if (self.parent.camera.isPerspectiveCamera) {
        var targetDistance = Math.max(self.parent.zume, 10);
        targetDistance *= Math.tan(self.parent.camera.fov / 2 * Math.PI / 180.0); // we actually don't use screenWidth, since perspective camera is fixed to screen height

        panLeft(2 * deltaX * targetDistance / element.clientHeight, self.parent.camera.matrixWorld);
        panUp(2 * deltaY * targetDistance / element.clientHeight, self.parent.camera.matrixWorld);
      } else {
        console.warn('WARNING: camera neither perspective.');
      }
    };
  }();

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

    pan(v.x || 0, v.y || 0);
    self.parent.xVerh += panOffset.x;
    self.parent.yVerh += -panOffset.y;
    self.parent.zVerh += panOffset.z;
    self.parent.xVerh = Math.max(Math.min(self.parent.xVerh, self.distMinMaxBox), -self.distMinMaxBox);
    self.parent.zVerh = Math.max(Math.min(self.parent.zVerh, self.distMinMaxBox), -self.distMinMaxBox);
    self.parent.yVerh = Math.max(Math.min(self.parent.yVerh, self.distMinMaxBox), -self.distMinMaxBox);
    panOffset.set(0, 0, 0);
  };
}

module.exports = exports["default"];

/***/ }),

/***/ "./MVisi3D/src/visi3D/MShadowMeshContainer.js":
/*!****************************************************!*\
  !*** ./MVisi3D/src/visi3D/MShadowMeshContainer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MShadowMeshContainer;

var _MFoto3D = _interopRequireDefault(__webpack_require__(/*! ./MFoto3D.js */ "./MVisi3D/src/visi3D/MFoto3D.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
        var s = 300;
        smc = new MShadowMeshContainer();
        smc.fotoPosition.set(0, 0);// def 0,0
        smc.fotoWH = s;// def 150

        var geo = new THREE.PlaneBufferGeometry();
        geo.translate(0.5, -0.5, 0);
        geo.rotateX(-Math.PI / 2);

        // для тени
        var m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
            transparent: true,
            map: smc.texturePlan
        }));
        m.scale.set(s, 1, s);
        m.position.set(smc.fotoPosition.x, 0, smc.fotoPosition.y);
        scene.add(m);

        smc.upDate();// animate
 */
function MShadowMeshContainer(_foto3D) {
  var self = this;
  var uuid = THREE.Math.generateUUID();
  var normalVector = new THREE.Vector3(0, 1, 0);
  var planeConstant = 0.01; // this value must be slightly higher than the groundMesh's y position of 0.0

  var groundPlane = new THREE.Plane(normalVector, planeConstant);
  var lightPosition4D = new THREE.Vector4(0, 999, 0, 0.001);
  var box = new THREE.Box3();
  var foto3D = _foto3D || new _MFoto3D.default();
  this.foto3D = foto3D;
  var tp = new THREE.Vector2(0, 0);
  var twh = 100;
  var imageBlur = new ImageBlur(); // 

  this.canvas = imageBlur.canvas;
  this.isTime = false;
  var texturePlan = new THREE.Texture(imageBlur.canvas); // текстура плана тени !!!!

  this.texturePlan = texturePlan;
  this.matPlan = new THREE.MeshPhongMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    // opacity: 0.7,
    map: texturePlan
  });
  var canvasGG = new CanvasGG();
  this.canvasGG = canvasGG; // для текстуры тени
  // "arrColorStopTranspanent": [0.15, 1],
  // "arrProcent": [0.82, 1]

  canvasGG.arrColorStopTranspanent[0] = 0.15;
  canvasGG.arrProcent[0] = 0.82;
  canvasGG.arrColorStopTranspanent[1] = 1;
  canvasGG.arrProcent[1] = 1;
  canvasGG.update();
  var textureShadow = new THREE.Texture(canvasGG.canvas); // текстура обектов тени

  textureShadow.needsUpdate = true; // important!

  this.textureShadow = textureShadow;
  this.content3d = new THREE.Object3D(); // в нем план тени

  this.shadowContent3d = new THREE.Object3D(); // контейнер для теней ()
  // this.content3d.add(this.shadowContent3d);
  // foto3D.addObjFoto(self.shadowContent3d);

  this.meshPlan = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), this.matPlan); // сам пла масштабируется по scale

  this.meshPlan.rotation.x = -Math.PI / 2;
  this.content3d.add(this.meshPlan); // дебагер точки света

  var meshLight = new THREE.Mesh(new THREE.SphereBufferGeometry(10, 16, 16));
  meshLight.position.set(lightPosition4D.x, lightPosition4D.y, lightPosition4D.z); // if (window.visi3D && window.visi3D.objects && window.visi3D.sceneHelpers) {
  //     visi3D.sceneHelpers.add(meshLight);
  //     visi3D.objects.push(meshLight);
  // }
  // meshLight.addEventListener('objectChange', function(e) {
  //     lightPosition4D.x = meshLight.position.x;
  //     lightPosition4D.y = meshLight.position.y;
  //     lightPosition4D.z = meshLight.position.z;
  //     self.upDate();
  // });

  this.arrShadowMesh = []; // обекты тени

  this.arrObj = []; // 3д обекты по которым делаем тени

  this._dunamic = true;
  this.dirty = true; // если нужно полюбому сделать рендер

  this._lightPosition4D = lightPosition4D; // позиция освещения

  this._fotoPosition = new THREE.Vector2(0, 0); // позиция где делать фото тени

  this._fotoWH = 150; // размер что фотать

  this._imgWH = 512; // размер картинки

  this._imgBlur = 1; // not used

  this._imgAlpha = 1; // not used

  this._offsetY = 0; // смещение 0 расчетов теней

  this._scaleShadow = 1; // масштаб теней

  this._isDinamFotoRect = false; // true - берет размер всех обектов, false - берет размеры 

  this._opacityMat = 1; // прозрачность материала тени

  var clipPlanes = [new THREE.Plane(new THREE.Vector3(0, -1, 0), 100), new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)];
  this._shadowMaterial = new THREE.MeshBasicMaterial({
    // материал тени
    // color: 0x000000,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: this._opacityMat,
    depthWrite: false,
    map: textureShadow,
    clippingPlanes: clipPlanes,
    clipIntersection: false
  });
  this.arrDataSempl = []; // данные для шагов блюра

  this.arrDataSempl.push(new DataSempl(0, 200, 3, 1)); // helpers

  var helpers = new THREE.Group();
  this.content3d.add(helpers);
  var meshShad = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: textureShadow,
    transparent: true
  }));
  meshShad.scale.set(1, 30, 1);
  meshShad.rotation.z = -Math.PI / 2;
  helpers.add(meshShad);
  helpers.visible = false;
  this.helpers = helpers;

  this.setConstMax = function (c) {
    clipPlanes[0].constant = c;
  };

  this.setConstMin = function (c) {
    clipPlanes[1].constant = -c;
  };

  this.addObj = function (object) {
    var index = self.arrObj.indexOf(object);
    if (index != -1) return; // обект уже есть

    object.updateMatrixWorld();
    var sc = object.clone();
    bridge(sc, object);
    replaceMaterialMesh(sc);
    self.arrShadowMesh.push(sc);
    self.arrObj.push(object);
    self.shadowContent3d.add(sc);
    this.dirty = true;
  };

  this.removeObj = function (object) {
    var index = self.arrObj.indexOf(object);
    if (index == -1) return;
    self.arrObj.splice(index, 1);
    self.shadowContent3d.remove(self.arrShadowMesh[index]);
    self.arrShadowMesh.splice(index, 1);
    this.dirty = true;
  };

  this.clear = function () {
    var len = 0;

    while ((len = self.arrObj.length) > 0) {
      self.removeObj(self.arrObj[len - 1]);

      if (len === self.arrObj.length) {
        throw new Error('object not remove');
      }
    }
  };

  this.intRend = 1;
  this.intRendOk = 1; // var tim = null;

  this.upDate = function () {
    if (!self.opacityMat) return;

    if (self.dunamic) {
      self.intRend = self.intRendOk;
    }

    if (self.intRend == self.intRendOk) {
      // clearTimeout(tim);
      // tim = setTimeout(self.render, 10);
      if (self.dirty || isChangeObj()) {
        self.render();
      }
    }

    self.intRend++;
  };

  var offsetFotoDinamRect = 100;

  this.render = function () {
    if (self.isTime) console.time('render ' + uuid);
    self.dirty = false;
    updateShadowMatrixMesh(); // var par = self.shadowContent3d.parent;

    foto3D.addObjFoto(self.shadowContent3d);
    twh = self.fotoWH;
    tp.x = self.fotoPosition.x;
    tp.y = self.fotoPosition.y;

    if (self.isDinamFotoRect) {
      box.setFromObject(self.shadowContent3d);
      tp.x = box.min.x;
      tp.y = box.min.z;
      twh = Math.max(box.max.x - box.min.x, box.max.z - box.min.z);
      tp.x -= offsetFotoDinamRect;
      tp.y -= offsetFotoDinamRect;
      twh += offsetFotoDinamRect * 2;
    }

    foto3D.moveToRect(tp.x, tp.y, twh, twh); // здвигаем 

    updateTexturePlan(); // foto3D.removeObjFoto(self.shadowContent3d);

    self.meshPlan.scale.set(twh, twh, 1);
    self.meshPlan.position.set(tp.x + twh / 2, 0, tp.y + twh / 2); // if (par) par.add(self.shadowContent3d);

    if (self.isTime) console.timeEnd('render ' + uuid);
    if (self.onUpdate) self.onUpdate();
  };

  function isChangeObj() {
    // проверка изменился ли обекты
    for (var i = 0; i < self.arrShadowMesh.length; i++) {
      if (!self._isDinamFotoRect) {
        if (!isInFotoRectMesh(self.arrShadowMesh[i])) {
          continue;
        }
      }

      if (isChangeMesh(self.arrShadowMesh[i])) {
        return true;
      }
    }

    return false;
  }

  function isInFotoRectMesh(shadowMesh) {
    // попадает ли обект в рект фото
    var colisTarget = false;
    var colisShadow = false;
    var x = box.min.x;
    var y = box.min.z;
    var w = box.max.x - box.min.x;
    var h = box.max.z - box.min.z;
    box.setFromObject(shadowMesh.userData.targetObject);
    x = box.min.x;
    y = box.min.z;
    w = box.max.x - box.min.x;
    h = box.max.z - box.min.z;
    colisTarget = isColRect(x, y, w, h, self.fotoPosition.x, self.fotoPosition.y, self.fotoWH, self.fotoWH);
    box.setFromObject(shadowMesh);
    x = box.min.x;
    y = box.min.z;
    w = box.max.x - box.min.x;
    h = box.max.z - box.min.z;
    colisShadow = isColRect(x, y, w, h, self.fotoPosition.x, self.fotoPosition.y, self.fotoWH, self.fotoWH);

    if (!colisTarget && !colisShadow) {
      // оба обекта верхнего уровня за границой
      return false;
    } //---


    colisTarget = false;
    colisShadow = false;

    for (var i = 0; i < shadowMesh.children.length; i++) {
      box.setFromObject(shadowMesh.children[i].userData.targetObject);
      x = box.min.x;
      y = box.min.z;
      w = box.max.x - box.min.x;
      h = box.max.z - box.min.z;
      colisTarget = colisTarget || isColRect(x, y, w, h, self.fotoPosition.x, self.fotoPosition.y, self.fotoWH, self.fotoWH);
      box.setFromObject(shadowMesh.children[i]);
      x = box.min.x;
      y = box.min.z;
      w = box.max.x - box.min.x;
      h = box.max.z - box.min.z;
      colisShadow = colisShadow || isColRect(x, y, w, h, self.fotoPosition.x, self.fotoPosition.y, self.fotoWH, self.fotoWH);

      if (colisTarget || colisShadow) {
        // какойто внутрений обект не за границой
        return true;
      }
    }

    return true;
  }

  function isChangeMesh(shadowMesh) {
    // проверка изменился ли обект
    if (!isEqualsTransform(shadowMesh, shadowMesh.userData.targetObject)) {
      return true;
    }

    for (var i = 0; i < shadowMesh.children.length; i++) {
      if (isChangeMesh(shadowMesh.children[i])) {
        return true;
      }
    }

    return false;
  }

  function updateTexturePlan() {
    // обновить текстуру плана
    var c = foto3D.getCanvas(self.imgWH);
    imageBlur.setCanvas(c); // foto3D.render();

    if (self.arrDataSempl.length == 0) imageBlur.update();

    for (var i = 0; i < self.arrDataSempl.length; i++) {
      self.setConstMin(self.arrDataSempl[i].min * self._scaleShadow + self._offsetY);
      self.setConstMax(self.arrDataSempl[i].max * self._scaleShadow + self._offsetY);
      foto3D.render();
      imageBlur._blur = self.arrDataSempl[i].blur + (self._scaleShadow > 1 ? self._scaleShadow : 0);
      imageBlur._alpha = self.arrDataSempl[i].alpha;
      imageBlur.update();
    }

    self.setConstMin(-999999);
    self.setConstMax(999999);
    texturePlan.needsUpdate = true;
  }

  function applyTransfornRec(obj) {
    // применить трансформацию обекта рекусивно
    applyTransforn(obj, obj.userData.targetObject);

    for (var i = 0; i < obj.children.length; i++) {
      applyTransfornRec(obj.children[i]);
    }
  }

  function updateShadowMatrixMesh() {
    // пересчитать тени обектов
    // return
    lightPosition4D.w = 0.001; // more of a directional Light value

    meshLight.position.set(lightPosition4D.x, lightPosition4D.y, lightPosition4D.z);

    for (var i = 0; i < self.arrShadowMesh.length; i++) {
      applyTransfornRec(self.arrShadowMesh[i]);
    }

    updateShadowUv();
  }

  var boundingBoxUv = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3(300, 300, 300));
  this.boundingBoxUv = boundingBoxUv;
  var position = new THREE.Vector3();

  function corectUVShadow(shadowMesh) {
    // пересчет ув по высоте
    if (shadowMesh.geometry.uuid === shadowMesh.userData.targetObject.geometry.uuid) {
      shadowMesh.geometry = shadowMesh.userData.targetObject.geometry.clone();
    } // shadowMesh.geometry.computeBoundingBox();


    var boundingBox = boundingBoxUv; // shadowMesh.geometry.boundingBox; //boundingBoxUv; // 

    var py = 0;

    if (shadowMesh.geometry instanceof THREE.Geometry) {
      var faces = shadowMesh.geometry.faces;
      var vertices = shadowMesh.geometry.vertices;
      var faceVertexUvs = shadowMesh.geometry.faceVertexUvs[0];

      for (var i = 0; i < faces.length; i++) {
        position.set(vertices[faces[i].a].x, vertices[faces[i].a].y, vertices[faces[i].a].z);
        shadowMesh.localToWorld(position);
        py = 1 - getProcent(position.y - self._offsetY
        /*/ self._scaleShadow*/
        , boundingBox.min.y, boundingBox.min.y + boundingBox.max.y) / 100;
        faceVertexUvs[i][0].set(py, py);
        position.set(vertices[faces[i].b].x, vertices[faces[i].b].y, vertices[faces[i].b].z);
        shadowMesh.localToWorld(position);
        py = 1 - getProcent(position.y - self._offsetY
        /*/ self._scaleShadow*/
        , boundingBox.min.y, boundingBox.min.y + boundingBox.max.y) / 100;
        faceVertexUvs[i][1].set(py, py);
        position.set(vertices[faces[i].c].x, vertices[faces[i].c].y, vertices[faces[i].c].z);
        shadowMesh.localToWorld(position);
        py = 1 - getProcent(position.y - self._offsetY
        /*/ self._scaleShadow*/
        , boundingBox.min.y, boundingBox.min.y + boundingBox.max.y) / 100;
        faceVertexUvs[i][2].set(py, py);
      }

      shadowMesh.geometry.uvsNeedUpdate = true;
    } else {
      var arrPosition = shadowMesh.geometry.attributes.position.array;

      if (!shadowMesh.geometry.attributes.uv) {
        // если нет атрибута создаем новый
        arrUvAttribut = new Float32Array(arrPosition.length / 3 * 2);
        shadowMesh.geometry.addAttribute('uv', new THREE.BufferAttribute(arrUvAttribut, 2));
      }

      var arrUv = shadowMesh.geometry.attributes.uv.array;
      var itemSize = shadowMesh.geometry.attributes.uv.itemSize;
      var arrIndex = shadowMesh.geometry.index.array;
      var count = shadowMesh.geometry.index.count;
      var indexUv = 0;
      var indexInd = 0; //----

      for (var i = 0; i < count; i++) {
        var ind = arrIndex[i];
        var indP = ind * 3;
        var indUv = ind * 2;
        position.set(arrPosition[indP], arrPosition[indP + 1], arrPosition[indP + 2]);
        shadowMesh.localToWorld(position); // if(i%500==0)trace('--=', 'position.y', position.y);
        // var px = 1 - getProcent(position.x, boundingBox.min.x, boundingBox.max.x) / 100;

        py = 1 - getProcent(position.y - self._offsetY
        /*/ self._scaleShadow*/
        , boundingBox.min.y, boundingBox.min.y + boundingBox.max.y * self._scaleShadow) / 100; // var pz = 1 - getProcent(position.z, boundingBox.min.z, boundingBox.max.z) / 100;
        // var ppx = 1 - calc.diffNum(0.5, px) / 0.5;
        // var ppz = 1 - calc.diffNum(0.5, pz) / 0.5;
        // var py = 1 - getProcent(arrPosition[(indP + 1)], boundingBox.min.y, boundingBox.max.y) / 100;

        arrUv[indUv] = py; // * ppz * ppx; //(py*ppx *ppz/*+ (ppx + ppz)*0.1*/) // 3;

        arrUv[indUv + 1] = py; // * ppz * ppx; //(py*ppx *ppz/*+ (ppx + ppz)*0.1*/) // 3;
      }

      shadowMesh.geometry.attributes.uv.needsUpdate = true;
    }
  }

  function findRecMesh(obj, arr) {
    //найти все мешы в обекте
    if (obj.type == 'Mesh') {
      arr.push(obj);
    }

    for (var i = 0; i < obj.children.length; i++) {
      if (obj.type == 'Mesh') {
        arr.push(obj.children[i]);
      } else {
        findRecMesh(obj.children[i], arr);
      }
    }
  }

  function updateUvMesh(obj) {
    if (obj.type === 'Mesh') {
      var isUpdateUvMesh = false; // нужно ли пересчитывать ув меша 

      var wpos = obj.getWorldPosition(obj.position);
      var wrot = obj.getWorldQuaternion(obj.quaternion);
      var maxHeight = self.maxHeight;
      wpos.y -= self._offsetY
      /* / self._scaleShadow*/
      ;

      if (!obj.userData.pos) {
        // когда первый раз зашли
        isUpdateUvMesh = true;
      } else if (obj.userData.pos.y != wpos.y) {
        // когда позиция по высоте поменылась
        isUpdateUvMesh = true;
      } else if (!obj.userData.rot.equals(wrot)) {
        // когда повернули 
        isUpdateUvMesh = true;
      } else if (obj.userData.maxHeight !== maxHeight) {
        // когда поменялся конф высота
        isUpdateUvMesh = true;
      } else if (obj.userData.scaleShadow !== self._scaleShadow) {
        // когда поменялся конф высота
        isUpdateUvMesh = true;
      }

      if (!self._isDinamFotoRect) {
        // оптимизация если обект за ректом его пересчитывать не нужно 
        box.setFromObject(obj);

        if (!isColRect(box.min.x, box.min.z, box.max.x - box.min.x, box.max.z - box.min.z, self.fotoPosition.x, self.fotoPosition.y, self.fotoWH, self.fotoWH)) {
          isUpdateUvMesh = false;
        }
      }

      if (isUpdateUvMesh) {
        corectUVShadow(obj);
        obj.userData.pos = wpos;
        obj.userData.rot = wrot;
        obj.userData.maxHeight = maxHeight;
        obj.userData.scaleShadow = self._scaleShadow;
      }
    }

    for (var i = 0; i < obj.children.length; i++) {
      updateUvMesh(obj.children[i]);
    }
  }

  function updateShadowUv() {
    meshShad.scale.x = (self.boundingBoxUv.max.y || 1) * self._scaleShadow;
    meshShad.position.y = meshShad.scale.x / 2 + self.boundingBoxUv.min.y;

    for (var i = 0; i < self.arrShadowMesh.length; i++) {
      if (!self._isDinamFotoRect) {
        box.setFromObject(self.arrShadowMesh[i]);

        if (!isColRect(box.min.x, box.min.z, box.max.x - box.min.x, box.max.z - box.min.z, self.fotoPosition.x, self.fotoPosition.y, self.fotoWH, self.fotoWH)) {
          continue;
        }
      }

      updateUvMesh(self.arrShadowMesh[i]);
    }
  }

  this.updateShadowUv = updateShadowUv;

  this.updateShadowTexture = function () {
    this.canvasGG.update();
    this.textureShadow.needsUpdate = true;
  };

  this.setShadowColor = function (r, g, b) {
    canvasGG.r = r;
    canvasGG.g = g;
    canvasGG.b = b;
    self.updateShadowTexture();
  };

  this.getConfig = function () {
    var o = {};
    o.imgWH = self.imgWH;
    o.fotoPosition = {
      x: self._fotoPosition.x,
      y: self._fotoPosition.y
    };
    o.fotoWH = self.fotoWH;
    o.maxHeight = self.maxHeight;
    o.isDinamFotoRect = self.isDinamFotoRect;
    o.arrDataSempl = self.arrDataSempl;
    o.opacityMat = self.opacityMat;
    o.dunamic = self.dunamic;
    o.canvasGG = {
      arrColorStopTranspanent: self.canvasGG.arrColorStopTranspanent,
      arrProcent: self.canvasGG.arrProcent
    };
    return o;
  };

  this.setConfig = function (o) {
    self.canvasGG.arrColorStopTranspanent = o.canvasGG.arrColorStopTranspanent;
    self.canvasGG.arrProcent = o.canvasGG.arrProcent;
    self.fotoPosition.x = o.fotoPosition.x;
    self.fotoPosition.y = o.fotoPosition.y;
    self.fotoWH = o.fotoWH;
    self.isDinamFotoRect = o.isDinamFotoRect;
    self.arrDataSempl = o.arrDataSempl;
    self.opacityMat = o.opacityMat;
    self.imgWH = o.imgWH;
    self.dunamic = o.dunamic;
    self.updateShadowTexture();
    self.maxHeight = o.maxHeight;
  };

  var sss = {
    "imgWH": 1024,
    "fotoPosition": {
      "x": 0,
      "y": 0
    },
    "fotoWH": 150,
    "maxHeight": 300,
    "isDinamFotoRect": false,
    "arrDataSempl": [{
      "min": 0,
      "max": 6,
      "blur": 0.8,
      "alpha": 0.25
    }, {
      "min": 4,
      "max": 15,
      "blur": 3,
      "alpha": 0.64
    }, {
      "min": 10,
      "max": 23,
      "blur": 4,
      "alpha": 0.5
    }, {
      "min": 15,
      "max": 50,
      "blur": 15,
      "alpha": 1
    }, {
      "min": 20,
      "max": 198.09,
      "blur": 15,
      "alpha": 0.7
    }, {
      "min": 0,
      "max": 2,
      "blur": 1.02,
      "alpha": 1
    }],
    "opacityMat": 1,
    "dunamic": true,
    "canvasGG": {
      "arrColorStopTranspanent": [0, 1, 0.25],
      "arrProcent": [0.4, 1, 0.96]
    }
  };
  this.sss = sss;
  this.setConfig(sss);

  function bridge(obj, obj1) {
    // установка связи
    obj.userData.targetObject = obj1;

    for (var i = 0; i < obj.children.length; i++) {
      if (!obj1.children[i]) throw new Error('обекты не одинаковы');
      bridge(obj.children[i], obj1.children[i]);
    }
  }

  function replaceMaterialMesh(obj) {
    // замена материалов 
    var arr = [];
    findRecMesh(obj, arr);

    for (var i = 0; i < arr.length; i++) {
      arr[i].material = self._shadowMaterial;
    }
  }

  function isEqualsTransform(obj, obj1) {
    // одинакова ли трансформация обектов
    var isEqualsPos = false; // if (self._scaleShadow !== 1) {
    //     isEqualsPos = 
    //         (Math.abs((obj.position.x * self._scaleShadow) - obj1.position.x) < 1) &&
    //         (Math.abs((obj.position.y * self._scaleShadow) - obj1.position.y) < 1) &&
    //         (Math.abs((obj.position.z * self._scaleShadow) - obj1.position.z) < 1);
    // } else {

    isEqualsPos = obj.position.equals(obj1.position); // }

    if (isEqualsPos && obj.quaternion.equals(obj1.quaternion) && obj.scale.equals(obj1.scale) // obj.scale.x === obj1.scale.x &&
    // obj.scale.z === obj1.scale.z
    && obj.visible === obj1.visible) {
      return true;
    }

    return false;
  }

  function applyTransforn(obj, obj1) {
    // скопировать трансф обекта
    obj.position.copy(obj1.position);
    obj.quaternion.copy(obj1.quaternion);
    obj.scale.copy(obj1.scale);
    obj.visible = obj1.visible; // if (self._scaleShadow !== 1) {
    //     obj.position.x = obj1.position.x / self._scaleShadow;
    //     obj.position.y = obj1.position.y / self._scaleShadow;
    //     obj.position.z = obj1.position.z / self._scaleShadow;
    // }
    // obj.scale.set(1, 1, 1);// ignore scale object
  } // проверка на пересечение прямоугольников


  function isColRect(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && y1 < y2 + h2 && x1 + w1 > x2 && y1 + h1 > y2;
  }

  function getProcent(val, min, max, okrug) {
    min = min != undefined ? min : 0;
    max = max != undefined ? max : 100;
    okrug = okrug || 100;
    if (isNaN(parseFloat(val))) val = min;
    if (val < min) val = min;
    if (val > max) val = max;
    val = Math.round(val * okrug) / okrug;
    return min < 0 ? (Math.abs(min) + val) * 100 / (Math.abs(min) + Math.abs(max) || 1) : (Math.abs(min) - val) * 100 / (Math.abs(min) - Math.abs(max) || 1);
  }

  function roundNum(num, siz) {
    siz = siz != undefined ? siz : 10000;
    return Math.round(num * siz) / siz;
  }

  this.getBase64 = function () {
    self.render();
    return imageBlur.canvas.toDataURL();
  };

  this.debug = false;
}

Object.defineProperties(MShadowMeshContainer.prototype, {
  scaleShadow: {
    set: function set(value) {
      this.dirty = true;
      this._scaleShadow = value; // this.content3d.scale.x = this.content3d.scale.z = value;
    },
    get: function get() {
      return this._scaleShadow;
    }
  },
  debug: {
    set: function set(value) {
      this.helpers.visible = value;
    },
    get: function get() {
      return this.helpers.visible;
    }
  },
  offsetY: {
    set: function set(value) {
      this._offsetY = value;
      this.dirty = true;
    },
    get: function get() {
      return this._offsetY;
    }
  },
  maxHeight: {
    set: function set(value) {
      this.dirty = true;
      this.boundingBoxUv.max.y = value;
      this.updateShadowUv();
    },
    get: function get() {
      return this.boundingBoxUv.max.y;
    }
  },
  dunamic: {
    set: function set(value) {
      this.dirty = true;
      this._dunamic = value;
    },
    get: function get() {
      return this._dunamic;
    }
  },
  fotoPosition: {
    set: function set(value) {
      this.dirty = true;
      this._fotoPosition = value;
    },
    get: function get() {
      return this._fotoPosition;
    }
  },
  fotoWH: {
    set: function set(value) {
      this.dirty = true;
      this._fotoWH = value;
    },
    get: function get() {
      return this._fotoWH;
    }
  },
  imgWH: {
    set: function set(value) {
      this.dirty = true;
      this._imgWH = value;
    },
    get: function get() {
      return this._imgWH;
    }
  },
  imgBlur: {
    set: function set(value) {
      this.dirty = true;
      this._imgBlur = value;
    },
    get: function get() {
      this.dirty = true;
      return this._imgBlur;
    }
  },
  imgAlpha: {
    set: function set(value) {
      this.dirty = true;
      this._imgAlpha = value;
    },
    get: function get() {
      return this._imgAlpha;
    }
  },
  isDinamFotoRect: {
    set: function set(value) {
      this.dirty = true;
      this._isDinamFotoRect = value;
    },
    get: function get() {
      return this._isDinamFotoRect;
    }
  },
  opacityMat: {
    set: function set(value) {
      this.dirty = true;
      this._opacityMat = value;
      this.matPlan.opacity = this._opacityMat;
    },
    get: function get() {
      return this._opacityMat;
    }
  },
  shadowMaterial: {
    set: function set(value) {
      if (value !== this._shadowMaterial) {
        this._shadowMaterial = value;

        for (var i = 0; i < this.arrShadowMesh.length; i++) {
          if (this.arrShadowMesh[i] instanceof THREE.ShadowMesh) {
            this.arrShadowMesh[i].material = this._shadowMaterial;
          } else {
            for (var j = 0; j < this.arrShadowMesh[i].children.length; j++) {
              if (this.arrShadowMesh[i].children[j] instanceof THREE.ShadowMesh) {
                this.arrShadowMesh[i].children[j].material = this._shadowMaterial;
              }
            }
          }
        }
      }
    },
    get: function get() {
      return this._shadowMaterial;
    }
  },
  lightPosition4D: {
    set: function set(value) {
      this._lightPosition4D.set(value.x, value.y, value.z, 0.001);
    },
    get: function get() {
      return this._lightPosition4D;
    }
  }
});

function DataSempl(min, max, blur, alpha) {
  this.min = min || 0;
  this.max = max || 1;
  this.blur = blur || 0;
  this.alpha = alpha || 1;
}

function ImageBlur() {
  var self = this;
  var canvas = document.createElement('canvas');
  this.canvas = canvas;
  canvas.width = 256;
  canvas.height = 256;
  var context = canvas.getContext("2d");
  var img = new Image();
  this.b64 = null;
  this._blur = 0;
  this._blur1 = 1;
  this._alpha = 1;
  this.image = new Image();

  this.setBase64 = function (_b64, fun) {
    this.b64 = _b64;
    img = new Image();

    img.onload = function () {
      canvas.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = img.width;
      canvas.height = img.height;
      self.update();
      if (fun) fun(canvas.toDataURL());
    };

    img.src = _b64;
  };

  this.setCanvas = function (c) {
    img = c;
    canvas.width = c.width;
    canvas.height = c.height; // self.update();
  };

  this.update = function () {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    // context.filter = 'blur(' + self._blur1 + 'px)';
    // context.globalAlpha = 0.1;
    // context.drawImage(img, 0, 0);
    context.filter = 'blur(' + self._blur + 'px)';
    context.globalAlpha = self._alpha;
    context.drawImage(img, 0, 0);
  };
}

Object.defineProperties(ImageBlur.prototype, {
  blur: {
    set: function set(value) {
      this._blur = value; // this.update();
    },
    get: function get() {
      return this._blur;
    }
  },
  alpha: {
    set: function set(value) {
      this._alpha = value; // this.update();
    },
    get: function get() {
      return this._alpha;
    }
  }
});

function CanvasGG() {
  var self = this;
  var canvas = document.createElement('canvas'); // document.body.appendChild(canvas);
  // canvas.style.position = 'fixed';

  canvas.width = canvas.height = 256;
  this.canvas = canvas;
  var context = canvas.getContext("2d");
  this._blur = 0;
  this._alpha = 1;
  this.arrColorStopTranspanent = [0, 1]; //CSS Colors transpanent

  this.arrProcent = [0, 1]; //0 ... 1

  this.position = new THREE.Vector2(); //0 ... 1

  this.position1 = new THREE.Vector2(1, 0); //0 ... 1

  this.r = 0;
  this.g = 0;
  this.b = 0;

  this.update = function () {
    var w = canvas.width;
    var h = canvas.height;
    context.clearRect(0, 0, w, h);
    context.rect(0, 0, w, h);
    context.filter = 'blur(' + self._blur + 'px)';
    context.globalAlpha = self._alpha;
    var px = self.position.x * w;
    var py = self.position.y * h;
    var px1 = self.position1.x * w;
    var py1 = self.position1.y * h;
    var gradient = context.createLinearGradient(px, py, px1, py1);

    for (var i = 0; i < self.arrColorStopTranspanent.length; i++) {
      gradient.addColorStop(self.arrProcent[i], 'rgba(' + self.r + ',' + self.g + ',' + self.b + ',' + self.arrColorStopTranspanent[i] + ')');
    }

    context.fillStyle = gradient;
    context.fill();
  };

  this.update();
}

Object.defineProperties(CanvasGG.prototype, {// blur: {
  //     set: function(value) {
  //         this._blur = value;
  //         this.update();
  //     },
  //     get: function() {
  //         return this._blur;
  //     }
  // },
  // alpha: {
  //     set: function(value) {
  //         this._alpha = value;
  //         this.update();
  //     },
  //     get: function() {
  //         return this._alpha;
  //     }
  // },
});
module.exports = exports["default"];

/***/ }),

/***/ "./MVisi3D/src/visi3D/MSky.js":
/*!************************************!*\
  !*** ./MVisi3D/src/visi3D/MSky.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MSky;

function MSky(_parent) {
  this.parent = _parent;
  var self = this;
  this._active = false;
  this.RADIUS = 1000;
  this.POS_X = 0;
  this.POS_Y = 0;
  this.POS_Z = 0;
  this.LINK = 'null';
  this.COLOR = '0xffffff';
  this._radius = this.RADIUS;
  this._link = this.LINK;
  this._color = this.COLOR;
  this._shadRotZ = this.parent.ROTATION_Z;
  this._rotZ = 0;
  this._x = this.POS_X;
  this._y = this.POS_Y;
  this._z = this.POS_Z;
  this.mesh = undefined;
  this.cont3d = undefined;
  this.cont3d1 = undefined;
  this.textur = undefined;

  this.init = function () {
    if (this.mesh != undefined) return;
    this.geometry = new THREE.SphereGeometry(1, 32, 32);
    this.loader = new THREE.TextureLoader();
    this.loaderHDR = new THREE.RGBELoader();
    this.material = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      color: 0xffffff
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.scale.set(this._radius, this._radius, this._radius);
    this.cont3d = new THREE.Object3D();
    this.cont3d1 = new THREE.Object3D();
    this.cont3d.add(this.cont3d1);
    this.cont3d1.add(this.mesh);
    this.cont3d1.rotation.y = this._shadRotZ;
    this.mesh.rotation.y = this._rotZ;
    this.cont3d.rotation.x = -Math.PI / 2;
  };

  this.dergActiv = function () {
    if (this._active == true) {
      if (this.cont3d.parent == null) this.parent.parent.groupObject.add(this.cont3d);
    } else {
      if (this.cont3d.parent != null) this.parent.parent.groupObject.remove(this.cont3d);
    }
  };

  var tt;

  this.dergLink = function () {
    if (this._link == 'null') {
      // сносим мапу
      if (this.material.map != null) {
        this.material.map = null;
        this.material.needsUpdate = true;
      }
    } else {
      // грузим новую
      tt = this.checkFormat(this._link);

      if (tt == 0) {
        // щбычная
        this.loader.load(this._link, function (textur) {
          self.textur = textur;
          self.material.map = textur;
          self.material.needsUpdate = true;
          self.parent.parent.intRend = 1;
        });
      }

      if (tt == 1) {
        // hdr
        this.loaderHDR.load(this._link, function (textur) {
          self.textur = textur;
          self.textur.encoding = THREE.RGBEEncoding;
          self.textur.minFilter = THREE.NearestFilter;
          self.textur.magFilter = THREE.NearestFilter;
          self.textur.flipY = true;
          self.material.map = textur;
          self.material.needsUpdate = true;
          self.parent.parent.intRend = 1;
        });
      }
    }
  };

  this.checkFormat = function (link) {
    if (link.indexOf('.png') !== -1) return 0;
    if (link.indexOf('.jpeg') !== -1) return 0;
    if (link.indexOf('.jpg') !== -1) return 0;

    if (link.length > 150) {
      // это бейс 64 хз какой но не хдр наверно)))
      if (link.indexOf('png') !== -1) return 0;
      if (link.indexOf('jpeg') !== -1) return 0;
      if (link.indexOf('jpg') !== -1) return 0;
      return 1;
    }

    return 1;
  };

  this.render = function () {
    /* if(this.mesh==undefined)return
    if(this._active == false)return
    		if(this._rotationZ!=this.parent.parent.rotationZ){
    	this._rotationZ=this.parent.parent.rotationZ
    	//this.cont3d1.rotation.y=this._rotationZ
    } */
  };
}

MSky.prototype = {
  set x(v) {
    if (this._x === v) return;
    this._x = v;
    this.cont3d.position.x = v;
    this.parent.parent.intRend = 1;
  },

  get x() {
    return this._x;
  },

  set y(v) {
    if (this._y === v) return;
    this._y = v;
    this.cont3d.position.y = v;
    this.parent.parent.intRend = 1;
  },

  get y() {
    return this._y;
  },

  set z(v) {
    if (this._z === v) return;
    this._z = v;
    this.cont3d.position.z = v;
    this.parent.parent.intRend = 1;
  },

  get z() {
    return this._z;
  },

  set active(v) {
    if (this._active === v) return;
    this._active = v;
    this.init();
    this.dergActiv();
  },

  get active() {
    return this._active;
  },

  set radius(v) {
    if (this._radius === v) return;
    this._radius = v;

    if (this.mesh != undefined) {
      this.mesh.scale.set(this._radius, this._radius, this._radius);
    }
  },

  get radius() {
    return this._radius;
  },

  set link(v) {
    if (this._link === v) return;
    this._link = v;
    this.init();
    this.dergLink();
    /* if(this._link=="null"){
    	this.material
    } */
  },

  get link() {
    return this._link;
  },

  set shadRotZ(v) {
    if (this._shadRotZ === v) return;
    this._shadRotZ = v;

    if (this.mesh != undefined) {
      this.cont3d1.rotation.y = this._shadRotZ;
    }
  },

  get shadRotZ() {
    return this._shadRotZ;
  },

  set rotZ(v) {
    if (this._rotZ === v) return;
    this._rotZ = v;

    if (this.mesh != undefined) {
      this.mesh.rotation.y = this._rotZ;
    }
  },

  get rotZ() {
    return this._rotZ;
  },

  set color(v) {
    if (this._color === v) return;
    this._color = v;
    this.init();
    var c = this._color;

    if (typeof c === 'string') {
      if (c.indexOf('x') != -1) {
        var a = c.split('x');
        c = '#' + a[1];
      }
    }

    this.material.color = new THREE.Color(c);
  },

  get color() {
    return this._color;
  }

};
module.exports = exports["default"];

/***/ }),

/***/ "./MVisi3D/src/visi3D/MSmc.js":
/*!************************************!*\
  !*** ./MVisi3D/src/visi3D/MSmc.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MSmc;

var _MShadowMeshContainer = _interopRequireDefault(__webpack_require__(/*! ./MShadowMeshContainer.js */ "./MVisi3D/src/visi3D/MShadowMeshContainer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MSmc(_parent) {
  this.parent = _parent;
  var self = this;
  this._active = false;
  this._visible = true;
  this.WH = 512;
  this._wn = this.WH;
  this._obj3d = undefined;
  this.smc = undefined;

  this.init = function () {
    if (this.smc != undefined) return;
    this.smc = new _MShadowMeshContainer.default();
    this.smc.fotoPosition.set(-this._wn / 2, -this._wn / 2);
    this.smc.fotoWH = this._wn;
    this.smc.content3d.rotation.x = -Math.PI / 2;
    this.smc.content3d.position.y = -1;
    this.smc.content3d.visible = this._visible;
    this.dergObj();
  };

  this.dergActiv = function () {
    if (this._active == true) {
      if (this.smc.content3d.parent == null) this.parent.parent.groupObject.add(this.smc.content3d);
    } else {
      if (this.smc.content3d.parent != null) this.parent.parent.groupObject.remove(this.smc.content3d);
    }
  };

  this.render = function () {
    if (this.smc == undefined) return;

    if (this.smc.content3d.parent != null) {
      this.smc.upDate();
    }
  };

  this.dergObj = function () {
    if (this.smc == undefined) return;

    if (this._obj3d != undefined) {
      if (this.smc.arrObj[0] == this._obj3d) {} else {
        this.smc.clear();
        this.smc.addObj(this._obj3d);
      }
    } else {
      this.smc.clear();
    }
  };
}

MSmc.prototype = {
  set active(v) {
    if (this._active === v) return;
    this._active = v;
    this.init();
    this.dergActiv();
  },

  get active() {
    return this._active;
  },

  set visible(v) {
    if (this._visible === v) return;
    this._visible = v;
    if (this.smc == undefined) return;
    this.smc.content3d.visible = v;
  },

  get visible() {
    return this._visible;
  },

  set obj3d(v) {
    if (this._obj3d === v) return;
    this._obj3d = v;
    this.dergObj();
  },

  get obj3d() {
    return this._obj3d;
  },

  set wh(v) {
    if (this._wh === v) return;
    this._wh = v;
    if (this.smc == undefined) return;
    this.smc.fotoPosition.set(-this._wn / 2, -this._wn / 2);
    this.smc.fotoWH = this._wn;
  },

  get wh() {
    return this._wh;
  }

};
module.exports = exports["default"];

/***/ }),

/***/ "./MVisi3D/src/visi3D/MUtility.js":
/*!****************************************!*\
  !*** ./MVisi3D/src/visi3D/MUtility.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MUtility;

var _MSky = _interopRequireDefault(__webpack_require__(/*! ./MSky.js */ "./MVisi3D/src/visi3D/MSky.js"));

var _MSmc = _interopRequireDefault(__webpack_require__(/*! ./MSmc.js */ "./MVisi3D/src/visi3D/MSmc.js"));

var _MFocus = _interopRequireDefault(__webpack_require__(/*! ./MFocus.js */ "./MVisi3D/src/visi3D/MFocus.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MUtility(_parent) {
  var self = this;
  this.parent = _parent;
  this._debug = false;
  this.debugInit = false;
  this.shadowHelper = undefined;
  this.spotLightHelper = undefined;
  this.gridHelper = undefined;
  this.FIXATION = false;
  this.ROTATION_X = 0;
  this.ROTATION_Z = 0;
  this.DISTANCE = this.parent.DISTANCE;
  this.CUB_HEIGHT = this.parent.CUB_HEIGHT;
  this.CUB_WIDTH = this.parent.CUB_WIDTH;
  this.SKY_X = 0;
  this.SKY_Y = 0;
  this.SKY_Z = 0;
  this._fixation = this.FIXATION;
  this._rotationX = this.ROTATION_X;
  this._rotationZ = this.ROTATION_Z;
  this._distance = this.DISTANCE;
  this._cubHeight = this.CUB_HEIGHT;
  this._cubWidth = this.CUB_WIDTH; // задний фон

  this.sky = new _MSky.default(this);
  this.smc = new _MSmc.default(this);
  this.focus = new _MFocus.default(this.parent);

  this.funDebug = function () {
    if (this.debugInit != true) {
      this.debugInit = true;
      this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000, 1000).rotateX(-Math.PI), new THREE.MeshLambertMaterial({
        color: new THREE.Color(0xacacac)
      }));
      this.plane.castShadow = this.plane.receiveShadow = true;
      this.gridHelper = new THREE.GridHelper(1000, 10);
      this.gridHelper.rotation.x = -Math.PI / 2;
      this.shadowHelper = new THREE.CameraHelper(this.parent.sunLight.shadow.camera);
      if (this.parent.sunLight) this.spotLightHelper = new THREE.DirectionalLightHelper(this.parent.sunLight);
    }

    if (this._debug == true) {
      if (this.gridHelper.parent == null) this.parent.groupObject.add(this.gridHelper);
      if (this.plane.parent == null) this.parent.groupObject.add(this.plane);
      if (this.shadowHelper.parent == null) this.parent.scene.add(this.shadowHelper);

      if (this.parent.sunLight) {
        if (this.parent.sunLight.parent != null) {} else {
          if (this.spotLightHelper.parent != null) this.parent.scene.remove(this.spotLightHelper);
          if (this.shadowHelper.parent != null) this.parent.scene.remove(this.shadowHelper);
        }
      }
    } else {
      if (this.gridHelper.parent != null) this.parent.groupObject.remove(this.gridHelper);
      if (this.plane.parent != null) this.parent.groupObject.remove(this.plane);
      if (this.shadowHelper.parent != null) this.parent.scene.remove(this.shadowHelper);

      if (this.parent.sunLight) {
        if (this.spotLightHelper.parent != null) this.parent.scene.remove(this.spotLightHelper);
      }
    }
  };

  this.render = function () {
    if (this._debug == true) {
      if (this.spotLightHelper != undefined) this.spotLightHelper.update();
    }

    this.smc.render();
    this.sky.render();
    this.focus.upDate();
    this.dragSunLight();
  };

  var d = 0;

  this.dragSunLight = function () {
    if (this.parent.sunLight == undefined) return;
    if (this.parent.sunLight.parent == null) return;

    if (self._fixation === true) {
      d = this._distance + this._cubHeight * 2;
      self.parent.sunLight.position.set(0, d, 0); // занулили

      self.parent.sunLight.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), self._rotationX);
      self.parent.sunLight.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), self._rotationZ - self.parent._rotationZ);
    } else {
      d = this._distance + this._cubHeight;
      this.parent.sunLight.position.set(0, d, 0); // занулили

      this.parent.sunLight.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), this._rotationX);
      this.parent.sunLight.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), this._rotationZ);

      if (this.parent.staticShadow) {
        moveSunToCam();
      }
    }
  };

  var shadowPrintPos = new THREE.Vector3();
  this.distanceUpdateShadow = 500; // на каком растоянии будет постоянно обновляться тень

  function moveSunToCam() {
    var camPos = new THREE.Vector3(self.parent.xVerh, self.parent.yVerh, self.parent.zVerh);
    self.parent.sunLight.position.add(camPos);
    self.parent.sunLight.target.position.copy(camPos);

    if (shadowPrintPos.distanceTo(camPos) > self.distanceUpdateShadow) {
      shadowPrintPos.copy(camPos);
      self.parent.shadowNeedsUpdate = true;
    }
  }

  this.dragSunLight2 = function () {
    if (this.parent.sunLight == undefined) return;
    if (this.parent.sunLight.parent == null) return;

    if (this._fixation === true) {} else {
      d = this._distance + this._cubHeight * 2;
      this.parent.sunLight.position.set(0, d, 0); // занулили

      this.parent.sunLight.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), this._rotationX);
      this.parent.sunLight.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), this._rotationZ);
    }
  };

  this.dragSunLight3 = function () {
    if (this.parent.sunLight) {
      this.parent.sunLight.shadow.camera.near = 0 + this._cubHeight; // this._distance;

      this.parent.sunLight.shadow.camera.far = this._cubHeight * 2 + this._cubHeight; // +this._distance ;

      this.parent.sunLight.shadow.camera.updateProjectionMatrix();
      if (this.shadowHelper) this.shadowHelper.update();
    }
  };

  this.sunActiv = function (value) {
    this.parent.objShadow(this.parent.group, value);

    if (value == true) {
      if (this.parent.sunLight.parent == undefined) {
        this.parent.scene.add(this.parent.sunLight);
        this.parent.scene.add(self.parent.sunLight.target);
      }
    } else {
      if (this.parent.sunLight.parent != undefined) {
        this.parent.scene.remove(this.parent.sunLight);
        this.parent.scene.remove(self.parent.sunLight.target);
      }
    }

    this.funDebug();
  };

  this.ambientActiv = function (value) {
    if (value == true) {
      if (this.parent.ambientLight.parent == undefined) this.parent.scene.add(this.parent.ambientLight);
    } else {
      if (this.parent.ambientLight.parent != undefined) this.parent.scene.remove(this.parent.ambientLight);
    }
  };
}

MUtility.prototype = {
  set debug(v) {
    if (this._debug === v) return;
    this._debug = v;
    this.funDebug();
  },

  get debug() {
    return this._debug;
  },

  set rotationX(v) {
    if (this._rotationX === v) return;
    this._rotationX = v;

    if (this.spotLightHelper != undefined) {
      this.parent.sunLight.shadow.camera.updateProjectionMatrix();
      this.spotLightHelper.update();
    }

    this.dragSunLight2();
  },

  get rotationX() {
    return this._rotationX;
  },

  set rotationZ(v) {
    if (this._rotationZ === v) return;
    this._rotationZ = v;
    this.sky.shadRotZ = v;
    if (this.spotLightHelper != undefined) this.spotLightHelper.update();
    this.dragSunLight2();
  },

  get rotationZ() {
    return this._rotationZ;
  },

  set fixation(v) {
    if (this._fixation === v) return;
    this._fixation = v;
    this.dragSunLight2();
  },

  get fixation() {
    return this._fixation;
  },

  set distance(v) {
    if (this._distance === v) return;
    this._distance = v;
    this.dragSunLight3();
    this.dragSunLight2();
  },

  get distance() {
    return this._distance;
  },

  set cubHeight(v) {
    if (this._cubHeight === v) return;
    this._cubHeight = v;
    this.dragSunLight3();
    this.dragSunLight2();
  },

  get cubHeight() {
    return this._cubHeight;
  },

  set cubWidth(v) {
    if (this._cubWidth === v) return;
    this._cubWidth = v;

    if (this.parent.sunLight) {
      this.parent.sunLight.shadow.camera.right = this._cubWidth;
      this.parent.sunLight.shadow.camera.left = -this._cubWidth;
      this.parent.sunLight.shadow.camera.top = this._cubWidth;
      this.parent.sunLight.shadow.camera.bottom = -this._cubWidth;
      this.parent.sunLight.shadow.camera.updateProjectionMatrix();
      if (this.shadowHelper) this.shadowHelper.update();
    }
  },

  get cubWidth() {
    return this._cubWidth;
  }

};
module.exports = exports["default"];

/***/ }),

/***/ "./MVisi3D/src/visi3D/MVisi3D.js":
/*!***************************************!*\
  !*** ./MVisi3D/src/visi3D/MVisi3D.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MVisi3D;

var _MEffectArray = _interopRequireDefault(__webpack_require__(/*! ./MEffectArray.js */ "./MVisi3D/src/visi3D/MEffectArray.js"));

var _MPosition3d = _interopRequireDefault(__webpack_require__(/*! ./MPosition3d.js */ "./MVisi3D/src/visi3D/MPosition3d.js"));

var _MEvent3DArr = _interopRequireDefault(__webpack_require__(/*! ./MEvent3DArr.js */ "./MVisi3D/src/visi3D/MEvent3DArr.js"));

var _MUtility = _interopRequireDefault(__webpack_require__(/*! ./MUtility.js */ "./MVisi3D/src/visi3D/MUtility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MVisi3D(_contentHTML, _content2d, _devas, _directional, _efect, _event3DArr, _alpha) {
  var self = this;
  _devas = _devas !== undefined ? _devas : false;
  _directional = _directional !== undefined ? _directional : true;
  _efect = _efect !== undefined ? _efect : true;
  _event3DArr = _event3DArr !== undefined ? _event3DArr : true;
  _alpha = _alpha !== undefined ? _alpha : false;
  this.devas = _devas;
  this.arrSetiScene = [];
  this._xVerh = 0;
  this._yVerh = 0;
  this._zVerh = 0;
  this._rotationX = 0;
  this._rotationZ = 0;
  this._zume = 1000;
  this._arrOut = [];
  this._x = 0;
  this._y = 0;
  this._height = 100;
  this._width = 100;
  this.yes3d = true;
  this.intRendOk = 1;
  this._visible = true;
  this._isDragPan = false;
  this._activMouse = true;
  this._staticShadow = false;
  this.alwaysRender = false;
  this.AMBIEN_COLOR = '#ffffff'; // цвет амдеба

  this.AMBIEN_INTENSITY = 0.79; // интенсивность амдеба

  this.LIGHT_COLOR = '#ffffff';
  this.LIGHT_BIAS = 0.001;
  this.SHADOW_INTENSITY = 0.22;
  this.SHADOW_RADIUS = 1;
  this.SHADOW_WH = 4096;
  this.DISTANCE = 0;
  this.CUB_HEIGHT = 500;
  this.CUB_WIDTH = 500;
  this.FOV = 45;
  this.FAR = 45000;
  this.content = undefined;
  this.graphics = undefined;

  if (_content2d != undefined) {
    this.content = eval('new PIXI.Container()');
    this.graphics = eval('new PIXI.Graphics()');

    _content2d.addChild(this.content);

    this.content.addChild(this.graphics);
    this.graphics.interactive = true;
  }

  this.camera;
  this.scene = new THREE.Scene();
  var color = 0xffffff;
  this.camera = new THREE.PerspectiveCamera(this.FOV, this._width / this._height, 1, this.FAR);

  if (this.devas == true) {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this._width, this._height);
    this.renderer.setClearColor(color, 1);
  } else {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: _alpha
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(this._width, this._height);
    if (_alpha == true) this.renderer.setClearColor(color, 0);else this.renderer.setClearColor(color, 1);
  }

  this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  this.efect;

  if (_efect == true) {
    this.efect = new _MEffectArray.default(this, []);
    this.efect.init();
  }

  this.event3DArr;

  if (_event3DArr == true) {
    this.event3DArr = new _MEvent3DArr.default(this, this.camera, this.renderer.domElement);
    this.scene.event3DArr = this.event3DArr;
    this.event3DArr.addDragEvent(this.graphics);
    this.event3DArr.activ = this._activMouse;
  }

  this.camera.position.set(0, 0, -60);
  this.camera.rotation.set(Math.PI, 0, 0);

  _contentHTML.appendChild(this.renderer.domElement);

  this.renderer.domElement.style.zIndex = -1;
  this.renderer.domElement.style.position = 'fixed';
  this.renderer.domElement.style.top = '0px';
  this.renderer.domElement.style.left = '0px';
  this.group = new THREE.Object3D();
  this.group.rotation.x = Math.PI / 2;
  this.scene.add(this.group);
  this.group1 = new THREE.Object3D();
  this.group.add(this.group1);
  this.group2 = new THREE.Object3D();
  this.group1.add(this.group2);
  this.groupObject = new THREE.Object3D();
  this.group2.add(this.groupObject);
  this.group3d = new THREE.Object3D();
  this.groupObject.add(this.group3d);
  this.gCGG = new THREE.Object3D();
  this.group.add(this.gCGG);
  this.gCAngel = new THREE.Object3D();
  this.gCGG.add(this.gCAngel);
  this.gCam1 = new THREE.Object3D();
  this.gCAngel.add(this.gCam1);
  this.gCam2 = new THREE.Object3D();
  this.gCam1.add(this.gCam2);
  this.ggCam = new THREE.Object3D();
  this.gCam2.add(this.ggCam);
  this.ggCam.add(this.camera);
  this.ggCam.position.z = -this._zume;
  this.camera.position.z = 0;
  this.axesHelper = new THREE.AxesHelper(100);
  this.scene.add(this.axesHelper);
  this.axesHelper.visible = false;
  this.arrPoint = [];
  var disLig = 4000;
  var powerLig = 0.4;
  var dis = 10000;
  this.sunLight;
  this.ambientLight = new THREE.AmbientLight(this.AMBIEN_COLOR, this.AMBIEN_INTENSITY); // 0.8);

  this.scene.add(this.ambientLight);
  this.ambientLight.castShadow = false;

  if (_directional == true) {
    var sunIntensity = this.SHADOW_INTENSITY;
    this.sunLight = new THREE.DirectionalLight(this.LIGHT_COLOR, sunIntensity, 0, 0, 0.2); // this.sunLight.position.set(  4500, this.offsetD, -8000);

    this.sunLight.position.set(0, this.DISTANCE + this.CUB_HEIGHT * 2, 0);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.near = this.CUB_HEIGHT; // 7000

    this.sunLight.shadow.camera.far = this.CUB_HEIGHT + this.CUB_HEIGHT * 2; // 20000

    this.sunLight.shadow.camera.right = this.CUB_WIDTH;
    this.sunLight.shadow.camera.left = -this.CUB_WIDTH;
    this.sunLight.shadow.camera.top = this.CUB_WIDTH;
    this.sunLight.shadow.camera.bottom = -this.CUB_WIDTH;
    this.sunLight.shadow.mapSize.width = this.SHADOW_WH;
    this.sunLight.shadow.mapSize.height = this.SHADOW_WH;
    this.sunLight.shadow.bias = this.LIGHT_BIAS;
    this.sunLight.shadow.radius = this.SHADOW_RADIUS;
  }

  this.initOut = function () {};

  this.position3d = new _MPosition3d.default(self, this.graphics);
  this.utility = new _MUtility.default(self);
  this.arrayDoRender = [];
  this.shadowNeedsUpdate = false;

  this.render = function () {
    if (this.yes3d == false) return;
    this.utility.render();
    this.intRend = 10;

    if (this.shadowNeedsUpdate) {
      this.shadowNeedsUpdate = false;
      this.renderer.shadowMap.needsUpdate = true;
    }

    if (this.efect) {
      if (this.efect.render() == false) this.renderer.render(this.scene, this.camera);
    } else this.renderer.render(this.scene, this.camera);

    if (this.arrayDoRender.length != 0) {
      for (var i = 0; i < this.arrayDoRender.length; i++) {
        this.arrayDoRender[i]();
      }
    }
  };

  this.upDate = function () {
    if (this.alwaysRender || this.intRend == this.intRendOk) {
      this.render();
    }

    if (this.intRend < 10) this.intRend++;
  };

  this.renderer.render(this.scene, this.camera);

  this.sizeWindow = function (_x, _y, _width, _height) {
    if (_x != undefined) this._x = _x;
    if (_y != undefined) this._y = _y;
    if (_height != undefined) this._height = _height;
    if (_width != undefined) this._width = _width;

    if (this.content != undefined) {
      this.content.x = this._x;
      this.content.y = this._y;
      this.graphics.clear();
      this.graphics.beginFill(0xff0000, 0.0);
      this.graphics.drawRect(0, 0, this._width, this._height);
      this.graphics.endFill();
    }

    this.renderer.domElement.style.left = this._x + 'px';
    this.renderer.domElement.style.top = this._y + 'px';
    this.camera.aspect = this._width / this._height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this._width, this._height);
    this.intRend = 1;

    if (this.event3DArr) {
      this.event3DArr.sizeWindow(this._width, this._height);
      this.event3DArr.setRect(this._x, this._y, this._width, this._height);
    }

    if (this.efect) this.efect.sizeWindow(this._width, this._height);
  };

  this.render();
  this.sizeWindow();
  var bbbbbb; // Набрасываем на объекты тени

  this.objShadow = function (obj, bol) {
    if (this.devas.devas == true) {
      bol = false;
      return;
    }

    if (this.devas.webGL == false) {
      bol = false;
      return;
    }

    if (bol == undefined) bol = true;
    bbbbbb = true;

    if (obj.material) {
      if (obj.material.transparent == true && obj.material.opacity < 1) {
        bbbbbb = false;
      }
    }

    if (bbbbbb == true) {
      obj.castShadow = bol;
      obj.receiveShadow = bol;
    }

    if (obj.children != undefined) {
      for (var i = 0; i < obj.children.length; i++) {
        if (obj.children != undefined) {
          this.objShadow(obj.children[i], bol);
        } else {
          bbbbbb = true;

          if (obj.children[i].material) {
            if (obj.material.transparent == true && obj.material.opacity < 1) {
              bbbbbb = false;
            }
          }

          if (bbbbbb == true) {
            obj.children[i].castShadow = bol;
            obj.children[i].receiveShadow = bol;
          }
        }
      }
    }
  };

  this.addEvent = function (str, fun) {
    if (this.event3DArr) this.event3DArr.eventSob.addEvent(str, fun);
  };

  this.removeEvent = function (str, fun) {
    if (this.event3DArr) this.event3DArr.eventSob.removeEvent(str, fun);
  };

  this.addChildMouse = function (child) {
    if (this.event3DArr) this.event3DArr.addChild(child);
  };

  this.removeChildMouse = function (child) {
    if (this.event3DArr) this.event3DArr.removeChild(child);
  };
}

MVisi3D.prototype = {
  set staticShadow(v) {
    this.renderer.shadowMap.autoUpdate = !v;
    this._staticShadow = v;
  },

  get staticShadow() {
    return this._staticShadow;
  },

  set rotationX(v) {
    if (this._rotationX === v) return;
    this._rotationX = v;
    this.intRend = 1;
    this.gCam2.rotation.x = v;
  },

  get rotationX() {
    return this._rotationX;
  },

  set rotationZ(v) {
    if (this._rotationZ === v) return;
    this._rotationZ = v;
    this.gCam1.rotation.z = v;
    this.intRend = 1;
  },

  get rotationZ() {
    return this._rotationZ;
  },

  set zume(v) {
    if (this._zume === v) return;
    this._zume = v;
    this.ggCam.position.z = -v;
    this.camera.position.z = 0;
    this.intRend = 1;
  },

  get zume() {
    return this._zume;
  },

  set yVerh(v) {
    this._yVerh = v;
    this.gCGG.position.z = v;
    this.intRend = 1;
  },

  get yVerh() {
    return this.gCGG.position.z;
  },

  set xVerh(v) {
    this._xVerh = v;
    this.gCGG.position.x = v;
    this.intRend = 1;
  },

  get xVerh() {
    return this.gCGG.position.x;
  },

  set zVerh(v) {
    this._zVerh = v;
    this.gCGG.position.y = v;
    this.intRend = 1;
  },

  get zVerh() {
    return this.gCGG.position.y;
  },

  set arrOut(v) {
    this._arrOut = v;
    this.efect.setValue('outline', null, this._arrOut);
    this.intRend = 1;
  },

  get arrOut() {
    return this._arrOut;
  },

  set x(v) {
    this._x = v;
    this.sizeWindow();
  },

  get x() {
    return this._x;
  },

  set y(v) {
    this._y = v;
    this.sizeWindow();
  },

  get y() {
    return this._y;
  },

  set height(v) {
    this._height = v;
    this.sizeWindow();
  },

  get height() {
    return this._height;
  },

  set width(v) {
    this._width = v;
    this.sizeWindow();
  },

  get width() {
    return this._width;
  },

  set visible(v) {
    this._visible = v;
    this.content.visible = v;
    this.renderer.domElement.style.visibility = v ? 'visible' : 'hidden';
  },

  get visible() {
    return this._visible;
  },

  set isDragPan(v) {
    this._isDragPan = v;
    this.position3d.isDragPan = v;
  },

  get isDragPan() {
    return this._isDragPan;
  },

  set activMouse(v) {
    this._activMouse = v;
    if (this.event3DArr) this.event3DArr.activ = this._activMouse;
  },

  get activMouse() {
    return this._activMouse;
  },

  set minZum(v) {
    this.position3d.minZum = v;
  },

  get minZum() {
    return this.position3d.minZum;
  },

  set maxZum(v) {
    this.position3d.maxZum = v;
  },

  get maxZum() {
    return this.position3d.maxZum;
  },

  set maxRotationX(v) {
    this.position3d.minMaxX.x = v;
  },

  get maxRotationX() {
    return this.position3d.minMaxX.x;
  },

  set minRotationX(v) {
    if (v < this.rotationX) {
      this.rotationX = v;
    }

    this.position3d.minMaxX.y = v;
  },

  get minRotationX() {
    return this.position3d.minMaxX.y;
  }

};
module.exports = exports["default"];

/***/ }),

/***/ "./MVisi3D/src/visi3D/index.js":
/*!*************************************!*\
  !*** ./MVisi3D/src/visi3D/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MVisi3D", {
  enumerable: true,
  get: function get() {
    return _MVisi3D.default;
  }
});
Object.defineProperty(exports, "MEvent3DArr", {
  enumerable: true,
  get: function get() {
    return _MEvent3DArr.default;
  }
});

var _MVisi3D = _interopRequireDefault(__webpack_require__(/*! ./MVisi3D.js */ "./MVisi3D/src/visi3D/MVisi3D.js"));

var _MEvent3DArr = _interopRequireDefault(__webpack_require__(/*! ./MEvent3DArr.js */ "./MVisi3D/src/visi3D/MEvent3DArr.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.MVisi3D = _MVisi3D.default;
global.MEvent3DArr = _MEvent3DArr.default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ })

/******/ });
});