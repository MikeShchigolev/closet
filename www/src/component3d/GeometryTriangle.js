

GeometryTriangle = function() {
    THREE.BufferGeometry.call( this );
    this.type = 'GeometryTriangle';

    this._textureWidth = 200;   // ширина текстуры / сегмента
    this._textureHeight = 200;  // высота текстуры / сегмента
    this._depth = 0;            // глубина боксов
    this._z=0;


    this._x = 0;
    this._y = 0;
    this._widthMax=400;
    this._width = 0;
    this._height = 400;

    this._point0 = new THREE.Vector2(0,0);
    this._point1 = new THREE.Vector2(this._widthMax,0);

    this._pointD = new THREE.Vector2(this._width,this._height);

    this._offsetX=0;
    this._offsetY=0;

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

    // ув
    var vectUv0 = new THREE.Vector2();
    var vectUv1 = new THREE.Vector2();
    var vectUv2 = new THREE.Vector2();

    var sah=0;          // шаг прямоугольника
    var shahPoint = 3*3;// шаг для позиции
    var shahUv = 3*2;   // шаг для ув



    this.startArrRect = function(){
        
        arrPosition=[]
        sah = 0;
        // очищаем точки
        for (var i = 0; i < arrPosition.length; i++) {
            arrPosition[i]=0;
        };
        for (var i = 0; i < arrUv.length; i++) {
            arrUv[i]=0;
        };    
        
        offset = 0;
        this.fillPointTriangle();
        

    } 

    var e = 1e-10
    this.fillPoint = function() {
        offset = 0;
        offsetUv=0; 

        var count=0;
        var proc=0;
        for (var i = 0; i < this.arrP.length-1; i++) {
            for (var j = 0; j < this.arrP[i].length-1; j++) {
                
                arrPosition[offset++] = this.arrP[i][j].x
                arrPosition[offset++] = this.arrP[i][j].y
                arrPosition[offset++] = 0

                var ind = j;
                if (ind > this.arrP[i+1].length-1) ind = this.arrP[i+1].length-1; 
                arrPosition[offset++] = this.arrP[i+1][ind].x
                arrPosition[offset++] = this.arrP[i+1][ind].y
                arrPosition[offset++] = 0

                arrPosition[offset++] = this.arrP[i][j+1].x
                arrPosition[offset++] = this.arrP[i][j+1].y
                arrPosition[offset++] = 0
                count++

                px =  Math.abs(((this.arrP[i][j].x ) / (this._textureWidth ))%1)||1;
                py =  Math.abs(((this.arrP[i][j].y ) / (this._textureHeight))%1)||0;

                px1 =  Math.abs(((this.arrP[i+1][ind].x ) / (this._textureWidth ))%1)||1;
                py1 =  Math.abs(((this.arrP[i+1][ind].y ) / (this._textureHeight))%1)||1;

                px2 =  Math.abs(((this.arrP[i][j+1].x ) / (this._textureWidth ))%1)||0;
                py2 =  Math.abs(((this.arrP[i][j+1].y ) / (this._textureHeight))%1)||0;
 

                if (px1 == 1) {
                    if (this.arrP[i][j+1].x == this.arrP[i+1][ind].x) {
                        px1 = 0;
                    } 
                }
 
                // 0 - 1.0
                // 1 - 1.1
                // 2 - 0.0

                // 
                arrUv[offsetUv++] = px//1//  Math.random()//
                arrUv[offsetUv++] = py//0//  Math.random()//

                // 
                arrUv[offsetUv++] = px1//1//  Math.random()//
                arrUv[offsetUv++] = py1//1//  Math.random()//

                // левая
                arrUv[offsetUv++] = px2//0//  Math.random()//
                arrUv[offsetUv++] = py2//0//  Math.random()//

                if (i > 0) {

                    arrPosition[offset++] = this.arrP[i][j].x
                    arrPosition[offset++] = this.arrP[i][j].y
                    arrPosition[offset++] = 0
                    var ind2 = j+1;
                    if (ind2 > this.arrP[i-1].length-1) ind2 = this.arrP[i-1].length-1; 

                    arrPosition[offset++] = this.arrP[i][j+1].x
                    arrPosition[offset++] = this.arrP[i][j+1].y
                    arrPosition[offset++] = 0

                    arrPosition[offset++] = this.arrP[i-1][ind2].x
                    arrPosition[offset++] = this.arrP[i-1][ind2].y
                    arrPosition[offset++] = 0
                    count++

                    px =  Math.abs(((this.arrP[i][j].x ) / (this._textureWidth ))%1)||1;
                    py =  Math.abs(((this.arrP[i][j].y ) / (this._textureHeight))%1)||1;

                    px1 =  Math.abs(((this.arrP[i][j+1].x ) / (this._textureWidth ))%1)||0;
                    py1 =  Math.abs(((this.arrP[i][j+1].y ) / (this._textureHeight))%1)||1;

                    px2 =  Math.abs(((this.arrP[i-1][ind2].x ) / (this._textureWidth ))%1)||0;
                    py2 =  Math.abs(((this.arrP[i-1][ind2].y ) / (this._textureHeight))%1)||0;
     
                    // if (px2 == 1) {
                    //     if (this.arrP[i][j].x == this.arrP[i-1][ind2].x) {
                    //         px2 = 0;
                    //     } 
                    // }
 

                    // 0 - 1.1
                    // 1 - 0.1
                    // 2 - 0.0


                    // 
                    arrUv[offsetUv++] = px//1//    Math.random()
                    arrUv[offsetUv++] = py//1//   Math.random()

                    arrUv[offsetUv++] = px1//0//  Math.random()
                    arrUv[offsetUv++] = py1//1// Math.random()

                    // 
                    arrUv[offsetUv++] = px2//0// Math.random()
                    arrUv[offsetUv++] = py2//0// Math.random()

                }
            }
        }

        
 
    }
    
    var minX , minY, maxX, maxY;

    this.findMinMax = function() {
        minX = this._point0.x;
        if (minX > this._point1.x) minX = this._point1.x;
        if (minX > this._pointD.x) minX = this._pointD.x;

        minY = this._point0.y;
        if (minY > this._point1.y) minY = this._point1.y;
        if (minY > this._pointD.y) minY = this._pointD.y;

        maxX = this._point0.x;
        if (maxX < this._point1.x) maxX = this._point1.x;
        if (maxX < this._pointD.x) maxX = this._pointD.x;

        maxY = this._point0.y;
        if (maxY < this._point1.y) maxY = this._point1.y;
        if (maxY < this._pointD.y) maxY = this._pointD.y;
    }

    this.getLineX = function(x) {
        var p, p1, p2;
        // проверяем со сторонами треугольника 
        p  = this.getPointCrossLine(x, minY, x, maxY, this._point0.x, this._point0.y, this._pointD.x, this._pointD.y);
        p1 = this.getPointCrossLine(x, minY, x, maxY, this._point1.x, this._point1.y, this._pointD.x, this._pointD.y);
        p2 = this.getPointCrossLine(x, minY, x, maxY, this._point1.x, this._point1.y, this._point0.x, this._point0.y);
        if (p && p2) return {p:p, p1:p2}
        if (p && p1) return {p:p, p1:p1}
        if (p1 && p2) return {p:p1, p1:p2}
        return false;
    }

    this.getLineY = function(y) {
        var p, p1, p2;
        // проверяем со сторонами треугольника 
        p  = this.getPointCrossLine(minX, y, maxX, y, this._point0.x, this._point0.y, this._pointD.x, this._pointD.y);
        p1 = this.getPointCrossLine(minX, y, maxX, y, this._point1.x, this._point1.y, this._pointD.x, this._pointD.y);
        p2 = this.getPointCrossLine(minX, y, maxX, y, this._point1.x, this._point1.y, this._point0.x, this._point0.y);
        if (p && p2) return {p:p, p1:p2}
        if (p && p1) return {p:p, p1:p1}
        if (p1 && p2) return {p:p1, p1:p2}
        return false;
    }
 
    var offset = 0;
    this.arrP=[];
    this.fillPointTriangle = function() {
        this.arrPoint=[];
        this.arrP=[]
        offset = 0;
        this._point1.x=this._widthMax;
        this._pointD.x = this._width;
        this._pointD.y = this._height;
        this.findMinMax();
        var point, point2,point2,temp;
 
        var arrLineX=[];
        var arrLineY=[];
        // 
        var line, line2;
        for (var i = minX; i < maxX+Math.abs(this._offsetX); i+=this._textureWidth) {
            line = this.getLineX(i+this._offsetX);
            if (!line) continue;
            arrLineX.push(line);

            if (line.p.y % this._textureHeight != 0) {
                line2 = this.getLineY(line.p.y);
                if(line2)arrLineY.push(line2)
                
            }
            if (line.p1.y % this._textureHeight != 0) {
                line2 = this.getLineY(line.p1.y);
                if(line2)arrLineY.push(line2)
                
            }

            // if (line.p.x % this._textureWidth != 0) {
            //     line2 = this.getLineX(line.p.x);
            //     if(line2)arrLineX.push(line2)
           
            // }
            // if (line.p1.x % this._textureWidth != 0) {
            //     line2 = this.getLineX(line.p1.x);
            //     if(line2)arrLineX.push(line2)
      
            // }
        }

     
        for (var i = minY; i < maxY+Math.abs(this._offsetY); i+=this._textureHeight) {
            line = this.getLineY(i+this._offsetY);
            if (!line) continue;
            arrLineY.push(line);
            // if (line.p.x % this._textureWidth != 0) {
            //     line2 = this.getLineX(line.p.x+this._offsetX);
            //     if(line2)arrLineX.push(line2)
            
            // }
            // if (line.p1.x % this._textureWidth != 0) {
            //     line2 = this.getLineX(line.p1.x);
            //     if(line2)arrLineX.push(line2)
           
            // }
            // if (line.p.y % this._textureHeight != 0) {
            //     line2 = this.getLineY(line.p.y);
            //     if(line2)arrLineY.push(line2)
          
            // }
            // if (line.p1.y % this._textureHeight != 0) {
            //     line2 = this.getLineY(line.p1.y);
            //     if(line2)arrLineY.push(line2)
           
            // }
        }

        this.arrPoint[offset++] = this._point0;
        this.arrPoint[offset++] = this._point1;
        this.arrPoint[offset++] = this._pointD;
        for (var i = 0; i < arrLineX.length; i++) {
            for (var j = 0; j < arrLineY.length; j++) {
                point = this.getPointCrossLine(arrLineX[i].p.x, arrLineX[i].p.y, arrLineX[i].p1.x, arrLineX[i].p1.y, 
                    arrLineY[j].p.x, arrLineY[j].p.y, arrLineY[j].p1.x, arrLineY[j].p1.y);
                if (point)
                    this.arrPoint[offset++] = point;   
            }
        }

        for (var i = 0; i < arrLineX.length; i++) {
            this.arrPoint[offset++] = arrLineX[i].p;   
            this.arrPoint[offset++] = arrLineX[i].p1;   
        }

        for (var i = 0; i < arrLineY.length; i++) {
            this.arrPoint[offset++] = arrLineY[i].p;   
            this.arrPoint[offset++] = arrLineY[i].p1;
        }

        // сортируем
        this.arrPoint.sort(function( a, b) { 
            if (a.y - b.y == 0) return a.x - b.x;
            return a.y - b.y;
        }); 

        var yy  = minY-1;
        var col = -1;
        var row = 0;
        for (var i = 0; i < this.arrPoint.length; i++) {
            if (yy < this.arrPoint[i].y) {
                yy = this.arrPoint[i].y;
                col++;    
                row=0;            
            }
            if (this.arrP[col] == undefined) this.arrP[col]=[];
            this.arrP[col][row++] = this.arrPoint[i];
        }
        // убираем повторы 
        for (var i = 0; i < this.arrP.length; i++) {
            for (var j = 0; j < this.arrP[i].length-1; j++) {
                if (this.arrP[i][j].x == this.arrP[i][j+1].x && this.arrP[i][j].y == this.arrP[i][j+1].y) { 
                    this.arrP[i].splice(j+1, 1);
                    j--
                }     
            }
        }

   
        this.fillPoint();

    }


    //---------
 

    //----------



 
    this.getPointCrossLine = function(x1,y1, x2,y2,   x3,y3, x4,y4){
        var d =  (x1 - x2) * (y4 - y3) - (y1 - y2) * (x4 - x3);
        var da = (x1 - x3) * (y4 - y3) - (y1 - y3) * (x4 - x3);
        var db = (x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3);
        var ta = da / d;
        var tb = db / d;
        if (ta >= 0 && ta <= 1 && tb >= 0 && tb <= 1)  {
            var dx = x1 + ta * (x2 - x1);
            var dy = y1 + ta * (y2 - y1);
            return new THREE.Vector2(parseFloat(dx.toFixed(2)), parseFloat(dy.toFixed(2)));
        }
        return false;
    }
 
 

    this.createBuffer = function () {
      
        // if(arrPositionAttribut)trace(arrPositionAttribut.length , arrPosition.length*3)
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


    Object.defineProperty(this, "widthMax", {
        set : function(value){
            if (this._widthMax == value) return;
            this._widthMax = value > 0 ? value : 1;
            this.update();
        },
        get : function() { return this._widthMax; }
    });

    Object.defineProperty(this, "width", {
        set : function(value){
            if (this._width == value) return;
            this._width = value > 0 ? value : 1;
            if (this._width > this._widthMax) {
                this._width = this._widthMax
            }
            this.update();
        },
        get : function() { return this._width; }
    });

    Object.defineProperty(this, "height", {
        set : function(value){
            if (this._height == value) return;
            this._height = value > 0 ? value : 1;
            this.update();
        },
        get : function() { return this._height; }
    });
    Object.defineProperty(this, "offsetX", {
        set : function(value){
            if (this._offsetX == value) return;
            this.update();
        },
        get : function() { return this._offsetX; }
    });
    Object.defineProperty(this, "offsetY", {
        set : function(value){
            if (this._offsetY == value) return;
            this.update();
        },
        get : function() { return this._offsetY; }
    });

    

};
GeometryTriangle.prototype = Object.create( THREE.BufferGeometry.prototype );
GeometryTriangle.prototype.constructor = GeometryTriangle;


