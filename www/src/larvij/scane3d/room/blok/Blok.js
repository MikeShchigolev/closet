/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

блок 3д, баззоывй для всех
*/


import { RectCollis } from '../collision/CollisionRect.js';
import { XZImage } from './XZImage.js';

export class Blok{
    constructor(mO, o, idArr, fun) {
        this.type="Blok";
        this.typeConst="Blok";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
       

        this.boolDinColor=false;
        this.object = o;
        this._visiMark= mO._visiMark; 
        this._avAct = true;
        this.idRandom=Math.random();
        this._idColor=0;
        this.children=[];
        this.okPrice=false;
        this._activObject=false;
        this._activTime=false;
        this.boolOTS=true//откат при удаоления со стенки
        this.idArr=idArr;
        this.fun=fun;
        this.mO=mO;
        this.id=o.id;
        this.linkMod="resources/data/"+this.id+"/mod/"+o.mod.name;
        this.link="resources/data/"+this.id+"/original.png";
        
        this.aa=["copy","clear"]
        this.funDrag=undefined;
        this.funInitMod=undefined; 
        this.durXY = undefined; 
        this.durRect = undefined;
        this.rectColizi = {x:0,y:0,width:1,height:1,idArr:idArr};

        this.content3d = new THREE.Object3D();
        this.content3d.blok=this;

        this.idCT="idMatObject";//Тип общего цвета
        this.matBas="materialBase";//Тип общего цвета
        this._material=roomBig[this.matBas];

        this.c3dNa = new THREE.Object3D();
        this.content3d.add(this.c3dNa);        
        this.markers=new Markers(this);
        this.content = new PIXI.Container();
        this.graphics = new PIXI.Graphics();  
        this.content.addChild(this.graphics);

        
        this.textError="null";
        this.bvColor=true;

       
        
        if(o.shadow){
            var l="resources/data/"+this.id+"/shadow/shadow.png";                              
            this.image=new XZImage(this.content,0,0,l,function(){                    
                
                this.x=-o.shadow.wh/2//+33;
                this.y=-o.shadow.wh/2;
                this.width=o.shadow.wh;
                this.height=o.shadow.wh;                
                if(self.content.funRender!=undefined){
                    self.content.funRender();
                }
                if(self.dragImeag)self.dragImeag()
            });
            
        }else{
            if(o.resurs!=undefined){
                if(o.resurs.array[0]!=undefined){
                    var p=-1;
                    for (var i = 0; i < o.resurs.array.length; i++) {
                        if(o.resurs.array[i].b==undefined){
                            p=i;
                            i=999;
                            break;
                        }else{
                            if(o.resurs.array[i].i=="x"){
                                p=i;
                                i=999;
                                break;
                            }
                        }
                    }
                    

                    if(p!=-1){
                        

                        var l="resources/data/"+this.id+"/resources/"+o.resurs.array[p].name;                              
                        this.image=new XZImage(this.content,0,0,l,function(){                    
                            this.x=-this.picWidth/4;
                            this.y=-this.picHeight/4;
                            this.width=this.picWidth/2;
                            this.height=this.picHeight/2;
                            if(self.content.funRender!=undefined){
                                self.content.funRender();
                            }
                            if(self.dragImeag)self.dragImeag()

                        });


                        this.content.addChild(this.graphics);
                    }
                }
            }



        }



        


        this.dCol = function () {           
            self.x=self.boxColizi.__x;
            self.y=self.boxColizi.__y;            
            self.content3d.position.x=self.x;
            self.content3d.position.y=self.y;

           
            self.content.x=self.x;
            if(self.durXY)self.durXY(self.x,self.y)
            self.dCol2();           
        }


        this.dCol2 = function () {            
            if(this._parent)
            if(this._parent.type=="Sten"){                
                this._parent.dragBlok(this);
            }  
        }


        this.clear = function (b) { 
            if(this._parent&&b==undefined){                
                this._parent.remove(this);              
            } 
            if(this.children.length!=0) {
                
                for (var i = this.children.length - 1; i >= 0; i--) {
                    trace(i+"#",this.children[i]);
                    this.remove(this.children[i])
                }
            }     
            this.mO.dragPriceScane()                  
        };


        this.boxColizi=undefined;      
        this._parent=undefined;
        this.cont3dLoad;

        self.boxHelper=new BoxHelper(0.2,mO.matRed);
        self.content3d.add(self.boxHelper);
        
        this.box = new THREE.Mesh(this.mO.gBox, this.mO.matRed);
        self.c3dNa.add(this.box);
        this.box.layers.set(31);


        this.rect=[];
        this.rect1=[];
        for (var i = 0; i < o.mod.r.length; i++)this.rect[i]=o.mod.r[i];
        for (i = 0; i < o.mod.r1.length; i++)this.rect1[i]=o.mod.r1[i];              
            

        this.aaSob=function(s,p){            
            if(s=="clear"){
                self.mO.par.clear(self);
                self.clear()
                self.mO.activIndex=-1;                
            }
            if(s=="copy")self.mO.par.copy(self);
        }


        this.setAA=function(aa){ } 
        this.x=0;
        this.y=0;
        this.setXY=function(_x,_y){
            this.boxColizi.position._x = _x;
            this.boxColizi.position.y = _y;
            this.content.position.x = _x;
            this.content.position.y =_y;
            if(this.parent!=undefined){
                this.parent.collision.testRect(this.boxColizi);
                if(this.content.funRender!=undefined){
                    this.content.funRender()
                }
            }          
        }


        this.setXYPosit=function(_x,_y){
           
            self.x=_x;
            self.y=_y;
            self.content3d.position.x=self.x;
            self.content3d.position.y=self.y;
            this.boxColizi.position._x = _x;
            this.boxColizi.position.y = _y;            
        }

        this.byZdvig=true
        this.prosZ=1    
        this.dragObjNWD=function(){  
       
            this.dragObjHA(self.boxHelper, this.rect);

            this.box.scale.set(this.rect[3],this.rect[5],this.rect[4]/this.prosZ);
            if(this.byZdvig==true)this.box.position.y=(this.rect1[1]-this.rect1[5]/2)//(2*this.prosZ)
            else{
                this.box.position.y=0
            }


            this.box.position.z=this.rect[4]/(2*this.prosZ); 


            if(this.funDrag!=undefined)this.funDrag();
            this.fun("visi3d");
        }        

        this.dragObjHA=function(bH, a){                
            if(a[3]>0 && a[4]>0 && a[5]>0){            
                bH.width=a[3];
                bH.position.x=a[0]+a[3]/2;
                bH.height=a[4];
                bH.position.z=a[1]+a[4]/2;
                bH.depth=a[5];
                bH.position.y=-a[2]-a[5]/2;                 
            }        
        }


        this.arrayChild=[]
        this.arrayMat=[];
        this.recurcChild=function(c, b){
            if(c.children!=undefined){
                for (var i = 0; i < c.children.length; i++) {
                    this.recurcChild(c.children[i], true);
                }
            }
            if(c.material!=undefined){
                if(c.material.name!=null){
                    if(c.material.name.indexOf('m_base')!=-1){//базовый обьект  
                        this.plusCildMat(c)
                    }
                }
            }
            if(b==undefined)this.dragColor()
        }

        this.plusCildMat=function(c){
            for (var i = 0; i < this.arrayMat.length; i++) {
                if(this.arrayMat[i].uuid==c.uuid){
                    return
                }
            }
            this.arrayMat.push(c);            
        }


        this.zamenaMat=function(c){
            mO.geterMat.get(c.material.name,function(mat){                
                if(mat!=null){
                    c.material=mat
                }
            },true);
        }

        var mDin      
        var mDin    
        var bb 

        this.dragColor=function(){ 
            if(self._material==undefined)return
            mDin=self._material 
            
            this.bvColor=true
            bb=null; 
            if(this._material.idObj){
                if(this.object){
                    
                    
                    if(this.object.info&&this.object.info.color&&this.object.info.color[this._material.idObj.id]){                        
                        if(isNaN(this.object.info.color[this._material.idObj.id].pri)==true){                           
                            bb = this.object.info.color[this._material.idObj.id];
                            mDin = mO.matBTBDV;
                            this.bvColor=false;                           
                            this.textError=this.object.info.color[this._material.idObj.id].pri; 
                        }    
                        
                    }
                }   
            }

            


            for (var i = 0; i < self.arrayMat.length; i++) {              
                if(self.arrayMat[i].material.uuid!=mDin.uuid) {
                    if(bb!=null){                       
                        bb=null;
                        drahHelp3D.set(this)
                    }    
                    self.arrayMat[i].material=mDin;
                }   
                    
            }    
        }


        //------------------------------
        

        this.testDver=function(c3d,b){            
            
            
            if(b==true&&this.object.id!=10){
                return
            }
            if(c3d.material){
                if(c3d.name=="md9__0"){
                    c3d.material=new THREE.MeshPhongMaterial({color:"#ffffff"})
                }
                
            }
            if(c3d.children){
                for (var i = 0; i < c3d.children.length; i++) {
                    this.testDver(c3d.children[i])
                }
            }
            
        }

        this.testMaterial=function(){
    //ставим первый цвет
            if(!roomBig[this.matBas]&&this.object && this.object.info && this.object.info.array && this.object.info.array.length>0){
               
                roomBig[this.idCT]=this.object.info.array[0].id
                
                
            }
            
            
            this._idColor=roomBig[this.idCT];
            this._material=roomBig[this.matBas];


            
        }


        this.funInit=undefined
        this.modelObj
        this.init=function(_obj){
            
            this.creatBC();
            this.modelObj=_obj;
            if(self.funInit!=undefined)self.funInit();

            mO.getModel(this.linkMod, o.mod.key, function(o){
                self.cont3dLoad=o;
                self.testMaterial();
                
                self.markers.setO3D(self.cont3dLoad) 
                self.c3dNa.add(self.cont3dLoad);
                

                self.recurcChild(self.cont3dLoad)                              
                self.mO.visi3D.objShadow(self.content3d, true)
                self.boxHelper.visible=false
                var v=self._activTime;
                self._activTime=null
                self.activTime=v
                self.init2();                
                self.okPrice=true;
                self.mO.dragPriceScane();
                self.testDver(o,true)
                if(self.funInitMod!=undefined)self.funInitMod();              
            });
        }


        this.creatBC=function(){
            this.boxColizi = new RectCollis(
                this.object.mod.r[0],
                this.object.mod.r[2],
                this.object.mod.r[3],
                this.object.mod.r[5], this.dCol);
            this.boxColizi.parent = this;
            this.boxColizi.rectCollisMeshdy.depth=this.object.mod.r[4];

            if(this.object.bool[0]==1){//включаем рект огроничения он второй mod.r1
                this.boxColizi.rectCollisMeshdy.coliziStop = {
                    x: this.object.mod.r1[0],
                    y: this.object.mod.r1[1],
                    z: this.object.mod.r1[2],
                    width: this.object.mod.r1[3],
                    height: this.object.mod.r1[4],
                    depth: this.object.mod.r1[5]
                }
                this.boxColizi.rectCollisMeshdy.funErr = self.clear;
            }
            if(this.creatBCFun)this.creatBCFun();
        }


        this.init2=function(){
            var idC=mO.geterMat.idColor;            
            this.idColor=idC;
            self.dragObjNWD()
        }


        this.dragObjNWD();

       
        this.add = function(blok){
            this.remove(blok);
            this.content3d.add(blok.content3d);
            this.children.push(blok)
            blok.parent=this;
        }
        this.remove = function(blok){
            var p = -1;
            var r = null;
            for (var i = 0; i < this.children.length; i++) {                
                if(this.children[i].idArr==blok.idArr){                    
                    p=i;
                }
            }            
            if(p!=-1){
                r = this.children.splice(p,1)[0];
                this.content3d.remove(blok.content3d);
                r.parent=undefined;                
            }           
            return r;
        }

        this.setColorId = function(v){
            if(this.boolDinColor == false){
                this.idColor=v
                this.dragColor();
                this.mO.dragPriceScane();
                this.fun("visi3d");
                return;         
            }   
            //if(this._idColor == v)return;

            this._idColor=v;            
            this._material = roomBig[this.matBas]// menedsherMaterial.geterMat.getIDReturn(this._idColor,true); 

            this.dragColor();
            this.mO.dragPriceScane();
            this.fun("visi3d");
        }


        this.getObj = function(){
            var obj={}
            obj.type=this.type;
            obj.id=this.id;
            obj.x=self.content3d.position.x;
            obj.y=self.content3d.position.y;
            
            obj.children=[];
            for (var i = 0; i < this.children.length; i++) {
                obj.children[i]=this.children[i].getObj();
            }
            return obj;            
        }


        var ob,ooo
        this.setObj = function(obj){                      
            this.setXYPosit(obj.x,obj.y); 
            if(obj.children);          
            for (var i = 0; i < obj.children.length; i++) {
                ooo= mO.getIdObj(obj.children[i].id)                  
                ob=mO.getBlok(ooo.obj)
                ob.setObj(obj.children[i])
                this.add(ob);                 
            }            
            return obj;            
        }
    }


    set material(v) {
        if(this._material!=v){
            if(this.boolDinColor == true)return;
            this._material = v;            
            this.dragColor();
        }       
    }   
    get material() { return  this._material;}


    set idColor(v) {
        if(this._idColor!=v){            
            if(this.boolDinColor == true)return;
            this._idColor= v;
            this.dragColor();
            this.mO.dragPriceScane();
        }       
    }   
    get idColor() { return  this._idColor;}




    set visiMark(v) {
        if(this._visiMark!=v){
            this._visiMark= v;            
            this.markers.visible=v;   
        }       
    }   
    get visiMark() { return  this._visiMark;}


    set parent(v) {
        if(this._parent!=v){
            if(this.dragParentDo) this.dragParentDo(this._parent, v)   
            this._parent= v; 
            if(this._parent==undefined){
                this.mO.visi3D.event3DArr.removeChild(this.c3dNa);
            } else{
                this.mO.visi3D.event3DArr.addChild(this.c3dNa);
            }  
            if(this.dragParent) this.dragParent()  

            if(this.parent!=undefined){                 
                if(this.drahShadow)this.drahShadow()               
            }          
        }       
    }   
    get parent() { return  this._parent;}


    set activObject(v) {
        if(this._activObject!=v){
            this._activObject=v
        }       
    }   
    get activObject() { return  this._activObject;}

    
    set activTime(v) {
        if(this._activTime!=v){
            this._activTime=v; 
        }       
    }   
    get activTime() { return  this._activTime;}    


    set avAct(v) {
        if(this._avAct!=v){
            this._avAct = v;
            this.c3dNa.visible=v; 
                  
            if(this._activTime==false)this.boxHelper.visible=!v;            
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].avAct=this._avAct
            }  
        }       
    }   
    get avAct() { return  this._avAct;}
}



export class Markers{
    constructor(par) {
        var self=this;
        this.type="Markers";
        this._visible=par._visiMark;
        this.content3d = new THREE.Object3D();
        par.content3d.add(this.content3d)
        this.content3d.visible=this._visible;
        this.array=[]
        this.par=par;
        if(tStyle.glaf.debug==true){
           /* this.axisHelper = new THREE.AxesHelper(100)
            this.content3d.add(this.axisHelper);  */
        }
        this.arrayOwan
        var aa, aaa
        this.setO3D=function(o3d, bStart){ 
            if(bStart==undefined) this.arrayOwan=[]          
            if(o3d.name)
            if(o3d.name.indexOf("markerObj")!=-1){ 
                if(o3d.parent){
                   o3d.parent.remove(o3d)
                }                     
                aa= o3d.name.split("_");  

                if(aa[1]){
                    var o=par.mO.getRendomID(aa[1])                  
                    if(o!=null){                       
                        var omb=this.getO3D(o)                        
                        var pp=new THREE.Vector3(o3d.position.x,o3d.position.y,o3d.position.z-self.par.rect[2])
                        omb.setPRS(pp, o3d.rotation, o3d.scale); 
                        this.arrayOwan.push(omb)                    
                    } 
                }
            }  
            if(o3d.children!=undefined)
            for (var i = o3d.children.length-1; i >=0; i--) {
                this.setO3D(o3d.children[i], true)
            }
        }

        this.compliteMod=function(){           
            self.par.mO.par.par.dragTimeVM()
        }
        
        this.getO3D=function(o){
            var omb= new OMB(this, o, this.array.length);
            this.array.push(omb);
            return omb
        }
    }


    set visible(v) {
        if(this._visible!=v){
            this._visible= v;
            this.content3d.visible= v;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible= v;
            }                   
        }       
    }   
    get visible() { return  this._visible;}
}


export class OMB{
    constructor(par, obj, idArr) {
        var self=this;
        this.type="OMB";
        this._visible=false;
        this.idArr=idArr;
        this.obj=obj;
        this.par=par;
        this.content3d = new THREE.Object3D();
        par.content3d.add(this.content3d);
        this.c1 = new THREE.Object3D();
        this.content3d.add(this.c1);
        this.c2 = new THREE.Object3D();
        this.c1.add(this.c2);       

        this.content3d.visible=this._visible; 

        if(tStyle.glaf.debug==true){
           /* this.axisHelper = new THREE.AxesHelper(30)
            this.content3d.add(this.axisHelper);*/
        }
       

        this.setPRS=function(p,r,s){
            this.content3d.position.set(p.x, -p.z, p.y);
            this.content3d.rotation.x=-Math.PI/2
        }

        
        this.boolInit=false
        this.init=function(){
            if(this.boolInit==true)return
            this.boolInit=true;            
            if(this.obj.obj==undefined){                
                $.ajax({
                url: "resources/data/"+this.obj.id+"/config.json",
                success: function function_name(data) {
                    if(typeof data === "string") {
                        var conf = JSON.parse(data)
                        self.obj.obj = conf;
                    } else self.obj.obj = data;                   
                    self.init2();                                     
                },
                error:function function_name(data) {
                    console.warn("Что то случилось с конфигом",data);
                }
            });
            }else{
                this.init2()
            }
        }


        this.init2=function(){            
            this.linkMod="resources/data/"+self.obj.id+"/mod/"+self.obj.obj.mod.name;
            this.par.par.mO.getModel(this.linkMod, self.obj.obj.mod.key, function(o){
                self.cont3dLoad=o;
                self.c2.add(o)                
                self.recurcChild(o);
                if(self.par) if(self.par.compliteMod) self.par.compliteMod()                
            });
        }

        this.recurcChild=function(c){
            if(c.material!=undefined){                
                if(c.material.name.indexOf('m_')!=-1){//хз какой то обьект из базы 
                    this.zamenaMat(c);
                }
            }
            if(c.children!=undefined)
            for (var i = 0; i < c.children.length; i++) {
                this.recurcChild(c.children[i])
            }
        }   

        this.zamenaMat=function(c){            
            this.par.par.mO.geterMat.get(c.material.name,function(mat){                
                if(mat!=null){
                    c.material=mat
                }
            },true);
        } 


        this.rectObj={x:0,y:0,w:1,h:1,v:1}
        this.getBox =function(){
            this.rectObj.x=0;
            this.rectObj.y=0;
            this.rectObj.v=1
            this.getPar(this.c2, this.rectObj);            
            this.rectObj.x+=this.obj.obj.mod.r[0];
            this.rectObj.w=this.obj.obj.mod.r[3];
            this.rectObj.h=this.obj.obj.mod.r[4];
            return this.rectObj
        }  


        this.getPar =function(c3d,o){            
            if(c3d.visible==false){
                o.v=0;
            }
            o.x+=c3d.position.x;
            o.y+=c3d.position.y;

            if(c3d.sten!=undefined){
                return;
            }

            if(c3d.parent!=undefined){
                return this.getPar(c3d.parent, o);                
            }
        }
        if(this.par._visible==true)this.visible=true;
    }


    set visible(v) {
        if(this._visible!=v){
            this._visible= v; 
            this.content3d.visible=this._visible;
            if(this._visible==true){
                this.init()
            }          
        }       
    }   
    get visible() { return  this._visible;}
}


