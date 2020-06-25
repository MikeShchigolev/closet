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

export class BTBoxVstavka extends Blok {
    constructor(mO, o, idArr, fun) {
        super( mO, o, idArr, fun)
        this.type = "BTBoxVstavka";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.collision//выдераем из стенки
        //перехват основоного события ведения обьекта по стенке

        this._indexW=0;
        this._indexH=0;
        this.wN=mO.wN;
        this.hN=mO.hN; 

        this.otstup=1.6
        this.idCT="idMatObject2"
        this.matBas="materialBase2";//Тип общего цвета
        this.boolDinColor=true;//Не отрабатываает общий цвет

        this.bvPlus=new BVPlus(this);

        let aa=new THREE.AxesHelper(200);
        aa.position.x=-48
        aa.position.y=1.5
        this.content3d.add(aa);


        this.arrObj=[];
        this.objObj={};
        for (var i = 0; i < this.wN.length; i++) {
            this.arrObj[i]=[]
            for (var j = 0; j < this.hN.length; j++) {
                this.arrObj[i][j]={}
                this.arrObj[i][j].name="mod_"+this.wN[i]+"_"+this.hN[j]
                this.arrObj[i][j].w=this.wN[i];
                this.arrObj[i][j].d=this.hN[j];
                this.objObj[this.wN[i]+"_"+this.hN[j]]=this.arrObj[i][j];              
            }
        }

        
        let aaa=this.object.str[1].split(",")
        for (var i = 0; i < aaa.length; i++) {
            let ooo=mO.getIdObj(aaa[i])
            if(ooo && ooo.title){
                this.objObj[ooo.title].obj=ooo;                
            }            
        }

        




        
        var b
        this.setXY=function(_x,_y){ 
            b=this.testTumb(_x,_y);
            if(b==true){
                if(mO.btBox.parent!=undefined){                    
                    if(mO.btBox.idRandom!=this.parent.idRandom){
                        mO.btBox.parent.remove(mO.btBox)
                    }else{
                        mO.btBox.setXY(_x,_y);
                    }                   
                }
                this.drahShadow()
                return
            }else{
                //Эмулируем тумбочку
                this.setXY2Tumba(_x,_y)
            }      
        }

        this.boolLoad = false 
        this.funInitMod = function(){
            this.creadDebag(self.cont3dLoad.children[0]);

            //self.cont3dLoad.children[0].position.z=self.object.mod.r[1]
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
                        if(this.collision.arrRect[i].parent.type=="BTBox"){                            
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
            py = _y-(rcm.y+rcm.height/2) 

            ppy=this.testBlokSvobod(py, blok)
            if(ppy==null){
                return false;
            }           

            if(this._parent!=undefined){
                if(this._parent.idRandom!=blok.idRandom){                    
                    this._parent.remove(this);
                    blok.add(this);
                }   
            }
            this.boxColizi.rectCollisMeshdy.y=ppy-this.boxColizi.height;
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


        //проверяем с остольными полками
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
        }


        //сверяем две полосы
        this.testLineXZ=function(ps,pf,ps1,pf1){
            if(ps1>=ps &&pf1<=ps)return true;
            if(ps1>=pf &&pf1<=pf)return true;          
            if(ps>=ps1 &&pf<=ps1)return true;
            if(ps>=pf1 &&pf<=pf1)return true; 
            return false;
        }

        //емулируем тумбу
        this.btBox
        var aS;
        var bbb
        this.setXY2Tumba=function(_x,_y){            
            aS=mO.par.sten
            mO.btBox.nitColor() 

            if(mO.btBox.parent==undefined){
                aS.add(mO.btBox)
            }else{
                if(aS.idArr != mO.btBox.parent.idArr){
                    mO.btBox.parent.remove(mO.btBox)
                    aS.add(mO.btBox)
                }
            }
            bbb=false;
            if(this.parent==undefined){
                bbb=true;
                mO.btBox.add(this);
            }else{
                if(this.parent.idRandom!=mO.btBox.idRandom){
                    bbb=true;
                    this.parent.remove(this)
                    mO.btBox.add(this);
                }
            }
            mO.btBox.setXY(_x,_y);
           
            
            if(bbb==true){
                var mm=-3333
                for (var i = 0; i < mO.btBox.arrPositZ.length; i++) {  
                    if(-mO.btBox.arrPositZ[i]>mm)mm=mO.btBox.arrPositZ[i];
                }
                this.boxColizi.rectCollisMeshdy.y=mm-this.boxColizi.height;
                this.boxColizi.rectCollisMeshdy.x=-this.boxColizi.width/2;
                this.setXY(_x,_y);
            }
        }


        this.overDrag=function(){             
            mO.par.glaf.dragPic.stop();            
            mO.btBox.add(this);
        }


        this.outDrag=function(){           
            if(mO.btBox.parent!=undefined){
                mO.btBox.parent.remove(mO.btBox)                
            }
            if(this.parent!=undefined){
                this.parent.remove(this);
            }
        }


        this.stopDrag=function(){             
            if(this.parent.idRandom==mO.btBox.idRandom){                
                this.parent.remove(this);
                var cop=mO.getBlok(mO.btBox.object)
                if(mO.btBox.parent!=undefined){
                    var vv=mO.btBox.parent
                    mO.btBox.parent.remove(mO.btBox);
                    vv.collision.activ = false;
                    vv.add(cop);
                    cop.boxColizi.rectCollisMeshdy.x=mO.btBox.boxColizi.rectCollisMeshdy.x;
                    cop.boxColizi.x=mO.btBox.boxColizi.x;
                    cop.boxColizi.sx=mO.btBox.boxColizi.sx;
                    cop.x=mO.btBox.x;

                    cop.boxColizi.rectCollisMeshdy.y=mO.btBox.boxColizi.rectCollisMeshdy.y; 
                    cop.boxColizi.y=mO.btBox.boxColizi.y
                    cop.boxColizi.sy=mO.btBox.boxColizi.sy
                    cop.y=mO.btBox.y

                    vv.collision.activ = true;
                    cop.parent.collision.drawDegug()                    

                    cop.add(this);
                    cop.drahShadow();

                    this.mO.dragPriceScane() 
                }

            }
        }

        this.prosZ=1;
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
            var ad=[]
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
            return [ad];
        }

       /* this.setColorId = function(v){
            if(this.boolDinColor == false)return;            
            if(this._idColor == v)return; 
            this._idColor=v;
            this._material = roomBig[this.matBas]//menedsherMaterial.geterMat.getIDReturn(this._idColor,true); 
            this.dragColor();
            this.mO.dragPriceScane();
            this.fun("visi3d");
        }*/




    }



    set parent(v) {
        if(this._parent!=v){                               
            if(this._parent!=undefined){
                if(this._parent.type=="BTBox"){
                    if(this._parent.content){                        
                        if(this._parent.content.funRender!=undefined){                            
                            this._parent.content.funRender(1)
                        }                    
                    }
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

                if(this._parent.indexW!=undefined){                    
                    this.indexW=this._parent.indexW 
                    this.indexH=this._parent.indexH   
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
}



//хреновинки с боков
export class BVPlus {
    constructor(par) {    
        var self=this;    
        this.type = "HrenNiz";        
        this.par=par;
        this.activeId=-1;
        this.boolLad=false;

        this._indexW = par._indexW;
        this._indexH = par._indexH;



        this.array=[]
        var mesh

        if(this.par.object.str[2]=="187"){
            this.activeId=187
        }

        var z0=32
        var ooo
        this.drag=function(){ 
            if(this.boolLad==false)return;            
            if(this.par.arrObj==undefined)return;
            if(!this.par.arrObj[this._indexW])return;
            if(!this.par.arrObj[this._indexW][this._indexH])return;
            ooo=this.par.arrObj[this._indexW][this._indexH];

            if(this.activeId==187){
                self.array[0].rotation.y=Math.PI/2
                self.array[0].position.z=ooo.d-3.1;
                self.array[0].position.x=-ooo.w/2+this.par.otstup;

                self.array[1].rotation.y=Math.PI/2
                self.array[1].position.z=3.7;
                self.array[1].position.x=-ooo.w/2+this.par.otstup;

                if(ooo.d>36){
                    self.array[2].rotation.y=Math.PI/2
                    self.array[2].position.z=3.7+(ooo.d-3.1-3.7)/2;
                    self.array[2].position.x=-ooo.w/2+this.par.otstup;
                    self.array[2].visible=true;
                }else{
                    self.array[2].visible=false;
                }
                self.array[3].rotation.y=-Math.PI/2
                self.array[3].position.z=ooo.d-3.1;
                self.array[3].position.x=ooo.w/2-this.par.otstup;

                self.array[4].rotation.y=-Math.PI/2
                self.array[4].position.z=3.7;
                self.array[4].position.x=ooo.w/2-this.par.otstup;

                if(ooo.d>36){
                    self.array[5].rotation.y=-Math.PI/2
                    self.array[5].position.z=3.7+(ooo.d-3.1-3.7)/2;
                    self.array[5].position.x=ooo.w/2-this.par.otstup;
                    self.array[5].visible=true;
                }else{
                    self.array[5].visible=false;
                }
            }
        }




        if(this.activeId==-1)return;

        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        this.hron=new BKHron(this, this.activeId, 1)
        this.hron.initHron=function(){ 
            
            self.boolLad = true;

            if(self.activeId==187){
                for (var i = 0; i < 6; i++) {
                    self.array[i]=self.hron.get();
                    self.array[i].position.y=self.hron.object.obj.mod.r[2]
                    let aa=new THREE.AxesHelper(20);
                    self.array[i].add(aa);


                }
            }

            self.drag();
        }
        this.hron.init();


        let dCont=new DCont(main.contentHTML)
        dCont.x=400;
        dCont.y=200;
        this.slid=new DSliderBig(dCont, 2,2, function(s){ 
            self.array[0].position.y=this.value;

            self.par.fun("visi3d");  
        }, "z0", 0, 58);
        this.slid.value=z0
        this.slid.width=200
    }

    set indexW(v) {
        if(this._indexW!=v){
            this._indexW = v;  
            this.drag();                
        }           
    }   
    get indexW() { return  this._indexW;} 

    set indexH(v) {
        if(this._indexH!=v){
            this._indexH = v;  
            this.drag();            
        }           
    }   
    get indexH() { return  this._indexH;} 
}






