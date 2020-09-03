
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
        trace("##########NMObj####################");
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
                trace("##################################################%%");
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
            this.vuborMat = new VuborMat(this,this.otstup,this.otstup,"resources/data/"+this.par.par.par.par.objectBase.three[2].array[2].id+"/yoriginal.png",[]/*this.par.par.par.par.objectBase.three[1]*/,function(){
             
                
               /* if(self.object&&self.object.boolDinColor&&self.object.boolDinColor==true){
                    //self.room.idMatObject = this.arrObj.array[this.index].id;//для одного
                    //self.object.setColorId(this.arrObj.array[this.index].id)


                }else{*/
                    
                    self.room[self.object.idCT] = this.arrObj.array[this.index].id;//для всех
               // }

                

            });            
            this.vuborMat.index = this.par.par.par.par.objectBase.three[1].array.length-1; 
            this.vuborMat.galeri.linkPosle= "64.png"      

        }else{
            this.arrLine[0].visible=false;
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
            
            //cмена матерьялов
            let bvm=false;

            if(this.object.object && this.object.object.info && this.object.object.info.array && this.object.object.info.array.length>0)bvm=true;
           
            if(bvm==true){
                this.vuborMat.visible=true
                this.arrLine[0].visible=true;
                this.vuborMat.setObj(this.object.object.info);            
                let p=-1;

                for (var i = 0; i < this.object.object.info.array.length; i++) {                
                    
                    if(this.object.object.info.array[i].id==this.object._idColor){
                        p=i
                        break
                    }
                }
                
                if(p!=-1)this.vuborMat.index=p

                xx=this.otstup+this._vusot*2+this._vusot*0.5     
            }else{
                this.vuborMat.visible=false
                xx=this._vusot/2;
                this.arrLine[0].visible=false;
            }

            //-----




            
            if(bColor==false) xx+=-113
            let inwH=this.butArAr.setObject(o)
            //trace("+inwH"+inwH)    
            if(inwH!=false) {
                xx+=inwH
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
            trace("%%",this.up1Menu)
            if(this.up1Menu!=undefined)this.up1Menu.setObject(o);

            //--------------
            







        }


        this.setIdMatObject=function(s){            
            var p=-1; 
             
            if(bColor==false)return
            if(!this.vuborMat.arrObj)return 
            if(!this.vuborMat.arrObj.array)return    
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
        this.dCWidth=new DCont(this.dCont);
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
            if(o.type=="BTBox"||o.type=="BTBoxDin"){}else{
                this.visible=false
                return false
            }
            this.object=o
            this.visible=true
            if(this.ab==undefined){
                this.ab=[];
                
                var a={array:[ ]};                
                for (var i = 0; i < o.wN.length; i++) {
                    a.array.push("resources/image/boxw_"+o.wN[i]+".png")
                }
                this.vuborW = new VuborMat(this,0,0,"resources/image/boxw.png",a,function(){ 
                    self.object.aaSob("indexW",this.index)                    
                });            
                this.vuborW.index = 0; 


                var a={array:[ ]};                
                for (var i = 0; i < o.hN.length; i++) {
                    a.array.push("resources/image/boxh_"+o.hN[i]+".png")
                } 
                this.vuborH = new VuborMat(this,100,0,"resources/image/boxh.png",a,function(){
                    self.object.aaSob("indexH",this.index)                    
                });            
                this.vuborH.index = 0;




                this.slider=new DSliderBig(this.dCWidth, 0,24, function(s){
                    //self.object.width=this.value;
                    self.object.aaSob("sizeWidth",this.value)   
                },"width",4,300)
                this.slider.borderRadius=12
                this.slider.label.visible=false;
                this.slider.input.visible=false;
                this.slider.width=140
                this.slider.slider.height=12
                this.slider.slider.okrug=1

               

                this.input=new DInput(this.dCWidth,0,5,"height",function(){
                    if(isNaN(this.value*0.1)==true){
                        this.value=Math.round(self.object.width*10);
                    }
                    let ww=this.value*0.1
                    if(ww<self.object.minWidth)ww=self.object.minWidth
                    if(ww>self.slider.max)ww=self.slider.max    
                    self.object.aaSob("sizeWidth",ww)                   
                })                
                dcmParam.styleInput(this.input);
                this.label1=new DLabel(this.dCWidth,this.input.width+5,10,"mm",function(){

                })
                this.label1.width=30;
                this.label1.fontSize=20;
                this.label1.fontFamily="SFUIDisplay-Light";
            }

            let sah=0;
           

            if(o.static==false){
                let oo1=self.object.getMOWH(); 
                if(oo1!=null){                    
                    this.dCWidth.visible = true;  
                    this.slider.min=self.object.minWidth               
                    this.slider.max=Math.floor(oo1.w);
                                                  
                    this.slider.value=self.object.width;
                    this.input.text=self.object.width+"0"                
                    sah+=140;
                }else{
                    this.dCWidth.visible=false;
                }
                this.vuborW.visible=false; 
            }else{
                this.dCWidth.visible=false;

                this.vuborW.visible=true;
                this.vuborW.index = self.object.indexW; 
                sah+=this.vuborW.width;
            }


            let b2=false;
            if(this.object.indexH!=undefined){
                if(this.object.hN.length>1){
                    b2=true
                }
            }

            if(b2==true){
                this.vuborH.visible = true;
                this.vuborH.index = self.object.indexH; 
                this.vuborH.dCont.x=sah
                sah+=this.vuborH.width;

            }else{
                this.vuborH.visible = false;
                
            }   

       

            return sah

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
            trace("%%%%",o)
            if(o.pppObj)
            if(o.pppObj.up1.active==true){
                if(this.object &&this.object.idArr==o.idArr)return
                this.object=o;  
                trace("%%>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",main.localStorage.object.up1.sahTime)               
                if(main.localStorage.object.up1==undefined){
                    main.localStorage.object.up1={}
                    main.localStorage.object.up1.sahTime=5
                }
                if(main.localStorage.object.up1.sahTime<=0)return


                main.localStorage.object.up1.sahTime--;
                main.localStorage.save();
                
                trace("%%%%!!!",o)
                self.par.par.par.mHelp.setHelp(
                    "Выберите нужный вариант установки корзины: на раму или на телескопические направляющие.",
                    "resources/image/mhelp.png",
                    this.par.dCont,
                    {x:150,y:-3}
                );
               /* self.par.par.par.mHelp.setIframe(
                    main.glaf.up1Obj.link,
                    main.glaf.up1Obj.width,
                    main.glaf.up1Obj.height,
                    self.par.dCont,
                    {x:135-(main.glaf.up1Obj.width/2),y:-13-(main.glaf.up1Obj.height)}
                );*/


            }             
        }

    }
}


