/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

стена
*/

import { GeometrySten } from './GeometrySten.js';
import { Krai3D } from './Krai3D.js';
import { CollisionRect } from './collision/CollisionRect.js';
import { GMG } from './GMG.js';
import { ButDrag } from './ButDrag.js';
import { DebbugPixi } from './DebbugPixi.js';
import { LinerMetrik } from './LinerMetrik.js';
import {KorektMarker} from './KorektMarker.js';

export class Sten  {
    constructor(room, cont3d, idArr, fun) {         
        this.type="Sten";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.fun=fun;
        this.idArr=idArr;
        this.par=room;
        this.pointOld=new Position()
        
        this._width=200;
        this._height=20;

        this._color ="#ffffff";
        this._idMat="null"
        this._color2d = 0xffffff;
        this._colorBig = 0xeeeeee;
        this._colorLine =0xdddddd;

        this._active2 = false;
        this._active=true;
        this._actBig = false;

        this._avAct=true;//прячем стенки

        this._visiMark = false;
        this._lmActive=room._lmActive;

        this._sA=1;
        this._sA1=1;
        this.arrayPoint=[new Position(),new Position(),new Position(),new Position()];
        this.arrayPoint2d=[new Position(),new Position(),new Position(),new Position()];
        this._name3d="null"
        this._width = 300;// длина
        this._height = room._height;// высота
        this._depth = 10;// толшина

        this.idRandom=Math.random();

        this._maxWidth=70
        this._pozZdvig=0 

        this.c3Glaf = new THREE.Object3D();        
        cont3d.add(this.c3Glaf);  

     /*   var axesHelper = new THREE.AxesHelper( 25 );
        this.c3Glaf.add( axesHelper ); */
        
        //3d init-------------------------------------------------------        
        this.contPoz3d = new THREE.Object3D();        
        this.c3Glaf.add(this.contPoz3d);

       /*  var axesHelper = new THREE.AxesHelper( 225 );
        this.contPoz3d.add( axesHelper ); */

        this.content3d = new THREE.Object3D();    
        this.contPoz3d.add(this.content3d);
        this.content3d.rotation.x=-Math.PI/2;

        this.colliL=undefined;
        this.colliR=undefined;
        this.bL=true;
        this.bR=true;

        this.collision = new CollisionRect();
        this.collision.colozi.disStick = 15;
        this.collision.colozi.isStick = true;

        setTimeout(function() {
            if(self.idArr==0){
                self.collision.plusColizi(self.par.array[1].collision, 1, 1)
                
            }
            if(self.idArr==1){
                self.collision.plusColizi(self.par.array[0].collision, 0, 0)
                self.collision.plusColizi(self.par.array[2].collision, 1, 1)
            }
            if(self.idArr==2){
                self.collision.plusColizi(self.par.array[1].collision, 0, 0)
                
            }
        }, 1);

        this.cP = new THREE.Object3D();    
        this.contPoz3d.add(this.cP);
        this.cP.position.z=-140
        this.cP1 = new THREE.Object3D();    
        this.contPoz3d.add(this.cP1);
        this.cP1.position.x=200
        this.cP1.position.z=-140

        this.contPoz3d.sten=this

        this.linerMetrik=new LinerMetrik(this);//отсечение коробок маркера
        this.lineVisi=new LineVisi(this, this.content3d);//линии 3д и текст
        this.butDrag=new ButDrag(this,function(t,p){//управление 3д кнопками
            trace("t,p",t,p,self._width)
        });
        this.korektMarker=new KorektMarker(this,function(t,p){

        });
        this.gMGm=new GMG(this)//стнека 2д


        this.dragBlok=function(b){
            this.lineVisi.dragBlok(b)
        }

        this.collision.debug=false;

        this.minusPanel=12;
        this.geometryPort = new GeometrySten();
        this.geometryPort.depth = 0;
        this.geometryPort.textureWidth= this.minusPanel*5
        this.geometryPort.textureHeight= this.minusPanel
        this.meshPort = new THREE.Mesh(this.geometryPort, this.par.materialPort);
        this.content3d.add(this.meshPort);
        this.meshPort.position.z=0.5




        this.geometry = new GeometrySten();
        this.geometry1 = new GeometrySten(); 
        this.geometry2 = new GeometrySten();
        this.geometry3 = new GeometrySten(); 

        this.geometry.depth = 0;
        this.geometry1.depth = this._depth//*0.5;        
        this.geometry1.rect.width=this._height
        this.geometry1.textureWidth=this._height

        this.geometry1.rect.height=this._height
        this.geometry1.textureHeight=this._height
        
        this.geometry2.depth = 0;
        this.geometry2._isDepth=false;
        this.geometry3.depth = this._depth;

        


        this.material=new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent:true,
            opacity:0.3,
            side: THREE.DoubleSide,
        })


        this.material1=new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent:true,
            opacity:0.3,
            side: THREE.DoubleSide,
        })
        this.matDinamik=this.material1;


        this.mesh = new THREE.Mesh(this.geometry, this.material);       
        this.mesh.sten=this;
        this.content3d.sten=this;
        this.par.par.par.visi3D.event3DArr.addChild(this.mesh)
        this.mesh.layers.set(31);
        this.mesh.sten=this;
        this.mesh.name=this._name3d
        
        this.mesh1 = new THREE.Mesh(this.geometry1, this.material1);
        this.mesh1.castShadow = true;
        this.content3d.add(this.mesh);
        this.content3d.add(this.mesh1); 
        this.mesh1.renderOrder=1;


        this.mesh2 = new THREE.Mesh(this.geometry2, this.gMGm.material);     
        this.content3d.add(this.mesh2);
        this.mesh2.renderOrder=2;

        this.mesh3= new THREE.Mesh(this.geometry3, this.material);
        this.content3d.add(this.mesh3);
        this.mesh3.renderOrder=2;


        this.krai3D=new Krai3D(this.content3d,this.material1,function(s,p){
            if(self.idArr==1)if(s=="visible"){self.geometry3.isLeft=!p}
        });
        this.krai3D1=new Krai3D(this.content3d,this.material1,function(s,p){
            if(self.idArr==1)if(s=="visible")self.geometry3.isRight=!p
        });
    
        this.krai3D.storona2=false;
        this.krai3D1.storona2=false;

        this.krai3D.mesh.renderOrder=1;
        this.krai3D1.mesh.renderOrder=2;

        if(self.idArr==0){
            self.geometry3.isRight=false
        }
        if(self.idArr==2){
            self.geometry3.isLeft=false
        }


        this.drag=function(){  
            this.geometry._textureWidth=this._width;
            this.geometry._textureHeight=this._height;
            this.geometry.setRect(0, 0, this._width, this._height);

            this.geometry1.setRect(0, 0, this._width, this._height);
            this.mesh1.position.set(0, 0, -this._depth);
            
            this.geometry2._textureWidth=this._width;
            this.geometry2._textureHeight=this._height;
            this.geometry2.setRect(0, 0, this._width, this._height);
            this.mesh2.position.set(0, 0, 0.1);

            if(this.idArr==1){
                trace(">>>",this.geometry2.arrBox)
            }

            this.geometry3._textureWidth=this._width;
            this.geometry3._textureHeight=this._height;
            this.geometry3.setRect(0, 0, this._width, this._height);
            this.mesh3.position.set(0, 0, -this._depth);

            this.collision.world.width = this._width;
            this.collision.world.height = this._height;

            this.geometryPort.setRect(0, 0, this._width, this.minusPanel);

            this.upDateRect()
            this.upkrai()
            this.par.dragScane()

            if(this.debag==true){
                this.w.width=this._width+20;
                this.w.height=this._height+32+20;

                this.deb.width=this._width+20;
                this.deb.height=this._height+20;
            }
        }


        this.upDateRect=function(){
            this.geometry2.update()
            this.geometry1.update();
            this.geometry3.update();
            this.geometryPort.update();
            this.lineVisi.upDate();
        }

        this.upkrai=function(){
            if(this.idArr==0){
                this.krai3D.visible=false;
                this.krai3D1.visible=true;
            }
            if(this.idArr==2){
                this.krai3D.visible=true;
                this.krai3D1.visible=false;
            }
            if(this.idArr==1){
                this.krai3D.visible=false;
                this.krai3D1.visible=false;
                if(this.par.children[0].active==true) this.krai3D.visible=true;
                if(this.par.children[2].active==true) this.krai3D1.visible=true;
            }

            this.krai3D1.mesh.scale.set(this._depth, this._height, -this._depth)
            this.krai3D1.mesh.position.x=this._width;
            this.krai3D.mesh.scale.set(-this._depth, this._height, -this._depth)
        }

        
        //2d init-------------------------------------------------------
        this.content=new PIXI.Container();
        this.graphics = new PIXI.Graphics();// Для дебаг отрисовки
        this.content.addChild(this.graphics);

        this.redrag=function(){
            this.graphics.clear(); 
            if(this._actBig==false)this.graphics.beginFill(this._color2d);
            else this.graphics.beginFill(this._colorBig);
            this.graphics.lineStyle(1, this._colorLine, 1);
            this.redragPosit();
            this.graphics.moveTo(this.arrayPoint2d[0].x, this.arrayPoint2d[0].y);
            this.graphics.lineTo(this.arrayPoint2d[1].x, this.arrayPoint2d[1].y);
            this.graphics.lineTo(this.arrayPoint2d[2].x, this.arrayPoint2d[2].y);
            this.graphics.lineTo(this.arrayPoint2d[3].x, this.arrayPoint2d[3].y);
            this.graphics.lineTo(this.arrayPoint2d[0].x, this.arrayPoint2d[0].y);

            this.graphics.lineStyle(2, 0xff0000, 1);
            this.graphics.moveTo(0, 0);
            this.graphics.lineTo(this._width, 0);
            this.drag();

            if(this.idArr==2){       
                this.button.x=this.arrayPoint2d[0].x; 
                this.button.height=this._width;
            }
            self.fun("intRend");
        }


        this.redragPosit=function(){
            this.arrayPoint[2].y=this.arrayPoint[3].y=-this._depth;
            this.arrayPoint[0].x=this.arrayPoint[3].x=0;            
            this.arrayPoint[1].x=this.arrayPoint[2].x=this._width;            
            if(this._sA==0){
                this.arrayPoint[0].x=-this._depth;
            }
            if(this._sA==2){
                this.arrayPoint[3].x=-this._depth;
            }
            if(this._sA1==0){
                this.arrayPoint[1].x=this._width+this._depth;
            }
            if(this._sA1==2){
                this.arrayPoint[2].x=this._width+this._depth;
            }

            var ww=20;
            this.arrayPoint2d[2].y=this.arrayPoint2d[3].y=-ww;
            this.arrayPoint2d[0].x=this.arrayPoint2d[3].x=0;            
            this.arrayPoint2d[1].x=this.arrayPoint2d[2].x=this._width;            
            if(this._sA==0){
                this.arrayPoint2d[0].x=-ww;
            }
            if(this._sA==2){
                this.arrayPoint2d[3].x=-ww;
            }
            if(this._sA1==0){
                this.arrayPoint2d[1].x=this._width+ww;
            }
            if(this._sA1==2){
                this.arrayPoint2d[2].x=this._width+ww;
            }
        }

        this.savePozot=function(){
            this.pointOld.x=this.x;
            this.pointOld.y=this.y;
            this.pointOld.w=this.width;
        }

        this.mouseOut = function (e) {
            
        };

        this.mouseOver = function (e) {
            
        };

        this.onDown = function (e) {

        };

        this.graphics.interactive = true;
        this.graphics.buttonMode = true;

        this.dCont=new DCont();
        this.wh=20
        this.button=new DButton(this.dCont, -this.wh/2, -this.wh/2," ",function(){

        })
        this.button.height=this.wh;
        this.button.width=this.wh;
        this.button.color="#aaaaaa";
        this.button.fun_mousedown = function(){  
            fun("onDown",self)
        }     

        //-------------------------------------------------------

        this.array = []
        this.children=this.array;
        this.add=function(blok, _isNotRemove){
            var isNotRemove=true
            if(_isNotRemove!=undefined)isNotRemove=_isNotRemove           
            if(blok.parent!=undefined)blok.parent.remove(blok); 

            var isAddedBlok = this.collision.addRect(blok.boxColizi, isNotRemove);
            
            if (!isAddedBlok) {
                if(blok.isAddBlokFalse){
                    if(blok.isAddBlokFalse()){

                    }else{
                        this.collision.removeRect(blok.boxColizi);                    
                        return false;  
                    }                    
                }else{
                    this.collision.removeRect(blok.boxColizi);                    
                    return false;  
                }                
            }
        

            this.array.push(blok);
            if(blok.content3d)this.content3d.add(blok.content3d);
            if(blok.content)this.gMGm.add(blok.content)
        
            if(blok.durRect!=undefined){                
                this.geometry1._arrBox.push(blok.durRect);
                this.geometry2._arrBox.push(blok.durRect);
                this.geometryPort._arrBox.push(blok.durRect);
            }
           
            this.upDateRect()
            this.par.indexAct=this.idArr;
            blok.parent=this;                   
        }


        this.remove=function(blok){
            var p = -1;
            var r = null;

            for (var i = 0; i < this.array.length; i++) {                
                if(this.array[i].idRandom==blok.idRandom){                    
                    p=i;
                }
            }  
                     
            if(p!=-1){
                if(blok.durRect!=undefined){  
                    for (var i = 0; i < this.geometry1._arrBox.length; i++) {                                                       
                        if(this.geometry1._arrBox[i].idArr==blok.idArr){
                            this.geometry1._arrBox.splice(i, 1);
                            this.geometry2._arrBox.splice(i, 1);
                            this.geometryPort._arrBox.splice(i, 1);
                        }
                    }
                }

                this.collision.removeRect(blok.boxColizi);

                r = this.array.splice(p, 1)[0];
                if(blok.content3d)this.content3d.remove(blok.content3d);            
                if(blok.content)this.gMGm.remove(blok.content);                
                this.upDateRect();                
                r.parent=undefined;
            } 
            return r;
        }

        this.setObj=function(o){             
            if(o.type!=this.type) return;            
            this.active = o.active;
            this.height = o.height;
            this.width=o.width;
            if(o.idMat!=undefined)this.idMat = o.idMat;
            
            this.redrag()
            if(this.idArr==0){
                this.content.y=this.width;
                this.c3Glaf.position.y=this.width;
            }
            if(this.idArr==2){
                this.content.x=this.par.array[1].width;
                this.c3Glaf.position.x=this.par.array[1].width;
            }


            setTimeout(function() {
                for (var i = 0; i < self.children.length; i++) {
             
                    if(self.children[i].type=="BPieceTop"){
                        self.children[i].dtagTime()
                    }
                    //if(this.array[i]!=undefined)this.array[i].setObj(o.children[i])
                }
                //self.redrag()
            }, 500); 

        } 

        this.getObj = function(){
            var o={}
            o.type=this.type;
            o.width=this.width;
            o.height=this.height
            o.active=this.active;
            o.children=[];
            o.idMat=this._idMat;
            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].getObj)
                    o.children.push(this.children[i].getObj()); 
            }          
            return o;           
        }

        this.colorA= new THREE.Color(this._color) 

        var bb
        this.recurcPI = function (v) {
            var r=v
            bb=false
            if(r>Math.PI){
                r-=Math.PI*2;
                bb=true
            }
            if(r<-Math.PI){
                r+=Math.PI*2;
                bb=true
            }
            if(bb) return this.recurcPI(r)  

            return r    
        }


        var vect=new THREE.Vector2()
        var vectNull=new THREE.Vector2()
        var vect1=new THREE.Vector2()
        var a,n
        this.fun_rotationZ = function (v, v1) {
            this.butDrag.fun_rotationZ(v, v1);
            a=this.recurcPI(v)
            a=(a)*180/Math.PI;
            n=-1;            
            this.cP.position.set(this._width/2,0,-140)

            vect.x= this.getPP(this.cP).x;
            if(vect.x>this.par.vect.x)n=1;

            calc.getVector(50,v1-Math.PI/2,vect1)

            this.cP1.position.x=vect1.x+this.cP.position.x;
            this.cP1.position.z=vect1.y*n+this.cP.position.z;
            
            vect.y= this.getPP(this.cP1).x; 

            if(vect.x>vect.y)this.avAct=false   
            else this.avAct=true
        }

        var vectorScreen = new THREE.Vector2(0,0); 
        this.posi=new THREE.Vector3(0,0,0);
        this.getPP=function(c3){    
            this.toScreenXY(c3.localToWorld(this.posi.clone()));
            return vectorScreen
        }
         
        this.toScreenXY = function(vector3) {
            vector3.project( visi3D.camera );            
            vectorScreen.x = Math.round( (   vector3.x + 1 ) * visi3D._width  / 2 ),
            vectorScreen.y = Math.round( ( - vector3.y + 1 ) * visi3D._height / 2 );
            return vectorScreen;
        }

        this.color ='#a3b3b3';
        this.drahAct=function(){
            if(this.boolNafig==true)return
            if(this._avAct==true){
                this.contPoz3d.notEvent=false
                this.mesh1.material=this.matDinamik;
                this.krai3D.material=this.matDinamik;
                this.krai3D1.material=this.matDinamik; 
                this.mesh3.material=this.material1;
                this.mesh1.visible=true
                this.mesh3.visible=false
                this.mesh2.visible=true

            } else{

                this.contPoz3d.notEvent=true               
                this.krai3D.material=this.material1;
                this.krai3D1.material=this.material1;
                this.mesh3.material=this.material1;
                this.mesh1.visible=false;
                this.mesh3.visible=true
                this.mesh2.visible=false;
            } 
        }

        var rr
        this.getMinStenHeight=function(){
            var r=0;
            if(this.children.length==0)return r; 
            for (var i = 0; i < this.children.length; i++) {            
                rr=this.children[i].boxColizi.rectCollisMeshdy.y+this.children[i].boxColizi.rectCollisMeshdy.height                    
                if(rr>r)r=rr;               
            }
            return r;
        }


        this.setTidMat=function(){
            setTimeout(function() {
                if(self.par.par.par.menuDiv!=undefined)self.par.par.par.menuDiv.nizMenu.setIdMat(self._idMat)
            }, 1);
        }

        var m=this.par.menedsher.mMaterial.geterMat.getTestTitle("sten");             
        this.idMatOld=m.idObj.id;
        self.idMat=m.idObj.id;
        this.debag=false;
        if(tStyle.glaf.debug==true)if(this.idArr==1)this.debag=true
        var box
        var yyy,zzz,xxx,pB;
        if(this.debag==true){
            this.deb=new DebbugPixi()          
            this.w=new DWindow(this.par.par.dCont, 1400, 0,"тест колизий");           
            this.w.content.div.appendChild(this.deb.div);
            var zx=10;

            this.collision.onUpdate=function(){                
                self.deb.deb.clear()
                self.deb.deb.drawRect(zx+this.world.x,zx+this.world.y,this.world.width,this.world.height,0x999999)
                for (var i = 0; i < this.colozi.arrBox.length; i++) {                    
                    box=this.colozi.arrBox[i]                   
                    self.deb.deb.drawRect(zx+box.x,zx+box.y,box.width,box.height,0x009900)
                }     

                for (var i = 0; i < self.collision.apc.length; i++) {                    
                    xxx=0;
                    pB=1;
                    if(self.collision.apc[i].storona==1){
                        xxx=self.collision.colozi.bigBox.width;
                        pB=-1
                    }
                    for (var j = 0; j < self.collision.apc[i].collision.colozi.arrBox.length; j++) {                        
                        box=self.collision.apc[i].collision.colozi.arrBox[j];
                        if(box.boolZ){     
                            if(self.collision.apc[i].storona==0){
                                zzz=self.collision.apc[i].collision.colozi.bigBox.width -( box.x+box.width); 
                            }                              
                            if(self.collision.apc[i].storona==1){
                                zzz=box.x; 
                            }
                            self.deb.deb.drawRect(zx+xxx,zx+box.y,box.depth*pB,box.height,0x000099);
                            self.deb.deb.drawRect(zx+xxx+20*pB,zx+box.y,5,zzz,0x990000);
                        }
                    }
                }
            }
        }

        this.drawTestUp=function(){
            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].drawTestUp!=undefined)this.children[i].drawTestUp()
            }
        }

        this.boolNafig=false
        this.nafig=function(b){
            this.boolNafig=b
            if(b==true){
                this.mesh1.visible=false
                this.mesh3.visible=false
                this.mesh2.visible=false


                this.krai3D.visible=false;
                this.krai3D1.visible=false;          

            }else{
                this.drahAct()
                this.upkrai()
            }
            this.meshPort.visible=!this.boolNafig
        }





        /*this.getb3=function(sten){
            let a=[]
            for (var i = 0; i < this.children.length; i++) {
                
                this.children[i]
            }
        }*/


        //сверяем две полосы
        this.test2d=function(ps,pf,ps1,pf1){  
           // trace(ps,pf,ps1,pf1)          
            if(ps1>=ps &&ps1<=pf)return true;
            if(ps>=ps1 &&ps<=pf1)return true;
            return false;
        }


        this.mWFun=function(){
            trace("mWFun!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",this.idArr)
            //trace(this.content3d.position, this.c3Glaf.position)
            if(this.idArr==0){//крайня первая
                let ww =this._maxWidth;
                let ww1 =this._width-this._maxWidth;
                let ee=0
                let eee=0
                let r={x:0,w:0, y:0, h:0,z:0,d:0};
                let r1={x:0,w:0, y:0, h:0,z:0,d:0};
                let ot=0;
                let col= this.collision.arrRect; 
                let col1= this.collision.apc[0].collision.arrRect;  
                for (var i = 0; i < col.length; i++) {                
                    
                    r.x=0
                    r.w=col[i].rectCollisMeshdy.depth

                    r.y=-(this.c3Glaf.position.y-col[i].rectCollisMeshdy.x-col[i].rectCollisMeshdy.width);
                    r.h=col[i].rectCollisMeshdy.width

                    r.z=col[i].rectCollisMeshdy.y;  
                    r.d=col[i].rectCollisMeshdy.height;
                    
                    for (var j = 0; j < col1.length; j++) {
                        r1.x=col1[j].rectCollisMeshdy.x;
                        r1.w=col1[j].rectCollisMeshdy.width

                        r1.y=-ww1;
                        r1.h=col1[j].rectCollisMeshdy.depth;

                        r1.z=col1[j].rectCollisMeshdy.y;
                        r1.d=col1[j].rectCollisMeshdy.height;
                        
                        if(this.test2d(r.x, r.x+r.w, r1.x, r1.x+r1.w)){
                            if(this.test2d(r.y, r.y+r.h, r1.y, r1.y+r1.h)){
                                if(this.test2d(r.z, r.z+r.d, r1.z, r1.z+r1.d)){
                                    ee=r1.h
                                    if(ee>eee)eee=ee;
                                }                                
                            }                         
                        }                 
                    }                    
                }                
                ww+=eee
                return ww    
               // 
            }

            if(this.idArr==1){//центральная
                let ww =this._maxWidth;
                let ww1 =this._width-this._maxWidth;
                let ee=0
                let eee=0
                let r={x:0,w:0, y:0, h:0,z:0,d:0};
                let r1={x:0,w:0, y:0, h:0,z:0,d:0};
                let ot=0;
                let col= this.collision.arrRect; 
                let col1= this.collision.apc[1].collision.arrRect; 
               
                for (var i = 0; i < col.length; i++) {                
                    
                    r.x=col[i].rectCollisMeshdy.x;
                    r.w=col[i].rectCollisMeshdy.width

                    r.y=0//-ww1;
                    r.h=col[i].rectCollisMeshdy.depth;

                    r.z=col[i].rectCollisMeshdy.y;
                    r.d=col[i].rectCollisMeshdy.height;
                    
                    for (var j = 0; j < col1.length; j++) {
                        r1.x=this.width-col1[j].rectCollisMeshdy.depth;
                        r1.x=ww-col1[j].rectCollisMeshdy.depth;
                        r1.w=col1[j].rectCollisMeshdy.depth
                        r1.y=col1[i].rectCollisMeshdy.x//-col1[j].rectCollisMeshdy.width;
                        r1.h=col1[j].rectCollisMeshdy.width;

                        r1.z=col1[j].rectCollisMeshdy.y;
                        r1.d=col1[j].rectCollisMeshdy.height;
                        
                        if(this.test2d(r.x, r.x+r.w, r1.x, r1.x+r1.w)){
                            if(this.test2d(r.y, r.y+r.h, r1.y, r1.y+r1.h)){
                                if(this.test2d(r.z, r.z+r.d, r1.z, r1.z+r1.d)){
                                    
                                    ee=r1.w
                                    if(ee>eee)eee=ee;
                                }                                
                            }                         
                        }                 
                    }                    
                }   
                           
                ww+=eee
                return ww  
            }

            if(this.idArr==2){//крайня дальняя
                return this._maxWidth
            }


            return this._maxWidth
        }
    }



          

    set pozZdvig(v) {
        if(this._pozZdvig!=v){
            this._pozZdvig = v;            
            this.mesh.position.z=v
        }       
    }   
    get pozZdvig() { return  this._pozZdvig;}


    set avAct(v) {
        if(this._avAct!=v){
            this._avAct = v;           
            this.drahAct()  
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].avAct=this._avAct
            }            
        }       
    }   
    get avAct() { return  this._avAct;}


    set maxWidth(v) {
        if(v<70)return
        if(this._maxWidth!=v){
            this._maxWidth = v;           
        }       
    }   
    get maxWidth() { return  this._maxWidth;}


    set color(v) {
        if(this._color!=v){
            this._color = v;                      
            this.material1.color = new THREE.Color(this._color)
            this.colorA = new THREE.Color(this._color) 
        }       
    }   
    get color() { return  this._color;}


    set name3d(v) {
        if(this._name3d!=v){
            this._name3d = v;                  
            this.mesh.name=this._name3d;
        }       
    }   
    get name3d() { return  this._name3d;}


    set rotation(v) {
        if(this._rotation != v){
            this._rotation = v;
            this.content.rotation = v;
            this.c3Glaf.rotation.z=v;            
        }        
    } 
    get rotation() { return  this._rotation;}


    set x(v) {        
        this.c3Glaf.position.x=v;
        this.content.x = v;
        this.dCont.x = v;
    } 
    get x() { return  this.content.x;}


    set y(v) {
        this.c3Glaf.position.y=v;
    } 
    get y() { return  this.content.y;}


    set width(v) {
        if(this._width!=v){
            this._width = v; 
           // this.setka.width = v;  
           //console.warn("w",v)        
            this.butDrag.width = v;
            this.redrag();
            this.gMGm.width = this._width;
        }       
    }   
    get width() { return  this._width;}


    set height(v) {
        if(this._height!=v){
            this._height = v;  
            this.geometry1.rect.width=this._height
            this.geometry1.textureWidth=this._height
            this.geometry1.rect.height=this._height
            this.geometry1.textureHeight=this._height
            this.gMGm._height=this._height;
            this.butDrag.height = v;            
            for (var i = 0; i < this.children.length; i++) {                 
                if(this.children[i].drahShadow){                    
                    this.children[i].drahShadow()
                }
            }
            this.gMGm.draw() 
            this.redrag()
        }       
    }   
    get height() { return  this._height;}


    set depth(v) {
        if(this._depth!=v){
            this._depth = v;
            this.geometry1.depth = this._depth;            
            this.redrag();
        }       
    }   
    get depth() { return  this._depth;}


    set active(v) {
        if(this._active!=v){
            this._active = v;            
            if(this._active==true){
                this.contPoz3d.visible=true                
            }else{
                this.contPoz3d.visible=false
            }
            this.par.upkrai();
            this.par.menedsher.dragPriceScane()
            this.butDrag.actSten=v
        }       
    }   
    get active() { return  this._active;}


    set active2(v) {
        if(this._active2!=v){
            this._active2 = v;            
            this.lineVisi.content3d.visible=this._active2;
            if(v==true){
                this.lineVisi.upDate();
                this.material1.color.r= this.colorA.r*0.95;
            }else{
                this.lineVisi.upDate();
                this.material1.color.r=this.colorA.r*1; 
            }
        }       
    }   
    get active2() { return  this._active2;}


    set actBig(v) {
        if(this._actBig!=v){
            this._actBig = v;            
            this.redrag();
        }       
    }   
    get actBig() { return  this._actBig;}    


    set sA(v) {
        if(this._sA!=v){
            this._sA = v;            
            this.redrag();
        }       
    }   
    get sA() { return  this._sA;}


    set sA1(v) {
        if(this._sA1!=v){
            this._sA1 = v;            
            this.redrag();
        }       
    }   
    get sA1() { return  this._sA1;}


    set idMat(v) {        
        if(this._idMat!=v){                                 
            var m=this.par.menedsher.mMaterial.geterMat.getIDReturn(v);              
            if(m!=null)  {                                     
                this._idMat= v;
                this.matDinamik=m; 
                                               
                this.drahAct(); 
                if(this.idArr==0){
                    this.par.matShpaler.matSten=m;                    
                    if(this.par.par.par.menuDiv!=undefined)this.par.par.par.menuDiv.nizMenu.setIdMat(this._idMat)
                    else this.setTidMat();

                                     
                }
            } 
        }       
    }   
    get idMat() { return  this._idMat;}


    set visiMark(v) {
        if(this._visiMark!=v){
            this._visiMark = v;            
            this.korektMarker.visiMark = v;   
        }       
    }   
    get visiMark() { return  this._visiMark;}

    
    set lmActive(v) {
        if(this._lmActive!=v){
            this._lmActive = v;            
            this.linerMetrik.active= v;   
        }       
    }   
    get vlmActive() { return  this._lmActive;}    
}



//линии 3д и текст
export class LineVisi  {
    constructor(sten, cont3d) {         
        this.type="LineVisi";
        var self=this;  
        this.par=sten;
        this.h=70
        this.content3d = new THREE.Object3D();  
        this.content3d.rotation.x=-Math.PI/2      
        cont3d.add(this.content3d);        
        this.array=[];

        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {               
                this.array[i].object3d.visible=false;
            }
        }   

        this.getArrow=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].object3d.visible==false){
                    this.array[i].object3d.visible=true;
                    return this.array[i];
                }
            }
            this.array.push(new TArrow(this.content3d,0,0));
            this.array[this.array.length-1].idArr=this.array.length-1;
            this.array[this.array.length-1].height=-this.h        
            this.array[this.array.length-1].textScale=10;
            this.array[this.array.length-1].label._fontFamily="SFUIDisplay-Bold"
            this.array[this.array.length-1].label.gage=0.2
            this.array[this.array.length-1].label.fontSize=12;
            this.array[this.array.length-1].label.cont3d.position.z=0.2
            return this.array[this.array.length-1]
        }


        var arrow,bb;
        var aP=[]
        var aP1=[]
        var maxWidth 
        this.upDate=function(){ 
            if(sten._active2==false)return; 
            this.clear();
            aP=[]
            aP1=[]
            aP.push(0);
            var x,x1
            maxWidth=70
            for (var i = 0; i < this.par.children.length; i++) {
                bb=true;
                if(this.par.children[i].type=="BDoor"||this.par.children[i].type=="BWindow") {
                    x=this.par.children[i].x+this.par.children[i].rect[0]-this.par.children[i].rect[3]/2;
                    x1=this.par.children[i].x+this.par.children[i].rect[3]/2+this.par.children[i].rect[0];                    
                    aP.push(Math.round(x));
                    aP.push(Math.round(x1));
                    if( maxWidth<x1)maxWidth=x1;                   
                    bb=false
                }                

                if(this.par.children[i].type=="BPieceTop"){
                    x=this.par.children[i].x-this.par.children[i].visiBPT._width/2-1.5;
                    x1=this.par.children[i].x+this.par.children[i].visiBPT._width/2+1.5;
                    if(this.par.children[i].activObject==true){
                        aP.push(Math.round(x));
                        aP.push(Math.round(x1)); 
                    }
                    if( maxWidth<x1)maxWidth=x1;
                    bb=false;
                }

                if(bb==true){
                    x=this.par.children[i].x+this.par.children[i].rect[0];
                    x1=this.par.children[i].x+this.par.children[i].rect[3]+this.par.children[i].rect[0];                    
                    if(this.par.children[i].activObject==true){
                        aP.push(Math.round(x));
                        aP.push(Math.round(x1)); 
                    }
                    if( maxWidth<x1)maxWidth=x1
                }
             
                if(this.par.children[i].type=="BPieceTop"){
                    for (var j = 0; j < this.par.children[i].children.length; j++) {                       
                        if(this.par.children[i].children[j].type=="BPieceObject"){
                            x=this.par.children[i].children[j].x+this.par.children[i].x+this.par.children[i].children[j].object.mod.r1[0];
                            x1=this.par.children[i].children[j].x+this.par.children[i].x-this.par.children[i].children[j].object.mod.r1[0]//+this.par.children[i].children[j].object.mod.r1[2];
                            if(this.par.children[i].children[j].activObject==true){
                                aP.push(Math.round(x));
                                aP.push(Math.round(x1)); 
                            }
                            if( maxWidth<x1)maxWidth=x1
                        }                                              
                    }
                }
            }
            this.par.maxWidth=maxWidth
        }

        this.dragBlok=function(b){  
            this.upDate()
        }
    }
}


