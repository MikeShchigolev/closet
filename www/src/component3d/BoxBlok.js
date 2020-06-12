


function BoxBlok(idUnik, obj) {
    THREE.Object3D.call( this );
    this.type = 'BoxBlok';
    var self = this;
    this.content3d = new THREE.Object3D();
    this.add(this.content3d);
    this.contentPodObj = new THREE.Object3D();
    this.add(this.contentPodObj);
    this.contentPodObj.rotation.y=Math.PI;


    this.boxGeom=null;
    this.obj=obj;

    if(obj.rectDur!=undefined){
        this.boxGeom={x:obj.rectDur.x,y:obj.rectDur.y,width:obj.rectDur.width,height:obj.rectDur.height};
    }

    this.dCol=function(){

        self.x=self.boxColizi.__x;
        self.y=self.boxColizi.__y;//-self._sten._depth; 
    }   


    this.boxColizi=null;
    if(obj.rectColizi!=undefined){
        this.boxColizi=new RectCollis(
            obj.rectColizi.x,
            obj.rectColizi.y,
            obj.rectColizi.width,
            obj.rectColizi.height,this.dCol); 
        this.boxColizi.parent=this;

        this.boxColizi.rangeY=obj.rangeY;
        if (this.boxColizi.rangeY!=undefined) {
            this.boxColizi.rectCollisMeshdy.rangeY=[]
            this.boxColizi.rectCollisMeshdy.rangeY[0]=-(this.boxColizi.height+this.boxColizi.rangeY[1]);
            this.boxColizi.rectCollisMeshdy.rangeY[1]=-(this.boxColizi.height+this.boxColizi.rangeY[0]);
        }

        /*this.boxColizi={
            x:obj.rectColizi.x,
            y:obj.rectColizi.y,
            width:obj.rectColizi.width,
            height:obj.rectColizi.height};*/
    }

    this.rangeY1 = function(value) {
        if (this.boxColizi.rangeY!=undefined && value != undefined) {
            this.boxColizi.rangeY[1] = value||0;
            this.boxColizi.rectCollisMeshdy.rangeY=[]
            this.boxColizi.rectCollisMeshdy.rangeY[0]=-(this.boxColizi.height+this.boxColizi.rangeY[1]);
            this.boxColizi.rectCollisMeshdy.rangeY[1]=-(this.boxColizi.height+this.boxColizi.rangeY[0]);
        }
        return this.boxColizi.rangeY[1];
    };

    this.offsetHeight = 0;
    this._sten;
    this.setXY=function(_x, _y, _s){
        if(this.boxColizi!=undefined){
            if(_s){
                this._sten=_s;
                // this.sten=_s;
                this.offsetHeight = self._sten._depth;
                this.boxColizi.position.x=_x;
                this.boxColizi.position.y=_y - self.offsetHeight;

                _s.collision.testRect(this.boxColizi);
               
            }
        }else{
            this.x=_x;
            this.y=_y;
        }

        self.pointFun.x=_x 
        self.pointFun.y=_y 
    }


    this.tipDrag=0;
    if(obj.tipDrag!=undefined){
        this.tipDrag=obj.tipDrag;
    }
    this.pointFun={};
    if (this.tipDrag == 1) {// объект 
        this.pointFun = new PointFun();
    } 


    this.content3d.name="stopO";
    this.content3d.name2=0;
    
    this._idBlok=0;

    this._width = 100;
    this._height = 100;
    this._depth = 100;
    this._idUnik=0;
    
    this._bObj=obj;
    this._x=0;
    this._y=0;


    this.offsetX = obj.rectColizi.x;
    this.offsetY = obj.rectColizi.y;
    this._width = obj.rectColizi.width;
    this._height = obj.rectColizi.height;

    
    this.sten;
  
    this.indicator = new Indicator3D(this);                 // индикатор загрузки
    this.indicator.rotation.y=Math.PI/2;
    this.indicator.visible=false;


    this.content= new createjs.Container();//контейнер для кеша 
    this.bat = new PushButtonIcon(this.content,0,0,function () {
        menedsherStan.bloksActiv(self.idBlok);   
        //self.activ=true;
    });    
    this.bat.width=50;
    this.bat.height=50;


    this.btn = new PushButtonGraf(this.content,50-16,50-16,new lib["bat_32"],function(){         
        
        self.clear();       
    });
    this.btn._width=16;
    this.btn.height=16;
    this.btn.color = "rgba(0,0,0,0.02)";
    this.btn.color2 = "rgba(0,0,0,0.12)";
    this.btn.visible=false; 

    this.btnRotation = new PushButtonGraf(this.content,0,50-24,new lib["bat_33"]);
    this.btnRotation.funDown=function(){         
        menedsherStan.rotationBlok(self);     
    }
    this.btnRotation._width=24;
    this.btnRotation.height=24;
    this.btnRotation.color = "rgba(0,0,0,0.02)";
    this.btnRotation.color2 = "rgba(0,0,0,0.12)";
    this.btnRotation.visible=false; 
    




    this.loaderJS3D=new LoaderJS3D();
    this.loaderJS3D.yesKeshObj=false;
    this.loaderJS3D.funProgres=function(){        
        self.indicator.value=this.progres;        
        visi3D.intRend=1;       
    }
    this.loaderJS3D.funComplit=function(){      
        self.contentPodObj.add(this.object);
        objShadow(this.object,true);  

       

        self.indicator.visible=false;
        self.indicator.clear();



       /* self.dragMaterial(this.object); 
        self.cloneMaterial();  */
        visi3D.intRend=1;
    }

    var bbb
    var arrMat=[];
    var arrMatClone=[];
    this.dragMaterial=function(o3){  
        
        if(o3.type!="Mesh"){
            if(o3.children!=undefined){
                for(var i=0;i<o3.children.length;i++){         
                    if(o3.children!=undefined){
                        this.dragMaterial(o3.children[i]);
                    }            
                }
            } 
        }
        else{//Наверно меш            
            if(o3.material){                
                if(o3.material.map){                    
                    bbb=true;
                    for (var i = 0; i < arrMat.length; i++) {
                        
                        if(arrMat[i].uuid==o3.material.uuid){
                            bbb=false;
                        }
                    }
                    if(bbb==true){
                        
                        arrMat.push(o3.material);
                    }
                } 
            }
        }   
    }
    this.cloneMaterial=function(){         
        for (var i = 0; i < arrMat.length; i++) {
            arrMatClone[i]=arrMat[i].clone();
            
        } 
        this.dragMaterial2(this.loaderJS3D.object)      
    }
    this.dragMaterial2=function(o3){          
        if(o3.type!="Mesh"){
            if(o3.children!=undefined){
                for(var i=0;i<o3.children.length;i++){         
                    if(o3.children!=undefined){
                        this.dragMaterial2(o3.children[i]);
                    }            
                }
            } 
        }
        else{//Наверно меш            
            if(o3.material){                              
                if(o3.material.map){                   
                    for (var i = 0; i < arrMat.length; i++) {                        
                        if(arrMat[i].uuid==o3.material.uuid){
                            o3.material=arrMatClone[i];                            
                        }
                    }                    
                } 
            }
        }   
    }



    if (this._bObj) {
        if (this._bObj.rectLoad) {             
            this.indicator.width=this._bObj.rectLoad.width;
            this.indicator.depth=this._bObj.rectLoad.depth;
            this.indicator.height=this._bObj.rectLoad.height;
        }
    }


    // клонирование BoxBlok
    this.clone = function() {
        var clon = new BoxBlok(this._idUnik);   // создаем новый BoxBlok
        clon.position.set(this.position.x, this.position.y, this.position.z);
        clon.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
        clon._width = this.width;
        clon._height = this.height;
        clon.depth = this.depth;
        return clon;
    }

    
    this.clear = function() { 
        trace("this.clear"+this.idUnik);       
        if(this.sten!=undefined){
			this.sten.finishRemove(this)
            this.sten.removeBlok(this);
            main.ot("restartMenu");
            //bigMenu.arrMenu[1].restartMenu();   
        }
        if(this.parent!=undefined){
            this.parent.remove(this);
            main.ot("restartMenu");
            //bigMenu.arrMenu[1].restartMenu();          
        }
        visi3D.intRend=1;
    }
        this.boxColizi.rectCollisMeshdy.funErr = function() {self.clear()} ;

    this.restartUnik=function(_idUnik){        
        this.indicator.value = 0;
        this.indicator.visible=true;
        visi3D.intRend=1;
        this.bat.load("resources/obj3d/"+_idUnik+"/mod3d/pic.png");
        this.loaderJS3D.load("resources/obj3d/"+_idUnik+"/mod3d/");       
    }
    
    

    this.setObj=function(o){        
       
        this.width=o.width;
        this.height=o.height;
        this.depth=o.depth;
        this.position.x=o.x;
        this.position.y=o.y;
        this.position.z=o.z;/* */
        trace(this.idUnik+"  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  "+o.idUnik)
        this.idUnik=o.idUnik
    }
    this.getObj=function(){        
        var o={} 
        o.idUnik=this.idUnik;

        if(this.sten)o.sten=this.sten.id;
        o.x=this.position.x;
        o.y=this.position.y;
        o.z=this.position.z;
        o.rotZ=this.rotation.z;
        /*o.width=this.width;
        o.height=this.height;
        o.depth=this.depth;
        o.x=this.position.x;
        o.y=this.position.y;
        o.z=this.position.z;*/
        return o;       
    }
    var ii;
    this.colorDin=new THREE.Color();
    this.tween = new TWEEN.Tween(this.colorDin);
    this.tween.onUpdate(function(){        
        for (ii = 0; ii < arrMatClone.length; ii++) {            
            arrMatClone[ii].color.setRGB(self.colorDin.r, self.colorDin.g, self.colorDin.b );
        };
        visi3D.intRend=1;
    });
    this.tweenStart=function(r, g, b){ 
        this.colorDin.r=r||0.5;
        this.colorDin.g=g||1;
        this.colorDin.b=b||0.5;
        this.tween.to({r:1, g:1, b:1},500).start();
    }



    



    this._activ=true;
    Object.defineProperty(this, "idUnik", {
        set: function (value) {
            if (this._idUnik == value) return;
            this._idUnik = value;
            this.restartUnik(this._idUnik);
        },
        get: function () {
            return this._idUnik;
        }
    });

    Object.defineProperty(this, "idBlok", {
        set: function (value) {          
            this._idBlok = value;
            this.content3d.name2=value;    
        },
        get: function () {
            return this._idBlok;
        }
    });

    Object.defineProperty(this, "x", {
        set: function (value) {            
            this._x = value; 
            this.position.x=value;
            if(this.boxGeom!=null)this.boxGeom.x=value+obj.rectDur.x;   
            if(this.boxColizi!=null)this.boxColizi.x=-value+obj.rectColizi.x;
                 
        },
        get: function () {
            return this._x;
        }
    }); 
    Object.defineProperty(this, "y", {
        set: function (value) {            
            this._y = value; 
            this.position.z=value; 
            if(this.boxGeom!=null)this.boxGeom.y=-value+obj.rectDur.y;
            if(this.boxColizi!=null)this.boxColizi.y=-value+obj.rectColizi.y;
        },
        get: function () {
            return this._y+this.offsetHeight;
        }
    });



    Object.defineProperty(this, "activ", {
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value; 
            if(this._activ==true){
                this.btn.visible=true; 
                this.bat.color="rgba(180,234,180,0.5)";
            }else{

                this.btn.visible=false;
                this.bat.color="rgba(180,234,180,0.03)";
            }           
        },
        get: function () {
            return this._activ;
        }
    });

    this.activ=false;


    Object.defineProperty(this, "width", {
        set: function (value) {
            if (this._width == value) return;
            this._width = value;
           // this.indicator.height=this._width;
            //trace("!!!!!!!!"+this._width);
            //this.updateBoxBlok();
        },
        get: function () {
            return this._width;
        }
    }); 

    Object.defineProperty(this, "height", {
        set: function (value) {
            if (this._height == value) return;
            this._height = value;
            //this.indicator.height=this._height;
        },
        get: function () {
            return this._height;
        }
    }); 
    Object.defineProperty(this, "depth", {
        set: function (value) {
            if (this._depth == value) return;
            this._depth = value;
            //this.indicator.height=this._depth;
        },
        get: function () {
            return this._depth;
        }
    }); 
    this.idUnik=idUnik;
}
BoxBlok.prototype = Object.create( THREE.Object3D.prototype );
BoxBlok.prototype.constructor = BoxBlok;



