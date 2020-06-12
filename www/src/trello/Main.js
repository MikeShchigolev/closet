/*
ключ1


основной класс, стартует все инициализации

*/

var localS,php,main;
function Main(fun) { 
		
	this.type="Main";
	var key="ключ2";
	var self=this;
	main=this;
	this.stage = null;
	this.content2d = null;
	this.renderer = null;
	this.glaf=null;
	this._width=100;
	this._height=100;
	self.resolution=1
	self.objectBase=null
    this.localStorage
    this.active =false;

	this.contentHTML= document.createElement('div');
	this.contentHTML.style.position = 'fixed';
	this.contentHTML.style.top = '0px';
	this.contentHTML.style.left = '0px';
	

	this.localS	
	php=this.php=new Php();

	this.start = function () {		
		this.stage = new PIXI.Container();
		this.renderer = new PIXI.autoDetectRenderer(this._width, this._height, {antialias: true, transparent: true, preserveDrawingBuffer: true });
		this.renderer.view.style.position = 'fixed';
		this.content2d = new PIXI.Container();
		self.stage.addChild(this.content2d);
		var t = new PIXI.ticker.Ticker();
		t.minFPS = 50;
		t.add(this.tick, this);
		t.start();         
        this.localS= localS = new LocalStorage(function(){self.init2();},"admin_trello_v4");        
	};

	//включает дебагер
	this.keydown=function(e){
        if(event.keyCode==17)self.boolCTRL=true
        if(event.keyCode==81&&self.boolCTRL)  {
            self.active =  !self.active
            localS.object.admin=self.active;
            localS.save();            
            if(self.active==true)document.body.appendChild(self.contentHTML);
            else document.body.removeChild(self.contentHTML);
        }            
    }
    this.keyup=function(e){
        if(event.keyCode==17)self.boolCTRL=false
    }
    window.addEventListener( 'keydown', this.keydown );    
    window.addEventListener( 'keyup', this.keyup ); 
    

	this.init2 = function () {
		if(localS.object.admin==true){
			this.active=true
			document.body.appendChild(this.contentHTML);
		}		
        self.glaf = new Glaf(this);         
		fun("init");
	}


	this.tick = function () {
		self.renderer.resolution = window.devicePixelRatio * self.resolution;// ставим разрешение рендера (соотношение пикселей)
		self.renderer.render(self.stage);
		TWEEN.update();	
		if (self.glaf) {
			self.glaf.update();
		}			
	}


	this.sizeWindow = function(w,h){ 
		self._width=w;
	    self._height=h;	    
		if (self.glaf) { 
			self.glaf.sizeWindow(w,h)
		}			
	}

	this.creatOB = function(){ 
		self.objectBase={}
		self.objectBase.key="null";
		self.objectBase.idList="null";
		self.objectBase.time=60;
		self.objectBase.array=[];
		self.save(function(){self.loadStart()})
	}

	this.save=function(f){     
        var ss  =JSON.stringify(this.objectBase) 
        var l = "../save/config.json";        
        php.load({tip:"saveJSON", link:l, text:ss},function(e){
           	if(f)f();
           	f=null;
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


	this.loadStart = function(){ 
		$.ajax({
	        url: "save/config.json?"+Math.random(),
	        success: function function_name(data) {                         
	            if(typeof data === "string") {
					var conf = JSON.parse(data)
					self.objectBase = conf;
				} else self.objectBase = data;	
				trace(self.objectBase)			
				self.start();			
	                             
	        },
	        error:function function_name(data) {
	            trace("Что то случилось с конфигом, ну да его нет, в первый раз заходим")
	            self.creatOB()	           
	        }
	    });
	}
	this.loadStart() 
}