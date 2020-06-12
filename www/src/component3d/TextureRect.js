 
function TextureRect(scene) {

    var self=this;

    this._width = 10;
    this._height= 10;
    this._depth = 0;

    this.arrRect=[{x:10, y:10, width:10, height:10}];
    this.rect ={x:0, y:0, width:100, height:100}
    this.kolStartPoint=0;

 

    var geometry = new GeometrySten();
    // geometry.arrBox = [{x:0, y:0, width:300, height:300}]
    // geometry.textureWidth=25
    // geometry.textureHeight=25
    // geometry.rect={x:100, y:100, width:300, height:300}
    setInterval(function() {
        // geometry.isInside = !geometry.isInside; 
        // scene.remove(edges)
        // edges = new THREE.WireframeHelper( mesh, 0x00ffff );
        // scene.add( edges );
    }, 3000)

    
    var texture = THREE.ImageUtils.loadTexture('resources/material/b11.png');
    // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 1, 1 );
    // new THREE.MeshNormalMaterial();
    var mat = new THREE.MeshBasicMaterial( { map: texture  /*,side : THREE.DoubleSide*/} );//new THREE.MeshNormalMaterial({side : THREE.DoubleSide});//
    var mesh = new THREE.Mesh( geometry, mat); 

    scene.add( mesh ); /**/
    var edges = new THREE.WireframeHelper( mesh, 0x00ffff );
    scene.add( edges );


    var size = geometry.rect.width*2;
    var step = geometry.textureWidth;
    var gridHelper = new THREE.GridHelper( size, step );
    scene.add( gridHelper );
    gridHelper.rotation.x=1.5708
    gridHelper.position.z=5

 
 
    var step = 1;
    new PushButton(mainAdmin.stage, 700,0, '_isInside', function() {
        geometry.isInside=!geometry.isInside;
    });
 

    new   HSliderBig(mainAdmin.stage,  300, 40, " width ", function() {
        geometry.arrBox[0].width=this.value;
        geometry.update();
    }, 1, 500)
    new   HSliderBig(mainAdmin.stage,  300, 60, " height ", function() {
        geometry.arrBox[0].height=this.value;
        geometry.update();
    }, 1, 500)
    new   HSliderBig(mainAdmin.stage,  300, 0, " x ", function() {
        geometry.arrBox[0].x=this.value;
        geometry.update();
    }, -100, 500)
    new   HSliderBig(mainAdmin.stage,  300, 20, " y ", function() {
        geometry.arrBox[0].y=this.value;
        geometry.update();
    }, -100, 500)
    //---

    new   HSliderBig(mainAdmin.stage,  500, 40, " width ", function() {
        geometry.rect.width=this.value;
        geometry.update();
    }, 1, 500)
    new   HSliderBig(mainAdmin.stage,  500, 60, " height ", function() {
        geometry.rect.height=this.value;
        geometry.update();
    }, 1, 500)
    new   HSliderBig(mainAdmin.stage,  500, 0, " x ", function() {
        geometry.rect.x=this.value;
        geometry.update();
    }, -100, 500)
    new   HSliderBig(mainAdmin.stage,  500, 20, " y ", function() {
        geometry.rect.y=this.value;
        geometry.update();
    }, -100, 500)
    new   HSliderBig(mainAdmin.stage,  500, 80, " _depth ", function() {
        geometry.depth=this.value;
    }, -100, 500)
    new   HSliderBig(mainAdmin.stage,  500, 100, " textureWidth ", function() {
        geometry.textureWidth=Math.floor(this.value);
        scene.remove(edges)
        edges= new THREE.WireframeHelper( mesh, 0x00ffff );
        scene.add( edges );
    }, -100, 500)
    new   HSliderBig(mainAdmin.stage,  500, 120, " textureHeight ", function() {
        geometry.textureHeight=Math.floor(this.value);
        scene.remove(edges)
        edges= new THREE.WireframeHelper( mesh, 0x00ffff );
        scene.add( edges );
    }, -100, 500)
}
  

GeometrySten = function() {
    THREE.BufferGeometry.call( this );
    this.type = 'GeometrySten';

    // большая коробка / максимальные размеры для отображения
    this._rect = {x:0, y:0, width:300, height:300};
    this._arrBox = [ {x:50, y:50, width:20, height:20},{x:100, y:100, width:100, height:100}];

    this._textureWidth = 300;   // ширина текстуры / сегмента
    this._textureHeight = 146;  // высота текстуры / сегмента
    this._depth = 100;            // глубина боксов
    this._z=0;
 
    this._isInside = false;      // true - врутри боксы/ false - снаружи, исключить боксы

    var arrIndex
    var arrUv=[];               // ув
    var arrNormal;              // нормали
    var arrPosition=[];         // позиции точек

    var arrUvAttribut;          // ув            атрибут буфера
    var arrNormalAttribut;      // нормали       атрибут буфера 
    var arrPositionAttribut     // позиции точек атрибут буфера

    var setkaX=[];              // значения по х
    var setkaY=[];              // значения по у
    var offX=0;                 // индекс для setkaX
    var offY=0;                 // индекс для setkaY

    var arrXY = [];             // возможные ректы/позиции
    var findXY=0;               // индекс для arrXY
    var arrBool=[];


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

    var sah=0;          // шаг прямоугольника
    var shahPoint = 6*3;// шаг для позиции
    var shahUv = 6*2;   // шаг для ув


    this.startArrRect = function(){
        sah = 0;
        this._z=0
        // очищаем точки
        arrPosition.fill(0);
        arrUv.fill(0);

        if (this._isInside) {// если нужно отображать коробки которые в нутри большой коробки
            // заполняем
            for (var i = 0; i < this._arrBox.length; i++) {
                this.fillPointFromBox(this._arrBox[i].x,this._arrBox[i].y,this._arrBox[i].width,this._arrBox[i].height)//, this._depth);
            }
        } else {// показывать большую коробку исключая маленькие коробки
            this.fillPointExcludeBox() 
        }

    } 

    // наполнение сетки исключая боксы
    this.fillPointExcludeBox = function() {
        offX = 0;
        offY = 0;
   
        for (var i = 0; i < this._arrBox.length; i++) {// берем позиции коробки если они в нутри большой коробки
            if (this._rect.x < (this._arrBox[i].x +  this._arrBox[i].width) 
                && this._rect.y < (this._arrBox[i].y + this._arrBox[i].height) 
                && (this._rect.x + this._rect.width) > this._arrBox[i].x 
                && (this._rect.y + this._rect.height) > this._arrBox[i].y) {
                    if (this._rect.x <= this._arrBox[i].x) {
                        setkaX[offX++] = (this._arrBox[i].x);
                    }
                    if ((this._rect.x + this._rect.width) >= (this._arrBox[i].x + this._arrBox[i].width) ) {
                        setkaX[offX++] = (this._arrBox[i].x + this._arrBox[i].width);
                    }
                    if ((this._rect.y) <= (this._arrBox[i].y) ) {
                        setkaY[offY++] = (this._arrBox[i].y);
                    }
                    if ((this._rect.y + this._rect.height) >= (this._arrBox[i].y + this._arrBox[i].height) ) {
                        setkaY[offY++] = (this._arrBox[i].y + this._arrBox[i].height);
                    }
            }
        }

        // сегменты  (размер текстуры)
        for (var i = this._rect.x + this._textureWidth;  i < this._rect.x + this._rect.width; i += this._textureWidth)  {
            setkaX[offX++] = i;
        }
        for (var i = this._rect.y + this._textureHeight; i < this._rect.y + this._rect.height;i += this._textureHeight) {
            setkaY[offY++] = i;
        }
        
        setkaX[offX++] = (this._rect.x );
        setkaX[offX++] = (this._rect.x + this._rect.width);
        setkaY[offY++] = (this._rect.y);
        setkaY[offY++] = (this._rect.y + this._rect.height);

        setkaY.length = offY;
        setkaX.length = offX;

        // сортируем
        setkaY.sort(function( a, b) { return a - b});
        setkaX.sort(function( a, b) { return a - b});

        // убираем повторы
        for (var i = 0; i < setkaX.length; i++) {
            if (setkaX[i] == setkaX[i+1]) {
                setkaX.splice(i+1, 1);
                i--;
            }
        }
        for (var i = 0; i < setkaY.length; i++) {
            if (setkaY[i] == setkaY[i+1]) {
                setkaY.splice(i+1, 1);
                i--;
            }
        }

        for (var i = 0; i < setkaY.length; i++) {
            if(arrBool[i]==undefined) arrBool[i]=[];
            for (var j = 0; j < setkaX.length; j++) {
                arrBool[i][j]=this.inBox(setkaX[j], setkaY[i], setkaX[j+1], setkaY[i+1]);
            }
        }


        for (var i = 0; i < setkaY.length-1; i++) {
            for (var j = 0; j < setkaX.length-1; j++) {
                if (arrBool[i][j]) continue;
                this.fillPointOptimiz(j, i)

            }
        }
    }

    // наполнение сетки бокса
    this.fillPointFromBox = function(_x, _y, _w, _h) {
        if (this._rect) {   
            if (_y+_h <=  this._rect.y ) return; // вверху далеко
            if (_x+_w <=  this._rect.x) return;  // влева далеко
            if (_y >= this._rect.y + this._rect.height) return;  // в низу далеко
            if (_x >= this._rect.x + this._rect.width) return;   // справа далеко
        }
        offY = 0;
        offX = 0;
        // сегменты (размер текстуры)
        for (var i = this._rect.x + this._textureWidth;  i < _x + _w; i += this._textureWidth)  {
            if (i >= _x && i <= _x+_w ) setkaX[offX++] = i;
        }
        for (var i = this._rect.y + this._textureHeight; i < _y + _h;i += this._textureHeight) {
            if (i >= _y && i <= _y+_h) setkaY[offY++] = i;
        }

        // границы бокса
        if (_x >= this._rect.x ) setkaX[offX++] = _x;
        else setkaX[offX++] = this._rect.x;
        if (_x+_w <= this._rect.x + this._rect.width) setkaX[offX++] = _x+_w;
        else setkaX[offX++] = this._rect.x + this._rect.width;
        if (_y >= this._rect.y ) setkaY[offY++] = _y;
        else setkaY[offY++] = this._rect.y;
        if (_y+_h <= this._rect.y + this._rect.height) setkaY[offY++] = _y+_h;
        else setkaY[offY++] = this._rect.y + this._rect.height;

        setkaY.length = offY;
        setkaX.length = offX;

        // сортируем
        setkaY.sort(function( a, b) { return a - b});
        setkaX.sort(function( a, b) { return a - b});

        // убираем повторы
        for (var i = 0; i < setkaX.length; i++) {
            if (setkaX[i] == setkaX[i+1]) {
                setkaX.splice(i+1, 1);
                i--;
            }
        }
        for (var i = 0; i < setkaY.length; i++) {
            if (setkaY[i] == setkaY[i+1]) {
                setkaY.splice(i+1, 1);
                i--;
            }
        }

        this.fillPointSetka();

    }

    // рисуем квадрат
    // isFront - сторона лицевая или задняя
    this.pluspoli = function(isFront) {

        if (isFront) {

            arrPosition[sah*shahPoint + 0] = vectPos0.x;
            arrPosition[sah*shahPoint + 1] = vectPos0.y;
            arrPosition[sah*shahPoint + 2] = vectPos0.z;

            arrPosition[sah*shahPoint + 3] = vectPos1.x;
            arrPosition[sah*shahPoint + 4] = vectPos1.y;
            arrPosition[sah*shahPoint + 5] = vectPos1.z;

            arrPosition[sah*shahPoint + 6] = vectPos2.x;
            arrPosition[sah*shahPoint + 7] = vectPos2.y;
            arrPosition[sah*shahPoint + 8] = vectPos2.z;

            // второй треугольник
            arrPosition[sah*shahPoint + 9] = vectPos0.x;
            arrPosition[sah*shahPoint + 10] = vectPos0.y;
            arrPosition[sah*shahPoint + 11] = vectPos0.z;

            arrPosition[sah*shahPoint + 12] = vectPos2.x;
            arrPosition[sah*shahPoint + 13] = vectPos2.y;
            arrPosition[sah*shahPoint + 14] = vectPos2.z;

            arrPosition[sah*shahPoint + 15] = vectPos3.x;
            arrPosition[sah*shahPoint + 16] = vectPos3.y;
            arrPosition[sah*shahPoint + 17] = vectPos3.z;


            //uv
            arrUv[sah*shahUv + 0] = vectUv0.x
            arrUv[sah*shahUv + 1] = vectUv0.y

            arrUv[sah*shahUv + 2] = vectUv1.x
            arrUv[sah*shahUv + 3] = vectUv1.y

            arrUv[sah*shahUv + 4] = vectUv2.x
            arrUv[sah*shahUv + 5] = vectUv2.y
            //-----
            arrUv[sah*shahUv + 6] = vectUv0.x
            arrUv[sah*shahUv + 7] = vectUv0.y

            arrUv[sah*shahUv + 8] = vectUv2.x
            arrUv[sah*shahUv + 9] = vectUv2.y

            arrUv[sah*shahUv + 10] = vectUv3.x
            arrUv[sah*shahUv + 11] = vectUv3.y

        } else {

            arrPosition[sah*shahPoint + 0] = vectPos0.x;
            arrPosition[sah*shahPoint + 1] = vectPos0.y;
            arrPosition[sah*shahPoint + 2] = vectPos0.z;

            arrPosition[sah*shahPoint + 3] = vectPos2.x;
            arrPosition[sah*shahPoint + 4] = vectPos2.y;
            arrPosition[sah*shahPoint + 5] = vectPos2.z;

            arrPosition[sah*shahPoint + 6] = vectPos1.x;
            arrPosition[sah*shahPoint + 7] = vectPos1.y;
            arrPosition[sah*shahPoint + 8] = vectPos1.z;

            // второй треугольник
            arrPosition[sah*shahPoint + 9] = vectPos0.x;
            arrPosition[sah*shahPoint + 10] = vectPos0.y;
            arrPosition[sah*shahPoint + 11] = vectPos0.z;

            arrPosition[sah*shahPoint + 12] = vectPos3.x;
            arrPosition[sah*shahPoint + 13] = vectPos3.y;
            arrPosition[sah*shahPoint + 14] = vectPos3.z;

            arrPosition[sah*shahPoint + 15] = vectPos2.x;
            arrPosition[sah*shahPoint + 16] = vectPos2.y;
            arrPosition[sah*shahPoint + 17] = vectPos2.z;


            //uv
            arrUv[sah*shahUv + 0] = vectUv0.x
            arrUv[sah*shahUv + 1] = vectUv0.y

            arrUv[sah*shahUv + 2] = vectUv2.x
            arrUv[sah*shahUv + 3] = vectUv2.y

            arrUv[sah*shahUv + 4] = vectUv1.x
            arrUv[sah*shahUv + 5] = vectUv1.y
            //-----
            arrUv[sah*shahUv + 6] = vectUv0.x
            arrUv[sah*shahUv + 7] = vectUv0.y

            arrUv[sah*shahUv + 8] = vectUv3.x
            arrUv[sah*shahUv + 9] = vectUv3.y

            arrUv[sah*shahUv + 10] = vectUv2.x
            arrUv[sah*shahUv + 11] = vectUv2.y

        }

        sah++;
    }

    // проверяем находится ли позиции x, y, x1, y1 в нутри какогото бокса
    this.inBox = function(x, y, x1, y1) {
        for (var i = 0; i < this._arrBox.length; i++) {
            if (x >= this._arrBox[i].x && x1 <= this._arrBox[i].x + this._arrBox[i].width && 
                y >= this._arrBox[i].y && y1 <= this._arrBox[i].y + this._arrBox[i].height) return true;
        }
        return false;
    }

 
    // заполняем 
    this.fillPointOptimiz = function(x, y) {
        findX=0;
        var lasy=y;
        var pow=0, temp=0, ind=0;// pow -  максимальная мощь ректа, ind - индекс максимального ректа в масиве 
        for (var j = x+1; lasy < setkaY.length; j++) { 
            if ( Math.abs(((setkaY[lasy] - this._rect.y) / (this._textureHeight))%1) == 0 && lasy > y) {// если вышли ниже сегмента текстуры
                break;
            }
            // если столкнулись |или дошли до конца по x|или до сегмента
            if(arrBool[lasy][j] || j == setkaX.length-1 || Math.abs(((setkaX[j] - this._rect.x) / (this._textureWidth ))%1) == 0) {
                temp = this.getBoolRectPow(x, y, j, ++lasy);// смотрим на мощь этого ркета
                if ( temp != -1) {
                    arrXY[findXY++] = ([j , lasy])
                    if (pow < temp) {
                        pow = temp;
                        ind=findXY-1;
                    }
                }
                j=x;
                continue;
            };
        }


        var tx=setkaX.slice(), ty = setkaY.slice(); 
        this.fillPointFromBox(setkaX[x], setkaY[y],Math.abs(setkaX[arrXY[ind][0]]-setkaX[x]), Math.abs(setkaY[arrXY[ind][1]]-setkaY[y]));
        setkaX=tx;
        setkaY=ty;
        this._z+=5
       
        this.setBoolRect(x, y,arrXY[ind][0],arrXY[ind][1]);

    }

    // задаем рект в масив arrBool
    this.setBoolRect = function(x, y, x1, y1) {// x = y; y = x
       
        for (var yy = y; yy < arrBool.length && yy < y1; yy++) {
            for (var xx = x; xx < arrBool[xx].length  && xx < x1; xx++) {
                arrBool[yy][xx] = true;
                
            }
        } 
    }

    // получаем мощь по arrBool
    this.getBoolRectPow = function(i, j, i1, j1) {// i = y; j = x
        var pow=0;
        for (var ii = i; ii < arrBool.length && ii < i1; ii++) {
            for (var jj = j; jj < arrBool[ii].length && jj < j1; jj++) {
                if (arrBool[jj][ii]) return -1;   
                else pow++;
            }
        }
        return pow;
    }


    var x =0;
    var x1=0;
    var y =0;
    var y1=0;
    var px =0;
    var px1=0;
    var py =0;
    var py1=0;
    // наполнение позиций из сетки
    this.fillPointSetka = function() {
        var count=0;
        for (var i = 0; i < setkaY.length-1; i++) {
            for (var j = 0; j < setkaX.length-1; j++) {
                count++
                x = setkaX[j];
                y = setkaY[i];
                x1 = setkaX[j+1];
                y1 = setkaY[i+1];

                px =  Math.abs(((x - this._rect.x) / (this._textureWidth ))%1)||0;
                py =  Math.abs(((y - this._rect.y) / (this._textureHeight))%1)||0;
                px1 = Math.abs(((x1 - this._rect.x) / (this._textureWidth ))%1)||1;
                py1 = Math.abs(((y1 - this._rect.y) / (this._textureHeight))%1)||1;


                vectPos0.set(x,  y,  this._z);
                vectPos1.set(x1, y,  this._z);
                vectPos2.set(x1, y1, this._z);
                vectPos3.set(x,  y1, this._z);

                vectUv0.set( px , py);
                vectUv1.set( px1, py);
                vectUv2.set( px1, py1);
                vectUv3.set( px , py1);

                this.pluspoli( );

                if (this._depth) {
                    vectPos0.set(x,  y,  this._z+this._depth);
                    vectPos1.set(x1, y,  this._z+this._depth);
                    vectPos2.set(x1, y1, this._z+this._depth);
                    vectPos3.set(x,  y1, this._z+this._depth);

                    vectUv0.set( px , py);
                    vectUv1.set( px1, py);
                    vectUv2.set( px1, py1);
                    vectUv3.set( px , py1);

                    this.pluspoli( true );

                    // ставим грани
                    this.fillPointEdge(i , j);

                }
            }
        }
        
        
    }


    // наполнение грани
    this.fillPointEdge = function(i, j, isFront) {
        x = setkaX[j];
        y = setkaY[i];
        x1 = setkaX[j+1];
        y1 = setkaY[i+1];

        px =  Math.abs(((x - this._rect.x) / (this._textureWidth ))%1)||0;
        py =  Math.abs(((y - this._rect.y) / (this._textureHeight))%1)||0;
        px1 = Math.abs(((x1 - this._rect.x) / (this._textureWidth ))%1)||1;
        py1 = Math.abs(((y1 - this._rect.y) / (this._textureHeight))%1)||1;

        if (i == 0) {
            vectPos0.set(x,  y, this._z);
            vectPos1.set(x1, y, this._z);
            vectPos2.set(x1, y, this._z+this._depth);
            vectPos3.set(x,  y, this._z+this._depth);

            vectUv0.set( px , 0);
            vectUv1.set( px1, 0);
            vectUv2.set( px1, 1);
            vectUv3.set( px , 1);

            this.pluspoli( !isFront );
        }

        if (i == setkaY.length-2) {
            vectPos0.set(x,  y1, this._z);
            vectPos1.set(x1, y1, this._z);
            vectPos2.set(x1, y1, this._z+this._depth);
            vectPos3.set(x,  y1, this._z+this._depth);

            vectUv0.set( px , 0);
            vectUv1.set( px1, 0);
            vectUv2.set( px1, 1);
            vectUv3.set( px , 1);

            this.pluspoli(isFront);
        }

        if (j == 0) { 
            vectPos0.set(x,   y,  this._z);
            vectPos1.set(x,   y,  this._z+this._depth);
            vectPos2.set(x,   y1, this._z+this._depth);
            vectPos3.set(x,   y1, this._z);

            vectUv0.set( 0 , py);
            vectUv1.set( 1,  py);
            vectUv2.set( 1,  py1);
            vectUv3.set( 0 , py1);
            this.pluspoli( !isFront );
        }

        if (j == setkaX.length-2) {// 
            vectPos0.set(x1,   y,  this._z);
            vectPos1.set(x1,   y,  this._z+this._depth);
            vectPos2.set(x1,   y1, this._z+this._depth);
            vectPos3.set(x1,   y1, this._z);

            vectUv0.set( 0 , py);
            vectUv1.set( 1,  py);
            vectUv2.set( 1,  py1);
            vectUv3.set( 0 , py1);
            this.pluspoli(isFront);
        }
    }

 

    this.createBuffer = function () {
        if (!arrPositionAttribut || arrPositionAttribut.length < arrPosition.length*3) {
            arrPositionAttribut = new Float32Array( arrPosition.length*3);
            this.addAttribute( 'position', new THREE.BufferAttribute( arrPositionAttribut, 3 ) );

            arrUvAttribut = new Float32Array( arrPosition.length*2);
            this.addAttribute( 'uv', new THREE.BufferAttribute( arrUvAttribut, 2 ) );

           // arrIndex = new Uint16Array(arrPosition.length);
           //  this.addAttribute( 'indexs', new THREE.BufferAttribute( arrIndex, 1 ) );

           //  arrNormal = new Float32Array( arrPosition.length*3 );
           //  this.addAttribute( 'normal', new THREE.BufferAttribute( arrNormal, 3 ) );

        }
            

        arrPositionAttribut.fill(0)
        for (var i = 0; i < arrPosition.length; i++) {
            arrPositionAttribut[i] = arrPosition[i];
        }
        //arrUvAttribut.fill(0)
        for (var i = 0; i < arrUv.length; i++) {
            arrUvAttribut[i] = arrUv[i];
        }

        this.attributes.position.needsUpdate = true;
        this.attributes.uv.needsUpdate = true;
        //this.attributes.normal.needsUpdate = true;
        //this.attributes.indexs.needsUpdate = true;

    }

    this.update = function() {
        this.startArrRect();
        this.createBuffer();
    }

    // растягивает текстуру на большую коробку
    this.full = function() {
        this._textureHeight=this._rect.height;
        this._textureWidth=this._rect.width;
        this.update();
    }
    
    this.update();


    Object.defineProperty(this, "textureWidth", {
        set : function(value){
            if (this._textureWidth == value) return;
            this._textureWidth = value > 0 ? value : 1;
            this.update();
        },
        get : function() { return this._textureWidth; }
    });
    Object.defineProperty(this, "textureHeight", {
        set : function(value){
            if (this._textureHeight == value) return;
            this._textureHeight = value > 0 ? value : 1;
            this.update();
        },
        get : function() { return this._textureHeight; }
    });

    Object.defineProperty(this, "rect", {
        set : function(value){
            this._rect = value;
            this.update();
        },
        get : function() { return this._rect; }
    });

    Object.defineProperty(this, "arrBox", {
        set : function(value){
            this._arrBox = value;
            this.update();
        },
        get : function() { return this._arrBox; }
    });  
    Object.defineProperty(this, "depth", {
        set : function(value){
            if (this._depth == value) return;
            this._depth = value;
            this.update();
        },
        get : function() { return this._depth; }
    });   
    Object.defineProperty(this, "isInside", {
        set : function(value){
            if (this._isInside == value) return;
            this._isInside = value;
            this.update();
        },
        get : function() { return this._isInside; }
    });
   




};
GeometrySten.prototype = Object.create( THREE.BufferGeometry.prototype );
GeometrySten.prototype.constructor = GeometrySten;