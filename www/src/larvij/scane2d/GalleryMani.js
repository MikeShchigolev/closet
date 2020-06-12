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

        this.whPic=128;
        this.type="GalleryMani";
        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);
        var self=this;
        this.fun=fun
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
    }
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

