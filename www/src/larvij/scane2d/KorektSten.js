/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

Управление драгерами стен
*/

import { DBKS,DBKSLine,BoxLXZ } from './DBKS.js';

export class KorektSten  {
    constructor(dCont, fun) {      
        this.type="KorektSten";
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";   
        
        var self=this;     
        this.fun=fun;
        this._active=false;
     
        this.dCont=new DCont(dCont);
        this.dCZ=new DCont(this.dCont);
        this.dCPod=new DCont(this.dCZ);
        this._width=100;
        this._height=100;
        this._x=0;
        this._y=0;
        this._min=70;
        this._max=700;
        var startWH = 300; 
        this._scale=1;
        this._sss=1;
       
        //массив основных позиций
        this.array=[new Position(0,startWH),new Position(0,0),new Position(startWH,0),new Position(startWH,startWH)];
        this.aLine=[new DBKSLine(this.dCZ),new DBKSLine(this.dCZ),new DBKSLine(this.dCZ)];
        this.aPont=[new DBKS(this.dCZ),new DBKS(this.dCZ),new DBKS(this.dCZ),new DBKS(this.dCZ)];
        this.aText=[new BoxLXZ(this.dCZ),new BoxLXZ(this.dCZ),new BoxLXZ(this.dCZ)];
        
        this.arrMin=[70,70,70] 

        var r,dist
        this.chengPThis=function(tip,_xx,_yy,idArr){
            if(idArr==undefined)idArr=this.idArr
            self.chengPoint(tip,_xx/self._scale,_yy/self._scale)
            if(tip=="up"){                
                if(this.type=="DBKSLine"){                    
                    if(Math.abs(this.xx)<1)if(Math.abs(this.yy)<1){                         
                        if(idArr!=1){
                            self.cPTUP(idArr)                            
                        }                        
                    }
                }
            }
        }

        this.cPTUP=function(idArr){
            self.aText[idArr].active=self.aLine[idArr].active= !self.aLine[idArr].active
            self.fun("active");
        }

        this.dragMin=undefined        
        this.chengPoint=function(tip,xx,yy){ 
            trace(tip,xx,yy)         
            if(tip=="start"){                
                if(this.dragMin!=undefined)this.dragMin(this.arrMin);
                for (var i = 0; i < this.array.length; i++) { 
                    this.array[i].xx=this.array[i].x*1
                    this.array[i].yy=this.array[i].y*1
                }                
                return;
            }

            if(tip=="up"){
                this.testKPUp()
                this.drag()                
                return;
            }

            if(tip=="p0"){           
                this.array[0].y=this.array[0].yy+yy;                
            }
            if(tip=="p3"){                              
                this.array[3].y=this.array[3].yy+yy;               
            }
            if(tip=="p1"){  
                this.array[0].x=this.array[1].x=this.array[1].xx+xx;                            
            }
            if(tip=="p11"){  
                this.array[1].y=this.array[1].yy+yy;                            
            }  
            if(tip=="p2"){  
                this.array[2].x=this.array[3].x=this.array[2].xx+xx;                            
            }
            this.drag();
        }

         
        this.testKorektPoint=function(tip,xx,yy){           
            //p11  
            if(this.array[1].y!=0) {                   
                dist=-(this.array[1].y-this.array[0].y);           
                if(dist<this._min)dist=this._min;
                
                if(dist<this.arrMin[0])dist=this.arrMin[0];
                
                if(dist>this._max)dist=this._max;
                this.array[1].y= this.array[2].y=this.array[0].y-dist

                //p11//2
                dist=-(this.array[1].y-this.array[3].y);           
                if(dist<this._min)dist=this._min;
                if(dist<this.arrMin[2])dist=this.arrMin[2];
                if(dist>this._max)dist=this._max;
                this.array[1].y= this.array[2].y=this.array[3].y-dist
            } 

            //p0
            dist=-(this.array[1].y-this.array[0].y);
            
            if(dist<this._min)dist=this._min;
            if(dist<this.arrMin[0])dist=this.arrMin[0];
            if(dist>this._max)dist=this._max;
            this.array[0].y= this.array[1].y+dist           

            //p1
            if(this.array[1].x!=0){
                dist=this.array[2].x-this.array[1].x;
                if(dist<this._min)dist=this._min;
                if(dist<this.arrMin[1])dist=this.arrMin[1];
                if(dist>this._max)dist=this._max;
                this.array[0].x=this.array[1].x= this.array[2].x-dist
            }

            trace("this.arrMin[1]  ",this.arrMin[1])
            //p2
            dist=this.array[2].x-this.array[1].x;            
            if(dist<this._min)dist=this._min;
            if(dist<this.arrMin[1])dist=this.arrMin[1];
            if(dist>this._max)dist=this._max;
            this.array[2].x=this.array[3].x= this.array[1].x+dist
             
            //p3            
            dist=-(this.array[2].y-this.array[3].y);
            if(dist<this._min)dist=this._min;
            if(dist<this.arrMin[2])dist=this.arrMin[2];
            if(dist>this._max)dist=this._max;
            this.array[3].y= this.array[2].y+dist
            dist=this.array[1].x-this.array[0].x;
        }


        var xx,yy, ss
        this.testKPUp=function(){ 
            xx=this.array[1].x;
            yy=this.array[1].y;
            for (var i = 0; i < this.array.length; i++) { 
                this.array[i].x=this.array[i].x-xx;
                this.array[i].y=this.array[i].y-yy;
            }
            
            xx=this.array[2].x
            yy=this.array[0].y
            if(yy<this.array[3].y)yy=this.array[3].y      
        }


        this.chengeLabel=function(s,p,idArr){            
            if(s=="drag"){
                if(idArr==undefined)idArr=this.idArr
                if(isNaN(p)==false){
                    self.chengPoint("start")
                    if(idArr==0)self.array[0].y=p;
                    if(idArr==1)self.array[2].x=self.array[3].x=p;
                    if(idArr==2)self.array[3].y=p;
                }
                self.testKPUp()
                self.drag();
            }
        }


        for (var i = 0; i < this.aPont.length; i++) {
            this.aPont[i].fun=this.chengPThis;
            this.aPont[i].idArr=i;
            if(this.aLine[i]){
                this.aLine[i].fun=this.chengPThis;
                this.aLine[i].idArr=i;

                this.aText[i].fun=this.chengeLabel;
                this.aText[i].idArr=i;
            }
        }


        this.aPont[0].tipDrag=["p0","p1"];
        this.aPont[1].tipDrag=["p1"/*,"p11"*/];
        this.aPont[2].tipDrag=["p2"/*,"p11"*/];
        this.aPont[3].tipDrag=["p3","p2"];

        this.aLine[0].tipDrag=["p1"];
        this.aLine[1].tipDrag=["p11"];
        this.aLine[2].tipDrag=["p2"];

        this.aText[1].active=this.aLine[1].active=true;

        
        //растовляет приметивы на свои позиции
        this.drag=function(){
            this.testKorektPoint();
            for (var i = 0; i < this.array.length; i++) {                
                this.aPont[i].x=this.array[i].x*this._scale;
                this.aPont[i].y=this.array[i].y*this._scale;                
            }
            //линии
            this.aLine[0].x=this.array[1].x*this._scale;
            this.aLine[0].y=this.array[1].y*this._scale;
            this.aLine[0].height=(this.array[0].y-this.array[1].y)*this._scale;
            
            this.aLine[1].x=this.array[1].x*this._scale;
            this.aLine[1].y=this.array[1].y*this._scale;
            this.aLine[1].width=-(this.array[1].x-this.array[2].x)*this._scale;

            this.aLine[2].x=this.array[2].x*this._scale;
            this.aLine[2].y=this.array[2].y*this._scale;
            this.aLine[2].height=-(this.array[2].y-this.array[3].y)*this._scale;

            //текст
            this.aText[0].x=this.array[1].x*this._scale-75;            
            this.aText[0].y=(this.array[1].y-(this.array[1].y-this.array[0].y)/2)*this._scale;
            this.aText[0].value=(this.array[0].y-this.array[1].y);
            
            this.aText[1].x=(this.array[1].x+(this.array[2].x-this.array[1].x)/2)*this._scale;            
            this.aText[1].y=this.array[1].y*this._scale-20;
            this.aText[1].value=(this.array[2].x-this.array[1].x);

            this.aText[2].x=this.array[2].x*this._scale+50;             
            this.aText[2].y=(this.array[2].y-(this.array[2].y-this.array[3].y)/2)*this._scale;
            this.aText[2].value=(this.array[3].y-this.array[2].y);

            this.fun("drag");
            
        }


        this.sizeWindow = function(w,h,s){
            this.sss=s;
            this.x=(w/s-this.width)/2;
            this.y=(h/s-this.height)/2;        
        }


        this.mousemoveBig = function(e){            
            for (var i = 0; i < this.aLine.length; i++) {
                this.aLine[i].mousemoveBig(e)                
            }
            for (var i = 0; i < this.aPont.length; i++) {
                this.aPont[i].mousemoveBig(e)                
            } 
        }
    }

    set width(v) {
        if(this._width != v){
            this._width = v;
            this.drag();
        }        
    } 
    get width() { return  this._width;}



    set height(v) {
        if(this._height != v){
            this._height = v;
            this.drag();
        }        
    } 
    get height() { return  this._height;}

   
    set sss(v) {
        if(this._sss != v){
            this._sss = v;
            for (var i = 0; i < this.aPont.length; i++) this.aPont[i].sss=v;
            for (var i = 0; i < this.aLine.length; i++) this.aLine[i].sss=v;           
        }
        
    } 
    get sss() { return  this._sss;}


    set x(v) {
        this.dCont.x = v;
    } 
    get x() { return  this.content.x;}

    
    set y(v) {
        this.dCont.y = v;
    } 
    get y() { return  this.content.y;}
}


export class PlusVisi  {
    constructor(par) {      
        this.type="PlusVisi";
        var self=this;
        this.par=par;
        this.otstup=10

        this.dC=new DCont(this.par.dCPod);
        this.dCont=new DCont(this.dC);  
       
        this.canvas = document.createElement('canvas'); 
        this.canvas.width= 400
        this.canvas.height= 400
        this.ctx = this.canvas.getContext('2d');    
        var  ctx=   this.ctx      
        this.dCont.div.appendChild(this.canvas);
        this.mH=20
        this.mW=20

        var rH,rW,ww,hh;        
        //растовляет приметивы на свои позиции
        this.drag=function(){
            this.dCont.x=this.par.aLine[0].x;
            this.dCont.y=this.par.aLine[1].y;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
            this.ctx.beginPath();
            rH=this.mH;
            rW=this.mW;
            ww=this.par.aLine[2].x-this.par.aLine[0].x-rW*2
            hh=this.par.aLine[0].height
            if(hh<this.par.aLine[2].height)  hh=this.par.aLine[2].height  
            hh=hh-rH*2  
           
            this.drawRect(this.mW,this.mH, this.mW+ww,this.mH, this.mW+ww,this.mH+hh, this.mW,this.mH+hh, "#000000","#ffffff")

            this.drawRect(
                0,0, 
                ww+rW*2,0, 
                ww+rW,rH, 
                rW,rH, 
                "#000000","#666666"
            )

            this.drawRect(
                0,0, 
                rW,rH, 
                rW,rH+this.par.aLine[0].height-this.mH*2, 
                0,this.par.aLine[0].height, 
                "#000000","#666666"
            )

            this.drawRect(
                ww+rW*2,0, 
                ww+rW*2,this.par.aLine[2].height, 
                ww+rW,this.par.aLine[2].height-this.mH, 
                ww+rW,this.mH, 
                "#000000","#666666"
            )
        }

        this.drawRect=function(x,y,x1,y1,x2,y2,x3,y3,cl,cf){           
            ctx.beginPath();
            ctx.fillStyle = cf; 
            ctx.moveTo(x, y);           
            ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.lineTo(x, y);
            ctx.fill();

            //ctx.beginPath();
            ctx.strokeStyle = cl;
            ctx.fillStyle = cl;
            ctx.lineWidth = 1;
            ctx.moveTo(x, y);           
            ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}




