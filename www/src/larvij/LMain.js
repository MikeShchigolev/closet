
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


главный класиик, стартует основное, грузит конфиг
*/

import { Glaf } from './Glaf.js';
import { AGlaf } from '../admin/AGlaf.js';
import { LocalStorage } from '../localStorage/LocalStorageE6.js';
import { Php } from '../php/PhpE6.js';


/*
fun на индекс, хз может апи, вырубает пердзагрущик
plus окнчание для большинства загрузок, и хронитель версии
tip =0 если 1 то обрезаеться функции с php для локальной версии
*/


export class LMain  {
  	constructor(fun,plus,tip) {  		
  		this.type="LMain";
  		this.plus=plus;
  		var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";  	
  		var self=this;
  		this.csvConfig=undefined;
  		this.csvConfigArray=undefined;
		this.glaf=null;
		this._width=100;
		this._height=100;
		this.fun=fun
		self.resolution=1
		self.objectBase=null
		self.confText=null 

		window.main=this
        this.localStorage=undefined;

        this.php=new Php()
        

        dcmParam.mobile=false;
        if(dcmParam.isMobile.any()!=null)dcmParam.mobile=true;

        if(dcmParam.mobile==false){
			let r = navigator.userAgent.match(/iPhone|iPad|iPod/i);			
	        if(r==null ){	
       	
	            if(navigator.userAgent.match(/Mac OS/i)!=null){

	                if(window.matchMedia("(any-pointer:coarse)").matches==true){

	                    dcmParam.mobile=true
	                }
	            }
	        }
		}


        this.tip=0//веб версия
        //if(tip!=undefined)this.tip=tip

		this.contentHTML= document.createElement('div');
		this.contentHTML.style.position = 'fixed';
		this.contentHTML.style.top = '0px';
		this.contentHTML.style.left = '0px';
		document.body.appendChild(this.contentHTML);  	

		//создание сцены
  		this.start = function () {	   
			var t = new PIXI.ticker.Ticker();
			t.minFPS = 50;
			t.add(this.tick, this);
			t.start();            
            this.localStorage = new LocalStorage(null, "larvij_v1");
            this.fina()
		};

		//188,189,190,191,192,193

		//стартуем дальше
        this.fina = function () {            	
			self.glaf=new Glaf(self);
	
			if(this.localStorage.object.dubag!=undefined){
                if(this.localStorage.object.dubag==true){                      
                    self.glaf.scane3d.dubag.active=true;                                         
                }
            }  
			if(self.localStorage.object.model!=undefined){
				if(self.localStorage.object.model!=null){					
					if(self.glaf.scane3d.dubag.saveModel){						
						self.glaf.scane3d.dubag.saveModel.setModel(self.localStorage.object.model)
					}
				}
			}			
			fun("init");

			setTimeout(function() {
				self.glaf.menuDiv.menuSave.testId()
			}, 100);
		}

		//тик размит надва
		var b=true
		this.tick = function () {
			b=!b;
			if(b==true)return			
			TWEEN.update();	
			if (self.glaf) {
				self.glaf.update();
			}			
		}

		//Маштабим окна 
		this.scale=1;
		var s
  		this.sizeWindow = function(w,h){  			
  			self._width=w;
			self._height=h;
			if (self._width < 800) self._width = 800;
			if (self._height < 600) self._height = 600;
			s= w/self._width;
			if(s>h/self._height)s=h/self._height;
			this.scale = s;
			if(dcmParam.isIE==true)this.scale = 1;			
			
  			if (self.glaf) { 
  				self.glaf.sizeWindow(w, h, this.scale)
  			}			
  		}


  		this.redactorCSVObj = function(){ 			
  			var k=new KlassCSVObj(self.csvConfig,self.objectBase);
  			self.csvConfigArray=k.csvConfigArray;
  		}



  		this.startText = function(){  
  			//грузим текстовый фаил
  			let link="resources/configText.json"+this.plus;
  			if(this.php.key!=null)link="users/"+this.php.key+"/configText.json"+this.plus+"&"+Math.random();
	  		$.ajax({
	            url: link,
	            success: function function_name(data) {                         
	                if(typeof data === "string") {
						var conf = JSON.parse(data)
						self.confText = conf;
					} else self.confText = data;
					
					self.tip=0
					if(self.confText.buy!=undefined)if(self.confText.buy==false)self.tip=1
					self.start();	                                
	            },
	            error:function function_name(data) {
	                console.log("Что то случилось с конфигом")
	            }
	        });
  		}


  		this.startCSV = function(){  
  			//грузим текстовый фаил
  			let link="resources/csvConfig.csv"+this.plus;
  			if(this.php.key!=null)link="users/"+this.php.key+"/csvConfig.csv"+this.plus+"&"+Math.random();
  			
  			//return
	  		$.ajax({	  			
	            url:link,
	            success: function function_name(data) {
					self.csvConfig = data;
					self.redactorCSVObj();
					self.startText();		                                
	            },
	            error:function function_name(data) {
	                console.log("Что то случилось с конфигом")
	                self.startText();	
	            }
	        });
  		}

  		this.сhangesSave= function(object){  
  			 			
  			self.glaf.menuDiv.menuSave.сhangesSave=true;
  		}
  		this.setObj = function (object) {
  			
  			self.glaf.setObj(object);            
        } 
        this.setObjectsJSON = function (object) {
        	
        	let b

        	for (var i = 0; i < object.array.length; i++) {        		
        		b=this.csvConfigArray.length;
        		for (var j = 0; j < this.csvConfigArray.length; j++) {
        			if(object.array[i].id == this.csvConfigArray[j].id){
        				
        				b=j;
        			}
        		}
        		this.csvConfigArray[b]=object.array[i];      		
        	}

        	for (var i = 0; i < this.objectBase.bd.length; i++) {
	            for (var j = 0; j < this.csvConfigArray.length; j++) {                             
	                if(this.objectBase.bd[i].id+""==this.csvConfigArray[j].id){

	                    this.objectBase.bd[i].obj.info=this.csvConfigArray[j]
                   
	                }
	            }            
	        }
        }
        

  		
  		var ll="resources/config.json"+this.plus;
  		
  		//грузим базовый фаил
  		$.ajax({
            url: "resources/config.json"+this.plus,
            success: function function_name(data) {                         
                if(typeof data === "string") {
					var conf = JSON.parse(data)
					self.objectBase = conf;
				} else self.objectBase = data;		
				
				self.startCSV();	  			
				//self.startText();	                                
            },
            error:function function_name(data) {
                console.log("Что то случилось с конфигом")
            }
        }); 
  	}
}

export class KlassCSVObj  {
  	constructor(csvConfig,objectBase) {  		
  		this.type="KlassCSVObj";
  		var self=this;

  		this.objectBase=objectBase
  		this.csvConfigArray
	  	var ak= 'юбьтимсчяэждлорпавыфъхзщшгнекуцйЮБЬТИМСЧЯЭЖДЛОРПАВЫФЪХЗЩШГНЕКУЦЙ';
	    var ak2='þáüòèìñ÷ÿýæäëîðïàâûôúõçùøãíåêóöéÞÁÜÒÈÌÑ×ßÝÆÄËÎÐÏÀÂÛÔÚÕÇÙØÃÍÅÊÓÖÉ';
	    function korektKiril(_s){
	        var s="";
	        var ss
	        for (var i = 0; i < _s.length; i++) {
	            ss=_s[i];
	            for (var j = 0; j < ak2.length; j++) {
	                if(ak2[j]==ss){
	                    ss=ak[j]
	                }
	            }
	            s+=ss;
	        }
	        return  s
	    }

	    //КИРИЛИЦА!!!!!!!!!!!!!!!!!!!!
	    ///////////////////////////////
	    var es='й|ц|у|к|е|н|г|ш|щ|з|х|ъ|ф|ы|в|а|п|р|о|л|д|ж|э|я|ч|с|м|и|т|ь|б|ю|Й|Ц|У|К|Е|Н|Г|Ш|Щ|З|Х|Ъ|Ф|Ы|В|А|П|Р|О|Л|Д|Ж|Э|Я|Ч|С|М|И|Т|Ь|Б|Ю';
	    var es1='Ð¹|Ñ|Ñ|Ðº|Ðµ|Ð½|Ð³|Ñ|Ñ|Ð·|Ñ|Ñ|Ñ|Ñ|Ð²|Ð°|Ð¿|Ñ|Ð¾|Ð»|Ð´|Ð¶|Ñ|Ñ|Ñ|Ñ|Ð¼|Ð¸|Ñ|Ñ|Ð±|Ñ|Ð|Ð¦|Ð£|Ð|Ð|Ð|Ð|Ð¨|Ð©|Ð|Ð¥|Ðª|Ð¤|Ð«|Ð|Ð|Ð|Ð |Ð|Ð|Ð|Ð|Ð­|Ð¯|Ð§|Ð¡|Ð|Ð|Ð¢|Ð¬|Ð|Ð®'
	    var aa, aa1,bb
	    this.testStr = function(str){  
	        var r=null
	        if(aa==undefined){
	            aa=es.split("|")
	            aa1=es1.split("|")
	        }
	        
	        for (var i = 0; i < aa1.length; i++) {
	            if(str.indexOf(aa1[i])!=-1){
	                r=''
	                break;
	            }
	        }
	        if(r!=null){
	           r= this.testStr2(str)
	        }
	        return r;
	    }

	    var aaw,sw
	    this.testStr2 = function(str){        
	        var r=str;            
	        for (var i = 0; i < aa1.length; i++) {
	            if(r.indexOf(aa1[i])!=-1){
	                aaw=r.split(aa1[i]);
	                r=''
	                
	                for (var j= 0; j < aaw.length; j++) {
	                    if(j==0){
	                        r+=aaw[j]
	                    }else{
	                        r+=aa[i]+aaw[j]
	                    }
	                }
	            }
	        }
	        return r;
	    }

	    this.korektText=function(s){
	        
	        let str=this.testStr(s);
	        self.par.par.menuVerh.novaZamena(str); 
	    }




	    var ar,a
	    var sah
	    this.bigZamena=function(_str){        
	       	
	       	var str=this.testStr(_str)
	

	       	a=_str.split("\n")        
	        ar=[]

	        var aea=a[1].split(";")
	        var ddd=[];
	        for (var i = 5; i < aea.length; i+=4) {           
	            ddd.push(aea[i])
	        }




			
	        var ss        
	        for (var i = 2; i < a.length; i++) {
	            ss=a[i].split("\r")            
	            var aaa=ss[0].split(";")

	            if(aaa.length>3){               
	                if(aaa[0]!="")ar.push(aaa) 
	            }else{
	                var aaa=ss[0].split(",")
	                if(aaa.length>3){                   
	                   if(aaa[0]!="")ar.push(aaa) 
	                }
	            }            
	        }

        
			for (var i = 0; i < ddd.length; i++) {
				if(ddd[i].length<2){
					ddd.splice(i,1)
					i=0
				}
			}

	    

	        this.nz1(ar,ddd)


	       /* for (var i = 1; i < a.length; i++) {
	            ss=a[i].split("\r")            
	            var aaa=ss[0].split(";")
	            if(aaa.length>3){               
	                if(aaa[0]!="")ar.push(aaa) 
	            }else{
	                var aaa=ss[0].split(",")
	                if(aaa.length>3){                   
	                   if(aaa[0]!="")ar.push(aaa) 
	                }
	            }            
	        }	               
	        this.bigZamena1(ar);*/
	    }


	    this.objectBase
	    var arrxz=[]
	    this.nz1=function(arr,ddd){ 
	       	
	        arrxz=[];
	        var array=[];
	        for (var i = 0; i < arr.length; i++) {	        	
	        	if(arr[i][0]=="colorNew"){
	        		let ddddd=[]
	        		for (var j = 0; j < arr[i].length; j++) {
	        			if(arr[i][j].indexOf("m_")!=-1){
	        				ddddd.push(arr[i][j])
	        			}
	        		}	        		
	        		ddd=ddddd;
	        	}	        	

	            let o={};  
	            o.id=arr[i][0];          
	            o.text=arr[i][1];
	            o.size=arr[i][2];

	            
				if(arr[i][3].length==0)o.mass=100
	            else o.mass=arr[i][3]*1
	            
	            if(arr[i][4].length==0)o.volume=0.1
	            else o.volume = arr[i][4]*1
	            
	            	
	            o.color={};
	            o.array=[]
	            let sah=0;
	            for (var j = 0; j < ddd.length; j++) {       
	                o.array[j]={id:ddd[j]}
	                let jj=5+j*4
	                o.color[ddd[sah]]={}
	                //o.color[ddd[sah]].id=arr[i][0];
	                o.color[ddd[sah]].art=arr[i][jj];

	                o.color[ddd[sah]].pri=arr[i][jj+1]*1;
	                if(isNaN(o.color[ddd[sah]].pri))o.color[ddd[sah]].pri=arr[i][jj+1]

	                o.color[ddd[sah]].niz=arr[i][jj+2];
	                o.color[ddd[sah]].xz=arr[i][jj+3];
	                sah++;
	            }
	            array.push(o);


	            for (var j = 0; j < this.objectBase.bd.length; j++) {
	                if(arr[i][0]*1==this.objectBase.bd[j].id){                    
	                    arrxz.push(this.objectBase.bd[i].obj)
	                }
	            }
	        }
	        
	        
	        for (var i = 0; i < this.objectBase.bd.length; i++) {
	            for (var j = 0; j < arr.length; j++) {                             
	                if(this.objectBase.bd[i].id+""==arr[j][0]){
	                    this.objectBase.bd[i].obj.info=array[j];
	                    arrxz.push(this.objectBase.bd[i].obj)
	                    
	                }
	            }            
	        }
	        this.csvConfigArray=array;
	        var o={
	        	info:"возможно что то будет, но пока не важно",
	        	array:this.csvConfigArray
	        }

	        //trace(JSON.stringify(o, null,4))
	    }
	    this.bigZamena(csvConfig)	   
  	}
}
