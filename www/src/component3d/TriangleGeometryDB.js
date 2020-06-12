
TriangleGeometryDB = function(cD) {
    THREE.BufferGeometry.call( this );
    this.type = 'TriangleGeometryDB';

    this.arrPoint=[new THREE.Vector2(0,0), new THREE.Vector2(0,100), new THREE.Vector2(100,0)];
    this.content = new createjs.Container();  
    cD.addChild(this.content);


    this._textureWidth = 200;   // ширина текстуры / сегмента
    this._textureHeight = 200;  // высота текстуры / сегмента
    this._depth = 0; 


    this._prossentWidth = 0;   
    this._prossentHeight = 0; 
    this.rect=new createjs.Rectangle(9999, 9999, -9999, -9999);





    var kolSig=0;

    var aR=[];

    var ii,jj,iii;
    var point=new THREE.Vector2();
    var point1=new THREE.Vector2();
    var point2=new THREE.Vector2();
    var point3=new THREE.Vector2();
    var point4;
    var sag=0 
    var ppp;
    var arrTrrrrr=[];
    this.racsotRect = function() {
        kolSig=0;
        for (ii = 0; ii < aR.length; ii++) {
            aR[ii].visible=false;
        }
        for (ii = 0; ii < this.rect.width+this._textureWidth; ii+=this._textureWidth) {
            for (jj = 0; jj < this.rect.height+this._textureHeight; jj+=this._textureHeight) {
                if(aR[kolSig]==undefined)aR[kolSig]=new GeometryRect();
                aR[kolSig].visible=true;
                aR[kolSig].xYnik=this.rect.x;
                aR[kolSig].set(
                    this.rect.x- this._textureWidth*this._prossentWidth+ii,
                    this.rect.y- this._textureHeight*this._prossentHeight+jj,
                    this._textureWidth,
                    this._textureHeight
                )
                this.debagRect(aR[kolSig],'#00ff00');

                kolSig++;
            } 

        }
        
        for (ii = 0; ii < kolSig; ii++) {                 
            this.napolTip(aR[ii]);//Проверяет но вылетает
            if(aR[ii].tip==0)this.napolTip2(aR[ii]);//Относительно треугольника

            if(aR[ii].tip==0)this.napolTip3(aR[ii]);//Относительно пересечений

            this.napolTriangel(aR[ii]);

        }


        for (ii = 0; ii < kolSig; ii++) {            
            if(aR[ii].tip==1){
                this.debagRect(aR[ii],'#0000ff',null,3);
            }
            if(aR[ii].tip==2){
                this.debagRect(aR[ii],'#00ffff',null,13);
            }
            if(aR[ii].tip==3){
                this.debagRect(aR[ii],'#00ffff',null,5);
            }

            if(aR[ii].tip==4){//простой трекугольник
                this.debagRect(aR[ii],'#ffff00','#ffff00',3);
            }

            if(aR[ii].tip==5){//треугольник в 4-ке
                this.debagRect(aR[ii],'#0ffff0',null,5);
            }
        }

        for (ii = 0; ii < kolSig; ii++) {
            if(aR[ii].kolTr!=0){
                for (jj = 0; jj < aR[ii].kolTr; jj++) {

                }
            }
        }


        //arrTrrrrr=[];
        for (ii = 0; ii < kolSig; ii++) {
            if(aR[ii].kolTr!=0){
                for (jj = 0; jj < aR[ii].kolTr; jj++) {
                    arrTrrrrr.push(aR[ii].arrTr[jj]);                    
                    this.debagTriang(aR[ii].arrTr[jj].p,  aR[ii].arrTr[jj].p1, aR[ii].arrTr[jj].p2)                   
                };
            }
        }
  
        
    }

    


    this.napolTriangel = function(r) {
        r.clear();
        if(r.tip==4){
            r.plusTr(r.x,r.y, r.x+r.width,r.y, r.x+r.width,r.y+r.height);
            r.plusTr(r.x,r.y, r.x+r.width,r.y+r.height, r.x,r.y+r.height); 
        }
        if(r.tip==5){
            r.plusTr(this.arrPoint[0].x,this.arrPoint[0].y, this.arrPoint[1].x,this.arrPoint[1].y, this.arrPoint[2].x,this.arrPoint[2].y); 
        }
        if(r.tip==1){
            this.napolT1(r)
        }
        if(r.tip==3){
            this.napolT1(r)
        }
        if(r.tip==2){
            this.napolT1(r)
        }
    }

    this.arrPPP=[];
    this.arrPAngel=[0];
    var pp=new THREE.Vector2();
    var pp1=new THREE.Vector2();
    var pp2=new THREE.Vector2();
    var pp3=new THREE.Vector2();
    var pp4
    var saggg
    var an,anM;
    this.napolT1 = function(r) {
        saggg=0;
        this.arrPPP=[]
        var i,j;
        for (var i = 0; i < 4; i++) {
            if(r.arrV[i]!=0){
                if(this.arrPPP[saggg]==undefined)this.arrPPP[saggg]=new THREE.Vector3();
                r.sagNap(this.arrPPP[saggg],i); 
                saggg++;              
            }
        }

        for (i = 0; i < 3; i++) {
            pp.x=this.arrPoint[i].x;
            pp.y=this.arrPoint[i].y;
            if(i!=2){
                pp1.x=this.arrPoint[i+1].x;
                pp1.y=this.arrPoint[i+1].y;
            }else{
                pp1.x=this.arrPoint[0].x;
                pp1.y=this.arrPoint[0].y;
            }
            //this.debagLine(pp, pp1,null,7)
            for (j = 0; j< 4; j++) {
                r.sagNap(pp2,j);
                r.sagNap(pp3,j+1);
               // this.debagLine(pp2, pp3,null,6)


                pp4=calc.getPointOfIntersection(pp,pp1,pp2,pp3);
                if(pp4){
                    
                   
                    if(this.arrPPP[saggg]==undefined)this.arrPPP[saggg]=new THREE.Vector3();
                    this.arrPPP[saggg].x=pp4.x; 
                    this.arrPPP[saggg].y=pp4.y;
                    saggg++;     
                }

            } 
            r.sagNap(pp1,0);
            r.sagNap(pp2,1);
            r.sagNap(pp3,2);
            if(calc.isInTriangle(pp1,pp2,pp3,pp)){
                if(this.arrPPP[saggg]==undefined)this.arrPPP[saggg]=new THREE.Vector3();
                    this.arrPPP[saggg].x=pp.x; 
                    this.arrPPP[saggg].y=pp.y;
                    saggg++;
            }

            
            r.sagNap(pp2,2);
            r.sagNap(pp3,3);
            if(calc.isInTriangle(pp1,pp2,pp3,pp)){
               if(this.arrPPP[saggg]==undefined)this.arrPPP[saggg]=new THREE.Vector3();
                    this.arrPPP[saggg].x=pp.x; 
                    this.arrPPP[saggg].y=pp.y;
                    saggg++;
            }    

        }

        for (i = 0; i < saggg; i++) {
            this.debagPoint(this.arrPPP[i].x, this.arrPPP[i].y)
        }
        // this.okrug=0.01;
       
        for (i = 0; i < saggg; i++) {            
            this.arrPPP[i].x = Math.round(this.arrPPP[i].x*1000 )/1000 ;
            this.arrPPP[i].y = Math.round(this.arrPPP[i].y*1000 )/1000 ;
        }

        for (i = 0; i < saggg; i++) {  
            for (j = i+1; j < saggg; j++) {  
                if(this.arrPPP[i].x==this.arrPPP[j].x){
                    if(this.arrPPP[i].y==this.arrPPP[j].y){                       
                        saggg--;
                        this.arrPPP.splice(j,1);
                        i--;
                        if(i<0)i=0;
                    }
                }
            }
        }



        if(saggg>=3){            
            this.arrPPP.sort(this.testObj2);           
            this.arrPPP[0].z=-999999999999
            for (i = 1; i < saggg; i++) {
                this.arrPPP[i].z=calc.getAngle(this.arrPPP[0],this.arrPPP[i]);                
            }
            this.arrPPP.sort(this.testObj); 

            for (i = 2; i < saggg; i++) {
                r.plusTr(   this.arrPPP[0].x,this.arrPPP[0].y, 
                            this.arrPPP[i-1].x,this.arrPPP[i-1].y, 
                            this.arrPPP[i].x,this.arrPPP[i].y);
            }
        }

        

        

    }

    var rr;
    this.testObj = function(o,b) {
        return o.z-b.z;
    }
    this.testObj2 = function(o,b) {
        return o.x-b.x;
    }
    this.testObj3 = function(o,b) {
        return b.x-o.x;
    }


    this.napolTip3 = function(r) {
        point1.x=r.x;
        point1.y=r.y;

        point2.x=r.x+r.width;
        point2.y=r.y;
        ppp=calc.isLineInTriangle(this.arrPoint[0],this.arrPoint[1],this.arrPoint[2],point1,point2);
        if(ppp){
            
            this.debagPoint(ppp.x,ppp.y)
            sag++; 
            r.tip=3;
            return;}
   
        point1.x=r.x+r.width;
        point1.y=r.y+r.height;
        if(calc.isLineInTriangle(this.arrPoint[0],this.arrPoint[1],this.arrPoint[2],point1,point2)){sag++; r.tip=3; return;}
  
        point2.x=r.x;
        point2.y=r.y+r.height;
        if(calc.isLineInTriangle(this.arrPoint[0],this.arrPoint[1],this.arrPoint[2],point1,point2)){sag++; r.tip=3; return;}
  
        point1.x=r.x;
        point1.y=r.y;
        if(calc.isLineInTriangle(this.arrPoint[0],this.arrPoint[1],this.arrPoint[2],point1,point2)){sag++; r.tip=3; return;}
    }




    this.napolTip2 = function(r) {
        sag=0; 
        for (iii = 0; iii < 3; iii++) { 
            point.x=this.arrPoint[iii].x;
            point.y=this.arrPoint[iii].y;

            point1.x=r.x;
            point1.y=r.y;

            point2.x=r.x+r.width;
            point2.y=r.y;

            point3.x=r.x+r.width;
            point3.y=r.y+r.height;

            if(calc.isInTriangle(point1,point2,point3,point))sag++; 
            

            point2.x=r.x;
            point2.y=r.y+r.height;

            if(calc.isInTriangle(point1,point2,point3,point)){
                sag++; 
            }
        }
        if(sag!=0){
            r.tip=2;
            if(sag==3)r.tip=5;
        }
    }



    this.napolTip = function(r) {
        r.tip=0;
        sag=0;
        point.x=r.x;
        point.y=r.y;
        r.arrV[0]=0;
        if(calc.isInTriangle(this.arrPoint[0],this.arrPoint[1],this.arrPoint[2],point)){
            sag++; 
            r.arrV[0]=1;  
        } 

        point.x=r.x+r.width;
        point.y=r.y;
        r.arrV[1]=0;
        if(calc.isInTriangle(this.arrPoint[0],this.arrPoint[1],this.arrPoint[2],point)){
            sag++; 
            r.arrV[1]=1;  
        } 

        point.x=r.x+r.width;
        point.y=r.y+r.height;
        r.arrV[2]=0;
        if(calc.isInTriangle(this.arrPoint[0],this.arrPoint[1],this.arrPoint[2],point)){
            sag++; 
            r.arrV[2]=1;  
        } 

        point.x=r.x;
        point.y=r.y+r.height;
        r.arrV[3]=0;
        if(calc.isInTriangle(this.arrPoint[0],this.arrPoint[1],this.arrPoint[2],point)){
            sag++; 
            r.arrV[3]=1;  
        } 

        if(sag>0)r.tip=1;

        if(sag==4)r.tip=4;
    }


    this.racsot = function() {
        this.content.removeAllChildren(); 
        for (var i = 0; i < this.arrPoint.length-1; i++) {
            this.debagLine(this.arrPoint[i],this.arrPoint[i+1],null,3)
        }
        this.debagLine(this.arrPoint[this.arrPoint.length-1],this.arrPoint[0],null,3)


        this.rect.x=99999999;
        this.rect.y=99999999;

        this.rect.width=-99999999;
        this.rect.height=-99999999;

        for (var i = 0; i < this.arrPoint.length; i++) {
            if(this.arrPoint[i].x<this.rect.x)this.rect.x=this.arrPoint[i].x;
            if(this.arrPoint[i].y<this.rect.y)this.rect.y=this.arrPoint[i].y;
            if(this.arrPoint[i].x>this.rect.width)this.rect.width=this.arrPoint[i].x;
            if(this.arrPoint[i].y>this.rect.height)this.rect.height=this.arrPoint[i].y;
        };
        this.rect.width=this.rect.width-this.rect.x;
        this.rect.height=this.rect.height-this.rect.y;
        this.debagRect(this.rect);
        this.racsotRect();
    }
    var sah,sah2;
    this.plusTerri= function(x,y,z, x1,y1,z1,   x2,y2,z2,   u,v,    u1,v1,  u2,v2, bool){    
        
        
        positions[sah]=x;
        positions[sah+1]=y;
        positions[sah+2]=z;

        positions[sah+3]=x1;
        positions[sah+4]=y1;
        positions[sah+5]=z1;

        positions[sah+6]=x2;
        positions[sah+7]=y2;
        positions[sah+8]=z2;
        
        uv[sah2]=u;
        uv[sah2+1]=v;

        uv[sah2+2]=u1;
        uv[sah2+3]=v1;

        uv[sah2+4]=u2;
        uv[sah2+5]=v2;
        
        sah+=9;
        sah2+=6;
        if(bool!=false){//То расширяем по треугольнику
            this.plusTerri(x2,y2,-z2, x1,y1,-z1,  x,y,-z,  u2,v2,  u1,v1,   u,v,      false)

          




            this.plusTerri(x1,y1,-z1, x1,y1,z1,  x,y,z,         u1,v1,  u1,v1,    u,v,      false)
            this.plusTerri(x1,y1,-z1, x,y,z,     x,y,-z,        u1,v1,  u, v,    u,v,      false)
            //--
            this.plusTerri(x2,y2,-z2, x2,y2,z2,  x1,y1,z1,      u2,v2,  u2,v2,    u1,v1,        false)
            this.plusTerri(x2,y2,-z2, x1,y1,z1,  x1,y1,-z1,     u2,v2,  u1, v1,    u1,v1,     false)

            this.plusTerri(x,y,-z, x,y,z,  x2,y2,z2,           u,v,  u,v,   u2,v2,     false)
            this.plusTerri(x,y,-z, x2,y2,z2,  x2,y2,-z2,        u,v,  u2,v2,    u2,v2,     false)//

        }
    }

    var positions = []; 
    var positionsReal = new Float32Array(0);        
    var normals = new Float32Array(0);
    var uv = [];  
    var uvReal = new Float32Array(2);   
    var kolP2=0;
    var bb;
    this.craetGeomatri = function() {
        sah=0;
        sah2=0;
        
        for (var i = 0; i < positions.length; i++) {
            positions[i]=0;
        }; 
        count=0;
        for (var i = 0; i < arrTrrrrr.length; i++) {
            this.plusTerri( 
                            arrTrrrrr[i].p2.x,arrTrrrrr[i].p2.y,-this._depth/2,
                            arrTrrrrr[i].p1.x,arrTrrrrr[i].p1.y,-this._depth/2,  
                            arrTrrrrr[i].p.x,arrTrrrrr[i].p.y,-this._depth/2,  
                            arrTrrrrr[i].uv2.x,arrTrrrrr[i].uv2.y,
                            arrTrrrrr[i].uv1.x,arrTrrrrr[i].uv1.y, 
                            arrTrrrrr[i].uv.x,arrTrrrrr[i].uv.y,                             
                            bb);  
        };
      
        
    }


    this.update = function() {
        this.racsot();
        bb=false;
        if(this._depth!=0)bb=true;

        this.craetGeomatri()
        kolP2=arrTrrrrr.length;
        if(bb==true)kolP2*=8;
        if(positionsReal.length<kolP2*9){//новый            
            
            positionsReal=new Float32Array((kolP2)*9); 
            this.addAttribute( 'position', new THREE.BufferAttribute(positionsReal, 3 ));

            uvReal=new Float32Array((kolP2)*6);
            this.addAttribute( 'uv', new THREE.BufferAttribute( uvReal, 2 ) );

            normals =new Float32Array((kolP2)*9);       
            this.addAttribute( 'normal', new THREE.BufferAttribute(normals, 3 ));
            
        }else{//старый
            for (var i = 0; i < positionsReal.length; i++) {
                positionsReal[i]=0;
            };          
        }
        for (var i = 0; i < positions.length; i++) {
            //positionsReal[i]=Math.random()*200-100//positions[i];
            positionsReal[i]=positions[i];
        }; 
       
        for (var i = 0; i < positions.length; i++) {
            uvReal[i]=uv[i]//Math.random()
        }
        
        
       
        

        this.attributes.position.needsUpdate = true;
        this.attributes.uv.needsUpdate = true;
        this.computeVertexNormals();
        this.attributes.normal.needsUpdate = true;

    }

    

    this.debagRect=function(rect,color,color1,wL){
        if(this.content==undefined)return;        
        this.shape = new createjs.Shape();
        this.content.addChild(this.shape);
        
        
        if(color==undefined)color='#ff0000';

        this.shape.x=rect.x;
        this.shape.y=rect.y;
        this.shape.graphics.beginStroke(color);
        if(wL!=undefined){
            this.shape.graphics.setStrokeStyle(wL);
            
        }
        if(color1!=undefined)this.shape.graphics.beginFill(color1);
        this.shape.graphics.drawRect(0,0,rect.width, rect.height);
    }

    this.debagPoint=function(x,y,r,color,wL){
        if(this.content==undefined)return;
        this.shape = new createjs.Shape();
        this.content.addChild(this.shape);
        if(r==undefined)r=5;
        if(color==undefined)color='#ff0000';
        if(wL!=undefined){
            this.shape.graphics.setStrokeStyle(wL);            
        }


        this.shape.x=x;
        this.shape.y=y;
        this.shape.graphics.beginFill(color);
        this.shape.graphics.drawCircle(0,0,r);
    }



    this.debagLine=function(p,p1,color, wL){
        if(this.content==undefined)return;
        this.shape = new createjs.Shape();
        this.content.addChild(this.shape);
        
        if(color==undefined)color='#ff0000';
        if(wL!=undefined){
            this.shape.graphics.setStrokeStyle(wL);
            
        }
        this.shape.graphics.s(color);
        this.shape.graphics.moveTo(p.x,p.y)
        this.shape.graphics.lineTo(p1.x,p1.y)
       
    } 

    this.debagTriang=function(p,p1,p2){
        if(this.content==undefined)return;
        this.shape = new createjs.Shape();
        this.content.addChild(this.shape);
        
        var color='rgba('+Math.round(Math.random()*254)+','+Math.round(Math.random()*254)+','+Math.round(Math.random()*254)+',0.402)';
        
        this.shape.graphics.s(color);
        this.shape.graphics.beginFill(color);
        this.shape.graphics.moveTo(p.x,p.y)
        this.shape.graphics.lineTo(p1.x,p1.y)
        this.shape.graphics.lineTo(p2.x,p2.y)
    }



    this.update();




    Object.defineProperty(this, "depth", {
        set : function(value){
            if (this._depth == value) return;
            this._depth = value;
            this.update();
        },
        get : function() { return this._depth; }
    });

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

    Object.defineProperty(this, "prossentWidth", {
        set : function(value){
            if (this._prossentWidth == value) return;
            this._prossentWidth = value;
            this.update();
        },
        get : function() { return this._prossentWidth; }
    });
    Object.defineProperty(this, "prossentHeight", {
        set : function(value){
            if (this._prossentHeight == value) return;
            this._prossentHeight = value;
            this.update();
        },
        get : function() { return this._prossentHeight; }
    });

};
TriangleGeometryDB.prototype = Object.create( THREE.BufferGeometry.prototype );
TriangleGeometryDB.prototype.constructor = TriangleGeometryDB;  

