

function NaObj(menu, fun) {  
    var self=this   
    this.type="MatObject";
    this.fun=fun;
    this.par=menu;
    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.object=null;
    this.dCont=new DCont(this.par.dCont);
    this.objDin=undefined;
    this._width=100;
    this._height=100;
    this._active=false

    this.obj=undefined;

    this.rect={x:0,y:0,w:100,h:100,visible:this._active,fun:function(s,p){

    }}


    this.w=new DWindow(null, this.widthBig+this.otstup, this.whv,"Параметры обьета");
    this.w.width=this.widthBig;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;
    this.cont=new DCont(this.w);
    this.cont.y=32
    this.content=new DCont(this.cont);
    this.cont.visible=false;

    this.minV3D=new MinV3D(this)

    this.psevdoThree=new PsevdoThree(this.w.content,0,0)

    this.o3d;
    this.setObj = function(o3d){ 
        this.o3d=o3d
        this.active=true;
        this.psevdoThree.setObj(o3d)
    }

    this.sizeWindow = function(w,h){  
        this._width=w;
        this._height=h;
        this.w.height= h - this.whv- this.otstup;  
        this.w.x= w-this.widthBig        
    }

    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;
                this.rect.visible=value;
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


  
}


function PsevdoThree (cont, _x, _y) {    
    this.type = 'PLPanel';
    var self = this;

    this.dCont=new DCont(cont);
    
    this.dCont.x = _x || 0;
    this.dCont.y = _y || 0;

    this.widthBig=aGlaf.widthBig;
    this.otstup=aGlaf.otstup;

    this.array=[];
    this.arrayMat=[];
    this.ab=[]

    this.height=0
    this.clear=function(){
        this.array.length=0;
        this.arrayMat.length=0;
        this.height=0;
        for (var i = 0; i < this.ab.length; i++) {
            this.ab[i].visible=false;
        }
    }
    this.recTest = function(o3d, sah){        
        this.array.push(o3d)
        if(o3d.material!=undefined){
            var b=false;            
            for (var i = 0; i < this.arrayMat.length; i++) {
                if(this.arrayMat[i].uuid==o3d.material.uuid){
                    b=true
                }
            }
            if(b==false)this.arrayMat.push(o3d.material)
        }

        o3d.sah=sah;
        var sahh=sah+1;
        
        if(o3d.children){
            for (var i = 0; i < o3d.children.length; i++) {
                this.recTest(o3d.children[i], sahh);
            }
        }
    }


    ////////////////////////////////////
    this.dragMat = function(){   
        var o={arr:[]}
        for (var i = 0; i < this.arrayMat.length; i++) {
            var oo={}

            oo.src=minV3D.getPic(this.arrayMat[i],100);
            oo.mat=this.arrayMat[i]
            o.arr.push(oo)
        }
        

        this.gallery.start(o.arr)
    }  

    





    //////////////////////////////////////


    this.lab=new DLabel(this.dCont,-70,-28,"pofhj")
    this.lab.colorText1 = "#000000";    

    var kolTri
    this.zborInfa = function(o3d){ 
        kolTri=0;
        this.dsfgasdf(o3d)
        this.lab.text="т: "+kolTri
    }

    this.dsfgasdf = function(o3d){        
        
        if(o3d.geometry!=undefined){
             
            kolTri+=o3d.geometry.index.count/3
        }
            
        if(o3d.children){
            for (var i = 0; i < o3d.children.length; i++) {
                this.dsfgasdf(o3d.children[i]);
            }
        }
    }


    this.objAkt
    this.openIdArr = function(i){ 
        this.objAkt=this.array[i]
        this.dragNa(this.objAkt)
        this.tween = new TWEEN.Tween(this.array[i].scale);
        var x=this.array[i].scale.x;
        var y=this.array[i].scale.y;
        var z=this.array[i].scale.z;
        this.array[i].scale.x*=1.5;
        this.array[i].scale.y*=1.5;
        this.array[i].scale.z*=1.5;
        this.tween.to({x:x, y:y, z:z},200).start();

        if(this.objAkt.material){
            for (var i = 0; i < this.arrayMat.length; i++) {
                if(this.arrayMat[i].uuid==this.objAkt.material.uuid){
                    this.gallery.index=i
                    break;
                }
            }
        }

        this.zborInfa(this.objAkt);        
    }   

    
    this.bulBat=new DButton(this.dCont, this.otstup, 0,"сетка/не сетка", function(){
        var b=true;
        if(self.arrayMat[0])if(self.arrayMat[0].wireframe!=undefined)b=!self.arrayMat[0].wireframe
     
        for (var i = 0; i < self.arrayMat.length; i++) {
            if(self.arrayMat[i].wireframe!=undefined)self.arrayMat[i].wireframe=b;
        }    
    });


    this.panel=new DPanel(this.dCont, this.otstup, 0);
    this.panel.width=this.widthBig-this.otstup*3;
    var w=(this.panel.width-this.otstup*2)/3-this.otstup;
    
    var hh=24
    var ppp
    this.drag=function(){
        ppp=self.objAkt[this.ttt] 
        if(this.idArr==0)ppp.x=this.value*1;
        if(this.idArr==1)ppp.y=this.value*1;
        if(this.idArr==2)ppp.z=this.value*1;   
    }

    this.dragNa=function(o3){
        this.ar[0].value=o3.position.x;
        this.ar[1].value=o3.position.y;
        this.ar[2].value=o3.position.z;

        this.ar1[0].value=o3.rotation.x;
        this.ar1[1].value=o3.rotation.y;
        this.ar1[2].value=o3.rotation.z;

        this.ar2[0].value=o3.scale.x;
        this.ar2[1].value=o3.scale.y;
        this.ar2[2].value=o3.scale.z;
    }

    this.label=new DLabel(this.panel,this.otstup,this.otstup,"position")
    this.label=new DLabel(this.panel,this.otstup,this.otstup+(18+hh),"rotation")
    this.label=new DLabel(this.panel,this.otstup,this.otstup+(18+hh)*2,"scale")

    this.ar=[];
    this.ar1=[];
    this.ar2=[];
    for (var i = 0; i < 3; i++) {

        this.ar[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), this.otstup+18,i+" ",this.drag);
        this.ar[i].height=hh;
        this.ar[i].idArr=i;
        this.ar[i].ttt="position";
        this.ar[i].width=w;  
        this.ar[i].fontSize=12;   
        this.ar[i].setNum(0.1); 

        this.ar1[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), (this.otstup+hh+18)+18,i+" ",this.drag);
        this.ar1[i].height=hh;
        this.ar1[i].idArr=i;
        this.ar1[i].ttt="rotation";
        this.ar1[i].width=w;  
        this.ar1[i].fontSize=12;   
        this.ar1[i].setNum(0.1); 

        this.ar2[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), this.otstup*3+hh*4,i+" ",this.drag);
        this.ar2[i].height=hh;
        this.ar2[i].idArr=i;
        this.ar2[i].ttt="scale";
        this.ar2[i].width=w;  
        this.ar2[i].fontSize=12;   
        this.ar2[i].setNum(0.1);  
    }
    this.panel.height=this.ar2[0].y+this.ar2[0].height+this.otstup*2
   
    this.gallery=new DGallery(this.dCont,0,0,function(){
        trace(this.array[this.index].object)
       /* aGlaf.menu.menuVerh.activMenu(3)
        aGlaf.menu.matObject.*/
        //aGlaf.menu.matBD.activ=true;
    })
    this.gallery.width=this.widthBig;
    this.gallery.kolII=2;
    this.gallery.widthPic=this.widthBig/2-10;
    this.gallery.heightPic=this.widthBig/2-10;
    
    this.xzxz = function(){ 
        for (var i = 0; i < this.array.length; i++) {
            if(this.ab[i]==undefined){
                this.ab[i]=new DButton(this.dCont, 0, i*hh, "nnn",function(){self.openIdArr(this.idArr) })
                this.ab[i].idArr=i;
                this.ab[i].height=hh
            }
            
            this.ab[i].x=this.array[i].sah*hh;
            this.ab[i].width=this.widthBig-this.ab[i].x;

            this.ab[i].visible=true;
            this.ab[i].text=this.array[i].name;
        }
        this.height=this.array.length*hh;
        
        this.panel.y=this.height+this.otstup
        this.height=this.panel.y+this.otstup+this.panel.height

        this.bulBat.y=this.height

        this.gallery.y=this.height+35
    }


    this.o3d;
    this.setObj = function(o3d){ 
        this.o3d=o3d
        this.clear()
        this.recTest(o3d,0)
        this.xzxz()

        this.dragMat()

        this.openIdArr(0)

    }


}
   