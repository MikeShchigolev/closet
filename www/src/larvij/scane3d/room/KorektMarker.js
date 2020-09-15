/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


отсечение дополнительных коробок
*/
import { DebbugPixi } from './DebbugPixi.js';

export class KorektMarker  {
    constructor(par, fun) {         
        this.type="KorektMarker";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        //window.korektMarker=this;
        this.par=par;
        this.fun=fun;
        this._visiMark=false;
        this.kolSah=0
        this.arrBox=[]
        this.debag=false;
        if(tStyle.glaf.debug==true)if(par.idArr==1)this.debag=true
        this.deb=undefined;

        if(this.debag==true){
            this.deb=new DebbugPixi()          
            this.w=new DWindow(par.par.par.dCont, 20, 450,"тест маркеров1");           
            this.w.content.div.appendChild(this.deb.div)
        }

        this.objXz={type:"xz"}
        this.draw=function(){
            this.kolSah=0;
            kmb=this.getKMB(this.objXz) 
            kmb.setXYWH(
                0,
                -10,
                10000,
                10
            )
            kmb.color=0xff0000;

            this.poiskBox(this.par)            
            this.otseshenie()
            
            if(this.debag==true){
                this.w.width=this.par.width;
                this.w.height=this.par.height+32;
                this.deb.width=this.par.width;
                this.deb.height=this.par.height;
                this.visiDebdg()
            }            
        }

        var b
        var kmb
        this.poiskBox=function(child){
            b=1;            
            if(child.type=="Sten")b=0;//стенки нафиг
            if(child.type=="Boki")b=0;//колизии стеложей тоже нафиг
            if(child.type=="BPieceTop")b=0;//сами стеложи тоже нафиг   

            if(child.type=="BTBoxVstavka")b=2;//сами стеложи тоже нафиг 
            //if(child.type=="BTBoxDV")b=2;//сами стеложи тоже нафиг 

            if(child.type=="BPieceObject"){
                if(child.parent == undefined)return
                if(child.parent.boxColizi == undefined)return  
                kmb=this.getKMB(child)                
                kmb.setXYWH(
                        child.boxColizi.rectCollisMeshdy.x+child.parent.boxColizi.position.x,
                        child.boxColizi.rectCollisMeshdy.y+child.parent.boxColizi.position.y-child.boxColizi.rectCollisMeshdy.height,
                        child.boxColizi.rectCollisMeshdy.width,
                        child.boxColizi.rectCollisMeshdy.height
                    )
                kmb.color=0x00ff00;
                if(child._polka==true&&child.hrenNiz.bool){
                    kmb.y=child.boxColizi.rectCollisMeshdy.y+child.parent.boxColizi.position.y-child.ySMin
                    kmb.h=child.ySMin
                }
                for (var i = 0; i < child.markers.array.length; i++) {
                    this.poiskMarkers(child.markers.array[i])
                }
                b=0;
            }

            if( b==1){
                kmb=this.getKMB(child)                
                kmb.setXYWH(
                        child.boxColizi.rectCollisMeshdy.x,
                        child.boxColizi.rectCollisMeshdy.y,
                        child.boxColizi.rectCollisMeshdy.width,
                        child.boxColizi.rectCollisMeshdy.height
                    )
                kmb.color=0xff0000;
            }

            if( b==2){
                if(child.parent){
                    kmb=this.getKMB(child)                
                    kmb.setXYWH(
                            child.boxColizi.rectCollisMeshdy.x+child.parent.x,
                            -child.boxColizi.rectCollisMeshdy.y+child.parent.height/2,
                            child.boxColizi.rectCollisMeshdy.width,
                            child.boxColizi.rectCollisMeshdy.height
                        )
                    kmb.color=0x0000ff;
                } 
            }

            if(child.children){
                for (var i = 0; i < child.children.length; i++) {
                    this.poiskBox(child.children[i])
                }
            } 
        }

        var xx,yy,box
        this.poiskMarkers=function(mark){ 
            if(mark.boolColVisi==false)return;
            mark.c1.visible=true;
            
            box=mark.getBox()
            if(box==null)return;
            if(box.v==0)return; 


            kmb=this.getKMB(mark)  
            kmb.setXYWH(box.x,box.y,box.w,box.h)
            kmb.color=0x0000ff;            
        }


        this.getKMB=function(c){ 
            if(this.arrBox[this.kolSah]==undefined){
                this.arrBox[this.kolSah]=new KMBox();
            }
            this.arrBox[this.kolSah].parent=c;
            this.kolSah++;
            return this.arrBox[this.kolSah-1];
        }  

        
        var bb
        this.otseshenie=function(){
            var i,j
            for (i = 0; i < this.kolSah; i++) {
                if(this.arrBox[i].parent.type=="OMB"){
                    bb=true
                    if(this.arrBox[i].parent.c1.visible==true)
                    for (j = 0; j < this.kolSah; j++) {
                        if(i!=j) {

                            if(this.arrBox[j].parent.type=="OMB"){
                                if(this.arrBox[j].parent.c1.visible==true)                                
                                if(this.isColisi(this.arrBox[i],this.arrBox[j])){                                
                                    j=999                                
                                    bb=false
                                }
                            } 
                          
                            if(bb==true&&this.arrBox[j].parent.type=="BTumba"){                            
                                if(this.isColisi(this.arrBox[i],this.arrBox[j])){                                
                                    j=999                                
                                    bb=false
                                }
                            }

                            if(bb==true&&this.arrBox[j].parent.type=="xz"){                            
                                if(this.isColisi(this.arrBox[i],this.arrBox[j])){                                
                                    j=999                                
                                    bb=false
                                }
                            }

                            if(bb==true&&this.arrBox[j].parent.type=="BPieceObject"){                                
                                if(this.arrBox[j].parent.idArr!=this.arrBox[i].parent.par.par.idArr){                                    
                                    if(this.isColisi(this.arrBox[i],this.arrBox[j])){                                         
                                        j=999                                
                                        bb=false
                                    }
                                }                                
                            }
                        }  
                    }
                    this.arrBox[i].parent.c1.visible=bb
                }
            }
        }
        

        //проверка боксов в нутри
        this.isColisi=function(c,c1){            
            if(this.isColisi1d(c.x,c.x+c.w,c1.x,c1.x+c1.w)){
                if(this.isColisi1d(c.y,c.y+c.h,c1.y,c1.y+c1.h))return true
            }
            return false
        }
        //проверка между двух точек
        this.isColisi1d=function(p,p1,p2,p3){
            if(p3<p) return false;//второй слева
            if(p1<p2) return false;//второй справа
            return true;
        }

        //перерисовка дебага
        this.visiDebdg=function(){
            this.deb.deb.clear()
            for (var i = 0; i < this.kolSah; i++) {                
                this.deb.deb.drawRect(this.arrBox[i].x,this.arrBox[i].y,this.arrBox[i].w,this.arrBox[i].h,this.arrBox[i].color)
            }
        }

        this.upDate=function(){
           // if(par.idArr==1)
            this.draw()
        }
    }


    set visiMark(v) {
        if(this._visiMark!=v){
            this._visiMark = v;            
            this.draw()
        }       
    }   
    get visiMark() { return  this._visiMark;}
}


export class KMBox  {
    constructor() {         
        this.type="KMBox";
        this.parent=null;
        this.x=0;
        this.y=0;
        this.w=100;
        this.h=100;
        this.color=0x999999

        this.setXYWH=function(x,y,w,h){
            this.x=x;
            this.y=y;
            this.w=w;
            this.h=h;
        }
    }
}