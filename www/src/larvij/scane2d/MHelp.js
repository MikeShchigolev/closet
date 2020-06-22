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

        this.dCont=new DCont(this.par.dCont);


        
        var oC=undefined       
        var oC1 = new THREE.Color(this.colorS);       
        var oC2 = new THREE.Color(this.colorF);

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


        this.dHalp=new DHelp(null, 0,0,"gh")
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
        
        this.mouseup=function(e) {
            
         
            
            self.dHalp.visible=false;
            self.dCIframe.visible=true;   

        	if(dcmParam.mobile==false){	 				
  				document.removeEventListener("mousedown", self.mouseup);
  			}else{  				
  				document.removeEventListener("touchstart", self.mouseup);  				
  			}
            trace(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
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
            trace(this.dHalp.alpha,text,this.dHalp.text  )
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
           

            this.image=new DImage(this.dCont,0,0,aGlaf.par.confText.action.link,function(){
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


