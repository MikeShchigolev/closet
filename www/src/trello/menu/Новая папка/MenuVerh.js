





function MenuVerh(menu, fun) {  
    var self=this;   
    this.type="Menu";
    this.par=menu;

    this._active=true

    this.whv=this.par.par.whv;
    this.otstup=this.par.par.otstup;
    this.dCont=new DCont(this.par.par.dCont);
    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.height=this.whv-this.otstup;
    //this.panel.color=0x79bccc;
    
    /*this.button=new DButton(this.dCont, this.otstup, this.otstup,"load csv", function(s){        
 
        var a=s.split("base64,")       
        var str=window.atob( a[1] )
        self.bigZamena(str)

    });
    this.button.height=this.panel.height-this.otstup*2;
    this.button.startFile("csv");*/ 


    this.buttonDop=new DButton(this.dCont, this.otstup, this.otstup,"++Infa++", function(s){         
        menu.dopInfo.active=!menu.dopInfo.active

    });
    this.buttonDop.height=this.panel.height-this.otstup*2;






    var ar,a
    var sah
    this.bigZamena=function(str){        
        a=str.split("\n")        
        ar=[]
        var ss
        for (var i = 1; i < a.length; i++) {
            ss=a[i].split("\r")
            
            var aaa=ss[0].split(";")

            if(aaa.length>3){               
                if(aaa[0]!="")ar.push(aaa) 
            }else{
                var aaa=ss[0].split(",")
                if(aaa.length>3){                   
                   if(aaa[0]!="")ar.push(aaa) 
                }

            }            
        }
        trace(str);
        trace(a);

        trace("ar====",ar);

        this.bigZamena1(ar)
        sah=0;
        this.bigZamena2()
    }


    this.objectBase
    var arrxz=[]
    this.bigZamena1=function(arr){  
        
        this.objectBase= this.par.par.par.objectBase;
        arrxz=[]

        trace(this.objectBase.bd)
        trace(arr)

        for (var i = 0; i < this.objectBase.bd.length; i++) {
            for (var j = 0; j < arr.length; j++) { 
                            
                if(this.objectBase.bd[i].id+""==arr[j][0]){

                    this.setObjArr(this.objectBase.bd[i].obj, arr[j])
                    arrxz.push(this.objectBase.bd[i].obj)                    
                }
            }            
        }
        trace(arrxz)
    }


    this.bigZamena2=function(){  
        if(arrxz[sah]==undefined){
           // 
           trace("@@@@@")
            this.par.par.s.save()
            setTimeout(function() {
                location.reload()
            }, 1000);
        }else{
            var s=   JSON.stringify(arrxz[sah], null,4)
            var l="../"+aGlaf.resursData+""+arrxz[sah].id+"/config.json";       
            
            aGlaf.php.load({tip:"saveJSON", link:l, text:s},function(e){
                sah++;
                self.bigZamena2()
            });

        }
    }




    this.setObjArr=function(obj, a){
        trace(obj, a)
        if(obj.plus){
            if(a[3]){               
                obj.plus[0]=a[2];
                obj.plus[3]=a[3];
            }

            if(a[5]){                
                obj.plus1[0]=a[4];
                obj.plus1[3]=a[5];                
            }
        }
    }





    var a=[];
    this.down=function(){      
        self.activMenu(this.idArr)        
    }  


    this.activMenu = function(ii){
        for (var i = 0; i < self.ab.length; i++) {
            self.ab[i].alpha=1;
        }
        self.ab[ii].alpha=0.5;        
        
        if(ii==0){//дерево 
            aGlaf.menu.menuScene.active=false; 
            //aGlaf.menu.menuBD.active=false;                  
            aGlaf.menu.menuThree.active=false;
            aGlaf.menu.menuObject.active=false;
            aGlaf.menu.matObject.active=false;                  
            aGlaf.menu.menuThree.active=true;
        }
        if(ii==1){//обьекты   
            aGlaf.menu.menuScene.active=false; 
            aGlaf.menu.menuBD.active=false;                  
            aGlaf.menu.menuThree.active=false;
            aGlaf.menu.menuObject.active=false;
            aGlaf.menu.matObject.active=false;;
            aGlaf.menu.matBD.active=false;

            aGlaf.menu.menuBD.active=true;               
            aGlaf.menu.menuObject.active=true;
        }
        if(ii==2){//сцена
            aGlaf.menu.menuScene.active=false; 
            aGlaf.menu.menuBD.active=false;                  
            aGlaf.menu.menuThree.active=false;
            aGlaf.menu.menuObject.active=false;
            aGlaf.menu.matObject.active=false;;
            aGlaf.menu.matBD.active=false;
            aGlaf.menu.menuScene.active=true; 

        }
        if(ii==3){//матерьялы
            aGlaf.menu.menuScene.active=false; 
            aGlaf.menu.menuBD.active=false;                  
            aGlaf.menu.menuThree.active=false;
            aGlaf.menu.menuObject.active=false;
            aGlaf.menu.matObject.active=false;;
            aGlaf.menu.matBD.active=false;           
            aGlaf.menu.matObject.active=true;
            aGlaf.menu.matBD.active=true;
        }

    }

    setTimeout(function() {
        self.activMenu(1);
    }, 1);
    

    var b;
    var ww=28;
    this.ab=[]
    for (var i = 0; i < 4; i++) {
        b=new DButton(this.panel,aGlaf.widthBig+(this.otstup+ww*3)*i+this.otstup, this.otstup, " ",this.down);
        b.idArr=i;
        b.width=ww*3;
        b.height=ww;        
        if(i==0)b.text="three";
        if(i==1)b.text="object";  
        if(i==2)b.text="scene";
        if(i==3)b.text="material";       
        this.ab.push(b)
    }



    this.sizeWindow = function(w,h){  
        this.panel.width=w;
    }



    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;                
                this.panel.visible=value                 
            }           
        },
        get: function () {
            return this._active;
        }
    });
}



