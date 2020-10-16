
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.



окно поверх с инпутами

*/
import { DWindowS} from './Zapshsti.js';

export class MInfo  {
    constructor(dC) {   
        var self=this   
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";   

        this.type="MInfo";
        this.fun=undefined;
        this.dC=dC;
        this.par=dC;
        this._width=100;
        this._height=100;
        this._scale=100;
        this._active=false;
        this.otstup=2;
        this.otstup2=10;
        this.dCont=new DCont();
        this.sizeFont=20
        this.text="null";

        this.panel = new DPanel(this.dCont);
        this.panel.alpha=0.85
        this.panel.color1="#000000";

        this.window = new DWindowS(this.dCont, 0, 0," ",function(){
            
            self.active=false; 
        },'resources/image/kross.png')
        this.window.panel1.visible=false

        this.window.dragBool=false;
        this.window.hasMinimizeButton=false;
        this.label = new DLabel(this.window, this.window.otstup+this.otstup2*3, this.window.otstupVerh+this.otstup2*2," ");
        this.label.fontSize=this.sizeFont;
        this.label.fontFamily="SFUIDisplay-Light"
        this.label.textAlign = 'center';

        this.input=new DInput(this.window, 10, this.otstup,"x",function(){
            self.text=this.text;            
        })
        dcmParam.styleInput(this.input)
        this.input.timeFun=1;

        //форма отправки на имеи проекта
        this.panelMail=new DCont(this.window)
        this.panelMail.width=this._width-this.otstup;
        this.labelMail = new DLabel(this.panelMail, this.otstup, this.otstup,"Отправить проект по почте:");
        this.labelMail.fontSize=this.sizeFont;
        this.labelMail.fontFamily="SFUIDisplay-Light"
        this.labelMail.textAlign = 'center';

        this.inputMail=new DInput(this.panelMail, this.otstup, this.otstup+35,"vorodis2@gmail.com",function(){            
            self.text=this.value;
        })
        this.panelMail.visible=false;
        this.panelMail.timeFun=1;

        dcmParam.styleInput(this.inputMail,"Ваш e-mail")
        self.textId="null"
        
        this.butCC=new DButSim(this.panelMail, 0, 0,"",function(){ 
            dcmParam.ctrlCV.saveText(self.input.text)
        },"resources/image/x16.png")


        this.butCC.funLoadImag=function(){  
            this.width=this.image.picWidth;
            this.height=this.image.picHeight;
        }

        this.butCC.borderRadius=111;
        this.butCC.boolLine=false;
        this.butCC.color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10);

        this.testImeil=function(_text){
            var a=_text.split("@");
            if(a[1]!=undefined){
                var aa=a[1].split(".");
                if(aa[1]!=undefined){
                    return true;
                }
            }
            return false
        }

        this.arSim=["0","1","2","3","4","5","6","7","8","9","0","(",")","+"," "]
        var b
        this.testPhon=function(_text){
            if(_text.length<8)return false;
            for (var i = 0; i < _text.length; i++) {
                b=false;
                for (var j = 0; j < this.arSim.length; j++) {
                    if(_text[i]==this.arSim[j]){
                        b=true;
                    }
                }
                if(b==false)return false;
            }            
            return true;
        }

        this.button=new DButSim(this.window, 0, 0,"Да",function(){        
            if(self.fun!=undefined)self.fun()
            self.active=false;    
        })

        this.button1=new DButSim(this.window, 0, 0,"Нет",function(){
            self.active=false;
        }) 
        
        this.button2=new DButSim(this.window, 0, 0,"Отправить",function(){
            if(self.testImeil(self.inputMail.text)==true){                
                
                if(self.fun!=undefined)self.fun();
                
                self.active=false;  
            }else{               
                self.inputMail.object.style.color="#ff9999";
                setTimeout(function() {
                    self.inputMail.object.style.color=dcmParam.colorText1;    
                }, 500);
            }
        }) 


        this.button.width=this.button1.width=70;
        this.button.borderRadius=this.button1.borderRadius=this.button2.borderRadius=70;
        this.button1.panel.color1=this.button.panel.color1=this.button2.panel.color1='#f3f5f8';
        this.button.height=40
        this.button.label.width=60
        this.button.label.textAlign = 'center';
        this.button.label.fontFamily="SFUIDisplay-Bold"
        this.button.label.fontSize=18
        
        this.button1.label.width=20
        this.button1.label.x=0
        this.button1.label.textAlign = 'center';
        this.button1.label.fontFamily="SFUIDisplay-Bold"
        this.button1.height=40
        this.button1.label.fontSize=18
        
        this.button2.label.x=0
        this.button2.label.textAlign = 'center';
        this.button2.label.fontFamily="SFUIDisplay-Bold"
        this.button2.height=40
        this.button2.label.fontSize=18

        this.button2.width=140
        this.button2.label.width=140


        this.setFun = function(title, text, fun,bb){ 
            this.active = true;
            this.setW(400);
            this.fun=fun;
            
            this.window.text=title;
            this.label.text=text;
            var p=this.otstup2;
            this.button1.visible=this.button.visible=false;
            this.input.visible=false;
            if(this.fun!=undefined){
                p=this.otstup2*2+32
                this.button1.visible=this.button.visible=true;
            } 
            this.button1.y=this.button.y=this.label.y+this.label.getRect().height+this.otstup2*2;
            if(bb!=undefined)this.button1.visible=this.button.visible=false;
            
            this.window.height=this.button1.y+this.button1.height+this.otstup2*3;
            if(bb!=undefined)this.window.height-=32;
            
            this.sizeWindow(this._width*1, this._height*1, this._scale*1);
        }


        this.setFunInput = function(title, text, text1, fun){ 
            this.active = true;
            this.fun=fun;
            this.setW(400);
            this.window.text=title;
            this.label.text=text;
            this.text=text1;

            var p=this.otstup2;
            this.button1.visible=this.button.visible=false;
            if(this.fun!=undefined){
                p=this.otstup2*2+32
                this.button1.visible=this.button.visible=true;
            }  
            this.input.text=text1;
            this.input.visible=true;
            this.input.y=this.label.y+this.label.getRect().height+5;
            

            this.window.height=this.label.y+this.label.getRect().height+p+32+5;
            this.button1.y=this.button.y=this.label.y+this.label.getRect().height+this.otstup2+32+5;
            this.sizeWindow(this._width*1, this._height*1, this._scale*1)
        }


        this.funSave
        this.setFunSave = function(text, fun){ 
            this.active = true;
            this.fun=fun;
            this.setW(450);
            
            this.window.text="СОХРАНИТЬ";
            this.label.text="Проект доступен по ссылке:";
            this.text=this.inputMail.value;

            self.textId=text;

            var p=this.otstup2;
            this.button1.visible=this.button.visible=false;

            if(this.fun!=undefined){
                p=this.otstup2*2+32
                this.button1.visible=this.button.visible=true;
            }  
            this.input.text=text;
            this.input.visible=true;
            this.input.y = this.label.y+this.label.div.clientHeight+30;
            this.panelMail.y=this.label.y+this.label.div.clientHeight+p+30
            this.panelMail.visible=true;
            this.butCC.y=this.input.y-this.panelMail.y-7
            this.butCC.x=this.input.x+this.input.width+5

            this.labelMail.width=this.window.width-this.otstup*2;
            this.inputMail.text = "Ваш e-mail";
            this.button.visible=false;
            this.button1.visible=false;           

            this.button2.y=this.button.y=this.panelMail.y+100;
            this.button2.x=(this.window.width-this.button2.width)/2
            this.button2.visible=true

            this.window.height=this.button.y+this.button.height+this.otstup+27;
            
            this.sizeWindow(this._width*1, this._height*1, this._scale*1)
        }



        this.setW=function(w){

            this.button.visible=true
            this.button1.visible=true
            this.button2.visible=false

            this.button1.label.text="Нет"
            this.button1.label.width=20
            this.button1.label.x=17

            this.window.width=w;
            this.label.width= w- this.otstup2*2-this.window.otstup*4-30;
            
            this.inputMail.width=this.input.width= w - 140;
            this.inputMail.x=this.input.x=(w-this.input.width)/2
            
            var www=(w-this.otstup2*2-this.button1.width*2)/3;

            this.button.x= this.otstup2+www
            this.button1.x= this.button.x+www+this.button.width
        }
        this.setW(400);

        this.sizeWindow = function(w,h,s){ 
            this._width=w;
            this._height=h;
            this._scale=s;
            if(this._active==false)return;

            this.panel.width=w/s;
            this.panel.height=h/s;
            this.window.x=(this.panel.width-this.window.width)/2;
            this.window.y=(this.panel.height-this.window.height)/2;                    
        }

        this.panel.div.addEventListener("mousedown", function(){
            self.active=false;
        })
    }

    set active(v) {
        if(this._active!=v){
            this._active = v;   
            this.panelMail.visible=false      
            if(this._active==true){
                this.dC.add(this.dCont)
            }else{
                this.dC.remove(this.dCont)
            } 
        }
    }
    get active() { return  this._active;}
}