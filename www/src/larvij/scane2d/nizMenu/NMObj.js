
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

менюха с низу


*/

import { DWindowS, VuborMat, GaleriLitel, DButSim } from '../Zapshsti.js';
import { DragWHXZ } from './DragWHXZ.js';
import { BatArr } from './BatArr.js';

//оброботка обьекта
export class NMObj  {
    constructor(par) {          
        this.type="NMObj";
        var self=this;
        this.par=par
        this._active=false;
        this.dCont=new DCont();
        this.mani=this.par.par.mani
        this.room=this.par.par.par.scane3d.room;

        this._width=200
        this.widthBig=this.par.widthBig;
        this.otstup=this.par.otstup;
        this._sahMenu=this.par._sahMenu;
        this._vusot=this.par._vusot;

        this.panel = new DPanel(this.dCont,0,0);
        this.panel.height=this._vusot+this.otstup*1.7;  
        this.panel.width=  this._width   
        this.panel.div.style.borderRadius = this._vusot+"px";

        this.up1Menu=undefined;

        window.nMObj=this
        
        setTimeout(function() {
           if(main.glaf.up1 == true){//Включена смена 55 up1
                self.up1Menu=new Up1Menu(self)
            } 
        }, 10);
        

        var ot=this.otstup;
        var xx=ot
        this.arrLine=[];

        var bColor=true//
        if(this.par.par.par.par.objectBase.three[1].array.length<=1)bColor=false


        for (var i = 0; i < 2; i++) {
            this.arrLine[i]=new DImage(this.dCont,0, this.otstup,"resources/image/x13.png",function(){
                this.width=this.picWidth; // реальные размеры картинки
                this.height=this.picHeight;
            });
        }


        if(bColor==true){
            this.vuborMat = new VuborMat(this,this.otstup,this.otstup,"resources/data/"+this.par.par.par.par.objectBase.three[2].array[2].id+"/yoriginal.png",this.par.par.par.par.objectBase.three[1],function(){
                trace("this.arrObj.array[this.index].id    ",this.arrObj.array[this.index].id)
                self.room.idMatObject = this.arrObj.array[this.index].id;
            });            
            this.vuborMat.index = this.par.par.par.par.objectBase.three[1].array.length-1;        

        }else{
            this.arrLine[0].visible=false
        }


        this.dragWHXZ=new DragWHXZ(this,0,this.otstup+6,function(){

        })

        this.butArAr=new ButArAr(this);


        this.batArr=new BatArr(this,0,this.otstup,function(t,s){            
            if(t=="polka"){//не можем поставить полку
                self.par.par.mHelp.setHelp("В данном положении полки, установка перекладины невозможна","resources/image/mhelp.png",this.dCont,{x:24,y:-13});
            
            }
            if(t=="saveMod"){//не можем поставить полку
                self.room.par.tudaSuda.saveMod();
            }
        })

        this.clear=function(){
            this.dragWHXZ.dCont.visible=false;
            this.arrLine[1].visible=false
        }    

        var xx
        this.object=undefined
        this.setObject=function(o){
            this.object=o;
            this.clear()
            
            this.arrLine[0].x=this.otstup+this._vusot*2-this._vusot*0.25

            
            

            xx=this.otstup+this._vusot*2+this._vusot*0.5 
            if(bColor==false) xx+=-113

            if(this.butArAr.setObject(o)==true) {
                xx+=200
            }   

            if(this.object.type=="BDoor"||this.object.type=="BWindow"){
                this.dragWHXZ.setObject(this.object);
                this.dragWHXZ.dCont.visible=true;
                this.dragWHXZ.dCont.x=xx;
                xx+=this.dragWHXZ.width;
                this.arrLine[1].visible=true;
                this.arrLine[1].x=xx-this._vusot*0.25;
                xx+=this._vusot*0.5;
            }
            this.batArr.setObject(o);
            this.batArr.dCont.x=xx;
            xx+= this.batArr.width;
            this.width=xx+this.otstup;

            if(this.up1Menu!=undefined)this.up1Menu.setObject(o);
        }


        this.setIdMatObject=function(s){            
            var p=-1;     
            if(bColor==false)return
            for (var i = 0; i < this.vuborMat.arrObj.array.length; i++) {               
                if(this.vuborMat.arrObj.array[i].id==s)p=i
            }
            this.vuborMat.index=p;
        }


        this.wPan=100
        this.sizeWidth=function(w){
            this.wPan=w;
            if(this.wPan>this.width){
                this.dCont.y=0;
                this.dCont.scale=1
                this.dCont.x=(this.wPan-this.width)/2
            }else{
                this.dCont.y=0;
                this.dCont.scale=this.wPan/this.width
                this.dCont.x=0
            }            
        }

        var b
        this.keydown=function(e){           
            if(e.keyCode==46||e.keyCode==8){
                if(self._active==true){
                    b=false
                    if(document.activeElement.style!=undefined){
                        if(document.activeElement.style.height!=undefined){
                            
                            if(document.activeElement.style.height!=""){
                                b=true;
                            }
                        }
                    }
                    
                    if(b==false){
                        if(self.object!=undefined){
                            if(self.object.aa!=undefined){
                                for (var i = 0; i < self.object.aa.length; i++) {                                    
                                    if(self.object.aa[i]=="clear"){
                                        self.object.aaSob("clear") 
                                        return;  
                                    }
                                }
                            }
                        }
                    }
                }
            }                     
        }
        window.addEventListener( 'keydown', this.keydown );
    }

    set active(v) {
        if(this._active!=v){
            this._active = v;           
            if(this._active==true){
                this.par.dCont.add(this.dCont)                
            }else{
                this.par.dCont.remove(this.dCont)               
            } 
        }
    }
    get active() { return  this._active;}


    set width(v) {
        if(this._width!=v){
            this._width = v;   
            this.panel.width=this._width;
            
        }
    }
    get width() { return  this._width;} 
}


export class ButArAr  {
    constructor(par) {   
        var self=this       
        this.type="ButArAr";
        this.par=par
        this._visible=false;
        this.ab
        this.ab1
        global.butArAr=this

        this.dCont=new DCont(this.par.dCont);
        this.dCont.visible=false;
        this.object=undefined
        this.dCont.y=10
        this.dCont.x=122
        this._vusot=this.par._vusot;
        this.vuborW

        this.down=function(){
            self.object[this.name]=this.idArr
        }

        this.setObject=function(o){
            if(o.type!="BTBox"){
                this.visible=false
                return false
            }
            this.object=o
            this.visible=true
            if(this.ab==undefined){
                this.ab=[];

                let a={array:[ ]};                
                for (var i = 0; i < o.wN.length; i++) {
                    a.array.push("resources/image/boxw_"+o.wN[i]+".png")
                }
                this.vuborW = new VuborMat(this,0,0,"resources/image/boxw.png",a,function(){     
                    trace(this.index)
                    //self.object.indexW=this.index
                    //batArrGlobal.setObject(self.object)
                    self.object.aaSob("indexW",this.index) 
                    //self.setObject(self.object)
                });            
                this.vuborW.index = 0; 


                a={array:[ ]};                
                for (var i = 0; i < o.hN.length; i++) {
                    a.array.push("resources/image/boxh_"+o.hN[i]+".png")
                } 
                this.vuborH = new VuborMat(this,100,0,"resources/image/boxh.png",a,function(){     
                    //self.object.indexH=this.index
                    self.object.aaSob("indexH",this.index) 
                    //self.setObject(self.object)
                });            
                this.vuborH.index = 0; 

            }


            this.vuborW.index = self.object.indexW; 
            this.vuborH.index = self.object.indexH; 

            return true

        }
    }

    set visible(v) {
        if(this._visible!=v){
            this._visible = v;   
            this.dCont.visible=this._visible;            
        }
    }
    get visible() { return  this._visible;}   
}



export class Up1Menu  {
    constructor(par) {   
        var self=this       
        this.type="Up1Menu";
        this.object=undefined;
        this.par=par
        this.setObject=function(o){
            if(o.pppObj)
            if(o.pppObj.up1.active==true){
                this.object=o;                 
                if(main.localStorage.object.up1==undefined){
                    main.localStorage.object.up1={}
                    main.localStorage.object.up1.sahTime=main.glaf.up1Obj.sahTime
                }
                if(main.localStorage.object.up1.sahTime<=0)return


                main.localStorage.object.up1.sahTime--;
                main.localStorage.save();

                self.par.par.par.mHelp.setIframe(
                    main.glaf.up1Obj.link,
                    main.glaf.up1Obj.width,
                    main.glaf.up1Obj.height,
                    self.par.dCont,
                    {x:135-(main.glaf.up1Obj.width/2),y:-13-(main.glaf.up1Obj.height)}
                );
            }            
        }

    }
}


