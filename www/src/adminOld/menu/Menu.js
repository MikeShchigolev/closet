



function Menu(aGlaf, fun) {  
    var self=this;  
    this.type="Menu";
    this.par=aGlaf;
    this.objectBase=this.par.objectBase;
    this.fun=fun;
    this.dCont=new DCont(this.par.dCont);

    
    this.dragPic=new DragPic(this.dCont);

   

    this.array=[]
    this.array[0]=this.menuVerh=new MenuVerh(this, function(s,p){ self.fun(s,p)});
    this.array[1]=this.menuBD=new MenuBD(this, function(s,p){ self.fun(s,p)});  
    this.array[2]=this.menuObject=new MenuObject(this, function(s,p){ self.fun(s,p)});
    this.array[3]=this.menuThree=new MenuThree(this, function(s,p){ self.fun(s,p)});
    this.array[4]=this.menuScene=new MenuScene(this, function(s,p){ self.fun(s,p)});
    

    this.array[5]=this.matBD=new MatBD(this, function(s,p){ self.fun(s,p)});  
    this.array[6]=this.matObject=new MatObject(this, function(s,p){ self.fun(s,p)});

    this.array[7]=this.naObj=new NaObj(this, function(s,p){ self.fun(s,p)});


    this.array[8]=this.dopInfo=new DopInfo(this, function(s,p){ self.fun(s,p)});    

    this.mInfo=new MInfo(this.par.dCont);

/*
    setTimeout(function() {
        self.dopInfo.active=true

    }, 500);

    */


    this.sizeWindow = function(w,h){  
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].sizeWindow(w,h)
        }  
        this.mInfo.sizeWindow(w,h)      
    }
}

