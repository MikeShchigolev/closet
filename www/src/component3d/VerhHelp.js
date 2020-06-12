var verhHelp;
function VerhHelp() { 
   	
	var self=this;
    verhHelp=this;
    this._link;
    this._linkBlok;
    this._parent;
    this.drag=false;  
    this.arrBM=[];
    this.arrLink=[];
    
    this.c = new createjs.Container();//контейнер для кеша        
    var tim=300;

    

    this.mouseMove = function (e) {       
        if(self.drag==true){
            if(self.content){
                self.content.x=self._parent.mouseX;
                self.content.y=self._parent.mouseY;
            } 
        }
    }


    this.loadComplit=function(){        
        self.arrBM[this.name].children[0].x=-this.width/2;
        self.arrBM[this.name].children[0].y=-this.height/2;
    }
    
    var contIcon;
    var icon;
    var bm;
    this.getBm=function(str){
       
        for (var i = 0; i < this.arrLink.length; i++) {
            if(this.arrLink[i]==str){
                this.arrBM[i].alpha=0;
                new TWEEN.Tween(this.arrBM[i]).to( {alpha: 1}, tim ).start();
                return this.arrBM[i];
            }
        }
        contIcon=new createjs.Container();
        
        icon = new Image();
        bm = new createjs.Bitmap(icon);
        contIcon.addChild(bm); 
        icon.onload =this.loadComplit;
        icon.name=this.arrBM.length;
        
        this.arrBM.push(contIcon);
        this.arrLink.push(str);
        icon.src=str;

        
        this.shape = new createjs.Shape();
        this.shape.graphics.f("#cccccc").s()
        this.shape.graphics.drawRoundRect(-5, -5, 10, 10, 10);

           // this.shape.setTransform(10,-4);
        // contIcon.addChild(this.shape );

        this.arrBM[this.arrBM.length-1].alpha=0;
        new TWEEN.Tween(this.arrBM[this.arrBM.length-1]).to( {alpha: 1}, tim ).start();
         

        return this.arrBM[this.arrBM.length-1];
    }

    this.clear=function(){
        this.drag=false;
        if(this.content){
            if(this.content.parent){                
                this.content.parent.removeChild(this.content);
            }
            for (var i = 0; i < 1; i++) {
                if(this.c.children.length>0){
                    this.c.children[0].parent.removeChild(this.c.children[0]);
                    i=0;
                }
            }
        }
    }
    
}

VerhHelp.prototype = {
    set linkBlok (v) {        
        this._linkBlok = v;       
        if(this._linkBlok!=999){
            this.link="resources/blok/"+this._linkBlok+"/pic100.png";   
        }  
    },
    get linkBlok () {
        return this._linkBlok;
    }, 
    set link (v) {        
        this._link = v;
        if(this._parent){
            this.content=this.getBm(this._link);        
            this.c.addChild(this.content);
            this.content.x=this._parent.mouseX;
            this.content.y=this._parent.mouseY;
            this.drag=true; 
        }   
    },
    get link () {
        return this._link;
    }, 

    set parent (v) {        
        this._parent = v;
        this._parent.addChild(this.c);
        this._parent.addEventListener("stagemousemove", this.mouseMove);
    },
    get parent () {
        return this._parent;
    }, /**/  
}