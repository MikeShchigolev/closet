/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

блок в тумбе
*/


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
        this.wN=mO.wN//[50,75,100];
        this.hN=mO.hN//[50,75,100]; 

        this.arrObj=[];
        for (var i = 0; i < this.wN.length; i++) {
            this.arrObj[i]=[]
            for (var j = 0; j < this.hN.length; j++) {
                this.arrObj[i][j]={}
                this.arrObj[i][j].name="mod_"+this.wN[i]+"_"+this.hN[j]
                this.arrObj[i][j].w=this.wN[i]
                this.arrObj[i][j].d=this.hN[j]
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


        this.funInitMod = function(){

            this.creadDebag(self.cont3dLoad.children[0]);

        }

        //--------------------------------------

        this.dragIndex=function(){
            for (var i = 0; i < this.arrObj.length; i++){ 
                for (var j = 0; j < this.arrObj[i].length; j++) { 
                    this.arrObj[i][j].object.visible=false;
                }
            }

            if(this.arrObj[this._indexW]&&this.arrObj[this._indexW][this._indexH]&& this.arrObj[this._indexW][this._indexH].object){

                this.arrObj[this._indexW][this._indexH].object.visible=true;
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

            for (var ii = o.children.length-1; ii >=0; ii--) {                        
                trace(ii+"",o.children[ii].name)
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
            py=_y-(rcm.y+rcm.height/2) 
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
            trace(bbb);
            
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
            //trace("------------------")
            if(this.parent==undefined)return []
            if(this.parent.parent==undefined)return []    
           

            aa=menedsherMaterial.getArrOtObj(this.object,idMat,intColor)     

           /* if(intColor==0){
                if(this.object.plus!=undefined){
                    aa=this.object.plus;
                }
            }
            if(intColor==1){
                if(this.object.plus1!=undefined){
                    aa=this.object.plus1;
                }
            }*/
            if(aa!=null){
                ad=[];                         
                for (var j = 0; j < aa.length; j++) {
                    ad[j]=aa[j];                                
                }
                ad[6]="BTVstavka";
                ad[8]=this.object;
                ad[9]=this.object.id;
                ad[10]=1;
                ad[11]=aa[3]*1;                
            } 
                
            return [ad]
        }
    }



    set parent(v) {
        if(this._parent!=v){ 
            trace("p",v)                   
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
                    trace("this._parent.indexW  ",this._parent.indexW)
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
            this.dragIndex();     
            this.fun("visi3d");      
        }           
    }   
    get indexW() { return  this._indexW;} 

    set indexH(v) {
        if(this._indexH!=v){
            this._indexH = v;  
            this.dragIndex();     
            this.fun("visi3d");      
        }           
    }   
    get indexH() { return  this._indexH;} 
}

