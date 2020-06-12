
var aGlaf,php;

function AGlaf(main) { 
	aGlaf=this;	
	this.type="AGlaf";
	var self=this;
	this.content3d = new THREE.Object3D();
	this.content=new PIXI.Container();
	this.dCont=undefined;
    this.par=main
    this.otstup=2;
    this.wh=64
    this.whv=32+this.otstup*2
    this.widthBig=this.wh*3+this.otstup*3;
    this.objectBase=this.par.objectBase;
    this._sahMenu=0;

    this.resurs="resources/";
    this.resursPlus="data/";
    this.resursData=this.resurs+this.resursPlus;
    this.plusLink="";

    this.ser = window.location.href;
    var arrParams = this.ser.split("?");   
    var aa=arrParams[0].split("index")        
    this.server=aa[0];


    this.serverDo=aa[0];


    



    php=this.php=new Php();
	new Calc();
    

    trace("php.server    ",php.server)
  
    

	this.visi3D = new MVisi3D(main.contentHTML, main.content2d, false, true, true, true, false);		
	this.visi3D.yes3d = true;       	
	this.visi3D.groupObject.add(this.content3d);
   // this.visi3D.renderer.setClearColor( 0x79bccc, 1);
    this.visi3D.utility.debug = true; 
    //this.visi3D.utility.plane.visible=false;
    this.visi3D.position3d.powerZum=25;

    this.visi3D.cubeMap=new CubeMap();
    this.visi3D.cubeMap.init(this.visi3D.renderer, this.visi3D.scene);



    setTimeout(function() {
        this.visi3D.alwaysRender=true
    }, 100);

    this.visi3D.getEnvMap = function () {
        return self.visi3D.cubeMap.getTexture();
    };


	main.contentHTML.appendChild(main.renderer.view);  		
	main.content2d.addChild(this.content);
	this.dCont=new DCont(main.contentHTML);


    this.save=function(){        
        this.s.saveTime()
    }
    this.s=new Save(this);
    this.menu;
    this.s;
    this.init=function(){        
        this.menu=new Menu(this, function(s, p){
            if(s=="open"){                
                self.s3d.loadMod(p);
                return;
            }

            if(s=="openMat"){                
                self.s3d.openMat(p);
                return;
            }

            if(s=="drag3DRects"){
                self.s3d.sHelp.dragObj();//подгоняем ректы
            }
            
        });       
        this.s3d = new S3D(this);          
    }


    var b=false;
    if(this.objectBase==undefined){
        this.objectBase={};
        b=true;
    }

    if(this.objectBase.array==undefined){
        this.objectBase.array=[];
        b=true;
    }
    if(this.objectBase.bd==undefined){
        this.objectBase.bd=[];
        b=true;
    }
    if(this.objectBase.three==undefined){
        this.objectBase.three=[];
        b=true;
    }
     if(this.objectBase.materials==undefined){
        this.objectBase.materials=[];
        b=true;
    }


    if(b==true) this.save();      
    this.init();
   

  

		
    

	this.update = function () {
		this.visi3D.upDate();		
	}

	this.sizeWindow = function(w,h){  
        var xx=	this.widthBig*2+this.otstup*3;		
		this.visi3D.sizeWindow(xx,this.whv,w-xx-this.widthBig,h-this.whv);
        
        this.menu.sizeWindow(w,h);			
	}
}    




function Save(aGlaf) {         
    var self=this;        
    this.type="Save";
    this.par=aGlaf;
    this.objectBase=this.par.objectBase;

        

    this.saveLoad=function(){ 
        sahBig++;
        var o={sah:sahBig}
        var ss  =JSON.stringify(o); 
        var l = "../"+this.par.resurs+"info.json";        
        aGlaf.php.load({tip:"saveJSON", link:l, text:ss},function(e){
            
        }); 
    }


    this.save=function(){ 
        trace("save  ",this.objectBase)
        var ss  =JSON.stringify(this.objectBase); 
        var l = "../"+this.par.resurs+"config.json";        
        aGlaf.php.load({tip:"saveJSON", link:l, text:ss},function(e){
            //self.saveLoad()
        });       
    }

    this.sah=0
    this.saveTime=function(){
        this.sah++;
        var s=this.sah;
        setTimeout(function() {
            if(self.sah==s)self.save()
        }, 100);
    }       
}

