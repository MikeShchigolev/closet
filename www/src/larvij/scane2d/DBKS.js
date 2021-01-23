/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


мелкие запчасти 
*/


//кнопка драга
export class DBKS {
    constructor(dCont, fun) { 
        this.type="DBKS";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";   
        
        this.dCont=new DCont();
        dCont.add(this.dCont);
        this.fun =  fun;     
        var self=this;
        this.wh=17
        this._x=0;
        this._y=0;
        this.idArr=-1;
        this._xx=0;
        this._yy=0;
        this._sss=1;
        this.tipDrag=["drag"];
        this.colorS='#000000'
        this.button=new DButton(this.dCont, -this.wh/2, -this.wh/2," ",function(){

        })
        this.button.width=   this.wh; 
        this.button.height=   this.wh; 
        this.button.color=this.colorS;
        this.button.alpha=0;


        var r=this.wh
        var r2=4
        this.dCont2=new DCont(this.dCont);
        this.dCont2.x= -r/2;
        this.dCont2.y= -r/2;
        this.canvas = document.createElement("canvas");
        this.canvas.width=r;
        this.canvas.height=r;
        this.c2d = this.canvas.getContext("2d");
        this.c2d.beginPath ();
        this.c2d.arc (r/2, r/2, r/2-r2, 0, Math.PI * 2, false);
        this.c2d.fillStyle = '#ffffff';
        this.c2d.fill();
        this.c2d.lineWidth = r2;
        this.c2d.strokeStyle = '#282828';
        this.c2d.stroke();    
        this.dCont2.div.appendChild(this.canvas);
        this.dCont2.div.style.pointerEvents="none";


        var sp=undefined;  
        this.mouseup = function(e){
            sp=undefined;
            self.activMouse=false;
            if(dcmParam.mobile==false){

                document.removeEventListener("mouseup", self.mouseup);
            }else{                  
                document.removeEventListener("touchend", self.mouseup);
            }
            self.fun("up") 
        }

        var ii
        this.mousemove = function(e){   
            if(self.activMouse==false) return       
            if(dcmParam.mobile==false){
                if(sp==undefined){
                    sp={
                        x:e.clientX/self._sss,
                        y:e.clientY/self._sss,
                        x1:self.xx,
                        y1:self.yy
                    };
                    self.fun("start"); 
                }
                var ss=sp.x1+(e.clientX/self._sss-sp.x); 
                self.xx=ss;
                var ss=sp.y1+(e.clientY/self._sss-sp.y);           
                self.yy=ss;
            }else{
                if(sp==undefined){
                    sp={
                        x:e.targetTouches[0].clientX/self._sss,
                        y:e.targetTouches[0].clientY/self._sss,
                        x1:self.x,
                        y1:self.y
                    };
                }
                var ss=sp.x1+(e.targetTouches[0].clientX/self._sss-sp.x);              
                self.xx=ss;
                var ss=sp.y1+(e.targetTouches[0].clientY/self._sss-sp.y) ;             
                self.yy=ss; 
            }
            for (ii = 0; ii < self.tipDrag.length; ii++) {
                self.fun(self.tipDrag[ii], self.xx, self.yy);  
            }
        }

        this.activMouse=false
        this.button.fun_mousedown = function(){  
            self.xx=0;
            self.yy=0;
            self.activMouse=true;
            if(dcmParam.mobile==false){                
                document.addEventListener("mouseup", self.mouseup);
            }else{                
                document.addEventListener("touchend", self.mouseup);               
            }
        }

        if(dcmParam.mobile==false){
            document.addEventListener("mousemove", self.mousemove);            
        }else{            
            document.addEventListener("touchmove", self.mousemove);
        }

        this.clineEvent=false
        this.mousemoveBig = function(e){ 
            if(self.clineEvent==false){
                self.clineEvent=true
                document.removeEventListener("touchmove", self.mousemove);
            } 
            self.mousemove(e)           
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


    set sss(v) {
        if(this._sss != v){
            this._sss = v;
        }
    } 
    get sss() { return  this._sss;}


    set xx(v) { this._xx = v; }  get xx() { return  this._xx;}
    set yy(v) { this._yy = v; }  get yy() { return  this._yy;}
}



export class DBKSLine {
    constructor(dCont, fun) { 
        this.type="DBKSLine";
        var self=this;
        this.dCont=new DCont();    
        dCont.add(this.dCont);
        this.fun =  fun;     
        var self=this;
        this.wh=15
        this.wh1=8
        this._width=0;
        this._height=0;
        this._x=0;
        this._y=0;
        this.idArr=-1;
        this._sss=1;
        this._xx=0;
        this._yy=0;
        this._active=false
        this.tipDrag=["drag"];
        this.colorS1='#6d6d6d'
        this.colorS='#cccccc'
        this.button=new DPanel(this.dCont, -this.wh/2, -this.wh/2," ",function(){

        })
        this.button.width= this.wh; 
        this.button.height= this.wh; 
        this.button.color1=this.colorS
        this.button.alpha=0;
        this.button.div.style.cursor='pointer'

        this.panel1=new DPanel(this.dCont, -this.wh1/2+1, -this.wh1/2," ",function(){

        })
        this.panel1.width= this.wh1; 
        this.panel1.height= this.wh1; 
        this.panel1.color1=this.colorS
        this.panel1.div.style.pointerEvents="none";
        this.panel1.boolLine=false;

        var sp=undefined;   

        this.mouseup = function(e){
            sp=undefined;
            self.activMouse=false
            if(dcmParam.mobile==false){

                document.removeEventListener("mouseup", self.mouseup);
            }else{                  
                document.removeEventListener("touchend", self.mouseup);

            }
            self.fun("up") 
        }
        var ii
        this.mousemove = function(e){  
            if(self.activMouse==false)return         
            if(dcmParam.mobile==false){
                if(sp==undefined){
                    sp={
                        x:e.clientX/self._sss,
                        y:e.clientY/self._sss,
                        x1:self.xx,
                        y1:self.yy
                    };
                    self.fun("start") 
                }
                var ss=sp.x1+(e.clientX/self._sss-sp.x);           
                self.xx=ss;
                var ss=sp.y1+(e.clientY/self._sss-sp.y);           
                self.yy=ss;

            }else{
                if(sp==undefined){
                    sp={
                        x:e.targetTouches[0].clientX/self._sss,
                        y:e.targetTouches[0].clientY/self._sss,
                        x1:self.x,
                        y1:self.y
                    };
                }
                var ss=sp.x1+(e.targetTouches[0].clientX/self._sss-sp.x);              
                self.xx=ss;
                var ss=sp.y1+(e.targetTouches[0].clientY/self._sss-sp.y);             
                self.yy=ss;  

            }
            for (ii = 0; ii < self.tipDrag.length; ii++) {
                self.fun(self.tipDrag[ii], self.xx, self.yy);  
            }
        }

        this.activMouse=false;
        this.mouseDOWN=function(e){
            self.xx=0;
            self.yy=0;
            self.activMouse=true;
            if(dcmParam.mobile==false){

                document.addEventListener("mouseup", self.mouseup);
            }else{

                document.addEventListener("touchend", self.mouseup);

            }
        }


        if(dcmParam.mobile==false)this.button.div.addEventListener("mousedown",this.mouseDOWN)
        else this.button.div.addEventListener("touchstart",this.mouseDOWN)

           
        this.drag = function(){  
            this.button.width=this._width+this.wh;
            this.button.height=this._height+this.wh;

            this.panel1.width= this._width+this.wh1;
            this.panel1.height= this._height+this.wh1;
        }


        if(dcmParam.mobile==false){
            document.addEventListener("mousemove", self.mousemove);            
        }else{            
            document.addEventListener("touchmove", self.mousemove);
        }

        this.clineEvent=false
        this.mousemoveBig = function(e){ 
            if(self.clineEvent==false){
                self.clineEvent=true
                document.removeEventListener("touchmove", self.mousemove);
            } 
            self.mousemove(e)           
        }
    }

    set active(v) {
        if(this._active!=v){
            this._active = v;
            this.panel1.color1= this.button.color1=v ? this.colorS1 : this.colorS;
        }       
    }   
    get active() { return  this._active;}




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

        }

    } 
    get sss() { return  this._sss;}

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



export class BoxLXZ{
    constructor(dCont, fun) { 
        var self=this;
        this.fun=fun;

        this.type="BoxLXZ";
        this._width=70;
        this._height=24;
        this._active=false
        this._actBig=false

        this.dC=dCont;
        this._value=101.101;

        this.dCont=new DCont();

        this.funFocus=undefined

        this.lD=new DCont();
        this.dCont.add(this.lD); 

        this.input=new DInput(this.dCont,-this._width/2,-this._height/2-3,this._value+"",function(){
            trace(this)
            if(isNaN(this.value/10)==true)this.value=self.value*10         
                self.value  = this.value/10;
            self.fun("drag",self.value/10);    

        })

        this.input.funFocus=function(){
            self.actBig=this.boolFocus

            if(this.boolFocus==false){
                if(isNaN(this.object.value*1)!=true){
                    
                    this.value=this.object.value*1
                    if(this.fun)this.fun()
                }
            }            
          
            if(self.funFocus) self.funFocus()         
        }



        dcmParam.styleInput(this.input)       
        this.input.fontSize=16;

        this.input.width=this._width;
        this.input.height=this._height;
        this.dCont.alpha=0.5

        this.lD.textAlign = 'center';
        this.lD.div.style.cursor='pointer'
        this.lD.x=-(this._width)/2;
        this.lD.y=-(this._height)/2;




        this.label= new DLabel(this.lD,73,-2,"мм");
        this.label.width=15;
        this.label.height=this._height;
        this.label.fontFamily="SFUIDisplay-Light"
    }


    set x(v) {this.dCont.x = v;} get x() { return  this.dCont.x;}
    set y(v) {this.dCont.y = v;} get y() { return  this.dCont.y;}


    set value(v) {
        if(this._value!=v){
            this._value = Math.round(v*10);            
            this.input.text=""+this._value;
        }       
    }   
    get value() { return  this._value;}


    set active(v) {
        if(this._active!=v){
            this._active = v;            
            if(this._active==true){
                this.dC.add(this.dCont);
            }else{
                this.dC.remove(this.dCont);
            }
        }       
    }   
    get active() { return  this._active;}


    set actBig(v) {
        if(this._actBig!=v){
            this._actBig = v;             
            if(v==false){
                this.dCont.alpha=0.5;
            }   else{
                this.dCont.alpha=1;
            }        
        }       
    }   
    get actBig() { return  this._actBig;}

}