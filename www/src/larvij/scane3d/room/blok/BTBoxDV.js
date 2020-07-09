/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

блок в тумбе
*/

import { BKHron } from './BKHron.js';
import { Blok } from './Blok.js';
import { Doska3D } from './doska/Doska3D.js';

export class BTBoxDV extends Blok {
    constructor(mO, o, idArr, fun) {
        super( mO, o, idArr, fun)
        this.type = "BTBoxDV";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.collision;//выдераем из стенки
        //перехват основоного события ведения обьекта по стенке

        this.byZdvig=false
        

        this._indexW=0;
        this._indexH=0;
        this.wN=mO.wN;
        this.hN=mO.hN; 

        this.otstup=1.6;
        this.idCT="idMatObject1"
        this.matBas="materialBase1";//Тип общего цвета
        this.boolDinColor=true;//Не отрабатываает общий цвет

        this.bvPlus=new BVPlus(this);

        
        this._thickness=1.6;


        this._width=100;
        this._height=1.6;
        this._depth=100;
       

        
        this.doska3D

        
        var b
        this.setXY=function(_x,_y){ 
            b=this.testTumb(_x,_y);
            if(b==true){
                if(mO.btBoxDin.parent!=undefined){                    
                    if(mO.btBoxDin.idRandom!=this.parent.idRandom){
                        mO.btBoxDin.parent.remove(mO.btBoxDin)
                    }else{
                        mO.btBoxDin.setXY(_x,_y);
                    }                   
                }
                this.drahShadow()
                return
            }else{
                //Эмулируем тумбочку
                this.setXY2Tumba(_x,_y)
            }      
        }



        this.dragWHD=function(){



            if(this.doska3D!=undefined){
                this.doska3D.width=this._width-this._thickness*2;
                this.doska3D.height=this._depth;
                this.doska3D.sahWidth=this._depth;
            }else{
                let xx=this._width-this._thickness*2
                this.cont3dLoad.scale.x=xx/this.object.mod.r[3]
            }
            this.cont3dLoad.position.z=this._depth/2;
            



            self.rect[3]=this._width;
            self.rect[4]=this._depth;
            self.rect[5]=this._height;

            self.rect[0]=-self.rect[3]/2;
            self.rect[1]=0;
            self.rect[2]=-self.rect[5]/2;

            if(this.doska3D==undefined){
                self.rect[4]=this._height;
                self.rect[1]=this._depth/2;
            }


            this.boxColizi.width=this._width;
            this.boxColizi.rectCollisMeshdy.width=this._width;
            this.boxColizi.sx=-this._width/2;
            this.boxColizi.x=-this._width/2;

            this.boxColizi.height=this._height;
            this.boxColizi.rectCollisMeshdy.height=this._height;
            this.boxColizi.sy=-this._height/2;
            this.boxColizi.y=-this._height/2;

            this.bvPlus.width=this._width;
            this.bvPlus.depth=this._depth;
            
            if(this.activTime==true)this.mO.par.par.visiActiv.setObject(this)
            self.dragObjNWD();
            self.fun("visi3d");
        }




        this.init=function(_obj){           
            this.creatBC()
            this.modelObj=_obj;
            if(self.funInit!=undefined)self.funInit();
            this.boxHelper.visible=false
            this.cont3dLoad= new THREE.Object3D();
            self.c3dNa.add(self.cont3dLoad);           

            if(this.object.mod.name=="n"){//динамическая полка
                //this.creatBC()
                this.testMaterial();
                this.modelObj=_obj;


                this.doska3D=new Doska3D(this.material);
                this.cont3dLoad.add(this.doska3D.c3d);
                this.arrayMat.push(this.doska3D.c3d);
                this.doska3D.depth=this._height;
                
                visi3D.objShadow(this.doska3D.c3d, true)
                
                /*let aa=new THREE.AxesHelper(100); 
                aa.position.z=56;
                aa.position.x=-50/2+1.8;          
                this.content3d.add(aa);*/
                this.dragWHD(); 
            }else{

                /*mO.getModel(this.linkMod, this.object.mod.key, function(o){
                    self.cont3dLoad.add(o)

                })*/

                mO.getModel(this.linkMod, this.object.mod.key, function(o){
                    self.cont3dLoad.add(o)
                   /* let aa=new THREE.AxesHelper(100);
                    self.cont3dLoad.add(aa)*/

                    self.testMaterial();                    
                    self.markers.setO3D(self.cont3dLoad) 
                    self.c3dNa.add(self.cont3dLoad);
                    self.recurcChild(self.cont3dLoad);                              
                    self.mO.visi3D.objShadow(self.content3d, true);
                    self.boxHelper.visible=false;
                    var v=self._activTime;
                    self._activTime=null;
                    self.activTime=v;
                    self.init2();                
                    self.okPrice=true;
                    self.mO.dragPriceScane();
                    self.testDver(o,true)                   
                           
                });
            }




            

        }

/*
        this.stopDrag=function(){  
            self.mO.activBTBDV(true)
        }


        this.dragStart=function(){ 
            self.mO.activBTBDV(false)
        }*/



        this.boolLoad = false 
        this.funInitMod = function(){
            this.creadDebag(self.cont3dLoad.children[0]);            
            self.boolLoad=true;
            this.dragIndex();
        }

        //--------------------------------------

        this.dragIndex=function(){
            if(self.boolLoad==false)return
            for (var i = 0; i < this.arrObj.length; i++){ 
                for (var j = 0; j < this.arrObj[i].length; j++) { 
                    this.arrObj[i][j].object.visible=false;
                }
            }

            if(this.arrObj[this._indexW]&&this.arrObj[this._indexW][this._indexH]&& this.arrObj[this._indexW][this._indexH].object){

                this.arrObj[this._indexW][this._indexH].object.visible=true;

                self.rect[3]=this.wN[this._indexW];
                self.rect[0]=-this.wN[this._indexW]/2;
                self.rect[4]=this.hN[this._indexH];

       

                let t=this.wN[this._indexW]+0.00002
                this.boxColizi.width=t;
                this.boxColizi.rectCollisMeshdy.width=t;
                this.boxColizi.sx=-t/2;
                this.boxColizi.x=-t/2;
            }
            self.dragObjNWD();
            if(self.activTime==true){
                this.mO.par.par.visiActiv.setObject(this)  
            }
            self.fun("visi3d");
        }



        this.creadDebag=function(o){            
            for (var i = 0; i < this.arrObj.length; i++){ 
                for (var j = 0; j < this.arrObj[i].length; j++) {    
                    let p=-1;
                    for (var ii = o.children.length-1; ii >=0; ii--) {                        
                        if(o.children[ii].name=="mod_"+this.wN[i]+"_"+this.hN[j]){
                            p=ii;
                        }
                    }

                    if(p==-1){//обьект не найден
                        let m=new THREE.Mesh(this.mO.gBox, this.mO.mat2);
                        o.add(m) 
                        m.name=this.arrObj[i][j].name;                       
                        m.scale.set(this.arrObj[i][j].w,this.arrObj[i][j].d,1)
                        m.position.set(0,this.arrObj[i][j].d/2,j*1+i*5);
                    }
                }
            }

            //наполняем массив обьектами
            for (var i = 0; i < this.arrObj.length; i++){ 
                for (var j = 0; j < this.arrObj[i].length; j++) {
                    for (var ii = o.children.length-1; ii >=0; ii--) {                        
                        if(o.children[ii].name=="mod_"+this.wN[i]+"_"+this.hN[j]){
                            this.arrObj[i][j].object=o.children[ii]
                        }
                    }
                }
            }
        }



        //--------------------------------------



        this.drahShadow=function(_x,_y){ 
            if(this._parent!=undefined){
                this.content.position.x = this.boxColizi.rectCollisMeshdy.x+this.boxColizi.rectCollisMeshdy.width/2;
                this.content.position.y = -(this.boxColizi.rectCollisMeshdy.y);
                if(this._parent.content.funRender!=undefined){
                    this._parent.content.funRender()
                }
            }            
        }

        this.dragImeag=function(){self.drahShadow()}
        //есть ли возможность вписаться в тумбочку
        //если есть то вписываем возврат да
        var rcm, b
        this.testTumb = function(_x,_y){
            if(mO.par.sten)this.collision=mO.par.sten.collision
            else this.collision= undefined 
            if(this.collision!=undefined){
                for (var i = 0; i < this.collision.arrRect.length; i++) {                   
                    if(this.collision.arrRect[i].parent){
                        if(this.collision.arrRect[i].parent.type=="BTBoxDin"){                            
                            rcm=this.collision.arrRect[i].rectCollisMeshdy;
                            if(_x>rcm.x){
                                if(_x<rcm.x+rcm.width){
                                    if(_y>rcm.y){
                                        if(_y<rcm.y+rcm.height){ 

                                            b=this.testTumb1(_x, _y, this.collision.arrRect[i])                                            
                                            return b;
                                        }
                                    }                                    
                                }
                            }                                
                        }                        
                    }
                }
            }
            return false;
        }
       

        //вставляем полку
        var blok, d, py, ppy;
        this.testTumb1 = function(_x,_y, _rect){            
            blok=_rect.parent;
            
            py = _y-(rcm.y+rcm.height/2);
            ppy=this.testBlokSvobod(py, blok);

            if(ppy==null){
                return false;
            }           

            if(this._parent!=undefined){
                if(this._parent.idRandom!=blok.idRandom){                    
                    this._parent.remove(this);
                    blok.add(this);
                }   
            }

            this.boxColizi.rectCollisMeshdy.y=ppy+ self.rect[2]//-this.boxColizi.height;//_y-236/2-this.boxColizi.height/2;
            this.boxColizi.rectCollisMeshdy.x=-this.boxColizi.width/2                   
            return true;
        }

        //ищем доступность постовить полку
        var max, ii,iii, pyR;
        this.testBlokSvobod = function(_py, _blok){ 
            var r=null
            max=9999
            pyR=_py
            for (var i = 0; i < _blok.arrPositZ.length; i++) {                
                ii=Math.abs(pyR-_blok.arrPositZ[i])                
                if(max>ii){
                    iii = _blok.arrPositZ[i]-this.boxColizi.height                    
                    if(iii<-_blok.boxColizi.height/2){//налазим на низ
                    }else{
                        if(this.testBlok2(_blok.arrPositZ[i], _blok.arrPositZ[i]-this.boxColizi.height, _blok)==true){//есть свободное место
                            max=ii
                            r=_blok.arrPositZ[i]; 
                        }                      
                    }
                }
            }
            return r;
        }


       /* //проверяем с остольными полками
        var rcm1
        this.testBlok2=function(_py,_py1, _blok){
            for (var i = 0; i < _blok.children.length; i++) {
                if(_blok.children[i].idArr!=this.idArr){
                    rcm1=_blok.children[i].boxColizi.rectCollisMeshdy;                    
                    if(this.testLineXZ(_py,_py1, rcm1.y+rcm1.height, rcm1.y)==true){
                        return false
                    } 
                }
            }
            return true
        }*/

        //проверяем с остольными полками
        var rcm1,r1
        this.testBlok2=function(_py,_py1, _blok){
            
            for (var i = 0; i < _blok.children.length; i++) {
                if(_blok.children[i].idArr!=this.idArr){
                    rcm1=_blok.children[i].boxColizi.rectCollisMeshdy;                    
                    r1=_blok.children[i].rect;
                    let y1=rcm1.y-r1[2]
                    let y2=rcm1.y-r1[2]-r1[5]                    
                    if(this.testLineXZ(_py,_py1, y1, y2)==true){    
                        return false
                    } 
                }
            }
            return true
        }


        //сверяем две полосы
        this.testLineXZ=function(ps,pf,ps1,pf1){
            if(ps1>=ps &&pf1<=ps)return true;
            if(ps1>=pf &&pf1<=pf)return true;          
            if(ps>=ps1 &&pf<=ps1)return true;
            if(ps>=pf1 &&pf<=pf1)return true; 
            return false;
        }

        this.isOver=function(sten,_xx,_yy){
            p=mO.par.getPNa();
            if(p==null)return false
            else{
                mO.btBoxDin.isMOWH(p.x, aS);
                if(mO.btBoxDin.minObjWH.w>50) return true
            }

            return false
        }

        //емулируем тумбу
        this.btBoxDin
        var aS;
        var bbb
        var p,p1

        this.setXY2Tumba=function(_x,_y){            
            aS=mO.par.sten;
            
            //проверяем возможность но постоновку дебага
           // if(this.parent==undefined){
                p=mO.par.getPNa();
                if(p==null)return
                else{
                    mO.btBoxDin.isMOWH(p.x, aS);
                    if(mO.btBoxDin.minObjWH.w<50)return 
                }
           // }
            /////////////////////////


        
        /*this.setXY2Tumba=function(_x,_y){            
            aS=mO.par.sten*/




            mO.btBoxDin.nitColor() 

            if(mO.btBoxDin.parent==undefined){
                aS.add(mO.btBoxDin)
            }else{
                if(aS.idArr != mO.btBoxDin.parent.idArr){
                    mO.btBoxDin.parent.remove(mO.btBoxDin)
                    aS.add(mO.btBoxDin)
                }
            }
            bbb=false;
            if(this.parent==undefined){
                bbb=true;
                mO.btBoxDin.add(this);
            }else{
                if(this.parent.idRandom!=mO.btBoxDin.idRandom){
                    bbb=true;
                    this.parent.remove(this)
                    mO.btBoxDin.add(this);
                }
            }
            mO.btBoxDin.setXY(_x,_y);
           
            
            if(bbb==true){
                var mm=-3333
                for (var i = 0; i < mO.btBoxDin.arrPositZ.length; i++) {  
                    if(-mO.btBoxDin.arrPositZ[i]>mm)mm=mO.btBoxDin.arrPositZ[i];
                }
                this.boxColizi.rectCollisMeshdy.y=mm-this.boxColizi.height;
                this.boxColizi.rectCollisMeshdy.x=-this.boxColizi.width/2;
                this.setXY(_x,_y);
            }
        }


        this.overDrag=function(){             
            mO.par.glaf.dragPic.stop();            
            mO.btBoxDin.add(this);
        }


        this.outDrag=function(){           
            if(mO.btBoxDin.parent!=undefined){
                mO.btBoxDin.parent.remove(mO.btBoxDin)                
            }
            if(this.parent!=undefined){
                this.parent.remove(this);
            }
        }


        this.stopDrag=function(){ 
            if(this.parent ==undefined){
                self.mO.dragPriceScane() 
                return 
            }   

            if(this.parent.idRandom==mO.btBoxDin.idRandom){                
                this.parent.remove(this);
                var cop=mO.getBlok(mO.btBoxDin.object)
                if(mO.btBoxDin.parent!=undefined){
                    var vv=mO.btBoxDin.parent
                    mO.btBoxDin.parent.remove(mO.btBoxDin);
                    vv.collision.activ = false;
                    vv.add(cop);
                    cop.boxColizi.rectCollisMeshdy.x=mO.btBoxDin.boxColizi.rectCollisMeshdy.x;
                    cop.boxColizi.x=mO.btBoxDin.boxColizi.x;
                    cop.boxColizi.sx=mO.btBoxDin.boxColizi.sx;
                    cop.x=mO.btBoxDin.x;

                    cop.boxColizi.rectCollisMeshdy.y=mO.btBoxDin.boxColizi.rectCollisMeshdy.y; 
                    cop.boxColizi.y=mO.btBoxDin.boxColizi.y
                    cop.boxColizi.sy=mO.btBoxDin.boxColizi.sy
                    cop.y=mO.btBoxDin.y

                    vv.collision.activ = true;
                    cop.parent.collision.drawDegug()                    

                    cop.add(this);
                    cop.drahShadow();

                    
                }
            }
            this.mO.dragPriceScane() 
        }

 
        var oKrai={y:0,h:0,z:0,_y:0,_h:0};
        var hee=0
        var heZ=0
        var niz, yyyy,yyyy1
        this.getKrai= function (b) {
            oKrai.y=this.boxColizi.rectCollisMeshdy.y-this.rect[2];            
            if(this._parent){
                oKrai.h=(this._parent.height/2-this._parent._thickness)-oKrai.y;
                niz=this._parent._niz+this._parent._thickness
                oKrai._y=-this._parent.height/2;
                yyyy =this.boxColizi.rectCollisMeshdy.y-this.rect[5]+this.rect[2];           
                oKrai._h =this._parent.height/2+this.boxColizi.rectCollisMeshdy.y-this.rect[5]-this.rect[2];
                oKrai._y+=niz;
                oKrai._h-=niz;
                if(this._parent.children.length!=0) {
                    for (var i = 0; i < this._parent.children.length; i++) {
                        if(this._parent.children[i].idArr==this.idArr)continue
                        let hhh=this._parent.children[i].boxColizi.rectCollisMeshdy.y-oKrai.y-this._parent.children[i].rect[5]-this._parent.children[i].rect[2];                        
                        if(hhh>1&&hhh<oKrai.h){                            
                            oKrai.h=hhh;
                        }
                        if(this._parent.children[i].boxColizi.rectCollisMeshdy.y<this.boxColizi.rectCollisMeshdy.y){
                            
                            yyyy1=this._parent.children[i].boxColizi.rectCollisMeshdy.y-this._parent.children[i].rect[2]; 
                            let hh=yyyy-yyyy1                            
                            if(oKrai._h>hh){                                
                                oKrai._h=hh
                                oKrai._y=yyyy1
                            }
                        }
                    }
                }
            }
            return oKrai;
        }


        
        this.dragObjNWD()
        this.dragParent=function(){

        }


        this.clear = function (b) {
            if(this._parent&&b==undefined){                
                this._parent.remove(this);
                this.parent=undefined                
            }

            if(this.children.length!=0) {
                for (var i = this.children.length - 1; i >= 0; i--) {
                    this.remove(this.children[i])
                }
            }     
            this.mO.dragPriceScane()                  
        };



        this.getPrice=function(intColor,idMat){  
            if(this.parent==undefined)return []
            return this.bvPlus.getPrice(intColor,idMat); 
            
           /* var ad=[]
            var aa=null
            
            if(this.parent==undefined)return []
            if(this.parent.parent==undefined)return []    
           
            

            
           
            let ooo= this.arrObj[this._indexW][this._indexH].obj;
            if(ooo){
                if(this.object.priority!=undefined)ooo.priority= this.object.priority;
                else ooo.priority= 0;
            }
            else{
                return []
            }

            aa=menedsherMaterial.getArrOtObj(ooo.obj,idMat,intColor); 

            if(aa!=null){
                ad=[];                         
                for (var j = 0; j < aa.length; j++) {
                    ad[j]=aa[j];                                
                }
                ad[6]="BTVstavka";
                ad[8]=ooo;
                ad[9]=ooo.id;
                ad[10]=1;
                ad[11]=aa[3]*1;                
            }                         
            return [ad];*/
        }


        this.dCol = function () {           
            self.x=0//self.boxColizi.__x;
            self.y=self.boxColizi.__y;            
            self.content3d.position.x=0//self.x;
            self.content3d.position.y=self.y;
         
           
            self.content.x=self.x;
            if(self.durXY)self.durXY(self.x,self.y)
            self.dCol2();           
        }



    }



    set parent(v) {
        if(this._parent!=v){                               
            if(this._parent!=undefined){
                if(this._parent.type=="BTBoxDin"){
                    if(this._parent.content){                        
                        if(this._parent.content.funRender!=undefined){                            
                            this._parent.content.funRender(1)
                        }                    
                    }
                }
                if(v!=undefined){
                    this._parent.remove(this)
                }
            }
            this._parent= v;           
            if(this._parent==undefined){
                this.collision=undefined
                this.mO.visi3D.event3DArr.removeChild(this.c3dNa);
                if(this.content)if(this.content.parent)this.content.parent.removeChild(this.content)
            } else{
                this.collision=this._parent.collision;                
                this.mO.visi3D.event3DArr.addChild(this.c3dNa);
                if(this._parent.content)this._parent.content.addChild(this.content)
                   
                this.avAct=this._parent.avAct 

                if(this._parent.width!=undefined){                    
                    this.width=this._parent.width 
                    this.depth=this._parent.depth   
                }  
            }                
        }       
    }   
    get parent() { return  this._parent;}


    set indexW(v) {
        if(this._indexW!=v){
            this._indexW = v;
            this.bvPlus.indexW = v;  
            this.dragIndex();     
            this.fun("visi3d");      
        }           
    }   
    get indexW() { return  this._indexW;} 

    set indexH(v) {
        if(this._indexH!=v){
            console.warn(this._indexH+"----------------------",v)
            this._indexH = v; 
            this.bvPlus.indexH = v;

            this.dragIndex();     
            this.fun("visi3d");      
        }           
    }   
    get indexH() { return  this._indexH;} 


    set width(v) {
        if(this._width!=v){            
            this._width = v;  
            this.dragWHD();            
        }           
    }   
    get width() { return  this._width;}

    set height(v) {
        if(this._height!=v){
            
            this._height = v;  
            this.dragWHD();     
            
        }           
    }   
    get height() { return  this._height;}

    set depth(v) {
        if(this._depth!=v){
            
            this._depth = v;  
            this.dragWHD();     
            
        }           
    }   
    get depth() { return  this._depth;}

}



//хреновинки с боков
export class BVPlus {
    constructor(par) {    
        var self=this;    
        this.type = "HrenNiz";        
        this.par=par;
        this.activeId=-1;
        this.boolLad=false;




        this._width=-1;
        this._depth=-1;
        this.array=[]
        var mesh;
        
        if(this.par.object.str[2]=="212"){
            this.activeId=212
        }

        var z0=32
        var ooo
        this.drag=function(){ 
            if(this.boolLad==false)return;   

            if(this.activeId==212){
                self.array[0].rotation.y=Math.PI/2
                self.array[0].position.x=-this._width/2+this.par._thickness;
                self.array[0].position.z=this._depth/2;
                self.array[0].position.y=0


                self.array[1].rotation.y=-Math.PI/2
                self.array[1].position.x=this._width/2-this.par._thickness;
                self.array[1].position.z=this._depth/2;
                self.array[1].position.y=0;
                
                             
            }
        }

        this.objObj={};  

        if(this.par.object.str[1].length>2){
            let a=this.par.object.str[1].split(",");
            for (var i = 0; i < a.length; i++) {
                let ooo=this.par.mO.getIdObj(a[i])
                this.objObj[ooo.title]=ooo            
            } 
        }

        this.getPrice=function(intColor,idMat){

            //let s=this.par.wN[this._indexW]+"_"+this.par.hN[this._indexH];
            let s=this.par._width+"_"+this.par._depth;
       
            
            if(this.objObj[s]!=undefined){

                let aa=menedsherMaterial.getArrOtObj(this.objObj[s].obj,idMat,intColor); 
               
                if(aa!=null){
                    let ad=[];                         
                    for (var j = 0; j < aa.length; j++) {
                        ad[j]=aa[j];                                
                    }
                    ad[6]="BTboxDin_BVPlus";
                    ad[8]=this.objObj[s].obj;
                    ad[9]=this.objObj[s].obj.id;
                    ad[10]=1;
                    ad[11]=aa[3]*1; 
        
                    return [ad]                 
                }  

            }

            if(this.activeId==212){
                let aa=menedsherMaterial.getArrOtObj(self.hron.object.obj,idMat,intColor); 
                
                if(aa!=null){
                    let aaaa=[]
                   
                    for (var ii = 0; ii < 2; ii++) {
                        let ad=[];                         
                        for (var j = 0; j < aa.length; j++) {
                            ad[j]=aa[j];                                
                        }
                        ad[6]="BTboxDin_BVPlus";
                        ad[8]=self.hron.object.obj;
                        ad[9]=self.hron.object.obj.id;
                        ad[10]=1;
                        ad[11]=aa[3]*1;
                        aaaa.push(ad); 
                    }

                    return aaaa;               
                }
                



            };


            return []            
        }




        if(this.activeId==-1)return;

        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        this.hron=new BKHron(this, this.activeId, 1)
        this.hron.initHron=function(){ 
            
            self.boolLad = true;

            if(self.activeId==212){
                for (var i = 0; i < 2; i++) {
                    self.array[i]=self.hron.get();
                    self.array[i].position.y=self.hron.object.obj.mod.r[2];
                   
                }
            }

            self.drag();
        }
        this.hron.init();


 
    }

    set width(v) {
        if(this._width!=v){            
            this._width = v;  
            this.drag();            
        }           
    }   
    get width() { return  this._width;}

    set depth(v) {
        if(this._depth!=v){            
            this._depth = v;  
            this.drag();            
        }           
    }   
    get depth() { return  this._depth;}



}






