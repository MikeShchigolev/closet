

function MenuProdukt(menu, fun) {  
    var self=this   
    this.type="MenuProdukt";
    this.fun=fun;
    this.par=menu;
    this.otstup=menu.otstup;
    
    this._active=false
    this.widthBig=menu.widthBig;
    this.object=null;
    this.dCont=new DCont(this.par.w.content);
    this.dCont.visible=this._active;
    this.objDin=undefined;
    this._width=100;
    this._height=100;
    

    this.obj=undefined;

    var sahIndex=this.par.array.length
    this.but=new DButton(this.par.w, this.otstup+(this.otstup+100)*sahIndex, this.otstup,this.type,function(){
        
        self.par.index=sahIndex;
    });
    this.but.height-=this.otstup*2;
   

    this.w=new DWindow(this.dCont, this.otstup, this.otstup," ");
    this.w.width=this.widthBig;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;
    this.cont=new DCont(this.w);
    this.cont.y=32
    this.content=new DCont(this.cont);
    this.cont.visible=false;




    this.gallery=new DGallery(this.w.content,this.otstup,this.otstup,function(){
        //fun(self.array[this.index].title)
        //trace(this.index)
        //trace(self.array)
       // trace(self.array[this.index])
    })
    //this.array[0].start(a);
    this.gallery.kolII=4;
    this.gallery.heightPic=this.gallery.widthPic=46;
 
    this.gallery.width=this.w.width-4;
    this.gallery.height=this.w.height-4;
    //this.gallery.panelBool = true;



     
    this.setArr=function(a,sah){
        this.array=[];
        var sah=0;
        for (var i = sah; i < a.length; i++) {             
            if(a[i]*1!=undefined){
                this.array.push({src:'save/'+a[i] +'/icon.png'/*,title:a[i]*/})
               
            }
            sah++;
            if(sah>50)break;
        }
        this.gallery.start(this.array);
    }




    this.getArray=function(f){
        php.load({tip: 'getDiractFiles', dir: '../save/'}, function (e) {              
            var a = e.split(",");
            var aa=[]
            for (var i = 0; i < a.length; i++) {
                if(a[i]*1>0){
                    aa.push(a[i]*1)
                }
            }

            aa.sort(function(a, b) { return b - a; });
            f(aa);           
        })
    }

    this.getArray(function(a){
        trace(a);
        self.setArr(a,0)
    })



    this.sizeWindow = function(w,h){      
        this.w.height = h -  this.otstup-38; 
        this.gallery.height=this.w.height-4-32;  
        
    }
}

Object.defineProperties(MenuProdukt.prototype, {
    active: {
        set: function (value) {
            if(this._active !=value){
                this._active = value;

                this.but.alpha= value ? 0.5 : 1
                this.dCont.visible=value;
            }  
        },
        get: function () {
            return this._active;
        }
    }
})

