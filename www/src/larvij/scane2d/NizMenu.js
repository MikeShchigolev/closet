
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

менюха с низу


*/

import { DWindowS, VuborMat, GaleriLitel, DButSim } from './Zapshsti.js';


export class NizMenu  {
  	constructor(par) {  		
  		this.type="NizMenu";
  		var self=this;
  		this.par=par
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";   
        
        this.dC=new DCont(par.dContPod);
        this.dCont=new DCont(this.dC);
        

        this.widthBig=this.par.widthBig;
        this.otstup=this.par.otstup*2;
        this._sahMenu=this.par._sahMenu;

        this._vusot=47;


        this.nmGalf=new NMGalf(this,function(s,p){//подобектная
            if(s=="foto"){
                self.fotoMenu.setFoto(p)
            }
        });
        this.nmObj=new NMObj(this);//основноая
        this.nmWebCam=new NMWebCam(this);//основноая

        this.plusMM=new PlusMM(this);//выподалка с доп функциами
        this.fotoMenu=new FotoMenu(this);//принскрин сохронялки

        

        this.object=undefined;

        this.setObject=function(o){            
            this.object = o;
            if(this.object!=null){
                if(this.object==1){
                    this.nmWebCam.active=true
                    this.nmGalf.active=false
                    this.nmObj.active=false
                    return
                }
                this.nmWebCam.active=false
                this.nmGalf.active=false
                this.nmObj.active=true
                this.nmObj.setObject(o);
                this.sizeWindow(this.width*1,this.height*1,this.scale*1)
            }else{
                this.nmWebCam.active=false
                this.nmGalf.active=true
                this.nmObj.active=false
            }
        }

        this.setObject(null);

        this.setIdMat=function(s){  this.nmGalf.setIdMat(s) }
        this.setIdNiz=function(s){  this.nmGalf.setIdNiz(s) }
        this.setIdMatObject=function(s){  this.nmObj.setIdMatObject(s) }
        

        this.tween = new TWEEN.Tween(this.dC);
        this.dC.y=110
        
        
        this.menuActiv=function(bool, time){ 
            var yy=0;
            if(bool==true) yy=110
            this.tween.stop();    
            this.tween.to({y:yy},time).start();
        }

        this.width=100
        this.height=100
        this.scale=1
  		this.sizeWindow = function(w,h,s){ 
            this.width=w;
            this.height=h;
            this.scale=s;
            this.dCont.x=this.widthBig
            this.dCont.y=h/s-this._vusot-this.otstup*3-25;            
            this.nmGalf.sizeWidth(w/s-this.widthBig)
            this.nmObj.sizeWidth(w/s-this.widthBig)
            this.nmWebCam.sizeWidth(w/s-this.widthBig)
            this.plusMM.sizeWidth(w/s-this.widthBig)

            this.fotoMenu.sizeWindow(w,h,s);
  		}
  	}
}


//выподалка с доп функциами
export class PlusMM  {
    constructor(par) { 
        var  self=this;        
        this.type="PlusMM";
        this.par=par;
        this._active=false;
        this.width=100
        this._vusot=47
        this.dCont=new DCont();
        this.room=this.par.par.par.scane3d.room;

        var bb=true;

        if(dcmParam.mobile==true){
            if(navigator.platform){
                var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
                if(iOS==true)bb=false;
            }            
        }

        var arrObj={array:[]}
        if(bb==true)if(this.par.par.par.par.tip==0)arrObj.array.push({src:"resources/image/xp0.png"})
        arrObj.array.push({src:"resources/image/xp1.png"})
        arrObj.array.push({src:"resources/image/w3.png"})
        if(this.par.par.par.par.tip==0)arrObj.array.push({src:"resources/image/w2.png"})
        arrObj.array.push({src:"resources/image/w0.png"})

        this.galeri = new GaleriLitel(this,0,0,arrObj,function(s,p){ 
            if(s=="index"){

                if(this.array[p].link=="resources/image/xp0.png"){//csv                    
                    var a=self.par.par.mani.getArr();
                    var str= 'артикул;название;размер;цена;цвет;кол.;общая цена;id БД\n'//"data:text/csv;charset=utf-8,%EF%BB%BF\n";
                    for (var i = 0; i < a.length; i++) {
                        for (var j = 0; j < 5; j++) {                        
                            str+=a[i][j]+";"
                        }
                        str+=a[i][10]+";"
                        str+=a[i][11]+";"
                        str+=a[i][9]+";"
                        str+="\n";
                    }
                    str+=";;;;;;"+self.par.par.mani.price+";";                    
                    download(str,"t.csv","csv")
                } 

                if(this.array[p].link=="resources/image/xp1.png"){//pdf
                    self.par.par.mPrint.start(1,function(doc){
                        doc.save("larvij.pdf");
                    });
                } 

                if(this.array[p].link=="resources/image/w3.png"){//foto
                   /* var base64= self.par.par.par.scane3d.foto3dLarvij.get("original") 
                    self.par.fotoMenu.setFoto(base64)*/

                    self.par.par.par.scane3d.foto3dLarvij.getOriginalWeb(function(base64){
                        self.par.fotoMenu.setFoto(base64) 
                    })  
                    
                }  

                if(this.array[p].link=="resources/image/w2.png"){//save

                    self.par.par.mInfo.setFun("ПИСЬМО ОТПРАВЛЕННО.", "Письмо было отправелнено на Ваш эмеил, но могло попасть в спам!",function(){},true)
                               
                   /* self.par.par.menuSave.getNewProd(function(str){
                        self.par.par.mInfo.setFunSave(str,
                            function(s){              
                                self.par.par.menuSave.setMail(this.text, function(){
                                    self.par.par.mInfo.setFun("ПИСЬМО ОТПРАВЛЕННО.", "Письмо было отправелнено на Ваш эмеил, но могло попасть в спам!",function(){},true)
                                });
                            }
                        );
                    })*/ 
                }  
               
                if(this.array[p].link=="resources/image/w0.png"){//новый проект
                    self.par.par.mInfo.setFun("НОВЫЙ ПРОЕКТ","Текущий проект будет удален, а все настройки сброшены. Продолжить?",
                        function(){              
                            self.room.clearScane()
                        }
                    );
                }   
            }
        });


        var sim
        this.zamenaSimvol = function(s, a){ 
            var sn=""
            for (var i = 0; i < s.length; i++) {
                sim=s[i]
                for (var j = 0; j < a.length; j+=2) {
                    if(s[i]==a[j]){                    
                        sim=a[j+1];
                    }
                }
                sn+=sim
            }
            return sn
        }

        function download(data, filename, type) {
         
            var dd=self.zamenaSimvol(data,["×","x"])  
            var time=(new Date()).getTime()
            var ll="../resources/tmpInfo/"+time+".csv";
            var l="../resources/tmpInfo/";
        
            self.par.par.menuSave.php.load({tip: 'mkdir', dir: l}, function (e) { 
                self.par.par.menuSave.php.load({tip: 'saveFile1251', text: dd, link:ll}, function (e) {
                    window.location = self.par.par.par.server+"/resources/tmpInfo/"+time+".csv";
                    setTimeout(function(){
                        self.par.par.menuSave.php.load({tip: 'unlink', dir: ll}, function (e) {      
                       
                        })
                    },1000)  
                })
            })
        }


        this.wPan=100;
        this.sizeWidth=function(w){
            this.wPan=w;
            this.dCont.y=0;
            this.dCont.scale=1
            this.dCont.x=(this.wPan)/2+86
            this.dCont.y=-this._vusot/2-10;            
        }


        this.dragActiv=function(){
            if(this._active==true){
                self.galeri.prosent=0;
                self.galeri.setTime(100,true);
            }else{

            }
        }
    }

    set active(v) {
        this._active = v; 
        this.dragActiv()
        if(this._active==true){            
            if(this.dCont.parent==undefined){                
                this.par.dCont.add(this.dCont)  
            }              
        }else{
            if(this.dCont.parent!=undefined)this.par.dCont.remove(this.dCont)           
        } 
    }
    get active() { return  this._active;}    
}

//оброботка обьекта
export class NMWebCam  {
    constructor(par) {          
        this.type="NMWebCam";
        var self=this;
        this.par=par
        this._active=false;
        this.dCont=new DCont();

        this._width=200
        this.widthBig=this.par.widthBig;
        this.otstup=this.par.otstup;
        this._sahMenu=this.par._sahMenu;
        this._vusot=this.par._vusot;

        this.panel = new DPanel(this.dCont,0,0);
        this.panel.height=this._vusot+this.otstup*1.7;  
        this.panel.width=  this._width   
        this.panel.div.style.borderRadius = this._vusot+"px";        

        var xx=this.otstup
        this.but=new DButSim(this.dCont,xx,this.otstup," ",function(){

            self.par.par.menuActiv(false, 500);
            self.par.setObject(null)
            self.par.par.par.webCamera.active=false

        },"resources/image/w8.png")
        this.but.borderRadius=111;
        this.but.boolLine=false;
        this.but.width=this._vusot; 
        this.but.height=this._vusot;
        this.but.color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10);  
       

        xx+=this._vusot+this.otstup;

        this.but=new DButSim(this.dCont,xx,this.otstup," ",function(){


            self.par.par.par.scane3d.foto3dLarvij.getOriginalWeb(function(base64){
                self.par.fotoMenu.setFoto(base64) 
            })  

        },"resources/image/w2.png")
        this.but.borderRadius=111;
        this.but.boolLine=false;
        this.but.width=this._vusot; 
        this.but.height=this._vusot;
        this.but.color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10);  

        xx+=this._vusot+this.otstup;


        this.width=xx;



        this.wPan=100
        this.sizeWidth=function(w){
            this.wPan=w;         
            this.dCont.y=0;
            //this.dCont.scale=this.wPan/this.width
            
            this.dCont.x=(this.wPan-this.width)/2                     
        }

     
    }

    set width(v) {
        if(this._width!=v){
            this._width = v;   
            this.panel.width=this._width;            
        }
    }
    get width() { return  this._width;}
    
    set active(v) {
        if(this._active!=v){
            this._active = v;           
            if(this._active==true){
                this.par.dCont.add(this.dCont)                
            }else{
                this.par.dCont.remove(this.dCont)               
            } 
        }
    }
    get active() { return  this._active;}
}



//оброботка обьекта
export class NMObj  {
    constructor(par) {          
        this.type="NMObj";
        var self=this;
        this.par=par
        this._active=false;
        this.dCont=new DCont();
        this.mani=this.par.par.mani
        this.room=this.par.par.par.scane3d.room;

        this._width=200
        this.widthBig=this.par.widthBig;
        this.otstup=this.par.otstup;
        this._sahMenu=this.par._sahMenu;
        this._vusot=this.par._vusot;

        this.panel = new DPanel(this.dCont,0,0);
        this.panel.height=this._vusot+this.otstup*1.7;  
        this.panel.width=  this._width   
        this.panel.div.style.borderRadius = this._vusot+"px";

        this.up1Menu=undefined;
        
        setTimeout(function() {

           if(main.glaf.up1 == true){//Включена смена 55 up1
                self.up1Menu=new Up1Menu(self)
            } 
        }, 10);
        

        var ot=this.otstup;
        var xx=ot
        this.arrLine=[];

        var bColor=true//
        if(this.par.par.par.par.objectBase.three[1].array.length<=1)bColor=false


        for (var i = 0; i < 2; i++) {
            this.arrLine[i]=new DImage(this.dCont,0, this.otstup,"resources/image/x13.png",function(){
                this.width=this.picWidth; // реальные размеры картинки
                this.height=this.picHeight;
            });
        }


        if(bColor==true){
            this.vuborMat = new VuborMat(this,this.otstup,this.otstup,"resources/data/"+this.par.par.par.par.objectBase.three[2].array[2].id+"/yoriginal.png",this.par.par.par.par.objectBase.three[1],function(){
                self.room.idMatObject = this.arrObj.array[this.index].id;
            });            
            this.vuborMat.index = this.par.par.par.par.objectBase.three[1].array.length-1;        

        }else{
            this.arrLine[0].visible=false
        }


        this.dragWHXZ=new DragWHXZ(this,0,this.otstup+6,function(){

        })


        this.batArr=new BatArr(this,0,this.otstup,function(t,s){            
            if(t=="polka"){//не можем поставить полку
                self.par.par.mHelp.setHelp("В данном положении полки, установка перекладины невозможна","resources/image/mhelp.png",this.dCont,{x:24,y:-13});
            }
            if(t=="saveMod"){//не можем поставить полку
                self.room.par.tudaSuda.saveMod();
            }
        })

        this.clear=function(){
            this.dragWHXZ.dCont.visible=false;
            this.arrLine[1].visible=false
        }    

        var xx
        this.object=undefined
        this.setObject=function(o){
            this.object=o;
            this.clear()

            this.arrLine[0].x=this.otstup+this._vusot*2-this._vusot*0.25



            xx=this.otstup+this._vusot*2+this._vusot*0.5 
            if(bColor==false) xx+=-113

            if(this.object.type=="BDoor"||this.object.type=="BWindow"){
                this.dragWHXZ.setObject(this.object);
                this.dragWHXZ.dCont.visible=true;
                this.dragWHXZ.dCont.x=xx;
                xx+=this.dragWHXZ.width;
                this.arrLine[1].visible=true;
                this.arrLine[1].x=xx-this._vusot*0.25;
                xx+=this._vusot*0.5;
            }
            this.batArr.setObject(o);
            this.batArr.dCont.x=xx;
            xx+= this.batArr.width;
            this.width=xx+this.otstup;

            if(this.up1Menu!=undefined)this.up1Menu.setObject(o);
        }


        this.setIdMatObject=function(s){            
            var p=-1;     
            if(bColor==false)return
            for (var i = 0; i < this.vuborMat.arrObj.array.length; i++) {               
                if(this.vuborMat.arrObj.array[i].id==s)p=i
            }
            this.vuborMat.index=p;
        }


        this.wPan=100
        this.sizeWidth=function(w){
            this.wPan=w;
            if(this.wPan>this.width){
                this.dCont.y=0;
                this.dCont.scale=1
                this.dCont.x=(this.wPan-this.width)/2
            }else{
                this.dCont.y=0;
                this.dCont.scale=this.wPan/this.width
                this.dCont.x=0
            }            
        }

        var b
        this.keydown=function(e){           
            if(e.keyCode==46||e.keyCode==8){
                if(self._active==true){
                    b=false
                    if(document.activeElement.style!=undefined){
                        if(document.activeElement.style.height!=undefined){
                            
                            if(document.activeElement.style.height!=""){
                                b=true;
                            }
                        }
                    }
                    
                    if(b==false){
                        if(self.object!=undefined){
                            if(self.object.aa!=undefined){
                                for (var i = 0; i < self.object.aa.length; i++) {                                    
                                    if(self.object.aa[i]=="clear"){
                                        self.object.aaSob("clear") 
                                        return;  
                                    }
                                }
                            }
                        }
                    }
                }
            }                     
        }
        window.addEventListener( 'keydown', this.keydown );
    }

    set active(v) {
        if(this._active!=v){
            this._active = v;           
            if(this._active==true){
                this.par.dCont.add(this.dCont)                
            }else{
                this.par.dCont.remove(this.dCont)               
            } 
        }
    }
    get active() { return  this._active;}


    set width(v) {
        if(this._width!=v){
            this._width = v;   
            this.panel.width=this._width;
            
        }
    }
    get width() { return  this._width;} 
}




export class Up1Menu  {
    constructor(par) {   
        var self=this       
        this.type="Up1Menu";
        this.object=undefined;
        this.par=par
        this.setObject=function(o){
              
            if(o.pppObj)
            if(o.pppObj.up1.active==true){
                this.object=o; 
                
                if(main.localStorage.object.up1==undefined){
                    main.localStorage.object.up1={}
                    main.localStorage.object.up1.sahTime=main.glaf.up1Obj.sahTime
                }
                if(main.localStorage.object.up1.sahTime<=0)return


                main.localStorage.object.up1.sahTime--;
                main.localStorage.save();
                

                self.par.par.par.mHelp.setHelp(
                    "В данном положении полки, установка перекладины невозможна",
                    "resources/image/mhelp.png",
                    this.par.dCont,
                    {x:335,y:-13-(main.glaf.up1Obj.height)}
                );
                
                /*self.par.par.par.mHelp.setIframe(
                    main.glaf.up1Obj.link,
                    main.glaf.up1Obj.width,
                    main.glaf.up1Obj.height,
                    self.par.dCont,
                    {x:135-(main.glaf.up1Obj.width/2),y:-13-(main.glaf.up1Obj.height)}
                );*/
                
               
            }else{
                if(main.localStorage.object.up1==undefined){
                    main.localStorage.object.up1={}
                    main.localStorage.object.up1.sahTime=0
                }
            }            
        }

    }
}


export class DragWHXZ  {
    constructor(par,x,y,fun) {          
        this.type="DragWHXZ";
        var self=this;
        this.par=par
        this.fun=fun;   
        this._index=-1;    
        this.dCont=new DCont(this.par.dCont);
        this.dCont.x=x;
        this.dCont.y=y;
        this.sizeFont=20
        this._width=300;

        this.input=new DInput(this.dCont,0,0,"width",function(){ 
            if(isNaN(this.value*0.1)==true)this.value=Math.round(self.object.width*10)
            self.object[this.name]=this.value*0.1 
            this.value=Math.round(self.object[this.name]*10)
            self.par.par.par.par.scane3d.room.visiActiv.setObject(self.object, false)

        })
        this.input.name="width";        
        dcmParam.styleInput(this.input)        

        this.input1=new DInput(this.dCont,0,0,"height",function(){
            if(isNaN(this.value*0.1)==true)this.value=Math.round(self.object.height*10)
            self.object[this.name]=this.value*0.1; 
            this.value=Math.round(self.object[this.name]*10)
            self.par.par.par.par.scane3d.room.visiActiv.setObject(self.object, false);
        })
        this.input1.name="height"; 
        dcmParam.styleInput(this.input1);

        this.label=new DLabel(this.dCont,0,(this.input.height-this.sizeFont)/2-2,"x",function(){

        })
        this.label.width=20
        this.label.fontSize=this.sizeFont;
        this.label.fontFamily="SFUIDisplay-Light";

        this.label1=new DLabel(this.dCont,0,(this.input.height-this.sizeFont)/2-2,"mm",function(){

        })
        this.label1.width=30;
        this.label1.fontSize=this.sizeFont;
        this.label1.fontFamily="SFUIDisplay-Light";    

        this.object=undefined;
        this.setObject=function(o){
            this.object=o;
            this.input.value=Math.round(this.object.width*10);
            this.input1.value=Math.round(this.object.height*10);            
        }

        var p
        this.drag=function(){
            p=(this.width-this.label.width-this.label1.width)/2-4;
            this.input1.width=this.input.width=p
            this.label.x=this.input.width+5
            this.input1.x=this.input.width+this.label.width
            this.label1.x=this.input1.x+this.input1.width+5
        }
        this.drag()
    }

    set width(v) {
        if(this._width!=v){
            this._width = v; 
            this.drag()
        }
    }
    get width() { return  this._width;} 
}



export class BatArr  {
    constructor(par,x,y,fun) {          
        this.type="BatArr";
        var self=this;
        this.par=par
        this.fun=fun;   
        global.batArrGlobal=this
        this._index=-1;    
        this.dCont=new DCont(this.par.dCont);
        this.dCont.x=x;
        this.dCont.y=y;
        this.sizeFont=20
        this._vusot=this.par._vusot
        this.otstup=this.par.otstup
        this._width=100;
        this.array=[];

        this.clear=function(){
            this._width=0;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible = false;
            }
        }
        var b
        this.object=undefined
        this.setObject=function(o){
            this.object=o;
            this.clear()
            
            for (var i = 0; i < this.object.aa.length; i++) {  
                b=true
                if(this.object.aa[i]=="copy")b=false;
                if(this.object.aa[i]=="clear")b=false;
                if(this.object.aa[i]=="width")b=false;
                if(this.object.aa[i]=="height")b=false;
                if(b==true)this.plus(this.object.aa[i]);
            }
            for (var i = 0; i < this.object.aa.length; i++) {
                if(this.object.aa[i]=="clear")this.plus("clear").panel.color1='#ff5555';                
            }
            if(this._width!=0)this._width-=this.otstup
        }


        this.down=function(){
            var r = self.object.aaSob(this.name)
            if(this.name=="polka"){
                if(r==false){
                    self.fun("polka", false)
                }
            }
            if(typeof r =="object"){
                                  
                self.par.par.par.mHelp.setHelp(r.text,"resources/image/mhelp.png",this.dCont,{x:24,y:-13});

            }


            self.fun("saveMod", false) 
        }

        this.plus=function(s){
            var p=-1;
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].name==s){
                    p=i;
                    break;
                }
            }
            if(p==-1){
                var xp=new DButSim(this.dCont,0,0," ",this.down,"resources/image/a_"+s+".png")
                xp.name=s
                xp.borderRadius=111;
                xp.boolLine=false;
                xp.width=this._vusot; 
                xp.height=this._vusot;
                xp.color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10); 
                p=this.array.length;
                this.array.push(xp);
            }            
            this.array[p].visible=true;
            this.array[p].x=this._width
            this._width+=this._vusot+this.otstup;
            return this.array[p]
        }
    }

    set width(v) {
        if(this._width!=v){
            this._width = v;
        }
    }
    get width() { return  this._width;} 
}


//обработка хлавных методов
export class NMGalf  {
    constructor(par, fun) {          
        this.type="NMGalf";
        var self=this;
        this.par=par
        this.fun=fun
        this._active=false;
        this.dCont=new DCont();
        this.mani=this.par.par.mani
        this.room=this.par.par.par.scane3d.room;

        this._width=400;
        this.widthBig=this.par.widthBig;
        this.otstup=this.par.otstup;
        this._sahMenu=this.par._sahMenu;
        this._vusot=this.par._vusot;

        this.panel = new DPanel(this.dCont,0,0);        
        this.panel.height=this._vusot+this.otstup*1.7;       
        this.panel.div.style.borderRadius = this._vusot+"px";



        var ot=this.otstup;
        var xx=ot
        var  bb=new DButSim(this.dCont,xx,this.otstup," ",function(){            
            self.room.par.bactive=false;            
        },"resources/image/www.png",)
        bb.borderRadius=111;
        bb.boolLine=false;
        bb.idArr=i;
        bb.width=this._vusot; 
        bb.height=this._vusot;           
        bb.color="#e2e7ed";           
        bb.boolLine=false;
        bb.color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10); 

        xx+=this._vusot+this.otstup

        this.vuborMat = new VuborMat(this,xx,this.otstup,"resources/data/"+this.par.par.par.par.objectBase.three[2].array[0].id+"/yoriginal.png",this.par.par.par.par.objectBase.three[2].array[0],function(){
            self.room.idSten=this.arrObj.array[this.index].id
            self.room.par.tudaSuda.saveMod();
        });
        xx+=this._vusot*2+this.otstup    

        this.vuborMat1 = new VuborMat(this,xx,this.otstup,"resources/data/"+this.par.par.par.par.objectBase.three[2].array[1].id+"/yoriginal.png",this.par.par.par.par.objectBase.three[2].array[1],function(){
            
            self.room.niz.idMat=this.arrObj.array[this.index].id
            self.room.par.tudaSuda.saveMod()
        });
        xx+=this._vusot+this.otstup
            
        this.image = new DImage(this.dCont,xx+35+this._vusot, this.otstup,"resources/image/x13.png",function(){
            this.width=this.picWidth; // реальные размеры картинки
            this.height=this.picHeight;
        }); 

        xx+=this._vusot

        this.but2Link=new DButSim(this.dCont,xx,this.otstup," ",function(){
            self.room.menedsher.menedsherObject.visiMark=!self.room.menedsher.menedsherObject.visiMark
            if(self.room.menedsher.menedsherObject.visiMark==false){
                this.image.alpha=0.25;
            }else{
                this.image.alpha=1;
            }
            self.room.par.tudaSuda.saveMod();
        },"resources/image/x11.png")
        this.but2Link.borderRadius=111;
        this.but2Link.boolLine=false;
        this.but2Link.width=this._vusot; 
        this.but2Link.height=this._vusot;
        this.but2Link.color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10);  
        this.but2Link.image.alpha=0.25

        xx+=this._vusot+this.otstup+15;


        this.setIdMat=function(s){ 
            var p=-1;     
            for (var i = 0; i < this.vuborMat.arrObj.array.length; i++) {               
                if(this.vuborMat.arrObj.array[i].id==s)p=i
            }
            this.vuborMat.index=p;
        }

        this.setIdNiz=function(s){  
            var p=-1;     
            for (var i = 0; i < this.vuborMat1.arrObj.array.length; i++) {               
                if(this.vuborMat1.arrObj.array[i].id==s)p=i
            }
            this.vuborMat1.index=p;
        }

        this.down=function(b){
            if(this.alpha!=1)return  

            if(this.idArr==0){//спецификация  
                self.par.plusMM.active=true;                 
                return; 
            } 
            if(this.idArr==1){//спецификация 
                self.par.par.menuActiv(true, 500, false);
                self.par.setObject(1)
                self.par.par.par.webCamera.active=true
                //self.par.par.par.webCamera.active=!self.par.par.par.webCamera.active;
                
            } 
        }

        this.arrBut=[]
        this.wh=this._vusot
        var ooo=this.otstup
        var bb
        var p=0;
        var p1=this.otstup;
        var  hhh= 1
        if(dcmParam.mobile==true)
            hhh=2;       
        
        for (var i = 0; i < hhh; i++) {
            var ll="resources/image/w6.png"
            if(i==1)ll="resources/image/w7.png"
            bb=new DButSim(this.dCont,xx+p,p1," ",this.down,ll)
            bb.borderRadius=111;
            bb.boolLine=false;
            bb.idArr=i;
            bb.width=this.wh; 
            bb.height=this.wh;           
            bb.color="#e2e7ed";           
            bb.boolLine=false;
            bb.color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10); 

            p+=this.wh+ooo;
            this.arrBut.push(bb);
        }

        var tsc= this.par.par.par.scane3d.tudaSuda
        this.dCont.add(tsc.dCont);
        tsc.dCont.x=xx+p;
        xx=xx+p+tsc.www;

        this.wPan=100
        this.sizeWidth=function(w){
            this.wPan=w;
            if(this.wPan>this.width){
                this.dCont.y=0;
                this.dCont.scale=1
                this.dCont.x=(this.wPan-this.width)/2
            }else{
                this.dCont.y=0;
                this.dCont.scale=this.wPan/this.width
                this.dCont.x=0
            }            
        }
        this.width=xx-ooo+ot
    }

    set width(v) {
        if(this._width!=v){
            this._width = v;   
            this.panel.width=this._width;            
        }
    }
    get width() { return  this._width;} 

    set active(v) {
        if(this._active!=v){
            this._active = v;           
            if(this._active==true){
                this.par.dCont.add(this.dCont)                
            }else{
                this.par.dCont.remove(this.dCont)               
            } 
        }
    }
    get active() { return  this._active;}
}



//меню для принскринов
export class FotoMenu{
    constructor(par) {          
        this.type="FotoMenu";
        var self=this;
        this.par=par
        this._active=false;
        this.dCont=new DCont();

        this.panel=new DPanel(this.dCont,0,0)
        this.panel.alpha=0.85
        this.panel.color1="#000000"
        this.sah=1
        this.panel.div.addEventListener("mousedown",function(){
            self.sah++;         
            if(dcmParam.mobile==true){
                if(self.sah==2){
                    self.active=false;  
                }  
            }  
            else{
                self.active=false;   
            }       
        })       

        this.window=new DWindowS(this.dCont,0,0,"СНИМОК ЭКРАНА",function(){
            self.active=false 
        },'resources/image/kross.png')

        this.window.hasMinimizeButton=false
        this.window.dragBool=false;

        this.image = new DImage(this.window.content,0, 0,null,function(){            
            this.width=this.picWidth; 
            this.height=this.picHeight;
            self.sizeWindow(self.width*1, self.height*1, self.scale*1)     
        });

        this.batSave = new DButSim(this.window,50, this.window.otstupVerh-2,"",function(){  
            self.dragLogo(self.image.link,function(s){
                
                var down = document.createElement('a');
                down.href = s;
                down.download = 'pic.png';
                down.click();

            })
            
        },"resources/image/x14.png");

        this.batSave.funLoadImag=function(){  
            this.width=this.image.picWidth;
            this.height=this.image.picHeight;
        }

        this.batSave.alphaTeni=0
        this.batSave.boolLine=false;
        this.batSave.panel.visible=false       

        this.setFoto=function(base64){            
            this.image.link=base64;
            this.active=true;
        } 


        this.bmpLogo
        this.bmpPic=new DBitmapData(2,2,undefined,function(){
            self.dragLogo2()
        }) 

        this.dragFun
        this.dragLogo=function(base64, fun){  
            this.dragFun = fun
            if(this.bmpLogo==undefined){
                this.bmpLogo=new DBitmapData(2,2,undefined,function(){                    
                    self.bmpPic.load(base64, true)
                })
                this.bmpLogo.load("resources/image/x15.png", true)                 
            }else{
                self.bmpPic.load(base64, true)
            }
        }

        var xx,yy,col,col1,a,ccc,p
        this.dragLogo2=function(){
            ccc=[0,0,0,0]
            if(this.bmpLogo.width<this.bmpPic.width){
                if(this.bmpLogo.height<this.bmpPic.height){
                    xx=this.bmpPic.width-this.bmpLogo.width;
                    yy=this.bmpPic.height-this.bmpLogo.height;

                    for (var i = 0; i < this.bmpLogo.width; i++) {
                        for (var j = 0; j < this.bmpLogo.height; j++) {
                            col=this.bmpLogo.getPixel(i,j)
                            col1=this.bmpPic.getPixel(xx+i,yy+j)
                            if(col[3]==0){

                            }else{
                                p=col[3]/255
                                a=col[3]
                                if(col1[3]>a)a= col1[3];
                                ccc[0]=col[0]*p+col1[0]*(1-p);
                                ccc[1]=col[1]*p+col1[1]*(1-p);
                                ccc[2]=col[2]*p+col1[2]*(1-p);
                                ccc[3]=a;
                                this.bmpPic.setPixel(xx+i,yy+j,ccc)
                            }
                        }
                    } 
                    this.bmpPic.upDate()
                    self.dragFun(this.bmpPic.getData())
                }   
            }
        }  


        this.width=100;
        this.height=100;
        this.scale=100;
        this.sizeWindow=function(w,h,s){
            this.width=w;
            this.height=h;
            this.scale=s;
            if(this._active==true){
                this.panel.width=w/s;
                this.panel.height=h/s;
                this.image.width=this.image.picWidth*0.5/s;
                this.image.height=this.image.picHeight*0.5/s;
                this.window.width=this.image.width+this.window.otstup*2;
                this.window.height=this.image.height+this.window.otstup+this.window.otstupVerh;
                this.window.x=(w/s-this.window.width)/2;
                this.window.y=(h/s-this.window.height)/2;
            }
        } 
    }

    set active(v) {
        if(this._active!=v){
            this._active = v;                 
            if(this._active==true){
                this.sah=0;
                this.par.par.par.dContNad.add(this.dCont) 
                this.sizeWindow(this.width*1, this.height*1, this.scale*1)               
            }else{             
                this.par.par.par.dContNad.remove(this.dCont)               
            } 
        }
    }
    get active() { return  this._active;}
}