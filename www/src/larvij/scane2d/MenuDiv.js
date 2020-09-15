
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


основа для всех веток 2д меню
*/



import { NizMenu } from './nizMenu/NizMenu.js';
import { MInfo } from './MInfo.js';
import { MPrint } from './MPrint.js';
import { GalleryMani } from './GalleryMani.js';
import { MenuSave } from './MenuSave.js';
import { MHelp } from './MHelp.js';


export class MenuDiv  {
  	constructor(glaf) {  		
  		this.type="MenuDiv";
  		var self=this;
  		this.par=glaf
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону.";   
        
        this.dC=new DCont(glaf.dCont);
        this.dCont=new DCont(this.dC);
        this.dContPod=new DCont(glaf.dContPod);        
        this.verhH=76;
        this.prosentXX=0.96;
        this.widthBig=glaf.widthBig;
        this.otstup=glaf.otstup;
        this.array=[];

        this.buttonMani


      
        var w=this.widthBig-this.otstup*2
        this.www=w;

        this.mVersion = new MVersion(this);//Выводит версии//this class shows the version of the program
        this.mLogo=new MLogo(this.par.dContPod);//логотип//in this logo management location
        this.mani=new Mani(this);//Бабло//There many management
        this.menuSave=new MenuSave(this);//Сохроняшка пхп//Here is the server connection
        this.nizMenu=new NizMenu(this);//Менюха с низу //Menu at the bottom of the program
        this.mPrint=new MPrint(this);//pdf//Place of creation pdf
        this.mHelp = new MHelp(this);//Выподалка подсказок на 2 сцене
        
        this.mInfo = new MInfo(this.dCont);//окно поверх с инпутами//this is the place  for more informaion


        this.mHelp.dCNM=this.nizMenu.nmObj.dCont;

        var ss=3;    

        if(this.par.par.tip==0){

            
            this.buttonMani=new DButSim(this.dCont, 0,0,dcmParam.tCInfa.getText(2),function(){                
                if(!self.menuSave.сhangesSave){
                   self.menuSave.active=true;  
                }else{
                    var o={}
                    o.type="save";
                    o.model=self.par.scane3d.room.getObj(); 
                    o.pic=self.par.scane3d.foto3dLarvij.get("base",512,512);
                    o.list=self.mani.getMani();
                    self.par.par.fun("save",o);                   
                }  
                          
            })
            this.buttonMani.width=w*1/this.prosentXX+this.otstup;
            this.buttonMani.height=this.verhH;
            this.buttonMani.idArr=3;
            this.buttonMani.fontSize=24;
            this.buttonMani.color="#e2e7ed"
            this.buttonMani.colorText="#424242"
            this.buttonMani.label.x=35
                
        }




        this.boolMenuActiv=false;
        
        this.tween = new TWEEN.Tween(this.dC);
        this.dC.y=-80
        this.menuActiv=function(bool, time, bb){//switching scane behavior
           // console.warn("dsfdsf",bool, time, bb) 
            this.par.galleres.menuActiv(bool, time);
            this.boolMenuActiv=bool
            
            if(bb==undefined){
                this.par.scane2d.menuActiv(!bool, time);
                this.nizMenu.menuActiv(bool, time);
            }
            
            this.mani.menuActiv(bool, time);
            this.mLogo.menuActiv(bool, time);


            var yy=0;
            if(bool==true) yy=-80
            this.tween.stop();    
            this.tween.to({y:yy},time).start();
        }

        this.setConfig=function(c){ 
            this.mani.setConfig(c);
        } 


  		this.sizeWindow = function(w,h,s){ //size change here
            this.menuSave.sizeWindow(w,h,s);		
            if(this.buttonMani)this.buttonMani.x=w/s-this.buttonMani.width+this.otstup;
            this.mani.sizeWindow(w,h,s);
            this.nizMenu.sizeWindow(w,h,s);
            this.mInfo.sizeWindow(w,h,s);
            this.mLogo.sizeWindow(w,h,s);
            this.mHelp.sizeWindow(w,h,s);
            this.mVersion.sizeWindow(w,h,s) 
  		}  

        this.upDate = function () {//works continuosly 60 tiomes per second
            this.menuSave.upDate()    
             
        }	

  	}
}


//Выводит версии
//this block is responsible for the program version
export class MVersion  {
    constructor(par) {         
        this.type="MVersion";
        this.width=100
        this.height=1000
        this.par=par

        var s=this.par.par.par.plus;
        var s1=s.split("?v=");
        var ss="версия: "+s1[1]; 

        this.label=new DLabel(this.par.par.dCont,0,0,ss);
        this.label.fontSize=14;
        this.label.fontFamily="SFUIDisplay-Light";
        this.sizeWindow = function(w,h,s){  
            this.label.x= w/s-90;
            this.label.y= h/s-28;   
        }
    }
}





//боьшая деньга и увеличеная
export class Mani  {
    constructor(par) {         
        this.type="Mani";
        var self=this; 
        this.width=100
        this.height=1000
        this.par=par
        this.otstup=par.otstup;
        this.scale=1
        this._value=0;    
        this.dC = new DCont(this.par.dCont);            
        this.dCont=new DCont(this.dC);
        this._simvolMain=dcmParam.tCInfa.getText(1)

        this.minMani=new MinMani(this);

        // let aM=false
        // if(main.localStorage.object.minMani==undefined) {
        //     main.localStorage.object.minMani=false;
        //     main.localStorage.save();            
        // } 
        // aM=main.localStorage.object.minMani;
        // this.minMani.active=aM;

        this.grabStoiki=false;        
        if(dcmParam.confText.grabStoiki!=undefined)this.grabStoiki=dcmParam.confText.grabStoiki;


        this.panel = new DPanel(this.dCont,0,0);        
        this.panel.width=this.par.widthBig*this.par.prosentXX+1-this.otstup;
        if(this.par.par.par.tip==1){
            this.panel.width=this.par.widthBig*2
        }

        this.panel.height=this.par.verhH+2 
        this.panel.color1="#dcf1fa";
        this.panel.boolLine=false;

        this.label=new DLabel(this.panel,0,22,this._value+" "+this._simvolMain);
        this.label.width=500;      
        this.label.fontSize=24
        this.label.fontFamily="SFUIDisplay-Light"
        this.label.width=this.panel.width;
        this.label.textAlign='center';

        this.batonL=new DButSim(this.panel,0, 0, " ",function(){
            self.minMani.active=!self.minMani.active
        });
        this.batonL.width=this.panel.width;
        this.batonL.height=this.par.verhH;        
        this.batonL.alpha=0.0;

        this.batonL.fun_mouseover=function(){ self.minMani.visi=true};
        this.batonL.fun_mouseout=function(){ self.minMani.visi=false};
       // this.batonL.fun_mousedown=function(){ self.minMani.active=!self.minMani.active};

        var z=10;
        var oo;
        this.dragLabrl=function(){            
            this.panel.x = (this.width/this.scale-this.par.widthBig*2+10) 
        }    

        this.price=0;
        this.arrPrice=[];
        this.objPrice={};
        this.aColor=[]
        this.objMat={}
        this.setConfig=function(c){                
            for (var j = 0; j < c.three[1].array.length; j++) {                
                for (var i = 0; i < c.materials.length; i++) {                   
                    if(c.three[1].array[j].id==c.materials[i].id){
                        this.aColor[j]=c.materials[i];                        
                    }                    
                }
            }          
        } 

        this.testParSten=function(ooo){ 
            if(ooo.type=="Sten") if(ooo.active==false) return false   
            if(ooo.parent!=undefined){
                var r=this.testParSten(ooo.parent)
                if(r==false)return false                  
            }
            return true
        }

        this.getMani=function(){
            var o={}
            o.mani=this.value;
            o.mass=this.mass;
            o.volume=this.volume;
            o.array=[]
            for (var i = 0; i < arrP2.length; i++) {
                o.array[i]={p:arrP2[i][0],p1:arrP2[i][7],p2:arrP2[i][10],p3:arrP2[i][11]};
                //o.array[i]=[arrP2[i][0],arrP2[i][7],arrP2[i][10],arrP2[i][11]];
            }
            return o
        }



        var num, arrP,arrP2, aa;
        var _tip,_text,_razmer,_zena, _color, intColor
        var b,aT, bb;
        this.mass=0
        this.volume=0;  
        this.dragPriceScane2=function(array){ 
           

            
            arrP=[];
            arrP2=[];
            this.arrPrice=[];
            this.price=0;
            var ad                     
            for (var i = 0; i < array.length; i++) {            
                bb=true
                if(array[i].parent==undefined)bb=false
                else{
                    if(array[i].type=="BPieceObject")if(array[i].parent.parent==undefined)bb=false
                    
                    if(this.testParSten(array[i])==false)bb=false; 

                                       
                } 
                if(bb==true){                    
                    b=true;                   
                    intColor=0;                     
                    if(array[i].idColor=="m_7") intColor=1;
                     
                    if(array[i].getPrice!=undefined){
                        aa=array[i].getPrice(intColor, array[i].idColor)
                        for (var j = 0; j < aa.length; j++) {
                            arrP.push(aa[j]);
                        }
                        b=false;
                    }
                    if(b==true){
                        
                        /*if(intColor==0){
                            if(array[i].object.plus!=undefined){
                                aa=array[i].object.plus;
                            }
                        }
                        if(intColor==1){
                            if(array[i].object.plus1!=undefined){
                                aa=array[i].object.plus1;
                            }
                        }*/
                        aa=menedsherMaterial.getArrOtObj(array[i].object,array[i].idColor,intColor)   

                        if(aa!=null){
                            ad=[];                         
                            for (var j = 0; j < aa.length; j++) {
                                ad[j]=aa[j];                                
                            }
                            ad[8]=array[i].object;
                            ad[9]=array[i].object.id;
                            ad[10]=1;
                            ad[11]=aa[3]*1;
                            arrP.push(ad)
                        }
                    }

                    
                }
            }    
             
            this.dragPArr2();             
            this.minMani.setA(this.arrPrice);
            this.value = this.price;
            if(debag==true){
                this.label.y=5
                this.label.fontSize=20
                this.label.width=40
                this.label.text=this.price+":руб \n"+this.mass+":грам \n"+ (Math.round(this.volume*100)/100)+":m3"   
            }

            //this.label.text=this._value+" "+this._simvolMain;   
           
        }

        var debag=false
        if(this.par.par.par.localStorage.object)if(this.par.par.par.localStorage.object.dubag)debag=this.par.par.par.localStorage.object.dubag
        var kkkk
        var bbI, aa
        var lll
        this.dragPArr2=function(){             
            arrP2=[]   
            this.mass=0;
            this.volume=0;      
            for (var i = 0; i < arrP.length; i++) {

                bbI=-1;
                for (var j = 0; j < arrP2.length; j++) {
             
                    if(arrP2[j][9]==arrP[i][9])bbI=j;
                }

                if(bbI==-1){
                    aa=[]
                    for (var j = 0; j < arrP[i].length; j++) {
                        aa[j]=arrP[i][j]
                    }

                    aa[10]=1;
                    aa[11]=aa[3]*1;




                    if(aa[11]>0)arrP2.push(aa)
                    
                }else{
                    
                    if(arrP2[bbI][5]!=undefined){
                        arrP2[bbI][5]+=arrP[i][5];                        
                    }
                    if(arrP2[bbI][6]!=undefined){
                        arrP2[bbI][6]+=arrP[i][6];                        
                    }
                    arrP2[bbI][10]++;
                    arrP2[bbI][11]+=arrP2[bbI][3]*1;
                }                
            }

            for (var i = 0; i < arrP2.length; i++) {                
                arrP2[i][7]=0;
                if(arrP2[i][8])if(arrP2[i][8].priority)arrP2[i][7]=arrP2[i][8].priority*1;
            }
           
             
            this.dragarrP2();    

            arrP2.sort(function(a, b) {                  
                return b[7] - a[7];
            });            
            for (var i = 0; i < arrP2.length; i++) {
                lll="resources/data/"+arrP2[i][9]+"/100.png";                
               
                //if(arrP2[i][8]){
                    if(arrP2[i][8].obj!=undefined){
                        lll=this.getLink(arrP2[i][8].obj);
                    }else{
                        lll=this.getLink(arrP2[i][8]);
                    }

               // }
                
                
                kkkk=arrP2[i][10]
                if(debag==true){
                    kkkk = arrP2[i][10]+"/"+arrP2[i][8].priority+"/"+arrP2[i][8].id;                    
                }

                this.price+=arrP2[i][11]*1;
                
                let oooo
                if(arrP2[i][8]&&arrP2[i][8].obj&&arrP2[i][8].obj){
                    
                    oooo=arrP2[i][8].obj
                }else{
                    
                    oooo=arrP2[i][8]
                }
                
                if(oooo&&oooo.info){
                    this.mass+=oooo.info.mass*arrP2[i][10]
             
                    this.volume+=oooo.info.volume*arrP2[i][10]
                }

                



                this.arrPrice.push({
                    link:lll,
                    aText:arrP2[i],
                    kol:kkkk,
                    price:arrP2[i][11]
                })               
            }


            if(arrP2.length==0){
                this.minMani.act222=false;
            }else{
                this.minMani.act222=true;
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

        //сортируем уники
        this.dragPArr3=function(){  
            var rez=false;
            
            for (var i = 0; i < arrP2.length; i++) {
                if(arrP2[i][5]!=undefined){
                    this.korekrAAAA(i)
                    i=0;
                    rez=true;                    
                }                
            }            
            //чистим стартовый
            if(rez==true){
                for (i = arrP.length-1; i >=0; i--) {
                    if(arrP[i][5]!=undefined){
                        arrP.splice(i,1);
                    }
                }
                this.dragPArr2()
            }
            return rez;
        }

        this.bhp108= new BlaHreniZboku(108)
        this.bhp109= new BlaHreniZboku(109)
        this.dragarrP2=function(){
            var num54=0;
            var id23=-1;
            var num90=0;
            var kolMinus23=0;
            var kol108=0;
            var kol109=0;
            
         
            for (var i = 0; i < arrP2.length; i++) {               
                if(arrP2[i][9]==40){
                    arrP2[i][10]/=2
                    arrP2[i][11]/=2
                }

                if(arrP2[i][9]==34){
                    arrP2[i][10]/=2
                    arrP2[i][11]/=2
                }

                if(arrP2[i][9]==36){
                    arrP2[i][10]/=2
                    arrP2[i][11]/=2
                }
                if(arrP2[i][9]==166){
                    arrP2[i][10]/=2
                    arrP2[i][11]/=2
                    arrP2[i][10]=Math.ceil(arrP2[i][10])
                    arrP2[i][11]=arrP2[i][11]
                }
                if(this.grabStoiki==true){
                    if(arrP2[i][9]==55||arrP2[i][9]==54){
                        kolMinus23+=arrP2[i][10];
                    }  
                }
                
                
                
                if(arrP2[i][9]==108){ kol108++}
            } 
            if(this.grabStoiki==true){
                if(kolMinus23!=0){//перила ид 23 нужно вычесть 2                
                    id23=-1;
                    for (var i = 0; i < arrP2.length; i++) {                    
                        if(arrP2[i][9]==23){
                            id23=i
                        }
                    }
                    if(id23!=-1){
                        var k=arrP2[id23][10]-kolMinus23*2;
                        if(k>=1){
                            var cena=arrP2[id23][11]/arrP2[id23][10]
                            arrP2[id23][10]=k
                            arrP2[id23][11]=k*cena                    
                        }else{
                            arrP2.splice(id23,1);
                        }
                    }
                }
            }
            this.bhp108.set(arrP2)
            this.bhp109.set(arrP2)
        }


        this.oEkst={};
        this.korekrAAAA=function(_i){  
            var a=arrP2[_i];
            arrP2.splice(_i,1);
            if(this.oEkst[a[9]]==undefined){
                this.oEkst[a[9]]=new GronMani(this.par.par.scane3d.room.menedsher.menedsherObject, a[9]*1)
            }
            this.oEkst[a[9]].setW(a[5]*10,true)
            for (var i = 0; i < this.oEkst[a[9]].array.length; i++) {
                arrP.push(this.oEkst[a[9]].array[i])
            }            
        }

       
        this.menuActiv=function(bool, time){ 
           this.minMani.menuActiv(bool, time)          
        }


        this.getArr=function(){
            return arrP2;
        }

        this.sizeWindow = function(w,h,s){    
            this.scale=s
            this.width=w;
            this.height=h;
            this.dragLabrl()
            this.minMani.sizeWindow(w,h,s)
        }
    }

    set value(v) {
        if(this._value!=v){
            this._value = v;
            this.label.text=this._value+" "+this._simvolMain;     
            this.dragLabrl()
        }
    }
    get value() { return  this._value;}
}


export class BlaHreniZboku  {
    constructor(id) { 
        this.id = id;        
        var kol,kol1,b

        this.set=function(a){
            b=false;
            kol=0
            kol1=0
            for (var i = 0; i < a.length; i++) {                    
                if(a[i][9]==this.id){
                    var sss=a[i][11]/a[i][10]
                    kol=a[i][5]
                    if(kol<a[i][6])kol=a[i][6]
                    a[i][10] = kol 
                    a[i][11]= kol *sss                    
                }
            }
        }
    }
}





export class GronMani  {
    constructor(mO, id) { 
        this.id=id;
        this.mO=mO;
        this.object=this.mO.getIdObj(id)
        
        this.arrayPP=[]
        this.array=[]
        var a=this.object.obj.str[1].split(",")

        for (var i = 0; i < a.length; i++) {
            this.arrayPP[i]=this.mO.getIdObj(a[i])
        } 

        this.arrayPP.sort(function(a, b) {                  
            return a.obj.num[0] - b.obj.num[0];
        });

        this.clear=function(){
            this.array=[]
        }

        var num, aaa,op;
        this.setW=function(w,  b){
            if(b!=undefined)this.clear();

            num=-1
            if(w>this.arrayPP[this.arrayPP.length-1].obj.num[0]){                
                num=this.arrayPP.length-1;
            }
            else{
                op=0
                for (var i = 0; i < this.arrayPP.length; i++) {

                    if(w>op){
                        if(w<=this.arrayPP[i].obj.num[0]){                            
                            num=i;
                            break;
                        }
                    }
                    op=this.arrayPP[i].obj.num[0]
                }
            }            

            if(num!=-1){
                aaa=[];                
                for (var i = 0; i < 4; i++) {
                    aaa[i]=this.arrayPP[num].obj.plus[i];
                }
                aaa[9]=this.arrayPP[num].obj.id;
                aaa[8]=this.arrayPP[num].obj;
                this.array.push(aaa)
                this.setW(w-this.arrayPP[num].obj.num[0])
            }
        }         
    }
}



//боьшая деньга и увеличеная
export class MinMani  {
    constructor(par) {         
        this.type="MinMani";
        var self=this; 
        this.par=par
        this.otstup=this.par.otstup       
        this.width=this.par.par.widthBig*2-this.otstup*2
        this._height=300        
        
        this._active = false;
        this._activeOk= false; 
        this._visi = false;
        this.arraySet=undefined
        this.wh=40//dcmParam.wh

        this.dC=new DCont();

        this.dCont=new DCont(this.dC);
        this.dCont.y=this.par.par.verhH+this.otstup
        this.panel = new DPanel(this.dCont,0,0);        
        this.panel.width=this.width;
        this.panel.height=this._height;  
        this.panel.color1=dcmParam.color//"#dcf1fa";   
        this.panel.boolLine=false
        
        this.dCont2=new DCont();
        this.dCont2.x=0;
        this.dCont2.y=this.wh;
        this._act222=false

        this.par.dCont.add(this.dCont2)

        this.down=function(b){
            
            if(this.alpha!=1)return
            if(this.idArr==0){//спецификация                
                var a=self.par.getArr();
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
                str+=";;;;;;"+self.par.price+";";  
              
                self.par.par.menuSave.saveFile1251(str,function(s){                    
                    window.location = s;
                })
            }

            if(this.idArr==1){//фото 3d
                var s=self.par.par.par.scane3d.foto3dLarvij.get("base",512,512)
            }

            if(this.idArr==2){//сохронить модель
                var o=self.par.par.par.scane3d.room.getObj();                
                download(JSON.stringify(o),"save.larvij");
            }

            if(this.idArr==3){//загрузить модель                
                var a=b.split("base64,")                
                var str=window.atob( a[1] )                
                var conf = JSON.parse(str)                
                self.par.par.par.scane3d.room.setObj(conf);                
            }
        }


        this.tween = new TWEEN.Tween(this.dC);
        //this.dC.x=370
        this.menuActiv=function(bool, time){          
            var xx=0;
            if(bool==true) xx=370
            this.tween.stop();    
            this.tween.to({x:xx},time).start();
        }


        var ooo=this.otstup
        function download(data, filename, type) {
            var csvContent = data;
            var textEncoder = new TextEncoder('windows-1252');
            var csvContentEncoded = textEncoder.encode([csvContent]);

            var file = new Blob([csvContentEncoded],{type: 'text/csv;charset=windows-1252;'});
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, filename);
            else { // Others
                var a = document.createElement("a"),
                url = URL.createObjectURL(file);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {                    
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);  
                }, 0); 
            }
        }

        var a=[];

        this.galleryMani=new GalleryMani(this.panel, this.otstup, this.otstup*2+this.wh, function(s,p){
            if(s==undefined)self.galleryMani.index=-1;
        })
        this.galleryMani.y=0;
        this.galleryMani.width=this.panel.width+this.otstup*2;
        this.galleryMani.kolII=1
        this.galleryMani.widthPic=this.panel.width-this.otstup*2+this.otstup*2;
        this.galleryMani.heightPic=64;  

        this.galleryMani.bmd=true
        this.galleryMani.simvol=dcmParam.tCInfa.getText(1) 

        this.hhhh=this._height-this.galleryMani.y-this.otstup*2;
        this.setA = function(a){             
            if(a.length==0){
                this.galleryMani.visible=false;
                this.panel.height=this.otstup*3+this.wh; 
                return
            }
            this.galleryMani.visible=true;
            this.arraySet=a;
            this.galleryMani.start(a);
            this.setADrah()
        }

        var hh
        this.setADrah = function(){
             
            if(this.galleryMani.hh>this._height){                
                
                this.panel.height=this._height;
                this.galleryMani.height=this._height/this.ss;                              
            }else{
                
                this.panel.height=this.galleryMani.hh;
                this.galleryMani.height=this._height/this.ss;             
            }           
        }

        this.setA(a);
        this.ww=111;
        this.hh=111; 
        this.ss=1;
        this.sizeWindow = function(w,h,s){    
            this.ww=w;
            this.hh=h;
            this.ss=s;            
            if(this._act222==true){                
                this.dCont.x=(w/s-this.width)
            } 
            else {                
                this.dCont.x=w/s; 
            }
            this.dCont2.x =w/s-this.width-(this.wh+ooo)*2    
            this.height= h-260*s;
        }


        this.dragVisi = function(){  
            var b=false;
            if(this._active==true){
                b=true;
                this.dCont.alpha=1;
                if(this.visi==true){
                    this.dCont.alpha=0.5;
                }
            }else{
                if(this.visi==true){
                    this.dCont.alpha=0.5;
                    b=true;
                } 
            }
            this.activeOk=b;           
        }

        let aM=false
        if(main.localStorage.object.minMani==undefined) {
            main.localStorage.object.minMani=false;
            main.localStorage.save();            
        } 
        aM=main.localStorage.object.minMani;
        this.active=aM;
    }


 
    set height(v) {
        if(this._height!=v){
            this._height = v;            
            
            this.setADrah()
        }
    }
    get height() { return  this._height;}


    set act222(v) {
        if(this._act222!=v){
            this._act222 = v;            
            this.sizeWindow(this.ww*1,this.hh*1,this.ss*1)
        }
    }
    get act222() { return  this._act222;}


    set active(v) {
        if(this._active!=v){
            this._active = v;
            this.dragVisi();
            if(this._active==true)this.dCont.alpha=1;
            if(this._active==false)this.dCont.alpha=0;

            main.localStorage.object.minMani=v;
            main.localStorage.save();  
        }
    }
    get active() { return  this._active;}


    set visi(v) {
        if(this._visi!=v){
            this._visi = v;
            this.dragVisi();           
        }
    }
    get visi() { return  this._visi;}     


    set activeOk(v) {
        if(this._activeOk!=v){
            this._activeOk = v;           
            if(this._activeOk==true){
                this.par.dCont.add(this.dC)
                
            }else{
                this.par.dCont.remove(this.dC)
               
            } 
        }
    }
    get activeOk() { return  this._activeOk;}
}


//логотип
export class MLogo  {
    constructor(dCont) {         
        this.type="MLogo";
        var self=this;
        
        this._active = false; 
        this.otstup=2;
        this.dC = new DCont(dCont);       
        this.dCont = new DCont(this.dC);
        this.width=100;

        this.image=new DImage(this.dCont, 0, 0,"resources/image/mLogo.png",function(){
            self.drag()
        });

        this.label=new DLabel(this.dCont, 0, 0,"Larvij Wardrobe Planner")
     
        this.label.fontSize=18
        this.label.fontFamily="SFUIDisplay-Light"        
        this.label.width=180

        this.label.div.style.pointerEvents="none";
        this.image.div.style.pointerEvents="none"; 

        this.label.x=-this.label.width-this.width;

        this.drag=function(){
            this.width=this.image.picWidth;
            this.image.width=this.image.picWidth;
            this.image.height=this.image.picHeight;

            this.image.x=-this.width;

            this.label.y=(this.image.height-this.label.fontSize)/2;
            this.label.x=-this.label.width-this.width;
            
            this.sizeWindow()
        }


        this.ww=111;
        this.hh=111; 
        this.ss=1;
        this.sizeWindow = function(w,h,s){    
            
            if(w!=undefined){
                this.ww=w;
                this.hh=h;
                this.ss=s; 
            }

            this.dCont.x=this.ww/this.ss-355
            var xx=this.dCont.x+this.label.x

            if(xx<270)this.label.visible=false
            else this.label.visible=true            
           
        }


        this.tween = new TWEEN.Tween(this.dC);
        this.dC.x=360
        this.menuActiv=function(bool, time){          
            var xx=0;
            if(bool==true) xx=360
            this.tween.stop();    
            this.tween.to({x:xx},time).start();
        }
    }
}