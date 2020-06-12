



export class MunuStart  {
  	constructor(scane2d, fun) {  		
  		this.type="MunuStart";
  		var self=this;
        this.wh=32
        this.scane2d=scane2d
        this._active=false;
  		this.content=new PIXI.Container();
        this.content.visible=false
  		scane2d.content.addChild(this.content);        
  		this.dCont=new DCont();

        this._width=100;
        this._height=100;
        this.verhH=50;

        this._sahMenu=0;

        this.panel;
        this.dC;
        this.init=function(){
            if(this.dC!=undefined)return
            /*this.panel=new PLPanel(this.content, 0, this.verhH)
            this.panel.color=0x79bccc;*/

            

            this.dC=new DCont(this.dCont);
            this.dC.div.style.textAlign = 'center';
            this.label=new DLabel(this.dC, 0, 0, "1111111kf ,kf ,kfбла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла ");
            this.label.colorText1=dcmParam.colorText

            this.button=new DButton(this.dCont, 0, 0,"Далее", function(){
                fun()
            });

        }
       


        this.dragSah=function(){
            if(this._sahMenu==0){
                this.active=true;                
            }else{
                this.active=false; 
            }
        }

        
  		this.sizeWindow = function(w,h,s){  			
            this._width=w;
			this._height=h;
            if(this._active==false)return;            
            //this.panel.width=this._width;
           // this.panel.height=h-this.verhH;        
            this.label.width=this._width;
            this.dC.width=this._width;
            this.button.x=(this._width-this.button.width)/2;
            this.button.y=this._height-this.button.height-this.wh;
            this.dC.y=this.button.y-this.label.div.clientHeight-this.wh;
  		}  			
  	}


    set active(value) {
        if(this._active!=value){
            this._active = value;
            if(this._active==true){
                this.init()
                this.scane2d.dCont.add(this.dCont);
                this.content.visible=true;
                this.sizeWindow(this._width,this._height)
            }else{
                this.scane2d.dCont.remove(this.dCont);
                this.content.visible=false;
            }
        }
    }
    get active() { return  this._active;}

    set sahMenu(value) {
        if(this._sahMenu!=value){
            this._sahMenu = value;
            this.dragSah()
        }
    }
    get sahMenu() { return  this._sahMenu;}
}







