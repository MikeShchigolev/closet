
export class PositBatt{
    constructor(par) { 
        this.type="PositBatt";
        var self=this;
        this.par=par;
 
        this.dCont=new DCont();
        this.array=[]  
        this.par.dCont.add(this.dCont)
        
        
        var pointNull=new PIXI.Point(0,0)
        var xyGlob=new PIXI.Point()

        this.onDownB=function(s,p){                   
            if(s=="start"){
                self.par.par.array[0].savePozot();
                self.par.par.array[2].savePozot();
                xyGlob=self.par.par.rulit.content.toGlobal(pointNull); 
            }
            if(s=="drag"){
                var ww
                if(this.idArr==0){  
                    
                    ww=self.par.par.array[0].pointOld.w+this.yy/self.par._scale
                    if(ww<70) ww=70;        
                    self.par.par.array[0].width=ww
                    self.par.par.array[0].y=ww;                   
                }
                if(this.idArr==3){  
                    ww=self.par.par.array[2].pointOld.w+this.yy/self.par._scale
                    if(ww<70) ww=70 
                    self.par.par.array[2].width=ww;                   
                }                
                self.par.redrahWH();
            }
            if(s=="up"){
                self.par.par.rulit.redrag(500)
            } 
            
        }

        for (var i = 0; i < 4; i++) {
            this.array[i]=new DBBBBB(this.dCont,this.onDownB)
            this.array[i].idArr=i
        }



        this.redrahWH=function(){
            
            this.dCont.x=this.par.par.array[1].x*this.par._scale+this.par.par.rulit.content.x;
            this.dCont.y=this.par.par.array[1].y*this.par._scale+this.par.par.rulit.content.y;
           
            this.array[0].y=this.par.par.array[0].width*this.par._scale;
            this.array[2].x=this.par.par.array[1].width*this.par._scale;

            this.array[3].x=this.par.par.array[1].width*this.par._scale;
            this.array[3].y=this.par.par.array[2].width*this.par._scale;
        }
    }
}
export class DBBBBB  {
    constructor(dCont, fun) { 
        this.type="DBBBBB";
        var self=this;
        this.dCont=new DCont();    
        dCont.add(this.dCont);
        this.fun =  fun;     
        var self=this;
        this.wh=20
        this._x=0;
        this._y=0;
        this.idArr=-1;

        this._xx=0;
        this._yy=0;


        this.button=new DButton(this.dCont, -this.wh/2, -this.wh/2," ",function(){

        })
        this.button.width=   this.wh; 
        this.button.height=   this.wh; 



        this.mouseup = function(e){
            sp=undefined;
            if(dcmParam.mobile==false){
                document.removeEventListener("mousemove", self.mousemove);
                document.removeEventListener("mouseup", self.mouseup);
            }else{                  
                document.removeEventListener("touchend", self.mouseup);
                document.removeEventListener("touchmove", self.mousemove);
            }
            self.fun("up") 
        }



       var sp=undefined;   

        this.mouseup = function(e){
            sp=undefined;
            if(dcmParam.mobile==false){
                document.removeEventListener("mousemove", self.mousemove);
                document.removeEventListener("mouseup", self.mouseup);
            }else{                  
                document.removeEventListener("touchend", self.mouseup);
                document.removeEventListener("touchmove", self.mousemove);
            }
            self.fun("up") 
        }

        this.mousemove = function(e){           
            if(dcmParam.mobile==false){
                if(sp==undefined){
                    sp={
                        x:e.clientX,
                        y:e.clientY,
                        x1:self.xx,
                        y1:self.yy
                    };
                    self.fun("start") 
                }
                var ss=sp.x1+(e.clientX-sp.x)           
                self.xx=ss
                var ss=sp.y1+(e.clientY-sp.y)           
                self.yy=ss
                self.fun("drag")
            }else{
                if(sp==undefined){
                    sp={
                        x:e.targetTouches[0].clientX,
                        y:e.targetTouches[0].clientY,
                        x1:self.x,
                        y1:self.y
                    };
                }
                var ss=sp.x1+(e.targetTouches[0].clientX-sp.x)              
                self.xx=ss
                var ss=sp.y1+(e.targetTouches[0].clientY-sp.y)              
                self.yy=ss  
                self.fun("drag")            
            }


        }



        this.button.fun_mousedown = function(){  
            self.xx=0;
            self.yy=0;

            if(dcmParam.mobile==false){
                document.addEventListener("mousemove", self.mousemove);
                document.addEventListener("mouseup", self.mouseup);
            }else{
                
                document.addEventListener("touchend", self.mouseup);
                document.addEventListener("touchmove", self.mousemove);
            }
            
        }


    }
    set x(v) { 
        if(this._x != v){
            this._x = v; 
            this.dCont.x = v; 
        }
    }  
    get x() { return  this._x;}


    set y(v) { 
        if(this._y != v){
            this._y = v;
            this.dCont.y = v;  
        }
        
    }  
    get y() { return  this._y;}

    set xx(v) { this._xx = v; }  get xx() { return  this._xx;}
    set yy(v) { this._yy = v; }  get yy() { return  this._yy;}
}

