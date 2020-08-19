/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

блок окно
*/

import { Blok } from './Blok.js';
import { RectCollis } from '../collision/CollisionRect.js';
export class BWindow extends Blok {
    constructor(mO, o, idArr, fun) {
        super( mO, o, idArr, fun)
        this.type = "BWindow";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.arrayMesh=[];  
        this._width=this.rect[3];
        this._height=this.rect[5];
        this.wO=100;
        this._widthOld=100;
        this._heightOld=100;
        this._boolLeft=false;
        this._boolTop=false;
        this.byZdvig=false

        this.durRect = {x:-50,y:0,width:100, height:100, idArr:this.idArr};       
        this.creatBC=function(){
            this.boxColizi = new RectCollis(
                -this.width/2,
                -this.height/2,
                this.object.mod.r[3],
                this.object.mod.r[5], this.dCol);
            this.boxColizi.parent = this;
            this.rect[0]=0
            this.rect[3]=this._width; 
            this.boxColizi.rectCollisMeshdy.depth=this.object.mod.r[4];         
        }

          
        this.funInit=function(){            
            self.boxColizi.rectCollisMeshdy.boolZ=false
        }


        this.aa=["width","height","copy","clear"]
        this.aaSob=function(s,p){           
            if(s=="clear"){
                self.mO.par.clear(self);
                self.clear()
                self.mO.activIndex=-1;  
            }
            if(s=="copy")self.mO.par.copy(self);
            if(s=="mirrorY")self.boolTop=p;
            if(s=="mirrorX")self.boolLeft=p;
            if(s=="width"){                
                self.width=self._widthOld+p.y;
            }
            if(s=="height"){
                self.height=self._heightOld+p.y;
            } 
            setTimeout(function() {self.fun("visi3d");}, 10);               
        }


        this.setAA=function(aa){  
            this._widthOld=this._width;
            this._heightOld=this._height;           
            aa.setParam("mirrorY", self.boolTop);
            aa.setParam("mirrorX", self.boolLeft);
        }       

        this.durXY=function(x,y){            
            this.durRect.x=this.x-this.width/2;
            this.durRect.width=this.width;
            this.durRect.y=this.y-this.height/2;
            this.durRect.height=this.height;
            if(this.parent!=undefined){               
                this.parent.upDateRect();                
            } 
        }


        var a,aa
        this.funInitMod = function(){
            var o=self.cont3dLoad.children[0];
            self.cont3dLoad.position.y=-50
            self.cont3dLoad.position.z=-10

            for (var i = 0; i < o.children.length; i++) {
                if(o.children[i].name.indexOf("md")!=-1){
                    a=o.children[i].name.split("_");
                    aa=a[0].split("md");
                    this.arrayMesh[aa[1]*1]=o.children[i];
                }
            }            

            this.cont= new THREE.Object3D();
            self.cont3dLoad.add(this.cont);

            this.arrayMesh[0] = new THREE.Object3D();
            this.cont.rotation.x=Math.PI/2;
            this.cont.add(this.arrayMesh[0]);

            this.arrayMesh[12].renderOrder=1;
            this.arrayMesh[0].add(this.arrayMesh[9])//дверь 
            this.arrayMesh[0].add(this.arrayMesh[12])//низ петля            
            //this.arrayMesh[0].add(this.arrayMesh[13])//верх петля
            this.arrayMesh[0].add(this.arrayMesh[11])//ручка
            this.arrayMesh[0].add(this.arrayMesh[8])//замок на двери

            this.cont.add(this.arrayMesh[10])
            this.cont.add(this.arrayMesh[7])
            this.cont.add(this.arrayMesh[6])          
           
            this.funDrag()
        }


        this.testRect = function(){            
            this.boxColizi.x= -this._width/2;
            this.boxColizi.sx=-this._width/2;
            this.boxColizi.width=this._width 
            this.boxColizi.rectCollisMeshdy.width=this._width;
            this.boxColizi.rectCollisMeshdy.x=this.boxColizi.rectCollisMeshdy.x
            this.boxColizi.y= this._height/2;
            this.boxColizi.height = this._height;
            this.boxColizi.rectCollisMeshdy.height = this._height;
            this.boxColizi.rectCollisMeshdy.y=this.boxColizi.rectCollisMeshdy.y
            this.boxColizi.y=this._height/2
            this.boxColizi.sy=-this._height/2;
           
            self.cont3dLoad.position.y=-this._height/2;            
            if(!this.parent)return false
            this.parent.collision.drawDegug() 
            if(this.parent!=undefined){
                this.parent.collision.testRect(this.boxColizi);
            } 
            return true
        }


        var s=1;
        var s1=1;
        var ott=5
        this.funDrag = function(){
            if(this.arrayMesh.length==0)return            
            if(this.testRect()==false){
             
            }
               

            this.arrayMesh[1].scale.y=(this._height-10)/50;
            this.arrayMesh[1].position.z=-(this._height-5);            
            this.arrayMesh[1].position.x=-this._width/2

            this.arrayMesh[2].position.z=-(this._height);
            this.arrayMesh[2].position.x=-this._width/2

            this.arrayMesh[3].position.z=-(this._height);
            this.arrayMesh[3].position.x=-this._width/2+5
            this.arrayMesh[3].scale.x=(this._width-10)/50;

            this.arrayMesh[4].position.z=-(this._height);
            this.arrayMesh[4].position.x=this._width/2-5;

            this.arrayMesh[5].position.z=-(this._height-5);
            this.arrayMesh[5].position.x=this._width/2-5;
            this.arrayMesh[5].scale.y=(this._height-10)/50;

            this.arrayMesh[0].position.y=0;
            this.arrayMesh[0].position.x=-this._width/2+5;

            s=this._boolLeft ? -1 : 1;
            s1=this._boolTop ? -1 : 1; 

            this.cont.scale.x=s1;
            this.cont.scale.y=s;

            this.arrayMesh[9].scale.x=(this._width-10)/50;
            this.arrayMesh[9].position.x=0;            
            this.arrayMesh[11].position.x=this._width-10-10  
            this.arrayMesh[11].position.z=-this._height/2
            this.arrayMesh[10].position.x=this._width/2-5
            this.arrayMesh[8].position.x=-5

            this.arrayMesh[7].position.set(-(this._width/2-5),0,-10)//верх петля
            this.arrayMesh[6].position.set(-(this._width/2-5),0,-(this._height-5-10))//верх петля

            this.arrayMesh[12].position.set(-5,0,-(this._height))//низ петля 
            this.arrayMesh[12].scale.z=(this._height)/100;
            this.arrayMesh[12].scale.x=(this._width)/100;

            this.draw2d();
            self.durXY()
        }  


        var bin=false
        this.dragParent=function(){
            if(this.parent){
                if(bin==false){
                    bin=true;
                    this.funDrag()
                }
            }
        }


        var p={x:0,y:0,x1:0,y1:0}
        var hh=0;
        this.draw2d = function(){
            
        }

        this.maxW=10000;
        this.maxH=10000;
        var arr=[]
        var m,mmm,bb
        this.dragMaxW = function(){
            if(this.parent==undefined){
                this.maxW=10000;                
            }else{               
                arr.length=0;
                arr.push(this.parent.collision.world.x,this.parent.collision.world.width);
                for (var i = 0; i < this.parent.collision.arrRect.length; i++) {                    
                    if(this.parent.collision.arrRect[i].idRandom!=this.boxColizi.idRandom){
                        if(this.parent.collision.arrRect[i].rectCollisMeshdy.y<this._height){
                           arr.push(this.parent.collision.arrRect[i].rectCollisMeshdy.x,this.parent.collision.arrRect[i].rectCollisMeshdy.x+this.parent.collision.arrRect[i].rectCollisMeshdy.width); 
                        }                        
                    }
                }
                m=9999;
                mmm=-9999;
                for (var i = 0; i < arr.length; i++) {
                    if(this.boxColizi.rectCollisMeshdy.x+10<arr[i]) if(m>arr[i])m=arr[i];
                    if(this.boxColizi.rectCollisMeshdy.x+10>arr[i]) if(mmm<arr[i])mmm=arr[i];                    
                }
                this.maxW=m-mmm;
            }
        }


        var bbMi,b
        this.dragMaxH = function(){
            if(this.parent==undefined){
                this.maxH=10000;                
            }else{               
                arr.length=0;
                bbMi=this.boxColizi.rectCollisMeshdy
                arr.push(this.parent.collision.world.y,this.parent.collision.world.height);
                for (var i = 0; i < this.parent.collision.arrRect.length; i++) {                    
                    if(this.parent.collision.arrRect[i].idRandom!=this.boxColizi.idRandom){
                        bb=this.parent.collision.arrRect[i].rectCollisMeshdy;
                        b=false                        
                        if(bbMi.x+bbMi.width>bb.x){
                            if(bbMi.x<bb.x){
                                b=true                                
                            }                            
                        }
                        
                        if(bbMi.x+bbMi.width>bb.x+bb.width){
                            if(bbMi.x<bb.x+bb.width){
                                b=true                                
                            }                            
                        }

                        if(b!=false) {
                            arr.push(bb.y,bb.y+bb.height); 
                        }                                               
                    }
                }
                m=9999
                mmm=-9999
                for (var i = 0; i < arr.length; i++) {
                    if(this.boxColizi.rectCollisMeshdy.y+10<arr[i]) if(m>arr[i])m=arr[i];
                    if(this.boxColizi.rectCollisMeshdy.y+10>arr[i]) if(mmm<arr[i])mmm=arr[i];                    
                }
                this.maxH=m-mmm;
            }
        }


        this.stopDrag=function(){            
            if(this.parent==undefined){                
                if(this.boolOTS==false)return;  
                if(this.objts)if(this.objts.parent){
                    this.objts.parent.add(this)                   
                    this.setXYPosit(this.objts.x,this.objts.y);                    
                    this.fun("visi3d");
                }
            }                    
        }

        this.objts=undefined;
        this.tsSet=function(){ 
            if(this.boolOTS==false)return;         
            if(this.parent==undefined)return;
            this.objts=this.getObj();
            this.objts.parent=this.parent;
        }

        this.getObj = function(){
            var obj={}
            obj.type=this.type;
            obj.id=this.id;
            obj.x=self.content3d.position.x;
            obj.y=self.content3d.position.y;
            obj.width=this.width;
            obj.height=this.height;
            obj.children=[];            
            return obj;            
        }


        this.setObj = function(obj){            
            this.setXYPosit(obj.x,obj.y);
            this.width=obj.width;
            this.height=obj.height;
            this.rect[0]=0
            this.rect[3]=this._width;
            this.rect[2]=-this._height;
            this.rect[5]=this._height;
            this.boxColizi.rectCollisMeshdy.x=obj.x-this._width/2
            this.boxColizi.rectCollisMeshdy.y=obj.y-this._height/2
            return obj;            
        }


        this.dragObjHA=function(bH, a){        
            if(a[3]>0 && a[4]>0 && a[5]>0){            
                bH.width=a[3];
                bH.position.x=a[0];
                bH.height=a[4];
                bH.position.z=a[1]+a[4]/2;
                bH.depth=a[5];
                bH.position.y=-a[2]-a[5];                 
            }
        }

        this.sobKey = function(tip,e,arrNa){
            let b=false;
          
            let xxx= this.boxColizi.position._x;
            let yyy= this.boxColizi.position._y;   
            
            if(tip=="down"){
                if(e.keyCode==37 || e.keyCode==65)  {                   
                    xxx=this.boxColizi.position._x-this.mO.stepKey;                   
                    b=true
                }
                if(e.keyCode==39 || e.keyCode==68)  {                  
                    xxx=this.boxColizi.position._x+this.mO.stepKey;                    
                    b=true
                }

                if(e.keyCode==38 || e.keyCode==87)  {
                    yyy+=this.mO.stepKey;
                    b=true;
                    
                }
                if(e.keyCode==40 || e.keyCode==83)  {
                    yyy-=this.mO.stepKey;
                    b=true;
                  
                }

                if(yyy<this.boxColizi.height/2)yyy=this.boxColizi.height/2;
                if(this._parent){
                    if(yyy>this._parent.height-this.boxColizi.height/2)yyy=this._parent.height-this.boxColizi.height/2;                    
                }

                
               
                if(xxx<this.boxColizi.width/2)xxx=this.boxColizi.width/2;
                if(this._parent){
                    if(xxx>this._parent.width-this.boxColizi.width/2)xxx=this._parent.width-this.boxColizi.width/2;                    
                } 
                this.setXY(xxx,yyy);
                if(b){                    
                    this.fun("visi3d");                    
                    this.mO.par.par.visiActiv.setObject(this);  
                }                
            }  
        }


        this.dragObjHA(self.boxHelper, this.rect);
        this.prosZ=12
        this.dragObjNWD();

    }

    set width(v) {
        this.dragMaxW();
        if(v>this.maxW)v=this.maxW
        if(v<40)v=40   
        if(this._width!=v){            
            this.wO=this._width
            this._width = v;
            this.rect[0]=0
            this.rect[3]=this._width;            
            this.dragObjNWD();
        }       
    }   
    get width() { return  this._width;}

    
    set height(v) {
        this.dragMaxH()
        if(v>this.maxH)v=this.maxH
        if(v<40)v=40      
        if(this._height!=v){
            this._height = v;
            this.rect[2]=-this._height;
            this.rect[5]=this._height;
            this.dragObjNWD();
        }       
    }       
    get height() { return  this._height;}


    set boolLeft(v) {
        if(this._boolLeft!=v){
            this._boolLeft = v;            
            this.dragObjNWD();
        }       
    }       
    get boolLeft() { return  this._boolLeft;}
    

    set boolTop(v) {
        if(this._boolTop!=v){
            this._boolTop = v;              
            this.dragObjNWD();
        }       
    }       
    get boolTop() { return  this._boolTop;}
}
