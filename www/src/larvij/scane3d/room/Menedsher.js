
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

мненеджер разруливает процессы драгов и хронит дерево




*/


import { Blok } from './blok/Blok.js';
import {  BDoor } from './blok/BDoor.js';
import {  BWindow } from './blok/BWindow.js';
import {  BTumba } from './blok/BTumba.js';
import {  BTVstavka } from './blok/BTVstavka.js';

import {  BTBox } from './blok/BTBox.js';
import {  BTBoxVstavka } from './blok/BTBoxVstavka.js';

import {  BPieceObject } from './blok/BPieceObject.js';
import {  BPieceTop } from './blok/BPieceTop.js';
import {  MUtilit  } from './MUtilit.js';
import { MenedsherMaterial } from './MenedsherMaterial.js';


export class Menedsher  {
    constructor(room, fun) {         
        this.type="Menedsher";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.fun=fun;
        this.par=room;
        this.whDrag=1500;        
        this.plus=room.par.par.par.plus;
        this._materialBase=null;
        this.csvConfigArray=room.par.par.par.csvConfigArray


        this.matNull = new THREE.MeshPhongMaterial({
            color:0x0000ff,
            transparent:true,
            opacity:0.3
        });

        this.mPanel = new THREE.Mesh(new THREE.BoxBufferGeometry(this.whDrag,this.whDrag,0.001),this.matNull);
        this.mPanel.layers.set(31);

        //var axesHelper = new THREE.AxesHelper( 15 );
        //this.mPanel.add( axesHelper );


        this.content3d = new THREE.Object3D();
        room.content3d.add(this.content3d);       
        this.glaf=this.par.par.par; 
        this.visi3D=this.par.par.par.visi3D;         
        this.object=undefined;
        self.objectOld=undefined;

        this.menedsherObject = new MenedsherObject(this,function(s,p){//менеджер обьектов
            fun(s,p)
        });
        this.menedsherObject.setOB(this.par.par.par.main.objectBase);

        this.mMaterial = new MenedsherMaterial(this,function(s,p){//менеджер матерьялов
            fun(s,p)
        });

        this.mUtilit = new MUtilit(this,function(s,p){
            fun(s,p)
        });

 
        this.mMaterial.setConfig(
            this.par.par.par.visi3D,  
            this.par.par.par.main.objectBase,
            this.par.par.par.server
        )
        
        this.menedsherObject.geterMat=this.mMaterial.geterMat

        this.clear=function(blok){            
            if(blok.parent!=undefined)blok.parent.remove(blok)
            self.fun("visi3d");
        }

        this.copy=function(blok){
            console.log("FIXE")
        }


        this.dragPriceScane=function(){
            if(this.par.par.par.menuDiv)            
            this.par.par.par.menuDiv.mani.dragPriceScane2(this.menedsherObject.array)
        }




        this.startObj=function(obj){
            //console.warn("#########@@@###",obj.obj)
            this.menedsherObject.csvTest(obj.obj);
            this.start(this.menedsherObject.getBlok(obj.obj));
        }


        this.start=function(obj){            
            this.stop();
            this.visi3D.position3d.pause=true;
            this.par.name3d='xzPoisk';            
            this.object=obj;
            this.objectOld=obj;
            this.object.activObject=true;            
            this.menedsherObject.activIndex=this.object.idArr
            if(this.object.tsSet)this.object.tsSet()                
            this.visi3D.addEvent("move", this.move);
            if (dcmParam.mobile==false)document.addEventListener("mouseup", self.mouseup);
            else document.addEventListener("touchend", self.mouseup);
        }

        
        this.stop=function(){             
            this.par.pozZdvigAll(0)
            this.pointZdvig.set(0,0,0)
            if(self.mPanel.parent!=undefined) self.mPanel.parent.remove(self.mPanel) 
            if(this.object)if(this.object.stopDrag!=undefined)this.object.stopDrag()
            this.visi3D.position3d.pause=false;
            if(this.object)if(this.object.parent==undefined)this.object.clear();
            this.par.name3d='null';            
            if(this.object)this.object.activObject=false
            this.object=undefined;          
            this.visi3D.removeEvent("move", this.move); 

            if (dcmParam.mobile==false)document.removeEventListener("mouseup", self.mouseup);
            else document.removeEventListener("touchend", self.mouseup);            
        }


        this.mouseup = function (e) { 
            self.stop();
            self.par.par.tudaSuda.saveMod() 
            self.par.drawTestUp()            
        }


        this.sten
        this.pointZdvig=new THREE.Vector3(0,0,0)
        var intersects
        var _xx, _yy, _bb
        var stenDown
        this.move = function (e) { 
            
            if(e)if(e.target)if(e.target.sten){ 
                
                if(self.object!=undefined){

                    _bb=true
                    if(self.object.parent!=undefined)
                    if(self.mPanel.parent!=undefined)     
                    
                    if(stenDown!=undefined){
                        if(self.object.parent.parent!=undefined)if(self.object.parent.parent.idArr==stenDown.idArr)_bb=false
                        if(self.object.parent!=undefined)if(self.object.parent.idArr==stenDown.idArr)_bb=false    
                    }                         

                    if(_bb==false){                            
                        intersects=self.par.par.par.visi3D.event3DArr.raycaster.intersectObjects([self.mPanel], true);                        
                        if(intersects[0]){
                            _xx=self.pointZdvig.x + (intersects[0].uv.x-0.5)*self.whDrag;
                            _yy=self.pointZdvig.y + (intersects[0].uv.y-0.5)*self.whDrag;
                            self.object.setXY(_xx, _yy)                    
                            self.fun("visi3d");
                            self.par.visiActiv.dragActiv() 
                            _bb=false
                        }                                                
                    } 

                    if(_bb==true){
                        _xx=e.uv.x*e.target.sten.width;
                        _yy=e.uv.y*e.target.sten.height;
                        self.object.setXY(_xx, _yy)                    
                        self.fun("visi3d");
                        self.par.visiActiv.dragActiv() 
                    }                    
                }
            } 

            if(self.object)if(self.object.parent==undefined){
                self.over(e)

            } 
        }


        this.out = function (e) { 
            if(self.par.par.bactive==false)return          
            if(e)if(e.target)if(e.target.sten){                
                self.sten=undefined
                if(self.object!=undefined){//разруливаем тоскаемый элемент                    
                    if(self.object.parent!=undefined){  
                        //trace("<<out<<remove")                       
                        e.target.sten.remove(self.object); 
                        var l=self.getLink(self.object.object)                        
                        self.glaf.dragPic.start(32, l, null,null,true);
                        self.dragPriceScane()  
                        self.fun("visi3d"); 

                    }
                    if(self.object.outDrag)self.object.outDrag()
                }
            }
            //trace("<<")
            window.document.body.style.cursor = "auto";    
            blok=null 
            self.par.visiActiv.dragActiv()       
        }

      
        this.over = function (e) { 
            
            
            if(self.par.par.bactive==false)return
            if(e)if(e.target){
                if(e.target.sten){
                    //strace(">>")
                    self.sten=e.target.sten
                    if(self.object!=undefined){//разруливаем тоскаемый элемент                    
                        if(self.object.parent==undefined){
                            let b=true;
                            intersects=self.par.par.par.visi3D.event3DArr.raycaster.intersectObjects([self.mPanel], true);
                            _xx=self.pointZdvig.x + (intersects[0].uv.x-0.5)*self.whDrag;
                            _yy=self.pointZdvig.y + (intersects[0].uv.y-0.5)*self.whDrag;

                            if(self.object.isOver!=undefined)b=self.object.isOver(e.target.sten,_xx,_yy)
                            /*if(e.target.sten.collision.isRect(self.object.boxColizi)==false){
                                b=false;
                            }*/
                            trace(mHelp.dCNM)

                            //if(b){//если можно пихнуть
                                e.target.sten.add(self.object);
                                self.move(e)
                                self.glaf.dragPic.stop();
                                self.dragPriceScane()   
                           /* }else{
                                mHelp.setHelp("Данный обьект не может быть размещен, не хватает пространства","resources/image/mhelp.png",mHelp.dCNM,{x:13,y:-13});
                            }*/
                            

                        }
                        self.fun("visi3d");
                        if(self.object.overDrag)self.object.overDrag()                   
                    }
                } 

                blok=self.poiscParam(e.target,"blok");
                if(blok!=null){                    
                    window.document.body.style.cursor = "pointer";  
                }
            }
            self.par.visiActiv.dragActiv()
        }

        this.clik1 = function (e) {           
            self.menedsherObject.activIndex=-1;
        }

        this.getLink=function(o){
            var r="resources/data/"+o.id+"/100.png"+this.plus;           
            if(o.resurs)if(o.resurs.array)if(o.resurs.array.length!=0){                
                for (var i = 0; i < o.resurs.array.length; i++) {
                    if(o.resurs.array[i].b!=undefined){                        
                        if(o.resurs.array[i].i=="icon"){
                            r="resources/data/"+o.id+"/resources/"+o.resurs.array[i].name+this.plus;
                            break;
                        }
                    }
                }
            }
            return r
        }

        var blok=null
        var p={x:0,y:0}
        this.down = function (e) {           
            if(self.par.par.bactive==false)return
            if(e){
                if(e.target){
                    blok=self.poiscParam(e.target,"blok");
                    self.testActSten(e.target)
                    if(blok!=null){                                          
                        p.x=e.originalEvent.clientX;
                        p.y=e.originalEvent.clientY;
                        self.par.par.dubag.setBlok(blok); 
                        self.start(blok);                                           
                        self.downZdig(e,blok)
                        if(blok.dragStart)  blok.dragStart()
                    }else{
                        
                        self.glaf.dragPic.testDrag(1, self.clik1, null);  
                    }                    
                }
                
            }else{
                if(blok==null) self.menedsherObject.activIndex=-1;
            }            
            self.fun("visi3d");
        }



        this.pointOld=new THREE.Vector3();
        var xx,xx1,xx2,xx3
        var oo
        var hh,hh1
        this.downZdig = function (e,b) {  
            if(b.parent==undefined)return;

            if(b.parent.pozZdvig!=undefined){
                stenDown=b.parent
                if(b.parent.idArr==0){
                    
                    hh1=0;
                    if(self.par.children[2].width>self.par.children[0].width) {
                        hh1=-(self.par.children[2].width-self.par.children[0].width)/2
                    }                    
                    hh=b.parent.width/2+hh1; 

                    
                   
                    this.mPanel.position.x= hh - e.point.z
                    this.mPanel.position.y= e.point.y+ this.par._height/2 
                    this.mPanel.position.z= this.par.niz.ww/2+e.point.x
                }

                if(b.parent.idArr==1){
                    this.mPanel.position.x= e.point.x + b.parent.width/2 
                    this.mPanel.position.y= e.point.y+ this.par._height/2 
                    this.mPanel.position.z= this.par.niz.hh2/2+e.point.z
                    if(this.par.niz.bbb==true){                            
                        this.mPanel.position.z=e.point.z
                    }
                }

                if(b.parent.idArr==2){ 

                    hh1=0;
                    if(self.par.children[0].width>self.par.children[2].width) {
                        hh1=(self.par.children[0].width-self.par.children[2].width)/2
                    }                    
                    hh=b.parent.width/2+hh1;

                    this.mPanel.position.x= e.point.z + hh
                    this.mPanel.position.y= e.point.y+ this.par._height/2 
                    this.mPanel.position.z=this.par.niz.ww/2-e.point.x
                }

                b.parent.content3d.add(this.mPanel);
                this.pointZdvig.x=b.content3d.position.x
                this.pointZdvig.y=b.content3d.position.y
            }else{
                if(b.parent.parent.pozZdvig!=undefined){
                    stenDown=b.parent.parent;

                    if(b.parent.parent.idArr==0){

                        

                        hh1=0;
                        if(self.par.children[2].width>self.par.children[0].width) {
                            hh1=-(self.par.children[2].width-self.par.children[0].width)/2
                        }                    
                        hh=b.parent.parent.width/2+hh1; 

                       // this.mPanel.position.x= b.parent.parent.width/2 - e.point.z
                        this.mPanel.position.x= hh - e.point.z
                        this.mPanel.position.y= e.point.y+ this.par._height/2 
                        this.mPanel.position.z= this.par.niz.ww/2+e.point.x
                    }

                    if(b.parent.parent.idArr==1){
                        this.mPanel.position.x= e.point.x + b.parent.parent.width/2 
                        this.mPanel.position.y= e.point.y+ this.par._height/2 
                        this.mPanel.position.z= this.par.niz.hh/2+e.point.z
                        if(this.par.niz.bbb==true){
                            this.mPanel.position.z= this.par.niz.hh/2+e.point.z
                            this.mPanel.position.z=-4+e.point.z
                        }                        
                    }

                    if(b.parent.parent.idArr==2){

                        hh1=0;
                        if(self.par.children[0].width>self.par.children[2].width) {
                            hh1=(self.par.children[0].width-self.par.children[2].width)/2
                        }                    
                        hh=b.parent.parent.width/2 +hh1;

                          

                        this.mPanel.position.x= e.point.z + hh
                        this.mPanel.position.y= e.point.y+ this.par._height/2 
                        this.mPanel.position.z= this.par.niz.ww/2-e.point.x                       
                    }

                    b.parent.parent.content3d.add(this.mPanel);
                    this.pointZdvig.x=b.content3d.position.x+b.parent.content3d.position.x
                    this.pointZdvig.y=b.content3d.position.y+b.parent.content3d.position.y

                }
            }
        }


        this.clik = function () {            
            self.objectOld.setAA(self.aroundButton)
            self.fun("visi3d");
        }

        self.testActSten=function(c){           
            if(c.sten!=undefined){
                room.indexAct=c.sten.idArr;
                return
            }
            if(c.parent!=undefined)self.testActSten(c.parent)
        }


        this.poiscParam = function (o,p) {
            if(o[p]!=undefined)return o[p];
            if(o.parent!=undefined)return this.poiscParam(o.parent, p)
            return null;
        }         


        this.visi3D.addEvent("out", this.out);        
        this.visi3D.addEvent("over", this.over);
        this.visi3D.addEvent("down", this.down);

        
        this.setIdColor = function (idColor) {
            this.menedsherObject.setIdColor(idColor);
        }


        self.glaf.dragPic.addFunAp(function(){        
            if(self.glaf.dragPic.object!=undefined){            
                if(self.glaf.dragPic.object.id!=undefined){
                    if((self.glaf.dragPic.object.id+"").indexOf("m_")!=-1){                     
                        if(blok!=null){                            
                            blok.idColor=self.glaf.dragPic.object.id;
                        }                        
                    }
                }
            }
        })

        this.objectL
        this.setObj=function(o){  
            this.menedsherObject.clear();
            this.objectLoad=o;  
                      
            if(this.testLoad()==true){
                this.setObjPostLoad(); 
            }           
        }

        this.testLoad=function(f){ 
            var a=[];
            for (var i = 0; i < this.objectLoad.children.length; i++) {
                for (var j = 0; j < this.objectLoad.children[i].children.length; j++) {
                    a.push(this.objectLoad.children[i].children[j].id)
                    for (var k= 0; k < this.objectLoad.children[i].children[j].children.length; k++) {
                        a.push(this.objectLoad.children[i].children[j].children[k].id)
                    }         

                }
            }
            if(this.menedsherObject.testIdObj(a)!=-1){                
                this.menedsherObject.loadID(a,function(){
                    self.setObjPostLoad()
                })
                return false;
            }
            return true;
        }


        this.setObjPostLoad=function(){            
            for (var i = 0; i < this.objectLoad.children.length; i++) {                
                this.par.array[i].collision.activ = false;
                for (var j = 0; j < this.objectLoad.children[i].children.length; j++) {
                    var ooo=this.menedsherObject.getIdObj(this.objectLoad.children[i].children[j].id);                    
                    if(ooo!=null){    
                                                            
                        blok=this.menedsherObject.getBlok(ooo.obj)                        
                        blok.setObj(this.objectLoad.children[i].children[j])
                        this.par.array[i].add(blok, false);                       
                    }                 
                }
                this.par.array[i].collision.activ = true;
                this.par.array[i].collision.drawDegug()                
            }
            self.dragPriceScane() 
            setTimeout(function() {
                self.dragPriceScane(); 
            }, 1000);
        }
    }

    set materialBase(v) {
        this._materialBase = v;
        this.menedsherObject.materialBase=v;
        this.mMaterial.materialBase=v;     
    }
    get materialBase() { return  this._materialBase;}
}




export class MenedsherObject  {
    constructor(penedsher, fun) {
        this.type="MenedsherObject";
        var self=this;
        this.par=penedsher;
        this.visi3D=penedsher.par.par.par.visi3D;    
        this.fun= fun   
        this.array=[];
        this.arrayHron=[];
        this._materialBase=undefined;
        this.objectBase=undefined;
        this.arrayKey=["fbx", "3ds", "gltf"];
        this.wN=[50,75,100];
        this.hN=[58,35]; 


        this._visiMark = false; 

        this.loaderFBX// = new THREE.FBXLoader();
        this.loaderTDS// = new THREE.TDSLoader();
        this.loaderGLTF = new THREE.GLTFLoader();
        this.material = new THREE.MeshPhongMaterial({color:0xff0000});

        this.gBox=new THREE.BoxBufferGeometry( 1, 1, 1 )
        this.matNull = new THREE.MeshPhongMaterial({
            color:0xffffff,
            transparent:true,
            opacity:0.3
        });
        this.matRed = new THREE.MeshPhongMaterial({
            color:0x476875,
            transparent:true,
            opacity:0.3
        });
        this.matRed1 = new THREE.MeshPhongMaterial({
            color:0xff0000,
            transparent:true,
            opacity:0.7
        });
        this.mat2 = new THREE.MeshPhongMaterial({
            color:0x00ff00,
            transparent:true,
            opacity:0.7
        });

        this.dragPriceScane=function(){ 
            this.par.dragPriceScane()
        }

        this.testIdObj=function(a){            
            for (var i = 0; i < this.objectBase.bd.length; i++) {
                for (var j = 0; j < a.length; j++) {
                    if(a[j]==this.objectBase.bd[i].id){
                        if(this.objectBase.bd[i].obj==undefined) return i                        
                    }
                }
            }
            return -1
        }
        
        this.fDrag
        this.loadID=function(a, f){
            if(f!=undefined)self.fDrag=f;
            var ii=self.testIdObj(a);
            if(ii==-1){

                self.fDrag()
                return
            }           
            self.loadID2(a, self.objectBase.bd[ii])
        }

        this.loadID2=function(a, o){            
            $.ajax({
                url: "resources/data/"+o.id+"/config.json"+this.par.plus,
                success: function function_name(data) { 
                    if(typeof data === "string") {
                        var conf = JSON.parse(data)
                        o.obj = self.csvTest(conf);
                    } else o.obj = self.csvTest(data); 


                    self.loadID(a)            
                },
                error:function function_name(data) {
                    console.log("Что то случилось с конфигом")
                }
            }); 
        }


        this.csvTest=function(o){
            if(this.par.csvConfigArray==undefined)return o;
            
            for (var i = 0; i < this.par.csvConfigArray.length; i++) {
                
                if(this.par.csvConfigArray[i].id*1==o.id*1){
                    
                    o.info=this.par.csvConfigArray[i]
                   
                   // trace("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
                    

                    //this.setObjArr(o,this.par.csvConfigArray[i])
                    
                    return o

                }
            }
            return o
        }
        this.setObjArr=function(obj, a){
            if(obj)
            if(obj.plus){ 
                if(a[3]){
                    obj.plus[0]=a[2];
                    obj.plus[3]=a[3]; 
                }               
                if(a[5]){
                    obj.plus1[0]=a[4];
                    obj.plus1[3]=a[5];
                }
            }                
        } 


        this.objA={}

        var aaa
        this.getRendomID =function(str){
            if(this.objA[str]==undefined){  
                this.objA[str]={}
                this.objA[str].sah=0
                this.objA[str].array=[];
                this.objA[str].arsah=[];               
                for (var i = 0; i < this.objectBase.bd.length; i++) {               
                    if(str==this.objectBase.bd[i].title){                        
                        this.objA[str].array.push(this.objectBase.bd[i]);
                        this.objA[str].arsah.push(0);
                    }               
                }                    
            }            


            aaa=[];             
            for (var i = 0; i < this.objA[str].arsah.length; i++) {
                if(this.objA[str].arsah[i]==this.objA[str].sah)aaa.push(i)//this.objA[str].array[i])
            }

            if(aaa.length==0){
                this.objA[str].sah++;
                for (var i = 0; i < this.objA[str].arsah.length; i++) {
                    if(this.objA[str].arsah[i]==this.objA[str].sah)aaa.push(i)//this.objA[str].array[i])
                }
            }
            
            if(aaa.length!=0){
                var p=Math.round(Math.random()*(aaa.length-1)) 
                this.objA[str].arsah[aaa[p]]++;                
                return this.objA[str].array[aaa[p]];
            }
            return null;
        }




        this.getIdObj=function(id){           
            return this.getIdRecurs(id, this.objectBase.bd);
        }
        
        this.getIdRecurs=function(id,arr){
            
            var r=null
            for (var i = 0; i < arr.length; i++) {
                if(arr[i].id==id) {

                    return arr[i];  
                }             
                if(arr[i].array){
                    r=this.getIdRecurs(id, arr[i].array)
                    if(r!=null)return r;
                }
            }
            return null;
        }


        this.blokTumba
        this.btBox
        this.objB2={}
        this.setOB=function(oo){
            this.objectBase=oo 
            for (var i = 0; i < this.objectBase.bd.length; i++) {
                this.objB2[this.objectBase.bd[i].id]=this.objectBase.bd[i];
            }

            for (var i = 0; i < this.objectBase.bd.length; i++) {
                if(this.objectBase.bd[i].title=="tumbaBase"){
                    var ii=i;
                    $.ajax({
                        url: "resources/data/"+this.objectBase.bd[ii].id+"/config.json"+self.par.plus,
                        success: function function_name(data) {
                            if(typeof data === "string") {
                                var conf = JSON.parse(data)
                                self.objectBase.bd[ii].obj = self.csvTest(conf);
                            } else{                                
                                self.objectBase.bd[ii].obj = self.csvTest(data);
                            }  

                            self.blokTumba = new BTumba(self, self.objectBase.bd[ii].obj, -1 ,self.sob);
                            self.blokTumba.init();
                        },
                        error:function function_name(data) {
                            console.log("Что то случилось с конфигом")
                        }
                    });
                    i=99999
                    break
                }
            }

            for (var i = 0; i < this.objectBase.bd.length; i++) {
                if(this.objectBase.bd[i].title=="btBox"){
                    
                    var ii=i;
                    $.ajax({
                        url: "resources/data/"+this.objectBase.bd[ii].id+"/config.json"+self.par.plus,
                        success: function function_name(data) {
                            if(typeof data === "string") {
                                var conf = JSON.parse(data)
                                self.objectBase.bd[ii].obj = self.csvTest(conf);
                            } else{                                
                                self.objectBase.bd[ii].obj = self.csvTest(data);
                            }  

                            self.btBox = new BTBox(self, self.objectBase.bd[ii].obj, -1 ,self.sob);
                            self.btBox.init();
                            
                        },
                        error:function function_name(data) {
                            console.log("Что то случилось с конфигом")
                        }
                    });
                    i=99999
                    break
                }
            }




            for (var i = 0; i < this.objectBase.bd.length; i++) {
                if(this.objectBase.bd[i].title=="pieceTop"){
                    var iii=i
                    $.ajax({
                        url: "resources/data/"+this.objectBase.bd[iii].id+"/config.json"+self.par.plus,
                        success: function function_name(data) {                         
                            if(typeof data === "string") {
                                var conf = JSON.parse(data)
                                self.objectBase.bd[iii].obj = self.csvTest(conf);
                            } else self.objectBase.bd[iii].obj = self.csvTest(data); 

                            self.pieceTop = new BPieceTop(self, self.objectBase.bd[iii].obj, -1 ,self.sob);
                            self.pieceTop.init();
                        },
                        error:function function_name(data) {
                            console.log("Что то случилось с конфигом")
                        }
                    });
                    i=99999
                    break
                }
            }
        }

        this.korektActiv =function(blok){           
            setTimeout(function() {
                self.par.par.visiActiv.korektActiv(blok)
            }, 1);            
        }       


        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear()
            }
        }




        this.sob=function(s,p){
            fun(s,p)
        }

        this.getBigobj=function(id){
            for (var i = 0; i < this.objectBase.bd.length; i++) {
                if(this.objectBase.bd[i].id==id)return this.objectBase.bd[i]
            }
            return null

        }

        var blok
        this.getBlok=function(o){    
            blok=null;             
            if(o.str[0]=="BGroup"){
                blok=this.getGroup(o)                
                if(blok.drapPlus!=undefined){                    
                    blok.drapPlus=true
                }
                return this.getGroup(o)                 
            }

            if(this.objB2[o.id].obj==undefined)this.objB2[o.id].obj=o;

            for (var i = 0; i < this.array.length; i++) {                               
                if(this.array[i].id==o.id){
                    if(this.array[i].parent==undefined){
                        this.array[i].clear()
                        return this.array[i];
                    }
                }
            }

           
            if(o.str[0]=="BDoor") blok=new BDoor(this, o, this.array.length,this.sob); 
            if(o.str[0]=="BWindow") blok=new BWindow(this, o, this.array.length,this.sob);               
            if(o.str[0]=="BTumba") blok=new BTumba(this, o, this.array.length,this.sob);   
            if(o.str[0]=="BTVstavka") blok=new BTVstavka(this, o, this.array.length,this.sob);
            if(o.str[0]=="BPieceObject") blok=new BPieceObject(this, o, this.array.length,this.sob); 
            if(o.str[0]=="BPieceBottom") blok=new BPieceBottom(this, o, this.array.length,this.sob); 
            if(o.str[0]=="BPieceTop") blok=new BPieceTop(this, o, this.array.length,this.sob); 



            if(o.str[0]=="BTBox") blok=new BTBox(this, o, this.array.length,this.sob); 
            if(o.str[0]=="BTBoxVstavka") blok=new BTBoxVstavka(this, o, this.array.length,this.sob);



            if(blok==null)blok = new Blok(this,o,this.array.length,this.sob)
            blok.init();
            this.array.push(blok)   

            return this.array[this.array.length-1];
        }

        this.getGroup=function(o){              
            var a=o.str[1].split("|")
            var s=a[0]
            for (var i = 1; i < a.length; i++) {
                s+='"'+a[i];
            }            
            var oo=JSON.parse(s)          
            var ooo=this.getIdObj(oo.id); 
            var b=this.getBlok(ooo.obj)                        
            b.setObj(oo) 
            return b
        }
 

        this.getModel=function(link, key, fun){              
            for (var i = 0; i < this.arrayHron.length; i++) {
                if(this.arrayHron[i].link==link){
                    this.arrayHron[i].setFun(fun);
                    return;
                }
            }
            this.arrayHron.push(new Hron(this, link, key, fun))
        }


        this.setIdColor = function (idColor) {       
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].idColor=idColor;
            }
        }
        this._activTime=-1;
    }


    set materialBase(v) {
        this._materialBase = v;
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].material=this._materialBase;
        }   
    }
    get materialBase() { return  this._materialBase;}


    set visiMark(v) {
        if(this._visiMark!=v){
            this._visiMark= v;            
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visiMark=this._visiMark;                
            }
            this.fun("visi3d");         
        }       
    }   
    get visiMark() { return  this._visiMark;} 


    set activIndex(v) {
        if(this._activIndex!=v){
            trace("gfhsgfdsgfdsgfdsg",v)
            this._activIndex= v;
            for (var i = 0; i < this.array.length; i++) {
                if(i==this._activIndex)this.array[i].activTime=true;
                else this.array[i].activTime=false;                              
            }  
            if(this.array[v]!=undefined) {                
                this.par.visi3D.arrOut=this.array[v].c3dNa;
                this.par.par.visiActiv.setObject(this.array[v])
            } else{
                this.par.visi3D.arrOut=null;
                this.par.par.visiActiv.setObject(null)
            }

        }       
    }   
    get activIndex() { return  this._activIndex;} 

}

export class Hron  {
    constructor(mO, link, key, fun) {
        this.type="Hron";
        var self=this;
        this.link=link;
        this.content3d=undefined;
        this.array=[]
        this.array.push(fun);

        this.setFun = function(fun){
            if(this.content3d!=undefined){
                fun(this.content3d.clone())
                return;
            }
            this.array.push(fun);
        }
        
        this.finalLoad=function(o3d){            
            this.content3d = new THREE.Object3D();
            this.content3d.add(o3d);
            for (var i = 0; i < this.array.length; i++) {
                //this.array[i](this.content3d.copy());
                this.array[i](this.content3d.clone());
            }
        }
     
        if(key=="gltf"||key=="glb"){
            mO.loaderGLTF.load( link, function ( object ) { 
                let dd
                if(link.indexOf("resources/data/65/")!=-1){
                    dd="m_8" 
                    //strace("$$$$$$$$$$m_base0$$$$$$$$")  
                }             
                mO.par.mMaterial.geterMat.getTestTitleObj(object.scene, dd)
                object.scene.rotation.x=Math.PI/2
                self.finalLoad(object.scene);
            })
        } 
       


        this.getObj3D=function(o3d){
            var o=new THREE.Object3D();
            o.position.set(o3d.position.x,o3d.position.y,o3d.position.z);
            o.rotation.set(o3d.rotation.x,o3d.rotation.y,o3d.rotation.z);
            o.scale.set(o3d.scale.x,o3d.scale.y,o3d.scale.z);

            for (var i = o3d.children.length-1; i >=0; i++) {
                if(o3d.children[i].type=="Mesh"){
                    o.add(o3d.children[i]);
                }else{
                    if(o.name!="Default_light"){
                        var oo=this.getObj3D(o3d.children[i]);
                        o3d.remove(o3d.children[i])
                        o.add(oo)
                    }                    
                }
            }
            return o;
        }
    }
}


