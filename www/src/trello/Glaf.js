/*
ключ1


Опорный, содержит основное древо проекта

*/


var aGlaf, php;

function Glaf(main) { 
	aGlaf=this;	
	this.type="Glaf";
	var self=this;
    var key="ключ2";

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


	this.dCont=new DCont(main.contentHTML);


    this.init=function(){ 
        trace("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");       
        this.menu=new Menu(this, function(s, p){
            
            
        });      
      
    }






      

  

		
    

	this.update = function () {
				
	}

	this.sizeWindow = function(w,h){        
        this.menu.sizeWindow(w,h);			
	}

    this.init(); 

}    

/*


function Save(aGlaf) {         
    var self=this;        
    this.type="Save";
    this.par=aGlaf;
    this.objectBase=this.par.objectBase;
    
    this.save=function(){ 
        trace("##",this.par.objectBase) 
        var ss  =JSON.stringify(this.objectBase) 
        // trace(ss)    
        //var l = php.server+this.par.resurs+"config.json";
        var l = "../"+this.par.resurs+"config.json";
        
        aGlaf.php.load({tip:"saveJSON", link:l, text:ss},function(e){
            
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
}*/

