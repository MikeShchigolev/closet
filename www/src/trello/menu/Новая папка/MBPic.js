




function MBPic(c,x,y,f) {  
    var self=this   
    this.type="MBas";
    self.fun=f
    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.dCont=new DCont(c);
    this.dCont.x=x;
    this.dCont.y=y;
 
    this.y=y
    this.aSaze=[32,64,100,128,256,"original"];
    this.height=55
    this.o=undefined
    this.o11=undefined

    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.panel.height=this.height;

    this.fotoDrag=new FotoDrag(function(){
        self.narezka();
    })

    this.arBase=[]
    this.narezka=function(){
        this.arBase=[]        
        var s
        for (var i = 0; i < this.aSaze.length; i++) {
            s=this.aSaze[i]+".png";
            this.arBase.push( this.fotoDrag.na(this.aSaze[i], 0));
            this.arBase.push(s);
        }
        for (var i = 0; i < this.aSaze.length; i++) {
            s="y"+this.aSaze[i]+".png";
            this.arBase.push( this.fotoDrag.na(this.aSaze[i], 1));
            this.arBase.push(s);
        }
        self.fun("sArray", this.arBase); 

        this.button.loadImeg(this.arBase[2])
    } 


    this.button=new DButton(this.panel,this.otstup,this.otstup," ",function(base64){        
        if(base64!=undefined){ 
            self.l.text=this.files[0].name;            
            self.o.orig=this.files[0].name;
            self.fun("baseOrig", base64, this.files[0].name); 
            self.fotoDrag.setLink(base64);
        }
    })
    this.button.startFile();



   

    this.button.width=  this.button.height= this.height- this.otstup*3;
    var s=""
    for (var i = 0; i < this.aSaze.length; i++) {
        s+=this.aSaze[i]+","
    }    
    this.l=new DLabel(this.panel,this.otstup*2+this.button.width,this.otstup,s)   
    this.l.fontSize=10
    this.l.width=this.panel.width-this.otstup*2+this.button.width;


    this.l=new DLabel(this.panel,this.otstup*2+this.button.width,this.otstup+12,""+this.aSaze[0]+".png"+"  не сжат   x"+this.aSaze[0]+".png"  )   
    this.l.fontSize=10
    this.l.width=this.panel.width-this.otstup*2+this.button.width;

    this.l=new DLabel(this.panel,this.otstup*2+this.button.width,this.otstup+32,"ndsfg");   
    this.l.width=this.panel.width-this.otstup*2+this.button.width;

    this.setObj= function(o){ 

        this.o=o          
        this.l.text=this.o.orig; 
        this.o11=o
        var link=aGlaf.resursData+""+o.id+"/64.png"
        this.button.loadImeg(link);       
    }
}


function FotoDrag(fun) {  
    var self=this   
    this.type="FotoDrag";
    this.fun=fun;
    this.width=256;             
    this.height=256;
    

    var stage = new PIXI.Container();
    var img = new PLImage(stage, 0, 0, null, function () {
        h = img.picHeight;
        w = img.picWidth;
        s = img.picWidth/img.picHeight;        
        self.fun()
    }) 
    var h = img.picHeight;
    var w = img.picWidth;
    var s = img.picWidth/img.picHeight;
    var renderer = new PIXI.CanvasRenderer(100, 100, {transparent:true});

    
    this.setLink=function(base64,fun){
       
        img.link=base64;

    }

    this.na=function( num, tip){
       
        var b=true;      
        if( typeof num == "string"){
            num = h
        }            
            
        self._width=num;
        self._height=num;         

        var ss=num/h;
        var xx=0;
        var yy=0;        

        img.x=0;
        img.y=0;
     
        if(tip==0){
            if(w>h){
                img.width=num*s;
                img.height=num;
                img.x=(num-w*ss)/2 
            }
            if(w<=h){
                img.width=num;
                img.height=num/s;
                img.y=(num-h*ss)/2
            }
        }
        if(tip==1){ 
            
            img.width=num*s;
            self._width=img.width
            img.height=num;
        }

        renderer.render(stage);
        renderer.resize(self._width, self._height);
        renderer.render(stage);
        renderer.render(stage);
        return renderer.view.toDataURL('image/png');        
    }
}

