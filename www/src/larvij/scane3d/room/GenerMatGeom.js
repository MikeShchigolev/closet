
export class GenerMatGeom  {
    constructor(sten) {         
        this.type="GenerMatGeom";
        var self=this;
        this.par=sten;
        this._color=sten._color;
        this._width=sten._width
        
        this.material=new THREE.MeshPhongMaterial({            
            map:new THREE.Texture(),            
            side: THREE.DoubleSide,
        })

        this.material1=new THREE.MeshPhongMaterial({            
            map:new THREE.Texture(),            
            side: THREE.DoubleSide,
        })

        this.sahY=512;
        this.sahX=2048;

        

        var sah=this.sahY/14;        
        sah=37.2
        var sah2=20;
        this.dragText=function () {
       
        }


        this.colorA
        this.colorB
        this.dragText();
        var zz=0.9;
        this.colorLine
        this.s
        this.dragColor=function (_b) {
            var b=false;
            if(_b==undefined)b=true;
            var pp=1
            
            this.colorA = new THREE.Color(this._color) 
            if(b==false){
                this.colorA.r*=0.95
            }
            this.colorB = new THREE.Color() 
            this.colorB.r=this.colorA.r
            this.colorB.g=this.colorA.g
            this.colorB.b=this.colorA.b

            this.s="0x"+this.colorB.getHexString()
            this.colorB.r*=zz
            this.colorB.g*=zz
            this.colorB.b*=zz
            this.colorLine="0x"+this.colorB.getHexString() 
            this.dragText() 




            this.dragCanvas()        
            this.redrahMat(b);            
        }

        


        if(fotoScene==undefined)fotoScene=new FotoScene()


        var string
        this.redrahMat=function (_bool) {
           // if(this.par.idArr!=1) string=fotoScene.get(this.cont, this.sahX, this.sahY) 
            //else 
            string=this.canvas.toDataURL();

            if(_bool==true){
                if(this.material.map.image==undefined){
                    this.material.map.image=new Image()
                    this.material.map.image.onload = this.redrahMat2
                }
                this.material.map.image.src=string;
                this.dragColor(false)
            }else{
                if(this.material1.map.image==undefined){
                    this.material1.map.image=new Image()
                    this.material1.map.image.onload = this.redrahMat2
                }
                this.material1.map.image.src=string;
            }
        }

        this.redrahMat2=function () {
            self.material.map.needsUpdate=true;
            self.material.needsUpdate=true;
            self.material1.map.needsUpdate=true;
            self.material1.needsUpdate=true;

            self.par.fun("visi3d"); 
        }



        var timerId
        this.dragColorTime=function(){
            if(timerId!=undefined)clearInterval(timerId)
            timerId = setTimeout(function(){self.dragColor()},1000)
        }
        
        

       /* var bbbb=false
        var image=new Image();
        image.onload=function(){
            bbbb=true;
            self.dragCanvas()
        }
        image.src="resources/image/nizXZ.png";*/
        
     


        sah=37.2
        sah2=20;
        var ss
        this.dragCanvas=function(){
            //if(this.par.idArr!=1)return
            ss=(this.sahX/2)/this._width
               
            context.clearRect(0, 0, this.sahX, this.sahY);
            context.scale(ss,2);    
            context.fillStyle = "rgb( "+Math.round(this.colorA.r*255)+", "+Math.round(this.colorA.g*255)+","+Math.round(this.colorA.b*255)+")";
           
            context.fillRect(0, 0, this.sahX, this.sahY)




            context.fillStyle = "rgb( "+Math.round(this.colorB.r*255)+", "+Math.round(this.colorB.g*255)+","+Math.round(this.colorB.b*255)+")";
            context.font = "bold 10px SFUIDisplay-Bold"; 
            for (var i = 1; i < 14; i++) {
                context.fillRect(0, 512-i*sah, this.sahX, 0.5)
                context.fillText((i*sah2*10)+"", 5, 512-i*sah-5);         
            }
            context.scale(1/ss,0.5);

            trace("#############")
    
        }

            var ww=200//this.sahX
            var hh=200//this.sahY

            this.canvas = document.createElement('canvas'); // канвас для картинки
            this.canvas.width =this.sahX;
            this.canvas.height =this.sahY*2;
            var context = this.canvas.getContext('2d'); // контекст картинки



        this.dragColor();



    }

    set avAct(v) {
        if(this._avAct!=v){
            this._avAct = v;
            if(this._avAct==true){
                this.material1.transparent=false;
                this.material1.opacity=1;

                this.material.transparent=false;
                this.material.opacity=1;

            } else{
                this.material1.transparent=true;
                this.material1.opacity=0.3;

                this.material.transparent=true;
                this.material.opacity=0.3;
            }/**/                     
           
        }       
    }   
    get avAct() { return  this._avAct;} 




   set width(v) {
        if(this._width!=v){
            this._width = v;
            this.dragColorTime()
        }       
    }   
    get width() { return  this._width;}

    set color(v) {
        if(this._color!=v){
            this._color = v;
            this.dragColor()
        }       
    }   
    get color() { return  this._color;}
}

var fotoScene;
function FotoScene() {
    this.type = 'FotoScene';
    var self=this;
    fotoScene = this;

    var renderTexture;
    var baseRenderTexture;
    var imagePrint;
    var parContLM;
    var floor;
    this.renderer;
    this.init=function(){
        // floor=main.glafPlaner.sFloor.arrFloor[0];
        this.renderer = new PIXI.autoDetectRenderer(0, 0, {antialias: true, transparent:true,  preserveDrawingBuffer: true });
        renderTexture = new PIXI.RenderTexture.create();
        imagePrint = new PIXI.Sprite(renderTexture);
    }

    var contFoto=new PIXI.Container();
    var contFoto1=new PIXI.Container();
    var contFoto2 = new PIXI.Container();
    contFoto.addChild(contFoto1);
    contFoto1.addChild(contFoto2);
 
    var rect;
    var rectPic= new Rectangle();
    var b;
    var parCont;
    var parContPosX;
    var parContPosY;
    this.getFotoContent = function(content, w, h) {         
        if(this.renderer==undefined) {
            this.init();
        }
       
        
        renderTexture.resize(w, h, false);
        this.renderer.resize(w, h);
        this.renderer.render(content, renderTexture);
        this.renderer.render(imagePrint);
        this.renderer.render(content, renderTexture);
        this.renderer.render(imagePrint);        
        var result = this.renderer.view.toDataURL("image/png");     
        return  result;
    }


 
    this.get = function(content,ww,hh) { 


        var result = "null";    
        var s=content.scale.x;
        var x=content.x;
        var y=content.y;
        var p=content.parent;
        content.scale.set(1,1);
        contFoto2.addChild(content)
       
        result=this.getFotoContent(contFoto,ww,hh)
        if(p!=undefined)p.addChild(content)
        content.scale.set(s,s);
        content.x=x;
        content.y=y;
        return  result;
    }


}