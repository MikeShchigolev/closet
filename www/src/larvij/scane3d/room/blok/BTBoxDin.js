/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

блок тумба
*/

import { Blok } from './Blok.js';
import { Doska3D } from './doska/Doska3D.js';

import { BoxTumba3D } from './doska/BoxTumba3D.js';

export class BTBoxDin extends Blok {
    constructor(mO, o, idArr, fun) {
        super( mO, o, idArr, fun)
        this.type = "BTBoxDin";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        

        

        this.heightSten=275;
        this.collision=undefined;
        this.arrPosit=[];
        this.arrPositZ=[];
        
        this._pod=false;
        this.aa.push();


        this._width=100;
        this._height=100;
        this._depth=100;
        this._thickness=1.6;
        this._otstup=0.3;

        

        this._indexW=0;
        this._indexH=0;

        this.wN=mO.wN;
        this.hN=mO.hN; 
        this.idCT="idMatObject1"
        this.matBas="materialBase1";//Тип общего цвета
        this.boolDinColor=true;//Не отрабатываает общий цвет


       





        this.setXY=function(_x,_y){           
            
            

            /*if(this.testTumbu(_x,_y)==true){
                return;
            }*/ 

            if(this.parent!=undefined){
              
                let xx=this.isWA(this.parent.collision.arrRect,_x,this.boxColizi.width,this.boxColizi,this.parent.collision.colozi.bigBox.width)
                if(xx!=false){
                    _x=xx
                }
                this.boxColizi.position._x = _x;
                this.boxColizi.position.y = _y;

                this.parent.collision.testRect(this.boxColizi);
                this.drahShadow();  
                return              
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

        this.dragImeag = function(){self.drahShadow()}

        this.dddddd=function(a,_x){
            var r= false;
            for (var i = 0; i < this.collision.arrRect.length; i++) {
                if(this.collision.arrRect[i].parent.type == "BTBox" || this.collision.arrRect[i].parent.type == "BTumba" )
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

            return r;
        }
        this.c3dDebag=undefined        
        if(tStyle.glaf.debug==true)this.c3dDebag = new THREE.Object3D();
            
        this.array=[] 

        this.boxTumba3D  

        this.init=function(_obj){
            
            this.creatBC()
            this.testMaterial();
            this.modelObj=_obj;
            this.cont3dLoad= new THREE.Object3D();
            self.c3dNa.add(self.cont3dLoad);

            this.boxTumba3D = new BoxTumba3D(this.material)
            this.cont3dLoad.add(this.boxTumba3D.c3d)
           /* for (var i = 0; i < 6; i++) {
                this.array[i]=new Doska3D(this.material)
                //.material
                this.cont3dLoad.add(this.array[i].c3d)
            }*/

            this.dragWHD();
            let pObject=new DParamObject(main.glaf.dCont,2,300,function(){          
                self.fun("visi3d");
            });
            setTimeout(function() {
                pObject.addObject(self.boxTumba3D);
            }, 10);
            

            //this.funInitMod()
        }
        

        this.boolLoad=false       

        this.funInitMod = function(){

            this.creadDebag(self.cont3dLoad);

            
            
            var o=self.cont3dLoad;
            if(this.c3dDebag){
                o.add(this.c3dDebag)
            }


            var h;
            let p=-1
            for (var i = o.children.length-1; i >=0; i--) {

                if(o.children[i].name=="marker_"){
                    p=o.children[i]
                    //o.remove(p);
                }               
            } 
            if(p!=-1){
                if(this.c3dDebag){
                    let aa=new THREE.AxesHelper(200);
                    this.c3dDebag.add(aa);
                    aa.position.z=p.position.z;
                }

                var dd=0
                for (var i = 0; i < 222222; i++) {
                    h=new BHronTumba();
                    h.x=p.position.x;
                    h.y=p.position.y;
                    h.z=p.position.z+dd;
                    self.arrPosit.push(h);
                    let dddd=-p.position.z-dd;

                   
                    

                    if(dddd>self.object.mod.r[2]){
                        self.arrPositZ.push(dddd);

                        if(this.c3dDebag){
                            let aa=new THREE.AxesHelper( 100 )
                            this.c3dDebag.add(aa)
                            aa.position.z=h.z//dd+self.object.mod.r[2]
                        }



                        dd+=3.2;
                    }else{
                        break;
                    }

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
            self.boolLoad=true
            self.dragIndex();
            self.dragObjNWD();


            

        }

        this.creatBCFun=function(){
            
            self.boxColizi.rectCollisMeshdy.coliziStop = {
                x: -999,
                y: 0,
                z: 0,
                width: 9999,
                height: 236,
                depth: 100
            }
            self.boxColizi.rectCollisMeshdy.funErr = self.clear;
            self.boxColizi.rectCollisMeshdy.disStick=1
        }

        this.isOver=function(sten,_xx,_yy){
            trace(">>>Продолжим сдесь, тупо проверка а можно ли вситавить ",sten.collision);
            

            
            if(this.isWA(sten.collision.arrRect,_xx,this.boxColizi.width,this.boxColizi,sten.collision.colozi.bigBox.width)!=false){
                return true
            }

            return false
        }


        this.isWA = function(arrRect,_xx, _ww, _not, _wBig){
            if(_xx<_ww/2)_xx=_ww/2
            if(_xx>_wBig-_ww/2)_xx=_wBig-_ww/2   
            //trace(">>>>>>>,_xx,_yy  ",arrRect,_xx, _ww, _not, _wBig);
            let a =[];

            for (var i = 0; i < arrRect.length; i++) {
                if(_not){
                    if(_not.idRandom==arrRect[i].idRandom)continue;                    
                    let yy=arrRect[i].rectCollisMeshdy._y-arrRect[i].rectCollisMeshdy.height                    
                    if(arrRect[i].rectCollisMeshdy._y>_not.rectCollisMeshdy.height)continue; 
                }                        
                a.push(arrRect[i].rectCollisMeshdy.x,arrRect[i].rectCollisMeshdy.x+arrRect[i].rectCollisMeshdy.width);
            }
            let rb=true
            for (var i = 0; i < a.length; i+=2) {
                //trace(i+"  ",a[i],a[i+1])
                if(calc.test2d(a[i],a[i+1],_xx-_ww/2,_xx+_ww/2)==true){                    
                    rb=false
                }
            }
            if(rb==true)return _xx*1;
            let aaa =[];
            let xp=0
            let bb=false

            for (i = 0; i < a.length; i+=2) {
                //лево
                bb=true
                xp=a[i]-_ww/2;

                if(xp<_ww/2)bb=false
                

                if(bb==true)   
                for (let j = 0; j < a.length; j+=2) {
                    if(i!=j){
                        if(calc.test2d(a[j],a[j+1],xp-_ww/2,xp+_ww/2)==true){                    
                            bb=false
                        }
                    }
                }
                if(bb==true){
                    aaa.push(xp)
                }
                //право
                bb=true
                xp=a[i+1]+_ww/2;                
                if(xp>_wBig-_ww/2)bb=false; 

                if(bb==true)   
                for (let j = 0; j < a.length; j+=2) {
                    if(i!=j){
                        if(calc.test2d(a[j],a[j+1],xp-_ww/2,xp+_ww/2)==true){                    
                            bb=false
                        }
                    }
                }
                if(bb==true){
                    aaa.push(xp)
                }
                
            }
            if(aaa.length==0)return false
            let max=9999999999999
            let ind=-1


            for (i = 0; i < aaa.length; i++) {
                if(Math.abs(aaa[i]-_xx)<max){
                    max=Math.abs(aaa[i]-_xx)
                    ind=i
                }
            }
                

           // trace(aaa[ind],aaa)
           //trace(rb,_xx-_ww/2,_xx+_ww/2)


            return aaa[ind]
        }



        


        //--------------------------------------


        this.dragWHD=function(){
           /* this.array[0].c3d.position.x=-this._width/2+this._thickness/2;
            //this.array[0].position.y=-this._height/2;
            this.array[0].c3d.position.z=this._depth/2;*/
        }


       /*this.dragIndex=function(){
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

        

                let xx=this.boxColizi.rectCollisMeshdy.x+this.boxColizi.width/2

                let t=this.wN[this._indexW]+0.02
                this.boxColizi.width=t;
                this.boxColizi.rectCollisMeshdy.width=t;
                this.boxColizi.sx=-t/2;
                this.boxColizi.x=-t/2;

                this.boxColizi.rectCollisMeshdy.x=xx-this.boxColizi.width/2;


                if(this.c3dDebag){
                    this.c3dDebag.position.x=-this.boxColizi.width/2+1.5
                    this.c3dDebag.position.y=1.5;
                }

              
                
               
            }
            self.dragObjNWD();
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
                        let m=new THREE.Mesh(this.mO.gBox, this.mO.matRed1);
                        o.add(m) 
                        m.name=this.arrObj[i][j].name;                       
                        m.scale.set(this.arrObj[i][j].w,this.arrObj[i][j].d,1)
                        m.position.set(0,this.arrObj[i][j].d/2,j*1+i*5);
                    }

                }
            }

            if(this.idArr==-1){
                let m=new THREE.Mesh(this.mO.gBox, this.mO.matRed2);
                o.add(m)                       
                m.scale.set(10,10,10)
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
*/


        //--------------------------------------


        this.stopDrag=function(){
            
            self.testverh()
        }

        var __xxx
        this.testverh = function( col, arrColl){                         
           // return
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
            
            arcIdArr=[];
            arcIdBool=[];
            sah=0;
            for (var i = 0; i < arc.length; i++) {//сравниваем
                if(arc[i].parent!=undefined&&arc[i].parent.type=="BTBox"){
                    arcIdArr[sah]=i;
                    arcIdBool[sah]=-1;
                    point.x=arc[i].position.x
                    point.y=arc[i].rectCollisMeshdy.y
                    for (var j = 0; j < arc.length; j++) {//сравниваем
                        if(arc[j].parent!=undefined&&arc[j].parent.type=="BTBox"){
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
                if(arc[i].parent!=undefined&&arc[i].parent.type=="BTBox"){
                    b=true
                    if(blok)   if(blok.idArr==arc[i].parent.idArr)b=false;                    
                    if(b)arrAll.push(arc[i]);
                }               
            }
            return arrAll;
        }

        var rrr,bbb
        this.dragTumb=function(sten){
            bbb=false;
            for (var i = 0; i < sten.children.length; i++) {
                if(sten.children[i].type=="BTBox"){
                    rrr=this.downTumb(sten.children[i])
                    if(rrr){
                        bbb=true
                    }                    
                }
            }
            
            if(bbb==true)this.dragTumb(sten)
            else{
                for (var i = 0; i < sten.children.length; i++) {
                    if(sten.children[i].type=="BTBox"){
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
                    if(sten.children[i].type=="BTBox"){
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
            

            var ad=[]
            var aa=null
            //trace(">>>>>>>>>>>>>>>>>>>>>",this.parent) 
            if(this.parent==undefined)return []
            //if(this.parent.parent==undefined)return []    
           
            
            return [];
              

            let ooo= this.arrObj[this._indexW][this._indexH].obj;
            ooo.priority= this.object.priority;
            aa=menedsherMaterial.getArrOtObj(ooo.obj,idMat,intColor); 
            
            if(aa!=null){
                ad=[];                         
                for (var j = 0; j < aa.length; j++) {
                    ad[j]=aa[j];                                
                }
                ad[6]="BTBox";
                ad[8]=ooo;
                ad[9]=ooo.id;
                ad[10]=1;
                ad[11]=aa[3]*1;                
            }  
                        
            return [ad]

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
               
                self.testPodBig()
            }

            if(s=="indexW"){
                if(self.wN[p]){
                    if(self.parent!=undefined){
                        let xxxx=this.boxColizi.rectCollisMeshdy.x+this.boxColizi.rectCollisMeshdy.width/2
                        let xx=this.isWA(
                            this.parent.collision.arrRect,
                            xxxx,
                            self.wN[p],
                            this.boxColizi,
                            this.parent.collision.colozi.bigBox.width
                        )
                        
                        if(xx==false){
                            nMObj.setObject(self)                            
                            mHelp.setHelp("Данная ширина не влазит, не хватает пространства","resources/image/mhelp.png",mHelp.dCNM,{x:200,y:-13});
                            return
                        }else{
                           /* setTimeout(function() {
                                mHelp.setHelp("Тестируем большой текст Тестируем большой текст Тестируем большой текст Тестируем большой текст Тестируем большой текст Тестируем большой текст Данная ширина не влазит, не хватает пространства","resources/image/mhelp.png",mHelp.dCNM,{x:200,y:-13});
                               
                            }, 100);*/
                            this.setXY(xx,0); 
                        }
                    }

                }
                self.indexW=p 
                self.mO.par.par.visiActiv.setObject(self) 

            }
            if(s=="indexH"){
                trace(self.indexH+"_::_"+p)
                self.indexH=p  
                self.mO.par.par.visiActiv.setObject(self)               
            }

            setTimeout(function() {self.fun("visi3d");}, 10);
            self.mO.dragPriceScane()
        }


        this.funDragColor2=function(){
        
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


        /*this.setColorId = function(v){
            
            if(this.boolDinColor == false)return;            
            if(this._idColor == v)return; 
            
            this._idColor=v;
            this._material = roomBig[this.matBas]//menedsherMaterial.geterMat.getIDReturn(this._idColor,true); 
            this.dragColor();
            this.mO.dragPriceScane();
            this.fun("visi3d");
        }*/



        this.getObj = function(){
            var obj={}
            obj.type=this.type;
            obj.id=this.id;
            obj.x=self.content3d.position.x;
            obj.y=self.content3d.position.y;
            obj.pod=this.pod
                        
            obj.children=[];
            for (var i = 0; i < this.children.length; i++) {
                obj.children[i] = this.children[i].getObj();
            }
            obj.indexW=this.indexW;  
            obj.indexH=this.indexH;           
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
              
            }
            if(obj.indexW!=undefined){
                this.indexW=obj.indexW;
                this.indexH=obj.indexH;
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



    set pod(v) {
        if(this._pod!=v){
            this._pod = v;  
            
            this.fun("visi3d");      
        }           
    }   
    get pod() { return  this._pod;}  

/*
    set indexW(v) {
        if(this._indexW!=v){
            this._indexW = v;  
            this.dragIndex();     
            this.fun("visi3d"); 
            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].indexW!=undefined)this.children[i].indexW=this._indexW
            }     
        }           
    }   
    get indexW() { return  this._indexW;} 

    set indexH(v) {
        if(this._indexH!=v){
            
            this._indexH = v;  
            this.dragIndex();     
            this.fun("visi3d"); 
            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].indexH!=undefined)this.children[i].indexH=this._indexH
            }     
        }           
    }   
    get indexH() { return  this._indexH;} */

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

    set thickness(v) {
        if(this._thickness!=v){
            
            this._thickness = v;  
            this.dragWHD();     
            
        }           
    }   
    get thickness() { return  this._thickness;}


}




export class BHronTumba {
    constructor() {
        this.x=0;
        this.y=0;
        this.z=0;
        this.bool=false;
    }
}
