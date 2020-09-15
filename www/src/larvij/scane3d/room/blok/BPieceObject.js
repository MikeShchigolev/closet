/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

Элнменнты на подвеске
*/


import { Blok } from './Blok.js';
import { RectCollis } from '../collision/CollisionRect.js';
import { BKHron } from './BKHron.js';

export class BPieceObject extends Blok {
    constructor(mO, o, idArr, fun) {
        super( mO, o, idArr, fun)
        this.type = "BPieceObject";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.sahBlok=30;
        this._polka=false
        this._intSah=-1;
        this._intSah1=-1;
        this.width=Math.round(this.rect[3]/10)*10;
        this.xz=null;
        this.xz1=null;
        this.polkaNot=false
        this.yMax=5;
        this.nizY=10
        this.ySRR=0
        this.yS=0;
        this.yF=10;
        this.yPol=0;
        this.ySMin=5;        
        this.zd4=0;
        this.ySMin= this.rect[5]*1;
        this.aa=["copy","clear"]; 
        this.boolKr=false;
        this.smesenie=0
        this.notDrag=false

        /*let rrr=new THREE.AxesHelper(50);
        this.content3d.add(rrr);*/

/*
        let dCont=new DCont(main.contentHTML)
        dCont.x=400
        dCont.y=200;
        var dL=new DLabel(dCont,0,0,"2222222222\r\n333333333333333333333")
        dL.dCT.div.setAttribute('style', 'white-space: pre;');
        dL.width=5555*/


        if(this.object.bool[3]==1){
            this.boolKr=true;//может быть две на одной рейке
        }

        if(this.object.bool[2]==1){           
            this.polkaNot=true;//конфликтит с включенной polka
        }

        this.testKorektActiv = function(){         
            if(this.parent!=undefined){
                mO.korektActiv(this)             
            }
        }
        this.dragToPanel=function(){
            if(this.parent==undefined)return;
            if(this.parent.dragToPanel==undefined)return;
            this.parent.dragToPanel(this);
        }


        this.yyyF=0;
        this.testYF = function(){


            if(this.yF>-this.rect[5]){
                this.yF=-this.rect[5];
                if(this.rect[5]>this.yMax)this.yF=-this.rect[5];
                else this.yF=-this.yMax;
            }

           
        }


        this.krai=new BKrai(this);//боковинки снизу
        this.hrenNiz=new HrenNiz(this);//вешалка
        this.sahSuper=new SahSuper(this);//крючки
        this.pppObj=new PPPObj(this);
        this.bagRectID=new BagRectID(this);
        
        this.testShadow=function(c){            
            if(c.name)if(c.name=="Plane001"){                
                c.castShadow = false;
                c.receiveShadow = false;
                c.position.y=-3.9;
                c.renderOrder=1//+Math.round(Math.random()*25);
            }

            if(c.children){
                for (var i = 0; i < c.children.length; i++) {
                    this.testShadow(c.children[i])
                }
            }
        }

        

        this.funInitMod = function(){

            self.cont3dLoad.position.y=this.rect[2]+this.smesenie;        
            if(self.object.bagY){
                self.cont3dLoad.position.z=self.object.bagY;
            }
            
            this.testYF();    
            if(this.id==42)this.testShadow(self.cont3dLoad)
            this.dragRect();         
            self.testKorektActiv();                
            self.dragToPanel(); 

            this.cont3dLoad.visible=this._avAct;           
        }




        this.creatBC=function(){
            this.boxColizi = new RectCollis(
                this.object.mod.r[0],
                0,
                this.object.mod.r[3],
                this.object.mod.r[5], this.dCol);
            this.boxColizi.parent = this;
        }
       



        this.dragRect = function(){ 
            var hh11=this.rect[1]
            var hh=this.yS-this.yF;
            this.rect[5]=hh-this.smesenie;
            this.rect[2]=-this.yS;           
            this.rect[4]=this.object.mod.r[4]+self.cont3dLoad.position.z;
            this.rect[1]=0;

            if(this.boxColizi.rectCollisMeshdy.width<1) {

                this.rect[0]=this.object.mod.r1[0]+self.cont3dLoad.position.z;
                this.rect[3]=this.object.mod.r1[3];
            }
            trace(this.yS,this.rect)

            this.dragObjHA(this.boxHelper, this.rect);
            this.rect[1]=hh11; 
            this.bagRectID.dragRect()                   
        }


        this.bSort=false;
        var b;//приходит позиции от колайдера        
        this.setXY=function(_x,_y){ 
            
            aS=mO.par.sten;
            if(this.isOver(aS,_x,_y)==false)return;           

            b=this.testObject(_x,_y);  
                 
            if(b==false){
                if(this.parent!=undefined){
                    if(this.bSort==true){
                        this.bSort=false
                        this.parent.visiNisu.sort(); 
                    }                    
                    this.parent.visiNisu.sortMini(); 
                    this.parent.parent.upDateRect();                   
                }  
                this.drahShadow()              
                return;
            }
            else{

                this.dragXZ(_x,_y);
                if(this.parent!=undefined){
                    if(this.parent.parent!=undefined){                      
                        this.parent.parent.upDateRect()                       
                    }                    
                }
                this.drahShadow();
                return;
            }
            this.boxColizi.position._x = _x;
            this.boxColizi.position.y = _y;            
            if(this.bundefined){
                this.drahShadow()
                this.parent.collision.testRect(this.boxColizi);
            }          
        }


        this.drahShadow=function(_x,_y){ 
                  
            if(this._parent!=undefined){
                
                if(_x==undefined){
                    this.content.position.x = this.boxColizi.rectCollisMeshdy.x+this.boxColizi.rectCollisMeshdy.width/2;
                    this.content.position.y = -(this.boxColizi.rectCollisMeshdy.y)-this.object.mod.r[2];
                }else{
                    this.content.position.x = _x;
                    this.content.position.y = _y;   
                }    
                

                if(this._parent.content.funRender!=undefined){
                    this._parent.content.funRender()
                }
            }      
        }

        this.dragImeag=function(){self.drahShadow()}

        this.isOver=function(s,x,y){
            if(s){
                if(s.width<this.boxColizi.width){
                    return false;
                } 
            }
            return true;
        }


        //емулируем хрень прилепалку
        this.blokTumba;
        var aS;
        var bbb,bbb1;
        //создаюм новый обьект для драга
        this.dragXZ=function( _x,_y){            
           

            aS=mO.par.sten;


            if(aS==undefined)return
            mO.pieceTop.nitColor();
            if(mO.pieceTop.parent==undefined){
                
                aS.add(mO.pieceTop);
                mO.pieceTop.setXY(_x,_y); 

            }else{
                if(aS.idArr != mO.pieceTop.parent.idArr){
                    mO.pieceTop.parent.remove(mO.pieceTop);
                    aS.sWidth=aS._W;

                    aS.add(mO.pieceTop);
                }
            }
        
            bbb=false;
            bbb1=false;
            if(this.parent==undefined){
                bbb=true;
                this.boxColizi.rectCollisMeshdy.x=100;
                
                mO.pieceTop.add(this); 
                
                this.boxColizi.position.x=0;
                mO.pieceTop.visiNisu.testPosition({x:0,y:-1}, this, true)                
                mO.pieceTop.dVertic();
                


                
            }else{
                if(this.parent.idRandom!=mO.pieceTop.idRandom){
                    
                    bbb=true;
                    var ppp=this.parent
                    this.parent.remove(this)                     
                    this.boxColizi.rectCollisMeshdy.x=-this.boxColizi.rectCollisMeshdy.width/2;
                    this.boxColizi.rectCollisMeshdy.y=-(this.yPol+this.yS)+mO.pieceTop.visiNisu.otstup-mO.pieceTop.visiNisu.oPod;                    
                    
                    mO.pieceTop.add(this);
                    this.boxColizi.position.x=0;
                    mO.pieceTop.visiNisu.testPosition({x:0,y:-1}, this, true)
                    mO.pieceTop.dVertic();                   
                }
            }
            
            mO.pieceTop.setXY(_x,_y);
            return true
        }

  

        this.arrDerag=[]
        this.bds=false;
        this.dragStart=function(){
            if(this.mO.boolClone){  
                         
                let o=this.getObj();
                let blok=this.mO.getBlok(this.object)                        
                blok.setObj(o);
                this.parent.add(blok, false); 
                this.mO.activIndex=blok.idArr;                  

                blok.setXY(o.x,o.y);
                this.mO.par.par.visiActiv.setObject(blok);

                this.mO.par.setBlokActiv(blok)
                this.mO.par.start(blok)
               
                return true;
            }
            this.bds=true; 
            this.arrDerag=[]
            this.parent.sWidth= this.parent._W                
        }


        var blok    
        //конец тоскания обьекта, если это базовый приветив то делаем с него копию
        this.stopDrag=function(){            
            if(this.parent!=undefined){ 
                if(this.parent.idRandom==mO.pieceTop.idRandom){
                    if(this.bds==false){
                        aS=mO.par.sten
                        var ooo=  mO.pieceTop.getObj();
                        mO.pieceTop.clear();
                        blok=mO.getBlok(mO.pieceTop.object); 
                        blok.setObj(ooo);
                        aS.add(blok, false); 
                        blok.stopDrag();
                        blok.dragCildren()
                        blok.visiNisu.sort();
                    }    
                }else{
                    this.parent.visiNisu.sort();
                    this.fun("visi3d");   
                }             
            }
            mO.dragPriceScane();
            this.bds=false;
            
        }


        //проверка всех полок на расзрыв
        this.bigRazruv=function(){  
            for (var i = 0; i < mO.array.length; i++) {
                if(mO.array[i].parent!=undefined){
                    if(mO.array[i].type=="BPieceTop"){
                        mO.array[i].boolSash=true
                        mO.array[i].visiNisu.sort()
                        mO.array[i].boolSash=false
                    }
                }
            }
        }

        this.vuruvaemVcovlaem=function(_bObj, pt){    
            var p=this.parent
            this.parent.remove(this);
            this.boxColizi.rectCollisMeshdy.x=_bObj.x-_bObj.z/2;
            this.boxColizi.rectCollisMeshdy.y=_bObj.y;

            if(p.idRandom==mO.pieceTop.idRandom){
                if(p.parent)
                    p.parent.remove(p)
            }
            this.bds=true
            
            pt.add(this);
        }


        var x4,x3,x5,x6,x7,xx1,xx2;
        var bxx,popo, vb, xz,xz1;
        this.testObject=function(_x,_y){           

            aS=mO.par.sten;
            //return true
            
            if(this.bds==true){                
                if(this.parent!=undefined){                 
                    popo=this.testObject2(_x,_y)
                  
                    vb=false; 

                    if(popo==null){
                        this.bds=false;                                             
                        return true; 
                    }else{
                        if(popo.idRandom!=this.parent.idRandom){                            
                            this.bds=true;
                            this.vuruvaemVcovlaem(popo.bxx, popo)                            
                        } 
                        xz1=(this.boxColizi.rectCollisMeshdy.width/2)
                        xz=this.x-(popo.bxx.x0+xz1)

                        x3=popo.bxx.bpt.visiNisu.xMin+1.5
                        x4=Math.round(popo.bxx.bpt.visiNisu.xMin/30);
                        xx1=Math.round(_x-popo.bxx.bpt.x-this.boxColizi.width/2)
                        xx2=Math.round(_x-popo.bxx.bpt.x+this.boxColizi.width/2)
                        x5=Math.round((_x-popo.bxx.bpt.x-this.boxColizi.width/2)/30);                        
                        x6=Math.round((this.boxColizi.rectCollisMeshdy.x)/30);                        
                        
                        //if(x5<x4)x5=x4;
                        if(x6!=x5){                            
                            x7=x3+((-x4+x5)*30);
                            //вылазим за границы стены
                            if(this.isBoxTest(x7,popo.bxx.y, this.boxColizi.rectCollisMeshdy.width)==false ){ 
                                if(popo.bxx.bpt.sWidth/2<xx1){
                                    var pw=this.parent;
                                    this.parent.remove(this)
                                    this.boxColizi.rectCollisMeshdy.y=0
                                    this.boxColizi.position.y=0
                                    return true
                                }
                                this.boxColizi.rectCollisMeshdy.x=x7                                
                                vb=this.setXY2(x7+this.boxColizi.rectCollisMeshdy.width/2, popo.y+popo.bxx.y)  
                                this.bSort=true
                                return vb 
                            }else{                               
                                return false
                            }                                                      
                        }
                      
                        var yy=this.parent.y-_y
                        vb=this.setXY2(_x, popo.y+popo.bxx.y)
                    }
                    return vb                  
                }
            }else{
                if(this.parent!=undefined){                    
                    if(mO.pieceTop.idRandom==this.parent.idRandom){
                        if(this.parent.boolDragLip==true){
                            
                            popo=this.testObject2(_x,_y)
                            if(popo==null){
                                return true
                            }
                            if(popo.idArr!=-1){                               
                                this.bds=true;
                                this.vuruvaemVcovlaem(popo.bxx, popo)  
                            } 
                            vb=this.setXY2(_x, popo.y+popo.bxx.y)
                            return vb 
                        }else{
                            this.boxColizi.rectCollisMeshdy.y=0
                            this.boxColizi.position.y=0
                        }           
                    }  
                }
            }

            if(this.parent!=undefined && aS)
            for (var i = 0; i < aS.children.length; i++) {                
                if(aS.children[i].type=="BPieceTop"){
                    if(aS.children[i].idRandom!=mO.pieceTop.idRandom)                  
                    if(aS.children[i].idRandom!=this.parent.idRandom){
                        
                        bxx=aS.children[i].testPosition(_x, _y, this);
                        if(bxx!=null){                            
                            this.vuruvaemVcovlaem(bxx, aS.children[i]);
                            return false 
                        }                        
                    }
                }
            }
            return true
        }


        this.testObject2=function(_x,_y){ 
            if(this.parent!=undefined && aS!=undefined){                
                for (var i = 0; i < aS.children.length; i++) {                
                    if(aS.children[i].type=="BPieceTop"){                                           
                        bxx=aS.children[i].testPosition(_x, _y, this,undefined,true) 
                                              
                        if(bxx!=null){                           
                            if(aS.children[i].bxx==undefined)aS.children[i].bxx=new Position()
                            aS.children[i].bxx.x=bxx.x;
                            aS.children[i].bxx.y=bxx.y;
                            aS.children[i].bxx.z=bxx.z;
                            aS.children[i].bxx.x0=bxx.x0; 
                            aS.children[i].bxx.bpt=bxx.bpt;                        
                            return aS.children[i] 
                        }       
                    }
                }
            }
            return null;
        }


        this.setXY2=function(_x,_y){            
            return  this.parent.dragBlok(this, _x,_y)
        } 

        this.funDragColor2=function(){
            this.krai.funDragColor2() 
            if(this.hrenNiz.dKTest!=undefined)this.hrenNiz.funDragColor2();  
            if(this.pppObj.bool==true)this.pppObj.funDragColor2(this.material)     
        }
        

        this.aaSob=function(s,p){
            var r=false
            
            if(s=="clear"){
                self.mO.par.clear(self);
                self.clear();
                self.mO.activIndex=-1;
                r=true
            }
            if(s=="copy"){
                self.mO.par.copy(self); 
                r=true 
            }         
            if(s=="polka"){
                if(self.xztest()) return false
                self.polka=!self.polka;
                self.parent.dVertic() ;
                self.parent.dragCildren();
                self.dragRect();
                self.testKorektActiv();  
                r=true;
            }

            if(s=="plusL"){
                if(self.polka==true)return "Установка данного аксессуара с перекладиной невозможна.";
                if(self.intSah==1)return "Установка аксессуара с это стороны невозможна."; 
                self.krai.plusL=!self.krai.plusL;
            }
            if(s=="plusR"){
                if(self.polka==true)return "Установка данного аксессуара с перекладиной невозможна.";                
                if(self.intSah1==1)return "Установка аксессуара с это стороны невозможна.";   
                
                self.krai.plusR=!self.krai.plusR;
            }

            if(s.indexOf("p1")!=-1){
                self.hrenNiz.polka1=s;
                self.dragRect();
                self.testKorektActiv();
                return false
            }


            if(!r&&s.indexOf("mod_55_")!=-1){
                let oo=self.pppObj.up1.testBool()
                if(oo==null){
                    self.pppObj.up1.bool=!self.pppObj.up1.bool;
                    batArrGlobal.setObject(self)
                }else{
                    return oo 
                }                
                
            }
           

            if(self.sahSuper.bool==true)self.sahSuper.aaSob(s,p);   
            self.fun("visi3d");
            setTimeout(function() {self.fun("visi3d");}, 10);
            self.mO.dragPriceScane()
            return r                       
        }


        this.xztest=function(){
            if(this.xz)if(this.xz.polkaNot==true)return true
            if(this.xz1)if(this.xz1.polkaNot==true)return true    
            return false
        }


        this.dCol22 = function () {  }
        this.bc = new RectCollis(
                5,
                5,
                5,
                5, this.dCol22);        
        
        this.bc.rectCollisMeshdy.boolStick=false;


        this.clear = function (b) {
            if(this._parent&&b==undefined){
                this._parent.remove(this);    
            } 
            if(this.children.length!=0) {
                for (var i = this.children.length - 1; i >= 0; i--) {
                    this.remove(this.children[i])
                }
            }             
            if(this.hrenNiz.bool==true)this.hrenNiz.clear();
            if(this.sahSuper.bool==true)this.sahSuper.clear();           
            if(this.xz!=null)this.xz.dragToPanel()
            if(this.xz1!=null)this.xz1.dragToPanel()    
            this.xz=null
            this.xz1=null 
            this.y=0; 
            this.x=0;
            this.boxColizi.rectCollisMeshdy.y=0
            this.boxColizi.position.y=0
            if(this.polka==true)this.polka=false;
            this.mO.dragPriceScane();
        };


        

        //тестим правую сторону
        var bb, aa
        this.isBoxTest = function(_x,_y,_w){
            if(this.parent==undefined)return true
            this.bc.rectCollisMeshdy.idRandom=this.parent.boxColizi.rectCollisMeshdy.idRandom;              
            this.bc.width=_w;
            this.bc.height=-(_y+this.yF);
            this.bc.x=this.parent.boxColizi.position._x+_x;
            this.bc.y=this.parent.boxColizi.position._y-this.bc.height/2;
            this.bc.rectCollisMeshdy.width=this.bc.width;
            this.bc.rectCollisMeshdy.height=this.bc.height;
            this.bc.rectCollisMeshdy.x=this.bc.x;
            this.bc.rectCollisMeshdy.y=this.bc.y-this.bc.height/2; 

            bb=this.parent.parent.collision.colozi.isInBigBox(this.bc.rectCollisMeshdy)
            if(bb==false)return true;

            aa=this.parent.parent.collision.colozi.getCollisionBox(this.bc.rectCollisMeshdy)
            if(aa.length!=0)return true;
            return false;
        }


        ////////////////////////////////////////////////////////
        var aaa,aa,ad,po,aaaWW
        this.getPrice=function(intColor, idMat){
            aaa=[];
            aa=null;
            if(this.bvColor==false)return aaa
            
            aa=menedsherMaterial.getArrOtObj(this.object,idMat,intColor)     

            if(aa!=undefined){
                ad=[];                         
                for (var j = 0; j < aa.length; j++) {
                    ad[j]=aa[j];                                
                }
                ad[8]=this.object;
                ad[9]=this.object.id;
                ad[10]=1;
                ad[11]=aa[3]*1;
                aaa.push(ad);
            }            

            this.krai.getPrice(aaa, intColor, idMat);             
            if(this.hrenNiz.bool==true)this.hrenNiz.getPrice(aaa, intColor, idMat);              
            if(this.sahSuper.bool==true)this.sahSuper.getPrice(aaa, intColor, idMat);           
            if(this.pppObj.bool==true)this.pppObj.getPrice(aaa, intColor, idMat);  
           
            if(this.id==95||this.id==31){
                if(!po)po=mO.getIdObj(110);
                var strXZ="plus"
                if(intColor==1)strXZ="plus1" 
                aaaWW=menedsherMaterial.getArrOtObj(po.obj,idMat,intColor)    
                
                aaaWW[9]=po.obj.id;
                aaaWW[8]=po.obj;
                aaa.push(aaaWW)
            }
            
            return aaa
        }
        /////////////////////////////////////////////

        this.outDrag = function(){            
            var bb=false;            
            if(this.parent!=undefined){
                if(mO.pieceTop.idRandom==this.parent.idRandom){
                    bb=true
                }
                this.parent.remove(this,true);
            }
            if(bb==true)if(mO.pieceTop.parent!=undefined)mO.pieceTop.parent.remove(mO.pieceTop);            
            mO.dragPriceScane()
        }

        this.overDrag = function(){
            
        }

       

        this.dragPar = function(){ 
            if(this.parent!=undefined){             
                this.parent.dVertic()           
            }
        }


        this.getObj = function(){
            var obj={}
            obj.type=this.type;
            obj.id=this.id;
            obj.x=self.content3d.position.x;
            obj.y=self.content3d.position.y;

            obj.intSah=this.intSah
            obj.intSah1=this.intSah1           

            obj.hrenNiz={}
            obj.hrenNiz.intSah=this.hrenNiz.intSah;
            obj.hrenNiz.intSah1=this.hrenNiz.intSah1;

            obj.polka1=this.hrenNiz.polka1;

            obj.polka=this.polka
            obj.plusR=this.krai.plusR
            obj.plusL=this.krai.plusL
            
            

            obj.children=[];
            obj.idColor=this.idColor;
            if(this.sahSuper.bool==true)obj.sahSuper=this.sahSuper.getObj()



            for (var i = 0; i < this.children.length; i++) {
                obj.children[i]=this.children[i].getObj();
            }
            obj.up1=this.pppObj.up1.bool;
            //if(this.pppObj.up1.bool==true)

            return obj;            
        }


        var ob,ooo
        this.setObj = function(obj){                      
            this.setXYPosit(obj.x,obj.y); 


            

            if(obj.sahSuper!=undefined){
                this.sahSuper.setObj(obj.sahSuper)
            }            

            if(obj.children){         
                this.notDrag=true;
                for (var i = 0; i < obj.children.length; i++) {
                    ooo= mO.getIdObj(obj.children[i].id)                  
                    ob=mO.getBlok(ooo.obj)
                    ob.setObj(obj.children[i])
                    this.add(ob);                 
                }
                this.notDrag=false;
            } 


            if(obj.polka)this.polka=obj.polka
            if(obj.polka1)this.hrenNiz.polka1=obj.polka1    
            if(obj.plusR!=undefined){                
                this.krai.plusR = obj.plusR;
                this.krai.plusL = obj.plusL;
            } 
            



                
            if(obj.intSah!=undefined){                
                self.hrenNiz._intSah=self.krai._intSah=self._intSah=-2
                self.hrenNiz._intSah1=self.krai._intSah1=self._intSah1=-2 
                self.intSah=obj.intSah;
                self.intSah1=obj.intSah1;
                if(obj.hrenNiz!=undefined){
                    if(self.hrenNiz._intSah!=obj.hrenNiz.intSah){                   
                        self.hrenNiz.intSah=obj.hrenNiz.intSah;
                    }
                    if(self.hrenNiz._intSah1!=obj.hrenNiz.intSah1){
                        self.hrenNiz.intSah1=obj.hrenNiz.intSah1;
                    } 
                }                
            }

            if(obj.up1){
                self.pppObj.up1.bool=obj.up1;                
            }

            if(obj.idColor){
                //setTimeout(function(){
                    self.idColor=obj.idColor                    
              // } , 2000);              
            }            
            self.drahShadow(obj.x,obj.y);                       
        }

        this.iAp=0
        //this function working with key event
        this.sobKey = function(tip,e,arrNa){                       
            if(this.parent){
                let b=false;         
                let xxx=this.parent.boxColizi.rectCollisMeshdy.x+this.boxColizi.rectCollisMeshdy.x+this.boxColizi.rectCollisMeshdy.width/2;
                let yyy=this.parent.boxColizi.rectCollisMeshdy.y+this.boxColizi.rectCollisMeshdy.y+this.boxColizi.rectCollisMeshdy.height;               
                if(tip=="down"){  
                    this.fun("visi3d");                    
                    if(e.keyCode==40 || e.keyCode==83)  {
                        yyy-=3.2;    
                        b=true;                    
                    }

                    if(e.keyCode==38 || e.keyCode==87)  { 
                        yyy+=3.2;    
                        b=true;
                    }
                    this.bds=true;
                    this.setXY(xxx,yyy)
                    this.bds=false;
                    if(b){
                        this.fun("visi3d"); 
                        this.mO.par.par.visiActiv.setObject(this); 
                    }                    
                }
                if(e.keyCode==38 || e.keyCode==87||e.keyCode==40 || e.keyCode==83)
                if(tip=="up"){
                    var iAp=Math.random()
                    this.iAp=iAp;
                    setTimeout(function() {
                        if(self.iAp==iAp){
                            
                            self.mO.par.par.par.tudaSuda.saveMod()
                        }

                    }, 100);
                }
            }          
        }
        this.parOld=undefined;
    } 


    set polka(v) {
        if(this._polka!=v){
            this._polka= v;            
            this.hrenNiz.polka= v; 
            this.krai.drag() 
            this.fun("visi3d");      
        }
        if(this.hrenNiz.dKTest!=undefined)this.hrenNiz.dKTest()       
    }   
    get polka() { return  this._polka;}


    set intSah(v) {
        if(this._intSah!=v){
            this._intSah= v;        
            this.krai.intSah= v;                         
            this.hrenNiz.intSah= v;        
        }  
        if(this.hrenNiz.dKTest!=undefined)this.hrenNiz.dKTest()
    }   
    get intSah() { return  this._intSah;}


    set intSah1(v) {              
        if(this._intSah1!=v){            
            this._intSah1= v;            
            this.krai.intSah1= v;
        }  
        if(this.hrenNiz.dKTest!=undefined)this.hrenNiz.dKTest();
    }   
    get intSah1() { return  this._intSah1;}


    set parent(v) {
        if(this._parent!=v){
            this.parOld=this._parent;           
            if(this.dragParentDo) this.dragParentDo(this._parent, v);   
            this._parent= v; 
            if(this._parent==undefined){
                this.mO.visi3D.event3DArr.removeChild(this.c3dNa);
                if(this.content)if(this.content.parent)this.content.parent.removeChild(this.content)
                if(this.parOld!=undefined) {                    
                    if(this.parOld.drahShadow!=undefined)this.parOld.drahShadow();
                } 
            } else{
                this.mO.visi3D.event3DArr.addChild(this.c3dNa);
                if(this._parent.content)this._parent.content.addChild(this.content)
                this.testKorektActiv();               
                this.dragToPanel();  
                this.drahShadow();                         
            }  
            if(this.dragParent) this.dragParent(); 
            this.parOld=this._parent           
        }       
    }   
    get parent() { return  this._parent;}



}


//карая
export class BKrai {
    constructor(par) {    
        var self=this;    
        this.type = "BKrai";        
        this.par=par;
        this.aH=[];
        this.arrHron;
        this.arrModel=[];
        this._intSah=-1; //-1 отсутствие 0 нет пересечений 1 пересекаеться с другой
        this._intSah1=-1;

        this.sahIB=0
        this.content3d = new THREE.Object3D();
        this.par.c3dNa.add(this.content3d);
        this.yMax=this.par.yMax;
        this.idSvaz=this.par.object.str[2]
        this.boolStorona=false;
        this.bool=false
        this.yS=0;
        this.yF=0;
        this.ySMin=0;
        var sah=0
        this.boolLoadHron=false;

        this._plusL=false;
        this._plusR=false;



        this.initHron=function(){            
            sah++;
            if(sah==2)self.initHron2()            
        }

        this.initHron2=function(){            
            this.boolLoadHron=true; 
            this.par.yMax=this.yMax=this.arrHron[0].object.obj.mod.r[5]*1;
            this.ySMin=this.arrHron[0].object.obj.mod.r[5]*1
            if(this.par.ySMin<this.ySMin)this.par.ySMin=this.ySMin;
            //this.ySMin
            this.par.testYF()


            this.initHron3()          
        }


        this.initHron3=function(){ 
            var b=true
            if(sah!=2)b=false;
            if(this.hronPlus!=undefined){
                if(this.hronPlus.obj3d==undefined)b=false;                 
            }  
            if(b==false)return

            this.drag();            

            self.par.testKorektActiv()                
            self.par.dragToPanel()

        } 

                //Вставляем вешалку
        this.bkhKey=null;

        this.initKey=function(){
            if(this.bkhKey!=null)return;            
            var kkk="235"
            if(self.par.object.mod.r[4]>35)kkk="236";
            this.bkhKey = new BKHron(this, kkk, 1);

            //L
            this.c3dkL = new THREE.Object3D();            
            this.par.c3dNa.add(this.c3dkL);


            //R
            this.c3dkR = new THREE.Object3D();
            this.par.c3dNa.add(this.c3dkR);

            

            this.bkhKey.initHron=function(){
                
                let m=self.bkhKey.get();
                self.c3dkL.add(m);
                m.position.set(0,0,0);
   
                
                self.c3dkL.position.x=self.par.object.mod.r[0];
                self.c3dkL.position.z=self.par.object.mod.r[4]/2;
                self.c3dkL.rotation.z=Math.PI/2;
                self.c3dkL.rotation.x=Math.PI/2;

                var omb, o
                var mark=self.par.markers
                for (var i = m.children[0].children.length-1; i >=0 ; i--) {                    
                    if(m.children[0].children[i].name.indexOf("marker")!=-1){                        
                        o = self.par.mO.getRendomID("tit12");                        
                        omb=mark.getO3D(o)
                        omb.setPRS({
                            x:m.children[0].children[i].position.x,
                            y:m.children[0].children[i].position.z,
                            z:-m.children[0].children[i].position.y
                        })                        
                        m.children[0].add(omb.content3d);
                        omb.content3d.rotation.x=Math.PI/2;
                        omb.boolColVisi=false;
                        m.children[0].remove(m.children[0].children[i])
                    }
                }



                m=self.bkhKey.get();
                self.c3dkR.add(m);
                m.position.set(0,0,0);                
                self.c3dkR.position.x=-self.par.object.mod.r[0];
                self.c3dkR.position.z=self.par.object.mod.r[4]/2;
                self.c3dkR.rotation.z=-Math.PI/2;
                self.c3dkR.rotation.x=Math.PI/2;


                for (var i = m.children[0].children.length-1; i >=0 ; i--) {                    
                    if(m.children[0].children[i].name.indexOf("marker")!=-1){                        
                        o = self.par.mO.getRendomID("tit12");                       
                        omb=mark.getO3D(o)
                        omb.setPRS({
                            x:m.children[0].children[i].position.x,
                            y:m.children[0].children[i].position.z,
                            z:-m.children[0].children[i].position.y
                        })                        
                        m.children[0].add(omb.content3d)
                        omb.content3d.rotation.x=Math.PI/2
                        omb.boolColVisi=false
                        m.children[0].remove(m.children[0].children[i])                                              
                    }
                }
                self.drag();
            }
            this.bkhKey.init();
        }


        //--------------


        var mesh,sahPlus,sahPlus1
        this.drag=function(){             
            if(this.bool==false)return 
            if(this.boolLoadHron==false)return
           
            if(this.c3dkL)this.c3dkL.visible=false; 
            if(this.c3dkR)this.c3dkR.visible=false; 

            
            for (var i = 0; i < self.arrHron.length; i++) {
                this.arrHron[i].clear();
            }
            if(this.hronPlus)this.hronPlus.clear();

            if(this._intSah!=-1){
                if(this.arrHron[this._intSah]!=undefined){
                    mesh=this.arrHron[this._intSah].get();
                    mesh.position.x=-this.par.object.mod.r[3]/2                
                    mesh.scale.x=1;
                }
                if(this.par._polka==false){
                    if(this._plusL==false){
                        if(this.hronPlus)if(this.hronPlus.obj3d){//закрывашки
                            mesh=this.hronPlus.get();
                            mesh.position.x=-this.par.object.mod.r[3]/2 
                            mesh.scale.x=1;
                            sahPlus++; 
                        } 
                    }else{
                        if(this.bkhKey!=null && this.bkhKey.obj3d){
                            this.c3dkL.visible=true; 
                        }
                    }
                }                
            }

            
            if(this._intSah1!=-1){
                if(this.arrHron[this._intSah1]!=undefined){                    
                    mesh=this.arrHron[this._intSah1].get();
                    mesh.position.x=this.par.object.mod.r[3]/2                    
                    mesh.scale.x=-1;
                }

                if(this.par._polka==false){                    
                    if(this._intSah1==0){
                        if(this._plusR==false){
                            if(this.hronPlus)if(this.hronPlus.obj3d){//закрывашки
                                mesh=this.hronPlus.get();
                                mesh.position.x=this.par.object.mod.r[3]/2 
                                mesh.scale.x=-1;
                                sahPlus++ 
                            }
                        }else{
                            if(this.bkhKey!=null && this.bkhKey.obj3d){
                                this.c3dkR.visible=true; 
                            }  
                        }
                    }
                }

                
            }
        }


        this.hronPlus=undefined;        
        this.plusHron=function(num, num1){            
            this.hronPlus=new BKHron(this, num, 1)
            this.hronPlus.initHron=function(){               
                self.initHron3();
            }            
            this.hronPlus.init();            
        }


        this.arrHron=[null,null]
        if(this.par.object.str[2]*1!=0){ 
            this.bool=true;           
            if(this.par.object.str[2]==32)this.plusHron(109);
            if(this.par.object.str[2]==23)this.plusHron(108);
            //if(this.par.object.str[2]==236)this.plusHron(108);  
            this.arrHron=[new BKHron(this, this.par.object.str[2],0), new BKHron(this, this.par.object.str[3],1)]
            for (var i = 0; i < this.arrHron.length; i++) {
                this.arrHron[i].init();
            }
            this.par.aa.unshift("plusR");
            this.par.aa.unshift("plusL");
        }else{
            this.par.yMax=this.yMax=this.par.object.mod.r[5]*1;
            this.par.ySMin=this.par.object.mod.r[5]*1;            
        }

        
        this.funDragColor2=function(){   

        }
        
        var aaaaa=[null,null];
        var strXZ 
        var aaa=[]
        var aaa1=[]
        this.getPrice=function(a, intColor, idMat){
            if(this.bool==false)return
            strXZ="plus"
            if(intColor==1)strXZ="plus1"; 


            if(this.c3dkR && this.c3dkR.visible){
                aaa = menedsherMaterial.getArrOtObj(this.bkhKey.object.obj,idMat,intColor)
                aaa[9]=this.bkhKey.object.obj.id;
                aaa[8]=this.bkhKey.object.obj;
                a.push(aaa); 
                
            }
            if(this.c3dkL && this.c3dkL.visible){
                
                aaa = menedsherMaterial.getArrOtObj(this.bkhKey.object.obj,idMat,intColor)
                aaa[9]=this.bkhKey.object.obj.id;
                aaa[8]=this.bkhKey.object.obj;
                a.push(aaa);
                
            }

            if(this._intSah!=-1){
                aaa = menedsherMaterial.getArrOtObj(this.arrHron[this._intSah].object.obj,idMat,intColor)
              
                   
                    aaa[9]=this.arrHron[this._intSah].object.obj.id;
                    aaa[8]=this.arrHron[this._intSah].object.obj;
                    a.push(aaa);                   
               
                


                if(this.hronPlus)
                if(this.par._polka==false)                    
                if(this._intSah==0){
                    aaa = menedsherMaterial.getArrOtObj(this.hronPlus.object.obj,idMat,intColor)
                   

                    aaa[5]=0
                    aaa[6]=1
                    aaa[9]=this.hronPlus.object.obj.id;
                    aaa[8]=this.hronPlus.object.obj;
                    a.push(aaa) 
                }

            }
            if(this._intSah1!=-1){ 
                aaa = menedsherMaterial.getArrOtObj(this.arrHron[this._intSah1].object.obj, idMat, intColor)                            
                /*if(this.arrHron[this._intSah1].object.obj[strXZ]!=undefined){
                    aaa=[] 
                    for (var i = 0; i < this.arrHron[this._intSah1].object.obj[strXZ].length; i++) {
                        aaa[i]=this.arrHron[this._intSah1].object.obj[strXZ][i]
                    }*/

                    aaa[9]=this.arrHron[this._intSah1].object.obj.id;
                    aaa[8]=this.arrHron[this._intSah1].object.obj;
                    a.push(aaa)                    
                //}

                if(this.hronPlus)
                if(this.par._polka==false)
                if(this._intSah1==0){
                    aaa = menedsherMaterial.getArrOtObj(this.hronPlus.object.obj,idMat,intColor)
                   /* aaa=[] 
                    for (var i = 0; i < this.hronPlus.object.obj[strXZ].length; i++) {
                        aaa[i]=this.hronPlus.object.obj[strXZ][i]
                    }*/
                    aaa[5]=1
                    aaa[6]=0
                    aaa[9]=this.hronPlus.object.obj.id;
                    aaa[8]=this.hronPlus.object.obj;
                    a.push(aaa) 
                }
            }   
        }
    }

    set plusL(v) {
        if(this._plusL!=v){            
            this._plusL= v;
            this.initKey();
            this.drag()
        }       
    }   
    get plusL() { return  this._plusL;}


    set plusR(v) {
        if(this._plusR!=v){
            this._plusR= v;
            this.initKey();
            this.drag()
            
        }       
    }   
    get plusR() { return  this._plusR;}


    set intSah(v) {
        if(this._intSah!=v){
            this.sahIB++
            this._intSah= v;
            if(this.par.boolKr==true){
                this._intSah=0
            }            
            this.drag();         
        }       
    }   
    get intSah() { return  this._intSah;}


    set intSah1(v) {
        if(this._intSah1!=v){ 
            this.sahIB++           
            this._intSah1= v;            
            this.drag();         
        }       
    }   
    get intSah1() { return  this._intSah1;}

}


//вешалка
export class HrenNiz {
    constructor(par) {    
        var self=this;    
        this.type = "HrenNiz";        
        this.par=par;
        this.aH=[];
        this.arrHron;
        this.arrModel=[];
        this._polka=false;

        this._polka1="null";
        this.arrP1=[];
        this.aP1=[];
        this.kolP1=1;


        if(this.par.object.str[5]!=undefined){
            if((this.par.object.str[5]+"").length>6){
                if(this.par.object.str[5].indexOf("polka1")!=-1){
                    let ss=""
                    for (var i = 0; i < this.par.object.str[5].length; i++) {                        
                        if(this.par.object.str[5][i]=="|")ss+='"'
                        else ss+=this.par.object.str[5][i]
                            
                    }
                    var oo={type:"polka1",id:244}


                    trace(JSON.stringify(oo)+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",ss);


                    let o=JSON.parse(ss); 
                    if(o.type && o.type=="polka1" && o.id) {
                        this.arrP1.push(o.id)
                        if(o.kol)this.kolP1= o.kol;
                    }

                    trace("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",this.par.object.str[5],o);
                    //{|type|:|polka1|,|id|:242,|kol|:2}
                }
                
            }
        }

        this._intSah=-1;
        this._intSah1=-1;

        this._intSah=-1; //-1 отсутствие 0 нет пересечений 1 пересекаеться с другой
        this._intSah1=-1;
        this.content3d = new THREE.Object3D();
        this.par.c3dNa.add(this.content3d);        
        this.content3d.visible=this._polka;

        this.c3dp1 = new THREE.Object3D();
        this.par.c3dNa.add(this.c3dp1); 

        this.c3dp1.position.z=this.par.object.mod.r[4]/2//+this.par.object.mod.r[1];
        

        this.idSvaz=this.par.object.str[1]+"";
        this.bool=false;
        this.yF=0;
        this.ySMin=0;
        this.arrHron=[];
        this.arrMark=undefined;

        this.bool3=false;
        if(this.par.object.num[2]==1)this.bool3=true;
        

        if(this.idSvaz=="0"){            
            return;
        }else{
            this.bool=true;
        }
        this.bool3 = false;

        this.arrTrub=[this.par.mO.getIdObj(84),this.par.mO.getIdObj(83),this.par.mO.getIdObj(82),this.par.mO.getIdObj(81)];
        this.www = Math.round(this.par.object.mod.r[3]/15)*15
        this.otstup=1;
        this.yF=-10;
        this.ySMin=10;        
        var mesh,mesh1;
        var sah=0;
        this.initHron = function(){
            sah++            
            if(sah<self.arrHron.length)return;
            mesh=self.arrHron[0].get();            
            
            if(self.par.dragPar)self.par.dragPar();
            self.drag();
                        
        }

        this.object=this.par.mO.getIdObj(this.idSvaz); 
        if(this.bool3==true){
             this.content3d.position.z=this.par.object.mod.r[4];           
        }else{
            this.content3d.position.z=this.object.obj.mod.r[2];
            this.content3d.position.y=-this.object.obj.mod.r[1];
        }



        this.yF=-this.object.obj.mod.r[1]-this.object.obj.mod.r[4]/2;
        this.ySMin=this.object.obj.mod.r[1]+this.object.obj.mod.r[4]/2;

        this.bkHron=new BKHron(this, this.idSvaz, 0);       
        
        var arr=this.object.obj.str[0].split(",");  

        this.arrHron.push(new BKHron(this, this.idSvaz, 0))







        



        var oPlus=new THREE.Vector3(0,0,0);        
        if(this.bool3==false){            
            this.par.aa.unshift("polka");

            for (var i = 0; i < this.arrP1.length; i++) {
                
                this.par.aa.splice(1,0,"p1_"+this.arrP1[i]);

                this.aP1.push(new BKHron(this, this.arrP1[i], 1));
            }



            this.arrHron.push(new BKHron(this, arr[0], 1))
            this.arrHron.push(new BKHron(this, arr[1], 1))
            this.arrHron.push(new BKHron(this, arr[2], 1))
            this.arrHron.push(new BKHron(this, arr[3], 1))

        }
        if(this.bool3==true){
            setTimeout(function() {
                self.par.polka=true  
            }, 1);

            oPlus.y=-1
            oPlus.z=1.5
            this.arrHron.push(new BKHron(this, arr[0], 1))
            this.arrHron[2]=new BKHron(this, arr[2], 1)
        }



        
        

        this.clear=function(){  
            for (var i = 0; i < this.arrHron.length; i++) {
                this.arrHron[i].clear();
            } 
            for (var i = 0; i < this.aP1.length; i++) {
                if(this.aP1[i].obj3d!=undefined)this.aP1[i].clear();
            }          
        }

        var xx,ww
        var vvv, vvv1
        this.dKTest = function(){
            vvv=-1;
            vvv1=-1;
            if(this._polka==false)return;
            vvv=0;
            if(this.par.xz!=null)if(this.par.xz._polka==true){
                vvv=1;                
            }            
            vvv1=0;
            if(this.par.xz1!=null)if(this.par.xz1._polka==true){
                vvv1=1;
            }            
            this.intSah=vvv;
            this.intSah1=vvv1;
        }




        self.hmp1=null
        this.drag=function(){
            this.clear();
            for (var i = 0; i < this.arrHron.length; i++) {
                if(this.arrHron[i].obj3d==undefined){
                    this.timeTest()
                    return;
                }
            }


            ww=this.www;
            xx=0;            
            
            if(this.arrHron[2]){
                if(this.bool3==false){
                    mesh=this.arrHron[2].get();
                    mesh.position.x=-this.www/2+oPlus.x;
                    mesh.position.y=-this.arrHron[2].object.obj.mod.r[2]+oPlus.y;
                    mesh.position.z=this.arrHron[2].object.obj.mod.r[0]+oPlus.z;
                    mesh1=null;
                    
                }
            }

            if(this._intSah!=-1){
                if(this._intSah==0){
                    if(this.arrHron[1]){
                        mesh=this.arrHron[1].get();
                        mesh.scale.x=1
                        mesh.position.x=-this.www/2 -this.otstup;
                    }

                    xx=-this.otstup/2;                    
                    ww+=this.otstup;                    
                }  

                if(this._intSah==1){
                    if(this.arrHron[3]){
                        mesh=this.arrHron[3].get();
                        mesh.position.x=-this.www/2;
                    }
                }               
            }

            if(this._intSah1!=-1){
                if(this._intSah1==0){
                    if(this.arrHron[1]){
                        mesh=this.arrHron[1].get();
                        mesh.position.x=+this.www/2 +this.otstup;
                        mesh.scale.x=-1  
                    }                    

                    xx+=this.otstup/2;                    
                    ww+=this.otstup;

                    if(this.arrHron[2] &&this.bool3==false){
                        mesh1=this.arrHron[2].get();
                        mesh1.position.x=this.www/2+oPlus.x;
                        mesh1.position.y=-this.arrHron[2].object.obj.mod.r[2]+oPlus.y;
                        mesh1.position.z=this.arrHron[2].object.obj.mod.r[0]+oPlus.z;
                    }
                }
            }

            mesh=self.arrHron[0].get();
            mesh.scale.x=ww/self.arrHron[0].object.obj.mod.r[3];
            mesh.position.x=xx; 
            
            self.hmp1=null
            if(self.polka1!="null"){
                for (var i = 0; i < self.aP1.length; i++) {                    
                    if(self.polka1.indexOf(self.aP1[i].object.id+"")!=-1){
                        if(self.aP1[i].obj3d!=undefined){
                          /*  mesh=self.aP1[i].get();
                            mesh.rotation.x=-Math.PI/2;
                            self.hmp1=self.aP1[i] 
                            mesh.position.y=self.aP1[i].object.obj.mod.r[1]; */

                            let sah=(self.object.obj.mod.r[3]/(self.kolP1+1))
                            trace("sah>>>",sah)
                            for (var j = 0; j < self.kolP1; j++) {

                                mesh=self.aP1[i].get();
                                mesh.rotation.x=-Math.PI/2;
                                self.hmp1=self.aP1[i] 
                                mesh.position.y=self.aP1[i].object.obj.mod.r[1]; 

                                mesh.position.x=-self.object.obj.mod.r[3]/2+sah+j*sah
                                
                            }/**/
                                                      
                            break;
                        }                        
                    }
                }
            }


            self.initMark();
            self.par.fun("visi3d");

            
        }


        this.dragMark=function(){
            if(this.arrMark==undefined)return; 
            for (var i = 0; i < this.arrMark.length; i++) {
                this.arrMark[i].c2.visible=this._polka
            }
        }



        this.initMark=function(){
            if(this.arrMark!=undefined)return;
            if(this._polka== false ) return;

            this.arrMark=[];
            var mark=this.par.markers;
            var otSah=self.par.object.mod.r[0]+2;
            var omb;
            var o=this.par.mO.getRendomID("tit3");
            for (var i = 0; i < 92; i++) {                
                if(o!=null){ 
                    omb=mark.getO3D(o)
                    this.arrMark.push(omb) 
                    let z=o.obj.mod.r[4]+this.object.obj.mod.r[1]-this.arrHron[0].object.obj.mod.r[5]/2-1+o.obj.mod.r[1]
                    let y= this.object.obj.mod.r[2]+this.arrHron[0].object.obj.mod.r[5]/2+ o.obj.mod.r[5]/2+o.obj.mod.r[2];
                    if(this.bool3==true) {
                        z=o.obj.mod.r[4]-2 
                        y=this.content3d.position.z
                    }               
                    omb.setPRS({
                        x:otSah-o.obj.mod.r[0],
                        y:y,
                        z:z
                    });
                    otSah+=o.obj.mod.r[3]+2;
                }
                o = this.par.mO.getRendomID("tit3"); 
                if(otSah+o.obj.mod.r[3] > self.par.object.mod.r[3]+self.par.object.mod.r[0]-4) {
                    break;
                } 
            }
        }


        var sto
        this.timeTest=function(){
            if(sto)clearTimeout(sto)
            sto=setTimeout(function() {
                self.drag();
            }, 500);
        }

        this.funDragColor2=function(){               
            this.arrHron[2].dragC(this.par.material)
        }

        var strXZ, aaa, aaa1;
        this.getPrice=function(a, intColor, idMat){            
            if(this._polka==false)return
            strXZ="plus"
            if(intColor==1)strXZ="plus1"

               
            //висяшки первая
            //aaa=[]
            if(this.arrHron[2]){ 
                aaa = menedsherMaterial.getArrOtObj(this.arrHron[2].object.obj, idMat, intColor)  
                //this.parsArr(this.arrHron[2].object.obj[strXZ], aaa)           
                aaa[9]=this.arrHron[2].object.obj.id;
                aaa[8]=this.arrHron[2].object.obj;
                a.push(aaa)
            }
               
            
            //висяшки вторая
            if(mesh1!=null){
                if(this.arrHron[2]){ 
                    aaa1=[]                 
                    aaa1 = menedsherMaterial.getArrOtObj(this.arrHron[2].object.obj, idMat, intColor)  
                    //this.parsArr(aaa, aaa1) 
                    aaa1[9]=this.arrHron[2].object.obj.id;
                    aaa1[8]=this.arrHron[2].object.obj;
                    a.push(aaa1);
                }

                         
            }

            var p=-1;
            for (var i = this.arrTrub.length-1; i >=0; i--) {
                if(ww<this.arrTrub[i].obj.num[0]/10){                    
                    p=i;
                }
            }
            if(p!=-1){ 
                aaa = menedsherMaterial.getArrOtObj(this.arrTrub[p].obj, idMat, intColor)                                          
                aaa[9]=this.arrTrub[p].obj.id;
                aaa[8]=this.arrTrub[p].obj;
                a.push(aaa);
                
            }

            if(this._intSah==0){
                aaa = menedsherMaterial.getArrOtObj(this.arrHron[1].object.obj, idMat, intColor) 
                aaa[9]=this.arrHron[1].object.obj.id;
                aaa[8]=this.arrHron[1].object.obj;
                a.push(aaa)               
            }

            if(this._intSah==1){
                if(this.arrHron[3]){ 
                    aaa = menedsherMaterial.getArrOtObj(this.arrHron[3].object.obj, idMat, intColor) 
                    aaa[9]=this.arrHron[3].object.obj.id;
                    aaa[8]=this.arrHron[3].object.obj;               
                    a.push(aaa); 
                }            
            }

            if(this._intSah1==0){
                aaa = menedsherMaterial.getArrOtObj(this.arrHron[1].object.obj, idMat, intColor)        
                aaa[9]=this.arrHron[1].object.obj.id;
                aaa[8]=this.arrHron[1].object.obj;
                a.push(aaa)              
            }

            if(this.hmp1!=null){
                for (var i = 0; i < this.kolP1; i++) {
                    aaa = menedsherMaterial.getArrOtObj(this.hmp1.object.obj, idMat, intColor)        
                    aaa[9]=this.hmp1.object.obj.id;
                    aaa[8]=this.hmp1.object.obj;
                    a.push(aaa) 
                }
                
            }
        } 

        this.parsArr=function(a, a1){
            for (var i = 0; i < a.length; i++) {
                a1[i]=a[i]
            }
        } 

        for (var i = 0; i < this.arrHron.length; i++) {
            this.arrHron[i].bbbb=false;
            this.arrHron[i].init();
        } 


        ////////////////polka1//////////////////
        this.boolaP1=false
        this.initP1=function(){
            if(this.boolaP1!=false)return;
            this.boolaP1=true;
            for (var i = 0; i < this.aP1.length; i++) {    
                this.aP1[i].content3d=this.c3dp1        
                this.aP1[i].init();               
            }
        }
        ////////////////////////////
    }


    





    set polka(v) {
        if(this.bool3==true && v==false)return
        if(this._polka!=v){
            this._polka= v; 
            if(this.bool==false) return              
            this.content3d.visible=this._polka;     
            if(v==true){
                this._polka1="nul";
                this.polka1="null";
                this.par.yF=this.yF; 
                this.par.ySMin=this.ySMin;                 
                this.drag();                             
            }else{
                this.par.yF=this.par.krai.yF;
                this.par.ySMin=this.par.krai.ySMin;   
            } 
            this.dragMark();            
        }       
    }   
    get polka() { return  this._polka;}

    set polka1(v) {  
        if(this._polka1=="null" && v=="null")return;
        if(this._polka1!="null" && this._polka1==v)v="null";

        
        this._polka1= v;          
        this.initP1()

        this.drag();
        if(this._polka1=="null"){
            this.par.yS=0;    
        }else{
            if(this.hmp1!=null){
                this.polka=false;
                this.par.yS=this.hmp1.object.obj.mod.r[4]
            }            
        }       


        
        this.dragMark(); 
                                    
           
    }   
    get polka1() { return  this._polka1;}

    


    set intSah(v) {
        if(this._intSah!=v){
            this._intSah= v; 
           
            if(this.bool==false) return   
                   
            this.drag();         
        }       
    }   
    get intSah() { return  this._intSah;}


    set intSah1(v) {
        if(this._intSah1!=v){            
            this._intSah1= v; 
           
            if(this.bool==false) return              
            this.drag();         
        }       
    }   
    get intSah1() { return  this._intSah1;}
}



//крючки
export class SahSuper {
    constructor(par) {    
        var self=this;    
        this.type = "SahSuper";        
        this.par=par;
        this.aH=[];
        this.arrHron;
        this.arrModel=[];
        this._polka=false;
        this._intSah=-1;
        this._intSah1=-1;
        this._intSah=-1; //-1 отсутствие 0 нет пересечений 1 пересекаеться с другой
        this._intSah1=-1;
        this.content3d = new THREE.Object3D();
        this.par.c3dNa.add(this.content3d);      
        this.array=[];        
        this.bool=false;
        this.yF=0;
        this.ySMin=0;
        this.kolII=1;
        this.kolJJ=1;
        this.pozII=0;
        this.pozJJ=0;
        this.sahII=0;
        this.sahJJ=0;

        this.arrHron=[]; 

        if(this.par.object.str[4]!=undefined){
            if((this.par.object.str[4]+"").length>6){
                this.bool=true;
            }
        }
          
        if(this.bool==false){
            return;
        }

        this.aroundButton=this.par.mO.par.aroundButton;

        var a=this.par.object.str[4].split(',');
        var ab=this.par.object.str[4].split('|')
        ab=ab[1].split(',');
        var b,b1
        b1=true;
        
        for (var j = 0; j < ab.length; j++) {
            b=true;            
           /* for (var i = 0; i < this.aroundButton.array.length; i++) {
                if(this.aroundButton.array[i].name=="mod_"+ab[j])b=false
                if(this.aroundButton.array[i].name=="mod_clear")b1=false    
            } 
            if(b==true){
                this.aroundButton.creat("mod_"+ab[j],"resources/image/id_"+ab[j]+".png", "resources/image/id_"+ab[j]+".png",1)
            }*/
            this.par.aa.push("mod_"+ab[j])
        } 
       /* if(b1==true){ 
            this.aroundButton.creat("mod_clear_"+this.par.id,"resources/image/a_mod_clear_"+this.par.id+".png", "resources/image/a_mod_clear_"+this.par.id+".png",1)
        }*/

        this.par.aa.push("mod_clear_"+this.par.id)

        this.pozII=a[0]*1;
        this.pozJJ=a[3]*1-2.5;

        this.sahII=a[1]*1;
        this.sahJJ=a[4]*1;

        this.kolII=a[2]*1;
        this.kolJJ=a[5]*1;
        this.zz=a[6]*1;
        this.arrBool=[];

        for (var i = 0; i < this.kolII; i++) {
            this.arrBool[i]=[]
            for (var j = 0; j < this.kolJJ; j++) {
                this.arrBool[i][j]=new BoxSS(this, i, j);                
                this.arrBool[i][j].x=this.pozII+this.sahII*i;
                this.arrBool[i][j].y=-(this.pozJJ+this.sahJJ*j);
                this.content3d.position.z=this.zz;               
            }
        }


        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible=false;
            }
            for (var i = 0; i < this.kolII; i++) {           
                for (var j = 0; j < this.kolJJ; j++) {
                    this.arrBool[i][j].bool=0
                }
            }
        }  


        this.getO3D=function(o){           
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible==false){
                    if(this.array[i].object.id==o.id){
                        return this.array[i];
                    }
                }                
            }
            
            var oo=new THREE.Object3D()
            var link="resources/data/"+o.obj.id+"/mod/"+ o.obj.mod.name   
            oo.object=o;   
                    
            this.par.mO.getModel(link, o.obj.mod.key,function(o){                
                oo.add(o);
                o.position.z=-oo.object.obj.mod.r[1];
                o.position.x=-oo.object.obj.mod.r[0];
                o.position.y=oo.object.obj.mod.r[2]+oo.object.obj.mod.r[5]/2;                
                self.par.fun("visi3d");

            });            
            oo.idObj=o.obj.id;
            this.array.push(oo);            
            return oo;            
        }


        var aa;
        this.aaSob=function(s,p){ 
            trace(s,p)           
            aa=s.split("_")           
            if(aa[0]=="mod"){
                trace(s,p) 
                this.getObjSob(aa[1]);
            }
        }


        this.objObj={}
        var o3d
        this.getObjSob=function(s){
            
            if(s=="clear"){
                this.clear()
                return
            }

            if(this.objObj[s]==undefined)this.objObj[s]=this.par.mO.getIdObj(s)
            
            
            var a=this.getPosit(this.objObj[s]) 

            if(a.length!=0){
                for (var i = 0; i < a.length; i++) {
                    o3d=this.getO3D(this.objObj[s]);                    
                    this.objObj[s].kol=kool
                    this.content3d.add(o3d)
                    o3d.position.x=a[i].box.x;
                    o3d.position.y=a[i].box.y;
                    o3d.ii=a[i].box.ii;
                    o3d.jj=a[i].box.jj;
                    o3d.visible=true;  
                }
                this.par.fun("visi3d");
            } 
            trace(a)           
        }


        var kool
        this.getPosit=function(o){ 
            trace(o) 
            //-1.5,7.9,4,5.8,3.23,1,0.5,|243|         
            var r=[]
            var a=o.obj.str[0].split(",")
            var kol=a[0]*1
            kool=kol
            var iii=a[1]*1
            var jjj=a[2]*1
            var id=o.obj.id;

            for (var ii = 0; ii < kol; ii++) {
                var o={id:id};
                for (var i = 0; i < this.kolII; i++) {
                    for (var j = 0; j < this.kolJJ; j++) {                        
                        if(this.arrBool[i][j].bool==0){                            
                            var b=true;
                            for (var ei = 0; ei< iii; ei++) {
                                if(this.arrBool[i+ei]!=undefined){
                                    for (var ej = 0; ej < jjj; ej++) {
                                        if(this.arrBool[i+ei][j+ej]!=undefined){
                                            if(this.arrBool[i+ei][j+ej].bool==0){
                                                this.arrBool[i+ei][j+ej].bool=2;
                                            }
                                            else{                                                
                                               b=false;
                                            }
                                        }else{                                            
                                            b=false;   
                                        }
                                    }
                                }else{                                  
                                    b=false; 
                                }                                
                            }
                            if(b==true){                                
                                o.i=i;
                                o.j=j;
                                o.box=this.arrBool[i][j];
                                i=j=99999;
                            }
                        }
                    }
                }
                if(o.i==undefined){
                    r=[]
                    break;
                }else{
                    r.push(o)
                }                
            }  


            if(r.length!=0){
                for (var i = 0; i < r.length; i++) {
                    for (var ei = 0; ei< iii; ei++) {
                        if(this.arrBool[r[i].i+ei]!=undefined){
                            for (var ej = 0; ej < jjj; ej++) {
                                if(this.arrBool[r[i].i+ei][r[i].j+ej]!=undefined){
                                    this.arrBool[r[i].i+ei][r[i].j+ej].bool=1
                                }
                            }
                        }
                    }
                }
            }
            this.drag2()
            return r
        }


        this.drag2=function(){   
            for (var i = 0; i < this.kolII; i++) {
                for (var j = 0; j < this.kolJJ; j++) {
                    if(this.arrBool[i][j].bool==2){
                        this.arrBool[i][j].bool=0
                    }
                }
            }
        }
        

        this.funDragColor2=function(){               
           
        }

        var strXZ, aaa, aaa1; 
        var oobb={}       
        this.getPrice=function(a, intColor, idMat){
            for(var s in this.objObj){
                oobb[s]=0;
            }
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible==true){
                    oobb[this.array[i].idObj]++;
                }
            }            
            for(var s in oobb){
                if(oobb[s]!=0){
                    var k=Math.round(oobb[s]/this.objObj[s].kol);
                    aaa = menedsherMaterial.getArrOtObj(this.objObj[s].obj, idMat, intColor) 
                    //aaa=[];                     
                    //this.parsArr(this.objObj[s].obj.plus, aaa)           
                    aaa[9]=this.objObj[s].obj.id;
                    aaa[8]=this.objObj[s].obj;                    
                    for (var i = 0; i < k; i++) {
                        a.push(aaa)
                    }                                      
                }                
            }
        }


        this.setOS=function(o){
            if(this.objObj[o.id]==undefined)this.objObj[o.id]=this.par.mO.getIdObj(o.id)
            o3d=this.getO3D(this.objObj[o.id]); 
            this.content3d.add(o3d)
            o3d.position.x=o.x;
            o3d.position.y=o.y;
            o3d.ii=o.ii;
            o3d.jj=o.jj;
            o3d.visible=true; 

            var a=this.objObj[o.id].obj.str[0].split(",")
            var kol=a[0]*1
            var iii=a[1]*1
            var jjj=a[2]*1
            this.objObj[o.id].kol=kol
            for (var ei = 0; ei< iii; ei++) {
                if(this.arrBool[o3d.ii+ei]!=undefined){
                    for (var ej = 0; ej < jjj; ej++) {
                        if(this.arrBool[o3d.ii+ei][o3d.jj+ej]!=undefined){
                            this.arrBool[o3d.ii+ei][o3d.jj+ej].bool=1
                        }
                    }
                }
            }
        }


        this.getObj = function(){
           if(this.array.length==0)return null;  
            var a=[] 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible==true){
                    var o={}
                    o.x=Math.round(this.array[i].position.x*100)/100;
                    o.y=Math.round(this.array[i].position.y*100)/100;
                    o.z=Math.round(this.array[i].position.z*100)/100;
                    o.ii=this.array[i].ii;
                    o.jj=this.array[i].jj;
                    o.id=this.array[i].idObj;
                    a.push(o)
                }
            }                
            return a;            
        }

    
        this.setObj = function(a){ 
            if(a==null) return;                    
            this.clear();
            for (var i = 0; i < a.length; i++) {
                this.setOS(a[i])
            }
        } 


        this.parsArr=function(a, a1){
            for (var i = 0; i < a.length; i++) {
                a1[i]=a[i]
            }
        }    
    } 
}


export class BoxSS {
    constructor(par, i, j) {    
        var self=this;    
        this.type = "BoxSS";
        this.par=par;
        this._bool=0; 
        this.ii=i;
        this.jj=j;

        this._x=0;
        this._y=0;
    }
    set x(v) {
        if(this._x!=v){            
            this._x= v;            
        }       
    }   
    get x() { return  this._x;}

    set y(v) {
        if(this._y!=v){            
            this._y= v; 
        }       
    }   
    get y() { return  this._y;}

    set bool(v) {
        if(this._bool!=v){            
            this._bool= v; 
        }       
    }   
    get bool() { return  this._bool;}
}




export class PPPObj {
    constructor(par) {    
        var self=this;    
        this.type = "PPPObj";        
        this.par=par;
        this.content3d = new THREE.Object3D();
        this.par.c3dNa.add(this.content3d);      
        this.array=[];        
        this.bool=false;
        this.arrHron=[];

        this.up1=new UP1(this);      
        
        
       
        if(this.par.object.num[3]+""!="0"){ 
            this.bool=true;            
        }else{
            return
        } 

        



        this.object = this.par.mO.getIdObj(this.par.object.num[3])
        this.o3d=new THREE.Object3D()
        this.content3d.add(this.o3d)
        this.o3d.object=this.object;


        if(this.par.object.num[3]=="55"){
            //this.bool=false;
           
            if(main.glaf.up1==true){//Включена смена 55 up1
                this.up1.init();
            }
            
           //return;
        }



        this.o3d.position.z=this.object.obj.mod.r[1]
        if(this.par.object.num[3]=="24"){
            this.o3d.position.z=-3.5
            this.o3d.position.y=-0.5
        }

        

        
        this.redragM=function(c3d,m){           
            
            if(c3d.material){                
                c3d.material=m;
                
            }
            if(c3d.children){
                for (var i = 0; i < c3d.children.length; i++) {
                    this.redragM(c3d.children[i],m)
                }
            }
        }
        
        var link="resources/data/"+this.object.obj.id+"/mod/"+ this.object.obj.mod.name 
        this.par.mO.getModel(link, this.object.obj.mod.key,function(o){ 
            self.par.markers.setO3D(o); 
            if(self.bool==true) {
                if(self.par.markers.arrayOwan!=undefined) {
                    if(self.par.markers.arrayOwan.length!=0) {
                        for (var i = 0; i < self.par.markers.arrayOwan.length; i++) {
                            self.par.markers.arrayOwan[i].content3d.position.y+=self.par.object.mod.r[5]/2+2
                        }                       
                    }                    
                }
            }         
            
            
            self.par.recurcChild(o);
            o.position.y=self.object.obj.mod.r[2];
            o.position.z=self.object.obj.mod.r[1];
            
            if(self.material!=undefined)self.redragM(o,self.material)
            self.par.fun("visi3d");

            if(self.up1.active==true){
                self.up1.setMod(o);
                return;
            }     
            self.o3d.add(o);    


            
        });    


        this.material=undefined;
        this.funDragColor2=function(m){               
            this.material=m;
            this.redragM(this.o3d,m);            
            this.up1.funDragColor2(m)           
        }


        var strXZ, aaa, aaa1; 
        var oobb={}       
        this.getPrice=function(a, intColor, idMat){  

            if(this.up1.getPrice(a, intColor, idMat)) return;       
            aaa = menedsherMaterial.getArrOtObj(this.object.obj, idMat, intColor)     
            aaa[9]=this.object.obj.id;
            aaa[8]=this.object.obj; 
            a.push(aaa);            
        }


        this.parsArr=function(a, a1){
            for (var i = 0; i < a.length; i++) {
                a1[i]=a[i]
            }
        } 
    }
}

//55 разруливаем 
export class UP1 {
    constructor(par) {    
        var self=this;    
        this.type = "UP1";        
        this.par=par;
        this.active=false;
        this.obj=main.glaf.up1Obj;

        this._bool=false;

        this.o3d0=undefined;
        this.o3d1=undefined;
        this.init=function(){
            
            if(this.o3d0 !=undefined)return;
            this.active=true
            this.o3d0 = new THREE.Object3D();
            this.par.o3d.add(this.o3d0);
            this.o3d1=new THREE.Object3D();
            this.par.o3d.add(this.o3d1);
            this.o3d1.visible=false;


            this.par.par.aa.push("mod_55_false")
        }


        this.arrayMod=undefined;


        
        this.smesenie=-1.1


        var smx=1
        var smy=0
        var smz=2
        this.initBool=function(){
            if(this.arrayMod!=undefined)return;
            this.arrayMod=[];

            this.o177 = this.par.par.mO.getIdObj(177)//перекладины
            this.o178 = this.par.par.mO.getIdObj(178)//пупырки



            var link="resources/data/"+this.o177.obj.id+"/mod/"+ this.o177.obj.mod.name;
            this.par.par.mO.getModel(link, this.o177.obj.mod.key,function(o){ 
                o.position.x=-self.par.object.obj.mod.r[0]-self.o177.obj.mod.r[0];
                o.position.y=self.o177.obj.mod.r[1];
                o.position.z=self.o177.obj.mod.r[2];
                o.rotation.z=-Math.PI/2;               
                self.par.par.fun("visi3d");                  
                self.o3d1.add(o); 

            });

            this.par.par.mO.getModel(link, this.o177.obj.mod.key,function(o){ 
                o.position.x=+self.par.object.obj.mod.r[0]+self.o177.obj.mod.r[0];
                o.position.y=self.o177.obj.mod.r[1];
                o.position.z=self.o177.obj.mod.r[2];
                o.rotation.z=Math.PI/2;
                o.scale.x=-1               
                self.par.par.fun("visi3d");                  
                self.o3d1.add(o);  
                
            });




            var link="resources/data/"+this.o178.obj.id+"/mod/"+ this.o178.obj.mod.name;
            this.par.par.mO.getModel(link, this.o178.obj.mod.key,function(o){ 
                o.position.x=-self.par.object.obj.mod.r[0]-self.o178.obj.mod.r[0];
                o.position.y=self.o178.obj.mod.r[1];
                o.position.z=self.o178.obj.mod.r[3];
                o.rotation.z=-Math.PI/2; 
                o.rotation.y=-Math.PI/2;               
                self.par.par.fun("visi3d");                  
                self.o3d1.add(o); 


                self.par.par.recurcChild(o);
/*
                let dCont=new DCont(main.contentHTML)
                dCont.x=400
                dCont.y=200;
                this.slid=new DSliderBig(dCont, 2,2, function(s){ 
                    o.position.x=-self.par.object.obj.mod.r[0]-this.value*1;
                    self.par.par.fun("visi3d");  
                }, "x", 0, 5);
                this.slid.value=self.o178.obj.mod.r[0]*1
                this.slid.width=200

                this.slid=new DSliderBig(dCont, 2,50, function(s){ 
                    o.position.y=this.value*1;
                    self.par.par.fun("visi3d");  
                }, "y", -5, 5);
                this.slid.value=self.o178.obj.mod.r[1]*1
                this.slid.width=200
                 this.slid=new DSliderBig(dCont, 2,100, function(s){ 
                    o.position.z=this.value*1;
                    self.par.par.fun("visi3d");  
                }, "z", 0, 100);
                this.slid.value=self.o178.obj.mod.r[2]*1
                this.slid.width=200;

                this.slid=new DSliderBig(dCont, 2,150, function(s){ 
                    o.position.z=this.value*1;
                    self.par.par.fun("visi3d");  
                }, "z1", 0, 100);
                this.slid.value=self.o178.obj.mod.r[3]*1
                this.slid.width=200;*/
            });


            this.par.par.mO.getModel(link, this.o178.obj.mod.key,function(o){ 
                o.position.x=-self.par.object.obj.mod.r[0]-self.o178.obj.mod.r[0];
                o.position.y=self.o178.obj.mod.r[1];
                o.position.z=self.o178.obj.mod.r[2];
                o.rotation.z=-Math.PI/2; 
                o.rotation.y=-Math.PI/2;               
                self.par.par.fun("visi3d");                  
                self.o3d1.add(o);
                self.par.par.recurcChild(o);
            });



            this.par.par.mO.getModel(link, this.o178.obj.mod.key,function(o){ 
                o.position.x=self.par.object.obj.mod.r[0]+self.o178.obj.mod.r[0];
                o.position.y=self.o178.obj.mod.r[1];
                o.position.z=self.o178.obj.mod.r[3];
                o.rotation.z=-Math.PI/2; 
                o.rotation.y=Math.PI/2;               
                self.par.par.fun("visi3d");                  
                self.o3d1.add(o);
                self.par.par.recurcChild(o);
            });

            this.par.par.mO.getModel(link, this.o178.obj.mod.key,function(o){ 
                o.position.x=self.par.object.obj.mod.r[0]+self.o178.obj.mod.r[0];
                o.position.y=self.o178.obj.mod.r[1];
                o.position.z=self.o178.obj.mod.r[2];
                o.rotation.z=-Math.PI/2; 
                o.rotation.y=Math.PI/2;               
                self.par.par.fun("visi3d");                  
                self.o3d1.add(o);
                self.par.par.recurcChild(o);                
            });



        }

        this.getPrice=function(a, intColor, idMat){  
            if(this._bool==false) return false; 


            var aaa = menedsherMaterial.getArrOtObj(this.o177.obj, idMat, intColor)     
            aaa[9]=this.o177.obj.id;
            aaa[8]=this.o177.obj; 
            a.push(aaa);
            var aaa = menedsherMaterial.getArrOtObj(this.o177.obj, idMat, intColor)     
            aaa[9]=this.o177.obj.id;
            aaa[8]=this.o177.obj; 
            a.push(aaa);

            for (var i = 0; i < 4; i++) {
                var aaa = menedsherMaterial.getArrOtObj(this.o178.obj, idMat, intColor)     
                aaa[9]=this.o178.obj.id;
                aaa[8]=this.o178.obj; 
                a.push(aaa);
            }          





            return true;            
        }

        //тестируем на пересечения коробок
        this.testBool=function(){

            return null;  
        }


        //сверяем две полосы
        this.test2d=function(ps,pf,ps1,pf1){            
            if(ps1>=ps &&ps1<=pf)return true;
            if(ps>=ps1 &&ps<=pf1)return true;
            return false;
        }

        this.setMod=function(o){
            this.o3d0.add(o);
        }
    }

    set bool(v) {
        if(this._bool!=v){            
            this._bool= v;
            this.init()
            this.initBool();
            this.o3d0.visible=!v;
            this.o3d1.visible=v;

            //this.par.bool = this._bool
            for (var i = 0; i < this.par.par.aa.length; i++) {
                if(this.par.par.aa[i].indexOf("mod_55_")!=-1){
                    this.par.par.aa[i]="mod_55_"+v;
                }
            }

            if(v==true){
                this.par.par.smesenie=this.smesenie
            }else{
                this.par.par.smesenie=0
            }
            if(this.par.par.cont3dLoad){
                
                let h=this.par.par.object.mod.r[2]
                this.par.par.cont3dLoad.position.y = h+this.par.par.smesenie; 
                this.par.par.dragRect();
                if(this.par.par.activTime==true){
                    this.par.par.mO.par.par.visiActiv.setObject(this.par.par)                    
                }
                //
            }          
            this.par.par.fun("visi3d"); 
        }       
    }   
    get bool() { return  this._bool;} 

}




export class BagRectID {
    constructor(par) {    
        var self=this;    
        this.type = "BagRectID";        
        this.par=par;
        this.dragRect = function(){
            if(this.par.id==39||this.par.id==58){  //плоские полки подправил небольшой здвиг              
                this.par.rect[2]=this.par.object.mod.r1[2]-this.par.object.mod.r[2]
                return;
            }        
        }
    }
}

