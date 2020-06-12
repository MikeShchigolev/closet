/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

блок тумба
*/

import { Blok } from './Blok.js';

export class BTumba extends Blok {
    constructor(mO, o, idArr, fun) {
        super( mO, o, idArr, fun)
        this.type = "BTumba";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.heightSten=275;
        this.collision=undefined;
        this.arrPosit=[];
        this.arrPositZ=[];
        this._polka=false;
        this._pod=false;
        this.aa.push("verhTumb");

        this.plusObj=new PlusObj(this);

        this.setXY=function(_x,_y){           
            this.boxColizi.position._x = _x;
            this.boxColizi.position.y = _y;
            if(this.testTumbu(_x,_y)==true){
                return;
            }  
            if(this.parent!=undefined){
                this.parent.collision.testRect(this.boxColizi);
                this.drahShadow();                
            }            
        }


        this.drahShadow=function(_x,_y){ 
            if(this.parent!=undefined){
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

        this.dragImeag=function(){self.drahShadow()}

        this.dddddd=function(a,_x){
            var r= false;
            for (var i = 0; i < this.collision.arrRect.length; i++) {
                if(this.collision.arrRect[i].parent.type=="BTumba")
                if(this.collision.arrRect[i].idRandom!=this.boxColizi.idRandom){
                    col=this.collision.arrRect[i]; 
                    if(_x>col.rectCollisMeshdy.x){
                        if(_x<col.rectCollisMeshdy.x+col.width){
                            col.spx= col.position.x
                            col.sMx= col.rectCollisMeshdy.x                
                            r=true;
                            a.push(col);
                        }                                           
                    }
                }
            }
            return r 
        }


        var aa,aaa
        var col
        this.testTumbu=function(_x,_y){
            if(this.collision==undefined)return false
            var r= false; 
            aa=[];            
            r=this.dddddd(aa, _x);                       

            if(r==true){//сортируем приметивы
                r=this.testverh(this.boxColizi, aa)
            }

            if(r==true){//сортируем приметивы
                r=this.testTumbu2(_x,_y, this.boxColizi, aa)
            }              
            
            if(r===false && aa.length==0){                
                this.boxColizi.position.y = 0;
            } 
            this.drahShadow() 
            this.testPodBig()           
            return r;
        }


         

        this.funInitMod = function(){
            var o=self.cont3dLoad.children[0];
            var h;
            for (var i = o.children.length-1; i >=0; i--) {
                if(o.children[i].name.indexOf("marker_")!=-1){
                    h=new BHronTumba();
                    h.x=o.children[i].position.x;
                    h.y=o.children[i].position.y;
                    h.z=o.children[i].position.z;
                    self.arrPosit.push(h);
                    self.arrPositZ.push(-o.children[i].position.z);
                    o.remove(o.children[i]);
                }
            } 

            self.arrPosit.sort(function(a, b) {
                return a.z - b.z;
            });
            for (var i = 0; i < self.arrPosit.length; i++) {
                self.arrPosit[i].idArr=i;
            }
            self.content3d.position.z = 0.5;        

            self.prosZ=2;
            self.dragObjNWD()
        }

        this.stopDrag=function(){
            
            self.testverh()
        }

        var __xxx
        this.testverh = function( col, arrColl){                         
            if(col==undefined){
                var r= false; 
                aa=[];            
                r=this.dddddd(aa,  this.boxColizi.position._x);
                if(r==true){//сортируем приметивы                   
                    col=this.boxColizi
                    arrColl=aa;
                }else{
                    return
                }
            }

            var yy=-1111;
            var r=-1;
            var xxx=arrColl[0].rectCollisMeshdy.x;            
            for (var i = 0; i < arrColl.length; i++) {
                if(arrColl[i].idRandom!=col.idRandom){
                    xxx=arrColl[i].rectCollisMeshdy.x;
                }
               
                if(arrColl[i].rectCollisMeshdy.y>yy){
                    yy=arrColl[i].rectCollisMeshdy.y
                    r=i; 
                }
            }
            __xxx=xxx+arrColl[0].width/2
            if(r!=-1){
                col.rectCollisMeshdy.x=xxx;
                col.position.x=xxx+arrColl[0].width/2;
                col.position.y=arrColl[r].rectCollisMeshdy.y+arrColl[r].height;
                col.rectCollisMeshdy.y=arrColl[r].rectCollisMeshdy.y+arrColl[r].height;
                this.collision.drawDegug();
                if(col.rectCollisMeshdy.y+arrColl[r].height>270){                    
                    col.rectCollisMeshdy.y=0;
                    this.boxColizi.position.y = 0;                    
                    return false;
                }                
            }
            return true;
        }


        var arc=[]
        var arcIdArr=[]
        var arcIdBool=[]
        var sah=0
        var point=new THREE.Vector2()
        var point1=new THREE.Vector2()
        this.testPodBig=function(){
            arc=this.collision.arrRect;
            trace("testPodBig---")
            arcIdArr=[];
            arcIdBool=[];
            sah=0;
            for (var i = 0; i < arc.length; i++) {//сравниваем
                if(arc[i].parent!=undefined&&arc[i].parent.type=="BTumba"){
                    arcIdArr[sah]=i;
                    arcIdBool[sah]=-1;
                    point.x=arc[i].position.x
                    point.y=arc[i].rectCollisMeshdy.y
                    for (var j = 0; j < arc.length; j++) {//сравниваем
                        if(arc[j].parent!=undefined&&arc[j].parent.type=="BTumba"){
                            if(arcIdBool[sah]==-1)arcIdBool[sah]=false
                            if(i!=j){
                                if(Math.round(arc[i].position.x)==Math.round(arc[j].position.x)){
                                    if(arc[i].rectCollisMeshdy.y<arc[j].rectCollisMeshdy.y){                                        
                                        arcIdBool[sah]=true;
                                        j=99999
                                    } 
                                }
                            }
                        }
                    }
                    sah++
                }                
            }

            for (var i = 0; i < arcIdArr.length; i++) {
                if(arcIdBool[i]!=-1){                   
                    arc[arcIdArr[i]].parent.pod=arcIdBool[i]
                }                
            }
        }


        this.getAllTumb=function(blok){            
            var arrAll=[]
            arc=this.collision.arrRect;
            var b
            sah=0;
            for (var i = 0; i < arc.length; i++) {//сравниваем               
                if(arc[i].parent!=undefined&&arc[i].parent.type=="BTumba"){
                    b=true
                    if(blok)   if(blok.idArr==arc[i].parent.idArr)b=false;                    
                    if(b)arrAll.push(arc[i]);
                }               
            }
            return arrAll
        }

        var rrr,bbb
        this.dragTumb=function(sten){
            bbb=false;
            for (var i = 0; i < sten.children.length; i++) {
                if(sten.children[i].type=="BTumba"){
                    rrr=this.downTumb(sten.children[i])
                    if(rrr){
                        bbb=true
                    }                    
                }
            }
            
            if(bbb==true)this.dragTumb(sten)
            else{
                for (var i = 0; i < sten.children.length; i++) {
                    if(sten.children[i].type=="BTumba"){
                        sten.children[i].testPodBig()
                        sten.children[i].drahShadow()
                    }
                }
                this.mO.dragPriceScane() 
            }
        }


        var sy
        this.downTumb=function(tumb){
            var r=-1
            var b=false           
            if(tumb.boxColizi.rectCollisMeshdy.y!=0){
                var sten=tumb.parent;
                for (var i = 0; i < sten.children.length; i++) {
                    if(sten.children[i].type=="BTumba"){
                        if(tumb.idArr!=sten.children[i].idArr){
                            if(Math.round(sten.children[i].boxColizi.position.x)==Math.round(tumb.boxColizi.position.x)){
                                sy=sten.children[i].boxColizi.rectCollisMeshdy.y+sten.children[i].boxColizi.height
                                if(tumb.boxColizi.rectCollisMeshdy.y>(sy-1)){
                                    if(r<sy)r=sy
                                }
                            }
                        }
                    }
                }
                if(r==-1)r=0;
                if(tumb.boxColizi.rectCollisMeshdy.y!=r)b=true
                tumb.boxColizi.rectCollisMeshdy.y=r
            }
            return b;
        }

        //Ухуячиваем матерьялы, все и без возврата
        var boolColo=false;
        this.nitColor=function(){
            if(this.arrayMat.length==0)  return;   
            if(boolColo==true )return;   
            boolColo=true;
            this.okPrice=false;
            for (var i = 0; i < this.arrayChild.length; i++) {
                if(this.arrayChild[i].material){
                    this.arrayChild[i].material=mO.matNull
                }
            }
            this.arrayMat.length=0;
        }


        var aaa,aa,ad
        this.getPrice=function(intColor,idMat){
            aaa=[];
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


            if(aa!=undefined){
                ad=[];                         
                for (var j = 0; j < aa.length; j++) {
                    ad[j]=aa[j];                                
                }
                ad[8]=this.object;
                ad[9]=this.object.id;
                ad[10]=1;
                ad[11]=aa[3]*1;
                aaa.push(ad)
            }
            this.plusObj.getPrice(aaa, intColor,idMat);
            return aaa;
        }


        var xx,yy;
        this.testTumbu2=function(_x,_y, col, arrColl){  
            var r=true;
            var xxx=arrColl[0].rectCollisMeshdy.x;
            col.rectCollisMeshdy.x=arrColl[0].rectCollisMeshdy.x
            col.position.x=col.rectCollisMeshdy.x+arrColl[0].width/2;            
            col.position.y=_y;
            var iV=-1;
            var m=-99999;            
            for (var i = 0; i < arrColl.length; i++) {                
                if(m<arrColl[i].position.y){
                    m=arrColl[i].position.y;
                    iV=i;
                }
            }

            arrColl.push(col);
            var yy;
            for (var i = 0; i < arrColl.length; i++) {                  
                if(i==0){
                    yy=0 - arrColl[i].sy;                    
                }else{
                    yy=arrColl[i-1].position.y+arrColl[i-1].height/2 + arrColl[i].height/2;                    
                }              
                
                arrColl[i].position.y=yy;
                if(i!=arrColl.length-1){
                    arrColl[i].position.x=arrColl[i].spx
                    arrColl[i].rectCollisMeshdy.x=arrColl[i].sMx
                }else{
                    arrColl[i].position.x=arrColl[0].spx
                    arrColl[i].rectCollisMeshdy.x=arrColl[0].sMx
                }
                
                if(arrColl[i].parent){
                    arrColl[i].parent.drahShadow();
                }                
            }
            return r;
        }


        this.testNa=function(){             
            if(this._parent!=undefined){
                var aa=[]
                this.dddddd(aa,this.boxColizi.position._x)
                for (var i = 0; i < aa.length; i++) {
                    aa[i].rectCollisMeshdy.y=aa[i].rectCollisMeshdy.y-this.boxColizi.height;
                    aa[i].position.y=aa[i].position.y-this.boxColizi.height;
                } 
                if(aa.length!=0){
                    this.setXY(this.boxColizi.position._x,this.boxColizi.position._y) 
                }
            }
        }


        this.aaSob=function(s,p){            
            if(s=="clear"){
                var p=self.parent
                self.mO.par.clear(self);
                self.clear()
                self.mO.activIndex=-1;              
                self.dragTumb(p)
            }
            if(s=="verhTumb"){                
                self.polka=!self.polka;
                self.testPodBig()
            }
            setTimeout(function() {self.fun("visi3d");}, 10);
            self.mO.dragPriceScane()
        }


        this.funDragColor2=function(){
            this.plusObj.funDragColor2();
        }


        this.dragStart=function(){ 
        }


        this.stopDrag=function(){            
            if(this.parent==undefined){
                if(this.boolOTS==true)if(this.objts)if(this.objts.parent){
                    this.objts.parent.add(this)                   
                    this.setXYPosit(this.objts.x,this.objts.y);
                    this.drahShadow()
                    this.fun("visi3d");
                }
            }  
            self.mO.dragPriceScane()        
        }

        this.objts=undefined;
        this.tsSet=function(){   
            if(this.boolOTS==false)return;         
            if(this.parent==undefined)return;
            this.objts=this.getObj();
            this.objts.parent=this.parent;
        }

        this.isAddBlokFalse=function(){           
            return true;
        }

        this.getObj = function(){
            var obj={}
            obj.type=this.type;
            obj.id=this.id;
            obj.x=self.content3d.position.x;
            obj.y=self.content3d.position.y;
            obj.pod=this.pod
            obj.polka=this.polka            
            obj.children=[];
            for (var i = 0; i < this.children.length; i++) {
                obj.children[i] = this.children[i].getObj();
            }
            return obj;            
        }


        var ob,ooo
        this.setObj = function(obj){                     
            this.setXYPosit(obj.x,obj.y); 
            if(obj.children)          
            for (var i = 0; i < obj.children.length; i++) {
                ooo= mO.getIdObj(obj.children[i].id)                  
                ob=mO.getBlok(ooo.obj)
                ob.setObj(obj.children[i])
                this.add(ob);                 
            }

            if(obj.pod!=undefined){
                this.pod=obj.pod
                this.polka=obj.polka
            }
            return obj;            
        }
    }

    set parent(v) {
        if(this._parent!=v){
            this._parent= v;             
            if(this._parent==undefined){
                this.collision=undefined
                this.mO.visi3D.event3DArr.removeChild(this.c3dNa);
            } else{
                this.collision=this._parent.collision;
                this.mO.visi3D.event3DArr.addChild(this.c3dNa);                
                this.drahShadow()  
            }                
        }       
    }   
    get parent() { return  this._parent;}


    set polka(v) {
        if(this._polka!=v){
            this._polka = v;  
            this.plusObj.polka = v;     
            this.fun("visi3d");      
        }           
    }   
    get polka() { return  this._polka;} 


    set pod(v) {
        if(this._pod!=v){
            this._pod = v;  
            this.plusObj.pod = v;     
            this.fun("visi3d");      
        }           
    }   
    get pod() { return  this._pod;}  
}




export class BHronTumba {
    constructor() {
        this.x=0;
        this.y=0;
        this.z=0;
        this.bool=false;
    }
}

export class PlusObj {
    constructor(par) { 
        var self=this;   
        this.type = "PlusObj"; 
        this.par=par;
        this.content3d = new THREE.Object3D();
        this.par.c3dNa.add(this.content3d);
        this._polka=false;
        this._pod=false;
        this.content3d.visible=this._polka
        this.obj3d=-1;
        this.hron = new BKHron(this, 19, 0) 
        this.objManiPlus=this.par.mO.getIdObj(107)

        this.initHron=function(){
            self.obj3d=self.hron.get();            
            self.obj3d.position.y=-self.par.rect[2];
            self.content3d.add(self.obj3d);            
            self.par.fun("visi3d"); 
            self.par.recurcChild(self.obj3d);
            self.par.dragColor();
            
        }

        this.funDragColor2=function(){
            this.hron.dragC(this.par.material)

        } 

        var bb
        this.dragPolka=function(){
            bb=false;
            if(this._polka==true&&this._pod==false){
                bb=true
            }
            this.content3d.visible=bb;
        }

        var strXZ,aaa
        this.getPrice=function(a, intColor,idMat){
            if(this.pod==true)return
            if(this.polka==false)return    
            strXZ="plus";
            if(intColor==1)strXZ="plus1"            
            if(this.hron.object.obj[strXZ]!=undefined){
               /* aaa=[] 
                for (var i = 0; i < this.hron.object.obj[strXZ].length; i++) {
                    aaa[i]=this.hron.object.obj[strXZ][i]
                }*/
                aaa=menedsherMaterial.getArrOtObj(this.hron.object.obj,idMat,intColor) 
                aaa[9]=this.hron.object.obj.id;
                aaa[8]=this.hron.object.obj;
                a.push(aaa) 
                if(this.objManiPlus){
                   /* aaa=[] 
                    for (var i = 0; i < this.objManiPlus.obj[strXZ].length; i++) {
                        aaa[i]=this.objManiPlus.obj[strXZ][i]
                    }*/
                    aaa=menedsherMaterial.getArrOtObj(this.objManiPlus.obj,idMat,intColor) 
                    aaa[9]=this.objManiPlus.obj.id;
                    aaa[8]=this.objManiPlus.obj;
                    a.push(aaa)
                }                              
            }            
        }
    }

    set pod(v) {
        if(this._pod!=v){
            this._pod= v;
            this.dragPolka();              
            this.par.fun("visi3d");      
        }           
    }   
    get pod() { return  this._pod;}


    set polka(v) {
        if(this._polka!=v){
            this._polka= v;
            this.dragPolka()
            if(v) 
            if(this.obj3d==-1){
                this.hron.init();
                this.obj3d=-2;  
            }      
            this.par.fun("visi3d");      
        }           
    }   
    get polka() { return  this._polka;}
}




export class BKHron {
    constructor(par, id, idArr) { 
        var self=this;   
        this.type = "BKHron";        
        this.par=par;
        this.id=id;
        this.idArr=idArr
        this.obj3d=undefined

        if(typeof id != "object"){
            this.object=this.par.par.mO.getIdObj(id)
        }else{
            this.object=id
            this.id=this.object.id
        }
        this.array=[]
        this.material    
        this.bbbb=true        
        this.init=function(){             
            if(this.object.obj==undefined){
                console.error("По умолчанию не вложен обьект")
                return;
            }
            this.link="resources/data/"+this.object.obj.id+"/mod/"+ this.object.obj.mod.name       
            this.par.par.mO.getModel(this.link, this.object.obj.mod.key,function(o){                
                self.obj3d=o;               
                if(self.bbbb==true) {          
                    o.position.y=self.object.obj.mod.r[2]
                    o.position.z=self.object.obj.mod.r[1]  
                }         
                self.par.initHron();
            })
        }


        this.clear=function(){  
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].parent!=undefined)this.array[i].parent.remove(this.array[i])
            }            
        }


        this.get=function(){ 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].parent==undefined){
                    this.par.content3d.add(this.array[i])
                    return this.array[i]
                }
            }
            this.array.push(self.obj3d.clone())
            this.par.content3d.add(this.array[this.array.length-1])
            if(this.material!=undefined){                
                this.array[this.array.length-1].material=this.material
                this.redragM(this.array[this.array.length-1], this.material);
            }
            return this.array[this.array.length-1];
        } 

        this.dragC=function(m){ 
            this.material=m;                   
            for (var i = 0; i < this.array.length; i++) {
                this.redragM(this.array[i], m);
            }
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
    }
}

