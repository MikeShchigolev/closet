


export class KorektMarker  {
    constructor(par, fun) {         
        this.type="KorektMarker";
        var self=this;
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
            this.w=new DWindow(par.par.par.dCont, 1600, 200,"тест маркеров");           
            this.w.content.div.appendChild(this.deb.div)
        }

        this.objXz={type:"xz"}

        this.draw=function(){
           // if(this._visiMark==false)return
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
            b=true;            
            if(child.type=="Sten")b=false;//стенки нафиг
            if(child.type=="Boki")b=false;//колизии стеложей тоже нафиг
            if(child.type=="BPieceTop")b=false;//сами стеложи тоже нафиг     
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
                b=false;
            }

            if( b==true){
                kmb=this.getKMB(child)                
                kmb.setXYWH(
                        child.boxColizi.rectCollisMeshdy.x,
                        child.boxColizi.rectCollisMeshdy.y,
                        child.boxColizi.rectCollisMeshdy.width,
                        child.boxColizi.rectCollisMeshdy.height
                    )
                kmb.color=0xff0000;
            }

            if(child.children){
                for (var i = 0; i < child.children.length; i++) {
                    this.poiskBox(child.children[i])
                }
            } 
        }

        var xx,yy,box
        this.poiskMarkers=function(mark){ 
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
                                if(this.arrBox[j].parent.idArr!=this.arrBox[j].parent.idArr)
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
                    }/**/
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










export class DebbugPixi  {
    constructor() {
        var self=this
        this.div= document.createElement('div');
        this.div.style.position = 'fixed';
        this.div.style.top = '0px';
        this.div.style.left = '0px';

        this._width=100;
        this._height=100;
        this._active=true;

        this.stage = new PIXI.Container();
        this.content2d = new PIXI.Container();
        this.stage.addChild(this.content2d);
        this.renderer = new PIXI.autoDetectRenderer(this._width, this._height, {antialias: true, transparent: true, preserveDrawingBuffer: true });
        this.renderer.view.style.position = 'fixed';
        var t = new PIXI.ticker.Ticker();
        this.div.appendChild(this.renderer.view);


        this.deb = new Deb(this);


        this.tick = function () {   
            if(self._active==false) return        
            self.renderer.resolution = window.devicePixelRatio * self.resolution;// ставим разрешение рендера (соотношение пикселей)
            self.renderer.render(self.stage);
        }

        t.add(this.tick, this);
        t.start();

        this.sizeWindow = function(w,h){            
            if(w){
                self._width=w;
                self._height=h;
            }

            if(self.renderer){
                var precresol = self.resolution;// запоминаем предыдущее разрешение пикселей рендера
                self.renderer.view.style.width = self._width + 'px';
                self.renderer.view.style.height = self._height + 'px';                
                self.renderer.resolution = 1;// перед изменение размера в дефолт
                self.renderer.resize(self._width, self._height);
                self.renderer.resolution = precresol;// ставим обратно разрешение
            }                      
        }

    }  
    set width(v) {
        if(this._width!=v){
            this._width = v;            
            this.sizeWindow() 
        }       
    }   
    get width() { return  this._width;}  

    set height(v) {
        if(this._height!=v){
            this._height = v;            
            this.sizeWindow(); 
        }       
    }   
    get height() { return  this._height;}
} 

export class Deb  {
    constructor(par) {
        var self=this;        
        this.par=par;
        this.content2d = new PIXI.Container();
        this.par.content2d.addChild(this.content2d);
        this.graphics = new PIXI.Graphics();
        this.content2d.addChild(this.graphics);



        this.clear=function(){
            this.graphics.clear();
        }

        var x,y,w,h,color,radius,alpha
        this.drawPoint=function(_x,_y,_color,_radius,_alpha){
            x=_x||0;
            y=_y||0;
            color=_color||0xff0000;
            radius=_radius||5;
            alpha=_alpha||0.5;

            
            this.graphics.lineStyle(1, color, alpha);
            this.graphics.beginFill(color, alpha*0.8);
            this.graphics.drawCircle(x-radius/2,y-radius/2,radius);

        }


        this.drawRect=function(_x,_y,_w,_h,_color,_radius,_alpha){
            x=_x||0;
            y=_y||0;
            w=_w||5;
            h=_h||5;
            color=_color||0xff0000;
            radius=_radius||5;
            alpha=_alpha||0.5;
            this.graphics.lineStyle(1, color, alpha);
            this.graphics.beginFill(color, alpha*0.8);
            this.graphics.drawRect(x,y,w,h,radius);
        }

    }
}




