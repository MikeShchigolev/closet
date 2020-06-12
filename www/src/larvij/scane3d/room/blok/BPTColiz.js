
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


дополнительные колизии
*/

import { RectCollis } from '../collision/CollisionRect.js';



export class BPTColiz{
    constructor(par, fun) {       
        this.type = "BPTColiz";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.par=par;
        this.idRandom=Math.random();

        this._depth=100
        var boki;
        this.array=[];
        var sah
        var arr,p,p1
        this.redrag=function(){
            sah=0;    
            arr=this.par.visiNisu.array
            p=undefined
            p1=undefined       
            for (var i = 0; i < arr.length; i++) {
                if(arr[i].visible==true){
                    if(p==undefined){
                        p=arr[i];
                    }else{
                        p1=arr[i];
                        this.korectBox(p, p1)
                        p=arr[i];
                    }
                }
            }
            
            if(sah<this.array.length){
                for (var i = this.array.length-1; i >= sah; i--) {                    
                    if(this.array[i]._parent!=undefined){
                        this.array[i]._parent.remove(this.array[i])
                        this.array[i].clearBig();
                        this.array.splice(i,1)                       
                    }
                }                
            }
        }


        //полная очистка колизий
        this.clearBig=function(){            
            for (var i = this.array.length-1; i >= 0; i--) {
                if(this.array[i]._parent!=undefined){
                    this.array[i]._parent.remove(this.array[i])
                    this.array[i].clearBig();
                    this.array.splice(i,1)   
                }
            }            
        }


        var otX=1.3
        var hh,ww;
        var b
        this.korectBox=function(r,r1){

            if(this.array[sah]==undefined){
                this.array[sah] = new Boki(this)
                this.array[sah].idArr=sah;                  
            }
            boki=this.array[sah]

            //подгтняем вертикаль
            hh=r._height;
            if(hh>r1._height)hh=r1._height;            
            hh+=yypp
            if(hh!=boki.boxColizi.rectCollisMeshdy.height){
                boki.boxColizi.y=-hh/2;
                boki.boxColizi.sy=-hh/2;
                boki.boxColizi.height=hh 
                boki.boxColizi.rectCollisMeshdy.height=hh;
                boki.boxColizi.rectCollisMeshdy.y=this.par.boxColizi.position.y-hh+yypp
                boki.yy=hh/2;
            }
            
            ww=r1.x-r.x+otX*2
            var rrr=-1.5
            b=false;
            if(ww!=boki.boxColizi.rectCollisMeshdy.width)b=true
            if(boki.boxColizi.rectCollisMeshdy.x!=this.par.x+r.x-otX)b=true    
            if(b==true){                
                boki.boxColizi.x= -ww/2;
                boki.boxColizi.sx=-ww/2;
                boki.boxColizi.width=ww 
                boki.boxColizi.rectCollisMeshdy.width=ww;
                boki.boxColizi.rectCollisMeshdy.x=this.par.x+r.x+rrr;                
            }
            boki.xx=r.x+rrr;

            if(self.par.parent!=undefined){
                self.par.parent.collision.drawDegug()
                if(this.array[sah].parent==undefined){
                    self.par.parent.add(this.array[sah], false)
                }
            }                   
            sah++;
        }


        var yypp=3.2
        this.point=new Position()
        this.point1=new Position()
        var xp,yp,xxx,yyy 
        this.dragPos=function(x,y,bbb){
            xp=x;
            yp=y;
            xxx=0;
            yyy=0;           
            if(this.par.parent==undefined)return null;
            if(bbb==true)
            if(this.dragP2(x,y)!=null){
                return this.point1;
            }
            this.point.x=0
            this.point.y=0 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i]._activ==true){
                    if(this.array[i].parent!=undefined){                        
                        boki=this.array[i];
                        var ooo=boki.xx+boki.boxColizi.rectCollisMeshdy.width/2
                        boki=this.array[i];                  
                        boki.boxColizi.position.x =x+boki.xx+boki.boxColizi.rectCollisMeshdy.width/2;
                        boki.boxColizi.position.y =y-boki.yy+yypp;
                        this.par.parent.collision.testRect(boki.boxColizi);
                        xxx=x-boki.boxColizi.rectCollisMeshdy.x+boki.xx;
                        xxx=Math.round(xxx*100)/100;                    

                        yyy=y-boki.boxColizi.rectCollisMeshdy.y-boki.boxColizi.rectCollisMeshdy.height+yypp;                        
                        yyy=Math.round(yyy*100)/100;
                        
                        if(xxx!=0||yyy!=0){
                            this.point.x=xxx;
                            this.point.y=yyy;                            
                        }                        
                    }                    
                }
            }         
            if(this.point.x!=0||this.point.y!=0)return this.point
            return null;           
        }


        var _p=new Position()
        var _p1=new Position()
        var _p2=new Position()
        var _p3=new Position()
        var ddd
        var otXWW=0.0
        var pointPoisk
        //проверяем парент на близлищаие позиции от других горизонтальных
        this.dragP2=function(x,y){
            var dist=10
            _p.x=x+this.par.visiBPT._width/2
            _p1.x=x-this.par.visiBPT._width/2
            _p.y=y;
            _p1.y=y;  
            pointPoisk=null              
            for (var i = 0; i < this.par.parent.children.length; i++) {
                if(this.par.parent.children[i].type=="BPieceTop"){
                    if(this.par.parent.children[i].idRandom!=this.par.idRandom){                  
                        this.par.boolDragLip=true  
                        _p3.x=this.par.parent.children[i].x-this.par.parent.children[i].visiBPT._width/2;                        
                        _p3.y=this.par.parent.children[i].y;   

                        if(_p.y<_p3.y  && _p.y>_p3.y-this.par.parent.children[i].heightStart)
                        if(_p.x<_p3.x+dist && _p.x>_p3.x-dist){
                            this.point1.x=_p.x-_p3.x-otXWW
                            this.point1.y=_p.y-_p3.y 
                            this.point1.idArr=this.par.parent.children[i];  
                            pointPoisk=this.point1                            
                            break;
                        }

                        ddd=calc.getDistance(_p,_p3)
                        if(ddd<dist){
                            if(_p3.x-this.par.visiBPT._width>=0){
                                this.point1.x=_p.x-_p3.x-otXWW
                                this.point1.y=_p.y-_p3.y 
                                this.point1.idArr=this.par.parent.children[i];                           
                                pointPoisk=this.point1                            
                                break;
                            }
                        }

                        _p2.x=this.par.parent.children[i].x+this.par.parent.children[i].visiBPT._width/2;
                        _p2.y=this.par.parent.children[i].y;                       

                        if(_p1.y<_p2.y  && _p1.y>_p2.y-this.par.parent.children[i].heightStart)
                        if(_p1.x<_p2.x+dist && _p1.x>_p2.x-dist){
                            this.point1.x=_p1.x-_p2.x+otXWW
                            this.point1.y=_p1.y-_p2.y 
                            this.point1.idArr=this.par.parent.children[i];                             
                            pointPoisk=this.point1                              
                            break;
                        }

                        ddd=calc.getDistance(_p1,_p2)
                        if(ddd<dist){
                            if(_p2.x+this.par.visiBPT._width<this.par.parent.width){
                                this.point1.x=_p1.x-_p2.x+otXWW
                                this.point1.y=_p1.y-_p2.y 
                                this.point1.idArr=this.par.parent.children[i];                                
                                pointPoisk=this.point1                                  
                                break;
                            }                                                     
                        }
                        this.par.boolDragLip=false;
                    }
                }
            } 
            return pointPoisk;
        }


        this.dragParentDo = function(po,pn){
            if(this.par._parent!=undefined) {               
                this.par._parent.collision.drawDegug()
            }    
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].dragParentDo(po,pn)
            }              
        }
    }


    set depth(v) {
        if(this._depth!=v){
            this._depth= v; 
            for (var i = 0; i < this.array.length; i++) {                
                this.array[i].boxColizi.rectCollisMeshdy.depth=this._depth;                
            }         
        }       
    }   
    get depth() { return  this._depth;}
}


export class Boki{
    constructor(par) {
        this.type="Boki";
        this._parent=undefined;
        this.idRandom=Math.random();
        this._activ=true
        this.par=par
        this.xx=0;
        this.yy=0;
        this.dCol = function () {   

        }
        this.rect=[0,0,0,50,50,50]
        this.boxColizi = new RectCollis(
                50,
                50,
                10,
                10, this.dCol);
        this.boxColizi.parent = this; 
        this.boxColizi.rectCollisMeshdy.idRandom=this.par.par.boxColizi.rectCollisMeshdy.idRandom;
        this.boxColizi.rectCollisMeshdy.boolStick=false;

        this.boxColizi.rectCollisMeshdy.depth=this.par._depth;  

        this.dragParentDo = function(po,pn){            
            if(po!=undefined){
                po.remove(this);
            }
            if(pn!=undefined){                
                pn.add(this)                
            }
        }

        //полная очистка колизий
        this.clearBig=function(){
            if(this._parent!=undefined){
                this._parent.remove(this)
            }
            delete this.boxColizi
            delete this.rect
            delete this
        }
    }

    set parent(v) {
        if(this._parent!=v){
            this._parent= v;          
        }       
    }   
    get parent() { return  this._parent;}
}



