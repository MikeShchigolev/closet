



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
            url: php.server+"resources/configText.json?"+Math.random(),
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
        this.array[2]=this.diCsv=new DICsv(this);
        this.setActiv(this.vsakoe);
        this.sizeWindow();
    }



    this.setActiv = function(o){  
               
        for (var i = 0; i < this.array.length; i++) {
            trace(i+"  "+this.array[i])
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
        var ss  =JSON.stringify(this.confText)           
        var l=php.server+aGlaf.resurs+"configText.json";
        var l="../resources/configText.json";

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


        this.diCsv.sizeWindow(this.width, this.height);
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


///////////////////////////////////////
/////////////////////////////////////


function DICsv(par) {  
    var self=this;  
    this.type="DICsv";
    this.par=par;
    this.otstup=2;
    this._active=false;

    this._boolBog=false;

    this._indexColor=-2;

    this.dCont=new DCont(this.par.w.content);
    this.dCont.visible=false   
    this.button=new DButton(this.par.w, this.otstup*3+200, this.otstup,"Ред csv", function(s){       
        self.par.setActiv(self);
    });
    this.button.height=28;

    this.arrayColor=[];
    this.csvConfig = null; 
    
    var yy=this.otstup;

    this.bbb=false;


    this.dGal=new DIGal(this,function(s,p){
        doSave();
    })

    this.dGBig=new DGBig(this,function(s,p){
        doSave();
    })

    this.init=function(){
        if(this.bbb==true)return
        this.bbb= true   
       
        //return
        $.ajax({                
            url:"resources/csvConfig.csv?"+Math.random(),
            success: function function_name(data) {
                self.csvConfig = data;               
                self.startText(self.csvConfig);                                       
            }
        });

    }

    this.startText=function(_str){
        this.clear();

        let a=_str.split("\n")
        
        if(a[0].indexOf("id")!=-1){
            a.splice(0,1);
        }
        this.arrayColor.push(new DIVColor(this,a[0]));

        for (var i = 1; i < a.length; i++) {   
            
            if(a[i].indexOf("colorNew")!=-1){
                this.arrayColor.push(new DIVColor(this,a[i]));
                continue;
            } 
            this.arrayColor[this.arrayColor.length-1].setStr(a[i]);
               
            
        }
        this.redragColor();
       

    }


    this.clear=function(){
        this.arrayColor=[];
    }




    ////////////////////соновляем пачку цветов////


    function doSave(){
        self.batSave.alpha=1        
    }

    
    this.save=function(){   
        //if(self.batSave.alpha!=1)return
        var s="id\n";
        for (var i = 0; i < this.arrayColor.length; i++) {
            s+="colorNew;"+this.arrayColor[i].name+";;;;";
            for (var j = 0; j < this.arrayColor[i].arrayColor.length; j++) {
                s+=this.arrayColor[i].arrayColor[j]+";;;;";
            }
            s+="\n";
            for (var j = 0; j < this.arrayColor[i].arrayBlok.length; j++) { 
                s+=this.arrayColor[i].arrayBlok[j][0];
                for (var jj = 1; jj < this.arrayColor[i].arrayBlok[j].length; jj++) {
                    s+=";"+this.arrayColor[i].arrayBlok[j][jj];
                }
                s+="\n";             
            }          
        }
        self.batSave.alpha=0.25; 
        s=s.slice(0, -1);
        
        
        
        var l = "../resources/csvConfig.csv";        
        aGlaf.php.load({tip:"saveJSON", link:l, text:s},function(e){
            trace(">>>>>>>>>>>>>>>>>>",e);

        });
        
    }


    this.sobBC=function(){
        self.indexColor=this.idArr;
    }   
    this.panel=new DPanel(this.dCont, this.otstup, this.otstup);
    this.panel.height=36
    this.panel.width=1111
/*
    this.input=new DInput(this.panel, this.otstup, this.otstup,"null", function(s){ 
        if(self.arrayColor[self.indexColor]!=undefined){
            self.arrayColor[self.indexColor].name=this.value;
            self.abc[self.indexColor].text=this.value;
            doSave();
        }

    });
    this.input.timeFun=1;

    this.input1=new DInput(this.panel, this.otstup, this.otstup,"null", function(s){ 
        
    });
    this.input1.timeFun=1;

    this.bat=new DButton(this.panel, this.otstup, this.otstup,"-",function(){

    });
    this.bat.width=this.bat.height

    this.bat1=new DButton(this.panel, this.otstup, this.otstup,"+",function(){

    });
    this.bat1.width=this.bat.height*/



    this.batS=new DButton(this.panel, this.otstup, this.otstup,"Выборочная замена цены ",function(s){
        var a=s.split("base64,");
        var str=window.atob(a[1]);
        let aa=str.split(";");
        
        for (var i = 0; i < self.arrayColor.length; i++) {
           self.arrayColor[i].testMarkArr(aa)
        }
        var hh=this._indexColor;
        
         
    });
    this.batS.width=250;
    this.batS.startFile("csv");



    this.bat=new DCheckBox(this.panel, 125, this.otstup, " ",function(){
        self.boolBog=this.value
    });
    this.bat
    


    this.batSave=new DButton(this.panel, this.otstup, this.otstup,"SAVE",function(){
        self.save();
    });
    this.batSave.color="#f28044";
    this.batSave.width=120
    this.batSave.alpha=0.2

    this.abc=[];
    this.redragColor=function(){
        let ww=150
        for (var i = 0; i < this.arrayColor.length; i++) {
            let b
            if(this.abc[i]==undefined){
                this.abc[i]=new DButton(this.panel, this.otstup+(this.otstup+150)*(i+1), this.otstup,"",this.sobBC);
                this.abc[i].width=150
                this.abc[i].idArr=i
            }
            this.abc[i].text=this.arrayColor[i].name;
            

        }
        let ba=16
       /* this.input.x=(this.arrayColor.length+1)*150+ba
        this.input1.x=(this.arrayColor.length+1)*150+102+ba
        this.bat.x=(this.arrayColor.length+1)*150+204+ba
        this.bat1.x=(this.arrayColor.length+1)*150+204+this.bat1.width+ba*/

        this.indexColor=0;
    }

    this.indexColor=-1;



    this.width=100;
    this.height=100;
    this.sizeWindow = function(w,h){
        if(w!=undefined){
            this.width=w;
            this.height=h; 
        }
        this.panel.width=w-4
        this.batS.x=this.panel.width-this.batS.width;
        
        this.dGal.sizeWindow(w,h);
    }



    Object.defineProperty(this, "boolBog", {
        set: function (value) {            
            if(this._boolBog!=value){
                this._boolBog=value;
                this.dGal.dCont.visible= !value;   
                this.dGBig.dCont.visible= value;                                        
            }           
        },
        get: function () {
            return this._boolBog;
        }
    });


    Object.defineProperty(this, "indexColor", {
        set: function (value) {            
            if(this._indexColor!=value){
                this._indexColor=value;
                if(this.arrayColor[this._indexColor]){
                    /*this.input.visible=true;                    
                    this.input1.visible=true;                    
                    this.bat.visible=true;                    
                    this.bat1.visible=true;*/

                    for (var i = 0; i < this.arrayColor.length; i++) {
                        if(i==this._indexColor)this.abc[i].alpha=0.5
                        else this.abc[i].alpha=1
                    }
                    //this.input.value=this.arrayColor[this._indexColor].name
                    this.dGal.setDCol(this.arrayColor[this._indexColor]);
                    this.dGBig.setDCol(this.arrayColor[this._indexColor]);
                    this.dGal.index=-1;
                    this.dGal.index=this.dGal.gallery.array.length-1;

                }else{
                   /* this.input.visible=false;                   
                    this.input1.visible=false;                   
                    this.bat.visible=false;                    
                    this.bat1.visible=false;*/                   
                }
                             
            }           
        },
        get: function () {
            return this._indexColor;
        }
    });


    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;
                this.init();               
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


function DGBig(par, fun) {  
    var self=this;  
    this.type="DGBig";
    this.par=par;
    this.otstup=2;
    this._active=false;
    this.dCont=new DCont(this.par.dCont);
    this.dCont.visible=false;
    this.w=new DWindow(this.dCont, this.otstup, this.otstup+40 ,"Настройки цветов");
    this.w.width=320;
    //this.w.dragBool=false;
    this.w.hasMinimizeButton=false;

    let yy=this.otstup
    this.bat=new DButton(this.w.content, this.otstup, this.otstup,"Новая",function(s){
        self.par.arrayColor.push(new DIVColor(self.par,"colorNew;Новая;;;;"))        
        self.par.redragColor()
        self.par.indexColor=self.par.arrayColor.length-1;
    });
    this.bat.width=(this.w.width-4);
   
    /*this.bat=new DButton(this.w.content, this.otstup+(this.w.width-8)/2, this.otstup,"Удалить эту",function(s){
        if(self.par.arrayColor.length>=1){
            if(self.par.arrayColor[self.par.indexColor]){
                self.par.arrayColor.splice(self.par.indexColor,1);
                var pp=self.par.indexColor-1;
                if(pp<0)pp=0
                self.par.redragColor();
                self.par._indexColor=-1
                self.par.indexColor=pp;
            }
        }
    });
    this.bat.width=(this.w.width-8)/2*/
    yy+=34

    new DLabel(this.w.content,this.otstup*2,yy+10,"name").fontSize=12
    this.input=new DInput(this.w.content, this.otstup*3+70, yy,"null", function(s){ 
        if(self.dCol!=undefined){
            self.dCol.name=this.value;
            par.abc[par.indexColor].text=this.value;
           // doSave();
        }
    });
    this.input.timeFun=1;
    this.input.width=this.w.width-4-this.input.x;


    this.gl=null
    this.aC=function(){
        if(this.gl==null){
            this.gl=new DGallery(this.w.content, this.otstup+this.w.width ,70,function(){
                self.dCol.addColor(self.gl.array[self.gl._index].object.title);
                self.setDCol(self.dCol);
                self.gl.visible=false;
            })
            this.gl.width=48*4+15;
            this.gl.kolII=4;
            this.gl.widthPic=48;
            this.gl.heightPic=48;
            this.gl.height=600;
            
            let aZZ=[];  
            for (var i = 0; i < aGlaf.objectBase.materials.length; i++) {
                aZZ.push({src:"resources/data/"+aGlaf.objectBase.materials[i].id+"/64.png",title:aGlaf.objectBase.materials[i].id});
            }
            this.gl.start(aZZ);
        }
        this.gl.index=-1
        this.gl.visible=true

    }

    this.down=function(){
        if(this.text=="+")self.aC();
        if(this.text=="-"){
            if(self.gallery.array[self.gallery.index])self.dCol.clearMark(self.gallery.array[self.gallery.index].object.title);
            self.setDCol(self.dCol);
            self.gallery.index=-1;
        }
        if(this.text=="<"){
            if(self.gallery.array[self.gallery.index]&&self.gallery.array[self.gallery.index-1]){
                self.dCol.naMark(
                    self.gallery.array[self.gallery.index].object.title,
                    self.gallery.array[self.gallery.index-1].object.title
                );
                
                let pp=self.gallery._index
                self.setDCol(self.dCol);
                self.gallery._index=-1
                self.gallery.index=pp;
            }           
        } 
        


    }


    var b;
    var ww=28;
    for (var i = 0; i < 3; i++) {
        b=new DButton(this.w.content,(this.otstup+ww)*i+this.otstup, 70, " ",this.down);
        b.idArr=i;
         
        if(i==0)b.text="+";
        if(i==1)b.text="-";
        if(i==2)b.text="<"; 
               
        b.width=ww;
        b.height=ww;
    }

    this.gallery=new DGallery(this.w.content, this.otstup ,100,function(){
      
    })
    this.gallery.width=this.w.width-8;
    this.gallery.kolII=3;
    this.gallery.widthPic=this.gallery.width/this.gallery.kolII-3;
    this.gallery.heightPic=this.gallery.widthPic;

    this.gallery.height=this.gallery.heightPic*2+10

    this.w.height=this.gallery.height+2+this.gallery.y+32

    this.dCol=null
    this.setDCol=function(dCol){
        this.dCol=dCol;
        this.input.value=dCol.name;
        let aZZ=[];        
        for (var i = 0; i < dCol.arrayColor.length; i++) {
            aZZ.push({src:"resources/data/"+dCol.arrayColor[i]+"/64.png",title:dCol.arrayColor[i]});            
        }                  
        this.gallery.start(aZZ);
        /*for (var i = 0; i < this.gallery.array.length; i++) {
            this.gallery.array[i].lebel.visible=true
        }*/
        if(self.gl)self.gl.visible=false;
    }


}


function DIVColor(par, strStart) { 
    trace(strStart)
    this.strStart=strStart;
    this.par=par;
    this.name="null";
    let a=strStart.split(";");
    this.name=a[1];

    this.arrayColor=[];
    this.arrayBlok=[];

    for (var i = 5; i < a.length; i+=4) {
        if(a[i].indexOf("m_")!=-1){
            this.arrayColor.push(a[i]);
        }       
    }

    this.strS    
    this.setStr=function(str){
        this.strS =str

        this.arrayBlok.push(str.split(";"))
        this.arrayBlok[this.arrayBlok.length-1].splice(6+this.arrayColor.length*4)
    }

    this.addColor=function(idMat){
        this.arrayColor.push(idMat)
        for (var i = 0; i < this.arrayBlok.length; i++) {            
            this.arrayBlok[i].push("","","","");
        }
    }


    this.clearMark=function(idMat){
        
        for (var i = 0; i < this.arrayColor.length; i++) {
            if(idMat==this.arrayColor[i]){
                this.arrayColor.splice(i,1);
                for (var j = 0; j < this.arrayBlok.length; j++) {
                    this.arrayBlok[j].splice(5+(i*4),4);
                }
            }
        }
    }

    this.naMark=function(idMat, naMat){
        var p=-1;
        var p1=-1;
        for (var i = 0; i < this.arrayColor.length; i++) {
            if(idMat==this.arrayColor[i])p=i;
            if(naMat==this.arrayColor[i])p1=i;
        }

        if(p!=-1&&p>=1){
            let c = this.arrayColor.splice(p,1)[0];
            this.arrayColor.splice(p-1,0,c);

            for (var j = 0; j < this.arrayBlok.length; j++) {
                let c1 =this.arrayBlok[j].splice(5+(p*4),4);
                this.arrayBlok[j].splice(5+(p-1)*4,0,c[0],c[1],c[2],c[3]);
            }
        }



    }


    this.testMarkArr=function(a){
       
        for (var j = 0; j < this.arrayBlok.length; j++) {
            for (var i = 0; i < this.arrayColor.length; i++){            
                if(this.arrayBlok[j][5+i*4]!=undefined){
                    if(this.arrayBlok[j][5+i*4].length>3){
                        //trace("  >>>  "+this.arrayBlok[j][5+i*4]+"    "+this.arrayBlok[j][6+i*4]);
                        for (var ii = 0; ii < a.length-1; ii++) {
                            if(a[ii] == this.arrayBlok[j][5+i*4]){
                                this.arrayBlok[j][6+i*4]=a[ii+1]                              
                            }   

                        }
                        

                    }
                }  
            }
        } 
    }
        
}



function DIGal(par, fun) {  
    var self=this;  
    this.type="DIGal";
    this.par=par;
    this.otstup=2;
    this._active=false;
    this.dCont=new DCont(this.par.dCont);

    this.panel=new DPanel(this.dCont, this.otstup+322, this.otstup+42);
    this.panel.height=1200;
    this.panel.width=1200;

    this.dmxz=new DXZXZ(this,function(s,p){
        if(s=="sd"){
            self.gallery.array[self.gallery.index].redragggg(p) 
            fun();
        }
    })


    this.gallery = new GalleryXZ1(this.panel,2,2,function(){
        self.index=this.index;
    });
    this.gallery.width=this.panel.width-6;
    this.gallery.kolII=4;
    this.gallery.widthPic=(this.gallery.width-4-(this.gallery.kolII*2))/this.gallery.kolII;
    this.gallery.heightPic=40;


    this.dCol=null
    this.setDCol=function(dCol){
        this.dCol=dCol;
        this.gallery.start(this.dCol.arrayBlok);
        this.dmxz.setDCol(dCol)

    }

    this.width=100;
    this.height=100;
    this.sizeWindow = function(w,h){
        if(w!=undefined){
            this.width=w;
            this.height=h; 
        }        
        this.panel.height=h-this.gallery.y-130
        this.gallery.height=this.panel.height-8
    }

    this.clearArray = function(ind){
        if(this.gallery.array[ind]){
            this.dCol.arrayBlok.splice(ind,1)
            this.gallery.start(this.dCol.arrayBlok);
            if(this.gallery.array[ind]){
                this.index=-1;
                this.index=ind;
            }else{
                this.index=-1;
            }
            fun();
        }
    }

    this.addArray = function(ind,arr){
        this.dCol.arrayBlok.push(arr)
        this.gallery.start(this.dCol.arrayBlok);

        //this.dCol.arrayBlok.splice(ind,0,arr)
        
        this.index=-1;
        this.index=this.dCol.arrayBlok.length-1;
    }

    Object.defineProperty(this, "index", {
        set: function (value) {            
            if(this._index!=value){
                this._index=value;                
                this.gallery.index=value;
                if(this.gallery.array[this.gallery.index]){
                    this.dmxz.setObj(this.gallery.array[this.gallery.index].object)
                }           
            }           
        },
        get: function () {
            return this._index;
        }
    });
}



function DXZXZ(par, fun) {  
    var self=this;  
    this.type="DopInfo";
    this.par=par;
    this.otstup=2;
    this._active=false;

    this.dCont=new DCont(this.par.dCont);   


    this.w=new DWindow(this.dCont, this.otstup, this.otstup+40 ," ");
    this.w.width=320;
    //this.w.dragBool=false;
    this.w.hasMinimizeButton=false;

    this.but=new DButton(this.w,this.w.width-102,2,"удалить",function(){
        par.clearArray(par.index);
    })
    this.but.height=28;

    this.but=new DButton(this.w,this.w.width-204,2,"добавить",function(){
        par.addArray(0,[""]);
    })
    this.but.height=28;


    this.image = new DImage(this.w.content,this.otstup,this.otstup)    

    var yy=this.otstup
    new DLabel(this.w.content,this.otstup*2+100,yy+10,"id").fontSize=12
    this.input=new DInput(this.w.content,this.otstup*2+150,yy,"-",function(){
        self.arr[0]=this.value;
        self.image.link="resources/data/"+self.arr[0]+"/100.png"
        fun("sd");
    })
    this.input.width=this.w.width-4-this.input.x

    yy+=34
    new DLabel(this.w.content,this.otstup*2+100,yy+10,"text").fontSize=12
    this.input1=new DInput(this.w.content,this.otstup*2+150,yy,"-",function(){
        self.arr[1]=this.value;        
        fun("sd",1);
    })
    this.input1.width=this.w.width-4-this.input1.x

    yy+=34
    new DLabel(this.w.content,this.otstup*2+100,yy+10,"размер").fontSize=12
    this.input2=new DInput(this.w.content,this.otstup*2+150,yy,"-",function(){
        self.arr[2]=this.value;        
        fun("sd",1);
    })
    this.input2.width=this.w.width-4-this.input1.x

    yy+=34
    new DLabel(this.w.content,this.otstup*2+100,yy+10,"масса килограм").fontSize=12
    this.input3=new DInput(this.w.content,this.otstup*2+190,yy,"-",function(){
        self.arr[3]=this.value;        
        fun("sd",1);
    })
    this.input3.width=this.w.width-4-this.input3.x

    yy+=34
    new DLabel(this.w.content,this.otstup*2+100,yy+10,"обьем м3").fontSize=12
    this.input4=new DInput(this.w.content,this.otstup*2+190,yy,"-",function(){
        self.arr[4]=this.value;        
        fun("sd",1);
    })
    this.input4.width=this.w.width-4-this.input4.x

    this.arr
    this.setObj=function(arr){
        this.arr=arr;        
        this.redrag();
        let ac=[] 
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].setObj(arr);
            ac.push(this.array[i].input.value);
        }   


        let b=dcmParam._color1
        for (var i = 0; i < ac.length; i++) {
            for (var j = 0; j< ac.length; j++) {                
                if(i!=j && ac[i]==ac[j]){
                    b="#f5ccbc";
                }
            }
        }
        trace(">>>>>>>>>>>>",b,ac)
        for (var i = 0; i < this.array.length; i++) {            
            this.array[i].input.color1=b
        } 

    }



    this.redrag=function(){
        this.image.link="resources/data/"+this.arr[0]+"/100.png"
        this.input.value=this.arr[0];
        this.input1.value=this.arr[1];
        this.input2.value=this.arr[2];
        this.input3.value=this.arr[3];
        this.input4.value=this.arr[4];
    }


    this.sob=function(s){
        fun("sd",1);        
    }

    this.array=[];
    this.dCol=null
    this.setDCol=function(dCol){
        this.dCol=dCol;
        
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].dCont.visible=false;
        }
        for (var i = 0; i < this.dCol.arrayColor.length; i++) {
            if(this.array[i]==undefined){
                this.array[i]=new BLADXZ(this, i, this.sob)
            }

            this.array[i].setId(this.dCol.arrayColor[i])
            
        }

         

        this.w.height=32+180+(this.dCol.arrayColor.length)*155;
    }
}


////////
function BLADXZ(par, idArr,fun) {
    var self=this  
    this.type="DopInfo";
    this.par=par;
    this.h=110;
    this.otstup=2;
    this.idArr=idArr;
    
    this.dCont=new DCont(this.par.w.content); 

    this.panel=new DPanel(this.dCont,this.otstup,180+idArr*this.h); 
    this.panel.width=this.par.w.width-4
    this.panel.height=this.h-2; 

    this.image = new DImage(this.panel,this.otstup,this.otstup);


    this.setId=function(id){
        this.image.link="resources/data/"+id+"/100.png";
        this.dCont.visible=true;
        ll.value=id+""
    }

    var yy=this.otstup

    var ll=new DLabel(this.panel,this.otstup,yy,"null")
    ll.bold=true
    ll.fontSize=12

    new DLabel(this.panel,this.otstup*2+100,yy+10,"артикул").fontSize=10
    this.input=new DInput(this.panel,this.otstup*2+190,yy,"-",function(){
        self.arr[5+self.idArr*4]=this.value;
        fun()  
    })
    this.input.width=this.panel.width-4-this.input.x
    yy+=34
   
    new DLabel(this.panel,this.otstup*2+100,yy+10,"цена").fontSize=12
    this.input1=new DInput(this.panel,this.otstup*2+190,yy,"-",function(){
        self.arr[5+self.idArr*4+1]=this.value;
        fun() 
    })
    this.input1.width=this.panel.width-4-this.input.x
    yy+=34

    new DLabel(this.panel,this.otstup*2+100,yy+10,"тип").fontSize=12
    this.input2=new DInput(this.panel,this.otstup*2+190,yy,"-",function(){
        self.arr[5+self.idArr*4+2]=this.value;
        fun(); 
    })
    this.input2.width=this.panel.width-4-this.input.x
    yy+=34

    this.arr
    this.setObj=function(arr){
        this.arr=arr;
        this.input.value = self.arr[5+self.idArr*4] 
        this.input1.value = self.arr[5+self.idArr*4+1]
        this.input2.value = self.arr[5+self.idArr*4+2]

        

    }
}  








function GalleryXZ1(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);             
    
    this.aaaa=[]
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

        let axz=[]
        axz[0]=[]
        for (var i = 0; i < this.array.length; i++) {

            if(this.aaaa[i]==undefined)this.aaaa[i]=new THREE.Vector2();
            this.aaaa[i].x=ii * (this._widthPic + this._otstup) + this._otstup;
            this.aaaa[i].y=jj * (this._heightPic + this._otstup) + this._otstup;

            //this.array[i].x = ii * (this._widthPic + this._otstup) + this._otstup;
            //this.array[i].y = jj * (this._heightPic + this._otstup) + this._otstup;
            if (this.array[i].x + this._widthPic + this._otstup > ww)ww = this.aaaa[i].x + this._widthPic + this._otstup;
            hh = (jj + 1) * (this._heightPic + this._otstup) + this._otstup;
            axz[jj][ii]=this.aaaa[i];
            ii++;
            if (ii >= this._kolII) {
                ii = 0;
                jj++;
                axz[jj]=[];
            }
        }
        //jj++;

        ii = this.array.length-1;
        /*trace(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",axz,this.array)
        trace(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",this._kolII)
        for (var i = 0; i <= this._kolII; i++) {
            for (var j = 0; j < jj; j++) {                
                if(axz[i]!=undefined){
                    if(axz[j][i]!=undefined){
                        trace(ii+"  "+i+"  "+j+"  ",axz[j][i])                    
                        this.array[ii].x = axz[j][i].x;
                        this.array[ii].y = axz[j][i].y;

                        ii-=1;                    
                        if(ii==-1)break
                    }
                }
            }
        }*/






        for (var i = 0; i < this.array.length; i++) {
            this.array[this.array.length-1-i].x = this.aaaa[i].x;
            this.array[this.array.length-1-i].y = this.aaaa[i].y;
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
            this.panel.height=this._height;
        }
        //this.graphics.drawRect(0, 0, ww, hh);
        this.dragIE()
        if (this.postDraw) this.postDraw();
    };




    this.createZamen=function(){            
        var r=new BoxXZ1(this.content, 0, 0, this.downBtn, this);            
        return r;
    }    
}
GalleryXZ1.prototype = Object.create(DGallery.prototype);
GalleryXZ1.prototype.constructor = GalleryXZ1;


function BoxXZ1(dCont, _x, _y, _fun, par) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BoxXZ1';
    var self =this
    var ss;
    this.label1 = new DLabel(this, 80, 2, '====');
    this.label1.fontSize=16;
    this.label1.width=400;
    this.label.div.style.pointerEvents="none";
    this.label1.div.style.pointerEvents="none";


    this.label2 = new DLabel(this, 80, 22, '====');
    this.label2.fontSize=12;
    this.label2.width=400;
    this.label2.div.style.pointerEvents="none";


    this.label.bold=true
    // Отрисовка и позиционирование иконки, обводки
    this.draw = function () {

        ss = (this._width - this._otstup * 2) / this.image.picWidth;
        if (ss > (this._height - this._otstup * 2) / this.image.picHeight)ss = (this._height - this._otstup * 2) / this.image.picHeight;
        this.image.x = 0;
        this.image.width=this.image.picWidth*ss;
        this.image.height=this.image.picHeight*ss;

        this.image.x = 32;
        this.image.y = 2;

        this.label.x = 2;
        this.label.y = 10;



        if (this.postDraw) this.postDraw();
    }; 

    this.startLoad = function (_obj) {        
        this.object = _obj
        this.redragggg();    
 
        self.funLoad();
        this.draw();
    } 

    var iiii="225"
    this.redragggg = function (bool) {    
        if(this.object[0]!=""){
            let b=false
            if(bool==undefined)this.image.link = "resources/data/"+this.object[0]+"/100.png";
            this.label.visible=true 
            if(this.object[0]==iiii)trace(">>>>>"+this.object)

            this.label.value=this.object[0]

            this.label.width=this.panel.width-100
            let s1 =""+this.object[1];
            let s2 ="";
            let ac=[]
            for (var i = 0; i < 5; i++) {
                if(this.object[i]==undefined){
                    b=true
                    continue
                }
                if(this.object[i]==""){
                    if(this.object[0]==iiii)trace(i+">>>>>"+this.object[i])
                    b=true
                    continue;
                }

            }



            for (var i = 5; i < this.object.length-1; i+=4) {
                s2+="\t"+this.object[i+1];
                ac.push(this.object[i]);

                if(this.object[i]==""){ 
                    if(this.object[0]==iiii)trace(i+">+1>>>>"+this.object[i+1]);                  
                    b=true
                }
                if(this.object[i+1]==""){ 
                    if(this.object[0]==iiii)trace(i+">+2>>>>"+this.object[i+2])                   
                    b=true
                }

            }
            for (var i = 0; i < ac.length; i++) {
                for (var j = 0; j < ac.length; j++) {
                    if(i!=j)if(ac[i]==ac[j]){
                        b=true
                        if(this.object[0]==iiii)trace(i+">+2>>>>"+ac[i],ac[j],i,j) 
                    }
                }
            }



            this.label1.value=s1.substr(0, 24)//.splice(24,99);
            this.label2.value=s2;


            let c=dcmParam._color1
            if(b){
                c="#f5ccbc"                
            }

            if(this.object[1] && this.object[1].indexOf("Хранитель")!=-1)c="#c7edfc"

            
            this.color1=c
            this.panel.color1=c
        } 
    } 

}
BoxXZ1.prototype = Object.create(DBox.prototype);
BoxXZ1.prototype.constructor = BoxXZ1;










///////////////////////////////////
/////////////////////////////////////



function DIVsakoe(par) {  
    var self=this;  
    this.type="DIVsakoe";
    this.par=par;
    this.otstup=aGlaf.otstup;
    this._active=false;

    

    this.dCont=new DCont(this.par.w.content);
    this.dCont.visible=false   
    this.button=new DButton(this.par.w, this.otstup, this.otstup,"Всякое", function(s){       
        self.par.setActiv(self);
    });
    this.button.height=28;

    
    var yy=this.otstup;



    this.panel=new DPanel(this.dCont, this.otstup, yy);
    this.panel.width=1000;
    this.panel.height=70;

   /* let l=new DLabel(this.panel, this.otstup,this.otstup,"u1 Включена замена полок апдейт up1_10_06_2020  ").width=600
    l.width = this.panel.width;*/

    this.chekU1=new DCheckBox(this.dCont, this.otstup, this.otstup+yy, "Включена замена полок апдейт up1_10_06_2020", function(s){ 
        self.confText.up1.active = this.value; 
        self.par.saveTime();       
    })  

  /*  this.slidU1W=new DSliderBig(this.panel, 100, this.otstup+20, function(s){ 
        self.confText.up1.width = this.value; 
        self.par.saveTime(); 
    }, "width", 100, 1000);
    this.slidU1W.width=200
    this.slidU1W.okrug=1
    
    this.slidU1H=new DSliderBig(this.panel, 100+210, this.otstup+20, function(s){ 
        self.confText.up1.height = this.value; 
        self.par.saveTime(); 
    }, "height", 100, 1000);
    this.slidU1H.width=200
    this.slidU1H.okrug=1

    this.slidU1S=new DSliderBig(this.panel, 100+210*2, this.otstup+20, function(s){ 
        self.confText.up1.sahTime = this.value; 
        self.par.saveTime(); 
    }, "sahTime", 0, 100);
    this.slidU1S.width=200
    this.slidU1S.okrug=1

    this.inputU1=new DInput(this.dCont, 100+210*3, this.otstup+22,"null", function(s){ 
        self.confText.up1.link= this.text; 
        self.par.saveTime(); 
    });
    this.inputU1.timeFun=1;
    this.inputU1.width=this.panel.width-this.inputU1.x-this.otstup*2;*/





    yy+=32//this.panel.height+this.otstup*2


    this.chekGS=new DCheckBox(this.dCont, this.otstup, yy, "grabStoiki Кранштены от полок есть/нет", function(s){ 
        self.confText.grabStoiki = this.value;        
        self.par.saveTime();
    }) 

    


    this.chek1=new DCheckBox(this.dCont, 600, yy, "Уточнения действий, защита от слкучайного удаления 'durak'", function(s){ 
        self.confText.settings.durak = this.value;
        aGlaf.durak=this.value
        self.par.saveTime();
    })



    yy+=32

    this.chekBuy=new DCheckBox(this.panel, this.otstup, yy, "кноп. Заказ", function(s){ 
        self.confText.buy = this.value; 
        self.par.saveTime();        
    })  

    yy+=32



    new DLabel(this.dCont, 110,yy+8,"Загружаем цены через csv").width=200


    this.b=new DButton(this.dCont, this.otstup, yy,"load csv New", function(s){        
        var a=s.split("base64,");
        var str=window.atob(a[1]);
        self.korektText(str);
    })    
    this.b.startFile("csv"); 


    yy+=40



    this.input=new DInput(this.dCont, this.otstup, yy,"null", function(s){ 
        self.confText.email= this.text; 
        self.par.saveTime(); 
    });
    this.input.timeFun=1
    this.input.width=300//designer@larvij.ru,vorodis2@gamil.com
    new DLabel(this.dCont, 310,yy+8,"Эмел на который будет уходить заказ, можно через запетую <<,>> без пробелов ").width=600

    yy+=40











    this.infoObj={
        sah:0,
        version:"1.0"
    }
    this.inputVersion=new DInput(this.dCont, this.otstup, yy,"null", function(s){ 
        
    });
    this.inputVersion.object.disabled="disabled"; 


    this.b=new DButton(this.dCont, this.otstup+105, yy,"+", function(s){ 
        var s=   self.inputVersion.text.split(".") 
        var ss= s[0]+"."+(s[1]*1+1);
        self.infoObj.version=ss;
        self.inputVersion.text=ss;
        self.saveLoad();
    }).width=32
    new DLabel(this.dCont, this.otstup+145, yy+8,"Версия приложения").width=200


    this.bbb=new DButton(this.dCont, this.otstup+305, yy,"load js", function(s){ 
        uploadFile(this.files[0],"../build/larvij.js");
    })
    this.bbb.startFile(".js");


    yy+=40

    //Акция------------------------------
    this.panel=new DPanel(this.dCont, this.otstup, yy);
    new DLabel(this.panel, this.otstup,this.dCont,"Акция").width=200

    this.bLink=new DButton(this.panel, this.otstup, 20, "Load", function(s){ 
        var ll = '../resources/scane/'+this.files[0].name;
        var ll2 = 'resources/scane/'+this.files[0].name;        
        php.savePhoto(ll, s, function (e) {                     
            self.confText.action.link = ll2; 
            self.par.saveTime(); 
            self.bLink.loadImeg(ll2);
            setTimeout(function() {                
                self.bLink.image.width=self.bLink.width
            }, 500);

        });
    })
    this.bLink.width=this.bLink.height=this.panel.height-20-this.otstup*2;

    this.bLink.startFile();


    this.chek=new DCheckBox(this.panel, this.otstup*3+this.bLink.width, 18, "active", function(s){ 
        self.confText.action.active = this.value; 
        self.par.saveTime(); 
    })

    this.slid=new DSliderBig(this.panel, this.otstup*3+this.bLink.width, 48, function(s){ 
        self.confText.action.kolSah = this.value; 
        self.par.saveTime(); 
    }, "kolSah", 1, 10)
    this.slid.okrug=1;
    this.panel.width=190;

    

   
    yy+=32
   
    yy+=110


    function uploadFile(file, dest) {
        let serverURL = php.server + "src/phpBase.php";
        let data = new FormData();
        data.append('tip', 'saveFile');
        data.append('file', file);
        data.append('dest', dest);

  

        return $.ajax({
            url: serverURL,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            type: 'post'
        });
    }

    

    //Хрень с точками продажи
    this.dopSamovuvoz=new DopSamovuvoz(this.dCont, this.otstup, yy, function(s,p){
        self.par.saveTime(); 
        trace(self.confText)
    });
    
        
    ///////////////////////////////////////////

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


    //////////////////////////////////////////



    
    this.testVers=function(){
        var sss;
        $.ajax({
            url: "resources/info.json?"+Math.random(),
            success: function function_name(data) {                         
                if(typeof data === "string") {
                    var conf = JSON.parse(data)
                    sss = conf;
                } else sss = data;                
                for (var s in sss) {
                   self.infoObj[s]=sss[s]
                }
                self.inputVersion.text=self.infoObj.version;
                                         
            },
            error:function function_name(data) {
                console.log("Что то случилось с конфигом")
            }
        });

    }
    this.saveLoad=function(){ 
        sahBig++;
        var o={
            sah:this.inputVersion.text
        }
        var ss  =JSON.stringify(self.infoObj); 
        var l = "../resources/info.json";        
        aGlaf.php.load({tip:"saveJSON", link:l, text:ss},function(e){
            
        }); 
    }



    this.confText
    this.setConf=function(confText){
        
        this.confText=confText    
        this.input.text=this.confText.email;


        //if(this.confText.emailNa==undefined)this.confText.emailNa="null"
       //this.inputNa.text=this.confText.emailNa; 

       
        if(this.confText.dopS==undefined)this.confText.dopS={}
        this.dopSamovuvoz.setObject(this.confText.dopS) 

        
        if(this.confText.buy==undefined)this.confText.buy=true;

        this.chekBuy.value=this.confText.buy;


        if(this.confText.action==undefined){
            this.confText.action={}
            this.confText.action.link="null";
            this.confText.action.active=false;
            this.confText.action.kolSah=1;
        } 
              
        if(this.confText.action.link!="null"){
            this.bLink.loadImeg(this.confText.action.link);
            setTimeout(function() {                
                self.bLink.image.width=self.bLink.width
            }, 500);
        }
        this.chek.value=this.confText.action.active;
        this.slid.value=this.confText.action.kolSah;


        if(this.confText.up1==undefined){
            this.confText.up1={};
            this.confText.up1.active=false;
           /* this.confText.up1.width=200;
            this.confText.up1.height=200;
            this.confText.up1.link="up1.html";*/
        }
        this.chekU1.value=this.confText.up1.active;
       /* this.slidU1W.value=this.confText.up1.width;
        this.slidU1H.value=this.confText.up1.height;
        this.inputU1.value=this.confText.up1.link;*/

        if(this.confText.up1.sahTime==undefined)this.confText.up1.sahTime=10
        //this.slidU1S.value=this.confText.up1.sahTime;

        if(this.confText.settings==undefined)this.confText.settings={};
        if(this.confText.settings.durak==undefined)this.confText.settings.durak=true;
        aGlaf.durak=this.confText.settings.durak
        this.chek1.value=this.confText.settings.durak;


        if(this.confText.grabStoiki==undefined)this.confText.grabStoiki=false; 
        this.chekGS.value=this.confText.grabStoiki;    
    }
    
    this.setConf(this.par.confText)

    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;               
                if(value) this.button.alpha =0.5
                else this.button.alpha =1
                this.dCont.visible=value; 
                this.testVers()               
            }           
        },
        get: function () {
            return this._active;
        }
    });
}

function DopSamovuvoz(dCont,x,y, fun) {  
    var self=this;  
    this.type="DopSamovuvoz";
    this.fun=fun;
    this.otstup=aGlaf.otstup;
    this._active=false;
    this.object=undefined
    this.fun=fun

    this.dCont=new DCont(dCont);
    this.dCont.x=x;
    this.dCont.y=y;

    this.array=[];
    this._index=-1

    this.w=new DWindow(this.dCont, 0, 0,"Настройки самовывоза");
    this.w.width=280;


    this.chek=new DCheckBox(this.w.content, this.otstup, this.otstup, "active", function(s){ 
        if(self.object!=undefined){
            self.object.active=this.value;
            self.fun();
        }
    })

    var yy=32

    this.input=new DInput(this.w.content, 0, yy,"null", function(s){ 
        self.object.strName[0]=this.value;
        self.fun();
    });
    this.input.timeFun=1
    this.input.width=this.w.width/3


    this.input1=new DInput(this.w.content, this.w.width/3, yy,"null", function(s){ 
        self.object.strName[1]=this.value;
        self.fun();
    });
    this.input1.timeFun=1
    this.input1.width=this.w.width/3

    this.input2=new DInput(this.w.content, this.w.width/3*2, yy,"null", function(s){ 
        self.object.strName[2]=this.value;
        self.fun();
    });
    this.input2.timeFun=1;
    this.input2.width=this.w.width/3;

    yy+=32

    this.button=new DButton(this.w.content, 0, yy,"Добавить", function(s){ 
        
        self.object.array.push(["null","null"])

        self.drag()
        self.index=self.object.array.length-1
        self.fun();
    })
    this.button.width=this.w.width/2;
    this.button1=new DButton(this.w.content, this.w.width/2, yy,"Удалить", function(s){ 
        self.object.array.splice(self._index-1, 1)
        self.drag()
        self.fun();
        self._index=-1
        self.index=0

    })
    this.button1.width=this.w.width/2;
    this.button1.alpha=0.5;

    yy+=32;

    this.drag=function(){
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].dCont.visible=false;
        }
        for (var i = 0; i < this.object.array.length; i++) {
            if(this.array[i]==undefined){
                this.array[i]=new DSBox(this.w.content,  this.w.width, function(s){ 


                    if(s=="up"){
                        if(this.idArr==0)return;
                        let a=self.object.array.splice(this.idArr,1)[0];
                        self.object.array.splice(this.idArr-1,0,a)
                        self.drag()
                        self._index=-1
                        self.fun();
                        trace(this.idArr,self.object.array)
                        return;
                    }                   
                    
                    self.object.array[this.idArr][0]=this.input.value
                    self.object.array[this.idArr][1]=this.input1.value
                    self.fun();
                    self.index=this.idArr


                } )
                this.array[i].idArr=i;
                this.array[i].dCont.y=yy+2+(40)*i
                if(i==0){                    
                    this.array[i].button.activMouse=false
                    this.array[i].button.alpha=0.25
                }
            }
            this.array[i].input.value=self.object.array[i][0]
            this.array[i].input1.value=self.object.array[i][1]
           


            this.array[i].dCont.visible=true;
            this.object.array[i];
        }

        this.w.height=yy+2+(34)*this.object.array.length

    }        




    this.setObject=function(o){
        this.object=o;
        

        if(this.object.active==undefined)this.object.active=false;
        if(this.object.strName==undefined)this.object.strName=["null","null","null"];
        if(this.object.array==undefined)this.object.array=[];

        

        this.chek.value=this.object.active;
        this.input.value=this.object.strName[0];
        this.input1.value=this.object.strName[1];
        this.input2.value=this.object.strName[2]; 

        this.drag();   
    }

     //this._index

    Object.defineProperty(this, "index", {
        set: function (value) {            
            if(this._index!=value){
                this._index=value;
                var b=false;
                trace("dfgdfg",this._index )
                for (var i = 0; i < this.array.length; i++) {
                    if(i==this._index){
                        this.array[i].active=true
                        b=true;
                    }
                    else this.array[i].active=false

                } 

                if(b)this.button1.alpha=1
                else this.button1.alpha=0.5            
                             
            }           
        },
        get: function () {
            return this._index;
        }
    });
}


function DSBox(dCont, w, fun) {  
    var self=this;  
    this.type="DopSamovuvoz";
    this.fun=fun;
    this.otstup=aGlaf.otstup;
    this._active=false;
    this.object=undefined
    this._active=false;

    this.dCont=new DCont(dCont);

    this.panel=new DPanel(this.dCont, 2, 2);
    this.panel.width=w-4
    this.panel.height=38

    var ww=(w-12-34)/2
    this.input=new DInput(this.panel, 2, 2,"null", function(s){ 
        self.fun()
    });
    this.input.timeFun=1
    this.input.width=ww


    this.input1=new DInput(this.panel, 4+ww, 2,"null", function(s){ 
        self.fun()
    });
    this.input1.timeFun=1
    this.input1.width=ww;

    this.ccc=this.panel.color1

    this.button=new DButton(this.panel, 10+ww*2, 2,"", function(s){ 
        self.fun("up");
    },'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE10lEQVRYR62XW0wcVRzGvzlnZrGA9oE2xkswrYkmrTExJjYx1Rhf2pcmNZoYialZ8UUDjRkv8RIMTawPXpOqVO7SImCFtlyKpBoKFUrp4opYpYRiuWkjtAUWkO2yM8ecy8wuslx3d5n9n53ZPd/v+/5nzgYN8TwOYTP2YwJAeL3TaOv9InKRWvB88XRzbyur2nNkA4Cb65lrfQC50PNfKJo/4+sA0xim9evzjU/VpgIIrRViPQDaF1e+tFt9PiHOCBN1jI1Mtz3dkgZgfi0QawXQPrr8sX3e3yNEbQ5AJQAjwPDspau/PudPX8uaWBNATu974d8vDlJbs2ETWwLwBMCEaf56ear7Uv++vgcAWKtJYtUA2f7s2dGByWRLs2ATJgGENANjttTSNBBNw2/XOtv/yhx+HIC6sDTKqgAy2jPG//2bbLK4qHJuMQscQT5kAtD4nwadUHSNth4ff2XsmcjF2BArAuz+cffAhsnNW8OaBYtYkLLSPZibgQqAE2ggAJKoB619TXkzrweyloNYFmBHw46uO4P3PSyEiY2wci3kmcJgTDh3WyA6wVtBkGIk4/vO6ndDB0IfLNWEJQG21Wxr2q49siuEeYSVcxG7gGCwhXsnAWFcCPMnITwFXik2em5FddORF/EZSmNBxARIr0gveyxl175Za84VD7OwDJ7Z4CBy+alWyPUnXnilGhEJ8EoJxaZb0lBeVbgHhWj4P8QigLTitIN778h4ZyI4JcW1MMKOKLPAMSw7jPHgdQRCAQTtoBQjBIQfQlyT7zWi2qHh7pS70FLR+Cgq0RENsQAgOT/55cytWXlXp8cQplzcEm65+8HAMIZmRqU7wgWoK+yI8eqMOQwViUgg3p4tqffg1OGa7ajFHw6EC0A/p3vfeDDnxOCNEcyTsHA/PncNF/7xi2j5ZGJScVBZVcSR8+qa+qxIQyQh9wf+vDd1C6rfrkiHDyPqzgVwELc/cf+T9YGpaV3sbmCYuDkpIDN2PvvQp2dLlDAXVeIcgFIJwasAirpGCEJDMwOU0YDGpE/CtwsGBGZm2NCBP3cCmItuQVKsVWr2mMG8tsqIa0KhOylQIjYdnoh7zkmHEPiLz2WiDhVL7AP8R8tecSMye0z2Vfu30iGNCHFhXTiPqiQCxD/fmX/Wi3p8vdxvwsoA3SYr6DymXDqCUkinuqrREAqSUrQdavaiMV6AX0xW5Kt2nTrO3SpS0WHwKsZUJUVx5pPTXjTFC+A3WcnPNe6kUiQiaPAUhLgOw0lFgZz+sDEBAF0mK+0+4bqTTh0AXheOOYyAIhSn3q/z4od4E/CZrKznpHLpTK7D0OV40aHLRPj5kznHvWiOF+CCyY5erJULTk3MU3CF9SgI3YCHQ6lz3711zIuWeAHOm6y8t86NPZawRzcEkEcIG6rqqHyzMgEAHSb7pq8+KmrlPkrUQw3hmoNEQxx9rTwBAOdMVtHfsKjXUsgRlcISIDIufbUsAQBtJqscOCXucxH/AufRoo64gSQOYRgo2l+SAICfTFZ1hQNEFpvoOXcclYAQVcJy7EFBdlECAFpNVjXU6CYQWXALY3cAeE0yPCKFw1mFCQBoMVl3oN/dB8QuyPcAUaNvQZ5I5A7goDkv5cYPAOA2ABtX819OjM/MArix3Hf/AyoV8jBkIaaEAAAAAElFTkSuQmCC');
    this.button.width=31;
    this.button.height=31;

    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;
                if(this._active) this.panel.color1="#747371" 
                else  this.panel.color1=this.ccc      
                             
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




