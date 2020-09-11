/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.



*/



export function Vuvoz (par, dCont, x, y, obj,w) {
    this.type = 'MenuSave';
    var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";   
        
    var self = this;
    this.par=par;

    this.hh=par.hh
    this.fs=par.fs
    this.colorStart=par.colorStart
    
    this.dCont=new DCont();
    dCont.add(this.dCont)
    this.dC=new DCont();
    this.dCont.add(this.dC)


    this.dCont.x=x;
    this.dCont.y=y;
    this.otstup=5;
    this.xz = 0;
    this._width = w;
    this.object=obj

    this._index=-1
    this._active=false; 

    this.dC.visible=false


   




    this.input=new DInput(this.dCont,0,0,"e-mail*",function(){

       
    })
    this.input.width=this._width;  
    dcmParam.styleInput(this.input,"Доставка*",this.hh,this.fs)
    this.input.colorText1 =this.colorStart//dcmParam.colorText1






    this.panel=new DPanel(this.dC,-1111,-1111);
    this.panel.width=2222
    this.panel.height=2222
    this.panel.alpha=0.4


    this.panel1=new DPanel(this.dC,0,0);
    this.panel1.width=w
    this.panel1.div.style.borderRadius="16px"
    this.panel1.boolLine=false;
    this.panel1.color1="#ffffff";


    this.array=[]
    var button

   // this.dC.x=100

    this.color="#ffffff"//"#f3f5f8"

    this.down=function(){
        self.index=this.idArr;
        self.active=false;
    }


    this.label=new DLabel(this.panel1,0,-33)
    this.label.width=555
    var hhh=this.hh
    this.draw=function(){
        if(button!=undefined)return
        for (var i = 0; i < this.object.array.length; i++) {
            button=new DButSim(this.panel1,this.otstup,this.otstup+i*(hhh+this.otstup),this.object.array[i][0],this.down)
            button.idArr=i;
            this.array.push(button);
            button.width=this._width-this.otstup*2;
            //button.object.style.borderRadius=this.hh/2+"px"
            button.colorText=this.colorStart
            button.label.textAlign = 'center';

            button.label.fontFamily="SFUIDisplay-Light"

            button.fontSize=this.fs;


            button.color=this.color;
            
            button.height=hhh;
            button.boolLine=false;

        }




        this.panel1.height=this.array.length*(hhh+this.otstup)+this.otstup
        this.dC.y=-(this.panel1.height-this.hh)/2;

        


    }




    







    this.mousedown = function (e) {
        self.active=true;
    }



    if(dcmParam.mobile==false){
        this.input.div.addEventListener("mousedown", self.mousedown);
    }else{
        this.input.div.addEventListener("touchstart", self.mousedown);
    }


    this.mousedown1 = function (e) {
        self.active=false;
    }

    if(dcmParam.mobile==false){
        this.panel.div.addEventListener("mousedown", self.mousedown1);
    }else{
        this.panel.div.addEventListener("touchstart", self.mousedown1);
    }


    this.testVubor=function(){

        if(this.input.colorText1 ==dcmParam.colorText1)return true;

        this.input.colorText1="#ff9999"; 


        return false;

    }


    
}


Object.defineProperties(Vuvoz.prototype, {
    active: {// 
        set: function (value) {
            if (this._active != value) {
                this._active = value;

                this.dC.visible=value;                
                this.input.visible= !value;



                if(value)   {
                    this.draw()
                    var p=this.dCont.parent;
                    this.dCont.parent.remove(this.dCont)
                    p.add(this.dCont)
                }    
            }
        },
        get: function () {
            return this._active;
        }
    },


    index: {// 
        set: function (value) {
            if (this._index != value) {
                this._index = value;
                this.par.dostavka=this.object.strName[1]
                this.input.text=this.object.strName[0]

                this.input.colorText1 =dcmParam.colorText1 

                for (var i = 0; i < this.array.length; i++) {

                    if(i==this._index){
                        this.array[i].color=dcmParam.compToHexArray(dcmParam.hexDec(this.color), -30);
                        this.par.dostavka=this.object.array[i][1]
                        this.input.text=this.object.array[i][0]
                        this.array[i]._boolLine=true;
                        this.array[i].boolLine=false;                        
                    }else{
                        this.array[i].color=this.color



                    }

                   // this.array[i].object.style.border= '0px solid'
                }
                  
            }
        },
        get: function () {
            return this._active;
        }
    },



});