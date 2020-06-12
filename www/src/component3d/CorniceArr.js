function CorniceArr() {
    THREE.Object3D.call(this);
    this.type = 'CorniceArr';
    this.cornice = new Cornice();
    this.cornice1 = new Cornice();
    this.add(this.cornice);
    this.add(this.cornice1);

    this._offsetx = false;
    this._offsetx1 = false;
    this._offsetz = false;
    this._offsetz1 = false;
    this._otstup = 10;// отступ средины
    this.arrOtstup = [10, 10, 10, 10];// верх право низ лево

    this._material = new THREE.MeshPhongMaterial({map: bigBaza.nullTexture});
    this.cornice.material = this._material;
    this.cornice1.material = this._material;

    this._width = 400;


    this.update();

}
CorniceArr.prototype = Object.create(THREE.Object3D.prototype);
CorniceArr.prototype.constructor = CorniceArr;

CorniceArr.prototype.update = function (arrX) {
    // this.cornice.material = this._material;
    // this.cornice1.material = this._material;
    // this.cornice._offsetx = this._offsetx;
    // this.cornice1._offsetx1 = this._offsetx1;
    // this.cornice._offsetz = this._offsetz;
    // this.cornice1._offsetz1 = this._offsetz1;

    if (arrX) {
        this.cornice.width = Math.abs(arrX[1] - arrX[0]);
        this.cornice1.width = Math.abs(arrX[3] - arrX[2]);

        this.cornice.position.x = arrX[0];
        this.cornice1.position.x = arrX[2]-30;
        if (this.cornice1.position.x < 0) this.cornice1.position.x = arrX[2];
        else {
            this.cornice1.width += 30

        }
        if (this.cornice.width) this.cornice.width += 50;
        this.cornice1.arrOtstup[3] = this.cornice1.otstup;
        this.cornice.arrOtstup[1] = this.cornice1.otstup;
    } else {
        this.cornice.width = this._width / 2;
        this.cornice1.width = this._width / 2;
        this.cornice1.position.x = this._width / 2;
    }
    this.cornice.visible = this.cornice.width > 1;
    this.cornice1.visible = this.cornice1.width > 1;
    this.cornice.update();
    this.cornice1.update();
    // this.cornice1.position.z = -20;
};

Object.defineProperties(CorniceArr.prototype, {

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


function CorniceArrTest(cont, x, y, content3d) {
    createjs.Container.call(this);
    cont.addChild(this);
    this.x = x || 0;
    this.y = y || 0;
    var arrMat = [
        bigBaza.getMaterial({material: 'MeshPhongMaterial', color: 0xffffff, link: "resources/images/pic.png"}),
        bigBaza.getMaterial({material: 'MeshPhongMaterial', color: 0xffffff, link: "resources/images/pic.jpg"}),
    ];


    var stairsLine3D = new CorniceArr();

    stairsLine3D.position.z -= 50
    stairsLine3D.add(new THREE.AxisHelper(50));
    content3d.add(stairsLine3D);


    var panel = new Window(this, 0, 0, 'CorniceArrTest');
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

    // arrSlid[10] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'arrOtstup.0', fromName);
    // arrSlid[11] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'arrOtstup.1', fromName);
    // arrSlid[12] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'arrOtstup.2', fromName);
    // arrSlid[13] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'arrOtstup.3', fromName);
    // arrSlid[14] = new HSliderBig(panel.content, x, (25 + 2) * i++, '_line.p.x', fromName);
    // arrSlid[15] = new HSliderBig(panel.content, x, (25 + 2) * i++, '_line.p.y', fromName);
    // arrSlid[16] = new HSliderBig(panel.content, x, (25 + 2) * i++, '_line.p.z', fromName);

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

CorniceArrTest.prototype = Object.create(createjs.Container.prototype);
CorniceArrTest.prototype.constructor = CorniceArrTest;


