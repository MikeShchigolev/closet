function GeometryPoint() {
    THREE.BufferGeometry.call(this);
    this.type = 'GeometryPoint';
    var self = this;
    var arrIndex;
    var arrUv = [];             // ув
    var arrNormal;              // нормали
    var arrPosition = [];       // позиции точек
    var arrUvAttribut;          // ув            атрибут буфера
    var arrNormalAttribut;      // нормали       атрибут буфера
    var arrPositionAttribut;    // позиции точек атрибут буфера
    // позиции
    var vectPos0 = new THREE.Vector3();
    var vectPos1 = new THREE.Vector3();
    var vectPos2 = new THREE.Vector3();
    var vectPos3 = new THREE.Vector3();
    // ув
    var vectUv0 = new THREE.Vector2();
    var vectUv1 = new THREE.Vector2();
    var vectUv2 = new THREE.Vector2();
    var vectUv3 = new THREE.Vector2();
    var sah = 0;          // шаг прямоугольника
    var shahPoint = 6 * 3;// шаг для позиции
    var shahUv = 6 * 2;   // шаг для ув

    this.arrPoint = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(100, 0, 0),
        new THREE.Vector3(100, 100, 0),
        new THREE.Vector3(0, 100, 0)
    ];// верх
    this.arrPoint1 = [
        new THREE.Vector3(0, 0, 30),
        new THREE.Vector3(100, 0, 30),
        new THREE.Vector3(100, 100, 30),
        new THREE.Vector3(0, 100, 30)
    ];// низ
    this.arrPoint2 = [
        new THREE.Vector3(-10, -10, 15),
        new THREE.Vector3(110, -10, 15),
        new THREE.Vector3(110, 110, 15),
        new THREE.Vector3(-10, 110, 15)
    ];// средина

    function raschet() {
        arrPosition.length = 0;
        arrUv.length = 0;
        sah = 0;

        var arrpoint = self.arrPoint;
        var arrpoint1 = self.arrPoint1;
        var arrpoint2 = self.arrPoint2;

        addRect(arrpoint);// up
        addRect(arrpoint1, true);// down

        addRect([arrpoint2[0], arrpoint2[1], arrpoint[1], arrpoint[0]]);// top 2
        addRect([arrpoint1[0], arrpoint1[1], arrpoint2[1], arrpoint2[0]]);// top 2
        addRect([arrpoint[2], arrpoint[3], arrpoint2[3], arrpoint2[2]], true);// bot 2
        addRect([arrpoint2[2], arrpoint2[3], arrpoint1[3], arrpoint1[2]], true);// bot 2
        addRect([arrpoint[0], arrpoint[3], arrpoint2[3], arrpoint2[0]]);// left 2
        addRect([arrpoint2[0], arrpoint2[3], arrpoint1[3], arrpoint1[0]]);// left 2
        addRect([arrpoint[1], arrpoint[2], arrpoint2[2], arrpoint2[1]], true);// right 2
        addRect([arrpoint2[1], arrpoint2[2], arrpoint1[2], arrpoint1[1]], true);// right 2
    }

    function addRect(arrpoint3d, side) {
        vectPos0.set(arrpoint3d[0].x, arrpoint3d[0].y, arrpoint3d[0].z);
        vectPos1.set(arrpoint3d[1].x, arrpoint3d[1].y, arrpoint3d[1].z);
        vectPos2.set(arrpoint3d[2].x, arrpoint3d[2].y, arrpoint3d[2].z);
        vectPos3.set(arrpoint3d[3].x, arrpoint3d[3].y, arrpoint3d[3].z);
        vectUv0.set(0, 0);
        vectUv1.set(1, 0);
        vectUv2.set(1, 1);
        vectUv3.set(0, 1);
        plusRect(side);
    }

    // isFront - сторона лицевая или задняя
    function plusRect(isFront) {
        if (isFront) {
            arrPosition[sah * shahPoint + 0] = vectPos0.x;
            arrPosition[sah * shahPoint + 1] = vectPos0.y;
            arrPosition[sah * shahPoint + 2] = vectPos0.z;
            arrPosition[sah * shahPoint + 3] = vectPos1.x;
            arrPosition[sah * shahPoint + 4] = vectPos1.y;
            arrPosition[sah * shahPoint + 5] = vectPos1.z;
            arrPosition[sah * shahPoint + 6] = vectPos2.x;
            arrPosition[sah * shahPoint + 7] = vectPos2.y;
            arrPosition[sah * shahPoint + 8] = vectPos2.z;
            // второй треугольник
            arrPosition[sah * shahPoint + 9] = vectPos0.x;
            arrPosition[sah * shahPoint + 10] = vectPos0.y;
            arrPosition[sah * shahPoint + 11] = vectPos0.z;
            arrPosition[sah * shahPoint + 12] = vectPos2.x;
            arrPosition[sah * shahPoint + 13] = vectPos2.y;
            arrPosition[sah * shahPoint + 14] = vectPos2.z;
            arrPosition[sah * shahPoint + 15] = vectPos3.x;
            arrPosition[sah * shahPoint + 16] = vectPos3.y;
            arrPosition[sah * shahPoint + 17] = vectPos3.z;
            //uv
            arrUv[sah * shahUv + 0] = vectUv0.x;
            arrUv[sah * shahUv + 1] = vectUv0.y;
            arrUv[sah * shahUv + 2] = vectUv1.x;
            arrUv[sah * shahUv + 3] = vectUv1.y;
            arrUv[sah * shahUv + 4] = vectUv2.x;
            arrUv[sah * shahUv + 5] = vectUv2.y;
            //-----
            arrUv[sah * shahUv + 6] = vectUv0.x;
            arrUv[sah * shahUv + 7] = vectUv0.y;
            arrUv[sah * shahUv + 8] = vectUv2.x;
            arrUv[sah * shahUv + 9] = vectUv2.y;
            arrUv[sah * shahUv + 10] = vectUv3.x;
            arrUv[sah * shahUv + 11] = vectUv3.y

        } else {
            arrPosition[sah * shahPoint + 0] = vectPos0.x;
            arrPosition[sah * shahPoint + 1] = vectPos0.y;
            arrPosition[sah * shahPoint + 2] = vectPos0.z;
            arrPosition[sah * shahPoint + 3] = vectPos2.x;
            arrPosition[sah * shahPoint + 4] = vectPos2.y;
            arrPosition[sah * shahPoint + 5] = vectPos2.z;
            arrPosition[sah * shahPoint + 6] = vectPos1.x;
            arrPosition[sah * shahPoint + 7] = vectPos1.y;
            arrPosition[sah * shahPoint + 8] = vectPos1.z;
            // второй треугольник
            arrPosition[sah * shahPoint + 9] = vectPos0.x;
            arrPosition[sah * shahPoint + 10] = vectPos0.y;
            arrPosition[sah * shahPoint + 11] = vectPos0.z;
            arrPosition[sah * shahPoint + 12] = vectPos3.x;
            arrPosition[sah * shahPoint + 13] = vectPos3.y;
            arrPosition[sah * shahPoint + 14] = vectPos3.z;
            arrPosition[sah * shahPoint + 15] = vectPos2.x;
            arrPosition[sah * shahPoint + 16] = vectPos2.y;
            arrPosition[sah * shahPoint + 17] = vectPos2.z;
            //uv
            arrUv[sah * shahUv + 0] = vectUv0.x;
            arrUv[sah * shahUv + 1] = vectUv0.y;
            arrUv[sah * shahUv + 2] = vectUv2.x;
            arrUv[sah * shahUv + 3] = vectUv2.y;
            arrUv[sah * shahUv + 4] = vectUv1.x;
            arrUv[sah * shahUv + 5] = vectUv1.y;
            //-----
            arrUv[sah * shahUv + 6] = vectUv0.x;
            arrUv[sah * shahUv + 7] = vectUv0.y;
            arrUv[sah * shahUv + 8] = vectUv3.x;
            arrUv[sah * shahUv + 9] = vectUv3.y;
            arrUv[sah * shahUv + 10] = vectUv2.x;
            arrUv[sah * shahUv + 11] = vectUv2.y
        }
        sah++;
    }

    this.update = function () {
        raschet();
        if (!arrPositionAttribut || arrPositionAttribut.length < arrPosition.length * 3) {
            arrPositionAttribut = new Float32Array(arrPosition.length * 3);
            this.addAttribute('position', new THREE.BufferAttribute(arrPositionAttribut, 3));

            arrUvAttribut = new Float32Array(arrPosition.length * 2);
            this.addAttribute('uv', new THREE.BufferAttribute(arrUvAttribut, 2));

            // arrIndex = new Uint16Array(arrPosition.length);
            //  this.addAttribute( 'indexs', new THREE.BufferAttribute( arrIndex, 1 ) );

            arrNormal = new Float32Array(arrPosition.length * 3);
            this.addAttribute('normal', new THREE.BufferAttribute(arrNormal, 3));

        }
        for (var i = 0; i < arrPositionAttribut.length; i++) {
            arrPositionAttribut[i] = 0;
        }
        for (var i = 0; i < arrPosition.length; i++) {
            arrPositionAttribut[i] = arrPosition[i]||0;// = arrPosition[i];
        }
        for (var i = 0; i < arrUv.length; i++) {
            arrUvAttribut[i] = arrUv[i];
        }

        this.attributes.position.needsUpdate = true;
        this.attributes.uv.needsUpdate = true;
        this.computeVertexNormals();
        this.attributes.normal.needsUpdate = true;
        this.computeBoundingBox();
        this.computeBoundingSphere();
    };

    this.update();

}
GeometryPoint.prototype = Object.create(THREE.BufferGeometry.prototype);
GeometryPoint.prototype.constructor = GeometryPoint;

Object.defineProperties(GeometryPoint.prototype, {});

function GeometryPointTest(cont, x, y, content3d) {
    createjs.Container.call(this);
    cont.addChild(this);
    this.x = x || 0;
    this.y = y || 0;
    var arrMat = [
        bigBaza.getMaterial({material: 'MeshPhongMaterial', color: 0xffffff, link: "resources/images/pic.png"}),
        bigBaza.getMaterial({material: 'MeshPhongMaterial', color: 0xffffff, link: "resources/images/pic.jpg"}),
    ];


    var stairsLine3D = new THREE.Mesh(new GeometryPoint());

    stairsLine3D.position.z -= 50
    stairsLine3D.add(new THREE.AxisHelper(50));
    content3d.add(stairsLine3D);


    var panel = new Window(this, 0, 0, 'GeometryPointTest');
    panel.hasMinimizeButton = true;
    // panel.minimize = true;
    panel.width = 120;
    var arrSlid = [];
    var i = 1;
    var x = 5;

    arrSlid[0] = new HSliderBig(panel.content, x, 2, 'geometry.stepAngel', fromName);
    arrSlid[1] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'geometry.radius1', fromName);
    arrSlid[2] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'geometry.depth', fromName);
    arrSlid[3] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'geometry.radius', fromName);


    arrSlid[4] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'position.x', fromName);
    arrSlid[5] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'position.y', fromName);
    arrSlid[6] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'position.z', fromName);

    arrSlid[7] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'rotation.x', fromName);
    arrSlid[8] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'rotation.y', fromName);
    arrSlid[9] = new HSliderBig(panel.content, x, (25 + 2) * i++, 'rotation.z', fromName);
    arrSlid[7].max = arrSlid[8].max = arrSlid[9].max = Math.PI;

    arrSlid[4].min = arrSlid[5].min = arrSlid[6].min = -300;
    arrSlid[4].max = arrSlid[5].max = arrSlid[6].max = 300;


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
        visi3D.intRend = 1;
    }


    panel.height = (25 + 2) * i++;

}

GeometryPointTest.prototype = Object.create(createjs.Container.prototype);
GeometryPointTest.prototype.constructor = GeometryPointTest;
