



function MatBD(menu, fun) {  
    var self=this   
    this.type="MatBD";
    this.par=menu;
    this._active=false


    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.objectBase=this.par.objectBase;

    this.objectBase=this.par.objectBase;
    this.dCont=new DCont(this.par.dCont);

    this._sort=-2

    this.w=new DWindow(null, 0, this.whv," ");
    this.w.width=this.widthBig;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;

    this.mSort=new MSort(this, this.w);

    this._width=100;
    this._height=100;

    this._index=-1;
    this.objDin=undefined;
    this.gallery=new GalleryXZ(this.w, this.otstup ,68,function(){
        //self.index=this.index;

        self.par.dragPic.testDrag(15,self.clik,self.drag);
    })
    this.gallery.width=this.widthBig;
    this.gallery.kolII=4;
    this.gallery.widthPic=46;
    this.gallery.heightPic=46;



    this.setId=function(id){
        



        for (var i = 0; i < self.gallery.arrayObj.length; i++) {
            if(self.gallery.arrayObj[i].id==id){
                self.gallery.index=i
                this._index=i;
                this.objDin=self.gallery.arrayObj[i];
                this.par.matObject.setObj(this.objDin);                 
                this.par.matObject.objDin=this.objDin; 
                //this.par.menuObject.setObj(this.objDin); 
                trace(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
                return;
            }
        }
        var p=-1
        for (var i = 0; i < this.objectBase.materials.length; i++) {           
            if(this.objectBase.materials[i].id==id){
                p=i
                break;
            }
        }
        if(p==-1)return;
        this.objDin=this.objectBase.materials[p]; 

        this.par.matObject.setObj(this.objDin);                 
        this.par.matObject.objDin=this.objDin;        
    }




    this.clik=function(){
        self.index=self.gallery.index;
        let a=php.ser.split("?");
        history.pushState(null, null, a[0]+'?mat='+self.gallery.array[self.index].object.id);       
    }
    this.drag=function(){
        var o=self.gallery.array[self.gallery.index].object;
        self.par.dragPic.start(32, aGlaf.resursData+""+o.id+"/64.png", o);       
    }

    



    this.redragTime=function(){
        aGlaf.plusLink="?x=" + Math.random();
        this.reDrag();
        setTimeout(function() {
            aGlaf.plusLink='';
        }, 500);
    }

   /* this.reDrag=function(){        
        this.gallery.start(self.objectBase.materials);
    }*/


    self.par.dragPic.addFunAp(function(){        
        var num=self.mSort.testXY(self.par.dragPic._x, self.par.dragPic._y); 
        if(num!=null){

            self.gallery.array[self.gallery.index].object.sort=num;
            self.reDrag()
            aGlaf.save();
            return
        }       
    })


    var aZZ=[]
    this.reDrag=function(){       
        var b=true
        if(this._sort==-1){
            this.gallery.start(self.objectBase.materials);
            b=false; 
        }
        if(this._sort==-2){
            aZZ=[];
            for (var i = 0; i < self.objectBase.materials.length; i++) {
                if(self.objectBase.materials[i].sort==undefined)self.objectBase.materials[i].sort=-1;
                if(self.objectBase.materials[i].sort==-1){
                    aZZ.push(self.objectBase.materials[i])
                }
            }
            this.gallery.start(aZZ);            
            b=false; 
        }

        if(b==true){
            aZZ=[];
            for (var i = 0; i < self.objectBase.materials.length; i++) {
                if(self.objectBase.materials[i].sort==undefined)self.objectBase.materials[i].sort=-1;
                if(self.objectBase.materials[i].sort==this._sort){
                    aZZ.push(self.objectBase.materials[i])
                }
            }
            this.gallery.start(aZZ);
        }
        
    }



    this.down=function(){
        var id=self.grtMaxPlus()
       
        if(this.idArr==0){//создание
            self.creatMat()
            

        }
        if(this.idArr==1){//Убиваем
            if(self.objDin!=undefined){   
                function kill (){
                    var dir= '../'+aGlaf.resursData + self.objDin.id;              
                    php.load({tip: "removeDirRec", dir: dir}, function (e) {                            
                        
                        let ind=self.objDin.id;
                        let p=-1;
                        for (var i = 0; i < self.objectBase.materials.length; i++) {
                            if(self.objectBase.materials[i].id==ind){
                                p=i
                            }
                        }
                        var a=self.index;                    
                        var b=self.objectBase.materials.splice(p,1);
                        aGlaf.save();
                        self.reDrag() 
                        if(a>self.objectBase.materials.length-1)a=self.objectBase.materials.length-1;                  
                        self.index=a;
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
                   var b=self.objectBase.materials.splice(a,1);
                    self.objectBase.materials.splice(a-1,0,b[0])
                    aGlaf.save();
                    self.reDrag()                   
                    self.index=a-1; 
                }
            }           
        }

        if(this.idArr == 3){//>>>>>>
            if(self.objDin!=undefined){
                var a=self.index;
                if(a<self.objectBase.materials.length-1&&a!=-1) {
                    var b=self.objectBase.materials.splice(a,1);
                    self.objectBase.materials.splice(a+1,0,b[0])
                    aGlaf.save();                    
                    self.reDrag();                 
                    self.index=a+1; 
                }
            }           
        }
    }


    this.creatMat = function(){  
        var id="m_"+self.grtMaxPlus(); 


        function plus (_id){
            self.creatMatName(_id)

        }
        if(aGlaf.durak==false){
            plus(id)
            return
        }



        self.par.mInfo.setFunInput(
            "Создание матерьяла",
            "Задаюм имя идишника матерьяла, если такой есть то он не срабоает",
            id,           
            function(){ 
                plus(self.par.mInfo.text)                 
            }
        );

       /* php.load({tip: 'mkdir', dir: '../'+aGlaf.resursData + id}, function (e) {                        
            php.load({tip: 'copyDir', dirWith: '../'+aGlaf.resurs+'base/', dir: '../'+aGlaf.resursData + id + '/'}, function (e) {    
                var o={id:id, title:"title_"+id, name:"name_"+id,key:"o_"+id}
                self.objectBase.materials.unshift(o);                    
                aGlaf.save();
                self.reDrag();               
            });
        })*/

    }

    this.creatMatName = function(name){  
        var b=true
        php.load({tip: 'getDiractFiles', dir: '../'+aGlaf.resursData}, function (e) {              
            var a = e.split(",");
            for (var i = 0; i < a.length; i++) {
                if(a[i]==name){
                    b=false
                }
            }

            if(b==false){
                self.par.mInfo.setFun("Такой иди есть!!","Удалите его в начале",function(){})                 
            }else{
                var id=name; 
                php.load({tip: 'mkdir', dir: '../'+aGlaf.resursData + id}, function (e) {                        
                    php.load({tip: 'copyDir', dirWith: '../'+aGlaf.resurs+'base/', dir: '../'+aGlaf.resursData + id + '/'}, function (e) {    
                        var o={id:id, title:"title_"+id, name:"name_"+id,key:"o_"+id}
                        self.objectBase.materials.unshift(o);                    
                        aGlaf.save();
                        self.reDrag();               
                    });
                })
            }

            
               
        })
       
    }


    var b;
    var ww=28;
    for (var i = 0; i < 4; i++) {
        b=new DButton(this.w,(this.otstup+ww)*i+this.otstup, this.otstup, " ",this.down);
        b.idArr=i;
        b.width=ww;
        b.height=ww; 
        if(i==0)b.text="+";
        if(i==1)b.text="-";
        if(i==2)b.text="<"; 
        if(i==3)b.text=">"; 
    }


    this.grtMaxPlus = function(){  
        var r=0;
        var a=[]
        for (var i = 0; i < this.objectBase.materials.length; i++) {
            a=this.objectBase.materials[i].id.split("_");            
            if(a[1]*1>r)r=a[1]*1;
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
    this.reDrag();


    if(localS.object.sortmat==undefined)localS.object.sortmat=-2
    setTimeout(function() {self.sort = localS.object.sortmat;}, 10);     

   //setTimeout(function() {self.index=0}, 10);
   

    Object.defineProperty(this, "index", {
        set: function (value) {            
            this._index=value;
            this.objDin=undefined;           
            this.gallery.index=value;
            
            if(this.gallery.array[value]!=undefined){  
                        
                this.objDin=this.gallery.array[value].object;

                this.par.matObject.setObj(this.objDin);                 
                this.par.matObject.objDin=this.objDin;              
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

            if(this._sort!=value){
                this._sort=value; 

                localS.object.sortmat=value
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



