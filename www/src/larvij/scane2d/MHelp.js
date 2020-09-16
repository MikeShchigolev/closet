/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


Выподалка подсказок на 2 сцене
*/


export class MHelp  {
    constructor(par) {  
        var self=this   
        this.type="MHelp";
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";   
        this.par=par;
        var aGlaf=this.par.par;
        this.act = false;        
        this.array=[]
        this.colorS=aGlaf.visi3D.utility.sky.color;
        this.colorF="#525253";

        global.mHelp=this
        this.dCNM=undefined


        this.load=function(){
        	this.width=this.picWidth;
        	this.height=this.picHeight;
        	self.sizeWindow()
        }
        //create a container for the scane
        this.dCont=new DCont(this.par.dCont);


        //I made two objects for color
        var oC=undefined       
        var oC1 = new THREE.Color(this.colorS);       
        var oC2 = new THREE.Color(this.colorF);

        //this method if for animathin 
        this.md=function(e){
            self.tween1 = new TWEEN.Tween(self.dCont);
            self.tween1.onComplete(function(){          
                if(self.dCont.parent)self.dCont.parent.remove(self.dCont)
                self.act=false;
                aGlaf.visi3D.intRend=1;
            })
            var oo={p:0}
            self.tween2 = new TWEEN.Tween(oo);
            self.tween2.onComplete(function(){          
                aGlaf.visi3D.utility.sky.color=self.colorS;
                aGlaf.visi3D.intRend=1
            })
            self.tween2.onUpdate(function(){  
                oC.r=oC1.r*(oo.p)+oC2.r*(1-oo.p)
                oC.g=oC1.g*(oo.p)+oC2.g*(1-oo.p)
                oC.b=oC1.b*(oo.p)+oC2.b*(1-oo.p)
                aGlaf.visi3D.intRend=1
            })
        	self.tween1.to({alpha:0.0},1000).start();
            self.tween2.to({p:1},1000).start();
        	if(dcmParam.mobile==false){	 				
  				document.removeEventListener("mousedown", self.md);
  			}else{  				
  				document.removeEventListener("touchstart", self.md);  				
  			}
        }


        //initilizing our class
        var ppll=0
        var tw
        this.init=function(){
            if(ppll!=0)return
            ppll++    
        	aGlaf.par.localStorage.object.help++;
        	aGlaf.par.localStorage.save();           
            if(aGlaf.par.localStorage.object.help>5)return
            aGlaf.visi3D.utility.sky.color=this.colorF;           
            oC=aGlaf.visi3D.utility.sky.material.color;
	        for (var i = 0; i < 5; i++) {
	        	this.array[i]=new DImage(this.dCont,0,0,"resources/image/h"+(i+1)+".png",this.load)
	        }
	        this.act=true
            this.dHalp.alpha=0
            tw = new TWEEN.Tween(this.dHalp);           
            tw.to({alpha:1},500).start();
            
	        if(dcmParam.mobile==false){	 				
  				document.addEventListener("mousedown", self.md);
  			}else{  				
  				document.addEventListener("touchstart", self.md);  				
  			}	           
        }

        //the scene resizad here
        this.w=100
        this.h=100
        this.s=1
        this.sizeWindow = function(w,h,s){           	
           	if(w){
           		this.w=w
        		this.h=h
       			this.s=s
            }
            this.hAction.sizeWindow(w,h,s)
            if(this.act==false){
            	return;
            }
            if(this.array.length==0)return

            this.array[0].x=260;
            this.array[0].y=150;

            this.array[1].x=180;
            this.array[1].y=450;
            
            this.array[2].x=this.w/this.s/2;
            this.array[2].y=this.h/this.s/2-100;

            this.array[3].x=this.w/this.s-450;
            this.array[3].y=80;

            this.array[4].x=this.w/this.s/2-270;
            this.array[4].y=this.h/this.s-180;           
  		}  	


        this.dHalp=new DHelpxz(null, 0,0,"gh")
        this.dHalp.picWidth=18
        this.dHalp.plusLabelX=5
        this.dHalp.otstup=1
        this.dHalp.width=510
        this.dHalp.fontSize=16
        this.dHalp.colorText="#000000"
        this.dHalp.fontFamily="SFUIDisplay-Light"
        this.dHalp.boolNiz=true;
        this.dHalp.color="#ffda00";
        this.dHalp.borderRadius=10;


        this.hAction=new DHAction(this)


        this.tween = new TWEEN.Tween(this.dCont);
        this.tween.onComplete(function(){        	
        	if(self.dHalp.parent)self.dHalp.parent.remove(self.dHalp)
        })
        
        //thie is a mouse release event
        //это событие отпуска мышки
        this.mouseup=function(e) {     
         
            
            self.dHalp.visible=false;
            self.dCIframe.visible=true;   

        	if(dcmParam.mobile==false){	 				
  				document.removeEventListener("mousedown", self.mouseup);
  			}else{  				
  				document.removeEventListener("touchstart", self.mouseup);  				
  			}
       
            self.dCIframe.visible=false; 	
        }


        this.dCIframe=new DCont();
        this.iframe = document.createElement("IFRAME");        
        this.iframe.style.position = 'fixed';
        this.iframe.style.top = '0px';
        this.iframe.style.left = '0px';
        this.iframe.style.width=(this._width-2)+"px";
        this.iframe.style.height=(this._height-2)+"px";
        this.iframe.style.border= '0px solid';         
        this.dCIframe.div.appendChild(this.iframe)



        this.setIframe=function(link,w,h,cont,poz) {
            this.dHalp.visible=false;
            this.dCIframe.visible=true;            
            this.dCIframe.x=poz.x;
            this.dCIframe.y=poz.y;
            this.iframe.style.width=(w)+"px";
            this.iframe.style.height=(h)+"px";
            self.iframe.src=link;
            cont.add(this.dCIframe);

            setTimeout(function() {
                if(dcmParam.mobile==false){                 
                    document.addEventListener("mousedown", self.mouseup);
                }else{                  
                    document.addEventListener("touchstart", self.mouseup);                  
                }
            }, 10); 
        }



        this.setHelp=function(text,link,cont,poz) {
            
            if(this.dHalp.visible==true && text==this.dHalp.text )return
            this.mouseup()   

        	cont.add(this.dHalp)
            this.dHalp.visible=true
            this.dCIframe.visible=false
        	this.dHalp.text=text;
        	this.dHalp.link=link;
        	this.dHalp.x=poz.x;
        	this.dHalp.y=poz.y;
        	
        	
        	setTimeout(function() {
				if(dcmParam.mobile==false){	 				
	  				document.addEventListener("mousedown", self.mouseup);
	  			}else{  				
	  				document.addEventListener("touchstart", self.mouseup);  				
	  			}

        	}, 10);        	
        }





        this.testStartHelp=function(){
            var b=false;            
            if(aGlaf.par.localStorage.object.help==undefined){
                aGlaf.par.localStorage.object.help=0;               
            }           
            this.init();  
            this.hAction.testStartHelp();          
        }
    }
}




export class DHAction  {
    constructor(par, fun) {        
        this.type="DHAction";
        var self=this;
        this.par=par;

        this.dCont=new DCont();
        var aGlaf=this.par.par.par;

        this.image=undefined
        this.init=function(){
          
            var b=false
            if(aGlaf.par.confText)if(aGlaf.par.confText.action!=undefined){
                if(aGlaf.par.confText.action.active==true){
                    if(aGlaf.par.confText.action.link!="null"){                        
                        b=true;
                    }
                }
            }
           

            if(b==true){


                aGlaf.par.localStorage.object.action.sah++;
                if(aGlaf.par.localStorage.object.action.link!=aGlaf.par.confText.action.link){
                    aGlaf.par.localStorage.object.action.link=aGlaf.par.confText.action.link;
                    aGlaf.par.localStorage.object.action.sah=0;
                }

                if(aGlaf.par.localStorage.object.action.sah>=aGlaf.par.confText.action.kolSah)return
                

                aGlaf.par.localStorage.save()
                self.init2();
            }
        }

        this.init2=function(){
            let link=aGlaf.par.confText.action.link;
            if(aGlaf.par.php.key!=null){
                link="users/"+aGlaf.par.php.key+"/"+aGlaf.par.confText.action.link;
            }
           
            //http://closet/users/xz/0.png
            //http://closet/user/xz/0.png

            this.image=new DImage(this.dCont,0,0,link,function(){
                this.width=this.picWidth;
                this.height=this.picHeight;
                self.init3()
            })            
        }


        this.init3=function(){
            this.dCont.alpha=0;
            this.tween = new TWEEN.Tween(this.dCont);       
            self.tween.to({alpha:1.0},500).start();

            
            this.par.par.par.dCont.add(this.dCont)
            this.sizeWindow()
            if(dcmParam.mobile==false){                 
                document.addEventListener("mousedown", self.mouseup);
            }else{                  
                document.addEventListener("touchstart", self.mouseup);                  
            }

        }

        this.mouseup=function(){
          
            this.tween = new TWEEN.Tween(self.dCont);       
            this.tween.to({alpha:0},500).start();
            this.tween.onComplete(function(){           
                if(self.dCont.parent)self.dCont.parent.remove(self.dCont)
            })

            if(dcmParam.mobile==false){                 
                document.removeEventListener("mousedown", self.mouseup);
            }else{                  
                document.removeEventListener("touchstart", self.mouseup);                  
            }

        }

        this.w=100
        this.h=100
        this.s=1
        this.sizeWindow = function(w,h,s){              
            if(w){
                this.w=w
                this.h=h
                this.s=s
            }
            if(this.dCont.parent==undefined)return;
            this.dCont.x=(this.w/this.s-this.image.width)/2;
            this.dCont.y=(this.h/this.s-this.image.height)/2;
        }    


        this.testStartHelp=function(){
            if(this.image!=undefined)return
            var b=false;            
            if(aGlaf.par.localStorage.object.action==undefined){  
                aGlaf.par.localStorage.object.action={}          
                aGlaf.par.localStorage.object.action.sah=0; 
                aGlaf.par.localStorage.object.action.link="xz";              
            }
            this.init(); 
        }

    }
}




export class DHelpxz extends DCont {
    constructor(dCont, _x, _y, _text, _link) {
        super(dCont); 
        this.type="DHelpxz";
        var self=this
        this.x=_x||0;   
        this.y=_y||0;


        this._text="null";
        this._link=null;
        this._color="#ff0000";

        if(dcmParam==undefined)dcmParam=new DCM();

        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);    
        this._width=100;
        this._picWidth=32;        
        this._height=100;


        this.dCont=new DCont(this)
        
        
        this.textArea=new DTextArea(this.dCont,0,0,"");


        this._color=dcmParam._color;
        this._colorText=dcmParam._colorText;
        this._otstup=dcmParam._otstup;
        this._fontSize=dcmParam._fontSize;
        this._boolLine=dcmParam._boolLine;

        this._fontFamily=dcmParam._fontFamily;
        this._borderRadius=0;

        this._boolNiz=false;



        this.panel=new DPanel(this.dCont)
        this.panel.div.style.borderRadius=this._borderRadius+"px";
        this.panel.color1=this._color; 

        this.label=new DLabel(this.dCont);
        this.label.colorText1=this._colorText;

        this.label.dCT.div.setAttribute('style', 'white-space: pre;');
       // 
        this.textArea.visible=false

        this.textArea.textAlign=this.label.textAlign="center"//"left"//;

        this.textArea.object.setAttribute('style', 'white-space: nowrap; ');


        this.dragPic=function(){
            this.image.width=this._picWidth;
            this.image.height=this.image.picHeight*this.image.width/this.image.picWidth;
            this.image.visible=true;
            this.draw()
        }
        this.image=new DImage(this.dCont,0,0,null,function(){
            self.dragPic()
        })

        this.dContNiz=new DCont(this.dCont)
        this.dContNiz.visible=true


        this.image.visible=false;

        this._wCan=20
        this._hCan=15
        this.canvas=undefined;
        this.ctx=undefined;

        this.initNiz=function(){
            if(this.canvas!=undefined)return;
            this.canvas = document.createElement('canvas'); 
            this.canvas.width= this._wCan
            this.canvas.height= this._hCan             
            if (this.canvas.getContext){
                this.ctx = this.canvas.getContext('2d');              
            }
            this.dContNiz.div.appendChild(this.canvas);
            this.drawNiz()
        }

        this.drawNiz=function(){   
            if(this.canvas==undefined)return;     

            this.ctx.clearRect(0, 0, this._wCan, this._hCan);            
            if(this._boolLine==true){
                this.ctx.fillStyle =  dcmParam.compToHexArray(dcmParam.hexDec(this._color), -20);//"#ff0000"//                
                
                this.ctx.beginPath();
                this.ctx.moveTo(0,0);
                this.ctx.lineTo(this._wCan,0);
                this.ctx.lineTo(this._wCan/2,this._hCan);
                this.ctx.fill();

            }
            


            this.ctx.fillStyle = this._color
            this.ctx.beginPath();
            this.ctx.moveTo(1,0);
            this.ctx.lineTo(this._wCan-1,0);
            this.ctx.lineTo(this._wCan/2,this._hCan-1);

            this.ctx.fill();



        }

        this.plusLabelX=0
        var xt,ww,hh
        var r
        this.draw=function(){
            xt=this._otstup+this.plusLabelX;

            if(this.image.visible!=false){
                this.image.x=this._otstup;
                this.image.y=this._otstup;
                xt+= this._picWidth+this._otstup;
            }
            this.label.x=xt;
            let ww=this._width-xt-this._otstup
            this.textArea.width=100//ww;
            this.textArea.text= this.label.text
            this.textArea.width=this.textArea.object.scrollWidth+10

            let _w=this.textArea.width*1.2;

            //if(_w+xt+this._otstup>this._width)_w=this._width-(xt+this._otstup)
            this.panel.width = _w+xt+this._otstup;



            this.label.width=_w            
            r=this.label.getRect();
            
            this.textArea.x=this.label.x;
            this.textArea.y=this.label.y+1111

            hh=r.height+this._otstup*2;
            if(this.image.visible!=false){
                if(this.image.height+this._otstup*2>hh)hh=this.image.height+this._otstup*2

            }
            this.panel.height=hh;                        
            this.dCont.x=-this.panel.width/2
            if(this._boolNiz==true){
                this.dContNiz.y=hh-2
                hh+=this._hCan;
                this.dContNiz.x=(this.panel.width-this._wCan)/2;


            }

            this.dCont.y=-hh;      
        }

        
       /* this.p=new DPanel(this)
        this.p.width=this.p.height=10  */ 

        this.text= _text
        this.link=_link;

    }



    set text(value) {
        if(this._text!=value){            
            this._text = value;                     
            if(this._text){
                if(this._text.lenght!=0){

                    this.label.visible=true;
                    this.label.text = this._text;
                    this.draw();  
                    return
                }                
            }
            this.label.visible=false;             
            this.draw()         
        }       
    }   
    get text() { return  this._text;}



    set fontFamily(value) {
        if(this._fontFamily!=value){            
            this._fontFamily = value; 
            this.label.fontFamily=this._fontFamily;
            this.textArea.fontFamily=this._fontFamily;          
            this.draw()         
        }       
    }   
    get fontFamily() { return  this._fontFamily;}
  




    set fontSize(value) {
        if(this._fontSize!=value){            
            this._fontSize = value;            
            this.label.fontSize = value; 
            this.textArea.fontSize = value+2;          
            this.draw();        
        }       
    }   
    get fontSize() { return  this._fontSize;}

    set boolLine(value) {
        if(this._boolLine!=value){            
            this._boolLine = value;            
            this.panel.boolLine = value;  
            this.drawNiz()        
            this.draw()         
        }       
    }   
    get boolLine() { return  this._boolLine;}

    
    set boolNiz(value) {
        if(this._boolNiz!=value){            
            this._boolNiz = value;            
            this.initNiz() 
            this.dContNiz.visible =this._boolNiz   
            this.draw()         
        }       
    }   
    get boolNiz() { return  this._boolNiz;}


    



    set otstup(value) {
        if(this._otstup!=value){            
            this._otstup = value;  
            this.draw()         
        }       
    }   
    get otstup() { return  this._otstup;}

    set picWidth(value) {
        if(this._picWidth!=value){            
            this._picWidth = value; 
            if( this.image.visible!=false){
                this.dragPic()
            }
            //this.draw()         
        }       
    }   
    get picWidth() { return  this._picWidth;}








    set link(value) {
        if(this._link!=value){            
            this._link = value;            
            
            if(this._link){
                if(this._link.lenght!=0){
                    this.image.visible=false
                    this.image.link=this._link;                    
                    return
                }                
            }
            this.image.visible=false;             
            this.draw()         
        }       
    }   
    get link() { return  this._link;}

    set width(value) {
        if(this._width!=value){            
            this._width = value;
            this.panel.width = value;

            this.draw()         
        }       
    }   
    get width() { return  this._width;}

    set borderRadius(value) {
        if(this._borderRadius!=value){              
            this._borderRadius = value;            
            this.panel.div.style.borderRadius=this._borderRadius+"px";
        }
    }   
    get borderRadius() {        
        return  this._borderRadius;
    }

    set color(value) {
        if(this._color!=value){              
            this._color = value;            
            this.panel.color1=this._color;  
            this.drawNiz();          
        }
    }   
    get color() {        
        return  this._color;
    }

    set colorText(value) {
        if(this._colorText!=value){              
            this._colorText = value;            
            this.label.colorText1=this._colorText;

        }
    }   
    get colorText() {        
        return  this._colorText;
    }




}



