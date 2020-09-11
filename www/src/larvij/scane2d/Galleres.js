
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.



галереи с лева
*/

export class Galleres  {
  	constructor(glaf, fun) {  		
  		this.type="Galleres";
  		var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";   
        this.par=glaf;
        this.fun=fun;
  		this.dC=new DCont(glaf.dCont);
        this.dCont=new DCont();
        this.dC.add(this.dCont);
        this._colorBool=false;
        this.verhH=0;
        this.dC.y=this.verhH
        this.widthBig=172//glaf.widthBig;
        this.otstup=glaf.otstup;
        this._sahMenu=glaf._sahMenu;
        this._scale=1
        this._index = -1;
        this.object=null;
        this.objectBase=glaf.main.objectBase;
        this._width=100
        this._height=100
        this._boolFinDrag=false
        this.array=undefined
        this.gallery
        this.indexOld2=0
        var oo;
        this.boolScale=false;

        this.linkF="original.png"//"256.png"//

        if(tStyle.glaf.debug==true){
            this.linkF="256.png"//
            this.boolScale=true;
        }


        this.clik111=function(){

        }

        this.drag111=function(){    
            var o=self.gallery[0];           
            var l=self.getLink(o.obj)
            self.par.dragPic.start(32, l, o);            
            self.fun("startObj", o);
        }
        this.clik1=function(){
                    
        }
        this.drag1=function(){                           
            oo=self.gallery.array[self.gallery.index].object;
          
            if(oo.obj)if(oo.obj.title){
                if(oo.obj.title=="niz"){//замена на пол                    
                    self.fun("idNiz", oo.id);
                    
                    return
                }               
                if(oo.obj.title=="sten"){//замена на пол
                    self.fun("idSten", oo.id); 
                    
                    return
                }
            } 
            
            var o=self.gallery.array[self.gallery.index].object;
            var l=self.getLink(o.obj)
            self.par.dragPic.start(32, l, o);            
            self.fun("startObj", o);
        }

        this.clik2=function(){            
            self.indexOld2=self.gallery.index
            self.fun("idColor", self.gallery.array[self.gallery.index].object.id);                     
        }
        this.drag2=function(){                            
            var o=self.gallery.array[self.gallery.index].object;
            var l=self.par.resursData+""+o.id+this.linkF;            
            self.par.dragPic.start(32, l, o);  
            self.gallery.index=self.indexOld2;             
        }


        this.openG2=function(){
            if(this.array[3].visible==false){ 
                var y=this.array[1].y;
                y+=this.array[1].content.y+this.array[1].array[this.array[1].index].y                
                self.openGal(y,this.array[1].array[this.array[1].index].object.array)               
            }else{
                this.array[3].visible=false;
                self.boolFinDrag=false;
            }
        }


        this.getLink=function(o){
            var r="resources/data/"+o.id+"/100.png"
            if(o.resurs)if(o.resurs.array)if(o.resurs.array.length!=0){
                
                for (var i = 0; i < o.resurs.array.length; i++) {
                    if(o.resurs.array[i].b!=undefined){                        
                        if(o.resurs.array[i].i=="icon"){
                            r="resources/data/"+o.id+"/resources/"+o.resurs.array[i].name;
                            break;
                        }
                    }
                }
            }
            return r
        }

        this.tween = new TWEEN.Tween(this.dC);
        this.dC.x=-260
        this.menuActiv=function(bool, time){ 
            var xx=0;
            if(bool==true) xx=-260
            this.tween.stop();    
            this.tween.to({x:xx},time).start();
        }


        this.down=function(){                     
            if(this.idArr==0){
                self.index=this.index;
                self.array[3].visible=false;
                self.boolFinDrag=false;
            }
            if(this.idArr==1){
                if(this.array[this.index].object.array.length!=0){
                    self.gallery=this.array[this.index].object.array;
                    self.par.dragPic.testDrag(15, self.clik111, self.drag111); 
                    if(dcmParam.mobile==true)self.openG2()                        
                    return;
                }  

                self.gallery=this;
                self.par.dragPic.testDrag(15, self.clik1, self.drag1);  
                self.array[3].visible=false;                
                self.boolFinDrag=false;
            }

            if(this.idArr==2){
                self.gallery=this;
                self.par.dragPic.testDrag(15, self.clik2, self.drag2);  
                self.array[3].visible=false;  
                self.boolFinDrag=false;           
            }

            if(this.idArr==3){                
                self.gallery=this;
                self.drag1() 
                self.boolFinDrag=false;
                self.array[3].visible=false;
            }
        }


        var bbbb;
        this.overXZ=function(){ 
            if(this.object==undefined)return       
            bbbb=false;
            if(this.object.array.length!=0)bbbb=true;            
            if(bbbb==false){                
                self.array[3].visible=false;
                self.boolFinDrag=false;
            }else{               
                var y=self.array[1].y;
                y+=self.array[1].content.y+this.y 
                                       
                self.openGal(y,this.object.array)
            }
            for (var i = 0; i < self.array1Bat.length; i++) {
                if(this.idArr!=self.array1Bat[i].idArr){
                    self.array1Bat[i].finalColor()
                }                
            }
        }


        this.openGal=function(y,a){ 
            self.array[3].visible=true;            
            self.array[3].start(a)

            self.array[3].y=y; 
            self.array[3].height = self.array[3].scrollBarV.heightContent;
            if(y+self.array[3].height>self._height/self._scale){
                self.array[3].y=self._height/self._scale-self.array[3].height; 
                if(self.array[3].y<0)self.array[3].y=0;
            }
            self.boolFinDrag=true;
        }

       
        this.otrezatBool=function(ooo){
            if(ooo.array!=undefined && ooo.array.length){

                for (var i = ooo.array.length-1; i >=0 ; i--) {
                    let bbtb=false    
                    if(ooo.array[i].bool==undefined)ooo.array[i].bool=true 
                    if(ooo.array[i].bool==false)bbtb=true
                    if(bbtb==true){
                        ooo.array.splice(i,1)
                    }else{
                        this.otrezatBool(ooo.array[i])
                    }

                      
                }

            }
        }


        this.arrayBD=[]
        this.array1Bat=[]
        //this.wh0=60 
        this.init=function(){
            if(this.array!=undefined)return;
            this.array=[]


            //0 главная ветка 
            this.otrezatBool(this.objectBase.three[0])
            this.arrayBD=this.objectBase.three[0].array; 

           /* var a=[]
            for (var i = 0; i < aa.length; i++) {
                if(aa[i].bool==undefined)aa[i].bool=true                
                if(aa[i].bool==true){ 
                    a.push(aa[i]);
                }                
            }
            this.arrayBD=a */          
            if(this.arrayBD.length==0)return



            var b=true            
            for (var i = 0; i < 4; i++) {
                b=true
                this.array[i]=new GalleryXZ(this.dCont,0,0,this.down)
                this.array[i].idArr=i;
            }
            


            this.array[0].kolII=1;
            this.array[0].widthPic=75+2;
            this.array[0].heightPic=75+2;
            this.array[0].width=this.otstup*2+77;
            this.array[0].height=this.otstup+(77+this.otstup)*this.arrayBD.length;
            this.array[0].x=this.widthBig;
            this.array[0].y=-this.otstup;
            this.array[0].otstup=this.otstup; 
            this.array[0].finalLink=this.linkF
            this.array[0].boolScale=this.boolScale;
            this.array[0].start(this.arrayBD); 
            this.array[0].panel.visible=false

            //1 подветка            
            this.array[1].kolII=1;
            this.array[1].widthPic=this.widthBig;
            this.array[1].heightPic=this.widthBig;
            this.array[1].width=this.widthBig;
            this.array[1].height=this.widthBig;
            this.array[1].x=0;
            this.array[1].y=this.otstup+100;
            this.array[1].boolPositScrol=false
            this.array[1].scrollBarV.alpha=0.5
            this.array[1].finalLink=this.linkF;
            this.array[1].whPic=128;
            this.array[1].otstup=0;
            this.array[1].intText=1;
            this.array[1].funOver=this.overXZ;
            this.array[1].bLink="resources/image/x8.png";
            this.array[1].bLink1="resources/image/x9.png";
            this.array[1].boolScale=this.boolScale;
            this.array[1].bmd=true
            this.array[1].color="#e2e7ed"
            this.array[1].color1="#e2e7ed"
            this.array[1].color_1="#DCF1FA"
            this.array[1].color1_1="#DCF1FA"

            this.array[1].funDragOwer=function(box){               
                self.array1Bat.push(box)
            };
            this.array[2].panel.visible=false
            this.array[2].visible=false;


            this.index=0;




            //выподание группы
            this.array[3].kolII=2;
            this.array[3].widthPic=122;
            this.array[3].heightPic=122;
            this.array[3].width=(122+this.otstup*4)*2;
            this.array[3].height=122*2+this.otstup*3;
            //this.array[3].panelBool = true;
            this.array[3].visible=false;
            this.array[3].boolPositScrol=false;
            this.array[3].scrollBarV.alpha=0.5;
            this.array[3].whPic=128;
            this.array[3].otstup=this.otstup;
            this.array[3].finalLink=this.linkF
            this.array[3].intText=2;
            this.array[3].otstupBlok=0;  
            this.array[3].x=self.widthBig;
            this.array[3].boolScale=this.boolScale;
            this.array[3].cursor='pointer';

            this.array[3].color="#c7edfc";
            this.array[3].color1="#c7edfc";
            this.array[3].color1_1="#DCF1FA";
            this.array[3].panel.visible=false;
        }

        

        this.reDrag = function(){
            if(this.array.length==0) return 
            if(this._colorBool==true){
                this.array[1].y=-this.otstup;
            }else{               
                this.array[1].y=-this.otstup;
            }

            var hh=this._height/this._scale-this.verhH-this.array[1].y//-this.otstup;
            if(hh>this.array[1].scrollBarV.heightContent)hh=this.array[1].scrollBarV.heightContent
            this.array[1].height=hh;
        }


       
        var sp, xx, yy, bb
        this.mmmm = function(e){ 
            if(dcmParam.mobile==false){
                if(sp==undefined){
                    sp={
                        x:e.clientX,
                        y:e.clientY,
                        x1:self.xx,
                        y1:self.yy
                    };
                    self.fun("start") 
                }                      
                xx=e.clientX;                       
                yy=e.clientY;                
            }
            bb=false;
            
            if(xx>(self.widthBig+self.array[3].width)*self._scale){
                bb=true;                
            }
            if(yy<self.array[3].y*self._scale){
                bb=true;                
            }
            if(yy>(self.array[3].y+170)*self._scale)
            if(yy>(self.array[3].y+self.array[3].height)*self._scale){
                bb=true;                
            }
            if(bb==true){
                self.boolFinDrag=false
                self.array[3].visible=false;
                for (var i = 0; i < self.array1Bat.length; i++) {
                    self.array1Bat[i].finalColor()
                }
                self.array1Bat=[]
            }
        }


        this.funFinDrag = function(){             
            if(this._boolFinDrag==true){
                document.addEventListener("mousemove", self.mmmm);
            }else{
                document.removeEventListener("mousemove", self.mmmm);
            }
        } 


  		this.sizeWindow = function(w,h,s){  
         	this._width=w;
            this._height=h;	
            this._scale=s;           
            this.reDrag();
		} 

        this.init(); 			
  	}



    set boolFinDrag(value) {
        if(this._boolFinDrag!=value){
            this._boolFinDrag = value;
            
            this.funFinDrag();
        }
    }
    get boolFinDrag() { return  this._boolFinDrag;}


    set colorBool(value) {
        if(this._colorBool!=value){
            this._colorBool = value;
            this.reDrag();
        }
    }
    get colorBool() { return  this._colorBool;}


    set index(value) {
        if(this._index!=value){
            this._index = value;
            this.object=null;            
            for (var i = 0; i < this.arrayBD.length; i++) {
                if(i==this._index){
                    this.object=this.arrayBD[i];
                    break;
                }
            }
            this._colorBool = true;
            this.array[0].index=this._index;



            this.array[1].start(this.object.array);
            this.reDrag();
        }
    }
    get index() { return  this._index;}
}



//достроеный класс галерий
export class GalleryXZ extends DGallery {
    constructor(dCont, x, y, fun) { 
        super();         
        this.indexOld=-1;
        this.whPic=64;
        this.finalLink="64.png"
        this.type="GalleryXZ";
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);
        var self=this;
        this.fun=fun;
        this.intText=0;
        this.otstupBlok=undefined
        this.panelH=0;

        this._bLink=null;
        this._bLink1=null;

        this.but=null;
        this.but1=null;
        this.boolScale=true
        this.cursor =null;

        this.color_1=null; 
        this.color1_1=null;  

        this.funDragOwer=undefined
        this.object=undefined;

        // Функция клика по иконке
        this.downBtn = function () {            
            self.index = this.idArr;
            self.obj = self.array[this.idArr].object;
            if (self.fun) self.fun();
        };

        this.createZamen=function(){ 
            var r=new BoxXZ(this.content, 0, 0, this.downBtn, this.intText, this);  
            r.whPic=this.whPic; 
            r.finalLink=this.finalLink       
            return r
        }

        this.postDraw=function(){
            if(this.but!=null)  {                
                this.but.visible=this.scrollBarV.visible;
            }  
            if(this.but1!=null)  {                
                this.but1.visible=this.scrollBarV.visible;
                this.but1.y=this.height-this.but1.height;
            } 
        }
        this.tween = new TWEEN.Tween(this.content);


        this.bf=function(){
            var v= self.content.y
            if(this.idArr==0)v+=self.heightPic
            if(this.idArr==1)v-=self.heightPic   
            //if(v>1)v=1
            if(v>0)v=0
            var vv=self.height-self.scrollBarV.heightContent
                 
            if(v<vv)v=vv

            self.tween.to({y:v},500).start();
        }
        this.loadPPP=function(){ 
            this.height=this.image.picHeight*(self.width/this.image.picWidth)
            self.draw()
        }

        var bat
        // новый массив обьектов
        this.start = function (_array) {
            
            this.clear();
            this.arrayObj = _array;
            for (var i = 0; i < this.arrayObj.length; i++) {
                bat = this.createDrawBox(this.arrayObj[i]);
                bat.visible = true;
                bat.object11 = this.arrayObj[i];
                bat.idArr = this.array.length;
                this.array.push(bat);
            }
            this.draw();
            if (this.array.length != 0) {
                self.sahLoad = 0;
                this.sahRendom = Math.round(Math.random() * 10000);
                self.array[self.sahLoad].sahRendom = this.sahRendom * 1;
                this.funLoad();
            }
            
        };

        this.div.removeEventListener('mousewheel', this.mousewheel)

        // прокрутка колесом мышки
        var hhh, www;
        this.mousewheel = function (e) {
            
            if (self.kolII <= self.array.length) {
                hhh = (self.heightPic + self.otstup) * (Math.ceil(self.array.length / self.kolII)) - self._height;
                www = (self.widthPic + self.otstup) * self.kolII - self._width;
            } else {
                hhh = self.heightPic + self.otstup - self._height;
                www = (self.widthPic + self.otstup) * self.array.length - self._width;
            }

            /*var p=e.deltaY*-1;
            if(e.wheelDelta!=undefined){
                if(e.wheelDelta>0)p=1;
                else p=-1;
            }*/

            var delta=-1;
            var p=e.delta
            if(e.wheelDelta==undefined){
                p=e.wheelDelta
            }

            if(e.delta)if(e.delta<0)delta=1;
            if(e.deltaY)if(e.deltaY<0)delta=1;
            if(e.detail)if(e.detail<0)delta=1;

            
            if(e.wheelDelta!=undefined){
                if(e.wheelDelta>0)delta=-1;
                else delta=1;
            }


            p=delta;
            if(e.detail!=0)p*=-1;




            if (self.scrollBarV.visible) {
                if (p < 0) {
                    if (self.content.y >= 0) {
                        self.content.y = 0;
                        //self.scrollBarV.value = 0;
                    } else {
                        //self.scrollBarV.value -= self.sahDelta;
                        self.content.y += self.sahDelta;
                    }
                } else {
                    if (self.content.y <= -(hhh + self.otstup)) {
                        self.content.y = -(hhh + self.otstup);
                        //self.scrollBarV.value = hhh;
                    } else {
                        //self.scrollBarV.value += self.sahDelta;
                        self.content.y -= self.sahDelta;
                    }

                }

                //
            } else if (self.scrollBarH.visible) {
                if (p < 0) {
                    if (self.content.x >= 0) {
                        self.content.x = 0;
                        //self.scrollBarH.value = 0;
                    } else {
                        //self.scrollBarH.value -= self.sahDelta;
                        self.content.x += self.sahDelta;
                    }
                } else {
                    if (self.content.x <= -(www + self.otstup)) {
                        self.content.x = -(www + self.otstup);
                        //self.scrollBarH.value = www;
                    } else {
                        //self.scrollBarH.value += self.sahDelta;
                        self.content.x -= self.sahDelta;
                    }
                }
            }
            //self.koreckScrol();
            self.scrolPos(true)
            self.dragIE();
        };
        this.div.removeEventListener('mousewheel', this.mousewheel)
        this.div.addEventListener('mousewheel', this.mousewheel)
        this.div.addEventListener("DOMMouseScroll", this.mousewheel);
        
    }

    set bLink(value) {      
        if (this._bLink == value) return;      
        this._bLink = value;
      
        this.but=new DButton(this.content1,0,0," ",this.bf,this._bLink)
        this.but.funLoadImag=this.loadPPP;
        this.but.width=this.width-this.otstup*2;
        this.but.idArr=0
     
        this.but.boolFond=false;


    }
    get bLink() { return  this._bLink;}  


    set bLink1(value) {      
        if (this._bLink1 == value) return;      
        this._bLink1 = value;
        this.but1=new DButton(this.content1,0,0," ",this.bf,this._bLink1)
        this.but1.funLoadImag=this.loadPPP;
        this.but1.width=this.width-this.otstup*2;
        this.but1.idArr=1
        this.but1.boolFond=false;

    }
    get bLink1() { return  this._bLink1;}  


    set index(value) {
        if (this.array[value] != undefined) {
            this.korektPoIndex(value);
        }
        if (this._index == value) return;
        this.indexOld = this._index;
        this._index = value;

        for (var i = 0; i < this.array.length; i++) {
            if (this._index == i) this.array[i].activ = true;
            else this.array[i].activ = false;
        }       
    }
    get index() { return  this._index;}

}






export function BoxXZ(_cont, _x, _y, _fun,_intText, par) {
    DBox.call(this, _cont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self = this;
    this.whPic=64; 
    this.finalLink="64.png"   
    this.doLink="resources/data/";
    var b;
    this.par=par
    this.intText=_intText;
    this.otstup=this.par.otstup;
    this.panelH=this.par.panelH;
    this.color1=this.par.color1; 

    this.color_1=this.par.color_1; 
    this.color1_1=this.par.color1_1; 

    this.funDragOwer=this.par.funDragOwer

    this.cursor  =this.par.cursor; 
    if(this.par.otstupBlok!=undefined){
        this.otstup=this.par.otstupBlok        
    }


    this.boolScale=this.par.boolScale

    this.pPlus=undefined
    if(this.panelH!=0){
        this.pPlus = new DPanel(this.content, 0, this.height-this.panelH);
        this.pPlus.boolLine=false;
        this.pPlus.height = this.panelH+2;
        this.pPlus.width = this._width+4;

        //this.content.remove(this.image);
        //this.content.add(this.image);
        this.pPlus.visible= this._activ
        this.panel.alpha=0
        this.pPlus.color1=this.par.color
    }

    if(this.cursor!=null){
        this.panel.div.style.cursor=this.cursor
        this.image.div.style.cursor=this.cursor
        if(this.pPlus)this.pPlus.div.style.cursor=this.cursor
    }

    if(this._activ==false){
        this.panel.color1=this.color1
    }


    this.panel.boolLine=false




    this.aLabel=[]
    for (var i = 0; i < this.intText; i++) {
        this.aLabel[i]= new DLabel(this.content, 0, 2+12*i, '');
        //this.aLabel[i].width=200;
        this.aLabel[i].div.style.pointerEvents="none"; 
        this.aLabel[i].fontSize=11; 
        this.aLabel[i].fontFamily="SFUIDisplay-Light";
        this.aLabel[i].textAlign="center";
    }

    var ww, oo
    this.dtahLoadText = function () {
        if(this.intText==1){
            this.aLabel[0].visible=false;
            if(this.object.obj)
                if(this.object.obj.plus) {                
                this.aLabel[0].visible=true;
                this.aLabel[0].text=this.object.obj.plus[1]
                oo=this.aLabel[0].getRect();
                this.aLabel[0].x=(this.width-oo.width)/2
                this.aLabel[0].y=this.height-5-oo.height-5;
            }            
        }
        if(this.intText==2){
            this.aLabel[0].visible=false;
            if(this.object.obj)
                if(this.object.obj.plus) {                
                this.aLabel[0].visible=true;
                this.aLabel[0].text=this.object.obj.plus[1]+"\n"+this.object.obj.plus[2]
                oo=this.aLabel[0].getRect();
                this.aLabel[0].x=(this.width-oo.width)/2
                this.aLabel[0].y=this.height-5-oo.height-5;
            }            
        }

    }

    
    this.sahXZ1=0
    var ss, hh ;
    this.draw = function () {
        ss = (this._width - this._otstup * 2) / this.image.picWidth;
        hh=this._height-this.panelH
        if(this.panelH!=0)hh-=2
        if (ss > (hh - this._otstup * 2) / this.image.picHeight)ss = (hh- this._otstup * 2) / this.image.picHeight;
        if(this.boolScale==true){
            this.image.x = 0;
            this.image.width=this.image.picWidth*ss;
            this.image.height=this.image.picHeight*ss;        
            this.image.x = (this._width - this.image.picWidth * ss) / 2;
            this.image.y = (this._height - this.image.picHeight * ss) / 2;
            if(this.panelH!=0)this.image.y=this.otstup

        }else{            
            this.image.width=this.image.picWidth;
            this.image.height=this.image.picHeight;        
            this.image.x = 0
            this.image.y = 0
        }
        this.sahXZ1=1  
        this.label.x = (this._width - this.label.curW) / 2;
        this.label.y = this._height - this.label.curH - this._otstup;
        if (this.postDraw) this.postDraw();
    };



    var b,link;
    // Добавление картинки и текста, пошаговая загрузка.
    this.startLoad = function (_obj) {  
        if(this.object!=undefined) {
            self.funLoad();
            return   
        }  

        this.object = _obj;
        link=this.doLink+_obj.id+"/"+this.finalLink;

        if(this.intText!=0){
            for (var i = 0; i < this.intText; i++) {
                this.aLabel[i].visible=false;
            }                     
        }
        
        if(this.object.obj==undefined){
           $.ajax({
                url: this.doLink+_obj.id+"/config.json",
                success: function function_name(data) {                         
                    if(typeof data === "string") {
                        var conf = JSON.parse(data)
                        self.object.obj = conf;
                    } else self.object.obj = data; 
                    self.dtahLoadText()
                },
                error:function function_name(data) {
                    trace("Что то случилось с конфигом")
                }
            });
        }else{
            self.dtahLoadText()
        }
       
        this.image.visible = true;
        if (this.image.link == link) {
            if (self.funLoad) self.funLoad();
        } else {
            this.image.width = 100;
            this.image.height = 100;
            this.image.link = link;
        }
        this.draw();
    };

    if(dcmParam.mobile==false){
        this.panel.div.removeEventListener("mouseout", this.mouseOut);
        this.image.image.removeEventListener("mouseout", this.mouseOut);

        this.panel.div.removeEventListener("mouseover", this.mouseOver);
        this.image.image.removeEventListener("mouseover", this.mouseOver);
    }

    this.mouseOver = function (e) {        
        self.boolOut = false;
        if(self._activ==false){
            if(self.color1_1==null)self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color1), -30);
            else self.panel.color1=self.color1_1
        }
        else {
            if(self.color_1==null)self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color), -30);
            else self.panel.color1=self.color_1
        }               
        if (self.funOver) self.funOver(this);
    };

    this.mouseOut = function (e) {        
        if(self.funDragOwer!=undefined) {
            self.funDragOwer(self);
            return
        }
        self.finalColor() 
        if (self.funOut) self.funOut(this);
    }


    this.finalColor = function () {        
        if(self._activ==false)self.panel.color1=self._color1;
        else self.panel.color1=self._color;
    }


    if(dcmParam.mobile==false){
        this.panel.div.addEventListener("mouseout", this.mouseOut);
        this.image.image.addEventListener("mouseout", this.mouseOut);

        this.panel.div.addEventListener("mouseover", this.mouseOver);
        this.image.image.addEventListener("mouseover", this.mouseOver);
    }

}
BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;
Object.defineProperties(BoxXZ.prototype, {
    activ: { // активный элемент
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value;
            if(this._activ==false)this.panel.color1=this._color1;
            else this.panel.color1=this._color;

            if(this.pPlus){
                if(this._activ==false)this.pPlus.visible=false
                else  this.pPlus.visible=true   
            }

        },
        get: function () {
            return this._activ;
        }
    },
    color: { // цвет обводки
        set: function (value) {
            if (this._color == value) return;
            this._color = value;
            this.draw();

        },
        get: function () {
            return this._color;
        }
    },  
    color1: { // цвет актива
        set: function (value) {
            if (this._color1 == value) return;
            this._color1 = value;
            
        },
        get: function () {
            return this._color1;
        }
    },
    lineSize: { // ширина обводки
        set: function (value) {
            if (this._lineSize == value) return;
            this._lineSize = value;
            this.draw();

        },
        get: function () {
            return this._lineSize;
        }
    },
    otstup: { // Отступ
        set: function (value) {
            if (this._otstup == value) return;
            this._otstup = value;
            this.draw();
        },
        get: function () {
            return this._otstup;
        }
    },
    width: { // ширина элемента
        set: function (value) {
            if (this._width == value) return;
            this._width = value;
            this.panel.width = this._width+2;
            if(this.pPlus)this.pPlus.width = this._width+2;
            this.draw();
        },
        get: function () {
            return this._width;
        }
    },
    height: { // высота элемента
        set: function (value) {
            if (this._height == value) return;
            this._height = value;
            this.panel.height = this._height+2;
            if(this.pPlus){
               // this.pPlus.height = this.panelH;
                this.pPlus.y=this._height-this.panelH
            }
            this.draw();
        },
        get: function () {
            return this._height;
        }
    }
});








