


function Menu(aGlaf, fun) {  
    var self=this;  
    this.type="Menu";
    this.par=aGlaf;
    this._active=true;
    

    this.objectBase=this.par.objectBase;
    this.fun=fun;
    this.dCont=new DCont(this.par.dCont);


    this._ismena="";
    this._kolDrag=0;


    this.dCont.visible=this._active

    this.otstup=2    
    this.widthBig=this.par.widthBig;
    
    this.dragPic=new DragPic(this.dCont);

   
    this.w=new DWindow(this.dCont, this.otstup, this.otstup," ");
    this.w.width=this.widthBig;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;    

    this.lanel=new DLabel(this.w, 105, 10,"изменения=");
    this.lanel.width=1100  



    this.array=[];

    //this.array[0]=this.menuProdukt=new MenuProdukt(this, function(s,p){ self.fun(s,p)});
    this.array[0]=this.setings=new Setings(this, function(s,p){ self.fun(s,p)});
    

    this.creTreCart=new CreTreCart(this, function(s,p){ self.fun(s,p)});


    this.mInfo=new MInfo(this.par.dCont);
    this.tApi=new TApi(this);

    this.setings.start(this.par.objectBase)


    


    var b=false;
  


    var kText="";


    var but=new DButton(this.w, 500+this.otstup, this.otstup,"проверка",function(){
        //self.openKey(self.par.par.localS.object.tKey)
        self.creTreCart.start();
    });
    but.height-=this.otstup*2

/*
    var but=new DButton(this.w, 500+this.otstup*2+100, this.otstup,"test",function(){
        self.creTreCart.start();
        //self.tApi.test()
    });
    but.height-=this.otstup*2

    var but=new DButton(this.w, 500+this.otstup*3+200, this.otstup,"test2",function(){        
        self.tApi.test();
    });
    but.height-=this.otstup*2*/


    this.sizeWindow = function(w,h){  
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].sizeWindow(w,h)
        }
        this.w.width =  w -this.otstup*2   
        this.w.height = h-this.otstup*2 
        this.creTreCart.sizeWindow(w,h)
        this.mInfo.sizeWindow(w,h)
        but.x=w-106
    }

    this.dragServer=function(t){
        self.creTreCart.start();        
        
    }

    var but2=new DButton(this.w, 100, 200,"start",function(){        
        
        self.tApi.start(self.par.objectBase.key, self.par.objectBase.idList,function(){
            self.active=true;           
        })

    });

    var but1=new DButton(this.w, 200, 200,"dragServer",function(){ 
        
       self.dragServer()

    }); 

    var but3=new DButton(this.w, 300, 200,"тест Карта",function(){ 
        
        var o={xz:"xzText"}         
        self.tApi.craerCart(o,function(e){
            trace("!!!!!!",e)

        }) 
    }); 

    trace("self.par.objectBase.key")
    trace(self.par.objectBase.key)
    trace(self.par.objectBase.idList)
    self.tApi.start(self.par.objectBase.key,self.par.objectBase.idList,function(){        
        self.active=true; 
        self.dragServer()
    })

   setTimeout(function() {
       // self.active=true; 
       // self.dragServer() // 5d7ba9f6c9018519f8325848
       //trace(">>>>>>>>>>>>>>>5d7ba9a37dac8124976b5a29>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
   }, 1000);
    
    
}

Object.defineProperties(Menu.prototype, {
    active: {
        set: function (value) {

            this._active = value; 
            console.warn("_active",value)        
            this.dCont.visible=this._active
        },
        get: function () {
            return this._active;
        }
    },
    index: {
        set: function (value) {            
            this._index = value;
            for (var i = 0; i < this.array.length; i++) {
                if(i==value) this.array[i].active=true;
                else this.array[i].active=false;
            }
        },
        get: function () {
            return this._index;
        }
    },

    ismena: {
        set: function (value) {
            if(this._ismena != value){
                this._ismena = value;
                this.lanel.text = "изменения="+this._ismena+" кол. проверок="+this._kolDrag;
            }
            
        },
        get: function () {
            return this._ismena;
        }
    },

    kolDrag: {
        set: function (value) {
            if(this._kolDrag != value){
                this._kolDrag = value;
                this.lanel.text = "изменения="+this._ismena+" кол. проверок="+this._kolDrag;
            }
            
        },
        get: function () {
            return this._kolDrag;
        }
    },   
})


function TApi(p) {  
    var self=this;  
    this.type="TApi";
    this.par=p;

    this.key="null";
    this.nB="null";

    this.bbb=false
    this.fun;   

    this.idList;

    this.start=function(key, idList, f){

        if(this.bbb==true)return
        this.bbb=true; 

        this.fun=f;

        this.key = key;
        this.idList = idList;
        var script = document.createElement('script');
        script.onload = function() {
            trace("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            self.start2()
        };
        // мы можем загрузить любой скрипт с любого домена
        script.src = "https://api.trello.com/1/client.js?key="+this.key;
        document.head.append(script);
    }
   

    var authenticationSuccess = function() {
        console.log('Successful authentication!!!!!!!!!!!!!!!!!!!');
        self.fun()
    };

    var authenticationFailure = function() {
        console.log('Failed authentication1111111111111');
    };     




    this.start2=function(){  
        
        trace("@@@@@@@@@@@@@!!!!!!!!!!!!authorize!!!!!!!!@@@@@@@@@@@@@@")
        window.Trello.authorize({
            type: 'popup',
            name: 'Getting Started Application',
            scope: {
                read: 'true',
                write: 'true'
            },
            expiration: 'never',
            success: authenticationSuccess,
            error: authenticationFailure
        });
    }


    var success = function(e) {
        console.log('success!!!!!!!!!!!!!',e);
        if(self.fCruen){
            self.fCruen(e)
            self.fCruen=null            
        }
    };

    var error = function(e) {
        console.log('error!!!!!!!!!!!!!',e);
        if(self.fCruen){
            self.fCruen(null)
            self.fCruen=null            
        }
    };    


    this.test=function(){       
        var newCard = {
            name: "asdfasd08908908080", 
            desc: "80808089089",
            pos: "top", 
            idList: this.idList//"5d7ba9f6c9018519f8325848"//this.key//"/znrW9DA6/"//"znrW9DA6"//"Поступившие заказы"
        };
        window.Trello.post('/cards/', newCard, success, error);
        
       /* window.Trello.addCard({
            url:'https://trello.com/b/znrW9DA6/',
            name: "dsgfasdfasasmk;kkjljkljdfadsfdasf", 
            desc: "asdfasdfljkljljljklkjljasdf",
        });


        */
    }
    trace("php.server   "+php.server,php.aS)


    this.fCruen=null;
    this.craerCart=function(o,f){   
        if(this.fCruen!=null){
            f(null);
            return null;
        }

        this.fCruen=f;

        var text=""
        for(var s in o){
            text+=s+" : "+o[s]+"\n";
        }


        var strKart="П"+o.id;
        strKart+=", "+o.mani+" Р, "+o.name+", "+o.phone+", "+o.dostavka;

       



        var newCard = {
            name: strKart, 
            desc: text,
            pos: "top", 
            idList: this.idList//"5d7ba9f6c9018519f8325848"//this.key//"/znrW9DA6/"//"znrW9DA6"//"Поступившие заказы"
        };
        window.Trello.post('/cards/', newCard, success, error);
    }

}




function CreTreCart(p, fun) {  
    var self=this;  
    this.type="CreTreCart";
    this.par=p;
    this._active=false;

    this.dCont=new DCont(this.par.par.dCont);    
    this.dCont.visible = this._active;
    this.panel=new DPanel(this.dCont,0,0);
    this.label=new DLabel(this.dCont,0,0,"проверка сервера.");
    this.dCont.alpha=0;


    this.tween=new TWEEN.Tween(this.dCont);
    this.objSave;
    this.arrNum=[]
    var to
    var ismena

    var vesak=false
    //Стартуем и еще раз подтягиваем фаил, хз может еще кто его дергает.
    this.start=function(){
        var b=true;
        this.active=true;
        ismena=0;
        clearTimeout(to);
        
        this.start1()
    } 

    this.startTime=function(t){

        if(t==undefined)t=main.objectBase.time*1000
        self.par.kolDrag++ 
        to=setTimeout(function() {
            self.start()
        }, t);
    }


    //выдераем все элементы с директории в сохроняшках  
    this.start1=function(){       
        php.load({tip: 'getDiractFiles', dir: '../save/trello/'}, function (e) {              
            var a = e.split(",");
            var aa=[]
            for (var i = 0; i < a.length; i++) {
                if(a[i]=="")continue;
                aa.push(a[i])
            }
            aa.sort(function(a, b) { return b - a; });
            self.startTrello(aa); 
   
        })
    }

    this.finiss=function(){
        self.active=false; 
        self.startTime();
    }


    var idDDDD
    var sah=0
    this.startTrello=function(ar){
        if(ar.length==0){
            self.finiss()
        }else{
            var aa=ar[0].split(".")
            idDDDD=aa[0]*1;            
            this.startTEEEE(ar[0])
        }
    }

    var ooo;
    this.startTEEEE=function(idLink){        
        $.ajax({
            url: 'save/trello/'+idLink,
            success: function function_name(data) {                         
                if(typeof data === "string") {
                    var conf = JSON.parse(data)
                    ooo = conf;
                } else ooo = data;                
                self.treloAN2222(ooo);  
            },
            error:function function_name(data) {                
                var oo={}
                oo.id=idDDDD+"ERROR Ошибка формата"
                oo.error="ид="+idDDDD+" Ошибка формата, как то не верно записан конфиг"
                self.par.ismena=self.par.ismena+"(ид="+idDDDD+" Ошибка формата, как то не верно записан конфиг)";   
                self.treloAN2222(oo)               
            }
        });
    }



    this.treloAN2222=function(o, tip){
        trace(o)
        this.par.tApi.craerCart(o,function(e){
            if(e!=null){               
                self.par.ismena=self.par.ismena+idDDDD+";";               
                self.redragFile(idDDDD);                  
            }else{
                self.active=false;
                self.par.ismena=self.par.ismena+"ERROR ошибка ключа к трелло, или трело сервер лег";   
            }
        })
    }

    self.redragFile=function(id){
        php.load({tip: 'unlink', dir: '../save/trello/'+id+".json"}, function (e) {      
            trace("removeDirRec    ",e)
            self.start1()
        })

    }



/*

    //----------------------------------------------
    //----------------------------------------------
    
    this.startTime=function(t){
        if(main.objectBase.time==undefined) main.objectBase.time=60;
        if(t==undefined)t=main.objectBase.time*1000
        self.par.kolDrag++    
        


        to=setTimeout(function() {
            self.start()
        }, t);
    }
    

    var aNew,bb,sah,aSaerv
    //все директории с числами в папке сейв
    this.start2=function(a){
        aSaerv=a;
     
        if(vesak)
        if(this.arrNum.length==a.length){
            

            self.active=false; 
            self.startTime()
            return;//небыло ни каких изменений
        }
        
        this.arrNum=a;

        aNew=[];
        
        for (var i = 0; i < this.arrNum.length; i++) {
            bb=true
            
            for (var j = 0; j < this.objSave.array.length; j++) {
                if(this.objSave.array[j]==this.arrNum[i]){
                    bb=false
                }
            }
            if(bb==true)aNew.push(this.arrNum[i]);
        }

        if(aNew.length==0){            
            self.active=false;
            self.startTime()
            return;
        }
        
        sah=0;
        this.drahAN();

    }

    this.clineNodDerekt=function(){
        for (var i = 0; i < main.objectBase.array.length; i++) {
            dd=true
            for (var j = 0; j < aSaerv.length; j++) {
                if(main.objectBase.array[i]==aSaerv[j]){
                   dd=false
                }
            }
            
            if(dd==true){
                main.objectBase.array.splice(i,1)
                i=0;
            }
        }

        for (var i = 0; i < main.objectBase.arrOpen.length; i++) {
            dd=true
            for (var j = 0; j < aSaerv.length; j++) {
                if(main.objectBase.arrOpen[i].id==aSaerv[j]){
                   dd=false
                }
            }
            
            if(dd==true){
                main.objectBase.arrOpen.splice(i,1)
                i=0;
            }
        }
    }

    this.drahAN=function(){        
        if(aNew[sah]==undefined){
            self.clineNodDerekt()
            self.par.ismena=self.par.ismena+ismena;
            
            main.save()
            self.active=false;

            if(main.objectBase.time==undefined) main.objectBase.time=60;
            self.startTime()
           

        }else{
            php.load({tip: 'getDiractFiles', dir: '../save/'+aNew[sah]+"/"}, function (e) {     
                var a = e.split(",");
                
                
                
                var bbb=false;
                for (var i = 0; i < a.length; i++) {
                    if(a[i]=="infoDop.json"){
                        bbb=true;
                    }
                }
                
                if(bbb==false){
                    //self.objSave.array.push(o);  
                    ismena++;                 
                    main.objectBase.array.push(aNew[sah]); 
                    sah++;
                    self.drahAN()
                    return
                }else{
                    var ooo;
                    $.ajax({
                        url: 'save/'+aNew[sah]+"/infoDop.json?"+Math.random(),
                        success: function function_name(data) {                         
                            if(typeof data === "string") {
                                var conf = JSON.parse(data)
                                ooo = conf;
                            } else ooo = data;




                            if(ooo.id==undefined){
                                console.log("Фаил с историей проекта "+aNew[sah]+" еще не наполнили!!!!!!!!!!!!!!!!!");
                                self.testOpen(aNew[sah])

                                sah++;
                                self.drahAN(); 

                                return;   
                            }else{
                                self.treloAN(ooo); 
                            }




                            //         
                        },
                        error:function function_name(data) {
                            
                            console.log("Фаил с историей проекта "+aNew[sah]+"пропал или побился")                               
                            sah++;
                            self.drahAN()
                            return
                        }

                    });


                    //self.treloAN(o);
                }
      
            })
        }
    }

    this.bagTime=function(o){
        setTimeout(function() {
            $.ajax({
                url: 'save/'+aNew[sah]+"/infoDop.json?"+Math.random(),
                success: function function_name(data) {                         
                    if(typeof data === "string") {
                        var conf = JSON.parse(data)
                        ooo = conf;
                    } else ooo = data;    
                    self.treloAN(ooo);          
                },
                error:function function_name(data) {                   
                    console.log("Фаил с историей проекта "+aNew[sah]+"пропал или побился")                               
                    sah++;
                    self.drahAN()
                    return
                }
            });
        }, 10);
    }  


    this.treloAN=function(o){
        if(o.alt!=undefined){
            sah++;
            self.drahAN(); 
            return
        }

        this.par.tApi.craerCart(o,function(e){
            if(e!=null){        
                ismena++; 

                if(o.alt==undefined){
                    o.alt=[]
                }
                var oo={};
                oo.name=e.name;
                oo.desc=e.desc;
                oo.shortLink=e.shortLink;
                oo.shortUrl=e.shortUrl;
                oo.id=o.id;
                
                o.alt.push(oo);
                
                var l='../save/'+o.id+'/infoDop.json';
                var t=JSON.stringify(self.corektObj(o));
                main.objectBase.array.push(oo.id); 
                php.load({tip:"saveJSON", link:l, text:t},function(e){                      
                    sah++;
                    self.drahAN(); 
                });
            }else{
                console.log("trello глюканул",o) 
                sah++;
                self.drahAN() 
            }
        })
    }

    this.corektObj=function(o){
        var oo={}
        var bb
        for (var s in o) {
            bb=true;
            if(s=="time")bb=false;
            if(bb) oo[s]=o[s];
        }
        return oo
    }



    var bn
    //тестим в списке
    this.testOpen=function(id){
        
        if(main.objectBase.arrOpen==undefined) main.objectBase.arrOpen=[];
        bn=null        
        for (var i = 0; i < main.objectBase.arrOpen.length; i++) {
            if(main.objectBase.arrOpen[i].id==id){
                bn=main.objectBase.arrOpen[i]
                break;
            }
        }

        var ttt=new Date().getTime();
        
        if(bn!=null){
            var tt=ttt-bn.time
            if(tt>1000*60*60*24){
                self.killOpen(id)
                return;
            }
            
        }else{
            var o={}
            o.id=id;
            o.time=ttt;
            main.objectBase.arrOpen.push(o);  
            main.saveTime();           
        }
    }

    //тестим в списке
    this.killOpen=function(id){
        bn=null   
        var pp=-1     
        for (var i = 0; i < main.objectBase.arrOpen.length; i++) {
            if(main.objectBase.arrOpen[i].id==id){
                bn=main.objectBase.arrOpen[i]
                pp=i
                break;
            }
        }
        if(pp!=-1){           
            main.objectBase.arrOpen.splice(pp,1)
            var dir='../save/'+id+'/infoDop.json';            
            php.load({tip: "unlink", dir: dir}, function (e) {
               
            })
        }
    } */
    



    this.sizeWindow = function(w,h){    
        this.panel.width=w;
        this.panel.height=h;
        this.label.x=(w-this.label.width)/2;
        this.label.y=(h-32)/2;
    }
}

Object.defineProperties(CreTreCart.prototype, {
    active: {
        set: function (value) {
            if(this._active !=value){
                this._active = value;  
                if(value==true){
                    this.dCont.alpha=0;
                    this.tween.stop()
                    this.tween.to({alpha:1},500).start();
                }
                

                this.dCont.visible=value;
            }  
        },
        get: function () {
            return this._active;
        }
    }
})



























