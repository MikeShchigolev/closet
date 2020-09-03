/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


Сохроняшка php и все что рядом
*/

import { Vuvoz } from './Vuvoz.js';
import { Php } from '../../php/PhpE6.js';

export function MenuSave (par) {
    this.type = 'MenuSave';
    var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";   
        

    var self = this;
    this.par=par;
    this._active=false;
    this.dCont=new DCont();
    this.otstup=5;
    this.xz = 0;
    this._width = 100;
    this._height = 100;
    this._scale =1;

    this.otstup2=50
    this.php=new Php();

    this.сhangesSave=false;


    this.link='../save/';
    if(this.php.key!=null) this.link="../users/"+this.php.key+"/save/";

    var aGlaf=this.par.par;    
    this.email=dcmParam.tCInfa.config.email;



    if(this.php.id!=undefined){
        setTimeout(function() {
            aGlaf.openId(self.php.id);
        }, 1);
    }

    this.poiskId=function(){
        this.php.load({tip: 'getDiractFiles', dir: this.link}, function (e) {              
            var a = e.split(",");
            self.poiskId1(a);
        })
    }
    this.idSave=1;
    this.arraySave;
    this.poiskId1=function(a){
        this.arraySave=a;
        
        for (var i = 0; i < this.arraySave.length; i++) {             
            if(this.arraySave[i]*1!=undefined){
                if(this.arraySave[i]*1>this.idSave){
                    this.idSave=this.arraySave[i]*1;
                }
            }
        }
        this.idSave+=1;
        trace("##########################",this.link,this.idSave);        
        this.php.load({tip: 'mkdir', dir: this.link+this.idSave}, function (e) {  
            trace("##########################>>>>",e);             
            self.php.load({tip: 'copyDir', dirWith: '../save/base/', dir: self.link+self.idSave +'/'}, function (e) { 
                self.poiskId2();
            })
        });        
    }

    this.poiskId2=function(){                
        var l=this.link+this.idSave+"/config.json";         
        this.php.load({tip:"saveJSON", link:l, text:this.string},function(e){
            var ll = self.link+self.idSave +'/icon.png'            
            self.php.savePhoto(ll, self.base, function () {                
                self.poiskId3()
            }); 
        });
    }

    this.fun1
    this.textID
    this.poiskId3=function(){
        var s=this.php.server;                
        this.textID=s+"index.html?id="+this.idSave;
        if(this.fun1!=undefined){
            this.fun1(this.textID)
            this.fun1=undefined;
        }        
    }

    this.dragScane=function(){
        this.creatResurs();
        this.poiskId();
    }


    this.string;
    this.base;
    this.creatResurs=function(){
        var s=aGlaf.scane3d.foto3dLarvij.get("base",512,512)       
        this.base=s;        
        var obj= aGlaf.scane3d.room.getObj();            
        this.string=JSON.stringify(obj); 
    }


    this.getNewProd=function(fun){          
        this.fun1=fun;
        this.dragScane();
    }


    this.setMail=function(str,fun){  
        this.otprovlashka.arrayAE=this.otprovlashka.array[0].text.split(",");
        this.pNew() 

        this.otprovlashka.creatResurs(function(){   
            var strText=''  
            var str1="Конструктор гардеробных систем Larvij. Ваш проект N "+self.idSave+"\n";               
            strText=  "Вы сохраняли проект в конструкторе гардеробных систем Larvij.\n"            
            strText+=  "По этой ссылке вы можете вернуться в проект\n" 
            strText+=  self.php.server+"index.html?id="+self.idSave+"\n";
            
            strText+=dcmParam.tCInfa.getText(3)+"\n"
            strText+=dcmParam.tCInfa.getText(4)+"\n"
            strText+=dcmParam.tCInfa.getText(5)+"\n"

           /* strText+="ООО «Ларвидж Ритейл Лимитед»\n";
            strText+="Тел.: 8 916 768-75-85, 8 915 170-04-34\n";
            strText+="shop@larvij.ru\n";
            strText+="shop2@larvij.ru\n";
            strText+="www.larvij.com\n";*/

            self.otprovlashka.naEmail(str, self.otprovlashka.arrayAE[0], str1,strText, function(e){               
                fun();
                
            })
        },true)
    }






    this.panel=new DPanel(this.dCont,0,0)
    this.panel.alpha=0.85
    this.panel.color1="#000000"

    this.window=new DWindowS(this.dCont,0,0,"ОФОРМЛЕНИЕ ЗАКАЗА.",function(){
        self.active=false;
    },'resources/image/kross.png')
    this.window.panel1.visible=false
    this.window.width=500;
    this.window.hasMinimizeButton=false
    this.window.dragBool=false;

    this.dCPreload=new DCont();
  
    this.image=new DImage(this.dCPreload, 0, 0,"resources/image/pre.png",function(){
        
    });
    this.image.x=-50;
    this.image.y=-50;
    this.dCPreload.visible=false;
    this.dCont.add(this.dCPreload);

    this.vuvoz=undefined;

    var deg=0
    this.upDate = function () {       
        if(this.dCPreload.visible==true){
            deg+=2;
            self.dCPreload.div.style.webkitTransform = 'rotate('+deg+'deg)'; 
            self.dCPreload.div.style.mozTransform    = 'rotate('+deg+'deg)'; 
            self.dCPreload.div.style.msTransform     = 'rotate('+deg+'deg)'; 
            self.dCPreload.div.style.oTransform      = 'rotate('+deg+'deg)'; 
            self.dCPreload.div.style.transform       = 'rotate('+deg+'deg)'; 
            self.dCPreload.div.style.top = self.dCPreload.y+'px';
            self.dCPreload.div.style.left = self.dCPreload.x+'px';
        }             
    }   


    this.testImeil=function(_text){
        var a=_text.split("@")
        if(a[1]!=undefined){
            var aa=a[1].split(".");
            if(aa[1]!=undefined){
                return true;
            }
        }
        return false
    }


    this.arSim=["0","1","2","3","4","5","6","7","8","9","0","(",")","+"," "];
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


    this.dragForm=function(b){
        if(this.arrComp[0].value=="Имя*"){
            this.arrComp[0].colorText1=this.colorStart
        }else{
            this.arrComp[0].colorText1=dcmParam.colorText1
        }

        if(this.arrComp[1].value=="Телефон*"){
            this.arrComp[1].colorText1=this.colorStart
        }else{            
            this.arrComp[1].colorText1=dcmParam.colorText1
        }

        if(this.arrComp[2].value=="e-mail*"){
            this.arrComp[2].colorText1=this.colorStart
        }else{            
            this.arrComp[2].colorText1=dcmParam.colorText1
        }

        if(this.arrComp[3].value=="Коментарии"){
            this.arrComp[3].colorText1=this.colorStart
        }else{            
            this.arrComp[3].colorText1=dcmParam.colorText1;
        }
    } 


    this.dostavka="неВыбрано";
    this.colorStart='#acacad'
    this.hh=42
    this.fs=24
    var yy=10;
    var sss=64//56
    this.arrComp=[];

    this.arrComp[this.arrComp.length]=new DInput(this.window.content,this.otstup2,yy,"Имя*",function(){
        self.dragForm() 
    })//1
       
    dcmParam.styleInput(this.arrComp[this.arrComp.length-1],"Имя*", this.hh, this.fs)
    this.arrComp[this.arrComp.length-1].width=this.window.width-this.otstup2*2-35;
    
    yy+=sss;
   
    this.arrComp[this.arrComp.length]=new DInput(this.window.content,this.otstup2,yy,"Телефон*",function(){

        self.dragForm() 
    })
    this.arrComp[this.arrComp.length-1].width=this.window.width-this.otstup2*2-35;
    dcmParam.styleInput(this.arrComp[this.arrComp.length-1],"Телефон*", this.hh, this.fs)
    yy+=sss;

   
    this.arrComp[this.arrComp.length]=new DInput(this.window.content,this.otstup2,yy,"e-mail*",function(){
        self.dragForm() 
    })
    this.arrComp[this.arrComp.length-1].width=this.window.width-this.otstup2*2-35;  
    dcmParam.styleInput(this.arrComp[this.arrComp.length-1],"e-mail*", this.hh, this.fs)
    yy+=sss;

    
    this.vuvoz=undefined
    
    if(aGlaf.par.confText.dopS!=undefined){
        if(aGlaf.par.confText.dopS.active==true){
            this.dostavka=aGlaf.par.confText.dopS.strName[1]
            this.vuvoz=new Vuvoz(this, this.window.content, this.otstup2, yy, aGlaf.par.confText.dopS, this.arrComp[this.arrComp.length-1].width)
            
            yy+=sss;
        }
    }


   /* this.arrComp[this.arrComp.length]=new DInput(this.window.content,this.otstup2,yy,"e-mail*",function(){

        self.dragForm() 
    })
    this.arrComp[this.arrComp.length-1].width=this.window.width-this.otstup2*2-35;  
    dcmParam.styleInput(this.arrComp[this.arrComp.length-1],"e-mail*")


    yy+=sss;*/


    this.arrComp[this.arrComp.length]=new DTextArea(this.window.content,this.otstup2,yy,"Коментарии",function(){

        self.dragForm() 
    })
    this.arrComp[0].timeFun=this.arrComp[1].timeFun=this.arrComp[2].timeFun=this.arrComp[3].timeFun=1;  

    
    this.arrComp[this.arrComp.length-1].width=this.window.width-this.otstup2*2-35+5;
    dcmParam.styleInput(this.arrComp[this.arrComp.length-1],"Коментарии", this.hh, this.fs)
    this.arrComp[this.arrComp.length-1].height=100;    
    yy+=120;



    this.pNew=function(){
        this.arrComp[0].text="Имя*";
        this.arrComp[1].text="Телефон*";
        this.arrComp[2].text="e-mail*";
        this.arrComp[3].text="Коментарии";
    }


    this.dragForm();
    this.arrComp[this.arrComp.length]=new DButSim(this.window.content,this.otstup,yy,"Оформить",function(){
        var bbb=true
        if(self.testImeil(self.arrComp[2]._text)==false){   
            bbb=false
            self.arrComp[2].colorText1 = "#ff9999";           
        }
        if(self.testPhon(self.arrComp[1].text)==false){   
            bbb=false
            self.arrComp[1].colorText1="#ff9999";          
        }
        
        if(self.vuvoz!=undefined){
            if(self.vuvoz.testVubor()==false){                
                bbb=false
            }
        }

        if(self.otprovlashka.window.visible==true)bbb=true
        if(bbb){
            self.window.visible=false
            self.dCPreload.visible=true
            self.getNewProd(function(){               
                self.otprovlashka.start()
            })           
        }            
    }); 
    this.arrComp[this.arrComp.length-1].height=this.hh
   // this.arrComp[this.arrComp.length-1].fontSize=62


    this.arrComp[this.arrComp.length-1].width=150; 
    this.arrComp[this.arrComp.length-1].borderRadius=70;
    this.arrComp[this.arrComp.length-1].panel.color1='#f3f5f8';
    this.arrComp[this.arrComp.length-1].label.x=7
    this.arrComp[this.arrComp.length-1].label.textAlign = 'center';
    this.arrComp[this.arrComp.length-1].label.fontFamily="SFUIDisplay-Bold"
    //this.arrComp[this.arrComp.length-1].height=40
    this.arrComp[this.arrComp.length-1].label.fontSize=24  
    this.arrComp[this.arrComp.length-1].label.width=140
    this.arrComp[this.arrComp.length-1].x=(this.window.width-140)/2-15

    yy+=this.arrComp[this.arrComp.length-1].height+this.otstup;
    this.window.height=yy+70;

    this.otprovlashka=new Otprovlashka(this,this.window.content)


    this.dragPost = function(){   
        this.otprovlashka.plusDopInfa({})
        this.fun1=null;
    }

    this.sizeWindow = function(w,h,s){   
        this._width = w;
        this._height = h;
        this._scale = s;
        if(this._active!=true)return
        this.panel.width= w/s;
        this.panel.height= h/s; 

        this.window.x=(w/s-this.window.width)/2
        this.window.y=(h/s-this.window.height)/2

        this.dCPreload.x=(w/s)/2
        this.dCPreload.y=(h/s)/2
    }

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


    this.saveFile1251 = function(s, f,link){           
        var dd=this.zamenaSimvol(s,["×","x"])        
        var ll="../resources/info.csv";
        var lll=aGlaf.server+"resources/info.csv";
        if(link!=undefined)ll=link;
        this.php.load({tip: 'saveFile1251', text: dd, link:ll}, function (e) {           
            f(lll)
        })
    } 
}

Object.defineProperties(MenuSave.prototype, {
    active: {// замена градиентов
        set: function (value) {
            if (this._active != value) {
                this._active = value;

                if(this._active){
                    this.fun1=this.dragPost;
                    this.window.visible=true
                    this.dCPreload.visible=false
                    this.par.dCont.add(this.dCont)
                    this.sizeWindow(this._width*1, this._height*1,this._scale*1);
                    this.window.visible=true;
                    this.panel.visible=true;                   
                }else{
                    this.par.dCont.remove(this.dCont)                   
                }               
            }
        },
        get: function () {
            return this._active;
        }
    },
});



export function Otprovlashka (par, cont) {
    var self=this;
    this.par=par;

    var aGlaf=this.par.par.par;
    var aMani=this.par.par.mani;
    this.php=this.par.php
   
    this.window=new DWindow(cont,510,-32,"Otprovlashka")
    this.window.width=200;
    this.window.visible=false
    this.boolClient=true

    this.otstup=5;
    this.ot1=60;
    this.otMinus=0;
    this.array=[]
    var yy=0;

    var l=new DLabel(this.window.content,this.otstup,yy*this.ot1+this.otstup-this.otMinus,"Письмо уйдет на почту:");
    l.width=this.window.width-this.otstup*2;
    l.fontFamily="SFUIDisplay-Light"    
    
    this.array[yy]=new DInput(this.window.content,this.otstup,yy*this.ot1+this.otstup-this.otMinus+20,this.par.email);
    this.array[yy].width=this.window.width-this.otstup*2;
    yy++;


    self.sahAE=0;
    self.arrayAE=this.par.email.split(",");


    var l=new DLabel(this.window.content,this.otstup,yy*this.ot1+this.otstup-this.otMinus,"Дубылировать клинету!");
    l.width=this.window.width-this.otstup*2;
    l.fontFamily="SFUIDisplay-Light"
    this.array[yy]=new DCheckBox(this.window.content,this.otstup,yy*this.ot1+this.otstup-this.otMinus+20,"да отправляем",function(){
        self.boolClient=this.value;
    });
    this.array[yy].width=this.window.width-this.otstup*2;
    this.array[yy].value=this.boolClient
    yy++;

    var l=new DLabel(this.window.content,this.otstup,yy*this.ot1+this.otstup-this.otMinus,"Титул +id");
    l.width=this.window.width-this.otstup*2;
    l.fontFamily="SFUIDisplay-Light"
    this.array[yy]=new DInput(this.window.content,this.otstup,yy*this.ot1+this.otstup-this.otMinus+20,"заказ: ");
    this.array[yy].width=this.window.width-this.otstup*2;
    yy++;

    var l=new DLabel(this.window.content,this.otstup,yy*this.ot1+this.otstup-this.otMinus,"Что пишем в письме. ");
    l.width=this.window.width-this.otstup*2;
    l.fontFamily="SFUIDisplay-Light";
    this.array[yy]=new DInput(this.window.content,this.otstup,yy*this.ot1+this.otstup-this.otMinus+20,"от: ");
    this.array[yy].width=this.window.width-this.otstup*2;
    yy++;
    this.window.height=yy*this.ot1+this.otstup-this.otMinus+32;


    var id
    var email
    var phon
    var info
    var aFoto
    var strMani;
    var strText;
    var strTitile;
    var mani
    var doLink
    var sahFoto
    var arrayLink
    var arrayBase64


    this.start=function(){
        arrayLink=[]
        arrayBase64=[]
        id=this.par.idSave;
        email=this.par.arrComp[1].text;
        phon=this.par.arrComp[2].text;
        info=this.par.arrComp[3].text;

        aFoto=[];
        aFoto[0]=aGlaf.scane3d.foto3dLarvij.get("base",512,512);
        var a=aGlaf.scane3d.foto3dLarvij.get("arrayVisi",512,512);
        for (var i = 0; i < a.length; i++) {
            aFoto.push(a[i]);
        }
        this.creatResurs(self.startAdmin)
    }  

    var ffffff
    var bbc=false
    this.creatResurs=function(fff, bool){//закидываем картинки
        bbc=false
        if(bool)bbc=true;
        ffffff=fff
        arrayLink=[]
        arrayBase64=[]
        id=this.par.idSave;
        email=this.par.arrComp[2].text;
        phon=this.par.arrComp[1].text;
        info=this.par.arrComp[3].text;

        aFoto=[];
        aFoto[0]=aGlaf.scane3d.foto3dLarvij.get("base",512,512);
        var a=aGlaf.scane3d.foto3dLarvij.get("arrayVisi",512,512);
        for (var i = 0; i < a.length; i++) {
            aFoto.push(a[i]);
        }

      
        var a=aMani.getArr();
        var str= 'артикул;название;размер;цена;цвет;кол.;общая цена;id БД\n'//"data:text/csv;charset=utf-8,%EF%BB%BF\n";
        strMani=""
        for (var i = 0; i < a.length; i++) {
            for (var j = 0; j < 5; j++) {                
                str+=a[i][j]+";"
                strMani+=a[i][j]+"  "
            }
            str+=a[i][10]+";"
            str+=a[i][11]+";"
            str+=a[i][9]+";"
            str+="\n";

            strMani+=a[i][10]+"шт.  "
            strMani+=a[i][11]+"руб.  "
            strMani+="\n";
        }
        str+=";;;;;;"+aMani.price+";"; 

        strMani+="общая стоимость : "+aMani.price+"руб."; 
        mani=aMani.price;       

        strTitile="Заказ "+id+" принят. Конструктор гардеробных систем Larvij.";
        strText=this.creatText()
        if(bbc==true){
            ffffff();
            return
        }

        this.link='../save/';
        if(this.php.key!=null) this.link="../users/"+this.php.key+"/save/";

        doLink=aGlaf.server+'save/'+id+"/";
        var ddd=this.link+id+'/infoTime';
        trace("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",doLink,ddd) 

        this.php.load({tip: 'mkdir', dir: ddd}, function (e) { 
            self.par.saveFile1251(str,function(s){                
                sahFoto=0
                self.start1()
            },'../save/'+id+'/infoTime/info.csv');

            var d =new Date()
            trace("____________________###_____________________")
            self.plusDopInfa({
                id:self.par.idSave,
                name:self.par.arrComp[0].text,
                phone:self.par.arrComp[1].text,
                emeil:self.par.arrComp[2].text,
                comment:self.par.arrComp[3].text,
                mani:aMani.price,
                mass:aMani.mass,
                volume:aMani.volume,

                dostavka:self.par.dostavka,

                link:self.par.php.server+"index.html?id="+self.par.idSave,
                csv:self.par.php.server+'save/'+self.par.idSave+'/infoTime/info.csv',
                pdf:self.par.php.server+'save/'+self.par.idSave+'/infoTime/info.pdf',
                time:d.toISOString()
            })
        })

    }



    this.textInfo
    this.plusDopInfa=function(o){
        this.testCkobki(o)
        var l='../save/'+self.par.idSave+'/infoDop.json';
        var t=JSON.stringify(o); 
        this.textInfo=t;
        this.php.load({tip:"saveJSON", link:l, text:t},function(e){
            
        });
    }


    var aaa,bbb
    this.testCkobki=function(o){//закидываем картинки
        for(var s in o){
            if(typeof o[s] =="string"){
                aaa=''
                for (var i = 0; i < o[s].length; i++) {
                    bbb=o[s][i];
                    if(o[s][i]=="'")bbb="_";
                    if(o[s][i]=='"')bbb="_";
                    aaa+=bbb
                }
                o[s]=aaa
            }
        }
    }


    this.start1=function(){//закидываем картинки
        if(aFoto[sahFoto]!=undefined){
            self.php.savePhoto('../save/'+id+'/infoTime/pic'+sahFoto+'.png', aFoto[sahFoto], function () {                
                arrayLink.push("pic"+sahFoto+'.png')
                arrayBase64.push(aFoto[sahFoto])
                sahFoto++;
                self.start1()
            }); 
        }else{  
            self.start2()
        }        
    }


    this.start2=function(){//закидываем картинки        
        self.par.par.mPrint.start(1,function(doc){            
            var blob = doc.output('blob');
            var formData = new FormData();
            formData.append('pdf', blob);
            formData.patch="dfg"           
            $.ajax(aGlaf.server+"php/uplp.php",
            {
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                patch:"dfsdfg",
                xz:"dsfsfasdf22222222222222222",
                success: function(data){ 
                   
                    var s=""; 
                    for (var i = 0; i < data.length; i++) {
                        
                        if(data[i]=="0"||data[i]=="1"||data[i]=="2"||data[i]=="3"||data[i]=="4"||data[i]=="5"||data[i]=="6"||data[i]=="7"||data[i]=="8"||data[i]=="9"){
                            s+=data[i]
                        }else{
                            break;
                        }
                    }
                    var l1='../php/tmppdf/'+s+'.pdf';
                    var l2='../save/'+id+'/infoTime/info.pdf'; 

                   

                    self.php.load({tip: 'copy', dirWith: l1, dir: l2}, function (e) {   
                        ffffff();
                    })
                    
                    self.testDirPDF()    

                },
                error: function(data){
                    console.log("-error--",data)
                    ffffff(); 
                }
            });
        });
    }

    this.testDirPDF=function(){ 
        if(Math.random()>0.1)return
        var l3='../php/tmppdf'; 
       
        self.php.load({tip: 'getDiractFiles', dir:l3}, function (e) {   
            
            var aa=e.split(",");
            var aa1=[]
            for (var i = 0; i < aa.length; i++) {
                
                if(aa[i]!=""){
                    if(aa[i].indexOf('.pdf')!=0){
                        aa1.push(aa[i])
                    }
                }
            }
            var k=5
            if(aa1.length<k){
                return
            }

            for (var i = 0; i < aa1.length-k; i++) {
             
                self.php.load({tip: 'unlink', dir: '../php/tmppdf/'+aa1[i]}, function (e) {   
                  
                })
            }
         
        })

    }



    this.sahAE=0
    this.startAdmin2=function(){ 
        if(this.sahAE==this.arrayAE.length){
            if(self.boolClient==true){
                self.startClient()
            }else{
                self.finish()
            }
            return
        }else{
            this.sahAE++;
        }

        self.naEmail(
            //self.array[0].text,//эмеил куда
            self.arrayAE[self.sahAE-1], //эмеил от кого
            self.arrayAE[0],//email,
            strTitile,//титул
            strText,// что пишем в письме
            function(d){//ответ      
                self.startAdmin2();
            },
            id
        )    
    }


    this.startAdmin=function(){//Ресурсы собраны в директорию начинаем отправку        
        self.arrayAE=self.array[0].text.split(",");
        self.sahAE=0;
        self.startAdmin2();
    } 


    this.startClient=function(){    
        self.arrayAE=self.array[0].text.split(",");    
        this.naEmail(
            email, //эмеил от кого
            self.arrayAE[0],//эмеил куда            
            strTitile,//титул
            strText,// что пишем в письме
            function(d){//ответ                                 
                self.finish();                
            },
            id
        )
        var l1='../save/trello/'+self.par.idSave+'.json';        
        self.php.load({tip:"saveJSON", link:l1, text:self.textInfo},function(e){
            
        });
    }


    this.finish=function(){        
        aGlaf.par.fun("creatLarvij",self.par.idSave);
        self.par.active=false;        
        self.par.par.mInfo.setFun("ЗАКАЗ ОФОРМЛЕН","В ближайшее время наш менеджер свяжеться с Вами для подтверждения заказа.");
    }


    this.creatText=function(){

        let link2=this.par.php.server2;
        if(this.par.php.url!=null)link2=this.par.php.url;

        let link=this.par.php.server;
        if(this.par.php.url!=null)link=this.par.php.url;


        var r="Здравствуйте, "+this.par.arrComp[0].text+"!\n";
        r+="Телефон: "+this.par.arrComp[1].text+"\n";
        r+=this.par.arrComp[2].text+"\n";
        r+="Коментарии: "+this.par.arrComp[3].text+"\n";
        r+="Доставка: "+this.par.dostavka+"\n\n";
      


        r+="Ваш заказ id="+this.par.idSave+" был успешно оформлен.\n";
        r+="В ближайшее время наш менеджер свяжется с Вами для его подтверждения.\n";
        r+="Общая стоимость вашего заказа составляет: "+aMani.price+" "+dcmParam.tCInfa.getText(1)+"\n\n";

        r+="Проект: "+link2+"?id="+this.par.idSave+"\n";                
        //r+="Спецификация: "+this.par.php.server+'/save/'+this.par.idSave+'/infoTime/info.csv'+"\n\n"; 

        
        if(dcmParam.tCInfa.getText(7)!="null") r+=dcmParam.tCInfa.getText(7)+"\n";        
        if(dcmParam.tCInfa.getText(8)!="null")r+=dcmParam.tCInfa.getText(8)+"\n\n";
        
        r+="Благодарим Вас за выбор гардеробной системы Ларвидж.\n";
        r+="Уверены, что простота в обращении, надежность и удобство гардеробной Ларвидж будут\n";
        r+="радовать Вас долгие годы.\n\n";

        r+=dcmParam.tCInfa.getText(3)+"\n";
        r+=dcmParam.tCInfa.getText(4)+"\n";
        r+=dcmParam.tCInfa.getText(5)+"\n";



        return r;
    }



    this.naEmail = function(naMail, _emeil, _mailTitle, _mailText, fun, _id){
        
        trace("------naEmail-------",_id, naMail, _emeil, _mailTitle)
        trace("---_mailText------",_mailText)
        var obj={};
        obj.mailmy=naMail;
        obj.mailMeil=_emeil;
        obj.mailTitle=_mailTitle;

        obj.mailText=_mailText; 
        obj.fileName="docxz.pdf";

        obj.id="nullxz";
        if(_id!=undefined)obj.id=_id; 

        var ss=aGlaf.server+"php/send_mail.php";
        obj.arrayLink=[]//arrayLink;
        obj.arrayBase64=[]//arrayBase64;
        $.post(ss, obj, function(data){
            trace("<<<<<<<<"+data)
            if (fun) fun(data);         
        });
    }
}