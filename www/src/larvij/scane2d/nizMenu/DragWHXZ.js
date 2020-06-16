
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

менюха с низу


*/

import { DWindowS, VuborMat, GaleriLitel, DButSim } from '../Zapshsti.js';


export class DragWHXZ  {
    constructor(par,x,y,fun) {          
        this.type="DragWHXZ";
        var self=this;
        this.par=par
        this.fun=fun;   
        this._index=-1;    
        this.dCont=new DCont(this.par.dCont);
        this.dCont.x=x;
        this.dCont.y=y;
        this.sizeFont=20
        this._width=300;

        this.input=new DInput(this.dCont,0,0,"width",function(){ 
            if(isNaN(this.value*0.1)==true)this.value=Math.round(self.object.width*10)
            self.object[this.name]=this.value*0.1 
            this.value=Math.round(self.object[this.name]*10)
            self.par.par.par.par.scane3d.room.visiActiv.setObject(self.object, false)

        })
        this.input.name="width";        
        dcmParam.styleInput(this.input)        

        this.input1=new DInput(this.dCont,0,0,"height",function(){
            if(isNaN(this.value*0.1)==true)this.value=Math.round(self.object.height*10)
            self.object[this.name]=this.value*0.1; 
            this.value=Math.round(self.object[this.name]*10)
            self.par.par.par.par.scane3d.room.visiActiv.setObject(self.object, false);
        })
        this.input1.name="height"; 
        dcmParam.styleInput(this.input1);

        this.label=new DLabel(this.dCont,0,(this.input.height-this.sizeFont)/2-2,"x",function(){

        })
        this.label.width=20
        this.label.fontSize=this.sizeFont;
        this.label.fontFamily="SFUIDisplay-Light";

        this.label1=new DLabel(this.dCont,0,(this.input.height-this.sizeFont)/2-2,"mm",function(){

        })
        this.label1.width=30;
        this.label1.fontSize=this.sizeFont;
        this.label1.fontFamily="SFUIDisplay-Light";    

        this.object=undefined;
        this.setObject=function(o){
            this.object=o;
            this.input.value=Math.round(this.object.width*10);
            this.input1.value=Math.round(this.object.height*10);            
        }

        var p
        this.drag=function(){
            p=(this.width-this.label.width-this.label1.width)/2-4;
            this.input1.width=this.input.width=p
            this.label.x=this.input.width+5
            this.input1.x=this.input.width+this.label.width
            this.label1.x=this.input1.x+this.input1.width+5
        }
        this.drag()
    }

    set width(v) {
        if(this._width!=v){
            this._width = v; 
            this.drag()
        }
    }
    get width() { return  this._width;} 
}

