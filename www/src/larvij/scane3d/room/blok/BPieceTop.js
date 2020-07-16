/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


перила
*/
import { Blok } from './Blok.js';
import { BPTColiz} from './BPTColiz.js';
import { XZImage } from './XZImage.js';
import { BKHron } from './BKHron.js';
import { VNBDL } from './VNBDL.js';

export class BPieceTop extends Blok {
    constructor(mO, o, idArr, fun) {
        super( mO, o, idArr, fun)
        this.type = "BPieceTop";
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        var self=this;
        this._width=100;
        this.heightSten=275;
        this.oPod=1.25;//подюм обьекта
        this.aHron=[];
        this.array=[];
        this.aInfo=[];
        this.aInfo1=[];
        this.drapPlus=false
        this.sWidth=0;
        this.heightStart=100;
        this.heightFinal=100;
        this.boolDragLip=false;


        this.visiBPT=new VisiBPT(this);//верхушка
        this.visiNisu=new VisiNisu(this);//расчет драгеров
        this.bptColiz=new BPTColiz(this); //Дополнителдьные колизии       

       /* let aa=new THREE.AxesHelper(100);
        this.content3d.add(aa);*/
        
        this.funInit=function(){            
            self.boxColizi.rectCollisMeshdy.boolZ=false
            self.boxColizi.rectCollisMeshdy.active=false
        }

        var kk
        var rr;
        this.setXY=function(_x,_y){
            if(Math.abs(_y-220)<5)_y=220            
            kk=this.bptColiz.array.length
            if(kk<2)kk=2
            for (var i = 0; i < kk; i++) {
                rr=this.bptColiz.dragPos(_x, _y, true)
                if(rr!=null){
                    _x=_x-rr.x;
                    _y=_y-rr.y;
                    this.bptColiz.dragPos(_x, _y, false)
                }
            }

            this.boxColizi.position._x = _x;
            this.boxColizi.position.y = _y;
            this.drahShadow();            
            if(this.parent!=undefined){
                this.parent.collision.drawDegug()
            } 
        } 

        this.drahShadow=function(_x,_y){ 
            if(this.parent!=undefined){
                this.heightSten=this.parent._height               
                if(_x==undefined){
                    this.content.position.x =this.boxColizi.rectCollisMeshdy.x+this.boxColizi.rectCollisMeshdy.width/2
                    this.content.position.y =this.heightSten-this.boxColizi.rectCollisMeshdy.y-this.boxColizi.rectCollisMeshdy.height/2            
                }else{
                    this.content.position.x = _x;
                    this.content.position.y = _y; 
                }
                if(this.content.funRender!=undefined){
                    this.content.funRender();
                }
            }            
        }


        this.drawTestUp=function(){            
            this.visiNisu.drawTestUp()
        }


        this.dragParentDo = function(po,pn){ 
            this.bptColiz.dragParentDo(po,pn)
        }


        this.stopDrag = function(){          
            if(this.parent==undefined){
                if(this.boolOTS==true)if(this.objts)if(this.objts.parent){
                    this.objts.parent.add(this)                   
                    this.setXYPosit(this.objts.x,this.objts.y);
                    this.drahShadow()
                    this.fun("visi3d");
                    return;
                }
            }  
            rr=this.bptColiz.dragPos(this.x, this.y, true)
            if(rr!=null)if(rr.idArr!=null){              
                this.namaNama(rr.idArr)
            }            
        }

        this.clear = function (b) { 
            if(this._parent&&b==undefined){                
                this._parent.remove(this);              
            } 
            if(this.children.length!=0) {
                for (var i = this.children.length - 1; i >= 0; i--) {
                    this.remove(this.children[i])
                }
            }  
            this.bptColiz.clearBig(); 
            this.visiNisu.clearHH() 

            this.mO.dragPriceScane() 
            
                           
        };
        

        this.objts=undefined;
        this.tsSet=function(){  
            if(this.boolOTS==false) return;     
            if(this.parent==undefined)return;
            this.objts=this.getObj();
            this.objts.parent=this.parent;
        }


        var ggg,zd,arr, xx,yy, arP;
        this.namaNama = function(bpt){ 
            arr=[]
            arP=[]
            zd=bpt.x-this.x;            
            xx=this.x;
            yy=this.y;            
            this.bptColiz.clearBig();          

            for (var i = bpt.children.length-1; i >= 0; i--) {
                arr[i]=bpt.children[i]; 
            }

            for (var i = 0; i < arr.length; i++) {                
                arP[i]=arr[i].boxColizi.rectCollisMeshdy.x+arr[i].boxColizi.rectCollisMeshdy.width/2;
            }

            for (var i = bpt.children.length-1; i >= 0; i--) {
                bpt.remove(bpt.children[i]) 
            }
            
            for (var i = 0; i < arr.length; i++) {                          
                arr[i].boxColizi.position._y=arr[i].boxColizi.rectCollisMeshdy.y//+arr[i].boxColizi.rectCollisMeshdy.height//-this.oPod/2
                arr[i].boxColizi.position.x = arP[i] + zd;
                this.add(arr[i],true)  
            } 

            this.dragCildren(null,arr)            
            this.testWWWW();
            this.dVertic();
            this.visiNisu.sort(); 
            this.mO.dragPriceScane();
            if(this.mO.activIndex==this.idArr) {
                this.mO._activIndex=-1;
                this.mO.activIndex=this.idArr
            } 
            this.dragCildren();
            this.fun("visi3d");         
        }




        var xx, xMax,xMin,xxold
        this.boolSash=false;
        this.rashuishka = function(arr){             
            if(this.boolSash==false)return            
            this.boolSash=false;
            xMin=99999    
            xMax=-99999 
            for (var i = 0; i < arr.length; i++) {
                if(xMin>arr[i].boxColizi.rectCollisMeshdy.x)xMin=arr[i].boxColizi.rectCollisMeshdy.x;
                if(xMax<arr[i].boxColizi.rectCollisMeshdy.x+arr[i].boxColizi.rectCollisMeshdy.width)xMax=arr[i].boxColizi.rectCollisMeshdy.x+arr[i].boxColizi.rectCollisMeshdy.width;
           
            }
            xx=xMin+(xMax-xMin)/2;            
            xxold=this.x            
            for (var i = 0; i < arr.length; i++) {
                this.remove(arr[i]) 
            } 
         
            for (var i = 0; i < arr.length; i++) {
                arr[i].boxColizi.rectCollisMeshdy.x=arr[i].boxColizi.rectCollisMeshdy.x-xx;
            }

            var __o={}
            __o.x=xxold+xx;
            __o.y=this.y;
            __o.children=[];
            
            for (var i = 0; i < arr.length; i++) {
                var oo={}              
                oo.type=arr[i].type;
                oo.id=arr[i].id;
                oo.x=arr[i].content3d.position.x;
                oo.y=arr[i].content3d.position.y;
                __o.children.push(oo);
            }

            setTimeout(function() {
                var bl=mO.getBlok(mO.pieceTop.object)
                bl.setObj(__o)
                self.parent.add(bl); 
                bl.testWWWW();
                bl.dVertic();
                bl.visiNisu.sort(); 
            }, 1);
        }

        self.c3dNa.remove(this.box);
        

        var a;
        this.kuda
        this.funInitMod = function(){            
            this.visiBPT.funInitMod(self.cont3dLoad.children[0]) 
            this.visiBPT._width=this.visiBPT._width+1;
            this.visiBPT.width=this.visiBPT._width-1;
            this.visiNisu.creatMark()
            this.boxColizi.rectCollisMeshdy.boolStick=false
        }


        this.remove = function(blok, bool){
            var p = -1;
            var r = null;            
            for (var i = 0; i < this.children.length; i++) {                
                if(this.children[i].idArr==blok.idArr){                    
                    p=i;
                }
            }            
            if(p!=-1){
                r = this.children.splice(p,1)[0];
                this.content3d.remove(blok.content3d)
                if(bool==undefined){
                    this.dVertic();
                    this.visiNisu.sort()  
                    this.removeTest()
                }
                r.parent=undefined;                    
            }             
            
            if(this.children.length==0){
                this.clear()
            }
            return r;
        }

        this.removeTest = function(blok, bool){
            if(this.children.length==0){
                if(this.parent!=undefined){ 
                    this.parent.remove(this)
                    this.clear();
                }
            }
        }    


        this.add = function(blok,b){
            this.remove(blok);
            this.content3d.add(blok.content3d);
            blok.content3d.position.z=blok.rect[1]
            this.children.push(blok);            
            blok.parent=this;          
            if(b==undefined){
                this.testWWWW();
                this.dVertic();
                this.visiNisu.sort() 
            }                      
        }

        this.dragToPanel = function(blok){
            this.testPosition(null,null,blok)
        }

        var aaarrr
        this.dragCildren = function(blok, arr){  
            if(blok){
                this.testPosition(null,null,blok)
            }
            else{
                if(arr)aaarrr=arr
                else aaarrr=this.children
                for (var i = 0; i < aaarrr.length; i++) {              
                    this.testPosition(null,null,aaarrr[i],0)
                }
            }
        }         

        this.dVertic = function(){ 
            
            this.zz=0
            this.testWWWW();
            this.visiNisu.clearHH();           
            
            for (var i = 0; i < this.children.length; i++) {
                this.visiNisu.testStoik(this.children[i])
            }
  

            if(this.visiNisu.array[0]!=undefined){
                this.heightStart=this.visiNisu.array[0].height;
                this.heightFinal=this.visiNisu.array[this.visiNisu.maxSah].height; 
            }
            

            var ww=this.visiNisu.xMax-this.visiNisu.xMin; 
            this.visiBPT.zdvigX(0); 
            this.testWWWW();
            this.bptColiz.redrag()
            this.drahShadow()
        } 

        this._W=0
        this._H=0
        this._Z=0
        var kik=1;
        var ttt=100
        var min,max,www, my,kik;
        this.testWWWW = function(){ 
            min=99999
            max=-99999
            this._W=0
            this._H=2
            this._Z=2

            for (var i = 0; i < this.children.length; i++) { 
                if(min>this.children[i].boxColizi.rectCollisMeshdy.x)min=this.children[i].boxColizi.rectCollisMeshdy.x;
                if(max<this.children[i].boxColizi.rectCollisMeshdy.x+this.children[i].boxColizi.rectCollisMeshdy.width)max=this.children[i].boxColizi.rectCollisMeshdy.x+this.children[i].boxColizi.rectCollisMeshdy.width;
                my=-this.children[i].y+this.children[i].rect[5];
                if(my>this._H)this._H=my;
                if((this.children[i].rect[4]+this.children[i].rect[1])>this._Z)this._Z=(this.children[i].rect[4]+this.children[i].rect[1]);
            } 

            www= max-min           
            this.visiBPT.width=www; 
            this._W=www;
           
            this.rect[3]=this._W;
            this.rect[0]=-this._W/2;
            this.rect[4]=this._Z;
            this.rect[5]=this._H+6.4;
            this.bptColiz.depth=this.rect[4]
            this.dragObjHA(this.boxHelper, this.rect);
            
            if(key[13]!="а"){
                kik*=1.05
                for (var i = 0; i < kik; i++) {
                    ttt=Math.PI*Math.random(0.125456*i)/kik+11;
                }
            } 
        }

        this.dragBlok = function(blok, _x, _y){            
            blok.boxColizi.rectCollisMeshdy.y=_y-this.boxColizi.position.y;
            this.dVertic()
            return false;
        }


        var point=new Position()  
        var _bObj      
        this.testPosition= function(_x, _y, _obj, grY, _bSort){
            var gy=0
            if(grY!=undefined)gy=grY
            if(_x!=null){
                point.x=_x-this.boxColizi.position._x;
                point.y=_y-this.boxColizi.position._y; 
                point.y-=_obj.zd4+gy

            }else{
                point.x=_obj.x;
                point.y=_obj.y;
                point.y-=_obj.zd4+gy
                if(point.y>0)point.y=0 
            }
            
            _bObj=this.visiNisu.testPosition(point, _obj,_bSort)
            
            if(_x==null&&_bObj!=null){
               
                _obj.boxColizi.rectCollisMeshdy.x=_bObj.x-_bObj.z/2;
                _obj.boxColizi.rectCollisMeshdy.y=_bObj.y;                
            }
            return _bObj           
        }
        
        
        this.dragC=function(matId){
            if(matId==null)  {
                return    
            }     
            self.material=matId;
            self.visiBPT.setMat(matId);
            self.visiNisu.setMat(matId);
        }

        this.animat=function(s,time){  }
        

        var bb    
        this.dragColor=function(){ 
            this.fun("visi3d");
            setTimeout(function() {self.fun("visi3d");}, 10);  
            setTimeout(function() {self.fun("visi3d");}, 100); 

            if(self._material==undefined)return             
            for (var i = 0; i < self.arrayMat.length; i++) {
                bb=false
                if(self.arrayMat[i].material==undefined){

                }else{
                    if(self.arrayMat[i].material.uuid!=self._material.uuid){
                        bb=true
                    }
                }
                if(bb)self.arrayMat[i].material=self._material
            }
                         
            if(this.boolColo == true )return;           
            if(this.idArr!=-1)mO.geterMat.getId(this._idColor, this.dragC);
            else this.dragC(mO.matNull) 
        }


        this.boolColo=false;
        this.nitColor=function(){
            if(this.boolColo==true )return;   
            this.boolColo = true;
            this.okPrice=false;            
            this.visiBPT.setMat(mO.matNull);
            this.visiNisu.setMat(mO.matNull);
            this.arrayMat.length=0;
        }  

        ////////////////////////////////////////////////////////
        var aaa        
        aaa=this.object.str[1].split(",")
        for (var i = 0; i < aaa.length; i++) {
            this.aInfo[i]=mO.getIdObj(aaa[i])
        }
        aaa=this.object.str[2].split(",")
        for (var i = 0; i < aaa.length; i++) {
            this.aInfo1[i]=mO.getIdObj(aaa[i])
        }        
       
        this.getPrice=function(intColor,idMat){
            aaa=[];
            this.visiBPT.getPrice(aaa,intColor,idMat)
            this.visiNisu.getPrice(aaa,intColor,idMat)
            return aaa
        }
        //////////////////////////////////////////////////////////////


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

            obj.visiNisu=this.visiNisu.getObj()

            return obj;            
        }


        this.boolY=true;
        var ob,ooo
        this.setObj = function(obj){
            this.boolY=false;                  
            this.setXYPosit(obj.x,obj.y);

            



            for (var i = 0; i < obj.children.length; i++) {               
                ooo= mO.getIdObj(obj.children[i].id)                               
                ob=mO.getBlok(ooo.obj)
                ob.setObj(obj.children[i])                
                this.add(ob, true);
            }
            if(obj.visiNisu!=undefined){
                this.visiNisu.setObj(obj.visiNisu)
            }

            this.boolY=true;
            self.testWWWW();
            /*self.dVertic();  
            self.visiNisu.sort()
            this.dtagTime()*/

            this.drahShadow(obj.x,obj.y); 
           


        }

        this.dtagTime = function(t){  
           /* if(t==0){
                this.visiNisu.sort()                    
                this.dVertic()
                this.dragCildren() 
                tStyle.glaf.visi3D.intRend=1;
            }else{
                setTimeout(function() {
                    if(self.parent){
                        self.visiNisu.sort();                    
                        self.dVertic()
                        self.dragCildren()
                        tStyle.glaf.visi3D.intRend=1;
                    }
                }, t);
            } */           
        }
    }

    set parent(v) {
        if(this._parent!=v){            
            if(this.dragParentDo) this.dragParentDo(this._parent, v)   
            this._parent = v; 
            if(this._parent==undefined){
                this.mO.visi3D.event3DArr.removeChild(this.c3dNa);
                this.visiBPT.zdvigX(0)               
            } else{
                this.mO.visi3D.event3DArr.addChild(this.c3dNa);
                this.drahShadow()
                if(this.drapPlus==true ){                    
                    this.drapPlus=false
                    this.dtagTime(0)
                    this.dtagTime(1000)
                } 
                this.drahShadow()
            }  
            if(this.dragParent) this.dragParent()            
        }       
    }   
    get parent() { return  this._parent;}


    set width(v) {    
        this._width=v;
        this.visiBPT.width=this._width;       
    }   
    get width() { return  this._width;}    
}


//хрень для отрисовки и искажения драгера
export class VisiNisu {
    constructor(par) {  
        this.type = "VisiNisu";
        var self=this;
        this.par=par;
        this.array=[];
        this.xMin=0;
        this.xMax=0;
        this.otstup=1.5;
        this.oPod=this.par.oPod
        this.oS=1.3;
        this.oSah=3.2;
        this.maxSah=0     

        var b,b1, p, p1, vnb, xxx;
        this.testStoik=function(blok){
            this.maxSah=0
            b=false;
            b1=false;
            p=-1;
            p1=-1;
            xxx=Math.round(blok.boxColizi.rectCollisMeshdy.x/30)*30;
            if(blok.boxColizi.rectCollisMeshdy.x==xxx)blok.boxColizi.rectCollisMeshdy.x=xxx;            
            for (var i = 0; i < this.array.length; i++) {
                if(Math.round(this.array[i].x)==Math.round(blok.boxColizi.rectCollisMeshdy.x)){
                    b=true;
                    p=i;                    
                    this.array[i].visible=true;
                }
                
                if(Math.round(this.array[i].x)==Math.round(blok.boxColizi.rectCollisMeshdy.x+blok.boxColizi.rectCollisMeshdy.width)){
                    b1=true;
                    p1=i;                   
                    this.array[i].visible=true;
                }              
            }
           
            if(b==false){
                vnb=this.creat(Math.round(blok.boxColizi.rectCollisMeshdy.x*10)/10);
                p=vnb.idArr;                
                vnb.visible=true;
            }
            if(b1==false){
                vnb=this.creat(Math.round((blok.boxColizi.rectCollisMeshdy.x+blok.boxColizi.rectCollisMeshdy.width)*10)/10);
                p1=vnb.idArr;                
                vnb.visible=true;
            }
            
            if(p1>this.maxSah)this.maxSah=p1

            this.array[p].visible=true
            this.array[p1].visible=true
            this.array[p].testHH(blok);
            this.array[p1].testHH(blok);

            if(this.xMin>this.array[p].x-this.otstup)this.xMin=this.array[p].x-this.otstup;
            if(this.xMax<this.array[p].x+this.otstup)this.xMax=this.array[p].x+this.otstup;

            if(this.xMin>this.array[p1].x-this.otstup)this.xMin=this.array[p1].x-this.otstup;
            if(this.xMax<this.array[p1].x+this.otstup)this.xMax=this.array[p1].x+this.otstup;         

            if(b==false||b1==false) {                
                return true;
            }
            return false
        }


        //сортируем приметивы///////////////////////////////////////////
        var a, aa, ww, zdv,xxx
        var ssss=0
        var mmm=8888
        var mmmXX=8888
        this.sortMini=function(){            
            mmmXX=8888
            if(this.array[0])if(this.array[0].visible==true){
                mmmXX =this.par.visiBPT._width/2+this.array[0].x;       
                this.par.visiBPT.zdvigX(mmmXX) 
            }
        }
        //////////////////////////////////////////////////// 



        this.sort=function(){ 
            this.sortFalse()
            ww=this.xMax-this.xMin;
            zdv=-ww/2-this.xMin;
            this.par.visiBPT.zdvigX(0) 
            for (var i = 0; i < this.array.length; i++) {                
                this.array[i].x=this.array[i]._x+zdv;                    
            }
            for (i = 0; i < this.par.children.length; i++) {
                this.par.children[i].boxColizi.rectCollisMeshdy.x=this.par.children[i].boxColizi.rectCollisMeshdy.x+zdv;                
            }
            this.par.boxColizi.position.x=this.par.boxColizi.position._x-zdv
            this.par.dVertic()
            this.testPustotu()          
        }


        var aa,bb,xxx,sa
        //смещаем элементы с фальш в конец списка
        this.sortFalse=function(){
            for (var  i = 0; i < this.array.length-1; i++) {
                bb=true;
                xxx=this.array[i].x;
                for (var  j = i+1; j < this.array.length; j++) {
                    if(this.array[j].x>xxx){
                        bb=false;
                    }
                }
                if(bb==false){
                    sa=this.array.splice(i,1)[0]
                    this.array.push(sa)
                    i--;
                }
            }
            this.array.reverse()

            aa=[]
            for (var i = this.array.length-1; i >=0 ; i--) {
                if(this.array[i].visible==false){
                    aa.push(this.array.splice(i,1)[0])
                }
            }
            for ( i = 0; i < aa.length; i++) {
                this.array.push(aa[i])
            }
        }


        var rrr,aa,aa1,wewe,wwwww
        this.testPustotu=function(){
            rrr=-1;
            aa=[];
            aa1=[];
            for ( var i = 0; i < this.array.length-1; i++) {
                if(this.array[i+1].visible==false)return
                wewe= this.array[i+1].x -this.array[i].x   
                xxx=this.array[i].x+(wewe)/2;
                bb=false;
                for ( var j = 0; j < this.par.children.length; j++) {
                    if(xxx>this.par.children[j].boxColizi.rectCollisMeshdy.x){
                        if(xxx<this.par.children[j].boxColizi.rectCollisMeshdy.x+this.par.children[j].boxColizi.rectCollisMeshdy.width){
                            bb=true;
                            if(rrr==-1)aa.push(this.par.children[j]);
                            else aa1.push(this.par.children[j]);
                        }
                    }
                } 
                if(bb==false){
                    wwwww=wewe
                    rrr=i;
                }
            }

            for (var i = 0; i < aa1.length; i++) {
                for (var j = i+1; j < aa1.length; j++) {
                    if(aa1[i].idRandom==aa1[j].idRandom){
                        aa1.splice(j,1)
                        i=0
                    }
                }                
            }

            for (var i = 0; i < aa.length; i++) {
                for (var j = i+1; j < aa.length; j++) {
                    if(aa[i].idRandom==aa[j].idRandom){
                        aa.splice(j,1)
                        i=0
                    }
                }                
            }

            if(rrr!=-1){
                if(aa1.length!=0){                    
                    this.par.rashuishka(aa1);
                }
            }
        }


        this.drawTestUp=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible!=false){
                    this.array[i].drawTestUp()
                }
            }
        }

        this.creat=function(_x){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible==false){
                    this.array[i].visible=true;
                    this.array[i].x=_x;
                    return this.array[i]
                }
            }
            this.array.push(new VNB(this));
            this.array[this.array.length-1].idArr=this.array.length-1
            this.array[this.array.length-1].visible=true;
            this.array[this.array.length-1].x=_x;
            if(this.mat!=undefined){
                this.array[this.array.length-1].setMat(this.mat)
            }
            return this.array[this.array.length-1]
        }


        this.mat
        this.setMat=function(m){
            this.mat=m            
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].setMat(m)
            }
        }

        
        function compareNumbers(a, b) {
            return a.x - b.x;
        }


        var ppp=0
        var oneSort=false
        this.testSortingPosit = function(point, _obj){
            ppp=-1;
            for (var i = 0; i < this.array.length-1; i++) { 
                if(this.array[i].x>this.array[i+1].x){                     
                    ppp++
                    break
                }
            }
            if(ppp==-1)return true

            if(oneSort==true) return true 

            this.sort()
            //this.array.sort(compareNumbers) 
            return false     
        }


        //пигаем ночальную точку///////////////////////////////////////////
        this.position=new Position()
        this.position=new Position()
        this.testPosition = function(point, _obj, _bSort){ 
                                        
            if(point.y>30)return null;
            if(point.y>0)point.y=0;           
            //тест на не сортировку
          

            if(_bSort!=undefined){                
                let r=this.testSortingPosit();                
            }
           
            
           


            for (var i = 0; i < this.array.length-1; i++) {                
                if(this.array[i+1].visible==false)return null;
                if(point.x>this.array[i].x){
                    if(point.x<this.array[i+1].x){
                        
                        return this.testPosition2(i, point, _obj)                     
                    }
                }
            }
            return null;              
        }

        
        this.testPosition2= function(i, point, _obj){
            
            //FIXE большая хрень подрезана, хз
            this.position.z=_obj.rect[3]//this.array[i+1].x-this.array[i].x;            
            this.position.x=_obj.x;//this.array[i].x+this.position.z/2;                     
            this.position.y=this.corectY(this.position.x, point.y, _obj);
            this.dragKraiii()            
            this.position.x0=this.array[i].x;
            this.position.bpt=this.par 
                    
            return this.position;            
        } 

        //собераем массив обьектов на одной линии
        var xx,xx1
        this.aAr=[]//прямые столкновения        
        this.aLeft=[]//прямые столкновения 
        this.aRight=[]//прямые столкновения 
        this.aIn=[]//прямые столкновения 
        this.aWith=[]//прямые столкновения 
        this.testPos= function(x, _obj){ 
            this.aAr.length=0;
            this.aLeft.length=0;
            this.aRight.length=0;
            this.aIn.length=0;
            this.aWith.length=0;
           
            for (var i = 0; i < this.par.children.length; i++) {
                if(_obj.idRandom!==this.par.children[i].idRandom){                   
                    //те что с лева и попадают на
                    if(Math.round(this.par.children[i].boxColizi.rectCollisMeshdy.x)==Math.round(_obj.boxColizi.rectCollisMeshdy.x)){                        
                        this.aAr.push(this.par.children[i])
                    }
                    //те что с права и попадают на
                    if(Math.round(this.par.children[i].boxColizi.rectCollisMeshdy.x+this.par.children[i].boxColizi.width)==Math.round(_obj.boxColizi.rectCollisMeshdy.x+_obj.boxColizi.width)){                        
                        this.aAr.push(this.par.children[i])
                    }

                    if(_obj.boxColizi.rectCollisMeshdy.x+5<this.par.children[i].boxColizi.rectCollisMeshdy.x
                        &&
                        _obj.boxColizi.rectCollisMeshdy.x+_obj.boxColizi.rectCollisMeshdy.width-5>this.par.children[i].boxColizi.rectCollisMeshdy.x
                        ){                        
                        this.aAr.push(this.par.children[i])
                    }

                    if(_obj.boxColizi.rectCollisMeshdy.x+5<this.par.children[i].boxColizi.rectCollisMeshdy.x+this.par.children[i].boxColizi.width
                        &&
                        _obj.boxColizi.rectCollisMeshdy.x+_obj.boxColizi.rectCollisMeshdy.width-5>this.par.children[i].boxColizi.rectCollisMeshdy.x+this.par.children[i].boxColizi.width
                        ){                        
                        this.aAr.push(this.par.children[i])
                    }

                    //с лева <<<<<<<<<<<<<
                    if(Math.round(this.par.children[i].boxColizi.rectCollisMeshdy.x+this.par.children[i].boxColizi.width)==Math.round(_obj.boxColizi.rectCollisMeshdy.x)){                        
                        this.aLeft.push(this.par.children[i])
                    }
                    //с права >>>>>>>>>>>>>
                    if(Math.round(this.par.children[i].boxColizi.rectCollisMeshdy.x)==Math.round(_obj.boxColizi.rectCollisMeshdy.x+_obj.boxColizi.width)){                        
                        this.aRight.push(this.par.children[i])
                    }

                    //обьект в нутри и не сопрекасаеться 
                    if(_obj.boxColizi.rectCollisMeshdy.x+5<this.par.children[i].boxColizi.rectCollisMeshdy.x){
                        if((_obj.boxColizi.rectCollisMeshdy.x+_obj.boxColizi.width-5)>(this.par.children[i].boxColizi.rectCollisMeshdy.x+this.par.children[i].boxColizi.width)){  
                            this.aIn.push(this.par.children[i])
                        }                        
                    }

                    //обьект снарущи
                    if(this.par.children[i].boxColizi.rectCollisMeshdy.x+5<_obj.boxColizi.rectCollisMeshdy.x){
                        if(_obj.boxColizi.rectCollisMeshdy.x+_obj.boxColizi.width<this.par.children[i].boxColizi.rectCollisMeshdy.x+this.par.children[i].boxColizi.width){
                            this.aWith.push(this.par.children[i])
                        }                        
                    }
                }                
            }

            for (var i = 0; i < this.aIn.length; i++) {
                for (var j = this.aAr.length-1; j >= 0; j--) {                    
                    if(this.aIn[i].idRandom==this.aAr[j].idRandom){
                        this.aAr.splice(i,1)
                    }
                }
            }

            for (var i = 0; i < this.aWith.length; i++) {
                for (var j = this.aAr.length-1; j >= 0; j--) {
                    if(this.aWith[i].idRandom==this.aAr[j].idRandom){
                        this.aAr.splice(i,1)
                    }
                }
            }        
        }


        var yy, yh, yy1, yh1, _oB, pL, pR;
        this.testPos2= function(y, _obj,_y1){   
            pL=-1;
            pR=-1;     
            yy=y+(_obj.yPol+_obj.yS+_obj.ySRR);
            yh=y+(-_obj.ySMin)+_obj.yPol;
            pL=-1;

            //проверка точных пересечений
            for (var i = 0; i < this.aAr.length; i++) {
                yy1=this.aAr[i].boxColizi.rectCollisMeshdy.y+(this.aAr[i].yPol+this.aAr[i].yS+_obj.ySRR);
                yh1=this.aAr[i].boxColizi.rectCollisMeshdy.y+(-this.aAr[i].ySMin)//+this.aAr[i].yPol;
                if(this.testLineXZ(yy,yh,yy1,yh1)==true){
                    return i;
                }
            }

            for (var i = 0; i < this.aWith.length; i++) {
                yy1=this.aWith[i].boxColizi.rectCollisMeshdy.y+this.aWith[i].yPol;
                yh1=this.aWith[i].boxColizi.rectCollisMeshdy.y-this.aWith[i].yPol;
                if(this.testLineXZ(yy,yh,yy1,yh1)==true)return i;
            } 

            yy=y+(_obj.yPol);
            yh=y-(_obj.yPol);
            //если мы в нутри
            for (var i = 0; i < this.aIn.length; i++) {
                yy1=this.aIn[i].boxColizi.rectCollisMeshdy.y+(this.aIn[i].yPol+this.aIn[i].yS+_obj.ySRR);
                yh1=this.aIn[i].boxColizi.rectCollisMeshdy.y+(this.aIn[i].yF)+this.aIn[i].yPol;
                if(this.testLineXZ(yy,yh,yy1,yh1)==true)return i;
            }

            //мелкие хрени
            yy=y+(_obj.yPol+_obj.yS+_obj.ySRR);
            yh=yy-_obj.krai.ySMin;            
            for (var i = 0; i < this.aLeft.length; i++) {                
                yy1=this.aLeft[i].boxColizi.rectCollisMeshdy.y+(this.aLeft[i].yPol+this.aLeft[i].yS+_obj.ySRR);
                yh1=yy1-this.aLeft[i].krai.ySMin;
                if((_obj.boolKr==true&&this.aLeft[i].boolKr==true)||(_obj.krai.bool==false||this.aLeft[i].krai.bool==false) ){
                }else{
                    if(this.testLineXZ(yy,yh,yy1,yh1)==true){
                        if(Math.round(yy)!=Math.round(yy1))return i;
                        else{
                            if(this.isTo2(_obj,this.aLeft[i])==false){
                                return i;
                            }
                        }
                    }
                }
            }


            for (var i = 0; i < this.aRight.length; i++) {                
                yy1=this.aRight[i].boxColizi.rectCollisMeshdy.y+(this.aRight[i].yPol+this.aRight[i].yS+_obj.ySRR);
                yh1=this.aRight[i].boxColizi.rectCollisMeshdy.y+(this.aRight[i].yPol+this.aRight[i].yS+_obj.ySRR-this.aRight[i].krai.ySMin); 
                if((_obj.boolKr==true&&this.aRight[i].boolKr==true)||(_obj.krai.bool==false||this.aRight[i].krai.bool==false) ){

                }else{
                    if(this.testLineXZ(yy,yh,yy1,yh1)==true){
                        if(Math.round(yy)!=Math.round(yy1))return i;
                        else{                            
                            if(this.isTo2(_obj,this.aRight[i])==false){
                                return i;
                            }  
                        }                   
                    }
                }
            }
            if(_y1!=undefined){                
                if(y<-182.4&&y>-201.6){                    
                    return {xz:"xz"};                    
                }
            }

            return null;
        }


        //сравниваем элементы
        this.isTo2= function(_o, _o1, bool){ 
            if(_o.krai.idSvaz==-1)return false;
            if(_o1.krai.idSvaz==-1)return false;           
            if(_o.krai.idSvaz!=_o1.krai.idSvaz)return false;
            //проверка конфликта полка да и спец
            if(this.isToPokaCpes(_o, _o1)==true)return false;
            return true
        }


        //проверка конфликта полка да и спец
        this.isToPokaCpes= function(_o, _o1){            
            if(_o.polka==true&&_o1.polkaNot==true)return true;
            if(_o.polkaNot==true&&_o1.polka==true)return true;
            return false
        }


        //сверяем две полосы
        this.testLineXZ=function(ps,pf,ps1,pf1){           
            if(ps1>=ps &&pf1<=ps)return true;
            if(ps1>=pf &&pf1<=pf)return true;          
            if(ps>=ps1 &&pf<=ps1)return true;
            if(ps>=pf1 &&pf<=pf1)return true; 
            return false;
        }


        var yMin, yss,ypp, rezzzz
        this.poiskPos= function(y, _obj){            
            yMin=9999;
            var ry =-1;            
            yss=(-_obj.yPol-_obj.yS+_obj.ySRR)+this.oPod-this.oS;
            for (var i = 0; i < 900; i++) {
                ypp=yss-i*this.oSah;
                ptn=this.testNiz(ypp,_obj)
                if(ptn!=null){
                    ypp=ptn
                    i=999;
                }
                rezzzz=this.testPos2(ypp, _obj, -i*this.oSah)
                if(rezzzz==null){              
                    if(Math.abs(yMin)>Math.abs(ypp-y)){
                        yMin=Math.abs(ypp-y);
                        ry=ypp;                        
                    }
                } 
            }
            return ry;
        }


        //коректируем высоту обьекта по у
        var p,p1, rPo,ptn;
        this.corectY= function(x, y, _obj){ 
            if(this.par.boolY==false){
                return y;
            } 
            //
            p= y           
            this.poiskNiz(x, _obj);
            
            if(p>0)p=0;
            this.poiskNiz(x, _obj);
            ptn=this.testNiz(p, _obj);

            if(ptn!=null)p=ptn;
            p=Math.round(p/this.oSah)*this.oSah;

            p1=p
            p1=this.corektNizzz(p)
            this.testPos(x, _obj);            
            if(this.aAr.length==0 && this.aLeft.length==0 && this.aRight.length==0)return p1;//пустая хрень
            
            rPo=this.testPos2(p1, _obj);            
            if(rPo==null){
                //нет приград
                return p1;
            }
            else{
                p1=this.poiskPos(p1, _obj);               
            }
            return p1;          
        }


        
        this.corektNizzz= function(y){             
            var yy=y
            if(this.par.children.length<1){
                if(yy<-192&&yy>-201.6){
                    yy=-201.6                
                }
            }else{
                if(yy<-182.4&&yy>-201.6){
                    if(yy<-193){
                        yy=-201.6  
                    }
                    else{
                        yy=-182.4
                    }               
                }
            }            
            return yy
        }

        this.minusPanel=12;        
        this.maxPoz=200;
        this.minPoz=100;
        var ooW
        //Находим минимальное значение для обьекта
        this.poiskNiz= function(x, _obj){         
            this.maxPoz=99999;
            this.minPoz=100;
            if(this.par.parent==0){
                return;
            }            
            this.minPoz=this.par.y-this.minusPanel;

            if(this.par.parent)
            for (var i = 0; i < this.par.parent.children.length; i++) {
                ooW=this.par.parent.children[i]
                if(ooW.type!="Boki")                
                if(this.par.idRandom!=ooW.idRandom){
                    cy=this.par.y;
                    _cy1=cy1=ooW.boxColizi.rectCollisMeshdy.y+ooW.boxColizi.rectCollisMeshdy.height

                    if(cy>cy1){
                        cx=_obj.boxColizi.rectCollisMeshdy.x+this.par.x;
                        cx1=_obj.boxColizi.rectCollisMeshdy.x+_obj.boxColizi.rectCollisMeshdy.width+this.par.x;                        

                        if(ooW.type=="BPieceTop"){
                            cy= ooW.boxColizi.rectCollisMeshdy.x-_obj.boxColizi.rectCollisMeshdy.width/2;
                            cy1=ooW.boxColizi.rectCollisMeshdy.x+_obj.boxColizi.rectCollisMeshdy.width/2;
                        }
                        if(ooW.type=="BWindow"||ooW.type=="BDoor"){
                            cy= ooW.boxColizi.rectCollisMeshdy.x;
                            cy1=ooW.boxColizi.rectCollisMeshdy.x+_obj.boxColizi.rectCollisMeshdy.width;
                        }
                        if(ooW.type=="BTumba"){
                            cy= ooW.boxColizi.rectCollisMeshdy.x;
                            cy1=ooW.boxColizi.rectCollisMeshdy.x+ooW.rect[3];
                        }                        
                        if(this.testLineXZ2(cx,cx1,cy,cy1) == true){ 
                            this.minPoz=this.par.y-_cy1;
                        }                        
                    }
                }
            }
            if(this.minPoz>this.maxPoz)this.minPoz=this.maxPoz;
        }


        //сверяем две полосы
        this.testLineXZ2=function(ps,pf,ps1,pf1){            
            if(ps1>=ps &&ps1<=pf)return true;
            if(ps>=ps1 &&ps<=pf1)return true;
            return false;
        }


        var cx,cx1,cy,cy1,_cy1
        this.testNiz= function(y, _obj){ 
            cx1=(_obj.yMax);   
            cx=y-cx1;
            if(cx<-this.minPoz){
                cy1=this.minPoz-cx1
                cy=-Math.round(cy1/this.oSah)*this.oSah;
                return cy;
            }
            return null;
        }


        this.clearHH= function(){
            this.xMin=99990;
            this.xMax=-99990;
            this.maxSah=0
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear()
            }
        }


        this.creatMark= function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].creatMark()
            }
        }


        //коректируем связаные обьекты///////////////////////////////////////////
        var aObj={};
        this.dragKraiii= function(){
            for (var s in aObj) {
                aObj[s].arr.length=0
                aObj[s].arrSah.length=0
            }            
            
            for (var i = 0; i < this.par.children.length; i++) {                   
                if(aObj[this.par.children[i].krai.idSvaz]==undefined){
                    aObj[this.par.children[i].krai.idSvaz] = { arr:[], arrSah:[] }
                }
                aObj[this.par.children[i].krai.idSvaz].arr.push(this.par.children[i]);
            }
            
            for (s in aObj) {
                this.dragKr2(aObj[s])
            }            
        }


        this.dragKr2= function(_o){
            if(_o.arr.length==0)return;
            for (var i = 0; i < _o.arr.length; i++) {
                _o.arr[i].xz=null;
                _o.arr[i].xz1=null;
            }
            for (var i = 0; i < _o.arr.length; i++) {
                for (var j = 0; j < _o.arr.length; j++) {
                    if(i!=j){
                        if(Math.round(_o.arr[i].boxColizi.rectCollisMeshdy.y)==Math.round(_o.arr[j].boxColizi.rectCollisMeshdy.y)){
                            if(Math.round(_o.arr[i].boxColizi.rectCollisMeshdy.x)==Math.round(_o.arr[j].boxColizi.rectCollisMeshdy.x+_o.arr[j].boxColizi.rectCollisMeshdy.width)){
                                _o.arr[i].xz=_o.arr[j];
                            }
                            if(Math.round(_o.arr[i].boxColizi.rectCollisMeshdy.x+_o.arr[i].boxColizi.rectCollisMeshdy.width)==Math.round(_o.arr[j].boxColizi.rectCollisMeshdy.x)){
                                _o.arr[i].xz1=_o.arr[j];
                            }
                        }
                    }
                }
            }

            for (var i = 0; i < _o.arr.length; i++) {                
                if(_o.arr[i].xz==null){
                    _o.arr[i].intSah=0                    
                }else{
                    _o.arr[i].intSah=-1                    
                }
                if(_o.arr[i].xz1==null){
                    _o.arr[i].intSah1=0
                }else{                    
                    _o.arr[i].intSah1=1                    
                }               
            }            
        }       


        this.getPrice=function(a, intColor,idMat){           
            for (var i = 0; i < this.array.length; i++) { 
                if(this.array[i].visible!=false){
                    this.array[i].getPrice(a, intColor,idMat)

                }
            }
        }


        this.getObj = function(){
            var obj={}
            obj.array=[]
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible!=false)obj.array.push({x:this.array[i].x,h:this.array[i].height,h1:this.array[i].height1})
            }

            return obj;            
        }


        this.boolY=true;
        var ob,ooo
        this.setObj = function(obj){
            
            this.clearHH()
            for (var i = 0; i < obj.array.length; i++) {
                let vb=this.creat(obj.array[i].x)
                vb.x=obj.array[i].x
                vb.height=obj.array[i].h
                vb.height1=obj.array[i].h1
                vb.visible=true
            }
          

        }
    }
}



//Вертикальные хрени
export class VNB {
    constructor(par) { 
        var self=this; 
        this.type = "VisiNB";
        this.par=par;
        this._visible=false;
        this.content3d=new THREE.Object3D();
        this.par.par.c3dNa.add(this.content3d)
        this.content3d.visible=this._visible;
        this.array=[];
        this._height=115.6
        this._height1=115.6
        this._x=0
        this.content3d.position.y=this.par.oPod
        this.content3d.position.z=0.25   
        this.marker=undefined;
        this.meshS=undefined;
        this.meshF=undefined;
        this.hh=undefined; 
        this.arrImage=[]
        this.content=new PIXI.Container();
        par.par.content.addChild(this.content);

        var dopHH=3.5
        this.dragCont=function(){
            var zd=2
            if(this.arrImage[0]){
                this.arrImage[0].height=this._height1-zd;
            }
            if(this.arrImage[1]){
                this.arrImage[1].y=this._height1-zd;
            }
            par.par.drahShadow(); 
        }


        var l="resources/data/"+par.par.id+"/resources/"+par.par.object.resurs.array[3].name; 
        this.arrImage[0]=new XZImage(this.content,0,0,l,function(){                    
            this.x=-this.picWidth/4;
            //this.y=-this.picHeight/4;
            this.width=this.picWidth/2;
            this.height=this.picHeight/2;
            self.dragCont();
            self.draw()
        });

        var l="resources/data/"+par.par.id+"/resources/"+par.par.object.resurs.array[4].name; 
        this.arrImage[1]=new XZImage(this.content,0,0,l,function(){                    
            this.x=-this.picWidth/4;            
            this.width=this.picWidth/2;
            this.height=this.picHeight/2;
            self.dragCont();
            self.draw()
        });
        
        self.dragCont();
        
        this.hron=new BKHron(this, 166, 1,this.par.par.mO)
        this.hron.initHron=function(){
            
            self.dragCont();
            self.draw();            
            self.par.par.mO.dragPriceScane(); 
          
        }
        
        

        var hhh
        this.testHH=function(blok){
            hhh=-blok.boxColizi.rectCollisMeshdy.y-blok.yF-blok.boxColizi.rectCollisMeshdy.height/2+this.par.oPod                  
            if(hhh>this.height){                
                this.height=hhh;                
            } 
            if(this.visible==true){
                if(this.array[0].visible==false){
                    this.draw()
                }
            }
          
        }


        this.creatMark=function(){
            if(this.marker!=undefined)return;
            if(this.par.par.visiBPT.arrBlok[1]==undefined)return;
           
            //this.marker = new THREE.Mesh(new THREE.BoxBufferGeometry(5,1,1));
            this.marker=this.par.par.visiBPT.arrBlok[1];
            this.marker.position.set(0,0,0)
            this.marker.rotation.x=Math.PI/2
            this.marker.geometry.computeBoundingBox()
            this.hh=this.marker.geometry.boundingBox.max.z-this.marker.geometry.boundingBox.min.z;
            this.meshS=this.par.par.visiBPT.arrBlok[4].clone();
            this.meshF=this.par.par.visiBPT.arrBlok[5].clone();
            this.content3d.add(this.meshS)
            this.content3d.add(this.meshF)
            this.meshS.zz=this.par.par.visiBPT.arrBlok[5].zz
            this.meshF.zz=this.par.par.visiBPT.arrBlok[5].zz            
            if(self.par.material!=undefined){
                this.marker.material=self.par.material;
                this.meshS.material=self.par.material;
                this.meshF.material=self.par.material;
            }
            this._height=this._height+1;
            this.height=this._height-1; /**/           
        }


        this.creat=function(){
            this.creatMark();

            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible==false){
                    this.array[i].visible=true;                    
                    return this.array[i]
                }
            }
            
            this.array.push(this.marker.clone()); 
            this.content3d.add(this.array[this.array.length-1]) 
           
            //this.array.push(new THREE.AxesHelper(100)); 
            //this.content3d.add(this.array[this.array.length-1]) 

            /*let aa=new THREE.AxesHelper(100);
            this.array[this.array.length-1].add(aa);*/


            return this.array[this.array.length-1]
        }


        this.clear=function(){
            this._height=0
            this.visible = false;
           // console.warn(">>>>>>>>>>")
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible=false;                 
            }

        }


        var dragH=-100
        var vv=0;
        var mesh,vv1,vv2,s;
        this.draw=function(){
            this.creatMark();
            this.testHHHH(); 
            if(this.marker==undefined)return;
            if(this.hron.obj3d==undefined)return;
            
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible=false
            }            
            this.meshS.position.y=-this.meshS.zz/2;
            vv1=this.meshS.zz
            vv=0;
            vv2=-this.hh/2-this.hh*vv-vv1;
            for (var i = 0; i < 990; i++) {
                mesh=this.creat()
                
                mesh.position.y=vv2

                vv++;
                vv2=-this.hh/2-this.hh*vv-vv1; 
                //trace(i+"   "+vv2,mesh)                                
                if(this._height1<-vv2+this.hh) break;
            }
            this.meshF.position.y=-this.hh*vv-this.meshS.zz/2-vv1
            this.hron.clear();

            if(this.kolSahArr.array.length>1){
                vv1=0
                for (i = 0; i < this.kolSahArr.array.length-1; i++) {
                    vv1+=this.kolSahArr.arrayParam[this.kolSahArr.array[i]];                                     
                    mesh=this.hron.get();                    
                    mesh.position.y=-vv1;
                }
            } 
           // trace(this.hh+"   "+vv1)  
           // trace(this.par)

            self.dragCont()
        }


        this.drawTestUp=function(){
            this.draw()
        }

        this.mat
        this.setMat=function(m){
            this.mat=m
            if(this.marker){
                this.marker.material=m;
                this.meshS.material=m;
                this.meshF.material=m;
            }
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].material=m;
            }
        }

        this.aInfo=this.par.par.aInfo;
        this.kolSahArr = new KolSahArr(this.aInfo) 
        this.kolSahArr.dopHH = dopHH         
        this.kolSahArr.arrayParam=[this.aInfo[0].obj.num[0]/10, this.aInfo[1].obj.num[0]/10, this.aInfo[2].obj.num[0]/10];


        var pp=0;
        var aaa=[]; 
        var mxP
        this.testHHHH=function(){
            this.kolSahArr.set(this._height);
            
            this._height1=this.kolSahArr.value;
            this.testWord()
            
        } 

        
        var sten
        var yy
        var point=new THREE.Vector2()
        var point1=new THREE.Vector2()
        var point2=new THREE.Vector2()
        this.testWord=function(){
            if(this.par.par.parent==undefined)return 
            sten=this.par.par.parent;
            point.x=this.par.par.boxColizi.position._x+this.x
            point.y=this.par.par.boxColizi.position._y;
            yy=point.y+this._height1            
            if(point.y-this._height1-this.par.minusPanel <0){                
                this._height1=point.y-0.1 -this.par.minusPanel  
                
            }

            for (var i = 0; i < sten.collision.arrRect.length; i++) {     
                if(sten.collision.arrRect[i].parent==undefined)continue;
                if(sten.collision.arrRect[i].parent.type=="BPieceTop"){
                    if(sten.collision.arrRect[i].parent.idRandom==this.par.par.idRandom){
                        continue;
                    }
                }
                if(sten.collision.arrRect[i].parent.type=="Boki"){                    
                    if(sten.collision.arrRect[i].parent.par!=undefined){
                        if(sten.collision.arrRect[i].parent.par.par!=undefined){                            
                            if(sten.collision.arrRect[i].parent.par.par.idRandom==this.par.par.idRandom){                                
                                continue;
                            }
                        }
                    }
                }

                point1.x=sten.collision.arrRect[i].rectCollisMeshdy._x;
                point2.x=sten.collision.arrRect[i].rectCollisMeshdy._x+sten.collision.arrRect[i].rectCollisMeshdy.width;
                point1.y=sten.collision.arrRect[i].rectCollisMeshdy._y+sten.collision.arrRect[i].rectCollisMeshdy.height;

                if(point1.y<point.y){
                    if(point.x>point1.x&&point.x<point2.x) { 
                        point2.y=point.y-point1.y-2;
                        if(this._height1>point2.y)  this._height1=point2.y;                        
                    }                       
                } 
                this._height1=Math.round(this._height1)   
            }
                     
        }



        this.getPrice=function(a, intColor,idMat){            
            var pn="plus";
            if(intColor==1)pn="plus1";
           /* for (var j = 0; j < this.kolSahArr.array.length; j++) {
                //aaa=[]; 
                //pp=this.kolSahArr.array[j];
                aaa=menedsherMaterial.getArrOtObj(this.aInfo[pp].obj,idMat,intColor)  
                // for (var i = 0; i < this.aInfo[pp].obj[pn].length; i++) {
                //     aaa[i]=this.aInfo[pp].obj[pn][i];
                // }
                aaa[8]=this.aInfo[pp].obj;
                aaa[9]=this.aInfo[pp].obj.id;
                a.push(aaa)
            }*/

            for (var j = 0; j < this.kolSahArr.array.length; j++) {
                

                let info=this.kolSahArr.arrInfo[this.kolSahArr.array[j]]

                let aaa=menedsherMaterial.getArrOtObj(info.obj,idMat,intColor) 
                aaa[8]=info.obj;
                aaa[9]=info.obj.id;
                a.push(aaa)
              
            }




            if(this.kolSahArr.array.length>1){
                for (var j = 0; j < this.kolSahArr.array.length-1; j++) {
                    //aaa=[]; 
                    //pp=this.kolSahArr.array[j];
                    aaa=menedsherMaterial.getArrOtObj(this.hron.object.obj,idMat,intColor)  
                    /*for (var i = 0; i < this.hron.object.obj[pn].length; i++) {                        
                        aaa[i]=this.hron.object.obj[pn][i]
                    }*/
                    aaa[8]=this.hron.object.obj;
                    aaa[9]=this.hron.object.obj.id;
                    a.push(aaa)
                }
            }

            
        }
        this.hron.init();
    }

    set visible(v) {  
        if(this._visible!=v) {
            this._visible=v;
          
            this.content3d.visible=this._visible;
            this.content.visible=this._visible;
        }                
    }   
    get visible() { return  this._visible;}


    set x(v) {    
        this._x=v 
        this.content3d.position.x=v   
        this.content.position.x=v 
    }   
    get x() { return  this._x;} 


    set height(v) { 
        this._height=v       
        this.draw();              
    }   
    get height() { return  this._height;}  
}




export class KolSahArr {
    constructor(arrInfo) {  
        this.type = "KolSahArr";
        var self=this;
        this.arrayParam=[];
        this.arrInfo=arrInfo
        this.value= 0;
        this.array=[];
        var vm=0      
        var kk, kk2 
        this.num 
        this.dopHH = 10;


        this.set=function(num){
            this.array=[];
            this.value=0

            this.num=num; 
            let nnn=num+this.dopHH

            kk=nnn/this.arrayParam[this.arrayParam.length-1];
            kk2=Math.floor(kk);

            

            for (var i = 0; i < kk2; i++) {                
                this.array.push(this.arrayParam.length-1)
                this.value+=this.arrayParam[this.arrayParam.length-1];
            }

            if(kk==kk2){//идеально длинными
                return;
            }            
            vm=0;
            for (var i = this.arrayParam.length-1; i >=0; i--) {                
                let pp=   (this.value+this.arrayParam[i]+this.dopHH)                           
                if(pp>=nnn)vm=i
            }            
            this.array.push(vm)
            this.value+=this.arrayParam[vm];            
        }




        var o
        this.toString=function(){
            o={}
            o.num=this.num
            o.array=this.array
            o.value=this.value
            return JSON.stringify(o)
        }
    }
}



//хрень для отрисовки и искажения драгера
//верхушка горизонтальная
export class VisiBPT {
    constructor(par) {  
        this.type = "VisiBPT";
        var self=this;
        this._width=100;
        this.par=par;
        this.arrBlok=[];
        this.meshS;
        this.meshF;
        this.array=[];
        var a;
        self.marker=undefined;        
        this.cont3d=new THREE.Object3D();
        this.par.c3dNa.add(this.cont3d);
        this.content3d=new THREE.Object3D();
        this.cont3d.add(this.content3d)
        this.material=undefined
        this.arrImage=[];
        this.content=new PIXI.Container();

        par.content.addChild(this.content);
        this.arrImage[0]=par.image;

        this.contMin=new PIXI.Container();
        this.content.addChild(this.contMin);
        this.contMin.addChild(this.arrImage[0]);

        this.dragCont=function(){            
            this.arrImage[0].x = -this.arrImage[0].width
            if(this.arrImage[1]){
                this.arrImage[1].width=this._width
                this.arrImage[1].x=0
            }
            if(this.arrImage[2]){
                this.arrImage[2].x = this._width
            }          
        }

        var l="resources/data/"+par.id+"/resources/"+par.object.resurs.array[1].name; 
        this.arrImage[1]=new XZImage(this.contMin,0,0,l,function(){                    
            this.x=-this.picWidth/4;
            this.y=-this.picHeight/4;
            this.width=this.picWidth/2;
            this.height=this.picHeight/2;
            self.dragCont();
        });

        var l="resources/data/"+par.id+"/resources/"+par.object.resurs.array[2].name; 
        this.arrImage[2]=new XZImage(this.contMin,0,0,l,function(){                    
            this.x=-this.picWidth/4;
            this.y=-this.picHeight/4;
            this.width=this.picWidth/2;
            this.height=this.picHeight/2;
            self.dragCont()
        });        
        self.dragCont();
        

        this.funInitMod = function(o){            
            var h;
            for (var i = o.children.length-1; i >=0; i--) {                
                if(o.children[i].name.indexOf("marker_")!=-1){
                    a=o.children[i].name.split("_")
                    if(a[1]!=undefined){
                        this.arrBlok[a[1]*1]=o.children[i];
                    }
                }                
            }
            if(this.arrBlok[2]==undefined)this.arrBlok[2]=this.arrBlok[0];
            if(this.arrBlok[3]==undefined)this.arrBlok[3]=this.arrBlok[0];

            if(this.arrBlok[4]==undefined)this.arrBlok[4]=this.arrBlok[1];
            if(this.arrBlok[5]==undefined)this.arrBlok[5]=this.arrBlok[1];

            for (var i = 0; i < this.arrBlok.length; i++) {              
                this.arrBlok[i].geometry.computeBoundingBox()
                this.arrBlok[i].zz=this.arrBlok[i].geometry.boundingBox.max.z-this.arrBlok[i].geometry.boundingBox.min.z;
                this.arrBlok[i].xx=this.arrBlok[i].geometry.boundingBox.max.x-this.arrBlok[i].geometry.boundingBox.min.x;
                this.arrBlok[i].yy=this.arrBlok[i].geometry.boundingBox.max.y-this.arrBlok[i].geometry.boundingBox.min.y;
           
                this.arrBlok[i].position.set(0,0,0)
                this.arrBlok[i].rotation.x=Math.PI/2
                this.arrBlok[i].rotation.y=0;
                this.arrBlok[i].rotation.z=0;
                if(this.material)  if(this.arrBlok[i].material) this.arrBlok[i].material=  this.material             
            }

            this.meshS=this.arrBlok[2].clone();
            this.meshF=this.arrBlok[3].clone();
            this.content3d.add(this.meshS)
            this.content3d.add(this.meshF)
            this.meshS.xx=this.arrBlok[0].xx;
            this.meshF.xx=this.arrBlok[3].xx;
            this.marker=this.arrBlok[2];
            par.cont3dLoad.parent.remove(par.cont3dLoad);            
            this.width=this._width;
        }


        this.clear = function(num){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible=false;
            }
        }


        this.getMesh = function(num){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].num==num){
                    if(this.array[i].visible==false){
                        this.array[i].visible=true
                        return this.array[i];
                    }
                }
            } 
            this.array.push(this.marker.clone());
            this.array[this.array.length-1].idArr=this.array.length-1;
            this.array[this.array.length-1].num=num;
            this.array[this.array.length-1].rotation.x=Math.PI/2;
            this.content3d.add(this.array[this.array.length-1])
            return this.array[this.array.length-1];
        }


        var kB, kM, vv, mesh
        this.draw = function(){
            this.clear();
            if(this.marker==undefined)return            
            vv=0;
            var otX=2
            var bb=true
            var zd=1.17
            var wwww=this._width+zd*2+otX*2;
            this.meshS.position.x=this.meshS.xx/2-zd-otX;
            vv+=this.meshS.xx;

            for (var i = 0; i < wwww; i+=this.marker.xx) {
                mesh = this.getMesh(0);                           
                mesh.position.x=vv+this.marker.xx/2-zd-otX;
                vv+=this.marker.xx;
                if(vv+this.marker.xx>wwww)break;
            }

            this.meshF.scale.x=(wwww-vv)/this.meshF.xx;
            this.meshF.position.x=vv+this.meshF.xx/2*this.meshF.scale.x-zd-otX;

            this.content3d.position.x=-this._width/2;
            var ww=5;
            this.par.boxColizi.width=ww;            
            this.par.boxColizi.rectCollisMeshdy.width=ww;
            this.par.boxColizi.x=-ww/2;
            this.par.boxColizi.sx=-ww/2;
            this.par.boxColizi.rectCollisMeshdy.x=-ww/2+this.par.x;
            
            this.par.boxColizi.y=-ww/2;
            this.par.boxColizi.sy=-ww/2;

            this.content.position.x = this.content3d.position.x;
            this.dragCont();            
        } 


        this.zdvigX=function(mmmXX) {                   
            self.cont3d.position.x=mmmXX;
            self.contMin.position.x=mmmXX;
        }


        this.setMat=function(m){          
            this.material=m
            for (var i = 0; i < this.arrBlok.length; i++) {
                this.arrBlok[i].material=m;
            }
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].material=m;
            }
            if(this.array.length!=0){
                this.meshS.material=m;
                this.meshF.material=m; 
            }            
        }         

        
        var p,w, aaa,aNum, strType;
        var at,at1,kk,kk2,dd,dd1,dd2, dd3, dddd
        this.getPrice=function(a, intColor,idMat){
            w=this._width 
            p=0;
            strType="plus"
            if(intColor==1)strType="plus1";
            if(aNum==undefined){
                aNum=[]
                for (var i = 0; i < this.par.aInfo1.length; i++) {
                    aNum[i]=this.par.aInfo1[i].obj.num[0]/10;
                }
            }
            if(w>1){               
                aNum[0]=104
                if(w<=100){//
                    /*aaa=[]
                    for (var i = 0; i < this.par.aInfo1[p].obj[strType].length; i++) {
                        aaa[i]=this.par.aInfo1[p].obj[strType][i]
                    }*/
                    aaa=menedsherMaterial.getArrOtObj(this.par.aInfo1[p].obj,idMat,intColor) 
                    aaa[8]=this.par.aInfo1[p].obj;
                    aaa[9]=this.par.aInfo1[p].obj.id;
                    a.push(aaa)
                    return;
                }

                kk=w/aNum[1]
                kk2=Math.ceil(kk)
                dd=kk2*aNum[1];
                dd1=(kk2-1)*aNum[1]+aNum[0]
                dd2=(kk2-1)*aNum[1]+aNum[0]*2

                dddd=dd-w;
                at=[]
                for (var i = 0; i < kk2; i++) {
                    at.push(1)
                }
                if(dd1-w>0){
                    if(dd1-w<dddd){
                        dddd=dd1-w;
                        at=[]
                        for (var i = 0; i < kk2-1; i++) {
                            at.push(1)
                        }
                        at.push(0)
                    }
                }

                if(dd2-w<dddd){
                    dddd=dd2-w;
                    at=[]
                    for (var i = 0; i < kk2-1; i++) {
                        at.push(1)
                    }
                    at.push(0)
                    at.push(0)
                }

                kk=w/aNum[0]
                kk2=Math.ceil(kk)
                dd3=kk2*aNum[0];

                if(dd3-w<dddd){
                    
                    at=[]
                    for (var i = 0; i < kk2; i++) {
                        at.push(0)
                    }                   
                }

                for (var j = 0; j < at.length; j++) {
                    p=at[j]
                   /* aaa=[]
                    for (var i = 0; i < this.par.aInfo1[p].obj[strType].length; i++) {
                        aaa[i]=this.par.aInfo1[p].obj[strType][i]
                    }*/
                    aaa=menedsherMaterial.getArrOtObj(this.par.aInfo1[p].obj,idMat,intColor) 
                    aaa[8]=this.par.aInfo1[p].obj;
                    aaa[9]=this.par.aInfo1[p].obj.id;
                    a.push(aaa)
                }
            }
        }
    }
    set width(v) {
        if(this._width!=v){
            this._width = v;             
            this.draw();   
        }                   
    }   
    get width() { return  this._width;}
}