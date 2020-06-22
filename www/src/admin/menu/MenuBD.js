



function MenuBD(menu, fun) {  
    var self=this   
    this.type="Menu";
    this.par=menu;
    this._active=false
    this._sort=-2;   

    

    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.objectBase=this.par.objectBase;

    this.objectBase=this.par.objectBase;
    this.dCont=new DCont(this.par.dCont);

    this.w=new DWindow(null, 0, this.whv," ");
    this.w.width=this.widthBig;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;

    this._width=100;
    this._height=100;

    this.mSort=new MSort(this, this.w);

    this._index=-1;
    this.objDin=undefined;
    this.gallery=new GalleryXZ(this.w, this.otstup ,68,function(){
        self.par.dragPic.testDrag(15,self.clik,self.drag);
    })
    this.gallery.width=this.widthBig;
    this.gallery.kolII=4;
    this.gallery.widthPic=46;
    this.gallery.heightPic=46;


    this.dragColorGal=function(){
        this.gallery.dragColorGal()
    }

    var naObj=undefined    
    this.gallery.funOver=function(e){
        naObj=e 
             
    }

    this.gallery.funOut=function(){
        naObj=undefined   
    }


    this.setId=function(id){        
        for (var i = 0; i < self.gallery.arrayObj.length; i++) {
            if(self.gallery.arrayObj[i].id==id){
                self.gallery.index=i
                this._index=i;
                this.objDin=self.gallery.arrayObj[i]; 
                this.par.menuObject.setObj(this.objDin); 
                return;
            }
        }
        var p=-1
        for (var i = 0; i < this.objectBase.bd.length; i++) {           
            if(this.objectBase.bd[i].id==id){
                p=i
                break;
            }
        }
        if(p==-1)return;
        this.objDin=this.objectBase.bd[p]; 
        this.par.menuObject.setObj(this.objDin);        
    }



    this.clik=function(){
        self.index=self.gallery.index;        
        let a=php.ser.split("?");
        history.pushState(null, null, a[0]+'?obj='+self.gallery.array[self.index].object.id);
    }


    this.startObj
    this.drag=function(){
        var o=self.gallery.array[self.gallery.index].object;
       
        self.par.dragPic.start(32, aGlaf.resursData+""+o.id+"/64.png", o);       
    }

    
    self.par.dragPic.addFunAp(function(){        
        var num=self.mSort.testXY(self.par.dragPic._x, self.par.dragPic._y); 
        if(num!=null){

            self.gallery.array[self.gallery.index].object.sort=num;
            self.reDrag()
            aGlaf.save();
            return
        }

        if(naObj!=undefined){
            if(aGlaf.menu.dragPic.object.id!=undefined){
                if(naObj.object && naObj.object.id){
                    if(aGlaf.menu.dragPic.object.id!=naObj.object.id){
                        var idS=aGlaf.menu.dragPic.object.id
                        var idNa=naObj.object.id
                        function zap (){                            
                            startPapis(idS,idNa)
                        }

                        if(aGlaf.durak==false){
                            zap()
                            return
                        }
                        self.par.mInfo.setFunInput(
                            "перезапись иконки",
                            "Картинка с тоскания запишеться в эту позицию, идишник с донора",
                            idS,           
                            function(){ 
                                zap()
                               
                            }
                        ); 

                    }
                }
            }
        }
        

        
    })


    this.redragTime=function(){
        aGlaf.plusLink="?x=" + Math.random();
        this.reDrag()
        setTimeout(function() {
            aGlaf.plusLink='';
        }, 500);
    }

    var aZZ=[]
    this.reDrag=function(){       
        var b=true
        if(this._sort==-1){
            this.gallery.start(self.objectBase.bd);
            b=false; 
        }
        if(this._sort==-2){
            aZZ=[];
            for (var i = 0; i < self.objectBase.bd.length; i++) {
                if(self.objectBase.bd[i].sort==undefined)self.objectBase.bd[i].sort=-1;
                if(self.objectBase.bd[i].sort==-1){
                    aZZ.push(self.objectBase.bd[i])
                }
            }
            this.gallery.start(aZZ);            
            b=false; 
        }

        if(b==true){
            aZZ=[];
            for (var i = 0; i < self.objectBase.bd.length; i++) {
                if(self.objectBase.bd[i].sort==undefined)self.objectBase.bd[i].sort=-1;
                if(self.objectBase.bd[i].sort==this._sort){
                    aZZ.push(self.objectBase.bd[i])
                }
            }
            this.gallery.start(aZZ);
        }
        
    }




    this.down=function(){
        if(this.idArr==0){//создание
           /*self.par.mInfo.setFun("Удаление обьекта","Обьект будет удален из бд, не вычещаеться из дерева, и может привести к падениям, короче окуратно!!!",
                    function(){ 
                        var id=self.grtMaxPlus()
                        php.load({tip: 'mkdir', dir: '../'+aGlaf.resursData + id}, function (e) {                        
                            php.load({tip: 'copyDir', dirWith: '../'+aGlaf.resurs+'base/', dir: '../'+aGlaf.resursData + id + '/'}, function (e) {    
                                var o={id:id, title:id, name:"xz",key:"o_"+id}
                                self.objectBase.bd.unshift(o);                    
                                aGlaf.save();
                                self.reDrag();               
                            });
                        })
                    }
                ); */  

                  

            var id=self.grtMaxPlus()

            function plus (_id){
                var id=_id
                if(isNaN(id)==false)
                php.load({tip: 'mkdir', dir: '../'+aGlaf.resursData + id}, function (e) {                        
                    php.load({tip: 'copyDir', dirWith: '../'+aGlaf.resurs+'base/', dir: '../'+aGlaf.resursData + id + '/'}, function (e) {    
                        var o={id:id, title:id, name:"xz",key:"o_"+id}
                        o.sort=self._sort
                        self.objectBase.bd.unshift(o);                    
                        aGlaf.save();
                        self.reDrag();               
                    });
                })
            }
            if(aGlaf.durak==false){
                plus(id)
                return
            }

            self.par.mInfo.setFunInput(
                "Создание обьекта",
                "Задаюм имя идишник оьекта, НЕ ВБИВАЕМ СВОЙ, (затрет если таковой есть, или изменит порядок, короче не меняем, функция созданна на крайняк от патери конфига, только цифры)",
                id,           
                function(){ 
                    plus(self.par.mInfo.text*1);
                }
            );
        }
        if(this.idArr==1){//Убиваем
            if(self.objDin!=undefined){                
                function kill (){
                    let ind=self.objDin.id
                    var dir= '../'+aGlaf.resursData + self.objDin.id;              
                    php.load({tip: "removeDirRec", dir: dir}, function (e) {
                        let p=-1;
                        for (var i = 0; i < self.objectBase.bd.length; i++) {
                            if(self.objectBase.bd[i].id==ind){
                                p=i
                            }
                        }                            
                        if(p!=-1){
                            var a=self.index;                    
                            var b=self.objectBase.bd.splice(p,1);
                            aGlaf.save();
                            self.reDrag();
                            if(a>self.objectBase.bd.length-1)a=self.objectBase.bd.length-1;
                            self.index=a;
                        }                            
                    });
                }
                if(aGlaf.durak==false){
                    kill()
                    return
                }

                self.par.mInfo.setFun("Удаление обьекта","Обьект будет удален из бд, не вычещаеться из дерева, и может привести к падениям, короче окуратно!!!",
                    function(){                       
                        kill()
                    }
                );
            }           
        }
        if(this.idArr == 2){//<<<<<<
            if(self.objDin!=undefined){
                var a=self.index;
                if(a>0) {
                   var b=self.objectBase.bd.splice(a,1);
                    self.objectBase.bd.splice(a-1,0,b[0])
                    aGlaf.save();
                    self.reDrag()                   
                    self.index=a-1; 
                }
            }           
        }

        if(this.idArr == 3){//>>>>>>
            if(self.objDin!=undefined){
                var a=self.index;
                if(a<self.objectBase.bd.length-1&&a!=-1) {
                    var b=self.objectBase.bd.splice(a,1);
                    self.objectBase.bd.splice(a+1,0,b[0])
                    aGlaf.save();                    
                    self.reDrag();                 
                    self.index=a+1; 
                }
            }           
        }


    }
    var b;
    var ww=28;
    for (var i = 0; i < 4; i++) {
        b=new DButton(this.w,(this.otstup+ww)*i+this.otstup, this.otstup, " ",this.down);
        b.idArr=i;
         
        if(i==0)b.text="+";
        if(i==1)b.text="-";
        if(i==2)b.text="<"; 
        if(i==3)b.text=">"; 
        
        b.width=ww;
        b.height=ww;

    }


    this.grtMaxPlus = function(){  
        var r=0;
        for (var i = 0; i < this.objectBase.bd.length; i++) {
            if(this.objectBase.bd[i].id*1>r)r=this.objectBase.bd[i].id*1
        }
        r+=1;
        return r
    }


    this.sizeWindow = function(w,h){ 
        this._width=w;
        this._height=h;
        this.w.height= h- this.whv- this.otstup; 
        this.gallery.height=this.w.height-32;   
    }
   // this.reDrag();
    if(localS.object.sort==undefined)localS.object.sort=-2

    trace("localS  ",localS.object.sort)
    //this.sort = localS.object.sort;
    setTimeout(function() {self.sort = localS.object.sort;}, 10); 
    //this.mSort.sort=this._sort; 
    //this.reDrag();  



    function startPapis(idS,idNa){
        
        const a=['32.png','64.png','100.png','128.png','256.png','original.png',
                'y32.png','y64.png','y100.png','y128.png','y256.png','yoriginal.png']

        for (var i = 0; i < a.length; i++) {            
            let link='../'+aGlaf.resursData + idS + '/'+a[i]
            let link1='../'+aGlaf.resursData + idNa + '/'+a[i]
            php.load({tip: 'copy', 
                dirWith:    link, 
                dir:        link1});

        }
        setTimeout(function() {self.reDrag(); }, 100);
                  
    }





    

    Object.defineProperty(this, "index", {
        set: function (value) {            
            this._index=value;
            this.objDin=undefined;           
            this.gallery.index=value;
            if(this.gallery.array[value]!=undefined){                
                this.objDin=this.gallery.array[value].object;
                this.par.menuObject.setObj(this.objDin);                
            }           
        },
        get: function () {
            return this._index;
        }
    });



    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;                
                if(value==true){
                    this.dCont.add(this.w)
                }else{
                    this.dCont.remove(this.w)
                }                
            }           
        },
        get: function () {
            return this._active;
        }
    });

     Object.defineProperty(this, "sort", {
        set: function (value) { 
            trace(this._sort+" ######################### !=  "+value)
            if(this._sort!=value){
                this._sort=value; 

                localS.object.sort=value
                localS.save()
                this.mSort.sort=value; 
                this.reDrag()             
            }           
        },
        get: function () {
            return this._sort;
        }
    });
  
}

