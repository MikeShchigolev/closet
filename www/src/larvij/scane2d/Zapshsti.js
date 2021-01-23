






export class DWindowS extends DCont {
    constructor(dCont, _x, _y, _text, _fun,_link) {
        super(); 
        this.type="DWindowS";
      //  if(dcmParam==undefined)dcmParam=new DCM();
        
        var self=this;
        this.fun=_fun;  
        this.x=_x||0;   
        this.y=_y||0;
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);    
        this._width=200;
        this._height=200;
        this._color=dcmParam._color;
        this._color1=dcmParam._color1;
        this._wh=dcmParam.wh;
        this.sizeFont=20
        this.otstupVerh=50
        this.otstup=15


   

        this._minimize = false; // спрятать низ или открыть по ум открыто   
        this._hasMinimizeButton = false; // кнопочка для спрятать
        this._dragBool = true;  
        this._activMouse = true;        

        this._text="nullMMy";
        this.textPlus="";

        this.panel=new DPanel(this,0,0);
        this.panel.boolLine=false;
        this.panel.color1='#e1e8ee'


        this.panel1=new DPanel(this, this.otstup, this.otstupVerh);
        this.panel1.width=this._width-this.otstup*2
        this.panel1.height=this._height-this.otstupVerh-this.otstup;
        this.panel1.boolLine=false;
        this.panel1.color1='#adadad';




        this.button=new DButton(this,0,0," ");
        this.button.fun_mousedown=function(){
            if( self._dragBool != false){
                self.startDrag();
            }
        }
        this.button.height=this.otstupVerh;
        this.button.alpha=0;


        this.label=new DLabel(this,this.otstup,(this.otstupVerh - this.sizeFont)/2,"");
        this.label.fontSize=this.sizeFont;
        this.label.fontFamily="SFUIDisplay-Light"


        this.content=new DCont(this);
        this.content.y=this.otstupVerh;
        this.content.x=this.otstup;


        //DButSim funLoadImag
        this.butKrest
        if(_link!=undefined){
            this.butKrest=new DButSim(this,0,0,"",function(){            
                self.fun()
            });
            this.butKrest.alphaTeni=0
            this.butKrest.boolLine=false;
        
            this.butKrest.color=this.panel.color1;           
            this.butKrest.boolLine=false;
            //this.butKrest.color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10); 


            this.butKrest.width = this.butKrest.height= this.otstupVerh-this.otstup;
            this.butKrest.funLoadImag=function(){  

                this.width=this.image.picWidth;
                this.height=this.image.picHeight;

                this.y=(self.otstupVerh-this.height)/2
                this.visible=true;
                self._width--;
                self.width=self._width+1;
            }
            this.butKrest.loadImeg(_link)   
            this.butKrest.visible=false;
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
            
        }

        this.mousemove = function(e){           
            if(dcmParam.mobile==false){
                if(sp==undefined){
                    sp={
                        x:e.clientX,
                        y:e.clientY,
                        x1:self.x,
                        y1:self.y
                    };
                }
                var ss=sp.x1+(e.clientX-sp.x)           
                self.x=ss
                var ss=sp.y1+(e.clientY-sp.y)           
                self.y=ss
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
                self.x=ss
                var ss=sp.y1+(e.targetTouches[0].clientY-sp.y)              
                self.y=ss               
            }
        }


        this.startDrag = function(){            
            if(dcmParam.mobile==false){
                document.addEventListener("mousemove", self.mousemove);
                document.addEventListener("mouseup", self.mouseup);
            }else{
                
                document.addEventListener("touchend", self.mouseup);
                document.addEventListener("touchmove", self.mousemove);
            }
            
        }


        this._width--;
        this._height--;

        dcmParam.add(this);
        this.width=this._width+1;
        this.height=this._height+1;
        this.text=_text||"null";
        this.hasMinimizeButton=true
    }




    set x(value) {this.position.x = value;} get x() { return  this.position.x;}
    set y(value) {this.position.y = value;} get y() { return  this.position.y;}
    set width(value) {
        if(this._width!=value){
            this._width = value;
            this.panel.width = value;
            this.button.width = value;
            this.panel1.width=this._width-this.otstup*2
            this.label.width=this._width-this.otstup*2


            if(this.butKrest!=undefined)this.butKrest.x= this._width-this.butKrest.width-this.otstup
            
        }       
    }   
    get width() { return  this._width;}

    set height(value) {
        if(this._height!=value){
            this._height = value;
            this.panel.height = this._height;
            this.panel1.height= this._height-this.otstupVerh-this.otstup
        }       
    }   
    get height() { return  this._height;}

    set color(value) {
        if(this._color!=value){
            this._color = value;
            var c=dcmParam.compToHexArray(dcmParam.hexDec(this._color), -50);       
            this.button.color= c;   
        }
    }   
    get color() {       
        return  this._color;
    }

    set text(value) {       
        this._text = value; 
       
        this.label.text=this.textPlus+" "+value;       
    }   
    get text() {        
        return  this._text;
    }

    set minimize(value) {
        if(this._minimize!=value){
            this._minimize = value;
            if(this._hasMinimizeButton==true){
                if(this._minimize==true){
                    this.textPlus="►  ";
                }else{
                    this.textPlus="▼  ";
                }
                this.text=this._text;
            }           
            this.content.visible=!this._minimize;
            this.panel.visible=!this._minimize;         
        }
    }   
    get minimize() {        
        return  this._minimize;
    }
    set hasMinimizeButton(value) {
        if(this._hasMinimizeButton!=value){
            this._hasMinimizeButton = value;            
           // this.buttonMin.visible=this._hasMinimizeButton;
            if(value==true){
                if(this._minimize==true){
                    this.textPlus="►  ";
                }else{
                    this.textPlus="▼  ";
                }
                
            }else{
                this.textPlus="";
            }
            this.text=this._text;
        }
    }   
    get hasMinimizeButton() {       
        return  this._hasMinimizeButton;
    }
    set dragBool(value) {
        if(this._dragBool!=value){
            this._dragBool = value;
            if(value){
                this.button.object.style.cursor="pointer";
            }else{
                this.button.object.style.cursor="auto";
            }       
            
        }
    }   
    get dragBool() {        
        return  this._dragBool;
    }

    set activMouse(value) {     
        if(this._activMouse!=value){
            this._activMouse = value;
            this.button.activMouse = value;                         
        }       
    }
    get activMouse() { return  this._activMouse;}
}





export class VuborMat  {
    constructor(par,x,y,link,arrObj,fun) {          
        this.type="VuborMat";
        var self=this;
        this.par=par
        this.fun=fun;
        this.link=link;
        this.arrObj=arrObj;      
        this._index=-1;    
        this.dCont=new DCont(this.par.dCont);
        this.dCont.x=x;
        this.dCont.y=y;
        this.width=100
        this._visible=true;

        this._vusot=this.par._vusot;

        this.linkPosle="yoriginal.png"

        if(this.link){
            this.icon=new DImage(this.dCont, 0,0,this.link,function(){                
                let s=self._vusot/this.picWidth
                if(s>self._vusot/this.picHeight){
                    s=self._vusot/this.picHeight
                }                
                this.width=this.picWidth*s; // реальные размеры картинки
                this.height=this.picHeight*s;                 
            });
        }


        this.but2Link=new DButSim(this.dCont,this._vusot, 0," ",function(){
            self.galeri.setTime(100,true);
        });//,"resources/image/reddound.png"
       
        this.but2Link.borderRadius=111;
        this.but2Link.boolLine=false;
        this.but2Link.width=this._vusot; 
        this.but2Link.height=this._vusot;
        this.but2Link.color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10); 


                  
       

        this.galeri = new GaleriLitel(this,this._vusot,-this._vusot,arrObj,function(s,p){
            if(s=="index"){
                self.index=p;
                self.fun();
            }
        });

        this.object=arrObj
        this.arrObj=arrObj

        this.setObj=function(o){
            this.object=o;
            this.arrObj=o
            let b=false;

            if(b==false) {
                this.galeri.restart(this.object)
            }  
            this.index =-1
        }
    }

     set visible(v) {
        if(this._visible!=v){
            this._visible = v; 
            this.dCont.visible = v;        
        }
    }
    get visible() { return  this._visible;}   

    set index(v) {
        if(this._index!=v){
            this._index = v; 
            this.galeri.index = v;
            
            if(v==-1){                
            } else{  
              
                //            
                if(this.galeri.array[v]){
              
                    this.but2Link.loadImeg(this.galeri.array[v].link); 
                }             
            }        
        }
    }
    get index() { return  this._index;}
}



export class GaleriLitel{
    constructor(par,x,y,arrObj,fun) {          
        this.type="GaleriLitel";
        var self=this;
        this._index = -1;
        this.fun=fun;
        this.par=par;
        this._prosent=0.01;
       
        this.arrObj=arrObj;      
        this._index=-1;    
        this.dCont=new DCont(this.par.dCont);
        this.dCont.x=x;
        this.dCont.y=y;
        this.fun0=undefined

        this._vusot=this.par._vusot;
        this.object=undefined
        this.array=[]
        this.arrayCech=[]
        this.linkPosle="yoriginal.png";
/*
        var p = new DButSim(this.dCont,0,-300,"eeeexz1",null,"resources/image/w0.png")
        p.borderRadius=111;
        p.boolLine=false;
        p.width=47; 
        p.height=47;
        p.color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10);*/


        this.bool=false;
        this.tween = new TWEEN.Tween(this);
        this.setTime=function(time, bool){
            this.tween.stop()
            this.bool=bool
            if(bool){
                this.tween.to({prosent: 1}, time).start();                
            }else{
                this.tween.to({prosent: 0}, time).start();
            }
        }        
        this.prosent=0;


        this.clear = function () {
            for (var i = 0; i < this.arrayCech.length; i++) {
                this.arrayCech[i].clear()
            }
            this.array=[]
        }

        this.restart = function (o) {
            this.object=o;
            this.clear();
            
            if(!this.object)return
            if(!this.object.array)return    
            for (var i = 0; i < this.object.array.length; i++) {
                if(this.arrayCech[i]==undefined){
                    this.arrayCech[i]=new GLBox(this.dCont, this.object.array[i],function(){              
                        self.fun("index", this.idArr);               
                    },this)
                    this.arrayCech[i].idArr=i;
                    this.arrayCech[i].dCont.x=this._vusot/2 
                }
                this.array[i]=this.arrayCech[i]
                
                this.array[i].restart(this.object.array[i])
                this.array[i].dCont.visible = true; 

              
                if(this.object.array[i].src=="resources/image/w3.png"){
                    let l=this.arrayCech[i].but2Link
                    setTimeout(function() {
                       
                        self.parDrag(l)
                    }, 3000);
                }
            }
         

        }  

        var sss=0
        this.parDrag = function (p) {
            trace(sss,p.alpha,p.scale)
            if(p.parent){             

               sss++;
               this.parDrag(p.parent) 
            }


        }    




        this.mouseDown = function (e) {
            
            if(self.dCont.visible==true){
                self.setTime(100,false);
            } 

        }

        this.restart(arrObj)    

        if (dcmParam.mobile == false) {
            document.addEventListener("mousedown", this.mouseDown);
            
        } else {
            document.addEventListener("touchstart", this.mouseDown);
            
        }

        

    }

    set prosent(v) {
        if(this._prosent!=v){
            this._prosent = v;          
            if(v==0)this.dCont.visible=false;
            else this.dCont.visible=true;
            this.dCont.alpha=v;
            var yy=this._vusot*v
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active==false)yy-=this._vusot*v;                
                this.array[i].dCont.y=yy;

                
            }
            if(this._prosent==0)if(this.fun0!=undefined)this.fun0()
        }
    }
    get prosent() { return  this._prosent;}



    set index(v) {
        if(this._index!=v){
            this._index = v;
            for (var i = 0; i < this.array.length; i++) {
                if(i==v) this.array[i].active=true;
                else this.array[i].active=false;
            } 
        }
    }
    get index() { return  this._index;}
}

export class GLBox  {
    constructor(dCont,obj,fun,par) {          
        this.type="GLBox";
        var self=this;
        this.fun=fun
        this.idArr=-1
        this.par=par
        this._active=false;
        this.dCont=new DCont(dCont);
        this.dC=new DCont(this.dCont);

        this.object

 
/*

        if(obj.id!=undefined){
            this.link="resources/data/"+obj.id+"/yoriginal.png";
        }else{
            this.link=obj;
        }
        if(obj.src!=undefined){
            this.link=obj.src
        }*/
        
        this._vusot=47

        
        this.clear = function () {
            this.dCont.visible = false; 
        }


        this.but2Link=new DButSim(this.dCont,-this._vusot/2, -this._vusot/2," ",function(){
            self.fun()
        })
        this.but2Link.borderRadius=111;
        this.but2Link.boolLine=false;
        this.but2Link.width=this._vusot; 
        this.but2Link.height=this._vusot;
        this.but2Link.color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10); 

        this.link="null"
        this.restart = function (o) {
            this.object=o;
            let link="null"
            if(obj.id!=undefined){
                link="resources/data/"+this.object.id+"/"+this.par.linkPosle;
            }else{
                link=this.object;
            }
            if(obj.src!=undefined){
                link=this.object.src
            }
    
            if(link!=this.link){
                this.link=link
                this.but2Link.loadImeg(link)
            }

        }

        if(obj){
            this.restart(obj)
        }



       
    }

    set active(v) {
        if(this._active!=v){
            this._active = v;                      
            //this.dCont.alpha= v ? 0.5 : 1;  
            this.dCont.visible= !v;             
        }
    }
    get active() { return  this._active;}
}





/*
export class DButSim extends DCont {
    constructor(dCont, _x, _y, _text, _fun, _link) {
        super(); 
        this.type="DButSim";
        this.dcmParam=dcmParam; 
        this.dcmParam.add(this)
        var self=this
       
        this._text=_text||"null";
        this.fun=_fun;
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);
        this.x=_x||0;   
        this.y=_y||0;

        this.fun_mouseover=undefined;
        this.fun_mouseout=undefined;
        this.fun_mousedown=undefined;
        this.funDownFile=undefined;

        this.dCont=new DCont(this)

        this._width=100;
        this._height=dcmParam.wh;
        this._color=dcmParam._color;
        this._colorText=dcmParam._colorText;
        this._fontSize=dcmParam._fontSize;
        this._fontFamily=dcmParam._fontFamily;
        this._borderRadius=0;
        this._boolLine=dcmParam._boolLine;

        this.alphaTeni=0.1;

        this.aSah=1;
        this.alphaAnimat=true;




        this.panel=new DPanel(this.dCont, 0, 0)
        this.panel.width=this._width+1;
        this.panel.height=this._height+1;
        this.panel.color1=this._color

        this.panel1=new DPanel(this.dCont, 0, 0)
        this.panel1.width=this._width+1;
        this.panel1.height=this._height+1;
        this.panel1.color1="#000000";
        this.panel1.alpha=0

        
        this.panel.borderRadius=this._borderRadius;
        this.panel1.borderRadius=this._borderRadius;

        this.label=new DLabel(this.dCont, 5, (this._height-this._fontSize)/2,_text);    
        this.label.div.style.pointerEvents="none";
        this.panel1.div.style.cursor="pointer";


 


        this.mousedown=function(){
            if (self.file != undefined) {
                self.file.value = null;
                self.file.click();
                if (self.funDownFile)self.funDownFile();
                return;
            }

            if(self.fun)self.fun();
        }

        var timerId
        this.dragIcontime=function(){
            self.dCont.alpha=self.aSah;
            if(self.aSah>1){
                self.aSah=1;
                if(timerId!=undefined){
                    clearInterval(timerId);
                    timerId=undefined
                   
                }
                return
            }

            if(timerId==undefined){
                timerId = setInterval(this.dragIcontime, 10)
            }else{
                self.aSah+=0.01;
            }           
            
        }


        this.dragIcon=function(){ 
            
            if(this.alphaAnimat==true){
                if(this.aSah==1){
                   
                    this.aSah=0.5;
                    this.dragIcontime();
                }
            }
        }



        this.mouseover=function(){            
            self.panel1.alpha=self.alphaTeni; 
            self.dragIcon()                  
            if(self.fun_mouseover)self.fun_mouseover();
        }    
        this.mouseout=function(){
               
            self.panel1.alpha=0    
            if(self.fun_mouseout)self.fun_mouseout();
        }       


        if(dcmParam.mobile==false){
            this.panel1.div.addEventListener("mousedown", self.mousedown)
            this.panel1.div.addEventListener("mouseover", self.mouseover)
            this.panel1.div.addEventListener("mouseout", self.mouseout)
        }else{
            this.panel1.div.addEventListener("touchend", self.mousedown)

        }



        this.image=undefined;
        this.reDrag=function(){
            this.panel.width=this.panel1.width=this._width+1;
            this.panel.height=this.panel1.height=this._height+1;
            this.label.width=this._width;
            if(this.image!=undefined){
                var s=this._height/this.image.picHeight;
                this.image.height=this.image.picHeight*s;
                this.image.width=this.image.picWidth*s;
                self.label.x=this.image.width+5;             
            }
        }



        this.file;
        this.startFile = function (accept) {
            if (this.file == undefined) {
                this.file = document.createElement('input');
                this.file.type = 'file';
                this.file.multiple=true;
                if (accept) this.file.accept = accept;// "image/*";
                this.file.style.display = 'none';
                this.file.onchange = this.onchange;
            }
        };
        this.result;
        this.files;// files
        this.onchange = function (e) {
            if (e.target.files.length == 0) return;// нечего не выбрали
            self.files = e.target.files;
            
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function (_e) {             
                self.result = _e.target.result;
                if (self.fun) self.fun(self.result);
                          
                            
            };
        };
        
        this.funLoadImag=undefined;
        this._link="null";
        this.loadImeg=function(s){
            this._link=s;
            if(this.image==undefined){
                this.panel1.parent.remove(this.panel1);
                this.image=new DImage(this.dCont, 0,0,null,function(){
                    
                    self.reDrag();
                    if(self.funLoadImag!=undefined)self.funLoadImag()

                })
                this.image.div.style.pointerEvents="none";
                this.add(this.panel1);
            }
            this.image.link=this._link;
        }   

        if(_link!=undefined)this.loadImeg(_link)
        
        
    }



    set x(value) {this.position.x = value;} get x() { return  this.position.x;}
    set y(value) {this.position.y = value;} get y() { return  this.position.y;}
    set width(value) {
        if(this._width!=value){
            this._width = value;
            this.reDrag()
            //this.object.style.width=this._width+"px";
        }       
    }   
    get width() { return  this._width;}

    set height(value) {
        if(this._height!=value){
            this._height = value;
            this.reDrag();
            //this.object.style.height=this._height+"px";
        }       
    }   
    get height() { return  this._height;}



    set boolLine(value) {
        if(this._boolLine!=value){
            this._boolLine = value;
            this.panel.boolLine = value;
            this.panel1.boolLine = value;
            if(this._boolLine==true){
                //this.object.style.border= '1px solid ' + dcmParam.compToHexArray(dcmParam.hexDec(self._color), -20);//"none";
            }else{
                //this.object.style.border= '0px solid'
            }
        }
    }   
    get boolLine() {        
        return  this._boolLine;
    }


    set fontSize(value) {
        if(this._fontSize!=value){
            this._fontSize = value;
            this.label.y= (this._height-this._fontSize)/2
            this.label.fontSize = value; 
           // this.object.style.fontSize = value+"px";
        }
    }   
    get fontSize() {        
        return  this._fontSize;
    }

    set fontFamily(value) {
        if(this._fontFamily!=value){
            this._fontFamily= value;
            //this.object.style.fontFamily= this._fontFamily;

        }
    }   
    get fontFamily() {      
        return  this._fontFamily;
    }
    

    set color(value) {
        if(this._color!=value){
            this._color = value;
            this.panel.color1=  value;          
            //this.object.style.background = this._color; 
            //this.object.style.border= '1px solid ' + dcmParam.compToHexArray(dcmParam.hexDec(this._color), -20);
        }
    }   
    get color() {       
        return  this._color;
    }

    set text(value) {
        if(this._text!=value){
            this._text = value;
            this.object.value = this._text;
        }
    }   
    get text() {        
        return  this._text;
    }

    set colorText(value) {
        if(this._colorText!=value){             
            this._colorText = value;
            this.label.colorText = value;
            //this.object.style.color=this._colorText;
        }
    }   
    get colorText() {       
        return  this._colorText;
    }

    set borderRadius(value) {
        if(this._borderRadius!=value){              
            this._borderRadius = value;
            
            this.panel.div.style.borderRadius=this._borderRadius+"px";
            this.panel1.div.style.borderRadius=this._borderRadius+"px";
            //this.object.style.borderRadius=this._borderRadius+"px";
            //this.object.style.webkitBorderRadius =this._borderRadius+"px";
            //this.object.style.mozBorderRadius =this._borderRadius+"px";
        }
    }   
    get borderRadius() {        
        return  this._borderRadius;
    }

    set activMouse(value) {     
        if(this._activMouse!=value){
            this._activMouse = value;           
            if(value==true){
                this.alpha=1;
                this.object.style.pointerEvents=null;   
            }else{
                this.alpha=0.7;             
                this.object.style.pointerEvents="none"; 
            }               
        }       
    }
    get activMouse() { return  this._activMouse;}

}*/