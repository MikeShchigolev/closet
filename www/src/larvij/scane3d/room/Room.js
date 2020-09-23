/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.



онова для комнаты 3д
*/
import { Sten } from './Sten.js';
import { Menedsher } from './Menedsher.js';
import { GeometrySten } from './GeometrySten.js';

import {VisiActiv } from './VisiActiv.js';

import { DrahHelp3D } from './DrahHelp3D.js';

export class Room  {
    constructor(scane3d, fun) {         
        this.type="Room";
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        window.roomBig=this
        var self=this;
        this._sahMenu=0
        this.par=scane3d;
        this._color="#ffffff";
        this._name3d="null";
        this._height=275;
        this._depth = 20;// толшина
        this._indexAct=-1;
        this._visiMark=false;
        this._lmActive=false;
        this._materialBase=null
        this._materialBase1=null
        this._materialBase2=null       
        this.children=[]
        this.array=[];
        this.fun=fun

        this.content3d = new THREE.Object3D();        
        this.par.content3d.add(this.content3d);
        this.content3d.position.z=this._height/2;

        this.matShpaler=new MatShpaler(this)    

        /*var loader = new THREE.TextureLoader();
        var textur=loader.load("resources/image/nizXZ1.png",function(){
                
        });
        
        this.materialPort = new THREE.MeshPhongMaterial({ 
            side:THREE.BackSide,
            map:textur 
        }); */
        this.materialPort =this.matShpaler.material

        this._idMatObject = null;
        this._idMatObject1 = null;
        this._idMatObject2 = null;



        this.sob=function(type, param){                    
            fun(type, param);
        }

        this.menedsher=new Menedsher(this, function(type, param){            
            fun(type, param)
        });
        
        for (var i = 0; i < 3; i++) {
            this.array[i]=new Sten(this, this.content3d,i,this.sob);
            this.children[i]=this.array[i];            
        }  
              
            
        this.upkrai=function(){
            for (var i = 0; i <this.array.length; i++) {
                this.children[i].upkrai();
            }
            this.niz.upkrai()
        }

        this.dragScane=function(){
            this.niz.upkrai()
        }
        this.niz=new Niz(this)
      

        this.visiActiv=new VisiActiv(this);


        this.drahHelp3D=new DrahHelp3D(this,scane3d.dCont);

        var dd=0.5
        this.visiActiv.vaBox.rect3d.x=-dd
        this.visiActiv.vaBox.rect3d.y=-dd
        this.visiActiv.vaBox.rect3d.z=-dd

        this.visiActiv.vaBox.rect3d.w=dd*2
        this.visiActiv.vaBox.rect3d.h=dd*2
        this.visiActiv.vaBox.rect3d.d=dd*2

        this.upDate=function(){
            this.drahHelp3D.upDate()
        }

        this.clearScane = function(){
            this.menedsher.menedsherObject.clear()
            this.array[0].active=false;
            this.array[0].width=300;
            this.array[1].active=true;
            this.array[1].width=300;
            this.array[2].active=false;
            this.array[2].width=300;

            this.idSten=this.array[0].idMatOld;
            this.niz.idMat=this.niz.idMatOld;
            this.par.par.scane2d.stens.setOt();   
            this.par.visi3D.intRend=1;
        }


        this.getObj = function(){
            var o={}
            o.color=this.color;           
            o.visiMark=this.visiMark;
            o.height=this.height;            
            o.children=[]
            for (var i = 0; i < this.array.length; i++) {
                o.children[i]=this.array[i].getObj()
            }
            o.niz=this.niz.getObj();
            o.idMatObject=this.idMatObject
            o.idMatObject1=this.idMatObject1
            o.idMatObject2=this.idMatObject2
            return o;
            
        }

        this.setObj=function(o){ 
          
            if(o==undefined)  return;  
            if(o.color!=undefined)this.color=o.color
            if(o.idMatObject!=undefined)  this.idMatObject=  o.idMatObject;
            if(o.idMatObject1!=undefined)  this.idMatObject1=  o.idMatObject1;
            if(o.idMatObject2!=undefined)  this.idMatObject2=  o.idMatObject2;
            if(o.height!=undefined)  this.height=  o.height;
            if(o.children==undefined)  return;
            for (var i = 0; i < o.children.length; i++) {
                if(this.array[i]!=undefined)this.array[i].setObj(o.children[i])
            }            
            if(o.visiMark!=undefined) this.visiMark=  o.visiMark;            
            this.menedsher.setObj(o); 
            this.niz.setObj(o.niz);        
            this.par.par.scane2d.stens.setOt();       
        }

        this.vect=new THREE.Vector2()

        this.fun_rotationZ = function (v,v1) {
            this.vect= this.array[0].getPP(this.content3d);
            for (var i = 0; i < this.array.length; i++) {                
                this.array[i].fun_rotationZ(v,v1);
            }
            this.visiActiv.fun_rotationZ(v,v1)
        }

        this.sizeWindow = function(w,h,s){                
            this.drahHelp3D.sizeWindow(w,h,s);
        }

        this.sobKey = function(tip,e,arrNa){ 
            this.menedsher.sobKey(tip,e,arrNa);
        } 


        this.dragMin=function(a, b){
            
            if(!b){
                a[0]=self.array[0].maxWidth;
                a[1]=self.array[1].maxWidth;
                a[2]=self.array[2].maxWidth;
            }else{
                a[0]=self.array[0].mWFun();
                a[1]=self.array[1].mWFun();
                a[2]=self.array[2].mWFun();
            }
            



        } 


        this.pozZdvigAll=function(dist){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].pozZdvig=dist;
            }
        }  

        this.setTidMat=function(){
            setTimeout(function() {
                if(self.par.par.menuDiv!=undefined)self.par.par.menuDiv.nizMenu.setIdMatObject(self._idMatObject)
            }, 1);
            this.par.visi3D.intRend=1;
        }

        this.dragColor=function(m){
            
        }

        /*var nameStartMat="m_8";
        nameStartMat=this.par.par.par.objectBase.three[1].array[0].id
        

        var m=this.menedsher.mMaterial.geterMat.getIDReturn(nameStartMat,true);
        this.idMatObjectOld = m.idObj.id         
        this.idMatObject=m.idObj.id*/

        var rr
        this.getMinStenHeight=function(){
            var r=0
            for (var i = 0; i < this.array.length; i++) {
                rr=this.array[i].getMinStenHeight();
                if(rr>r)r=rr;
            }
            return r;
        }
        
        this.sah=0
        this.dragTimeVM=function(){
            if(this._visiMark==true)return
            this.sah++;
            var s=this.sah;
            setTimeout(function() {
                if(self.sah==s)self.dTVM()
            }, 100); 
        }

        this.dTVM=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].korektMarker.draw()
            }  
            fun("visi3d")          
        }

        this.drawTestUp=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].drawTestUp()
            }  
            fun("visi3d")
        }
        
        this.nafig=function(b){
            if(b==true){
                this.niz.m.visible=false
                this.niz.c3dl.visible=false
                this.niz.mesh.visible=false

                
            }else{
                this.niz.m.visible=true
                this.niz.c3dl.visible=true
                this.niz.mesh.visible=true
                
            }
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].nafig(b)
            }
        }
    }

    set materialBase(v) {
        this._materialBase = v;        
        this.menedsher.materialBase=this._materialBase;
        this.fun("visi3d")
    }
    get materialBase() { return  this._materialBase;}


    set idMatObject(v) {
        if(this._idMatObject!=v){
           
            this._idMatObject = v;
                            
            this.menedsher.mMaterial.geterMat.idColor=v;
            this.menedsher.setIdColor(v, "idMatObject");            
            this.materialBase=this.menedsher.mMaterial.geterMat.getIDReturn(this._idMatObject); 
           /*if(this.par.par.menuDiv!=undefined)this.par.par.menuDiv.nizMenu.setIdMatObject(this._idMatObject)
            else this.setTidMat();*/
            this.par.visi3D.intRend=1;
        }       
    }   
    get idMatObject() { return  this._idMatObject;}


    set idMatObject1(v) {
        if(this._idMatObject1!=v){
            this._idMatObject1 = v;
            
            this.materialBase1=this.menedsher.mMaterial.geterMat.getIDReturn(this._idMatObject1);
            this.menedsher.setIdColor(v, "idMatObject1");          
            this.par.visi3D.intRend=1;

        }       
    }   
    get idMatObject1() { return  this._idMatObject1;}    

    set idMatObject2(v) {
        if(this._idMatObject2!=v){
            this._idMatObject2 = v;
            this.materialBase2=this.menedsher.mMaterial.geterMat.getIDReturn(this._idMatObject2);
            this.menedsher.setIdColor(v, "idMatObject2");          
            this.par.visi3D.intRend=1;
        }       
    }   
    get idMatObject2() { return  this._idMatObject2;} 

    set color(v) {
        if(this._color!=v){
            this._color = v;          
            for (var i = 0; i < 3; i++) {
                this.array[i].color = v;  
            }
        }       
    }   
    get color() { return  this._color;}


    set indexAct(v) {
        if(this._indexAct!=v){
            this._indexAct = v;          
            for (var i = 0; i < this.array.length; i++) {
                if(this._indexAct==i)this.array[i].active2 = true;
                else this.array[i].active2 = false;
            }         
        }       
    }   
    get indexAct() { return  this._indexAct;}


    set height(v) {
        if(this._height!=v){
            var minH=this.getMinStenHeight()           
            this._height = v;
            if(this._height<minH) this._height=minH 
            this.menedsher.menedsherObject.activIndex=-1; 
            this.visiActiv.height = this._height;
            this.content3d.position.z=this._height/2;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].height = this._height;
            }
            this.par.par.scane2d.sliderHHH.value=this._height*10
        }       
    }   
    get height() { return  this._height;}


    set depth(v) {
        if(this._depth!=v){
            this._depth= v;            
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].depth = v;
            }
            this.niz.depth=this._depth
        }       
    }   
    get depth() { return  this._depth;}


    set name3d(v) {
        if(this._name3d!=v){
            this._name3d = v;            
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].name3d = v;
            }
        }       
    }   
    get name3d() { return  this._name3d;}


    set idSten(v) {         
        if(this._idSten!=v){
            this._idSten = v;    
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].idMat = v;
            }
            this.par.par.visi3D.intRend=1;
        }       
    }   
    get idSten() { return  this._idSten;}


    set visiMark(v) {         
        if(this._visiMark!=v){
            this._visiMark = v;    
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visiMark = v;
            }
            this.menedsher.menedsherObject.visiMark=this._visiMark;
            this.par.par.visi3D.intRend=1;
        }       
    }   
    get visiMark() { return  this._visiMark;}


    set lmActive (v) {
        if(this._lmActive!=v){
            this._lmActive = v;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].lmActive = v;
            } 
            this.fun("visi3d") 
        }       
    }   
    get vlmActive() { return  this._lmActive;}
}


export class Niz  {
    constructor(room, fun) {         
        this.type="Niz";
        this.par=room
        var self=this;
        this._depth = 2;
        this._otstup = 10;
        this._idMat="null"
        this._height=room._height
        this._bPtioriti=false;
        this.m=undefined
        this.material=new THREE.MeshPhongMaterial({
            color: 0x999999,           
            side: THREE.DoubleSide,
        });
        this._dS=10
        this.ddd=0.5
        this.hh=100
        this.ww= 100   
        this.geometry = new GeometrySten();
        this.geometry.depth = this.ddd;
        this.geometry.rect.width=this._height
        this.geometry.textureWidth=this._height
        this.geometry.rect.height=this._height
        this.geometry.textureHeight=this._height
        this.m = new THREE.Mesh(this.geometry,this.material);
        this.m.position.z=-this.ddd;
        this.m.castShadow = true;
        room.content3d.add(this.m);        

        this.c3dl = new THREE.Object3D();      
        room.content3d.add(this.c3dl);        
        this.light = new THREE.PointLight( 0xdcf1fa, 0.25, 250 ); 
        this.c3dl.add(this.light);

        this.mesh=new THREE.Mesh(new THREE.BoxBufferGeometry( 1, 1, 1 ),this.material)
        room.content3d.add(this.mesh);
        room.par.par.visi3D.objShadow(this.mesh, true)

        var b,b1;
        var xz,yz,xzB,www;

        this.hh2=0
        this.bbb=false
        room.par.par.visi3D.event3DArr.addChild(this.mesh);

        this.upkrai=function(){            
            var w=room.children[1].width+this._otstup*2;  
            b=true;
            xz=0
            yz=0
            xzB=0
            if(room.children[0].active==true || room.children[2].active==true)  b=false; 
            if(this._bPtioriti==true)b=true  
            this.bbb=b;          
            var h=0;
            var hh=0;           
            h=room.children[2].width
            if(h<room.children[0].width) h=room.children[0].width            
            this.hh2=hh=h
            if(b==true)hh=0 
            www=w
            h+=this._otstup*2;

            if(b==true){
                h=room.children[2].width
                if(h<room.children[0].width) h=room.children[0].width
                w-=this._otstup*2;
                xz=this._otstup;
            }else{           
                if(room.children[0].active==true&&room.children[2].active==false){
                    w-=this._otstup
                    xzB=-this._otstup/2
                }
                if(room.children[0].active==false&&room.children[2].active==true){
                    w-=this._otstup
                    xz=this._otstup;
                    xzB=this._otstup/2;
                }             
                h-=this._otstup
            }

            var plusH=0;
            if(this._bPtioriti==true)plusH=this._otstup

            this.mesh.position.y=room.children[1].contPoz3d.position.y+h/2-this._otstup+plusH/2;         
            this.mesh.scale.set(w, h+plusH, this._depth*2);
            this.mesh.position.z=this._depth;
            this.mesh.position.x=room.children[0].contPoz3d.position.x+www/2-this._otstup + xzB              

            room.content3d.position.x=-room.children[1].width/2;
            room.content3d.position.y=-hh/2;
           
            var zz1=0;
            var zz2=0;
            if(room.children[0].active==true)zz1=this._dS
            if(room.children[2].active==true)zz2=this._dS    
            if(plusH==10)this.geometry.setRect(0, this._dS, w, h+plusH-this._dS);
            else this.geometry.setRect(zz1, this._dS, w-zz1-zz2, h+plusH-this._dS);


            this.m.position.x=-this._otstup+xz;
            this.m.position.y=-this._otstup+yz; 
            this.hh=h       
            this.ww=room.children[1].width
            this.c3dl.position.x=(w-this._otstup*2)/2;
            if(h==this._otstup*2){
                this.c3dl.position.y=this.c3dl.position.x;
            }else{
                this.c3dl.position.y=(h-this._otstup*2)/2;
            }
            this.light.distance=this.c3dl.position.y*3;
            this.c3dl.position.z=-135;
        }


        this.getObj = function(){
            var o={}
            o.idMat=this._idMat;
            return o;            
        }


        this.setObj=function(o){   
            if(o==undefined)  return; 
            this.idMat =o.idMat                     
        }


        this.setTidMat=function(){
            setTimeout(function() {
                if(self.par.par.par.menuDiv!=undefined)self.par.par.par.menuDiv.nizMenu.setIdNiz(self._idMat)
            }, 1);
            this.par.par.visi3D.intRend=1;
        }

        var m=room.menedsher.mMaterial.geterMat.getTestTitle("niz"); 
        this.idMatOld = m.idObj.id         
        self.idMat=m.idObj.id       
    }

    set idMat(v) {
        if(this._idMat!=v){                     
            var m=this.par.menedsher.mMaterial.geterMat.getIDReturn(v);  
            if(m!=null)  {
                this.mat=m;
                this._idMat= v;
                this.m.material=this.mat;                
                if(this.par.par.par.menuDiv!=undefined)this.par.par.par.menuDiv.nizMenu.setIdNiz(this._idMat)
                else this.setTidMat();
                this.par.par.visi3D.intRend=1;
            } 
        }       
    }   
    get idMat() { return  this._idMat;}


    set depth(v) {    
    }   
    get depth() { return  this._depth;}

    set bPtioriti(v) {
        if(this._bPtioriti!=v){
            this._bPtioriti= v;            
            this.upkrai();            
        }    
    }   
    get bPtioriti() { return  this._bPtioriti;}   
}


export class MatShpaler  {
    constructor(par, fun) {  
        var self=this       
        this.type="MatShpaler";
        this.par=par;
        this._color=null
        this._matSten=undefined;

        var loader = new THREE.TextureLoader();
        var textur=loader.load("resources/image/nizXZ.png",function(){
                
        });


        
        this.material = new THREE.MeshPhongMaterial({            
            side:THREE.BackSide,
            map:textur 
        });

        this.getCol=function(o){
            return "#" + ((1 << 24) + (o.r*255 << 16) + (o.g*255 << 8) + o.b*255).toString(16).slice(1);
        }


        this.dragColor=function(){ 
            this.color=this.getCol(this._matSten.color)
            setTimeout(function() { self.color=self.getCol(self._matSten.color)}, 100);
            setTimeout(function() { self.color=self.getCol(self._matSten.color)}, 1000);
            setTimeout(function() { self.color=self.getCol(self._matSten.color)}, 2000);
        }  
        
    }

    set color(v) {
        if(v=="#ffffff")return
        if(this._color!=v){            
            this._color = v;
            let c=new THREE.Color()
            let p=1.2;
            c.r=this._matSten.color.r*p;
            c.g=this._matSten.color.g*p;
            c.b=this._matSten.color.b*p;


            this.material.color=c
            this.par.fun("visi3d");
        }       
    }   
    get color() { return  this._color;}

    set matSten(v) {
        if(this._matSten!=v){
            this._matSten = v;            
            this.dragColor();
        }       
    }   
    get matSten() { return  this._matSten;}
}


