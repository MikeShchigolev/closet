


function SupportsWebGL(content, time, fun) {
	var self = this;
	this.content = content;
	this.fun = fun;
	this.time = time || 15000;
	this.value=0;
	this.w;
	this.h;
    this.bcolor;
    this.selectColor = js102_CS.js102_color
    this.loadColor = js102_CS.js102_color1
    this.sircShape;
    this.sircSelectShape;
    this.panel;
	this.btn1;
	this.btn2;
	this.btn3;
	this.btn11;
	this.btn12;
	this.btn13;
	this.arrBtn;
	this.panelProgress;
	this.btnProgress;
	this.labelVal;
	this.arrBtnCir;
	this.tim;
	this.run = -1;
	this.x;
	this.y;

	this.selectBtn = function(arrInd) {
		for (var j = 0; j < this.arrBtnCir.length; j++) {
			this.arrBtnCir[j].colorLitCirDef = this.selectColor;
		};
		for (var i = 0; i < this.arrBtnCir.length; i++) {
			for (var ii = 0; ii < this.arrBtnCir.length; ii++) {
				if (arrInd[ii] == i) {
					this.arrBtnCir[i].colorLitCirDef = this.loadColor;
				}
			}
		}

	};

	this.enebledBtn = function(arrInd){
		for (var j = 0; j < this.arrBtn.length; j++) {
			this.arrBtn[j].alpha=1;
		};

		for (var i = 0; i < this.arrBtn.length; i++) {
			for (var ii = 0; ii < arrInd.length; ii++) {
				if (arrInd[ii] == this.arrBtn[i].name) {
					this.arrBtn[i].alpha=0.3;
				} 
			}
		}
	}
    

	this.loadProgress = function(ind) {
		if (this.run == ind) {return};
		if (this.tim !=null ) {clearInterval(this.tim)};
		this.value=ind;

		this.run = ind;
		this.panelProgress.x = this.arrBtn[ind].x;
		this.panelProgress.y = this.arrBtn[ind].y;

		this.panelProgress.scaleX=0;
		var sha = this.time/ this.w ;
		var s = 1/sha;
		this.tim = setInterval(function () {
				self.panelProgress.scaleX+=s;
				if (self.panelProgress.scaleX >= 1) {
					self.panelProgress.scaleX=1;
					self.stop();
				};

		}, this.time / this.w);

	}
    this.init = function(cont) {
    	this.x=60;
    	this.y=20;
		this.contChe = new createjs.Container();
	    cont.addChild(this.contChe);

		this.panel = new PushButton(this.contChe,-10,-10);
		this.panel.cursor="default";
		this.panel.width =2000;
		this.panel.height = 2000;
		this.label = new Label(this.panel, this.x, this.y, " Класс инициализатор WebGL ");
		this.labelVal = new Label(this.panel, this.x, this.y+=25, " value= " + this.value);

	    this.btn1 =  new PushButton(this.panel, this.x, this.y+=15, "WebGL Не доступен" ); 
	    this.btn2 =  new PushButton(this.panel, this.x, this.y+=25, "WebGL На тачах(девайсах)" ); 
	    this.btn3 =  new PushButton(this.panel, this.x, this.y+=25, "WebGL Шикарный!!!" ); 
 
		this.btn1.name = 0;
		this.btn2.name = 1;
		this.btn3.name = 2; 

 		
		this.w = 200;
		this.h = 20;
	    this.btn2.width=this.w;
	    this.btn3.width=this.w;
	    this.btn1.width=this.w;

	    this.btn11 = new ButtonCircle(this.panel, this.x-this.h, this.btn1.y+this.h/2);
	    this.btn12 = new ButtonCircle(this.panel, this.x-this.h, this.btn2.y+this.h/2);
	    this.btn13 = new ButtonCircle(this.panel, this.x-this.h, this.btn3.y+this.h/2);
	    this.btn11.diametor=this.h;
	    this.btn12.diametor=this.h;
	    this.btn13.diametor=this.h;

	    this.text1 = new createjs.Text("0", this.h/2+"px Arial") ;
	    this.text2 = new createjs.Text("1", this.h/2+"px Arial") ;
	    this.text3 = new createjs.Text("2", this.h/2+"px Arial") ;

	    this.text1.x=-this.btn11.diametor*1.1;
	    this.text1.y=-this.h/3;

	    this.text2.x=-this.btn11.diametor*1.1;
	    this.text2.y=-this.h/3;
	    
	    this.text3.x=-this.btn11.diametor*1.1;
	    this.text3.y=-this.h/3;

	    this.btn11._content.addChild(this.text1);
	    this.btn12._content.addChild(this.text2);
	    this.btn13._content.addChild(this.text3);

		
		this.panelProgress  = new Panel(this.panel,this.x, 0);
		this.panelProgress.alpha=0.5;
		this.panelProgress.height=20; 
		this.panelProgress.scaleX=0;
		this.panelProgress.width = this.w;
		this.panelProgress.color = this.loadColor

	    this.bcolor = this.btn1.color;
	    this.arrBtn=[this.btn1,this.btn2,this.btn3];
	    this.arrBtnCir=[this.btn11,this.btn12,this.btn13];

    }

    ////////////////////
	if (content != undefined) {
		this.init(content);
	    this.value = (getWebGL());

	    if (this.value == 0) { // нету webgl
	    	this.fun();
	    }else if (this.value == 1) { // есть touch webgl
	    	this.selectBtn([0, 2]);
	    	this.enebledBtn([2])
	    };

	    this.labelVal.text = " value= " + this.value;
	    this.loadProgress(this.value);
	} else {
		this.value = getWebGL();
		this.fun();
	}
	/////////////////////////

	this.isKilling = false;
	this.stop = function() {
		if (self.isKilling) {return};
		clearInterval(self.tim);
		self.tim=null;
		self.run = -1;
		self.labelVal.text = " value= " + self.value;
		
		self.kill();		
		self.fun();
	}

    this.mouseover = function(e) { 
        e.currentTarget.color = self.selectColor
    }
    this.mouseout = function(e) {
        e.currentTarget.color = self.bcolor
    }

	this.mousedown = function(e) {
		// console.log("Загружаем "  +  e.currentTarget.text);
		self.value = e.currentTarget.name;
		if (self.fun) {
			self.fun(self.value);
			self.kill()
		};
    }



    if (this.arrBtn) {

	    for (var i = 0; i < this.arrBtn.length; i++) {
			this.arrBtn[i].addEventListener("mouseover", this.mouseover);
			this.arrBtn[i].addEventListener("mouseout",  this.mouseout); 
			this.arrBtn[i].addEventListener("mousedown",  this.mousedown);
		};
    	
    };

 

	this.start = function() {

	}


	this.kill = function() {
		this.isKilling = true;
		for (var i = 0; i < this.arrBtn.length; i++) {
			this.arrBtn[i].kill();
			this.arrBtnCir[i].kill();

		};

		this.panelProgress.kill();
		this.panel.kill();
		this.label.kill();
		this.labelVal.kill();
	}



}

    
function getWebGL () {// 0- недоступен . 1 - тачи . 2 - норм
	var supportsWebGL = ( function () { // true - есть webgl , false - нету webgl 
	try { 
		return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); 
	} catch( e ) { return false; } } )();

	if (supportsWebGL == false) { 	// нету webgl
		console.log("WebGL Не доступен")
		return 0;
	};

	var supportsTouch = ('ontouchstart' in document.documentElement);
	if (supportsTouch == true) { // броузер поддерживает touch
		// console.log("WebGL На тачах")
		return 1;
	} else {
		// console.log("WebGL Шикарный!!!")
		return 2;
	}
}
