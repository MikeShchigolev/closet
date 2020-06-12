



function DopInfo(par, fun) {  
    var self=this;  
    this.type="DopInfo";
    this.par=par;
    this.otstup=aGlaf.otstup;
    this._active=false;

    this.dCont=new DCont(this.par.par.dCont);

    this.dCont.visible=false    
    this.confText

    this.w=new DWindow(this.dCont, this.otstup, 30+this.otstup*2 ," ");
    this.w.width=1000;
    //this.w.dragBool=false;
    this.w.hasMinimizeButton=false;

    this.vsakoe

    this.array=[]
    this.array[0]=this.vsakoe=undefined;

    this.init=function(){
        if(this.vsakoe!=undefined)return;

        $.ajax({
            url: php.server+"resources/configText.json",
            success: function function_name(data) {                         
                if(typeof data === "string") {
                    var conf = JSON.parse(data)
                    self.confText = conf;
                } else self.confText = data;              
                self.init2();           
                                 
            },
            error:function function_name(data) {
                trace("Что то случилось с конфигом");
                self.confText={};
                self.confText.email="xz@xz.xz";
                self.confText.array=[]  ;  

                self.init2();
                self.save();
            }
        });
    }

    this.init2=function(){        
        this.array[0]=this.vsakoe=new DIVsakoe(this);
        this.array[1]=this.arrText=new DIArrText(this);
        this.setActiv(this.arrText)

        this.sizeWindow()
    }



    this.setActiv = function(o){          
        for (var i = 0; i < this.array.length; i++) {
            if(this.array[i].type==o.type) this.array[i].active = true
            else this.array[i].active = false
        }
    }

    this.sah=0
    this.saveTime=function(){
        this.sah++;
        var s=this.sah;
        setTimeout(function() {           
            if(self.sah==s)self.save()
        }, 500);
    }

    this.save=function(){

        trace("##",this.confText) 
        var ss  =JSON.stringify(this.confText)           
        var l=php.server+aGlaf.resurs+"configText.json";
        aGlaf.php.load({tip:"saveJSON", link:l, text:ss},function(e){
            
        }); 

    }



    this.width=100;
    this.height=100;
    this.sizeWindow = function(w,h){  
        

        if(w!=undefined){
            this.width=w;
            this.height=h; 
        }
        
        if(this._active==false)return
        if(this.vsakoe==undefined)return    


        this.w.width=this.width-this.otstup*2;
        this.w.height=this.height-30-this.otstup*3;

        this.arrText.sizeWindow(this.width, this.height);

    }


    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;
                this.init()
                this.dCont.visible=value 
                this.par.dCont.visible=!value
                this.par.menuVerh.active=!value 
                this.sizeWindow()
            }           
        },
        get: function () {
            return this._active;
        }
    });
}


function DIVsakoe(par) {  
    var self=this;  
    this.type="DIVsakoe";
    this.par=par;
    this.otstup=aGlaf.otstup;
    this._active=false;

    this.dCont=new DCont(this.par.w.content);
    this.dCont.visible=false   
    this.button=new DButton(this.par.w, this.otstup, this.otstup,"Всякое", function(s){ 
        //if(this.alpha!=1)
            self.par.setActiv(self)
    });
    this.button.height=28


    this.b=new DButton(this.dCont, this.otstup, this.otstup,"load csv", function(s){ 
        var a=s.split("base64,")       
        var str=window.atob( a[1] )
        self.par.par.menuVerh.bigZamena(str);       
    })    
    this.b.startFile("csv"); 
    new DLabel(this.dCont, 110,10,"Загружаем цены через csv").width=200



    this.input=new DInput(this.dCont, this.otstup, 40,"null", function(s){ 
        self.confText.email= this.text; 
        self.par.saveTime(); 
    });
    this.input.timeFun=1
    new DLabel(this.dCont, 110,50,"Эмел на который будет уходить заказ").width=400

    this.confText
    this.setConf=function(confText){
        this.confText=confText    
        this.input.text=this.confText.email;
    }
    trace()
    this.setConf(this.par.confText)

    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;               
                if(value) this.button.alpha =0.5
                else this.button.alpha =1
                this.dCont.visible=value;
                
            }           
        },
        get: function () {
            return this._active;
        }
    });
}





function DIArrText(par) {  
    var self=this;  
    this.type="DIArrText";
    this.par=par;
    this.otstup=aGlaf.otstup;
    this._active=false;


    this.dCont=new DCont(this.par.w.content);
    this.dCont.visible=false;
    this.button=new DButton(this.par.w, this.otstup*2+100, this.otstup,"тексты", function(s){ 
        self.par.setActiv(self)
    });
    this.button.height=28
    


    this.confText=undefined

    /*={

    }
    this.confText.array=[]

    var o={}
    o.id=1;
    o.infa=" Символ ";
    o.text={ru:"xz"}
    this.confText.array.push(o);

    var o={}
    o.id=2;
    o.infa="asdkjf ahasdkfja fdkajs hfasdf jasdfkla sfkas faskdfj hadsfk ahjsfdkasj hfasdkfj haskdfj ad";
    o.text={ru:"xz dsklgfadsfj askjas fasdfkj adfkj asfkasjf dasdfk jafkas fkasdfj dfask asfk jasfhaksdf asdkf asfk fkas f2"}
    this.confText.array.push(o);

    for (var i = 0; i < 50; i++) {
        this.confText.array.push(o);
    }*/


    


    this.minus=function(sHalp){
        var m=this.gallery.index;
        if(this.confText.array[m]==undefined)return
        this.confText.array.splice(m,1)
        this.gallery.start(this.confText.array);
        this.par.saveTime();
        this.sizeWindow();
        this.gallery.index=m-1;

    }

    this.plus=function(sHalp){
        var idSah=1;
        trace(this.confText.array)
        for (var i = 0; i < this.confText.array.length; i++) {
            if(this.confText.array[i].id>=idSah)idSah=this.confText.array[i].id+1
        }

        var o={}
        o.id=idSah;
        o.infa=sHalp;
        o.text={ru:"xz"}
        this.confText.array.push(o)
        this.gallery.start(this.confText.array);
        this.par.saveTime();
        this.sizeWindow();
    }

    this.save=function(){
        this.par.saveTime();
    }

    new DLabel(this.dCont, 2,10,    "ид").width=200;
    new DLabel(this.dCont, 100,10,  "описание").width=200; 
    new DLabel(this.dCont, 460,10,  "текст ru").width=200;


    this.gallery=new GalleryXZ333(this.dCont,2,30,function(){        
        self.save();
    })
    this.gallery.width=875;
    this.gallery.kolII=1;
    this.gallery.widthPic=870;
    this.gallery.heightPic=40;


    this.b=new DButton(this.dCont, 600, this.otstup,"+", function(s){         
        self.par.par.mInfo.setFunInput(
            "Создание нового текста",
            "К этому тексту будет подвязан в программмный продукт",
            "Подсказка",           
            function(){                
                self.plus(self.par.par.mInfo.text)               
            }
        );

    })    
    this.b.width=this.b.height


    this.bm=new DButton(this.dCont, 600+this.b.height, this.otstup,"-", function(s){        
        self.par.par.mInfo.setFun("Удаление обьекта","Будет удалено, осторожно!!! обьект может быть уже связан в коде с идишником!!!",
            function(){              
                self.minus()
            }
        );

    })    
    this.bm.width=this.bm.height





    this.confText
    this.setConf=function(confText){
        this.confText=confText 
        this.gallery.start(this.confText.array);
    }
    this.setConf(this.par.confText)
    


    this.width=100;
    this.height=100;
    this.sizeWindow = function(w,h){ 
        if(w!=undefined){
            this.width=w;
            this.height=h; 
        }        
        if(this._active==false) return;
        if(this.gallery==undefined) return;
        this.gallery.width=this.width-8;
        this.gallery.height=   this.height-100 

    }


    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;
                trace("this._active   ",this._active)
                if(value) this.button.alpha =0.5
                else this.button.alpha =1
                this.dCont.visible=value;
                
            }           
        },
        get: function () {
            return this._active;
        }
    });
}















function GalleryXZ333(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);
               
    this.type="GalleryXZ";
   

    this.textArea=new DTextArea()
    this.textArea.textAlign= "Left";
    this.textArea.timeFun=1

    this.textArea2=new DTextArea()
    this.textArea2.textAlign= "Left";
    this.textArea2.timeFun=1

    this.createZamen=function(){            
        var r=new BoxXZ333(this.content, 0, 0, this.downBtn, this);            
        return r;
    }




    
}
GalleryXZ333.prototype = Object.create(DGallery.prototype);
GalleryXZ333.prototype.constructor = GalleryXZ333;

Object.defineProperties(GalleryXZ333.prototype, {

    index: {// Активный элемент
        set: function (value) {
            if(this._index==value)return
              
            if (this.array[value] != undefined) {
                this.korektPoIndex(value);
            }            
            this._index = value; 
            
            if(this.textArea2.parent)  this.textArea2.parent.remove(this.textArea2) 
            if(this.array[this._index]==undefined)if(this.textArea.parent)  this.textArea.parent.remove(this.textArea)   

            for (var i = 0; i < this.array.length; i++) {
                if (this._index == i) {
                    this.array[i].activ = true;
                    this.array[i].setTA(this.textArea)
                }
                else this.array[i].activ = false;
            }
            

        },
        get: function () {
            return this._index;
        }
    },
})







function BoxXZ333(dCont, _x, _y, _fun, par) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self=this
    this.par=par;
    this.image.visible = false;

    this.label1 = new DLabel(this.content, 50, 0, '====');
    this.label1.fontSize=12;
    this.label1.width=400;


    this.labelRu = new DLabel(this.content, 460, 0, '====');
    
    this.labelRu.width=390;

    this.label.div.style.pointerEvents="none";
    this.label1.div.style.pointerEvents="none";
    this.labelRu.div.style.pointerEvents="none";

    this.b=new DButton(this.content, 35, 0," ", function(s){ 
        self.fun()

        self.add(self.par.textArea2)
        self.par.textArea2.width=410;
        self.par.textArea2.height=self.panel.height;
        self.par.textArea2.x=self.label1.x;
        self.par.textArea2.value=self.label1.text
        self.par.textArea2.fun=self.dragText2

    })    
    this.b.width=this.b.height=14
    this.b.color="#eeeeee"
    this.b.alpha=0.5

    this.dragText2=function(){
        
        self.label1.text=self.object.infa=this.value;
        self.fun()
    }

    this.setTA=function(textArea){
        this.add(textArea)
        textArea.width=410;
        textArea.height=this.panel.height;
        textArea.x=this.labelRu.x;
        textArea.value=this.labelRu.text

        textArea.fun=this.dragText
    }


    this.dragText=function(){
        
        self.labelRu.text=self.object.text.ru=this.value;
        self.fun()
    }




    this.startLoad = function (_obj) {
        this.object = _obj;
        


       

        this.label.text=this.object.id;
        this.label1.text=this.object.infa;
        this.labelRu.text=this.object.text.ru;



        this.label.visible=true
       
        
            
        self.funLoad();
        
 


       
        this.draw();
    };

    this.draw = function () {
        this.label.x=10
        this.label.y=10
    };

}
BoxXZ333.prototype = Object.create(DBox.prototype);
BoxXZ333.prototype.constructor = BoxXZ333;
