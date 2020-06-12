/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


передаст
*/

import { PositBatt } from './PositBatt.js';
import { KorektSten } from './KorektSten.js';

export class Stens  {
    constructor(scane2d, fun) {      
        this.type="Stens";
        var self=this;

        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";   
        
        this.fun=fun
        this.par=scane2d
        this.scane2d=scane2d
        this._active=false;
    
        this.dCont=new DCont();        

        this._width=100;
        this._height=100;
        this._index=-1;
        this._sahMenu=0;
      
        this.bl=false;

        this.array=[]
        this._wh=20;
        this.widthBig=scane2d.glaf.widthBig;
        this.otstup=scane2d.glaf.otstup;

        this.rectangle=new Rectangle(0,0,500,500);       

        this.korektSten=new KorektSten(this.scane2d.dCont,function(s,p){
            if(s=="drag"){
                self.drag();                
                if(self.par.par.dragCent3d)self.par.par.dragCent3d()
            }
            if(s=="active"){                
                self.array[0].active=this.aLine[0].active;
                self.array[1].active=this.aLine[1].active;
                self.array[2].active=this.aLine[2].active;              
                self.fun("visi3d");
            }

        })

        this.drag=function(){ 
            this.array[0].width=this.korektSten.array[0].y-this.korektSten.array[1].y
            this.array[0].y=this.array[0].width            
            this.array[1].width=this.korektSten.array[2].x-this.korektSten.array[1].x            
            this.array[2].width=this.korektSten.array[3].y-this.korektSten.array[2].y
            this.array[2].x=this.korektSten.array[2].x-this.korektSten.array[1].x 


        }    


        this.sizeWindow = function(w,h,s){        
            this._width=w;
            this._height=h;           
            
            this.korektSten.x=this._width-this.korektSten.width+1300;
            this.korektSten.y=this._height-this.korektSten.height+1400;            
        }


        this.init=function(){
            if(this.bl==true)return;
            this.bl=true;
            this.array=scane2d.glaf.scane3d.room.array;
            this.array[0].rotation=-Math.PI/2;            
            this.array[0].x=0
            this.array[0].y=this.array[0].width;

            this.array[0].sA1=2;
            this.array[0].active=false;

            this.array[2].rotation=Math.PI/2;
            this.array[2].x=this.array[2].width
            this.array[2].sA=2;
            this.array[2].active=false;

            this.array[1].sA1=2;
            this.array[1].sA=2;
            this.array[1].x=0;
            this.array[1].y=0;

            this.korektSten.testKPUp()
            this.korektSten.drag()
            
        }

        this.setOt=function(){
            this.korektSten.array[0].x=0;
            this.korektSten.array[0].y=this.array[0].width;

            this.korektSten.array[1].x=0;
            this.korektSten.array[1].y=0;

            this.korektSten.array[2].x=this.array[1].width;
            this.korektSten.array[2].y=0;

            this.korektSten.array[3].x=this.array[1].width;
            this.korektSten.array[3].y=this.array[2].width;

            this.korektSten.aText[0].active=this.korektSten.aLine[0].active=self.array[0].active;
            this.korektSten.aText[1].active=this.korektSten.aLine[1].active=self.array[1].active;
            this.korektSten.aText[2].active=this.korektSten.aLine[2].active=self.array[2].active;

            this.korektSten.testKPUp()
            this.korektSten.drag() 
                     
        }  
    }

 
    set x(v) {this.content.x = v;} get x() { return  this.content.x;}
    set y(v) {this.content.y = v;} get y() { return  this.content.y;}


    set active(value) {
        if(this._active!=value){
            this._active = value;
            this.init()           
        }
    }
    get active() { return  this._active;}


    set index(value) {
        if(this._index!=value){
            this._index = value;
            for (var i = 0; i < this.array.length; i++) {
                if(i==this._index)this.array[i].actBig=true;
                else this.array[i].actBig=false;
            }          
        }
    }
    get index() { return  this._index;}


    set sahMenu(value) {
        if(this._sahMenu!=value){
            this._sahMenu = value;
            this.sizeWindow(this._width,this._height);
        }
    }
    get sahMenu() { return  this._sahMenu;}
}
