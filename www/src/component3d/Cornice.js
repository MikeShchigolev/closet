/**
 * Карниз
 * @constructor
 */

function Cornice() {
    THREE.Object3D.call(this);
    this.type = 'Cornice';
    this._width = 400;
    this._depth = 30;
    this._height = 50;

    this._angelx = false;// угол по х начало
    this._angelx1 = false;
    this._angelz = false;// конец
    this._angelz1 = false;

    this._offsetx = 0;
    this._offsetx1 = 0;
    this._offsetz = 0;
    this._offsetz1 = 0;

    this._otstup = 10;// отступ средины

    this.arrOtstup = [10, 10, 10, 10];// верх право низ лево

    this._line = new LinePosition();// y = 0// линия здвига по z
    this._line1 = new LinePosition();// top z = 0   // линия здвига по x
    this._line2 = new LinePosition();// y = 0// линия здвига по z
    this._line3 = new LinePosition();// top z = 0   // линия здвига по x


  /* this.ll = new Line3D();
    this.ll1 = new Line3D();
    this.ll2 = new Line3D();
    this.ll3 = new Line3D();
    this.add(this.ll);
    this.add(this.ll1);
    this.add(this.ll2);
    this.add(this.ll3);
    this.add(new THREE.AxisHelper(50));*/


    this.visi= new THREE.AxisHelper(100);
    this.visi1 = new THREE.AxisHelper(100);
    this.visi2 = new THREE.AxisHelper(500);
    this.visi3 = new THREE.AxisHelper(500);


    this.vvisi= new THREE.AxisHelper(100);
    this.vvisi1 = new THREE.AxisHelper(100);
    this.vvisi2 = new THREE.AxisHelper(500);
    this.vvisi3 = new THREE.AxisHelper(500);

    // this.add(this.visi);
    // this.add(this.visi1);
    // this.add(this.visi2);
    // this.add(this.visi3);
    // this.add(this.vvisi);
    // this.add(this.vvisi1);
    // this.add(this.vvisi2);
    // this.add(this.vvisi3);

    this.geometry = new GeometryPoint();
    this._material = new THREE.MeshPhongMaterial({map: bigBaza.nullTexture});
    this.mesh = new THREE.Mesh(this.geometry, this._material);
    this.add(this.mesh);

    this.update();
}
Cornice.prototype = Object.create(THREE.Object3D.prototype);
Cornice.prototype.constructor = Cornice;

Cornice.prototype.update = function () {
    this.mesh.material = this._material;
    var arrpoint = this.geometry.arrPoint;// верх
    var arrpoint1 = this.geometry.arrPoint1;// низ
    var arrpoint2 = this.geometry.arrPoint2;// средина

    arrpoint[0].set(this.arrOtstup[3], this.arrOtstup[0], 0);
    arrpoint[1].set(this._width-this.arrOtstup[1], this.arrOtstup[0], 0);
    arrpoint[2].set(this._width-this.arrOtstup[1], this._height-this.arrOtstup[2], 0);
    arrpoint[3].set(this.arrOtstup[3], this._height-this.arrOtstup[2], 0);

    arrpoint1[0].set(this.arrOtstup[3], this.arrOtstup[0], this._depth);
    arrpoint1[1].set(this._width-this.arrOtstup[1], this.arrOtstup[0], this._depth);
    arrpoint1[2].set(this._width-this.arrOtstup[1], this._height-this.arrOtstup[2], this._depth);
    arrpoint1[3].set(this.arrOtstup[3], this._height-this.arrOtstup[2], this._depth);

    arrpoint2[0].set(0 , 0, this._depth / 2);
    arrpoint2[1].set(this._width ,0 , this._depth / 2);
    arrpoint2[2].set(this._width , this._height , this._depth / 2);
    arrpoint2[3].set(0 , this._height , this._depth / 2);
    this._zdvig();
    this.geometry.update();
    

    /*if (this._line)if (this.ll)this.ll.setPoints(this._line.p, this._line.p1);
    if (this._line1)if (this.ll1)this.ll1.setPoints(this._line1.p, this._line1.p1);
    if (this._line2)if (this.ll2)this.ll2.setPoints(this._line2.p, this._line2.p1);
    if (this._line3)if (this.ll3)this.ll3.setPoints(this._line3.p, this._line3.p1);*/

};
Cornice.prototype.setPos = function (_x,_y,_z,_x1,_z1) {// построение линий углов
    this.visi.position.set(0, 0, _z);
    this.vvisi.position.set(0, this.height, _z);
    this.visi2.position.set(_x1, 0,_z1);
    this.vvisi2.position.set(_x1, this.height,_z1);

    this.visi1.position.set(0, 0, _z+this.depth);
    this.vvisi1.position.set(0, this.height, _z+this.depth);
    this.visi3.position.set(_x1, 0,_z1+this.depth);
    this.vvisi3.position.set(_x1, this.height,_z1+this.depth);

    var arrpoint = this.geometry.arrPoint;// верх
    var arrpoint1 = this.geometry.arrPoint1;// низ
    var arrpoint2 = this.geometry.arrPoint2;// средина
    // this.geometry.arrPoint1=this.geometry.arrPoint

    arrpoint[3].set(this.visi.position.x, this.visi.position.y, this.visi.position.z);
    arrpoint[2].set(this.vvisi.position.x, this.vvisi.position.y, this.vvisi.position.z);
    arrpoint[1].set(this.vvisi2.position.x, this.vvisi2.position.y, this.vvisi2.position.z);
    arrpoint[0].set(this.visi2.position.x, this.visi2.position.y, this.visi2.position.z);


    arrpoint2[3].set(this.visi1.position.x, this.visi1.position.y, this.visi1.position.z);
    arrpoint2[2].set(this.vvisi1.position.x, this.vvisi1.position.y, this.vvisi1.position.z);
    arrpoint2[1].set(this.vvisi3.position.x, this.vvisi3.position.y, this.vvisi3.position.z);
    arrpoint2[0].set(this.visi3.position.x, this.visi3.position.y, this.visi3.position.z);

    arrpoint1[3].set(this.visi1.position.x, this.visi1.position.y, this.visi1.position.z);
    arrpoint1[2].set(this.vvisi1.position.x, this.vvisi1.position.y, this.vvisi1.position.z);
    arrpoint1[1].set(this.vvisi3.position.x, this.vvisi3.position.y, this.vvisi3.position.z);
    arrpoint1[0].set(this.visi3.position.x, this.visi3.position.y, this.visi3.position.z);

    this.geometry.update();

    this.position.set(0,_y,0)
};



Cornice.prototype._corectAngel = function () {// построение линий углов

    

    this._line.p.set(0, 0, 0);
    this._line.p1.set(0, 0, 0);
    this._line1.p.set(0, 0, 0);
    this._line1.p1.set(0, 0, 0);
    this._line2.p.set(0, 0, 0);
    this._line2.p1.set(0, 0, 0);
    this._line3.p.set(0, 0, 0);
    this._line3.p1.set(0, 0, 0);
    var p;
    if (this._angelx !== false) {// коректирова по х начало
        p = calc.getVector(this._offsetx || this._width, 90 * calc.DEG2RAD + this._angelx);
        if (this._angelx <= 0) {
            this._line1.p.set(0, 0, 0);
            this._line1.p1.set(p.x, this._offsetx || this._height, 0);
        } else {
            this._line1.p.set(-p.x, -this._offsetx || 0, 0);
            this._line1.p1.set(0, this._height, 0);
        }
    }
    if (this._angelx1 !== false) {// коректирова по х конец
        p = calc.getVector(this._offsetx1 || this._width, 90 * calc.DEG2RAD + this._angelx1);
        if (this._angelx1 <= 0) {
            this._line3.p.set(this._width, 0, 0);
            this._line3.p1.set(this._width - p.x, this._offsetx1 || this._height, 0);
        } else {
            this._line3.p.set(this._width + p.x, -this._offsetx1 || 0, 0);
            this._line3.p1.set(this._width, this._height, 0);
        }
    }
    if (this._angelz !== false) {// коректирова по z начало
        p = calc.getVector(this._offsetz || this._width, 90 * calc.DEG2RAD + this._angelz);
        if (this._angelz <= 0) {
            this._line.p.set(0, 0, 0);
            this._line.p1.set(p.x, 0, this._offsetz || this._depth);
        } else {
            this._line.p.set(-p.x, 0, -this._offsetz || 0);
            this._line.p1.set(0, 0, this._depth);
        }
    }
    if (this._angelz1 !== false) {// коректирова по z конец
        p = calc.getVector(this._offsetz1 || this._width, 90 * calc.DEG2RAD + this._angelz1);
        if (this._angelz1 <= 0) {
            this._line2.p.set(this._width, 0, 0);
            this._line2.p1.set(this._width - p.x, 0, this._offsetz1 || this._depth);
        } else {
            this._line2.p.set(this._width + p.x, 0, -this._offsetz1 || 0);
            this._line2.p1.set(this._width, 0, this._depth);
        }
    }
};


Cornice.prototype._zdvig = function () {
    this._corectAngel();
    if (this._line && this._angelz !== false)this._zdvigZ(true, this._line);
    if (this._line1 && this._angelx !== false)this._zdvigX(true, this._line1);
    if (this._line2 && this._angelz1 !== false)this._zdvigZ(false, this._line2);
    if (this._line3 && this._angelx1 !== false)this._zdvigX(false, this._line3);
};

Cornice.prototype._zdvigZ = function (b, line) {
    var point;
    var arrpoint = this.geometry.arrPoint;// верх
    var arrpoint1 = this.geometry.arrPoint1;// низ
    var arrpoint2 = this.geometry.arrPoint2;// средина
    var p = new Position(), p1 = new Position(), p2 = new Position(), p3 = new Position();
    p.set(arrpoint[0].x, arrpoint[0].z);
    p1.set(arrpoint[1].x, arrpoint[1].z);
    p2.set(line.p.x, line.p.z);
    p3.set(line.p1.x, line.p1.z);
    point = calc.getPointOfIntersection(p, p1, p2, p3);
    if (point) {
        if (b) {
            if (point.x > arrpoint[0].x)arrpoint[0].x = point.x;
            // if (point.y > arrpoint[0].z)arrpoint[0].z = point.y;
        } else {
            if (point.x < arrpoint[1].x)arrpoint[1].x = point.x;
            // if (point.y < arrpoint[1].z)arrpoint[1].z = point.y;
        }
    }
    p.set(arrpoint1[0].x, arrpoint1[0].z);
    p1.set(arrpoint1[1].x, arrpoint1[1].z);
    point = calc.getPointOfIntersection(p, p1, p2, p3);
    if (point) {
        if (b) {
            if (point.x > arrpoint1[0].x)arrpoint1[0].x = point.x;
            // if (point.y > arrpoint1[0].z)arrpoint1[0].z = point.y;
        } else {
            if (point.x < arrpoint1[1].x)arrpoint1[1].x = point.x;
            // if (point.y < arrpoint1[1].z)arrpoint1[1].z = point.y;
        }
    }
    p.set(arrpoint2[0].x, arrpoint2[0].z);
    p1.set(arrpoint2[1].x, arrpoint2[1].z);
    point = calc.getPointOfIntersection(p, p1, p2, p3);
    if (point) {
        if (b) {
            if (point.x > arrpoint2[0].x)arrpoint2[0].x = point.x;
            // if (point.y > arrpoint2[0].z)arrpoint2[0].z = point.y;
        } else {
            if (point.x < arrpoint2[1].x)arrpoint2[1].x = point.x;
            // if (point.y < arrpoint2[1].z)arrpoint2[1].z = point.y;
        }
    }
    p.set(arrpoint[3].x, arrpoint[3].z);
    p1.set(arrpoint[2].x, arrpoint[2].z);
    point = calc.getPointOfIntersection(p, p1, p2, p3);
    if (point) {
        if (b) {
            if (point.x > arrpoint[3].x)arrpoint[3].x = point.x;
            // if (point.y > arrpoint[3].z)arrpoint[3].z = point.y;
        } else {
            if (point.x < arrpoint[2].x)arrpoint[2].x = point.x;
            // if (point.y < arrpoint[2].z)arrpoint[2].z = point.y;
        }
    }
    p.set(arrpoint1[3].x, arrpoint1[3].z);
    p1.set(arrpoint1[2].x, arrpoint1[2].z);
    point = calc.getPointOfIntersection(p, p1, p2, p3);
    if (point) {
        if (b) {
            if (point.x > arrpoint1[3].x)arrpoint1[3].x = point.x;
            // if (point.y > arrpoint1[3].z)arrpoint1[3].z = point.y;
        } else {
            if (point.x < arrpoint1[2].x)arrpoint1[2].x = point.x;
            // if (point.y < arrpoint1[2].z)arrpoint1[2].z = point.y;
        }
    }
    p.set(arrpoint2[3].x, arrpoint2[3].z);
    p1.set(arrpoint2[2].x, arrpoint2[2].z);
    point = calc.getPointOfIntersection(p, p1, p2, p3);
    if (point) {
        if (b) {
            if (point.x > arrpoint2[3].x)arrpoint2[3].x = point.x;
            // if (point.y > arrpoint2[3].z)arrpoint2[3].z = point.y;
        } else {
            if (point.x < arrpoint2[2].x)arrpoint2[2].x = point.x;
            // if (point.y < arrpoint2[2].z)arrpoint2[2].z = point.y;
        }
    }
};
Cornice.prototype._zdvigX = function (b, line) {
    var point;
    var arrpoint = this.geometry.arrPoint;// верх
    var arrpoint1 = this.geometry.arrPoint1;// низ
    var arrpoint2 = this.geometry.arrPoint2;// средина
    var p = new Position(), p1 = new Position(), p2 = new Position(), p3 = new Position();
    p.set(arrpoint[0].x, arrpoint[0].y);
    p1.set(arrpoint[1].x, arrpoint[1].y);
    p2.set(line.p.x, line.p.y);
    p3.set(line.p1.x, line.p1.y);
    point = calc.getPointOfIntersection(p, p1, p2, p3);
    if (point) {
        if (b) {
            if (point.x > arrpoint[0].x)arrpoint[0].x = point.x;
            // if (point.y > arrpoint[0].y)arrpoint[0].y = point.y;
        } else {
            if (point.x < arrpoint[1].x)arrpoint[1].x = point.x;
            // if (point.y < arrpoint[1].y)arrpoint[1].y = point.y;
        }
    }
    p.set(arrpoint1[0].x, arrpoint1[0].y);
    p1.set(arrpoint1[1].x, arrpoint1[1].y);
    point = calc.getPointOfIntersection(p, p1, p2, p3);
    if (point) {
        if (b) {
            if (point.x > arrpoint1[0].x)arrpoint1[0].x = point.x;
            // if (point.y > arrpoint1[0].y)arrpoint1[0].y = point.y;
        } else {
            if (point.x < arrpoint1[1].x)arrpoint1[1].x = point.x;
            // if (point.y < arrpoint1[1].y)arrpoint1[1].y = point.y;
        }
    }
    p.set(arrpoint2[0].x, arrpoint2[0].y);
    p1.set(arrpoint2[1].x, arrpoint2[1].y);
    point = calc.getPointOfIntersection(p, p1, p2, p3);
    if (point) {
        if (b) {
            if (point.x > arrpoint2[0].x)arrpoint2[0].x = point.x;
            // if (point.y > arrpoint2[0].y)arrpoint2[0].y = point.y;
        } else {
            if (point.x < arrpoint2[1].x)arrpoint2[1].x = point.x;
            // if (point.y < arrpoint2[1].y)arrpoint2[1].y = point.y;
        }
    }
    p.set(arrpoint[3].x, arrpoint[3].y);
    p1.set(arrpoint[2].x, arrpoint[2].y);
    point = calc.getPointOfIntersection(p, p1, p2, p3);
    if (point) {
        if (b) {
            if (point.x > arrpoint[3].x)arrpoint[3].x = point.x;
            // if (point.y > arrpoint[3].y)arrpoint[3].y = point.y;
        } else {
            if (point.x < arrpoint[2].x)arrpoint[2].x = point.x;
            // if (point.y < arrpoint[2].y)arrpoint[2].y = point.y;
        }
    }
    p.set(arrpoint1[3].x, arrpoint1[3].y);
    p1.set(arrpoint1[2].x, arrpoint1[2].y);
    point = calc.getPointOfIntersection(p, p1, p2, p3);
    if (point) {
        if (b) {
            if (point.x > arrpoint1[3].x)arrpoint1[3].x = point.x;
            // if (point.y > arrpoint1[3].y)arrpoint1[3].y = point.y;
        } else {
            if (point.x < arrpoint1[2].x)arrpoint1[2].x = point.x;
            // if (point.y < arrpoint1[2].y)arrpoint1[2].y = point.y;
        }
    }
    p.set(arrpoint2[3].x, arrpoint2[3].y);
    p1.set(arrpoint2[2].x, arrpoint2[2].y);
    point = calc.getPointOfIntersection(p, p1, p2, p3);
    if (point) {
        if (b) {
            if (point.x > arrpoint2[3].x)arrpoint2[3].x = point.x;
            // if (point.y > arrpoint2[3].y)arrpoint2[3].y = point.y;
        } else {
            if (point.x < arrpoint2[2].x)arrpoint2[2].x = point.x;
            // if (point.y < arrpoint2[2].y)arrpoint2[2].y = point.y;
        }
    }
};

Object.defineProperties(Cornice.prototype, {

    colorStatic: {
        set: function (value) {
            if (this._colorStatic == value) return;
            this._colorStatic = value;
            this.material.color = new THREE.Color(this._colorStatic);
        },
        get: function () {
            return this._colorStatic;
        }
    },
    textureLinkStatic: {
        set: function (value) {
            if (this._textureLinkStatic != value) {
                this._textureLinkStatic = value;
                this.material.map = bigBaza.getTexture(this._textureLinkStatic);
            }
        },
        get: function () {
            return this._textureLinkStatic;
        }
    },
    width: {
        set: function (value) {
            this._width = value;
            this.update();
        },
        get: function () {
            return this._width;
        }
    },
    depth: {
        set: function (value) {
            this._depth = value;
            this.update();
        },
        get: function () {
            return this._depth;
        }
    },
    height: {
        set: function (value) {
            this._height = value;
            this.update();
        },
        get: function () {
            return this._height;
        }
    },
    otstup: {
        set: function (value) {
            this._otstup = value;
            for (var i = 0; i < this.arrOtstup.length; i++) {
                this.arrOtstup[i] = this._otstup;
            }
            this.update();
        },
        get: function () {
            return this._otstup;
        }
    },
    material: {
        set: function (value) {
            this._material = value;
            this.update();
        },
        get: function () {
            return this._material;
        }
    },
    angelx: {
        set: function (value) {
            this._angelx = value;
            this.update();
        },
        get: function () {
            return this._angelx;
        }
    },
    angelx1: {
        set: function (value) {
            this._angelx1 = value;
            this.update();
        },
        get: function () {
            return this._angelx1;
        }
    },
    angelz: {
        set: function (value) {
            this._angelz = value;
            this.update();
        },
        get: function () {
            return this._angelz;
        }
    },
    angelz1: {
        set: function (value) {
            this._angelz1 = value;
            this.update();
        },
        get: function () {
            return this._angelz1;
        }
    },
    offsetx: {
        set: function (value) {
            this._offsetx = value;
            this.update();
        },
        get: function () {
            return this._offsetx;
        }
    },
    offsetx1: {
        set: function (value) {
            this._offsetx1 = value;
            this.update();
        },
        get: function () {
            return this._offsetx1;
        }
    },
    offsetz: {
        set: function (value) {
            this._offsetz = value;
            this.update();
        },
        get: function () {
            return this._offsetx;
        }
    },
    offsetz1: {
        set: function (value) {
            this._offsetz1 = value;
            this.update();
        },
        get: function () {
            return this._offsetz1;
        }
    },

});


function CorniceTest(cont, x, y, content3d) {
    createjs.Container.call(this);
    cont.addChild(this);
    this.x = x || 0;
    this.y = y || 0;
    var arrMat = [
        bigBaza.getMaterial({material: 'MeshPhongMaterial', color: 0xffffff, link: "resources/images/pic.png"}),
        bigBaza.getMaterial({material: 'MeshPhongMaterial', color: 0xffffff, link: "resources/images/pic.jpg"}),
    ];


    var stairsLine3D = new Cornice();

    stairsLine3D.position.z -= 50
    stairsLine3D.add(new THREE.AxisHelper(50));
    content3d.add(stairsLine3D);


    var panel = new Window(this, 0, 0, 'CorniceTest');
    panel.hasMinimizeButton = true;
    // panel.minimize = true;
    panel.width = 120;
    var arrSlid = [];
    var i = 1;
    var x = 5;

    arrSlid[0] = new HSliderBig(panel.content, x, 2, 'width', fromName);
    arrSlid[1] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'height', fromName);
    arrSlid[2] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'depth', fromName);
    arrSlid[3] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'otstup', fromName);

    arrSlid[4] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'position.x', fromName);
    arrSlid[5] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'position.y', fromName);
    arrSlid[6] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'position.z', fromName);

    arrSlid[7] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'rotation.x', fromName);
    arrSlid[8] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'rotation.y', fromName);
    arrSlid[9] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'rotation.z', fromName);
    arrSlid[7].max = arrSlid[8].max = arrSlid[9].max = Math.PI;

    arrSlid[4].min = arrSlid[5].min = arrSlid[6].min = -300;
    arrSlid[4].max = arrSlid[5].max = arrSlid[6].max = 300;

    arrSlid[10] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'arrOtstup.0', fromName);
    arrSlid[11] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'arrOtstup.1', fromName);
    arrSlid[12] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'arrOtstup.2', fromName);
    arrSlid[13] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'arrOtstup.3', fromName);
    arrSlid[14] = new HSliderBig(panel.content, x, (25 + 2) * i++, '_line.p.x', fromName);
    arrSlid[15] = new HSliderBig(panel.content, x, (25 + 2) * i++, '_line.p.y', fromName);
    arrSlid[16] = new HSliderBig(panel.content, x, (25 + 2) * i++, '_line.p.z', fromName);
    arrSlid[16] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'offsetz', fromName);
    arrSlid[16] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'offsetz1', fromName);
    arrSlid[16] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'offsetx', fromName);
    arrSlid[16] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'offsetx1', fromName);
    arrSlid[17] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'angelx', fromName);
    arrSlid[17].min = -45 * calc.DEG2RAD;
    arrSlid[17].max = 45 * calc.DEG2RAD;
    arrSlid[17] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'angelx1', fromName);
    arrSlid[17].min = -45 * calc.DEG2RAD;
    arrSlid[17].max = 45 * calc.DEG2RAD;
    arrSlid[17] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'angelz', fromName);
    arrSlid[17].min = -45 * calc.DEG2RAD;
    arrSlid[17].max = 45 * calc.DEG2RAD;
    arrSlid[17] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'angelz1', fromName);
    arrSlid[17].min = -45 * calc.DEG2RAD;
    arrSlid[17].max = 45 * calc.DEG2RAD;

    var indexMaterial = 0;
    var changeMaretialBtn = new PushButton(panel.content, x, (25 + 2) * i++, 'changeMaretial', function () {
        stairsLine3D.material = arrMat[++indexMaterial % arrMat.length];
        visi3D.intRend = 1;
    });


    function fromName() {
        var arrName = this._title.split('.');
        // trace(arrName)
        // StairsLine3D[this._title] = this.value;
        var comand = 'stairsLine3D';
        for (var i = 0; i < arrName.length; i++) {
            comand += "['" + arrName[i] + "']";
        }
        comand += ('=' + this.value);
        // trace(comand)
        eval(comand);
        stairsLine3D.update()
        visi3D.intRend = 1;
    }


    panel.height = (25 + 2) * i++;

}

CorniceTest.prototype = Object.create(createjs.Container.prototype);
CorniceTest.prototype.constructor = CorniceTest;



