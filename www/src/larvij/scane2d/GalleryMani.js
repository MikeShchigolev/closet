/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

галерея с баблом
*/



export class GalleryMani extends DGallery {
    constructor(dCont, x, y, fun) { 
        super();         
        this.simvol ="sdf"
        this._color = dcmParam.color;
        this._color1 = dcmParam.color;
        this._prosentH=0;

        this.whPic=128;
        this.type="GalleryMani";
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);
        var self=this;
        this.fun=fun;
        dcmParam.addFunNotActivDiv(this.div)

        this.aCol=[]
        this.setManiOArr=function(a){
            //return
            if( main.localStorage.object.dubag==false)return
            this.aCol=a    
            this.redragColor(a)
        }

        let _cAct1 = "#acdaec";
        let _cAct2 = '#5b9db8';

        let bbb=false
        var a=[];
        let maxPri=0
        let idPri=0
        this.redragColor=function(a){
           
            maxPri=-1;
            idPri=-1;    
            for (var i = 0; i < this.array.length; i++) {
                bbb=false;
                for (var j = 0; j < a.length; j++) {
                    
                    if(!bbb&&this.array[i].object11 &&this.array[i].object11.aText[8].id==a[j][8].id ){
                       
                        bbb=true;
                        if(maxPri==-1){
                            if(a[j][8].priority){
                                maxPri=a[j][8].priority
                            }
                            maxPri=0
                            idPri=i
                            continue;
                        }
                        if(a[j][8].priority){
                            if(maxPri<a[j][8].priority){
                                maxPri=a[j][8].priority
                                idPri=i
                            }
                        }
                    }
                }
                if(bbb==false)this.array[i].setColor(this._color)
                else this.array[i].setColor(_cAct1)


                //this.array[i].
            }            
            if(idPri!=-1){
                this.array[idPri].setColor(_cAct2);
                this.korektPoIndex(idPri)
            }

        }



        // Функция клика по иконке
        this.downBtn = function (s,p) {  
            if(s==undefined) {
                self.index = this.idArr;
                self.obj = self.array[this.idArr].object;
            }
            if (self.fun) self.fun(s,p);
        };
        this.createZamen=function(){            
            var r=new BoxMani(this.content, 0, 0, this.downBtn);  
            r.whPic=this.whPic;  
            r._widthPic = this._widthPic; // elements width
            r._heightPic = this._heightPic; // elements height    
            r.simvol = this.simvol  
            return r
        }

            // перерисовка галереи
        var ii, jj, ww, hh, bat, sahLoad, wM, hM, sliderOtstup;    
        this.draw = function () {
            if (this.preDraw) this.preDraw();

            ii = 0;
            jj = 0;
            sliderOtstup = this.otstup1 + this.otstup * 2;
            ww = 1;
            if (this._kolII > this.array.length)ww = this.array.length * (this._widthPic + this._otstup) + this._otstup;
            hh = this._heightPic + this._otstup * 2;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].x = ii * (this._widthPic + this._otstup) + this._otstup;
                this.array[i].y = jj * (this._heightPic + this._otstup) + this._otstup;
                if (this.array[i].x + this._widthPic + this._otstup > ww)ww = this.array[i].x + this._widthPic + this._otstup;
                hh = (jj + 1) * (this._heightPic + this._otstup) + this._otstup;
                ii++;
                if (ii >= this._kolII) {
                    ii = 0;
                    jj++;
                }
            }


            if (ww > this._width) this.scrollBarH.visible = true;
            else this.scrollBarH.visible = false;

            if (hh > this._height) this.scrollBarV.visible = true;
            else this.scrollBarV.visible = false;


            this.scrollBarH.widthContent = ww;
            this.scrollBarV.heightContent = hh;


            if (ww > this._width) {
                wM = this._width;
            } else {
                wM = ww;
            }
            if (hh > this._height) {
                hM = this._height;
            } else {
                hM = hh;
            }

            this.ww = ww;
            this.wM = wM;
            this.hh = hh;
            this.hM = hM;
            // this.scrollBarH     внизу
            // this.scrollBarV     сбоку

            //  this._boolPositScrol = true;//выворот положений
            // this._boolPositOtctup= true;//внутурь/наружу

            if (this._boolPositScrol) {
                if (this._boolPositOtctup) {
                    this.scrollBarH.y = hM - this.otstup - this._otstup1;
                    this.scrollBarV.x = wM - this.otstup - this._otstup1;
                } else {
                    this.scrollBarH.y = hM + this.otstup;
                    this.scrollBarV.x = wM + this.otstup;
                }
            } else {
                if (this._boolPositOtctup) {
                    this.scrollBarH.y = this.otstup;
                    this.scrollBarV.x = this.otstup;
                } else {
                    this.scrollBarH.y = -this.otstup - this._otstup1;
                    this.scrollBarV.x = -this.otstup - this._otstup1;
                }
            }

            if(this.panel!=undefined){          
                this.panel.width=this._width;
                if(this.hh<this._height){
                    this.panel.height=this.hh;
                }else{
                    this.panel.height=this._height;
                }
            }

            // this.graphicsMask.clear();
            // this.graphicsMask.beginFill(0xff0000, 0);
            // this.graphicsMask.drawRect(0, 0, wM, hM);
            // this.graphicsMask.endFill();


            // if (this._boolWheel) {
            //  this.graphics.clear();
            //  this.graphics.beginFill(0xff0000, 0);
            //  this.graphics.drawRect(0, 0, ww, hh);
            //  this.graphics.endFill();

            // }
            this.dragIE()
            if (this.postDraw) this.postDraw();
        };
    }
    set height(value) {
        if(this._height!=value){           
            this._height = value;
            this.content1.div.style.clip = "rect(1px "+this._width+"px "+this._height+"px 0px)";
            this.content1.x=0;
            this.drawScrol();
            this.draw();
        }
    }
    get height() { return  this._height;}/**/


    set prosentH(value) {                
        this._prosentH = value;
        let hd=(this.hh-this._height)*this._prosentH;      
        if(hd>0)hd=0
        this.content.y=  hd   
        
    }
    get prosentH() {
        let hd=this.hh-this._height;       
        this._prosentH=this.content.y/hd
        return  this._prosentH;
    }
 

    /*height: {// верх холеоеи
        set: function (value) {
            if (this._height == value) return;
            this._height = value;
            this.content1.div.style.clip = "rect(1px "+this._width+"px "+this._height+"px 0px)";
            this.content1.x=0;
            this.drawScrol();

            this.draw();
        },
        get: function () {
            return this._height;
        }
    },*/
}


export class BoxMani extends DBox {
    constructor(dCont, x, y, fun) { 
        super( dCont, x, y, fun);         
        this.simvol="df"
        this._widthPic = 128; // elements width
        this._heightPic = 128; // elements height
        this.type="BoxMani";
        var self=this;
        this.fun=fun;
        var www=50
        
        this.label2 = new DLabel(this.content, 0, 4, '2');
        this.label3 = new DLabel(this.content, 0, 4, '3');
        this.label2.fontFamily="SFUIDisplay-Light"  
        this.label3.fontFamily="SFUIDisplay-Light"      
        this.label3.fontSize=10;
        this.label.fontSize=10;

        this.panel.color1=dcmParam.color
        
        this.label2.fontSize = 14;
        this.label3.fontSize = 14; 
        this.label3.width=100
        this.label3.textAlign='right';
        
        this.label.div.style.pointerEvents="none";         
        this.label2.div.style.pointerEvents="none"; 
        this.label3.div.style.pointerEvents="none"; 

        this.aLabel=[]
        for (var i = 0; i < 5; i++) {
            this.aLabel[i]= new DLabel(this.content, 0, 2+12*i, '|');
            this.aLabel[i].width=200;
            this.aLabel[i].div.style.pointerEvents="none"; 
            this.aLabel[i].fontSize=11; 
            this.aLabel[i].fontFamily="SFUIDisplay-Light";   
        }
        this.panel.boolLine=false

        var ss
        this.draw = function () {          
            ss = (this._width - this._otstup * 2) / this.image.picWidth;
            if (ss > (this._height - this._otstup * 2) / this.image.picHeight)ss = (this._height - this._otstup * 2) / this.image.picHeight;           
            this.image.x = 0;
            this.image.width=this.image.picWidth*ss;
            this.image.height=this.image.picHeight*ss;
            for (var i = 0; i < this.aLabel.length; i++) {
                this.aLabel[i].x=this._heightPic+2
            }
            this.label2.x = this._widthPic-120;
            this.label3.x = this._widthPic-10-110;            
            if (this.postDraw) this.postDraw();
        };

        this.funOver33=function(){       
            self.fun("over", self.object)
        }

        this.mouseOver1 = function (e) {            
            self.funOver33()
        };

        this.setColor=function(c){            
            if(this._color1==c)return;
            this.color1=c
            this.panel.color=c
        }


        this.panel.div.removeEventListener("mouseout", this.mouseOut);
        this.image.image.removeEventListener("mouseout", this.mouseOut);
        this.panel.div.removeEventListener("mouseover", this.mouseOver);
        this.image.image.removeEventListener("mouseover", this.mouseOver);
        this.image.image.removeEventListener("mousedown", this.mouseDown)
        this.panel.div.removeEventListener("mousedown", this.mouseDown)


        this.mouseOver = function (e) {
            self.boolOut = false;
            if(self._activ==false)self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color1), -5);
            else self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color), -5);
            if (self.funOver) self.funOver(this);
        };

        this.mouseOut = function (e) { 
            if(self._activ==false)self.panel.color1=self._color1;
            else self.panel.color1=self._color;     
            if (self.funOut) self.funOut(this);
        };

        this.mouseDown = function (e) {     
            if (self.fun) self.fun();
        };
        this.draw();


        this.panel.div.addEventListener("mouseout", this.mouseOut);
        this.image.image.addEventListener("mouseout", this.mouseOut);
        this.panel.div.addEventListener("mouseover", this.mouseOver);
        this.image.image.addEventListener("mouseover", this.mouseOver);
        this.image.image.addEventListener("mousedown", this.mouseDown)
        this.panel.div.addEventListener("mousedown", this.mouseDown)
        
        this.startLoad = function (_obj) {
            this.object = _obj;
            var link=_obj.link
            this.image.visible = true;
            this.label2.text="x"+_obj.kol;
            this.label3.text=_obj.price+" "+this.simvol;

            for (var i = 0; i < this.aLabel.length; i++) {
                this.aLabel[i].text=_obj.aText[i]+"";
                if(i==3)this.aLabel[i].text=_obj.aText[i]+" "+dcmParam.tCInfa.getText(1);
                else this.aLabel[i].text=_obj.aText[i]+"";
            }
            
            if (this.image.link == _obj.link) {
                if (self.funLoad) self.funLoad();
            } else {
                this.image.width = 100;
                this.image.height = 100;
                this.image.link = _obj.link;
            }
            this.draw();
        }    
    }
}

