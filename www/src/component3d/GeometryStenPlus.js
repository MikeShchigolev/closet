GeometryStenPlus = function() {
    THREE.BufferGeometry.call( this );
    this.type = 'GeometryStenPlus';
 
    // большая коробка / максимальные размеры для отображения
    this._rect = {x:0, y:0, width:100, height:100};
    this._arrBox = [ ];//{x:100, y:100, width:100, height:100}

    this._textureWidth = 100;   // ширина текстуры / сегмента
    this._textureHeight = 100;  // высота текстуры / сегмента
    this._depth = 50;            // глубина боксов
    this._z=0;
 
    this._isInside = false;      // true - врутри боксы/ false - снаружи, исключить боксы
    this._isInverse = false;

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

    var setkaBigX=[];           // значения по х
    var setkaBigY=[];           // значения по у

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

    this.setRect = function(x, y, w, h) {
        this._rect.x = x;
        this._rect.y = y;
        this._rect.width = w;
        this._rect.height = h;
        this.update();
    }

    var objDin;
    this.startArrRect = function(){
        
        sah = 0;
        // очищаем точки
        
        for (var i = 0; i < arrPosition.length; i++) {
            arrPosition[i]=0;
        };
        for (var i = 0; i < arrUv.length; i++) {
            arrUv[i]=0;
        };    
        
        
         
        if (this._isInside) {// если нужно отображать коробки которые в нутри большой коробки
            // заполняем
            
            for (var i = 0; i < this._arrBox.length; i++) {
                if(this._arrBox[i].boxGeom!=undefined)objDin=this._arrBox[i].boxGeom;                
                else objDin=this._arrBox[i];
                if(this._arrBox[i].boxGeom!=null){
                    this.fillPointFromBox(objDin.x,objDin.y,objDin.width,objDin.height)//, this._depth);
                }
            }
        } else {// показывать большую коробку исключая маленькие коробки
            
            this.fillPointExcludeBox();
        }
        
        this.plus();
    } 

    this.plus = function() {
        var x, x1, y, y1;
        x = setkaX[setkaX.length-1]
        y = setkaY[0];
        x1 = x+150;
        y1 = setkaY[setkaY.length-1]

        vectPos0.set(x,  y,  this._z);
        vectPos1.set(x1, y,  this._z);
        vectPos2.set(x, y1, this._z);
        vectPos3.set(x,  y1, this._z);

        vectUv0.set( px , py);
        vectUv1.set( px1, py);
        vectUv2.set( px, py1);
        vectUv3.set( px , py1);

        this.pluspoli( );


        // vectPos0.set(x,  y,  this._z+this._depth);
        // vectPos1.set(x1, y,  this._z+this._depth);
        // vectPos2.set(x, y1,  this._z+this._depth);
        // vectPos3.set(x,  y1, this._z+this._depth);

        // vectUv0.set( px , py);
        // vectUv1.set( px1, py);
        // vectUv2.set( px, py1);
        // vectUv3.set( px , py1);

        // this.pluspoli(true);

        // vectPos0.set(x,  y, this._z);
        // vectPos1.set(x1, y, this._z);
        // vectPos2.set(x1, y, this._z+this._depth);
        // vectPos3.set(x,  y, this._z+this._depth);

        // vectUv0.set( px , 0);
        // vectUv1.set( px1, 0);
        // vectUv2.set( px1, 1);
        // vectUv3.set( px , 1);

        // this.pluspoli(true);

        // vectPos0.set(x1,   y,  this._z);
        // vectPos1.set(x1,   y,  this._z+this._depth);
        // vectPos2.set(x,   y1, this._z+this._depth);
        // vectPos3.set(x,   y1, this._z);

        // vectUv0.set( 0 , py);
        // vectUv1.set( 1,  py);
        // vectUv2.set( 1,  py1);
        // vectUv3.set( 0 , py1);
        // this.pluspoli(false);
    }

    // наполнение сетки исключая боксы
    this.fillPointExcludeBox = function() {
        offX = 0;
        offY = 0;
        var freeBigBox = false;// пустой ли болшой бокс?
   
        for (var i = 0; i < this._arrBox.length; i++) {// берем позиции коробки если они в нутри большой коробки
            if(this._arrBox[i].boxGeom!=undefined)objDin=this._arrBox[i].boxGeom;                
            else objDin=this._arrBox[i];
            if(this._arrBox[i].boxGeom!=null){
                if (this._rect.x < (objDin.x +  objDin.width) 
                    && this._rect.y < (objDin.y + objDin.height) 
                    && (this._rect.x + this._rect.width) > objDin.x 
                    && (this._rect.y + this._rect.height) > objDin.y) {
                        if (this._rect.x <= objDin.x) {
                            setkaBigX[offX++] = (objDin.x);
                        }
                        if ((this._rect.x + this._rect.width) >= (objDin.x + objDin.width) ) {
                            setkaBigX[offX++] = (objDin.x + objDin.width);
                        }
                        if ((this._rect.y) <= (objDin.y) ) {
                            setkaBigY[offY++] = (objDin.y);
                        }
                        if ((this._rect.y + this._rect.height) >= (objDin.y + objDin.height) ) {
                            setkaBigY[offY++] = (objDin.y + objDin.height);
                        }
                }
            }
        }

        if (offX == 0 && offY == 0) {// большой бокс пустой
            freeBigBox = true;
        }

        // сегменты  (размер текстуры)
        for (var i = this._rect.x + this._textureWidth;  i < this._rect.x + this._rect.width; i += this._textureWidth)  {
            setkaBigX[offX++] = i;
        }
        for (var i = this._rect.y + this._textureHeight; i < this._rect.y + this._rect.height;i += this._textureHeight) {
            setkaBigY[offY++] = i;
        }
        
        setkaBigX[offX++] = (this._rect.x );
        setkaBigX[offX++] = (this._rect.x + this._rect.width);
        setkaBigY[offY++] = (this._rect.y);
        setkaBigY[offY++] = (this._rect.y + this._rect.height);

        setkaBigY.length = offY;
        setkaBigX.length = offX;

        // сортируем
        setkaBigY.sort(function( a, b) { return a - b});
        setkaBigX.sort(function( a, b) { return a - b});

        // убираем повторы
        for (var i = 0; i < setkaBigX.length; i++) {
            if (setkaBigX[i] == setkaBigX[i+1]) {
                setkaBigX.splice(i+1, 1);
                i--;
            }
        }
        for (var i = 0; i < setkaBigY.length; i++) {
            if (setkaBigY[i] == setkaBigY[i+1]) {
                setkaBigY.splice(i+1, 1);
                i--;
            }
        }

        for (var i = 0; i < setkaBigY.length; i++) {
            if(arrBool[i]==undefined) arrBool[i]=[];
            for (var j = 0; j < setkaBigX.length; j++) {
                arrBool[i][j]=this.inBox(setkaBigX[j], setkaBigY[i], setkaBigX[j+1], setkaBigY[i+1]);
            }
        }
        

        if (freeBigBox) {// значит в большой коробки других коробок нет
            this.fillPointFromBox(setkaBigX[0], setkaBigY[0],
                Math.abs(setkaBigX[setkaBigX.length-1]-setkaBigX[0]), Math.abs(setkaBigY[setkaBigY.length-1]-setkaBigY[0]));
        } else {
            for (var i = 0; i < setkaBigY.length-1; i++) {
                for (var j = 0; j < setkaBigX.length-1; j++) {
                    if (arrBool[i][j]) continue;
                    this.fillPointOptimiz(j, i);
                }
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

        // убираем повторы и обрезаем границы
        for (var i = 0; i < setkaX.length; i++) {
            if (setkaX[i] == setkaX[i+1] || setkaX[i+1] > this._rect.x + this._rect.width) {
                setkaX.splice(i+1, 1);
                i--;
            }
        }
        for (var i = 0; i < setkaY.length; i++) {
            if (setkaY[i] == setkaY[i+1] || setkaY[i+1] > this._rect.y + this._rect.height) {
                setkaY.splice(i+1, 1);
                i--;
            }
        }


        this.fillPointSetka();

    }

    // рисуем квадрат
    // isFront - сторона лицевая или задняя
    this.pluspoli = function(isFront) {
        if (this._isInverse) isFront = !isFront;
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
            if(this._arrBox[i].boxGeom!=undefined)objDin=this._arrBox[i].boxGeom;                
            else objDin=this._arrBox[i];
            if(this._arrBox[i].boxGeom!=null){
                if (x >= objDin.x && x1 <= objDin.x + objDin.width && 
                    y >= objDin.y && y1 <= objDin.y + objDin.height){
                    return true;
                } 
            }     
        }
        return false;
    }

 
    // заполняем 
    this.fillPointOptimiz = function(x, y) {
        findX=0;
        var lasy=y;
        var pow=0, temp=0, ind=0;// pow -  максимальная мощь ректа, ind - индекс максимального ректа в масиве 
        for (var j = x+1; lasy < setkaBigY.length; j++) { 
            if ( Math.abs(((setkaBigY[lasy] - this._rect.y) / (this._textureHeight))%1) == 0 && lasy > y) {// если вышли ниже сегмента текстуры
                break;
            }
            // если столкнулись |или дошли до конца по x|или до сегмента
            if(arrBool[lasy][j] || j == setkaBigX.length-1 || Math.abs(((setkaBigX[j] - this._rect.x) / (this._textureWidth ))%1) == 0) {
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

        this.fillPointFromBox(setkaBigX[x], setkaBigY[y],Math.abs(setkaBigX[arrXY[ind][0]]-setkaBigX[x]), Math.abs(setkaBigY[arrXY[ind][1]]-setkaBigY[y]));
        this.setBoolRect(x, y,arrXY[ind][0],arrXY[ind][1]);
    }

    // задаем рект в масив arrBool
    this.setBoolRect = function(x, y, x1, y1) {// x = y; y = x
        
        for (var yy = y; yy < arrBool.length && yy < y1; yy++) {
            for (var xx = x; xx < arrBool[yy].length  && xx < x1; xx++) {
                arrBool[yy][xx] = true;
            }
        } 
    }

    // получаем мощь по arrBool
    this.getBoolRectPow = function(x, y, x1, y1) {// i = y; j = x
        var pow=0;
        for (var yy = y; yy < arrBool.length && yy < y1; yy++) {
            for (var xx = x; xx < arrBool[yy].length  && xx < x1; xx++) {
                if (arrBool[yy][xx]) return -1;   
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

            arrNormal = new Float32Array( arrPosition.length*3 );
            this.addAttribute( 'normal', new THREE.BufferAttribute( arrNormal, 3 ) );

        }
            
        for (var i = 0; i < arrPositionAttribut.length; i++) {
            arrPositionAttribut[i]=0;
        };
        

        for (var i = 0; i < arrPosition.length; i++) {
            arrPositionAttribut[i] = arrPosition[i];
        }
        
        for (var i = 0; i < arrUv.length; i++) {
            arrUvAttribut[i] = arrUv[i];
        }

        this.attributes.position.needsUpdate = true;
        this.attributes.uv.needsUpdate = true;
        this.computeVertexNormals();
        this.attributes.normal.needsUpdate = true;
        

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
GeometryStenPlus.prototype = Object.create( THREE.BufferGeometry.prototype );
GeometryStenPlus.prototype.constructor = GeometryStenPlus;