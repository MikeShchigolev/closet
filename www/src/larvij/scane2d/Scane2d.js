/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


главный передаст, на управления стенами
пс изночально планировалось кучи методов сюда пигнуть по факту счас тупо подложка

*/



import { MunuStart } from './MunuStart.js';
import { Stens } from './Stens.js';

import { DBKS,DBKSLine,BoxLXZ } from './DBKS.js';


export class Scane2d  {
  	constructor(glaf, fun) {  		
  		this.type="Scane2d";
  		var self=this;

        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";   
        
        this.glaf=glaf
        this.par=glaf
  		this._width=100;
		this._height=100;
        this.actBool=false;

        this.dC=new DCont(glaf.dCont);
  		this.dCont=new DCont(this.dC);
    
        this.label=new DLabel(this.dCont,0,50,"РАЗМЕРЫ ПОМЕЩЕНИЯ")
        this.label.width=240;        
        this.label.fontFamily="SFUIDisplay-Light"
        this.label.fontSize=20;


        this.stens=new Stens(this, function(type, param){
            fun(type, param)
  		});
  		this.stens.active = true; 
        this.sliderHHH=new SliderHHH(this, function(type, param){
            fun(type, param)
        });
        this.help2=new DHelp2(this)

          

        this.button=new DButton(this.dCont,100,100,"OK",function(){            
            self.par.scane3d.bactive=true;
            self.par.menuDiv.mHelp.testStartHelp()
        });   
        this.button.height=32
        this.button.object.style.borderRadius=this.button.height/2+"px";
        this.button.object.style.fontFamily="SFUIDisplay-Light";
        this.button.fontSize=20;
        this.button.colorText="#000000";
        this.button.color="#ffffff";        

        
        this.tween = new TWEEN.Tween(this.dC);
        this.tween.onComplete(function(){           
            if(self.actBool==true) self.dC.visible=false
        })

        this.boolMenuActiv=false;

        this.menuActiv=function(bool, time){  
            this.boolMenuActiv=bool;           
            this.tween.stop();   
            this.actBool=bool;
            this.dC.visible=true
            if(this.actBool==true){
                this.dC.alpha=1;
                this.tween.to({alpha:0},time).start();
                this.help2.stopTween()
            }else{
                this.tween.to({alpha:1},time).start();
                this.help2.testStartHelp()
            }
        }


        this.fun_rotationZ = function () {
            this.help2.sizeWindow();
            setTimeout(function() {
                self.help2.sizeWindow();
            }, 10);
        }
        
        
  		this.sizeWindow = function(w,h,s){
            self._width=w;
			self._height=h;
            this.stens.sizeWindow(w,h,s)
            this.sliderHHH.sizeWindow(w,h,s)
            this.label.x=(w/s-this.label.width)/2
            this.button.x=(w/s-this.button.width)/2
            this.button.y=h/s-50;
            this.help2.sizeWindow(w,h,s); 
  		}  			
  	}
}








export class DHelp2  {
    constructor(par, fun) {        
        this.type="DHelp2";
        var self=this;
        this.par=par;

        this.dCont=new DCont(par.dCont);
        this.array=[]

        this.act=false;
        var aGlaf=this.par.par;

        this.load=function(){
            this.width=this.picWidth;
            this.height=this.picHeight;
            self.sizeWindow()
        }

        this.colorS=aGlaf.visi3D.utility.sky.color;
        this.colorF="#525253";
        this.tween2=undefined
        var oC1 = new THREE.Color(this.colorS);       
        var oC2 = new THREE.Color(this.colorF);
        this.tween2

        this.md=function(e){
            self.tween1 = new TWEEN.Tween(self.dCont);
            self.tween1.onComplete(function(){          
                if(self.dCont.parent)self.dCont.parent.remove(self.dCont)
                self.act=false;
                aGlaf.visi3D.intRend=1;
            })
            //aGlaf.visi3D.utility.sky.color=self.colorS;
            //aGlaf.visi3D.intRend=1
            var oC=aGlaf.visi3D.utility.sky.material.color
            var oo={p:0}
            self.tween2 = new TWEEN.Tween(oo);
            self.tween2.onComplete(function(){          
                
            })

            self.tween2.onUpdate(function(){  
                oC.r=oC1.r*(oo.p)+oC2.r*(1-oo.p)
                oC.g=oC1.g*(oo.p)+oC2.g*(1-oo.p)
                oC.b=oC1.b*(oo.p)+oC2.b*(1-oo.p)                
                aGlaf.visi3D.intRend=1;
            }) 

            self.tween1.to({alpha:0.0},1000).start();
            self.tween2.to({p:1},1000).start();
            if(dcmParam.mobile==false){                 
                document.removeEventListener("mousedown", self.md);
            }else{                  
                document.removeEventListener("touchstart", self.md);                
            }
        }

        this.stopTween=function(){
            if(this.tween2!=undefined){
                this.tween2.stop()
            }
        }

        var ppll=0
        var tw
        this.init=function(){ 
            if(ppll!=0)return
            ppll++    
            aGlaf.par.localStorage.object.help2++;
            aGlaf.par.localStorage.save()


            if(aGlaf.par.localStorage.object.help2>5)return

            this.act=true
            this.dCont.alpha=0
            tw = new TWEEN.Tween(this.dCont);           
            tw.to({alpha:1},500).start();
            aGlaf.visi3D.utility.sky.color=oC2
            for (var i = 0; i < 4; i++) {
                this.array[i]=new DImage(this.dCont,0,0,"resources/image/h"+(i+6)+".png",this.load)
            }
            if(dcmParam.mobile==false){                 
                document.addEventListener("mousedown", self.md);
            }else{                  
                document.addEventListener("touchstart", self.md);               
            }


            self.sizeWindow()

            setTimeout(function(){
                self.sizeWindow()                
            },500)
            setTimeout(function(){
                self.sizeWindow()                
            },1000)
            setTimeout(function(){
                self.sizeWindow() 
            },1500)
        } 


        this.w=100;
        this.h=100;
        this.s=1;
        this.sizeWindow = function(w,h,s){              
            if(w){
                this.w=w
                this.h=h
                this.s=s
            }
            if(this.act==false){
                return;
            }

            if(this.array.length==0)return                       

            this.array[0].x=this.par.par.scane3d.room.array[2].butDrag.input.x-50;
            this.array[0].y=this.par.par.scane3d.room.array[2].butDrag.input.y-this.array[0].height/2;   

            this.array[1].x=this.par.par.scane3d.room.array[1].butDrag.input.x-this.array[1].width;
            this.array[1].y=this.par.par.scane3d.room.array[1].butDrag.input.y-this.array[1].height-24;             


            this.array[2].x=this.par.par.scane3d.room.array[0].butDrag.input.x-this.array[2].width+80;
            this.array[2].y=this.par.par.scane3d.room.array[1].butDrag.input.y-(this.par.par.scane3d.room.array[1].butDrag.input.y-this.par.par.scane3d.room.array[2].butDrag.input.y)*2-32;   


            this.array[3].x=this.par.sliderHHH.dCont.x+80;
            this.array[3].y=this.par.sliderHHH.dCont.y-this.array[3].height;
        }


        this.testStartHelp=function(){
            var b=false;            
            if(aGlaf.par.localStorage.object.help==undefined){                
                aGlaf.par.localStorage.object.help2=0;               
            }           
            this.init();
            
        }
    }
}








export class SliderHHH  {
    constructor(glaf, fun) {        
        this.type="SliderHHH";
        var self=this;

        this.glaf=glaf
        this.par=glaf
        this._width=5;
        this._height=100;
        this._value=2751
        this.dCont=new DCont(glaf.dCont);

        this.scale=1
       /* this.slider=new DSliderBig(this.dCont,-200,-200,function(){
            self.par.par.scane3d.room.height=Math.round(this.value/10)
        },"Высота стены",2000,5000)


        this.slider.width=200;
        this.slider.okrug=1;//2750
        this.slider.value=2750;*/


        this.min=2000;
        this.max=5000;
        this.mm=this.max-this.min;

        this.label=new DLabel(this.dCont,-60,-32,"H")
        this.label.width=15;
        this.label.height=this._height;
        this.label.fontFamily="SFUIDisplay-Light"


        var line=new DBKSLine(this.dCont,function(){

        })
        line.height=this._height;
        //line.width=this._width;

        var line1=new DBKSLine(this.dCont,function(){
            
        })
        line1.height=this._height;
        //line1.width=this._width;
        line1.active=true




        var input = new BoxLXZ(this.dCont,function(){
            self.value=this.value
            self.dragV() 
        })
        input.dCont.y=-20;
        input.active=true;
        input.input.timeFun=null;
        input.funFocus=function(){
            if(this.actBig==false){               
                if(this.input.object.value!=this.value)this.input.object.value=this.value            
            }
        }

        var ppo,vvv
        var SY=0
        var point=new DBKS(this.dCont,function(tip,_xx,_yy){
            
            if(tip=="start")SY = line1.dCont.y * self.scale 
            if(_yy) {
                ppo = ((_yy+SY)/self.scale)/self._height;            
                vvv=ppo*self.mm+self.min
                self.value=vvv
                self.dragV() 
            }   
            
        })

        point.dCont.visible=line.dCont.visible=line1.dCont.visible=false

        this.setPrisent = function(p){           
            var pp=p
            if(pp>1)pp=1
            if(pp<0)pp=0    
            line1.dCont.y=this._height*(pp)
            line1.height=this._height-line1.dCont.y
            point.dCont.y=line1.dCont.y-3
            input.value=this._value/10; 
        }


        this.dragV = function(){ 
            self.par.par.scane3d.room.height=Math.round(this.value/10)
            this.value=self.par.par.scane3d.room.height*10
        } 


        this.sizeWindow = function(w,h,s){                  
            /*self._width=w;
            self._height=h;*/
            this.scale=s
            this.dCont.x=(w/s)/2;
            this.dCont.y=h/s-60;            
        }

        this.value = 2750;
    }


    set value(v) {
        if(this._value!= v){
            this._value= v;

            if(this._value<this.min)this._value=this.min
            if(this._value>this.max)this._value=this.max 
            this._value=Math.round(this._value)     
            var ppp=(this._value-this.min)/this.mm                      
            this.setPrisent(ppp)
                      
        }
        
    } 
    get value() { return  this._value;}
}
