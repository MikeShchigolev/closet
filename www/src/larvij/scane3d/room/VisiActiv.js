/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


Выделяшка активного обьекта
*/


export class VisiActiv  {
    constructor(par, fun) {         
        this.type="VisiActiv";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.par=par
        this.visi3D= this.par.par.par.visi3D
        this._radius=0.3;        
        this._radPoint=3;
        this._radPoint1=3;
        this._otstup=1
        this._height=this.par._height;
        this._material=this.par.menedsher.mMaterial.geterMat.getTestTitle("line0"); 
        this._matPoint=this.par.menedsher.mMaterial.geterMat.getTestTitle("line1"); 
        this._matText=this.par.menedsher.mMaterial.geterMat.getTestTitle("line2");
        this._matBox=this.par.menedsher.mMaterial.geterMat.getTestTitle("line3");

        this._sah=1;
        this._fontSize=6       
        if(this.par.par.par.par.localStorage.object.sts!=undefined){
            this._fontSize=this.par.par.par.par.localStorage.object.sts;
        }
        this._test=this._fontSize;

        this.cylinderGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 1, 10);
        this.sphereBufferGeometry =new THREE.SphereBufferGeometry( 0.5, 16, 16 );
        this.planeBufferGeometry = new THREE.PlaneBufferGeometry( 1, 1);
        this.boxBufferGeometry = new THREE.BoxBufferGeometry( 1, 1, 1 );

        this.content3d = new THREE.Object3D();        
        this.par.content3d.add(this.content3d);        

        this.array=[];
        this.povedeni1= new Povedeni1(this)

        this.clear=function () {
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].active=false;
            }  
            if(this.vaBox.content3d.parent)  this.vaBox.content3d.parent.remove(this.vaBox.content3d)       
        }  

        this.object=undefined;
        this.poved=undefined;
        this.setObject=function(o, b){
            this.clear()
            this.object = o;
            if(b==undefined)this.par.par.par.menuDiv.nizMenu.setObject(o)         
            if(this.object==undefined)return undefined;
            this.poved=undefined;
            this.poved=this.povedeni1;
    
            if(this.poved!=undefined)this.poved.start();
            return this;
        }

        this.korektActiv =function(blok){            
            if(this.object!=undefined){
                if(this.object.idArr==blok.idArr){                   
                    this.setObject(blok)                    
                }
            }
        }   


        this.dragActiv=function(){
            if(this.object==undefined) return;
            if(this.poved!=undefined)this.poved.dragActiv();    
        }


        this.getCreat=function(type){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active==false)if(this.array[i].type==type){
                    this.array[i].active=true
                    return this.array[i];
                }
            }
            var r;
            if(type=="VALineeText") r = new VALineeText(this);
            r.idArr=this.array.length
            this.array.push(r)
            return r;
        }

        this.vaBox=new VABox(this)
        this.array[0]=this.vaBox;
        this.v
        this.v1
        this.fun_rotationZ = function (v,v1) {
            this.v=v;
            this.v1=v1;
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active!=false){                    
                    if(this.array[i].fun_rotationZ){
                        this.array[i].fun_rotationZ(v,v1)
                    }
                }
            }
        }


    }


    set height(v) {
        if(this._height!=v){           
            this._height = v; 
            this.povedeni1.height = v;
        }       
    }   
    get height() { return  this._height;}


    set test(v) {
        if(this._test!=v){           
            this._test = v;            
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].fontSize = v;
            }
            this.visi3D.intRend=1;
        }       
    }   
    get test() { return  this._test;}


    set radius(v) {
        if(this._radius!=v){
           
            this._radius = v;            
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].radius = v;
            }
            this.visi3D.intRend=1;
        }       
    }   
    get radius() { return  this._radius;}


    set material(v) {        
        this._material = v;            
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].material = v;
        }
        this.visi3D.intRend=1;
             
    }   
    get material() { return  this._material;}


    set radPoint(v) {
        if(this._radPoint!=v){
            this._radPoint = v;           
            this.visi3D.intRend=1;
        }       
    }   
    get radPoint() { return  this._radPoint;}


    set radPoint1(v) {
        if(this._radPoint1!=v){
            this._radPoint1 = v; 
            this.visi3D.intRend=1;
        }       
    }   
    get radPoint1() { return  this._radPoint1;}
    set matPoint(v) {        
        this._matPoint = v;
        this.visi3D.intRend=1;              
    }   
    get matPoint() { return  this._matPoint;}


    set sah(v) {
        if(this._sah!=v){
            this._sah = v;            
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].sah = v;
            }
            this.visi3D.intRend=1;
        }       
    }   
    get sah() { return  this._sah;}
}




export class Povedeni1  {
    constructor(par) { 
        this.type="VALine";
        var self=this;
        this.par=par;
        this._height=par._height
        this.aL=[]

        this.start=function(){ 
            this.aL[0]=this.par.getCreat("VALineeText");
            this.aL[1]=this.par.getCreat("VALineeText");
            this.aL[2]=this.par.getCreat("VALineeText");
            this.aL[3]=this.par.getCreat("VALineeText");

            this.aL[0].content3d.position.z=0
            this.aL[1].content3d.position.z=0
            this.aL[2].content3d.position.z=0
            this.aL[3].content3d.position.z=0

            this.aL[0].boolW=true;
            this.aL[1].boolW=true;

            this.aL[2].boolW=false;
            this.aL[3].boolW=false;

            for (var i = 0; i < this.aL.length; i++) {
                this.aL[i].radPoint=this.par.radPoint;
                this.aL[i].radPoint1=this.par.radPoint1;
            }

            for (var i = 0; i < this.aL.length; i++) {
                this.aL[i].active=true
            }
            
            this.par.object.content3d.add(this.par.vaBox.content3d)

            var w=this.par.object.rect[3]
            var h=this.par.object.rect[5]
            var d=this.par.object.rect[4]

            var x=-this.par.object.rect[3]/2
            var y=this.par.object.rect[5]/2
            var z=0
            var n=0            
            
            if(this.par.object.type=="BDoor"||this.par.object.type=="BWindow"){
                d=10;
                z=-10;
                n=1;
            }

            if(this.par.object.type=="BDoor"){
                y=this.par.object.rect[5]/2-(200-this.par.object.rect[5])/2;//this.par.object.rect[5]/2
            }

            if(this.par.object.type=="BTumba"){
                h+=2
                y= h/2
            }

            if(this.par.object.type=="BPieceTop"){                
                x=this.par.object.rect[0]
                y=-this.par.object.rect[2]
                h-= 2.7              
            }

            if(this.par.object.type=="BTVstavka"){  
                this.aL[0].active=false;
                this.aL[1].active=false;
                this.aL[2].active=false;
                this.aL[3].active=false;
            }

            if(this.par.object.type=="BPieceObject"){  
                this.aL[0].active=false;
                this.aL[1].active=false;
                x=this.par.object.rect[0]
                y=-this.par.object.rect[2]

                this.aL[2].content3d.position.z=d/2
                this.aL[3].content3d.position.z=d/2
            }

            this.par.vaBox.setWHD(w,h,d,n)
            this.par.vaBox.setXYZ(x,y,z)
            this.dragActiv();
        }


        this.dragActiv=function(){            
            if(this.testParent()==false)return
        }

        var d,x,x1,y,y1,arrChild
        var dy,dd;
        var dy2;
        var py2;
        var rr,rrrr   
        this.testParent=function(){

            if(this.par.object._parent==undefined){                
                if(this.par.content3d.parent!=undefined){
                    this.par.content3d.parent.remove(this.par.content3d);
                }
                return false
            }else{
                if(this.par.content3d.parent==undefined){
                    this.par.object._parent.content3d.add(this.par.content3d);
                }
                if(this.par.content3d.parent.uuid!=this.par.object._parent.content3d.uuid){
                    this.par.object._parent.content3d.add(this.par.content3d);
                }               
            }
            arrChild=this.par.object._parent.children
            
            x=this.par.object.x+this.par.object.rect[0];
            x1=this.par.object.x+this.par.object.rect[3]+this.par.object.rect[0];
            d=x;
            y=this._height-(this.par.object.y+this.par.object.rect[5]/2);
            y1=this._height-(this.par.object.y-this.par.object.rect[5]/2); 

            var z=0
            if(this.par.object.type=="BPieceTop"){
                var z=this.par.object.rect[5]/2-2.1
                y+=z;
                y1+=z-2.1;
            }

            if(this.par.object.type=="BDoor"||this.par.object.type=="BWindow"){
                x-=this.par.object.rect[3]/2;
                x1-=this.par.object.rect[3]/2;
                d-=this.par.object.rect[3]/2

                if(this.par.object.type=="BDoor"){
                    var pp=this.par.object.rect[5]/2-(200-this.par.object.rect[5])/2
                    var ny=this._height-(this.par.object.y+pp)                    
                    y=ny;
                    y1=this._height
                }
            }

            if(this.aL[0].active==true){
                var xxx=this.par.object.x-this.par.object.rect[3]/2               
                rr=this.par.par.menedsher.mUtilit.getGorizRay(
                    arrChild, 
                    xxx, 
                    this.par.object.y-z, 
                    0
                )

                this.aL[0].content3d.position.x=rr
                this.aL[0].content3d.position.y=this.par.object.y-z
                this.setDist(d-rr,this.aL[0])
            }    
               
            if(this.aL[1].active==true){               
                rr=this.par.par.menedsher.mUtilit.getGorizRay(
                    arrChild, 
                    this.par.object.x+this.par.object.rect[5]/2, 
                    this.par.object.y-z, 
                    this.par.object._parent._width
                ) 
                this.aL[1].content3d.position.y=this.par.object.y-z
                this.aL[1].content3d.position.x=x1;
                this.setDist(rr-x1,this.aL[1])
            }

            //вертикали
            dy=y;
            dy2=this._height-y1;
            py2=0;
            this.b4=false;
            if(this.par.object.parent!=undefined && this.par.object.parent.parent!=undefined)   
            if(this.par.object.type=="BPieceObject"){ 
                this.b4=true;
                arrChild=this.par.object.parent.parent.children
                var yy=this.par.object.parent.y                
                y=this._height-this.par.object.y+this.par.object.rect[2]                
                dy=-this.par.object.y; 
                y1=250
                dy2=yy+this.par.object.y-this.par.object.rect[5]-this.par.object.rect[2];
                py2=-yy
                var yyy=this.par.object.parent.y+this.par.object.y
                rr=this.par.par.menedsher.mUtilit.getVertRay(
                    arrChild, 
                    this.par.object.parent.x+this.par.object.x, 
                    this.par.object.parent.y+this.par.object.y, 
                    false
                )
                dy=rr-yyy; 
                
                dy2=this.par.object.parent.y+this.par.object.y+this.par.object.rect[5]-this.par.object.rect[2]
                rrrr=this.par.par.menedsher.mUtilit.getVertRay(
                    arrChild, 
                    this.par.object.parent.x+this.par.object.x, 
                    this.par.object.parent.y+this.par.object.y-this.par.object.rect[5]-this.par.object.rect[2], 
                    true
                )
                dd=dy2-rrrr;
                
                dd=(this.par.object.parent.y+this.par.object.y-this.par.object.rect[5])-rrrr-this.par.object.rect[2]
                rrrr=-this.par.object.parent.y+rrrr
            
            }else{

                this.b4=true;
                rr=this.par.par.menedsher.mUtilit.getVertRay(
                    arrChild, 
                    x+(x1-x)/2, 
                    this._height-y, 
                    false
                )
                dy=rr-(this._height-y);
               
                rrrr=this.par.par.menedsher.mUtilit.getVertRay(
                    arrChild, 
                    x+(x1-x)/2, 
                    dy2, 
                    true
                )               
                dd=dy2-rrrr;
            }


            if(this.b4==false){
                rrrr=0;
                dd=this.par.object.y-this.par.object.rect[5];

                if(this.par.object.type=="BDoor"||this.par.object.type=="BWindow"){
                    dd=this.par.object.y-this.par.object.rect[5]/2;
                }
            }

            if(this.aL[2].active==true){              
                this.aL[2].content3d.position.x=x+(x1-x)/2
                this.aL[2].content3d.position.y=this._height-y;               
                this.setDist(dy,this.aL[2])
            }             

            if(this.aL[3].active==true){                   
                this.aL[3].content3d.position.x=x+(x1-x)/2;
                this.aL[3].content3d.position.y=rrrr;
                this.setDist(dd,this.aL[3]); 
            }
            return true
        }

        this.setDist=function(dd, line){
            if(dd>10){
                line.distans=dd;
                line.content3d.visible=true
            }else{
                line.content3d.visible=false
            }
        }
    }

    set height(v) {
        if(this._height!=v){           
            this._height = v;
        }       
    }   
    get height() { return  this._height;}
}



export class VABox  {
    constructor(par) { 
        this.type="VABox";
        var self=this;
        this.par=par
        this._radius=this.par._radius;
        this._material=this.par._material;
        this._radPoint=this.par._radPoint;
        this._radPoint1=this.par._radPoint1;
        this._matPoint=this.par._matPoint
        this._matText=this.par._matText
        this._fontSize=this.par._fontSize
        this._sah=this.par._sah;
        this._otstup=this.par._otstup
        this.content3d = new THREE.Object3D(); 

        this.meshBox=new THREE.Mesh(this.par.boxBufferGeometry,this.par._matBox);
        this.meshBox.renderOrder=3;
        this.content3d.add(this.meshBox)
        this.array=[]
        for (var i = 0; i < 12; i++) {
            this.array[i]=new VALine(this);
        } 
        this.array[0].content3d.rotation.z= -Math.PI/2
        this.array[2].content3d.rotation.z= -Math.PI/2
        this.array[4].content3d.rotation.z= -Math.PI/2
        this.array[6].content3d.rotation.z= -Math.PI/2

        this.array[8].content3d.rotation.x= Math.PI/2
        this.array[9].content3d.rotation.x= Math.PI/2
        this.array[10].content3d.rotation.x= Math.PI/2
        this.array[11].content3d.rotation.x= Math.PI/2

        this.label = new TLabel(this.content3d,0,0," ");
        this.label.material=this._matText;
        this.label.fontSize=this._fontSize;

        this.label1 = new TLabel(this.content3d,0,0," ");
        this.label1.material=this._matText;
        this.label1.fontSize=this._fontSize;
        
        this.label2 = new TLabel(this.content3d,0,0," ");
        this.label2.material=this._matText;
        this.label2.fontSize=this._fontSize;      

        this.label.object3d.scale.z=0.02
        this.label1.object3d.scale.z=0.02
        this.label2.object3d.scale.z=0.02

        this.setWHD=function(w,h,d,n){
            this.array[0].distans=this.array[2].distans=this.array[4].distans=this.array[6].distans=w            
            this.array[0].content3d.position.z=d
            this.array[2].content3d.position.z=d
            this.array[2].content3d.position.y=-h
            this.array[6].content3d.position.y=-h

            this.array[1].distans=this.array[3].distans=this.array[5].distans=this.array[7].distans=h
            this.array[1].content3d.position.y=-h
            this.array[3].content3d.position.y=-h
            this.array[5].content3d.position.y=-h
            this.array[7].content3d.position.y=-h

            this.array[1].content3d.position.z=d
            this.array[1].content3d.position.x=w
            this.array[3].content3d.position.z=d
            this.array[5].content3d.position.z=d

            this.array[8].distans=this.array[9].distans=this.array[10].distans=this.array[11].distans=d
            this.array[9].content3d.position.x=w
            this.array[10].content3d.position.x=w
            this.array[10].content3d.position.y=-h
            this.array[11].content3d.position.y=-h 

            this.meshBox.scale.set(w,h,d)
            this.meshBox.position.set(w/2,-h/2,d/2)

            this.label.text=Math.round(w)+ "0мм"; 
            this.label.x = w/2+this._otstup;
            this.label.y = this._fontSize+this._otstup;

            this.label1.text=Math.round(h)+ "0мм"; 
            this.label1.x = w+this._otstup
            this.label1.y = -h/2+this._fontSize/2
            this.label1.object3d.position.z=d

            this.label2.text=Math.round(d)+ "0мм";
            this.label2.x = w+this._otstup
            this.label2.y = this._fontSize
            this.label2.object3d.position.z=d/2

            if(n==undefined||n==0){
                this.label.object3d.position.z=0
                
            }else{
                if(n==1){
                    this.label.object3d.position.z=d
                    this.label1.y = -h/2
                }
            }
        } 

        this.setXYZ=function(x,y,z){
            this.content3d.position.set(x,y,z)
        }     
    }

    set radius(v) {
        if(this._radius!=v){
            this._radius = v;   
            for (var i = 0; i < 12; i++) {
                this.array[i].radius = v;
            }       
        }       
    }   
    get radius() { return  this._radius;}


    set material(v) {        
        this._material = v;
        for (var i = 0; i < 12; i++) {
            this.array[i].material = v;
        }                 
    }   
    get material() { return  this._material;}


    set sah(v) {
        if(this._sah!=v){
            this._sah = v;            
            for (var i = 0; i < 12; i++) {
                this.array[i].sah = v;
            }   
        }       
    }   
    get sah() { return  this._sah;}    


    set fontSize(v) {
        if(this._fontSize!=v){
            this._fontSize = v;  
            this.label.fontSize=this._fontSize; 
            this.label1.fontSize=this._fontSize;
            this.label2.fontSize=this._fontSize;
        }       
    }   
    get fontSize() { return  this._fontSize;}
}




export class VALineeText  {
    constructor(par) { 
        this.type="VALineeText";
        var self=this;
        this.par=par;
        this._active=true;
        this.idArr=-1

        this._radius=this.par._radius;
        this._material=this.par._material;
        this._radPoint=this.par._radPoint;
        this._radPoint1=this.par._radPoint1;
        this._matPoint=this.par._matPoint
        this._matText=this.par._matText
        this._fontSize=this.par._fontSize
        this._otstup=this.par._otstup
        this._sah=this.par._sah;
        this._distans=100;
        this._boolW=false
        this._sr=6

        this.content3d = new THREE.Object3D(); 
        this.par.content3d.add(this.content3d);

        this.line=new VALine(this);

        this.mC=new THREE.Mesh(this.par.sphereBufferGeometry, this._matPoint)
        this.mC.scale.set(this._radius*this._sr,this._radius*this._sr,this._radius*this._sr)
        this.content3d.add(this.mC)

        this.mC1=new THREE.Mesh(this.par.sphereBufferGeometry, this._matPoint)
        this.mC1.scale.set(this._radius*this._sr,this._radius*this._sr,this._radius*this._sr)
        this.mC1.position.y=this._distans
        this.content3d.add(this.mC1)

        this.contText = new THREE.Object3D(); 
        this.content3d.add(this.contText)    

        this.label = new TLabel(this.contText,0,0," ");
        this.label.material=this._matText;
        this.label.fontSize=this._fontSize;
        this.label.object3d.scale.z=0.02
        this.contText.rotation.z=Math.PI/2        


        this.draw=function(){
            if(this._boolW==true){
                this.line.content3d.rotation.z= -Math.PI/2                
                this.mC1.position.x=this._distans;
                this.mC1.position.y=0;

                this.contText.position.x=this._distans/2;
                this.contText.position.y=0; 

                this.label.x=-this.label.width/2
                this.label.y=this._fontSize+this._otstup
                this.contText.rotation.z=0//Math.PI/2  
            }else{
                this.line.content3d.rotation.z=0;               
                this.mC1.position.x=0;   
                this.mC1.position.y=this._distans; 

                this.contText.position.x=-this._fontSize-this._otstup;
                this.contText.position.y=this._distans/2-this.label.width/2;

                this.label.x=0;
                this.label.y=0;
                this.contText.rotation.z=Math.PI/2  
            }            
            this.line.distans = this._distans;             
        }


        this.fun_rotationZ = function (v,v1) { 

        }
    }

     
    set active(v) {
        if(this._active!=v){
            this._active = v; 
            this.content3d.visible=this._active; 
        }       
    }   
    get active() { return  this._active;}

    
    set distans(v) {
        if(this._distans!=v){
            this._distans = v;   
            var r=Math.round(v)
            this.label.text=r+ "0мм" ;
            this.draw()            
        }       
    }   
    get distans() { return  this._distans;}


    set fontSize(v) {
        if(this._fontSize!=v){
            this._fontSize = v;  
            this.label.fontSize=this._fontSize; 
            this.draw()
        }       
    }   
    get fontSize() { return  this._fontSize;}


    set boolW(v) {
        if(this._boolW!=v){
            this._boolW = v;   
            this.draw()         
        }       
    }   
    get boolW() { return  this._boolW;}


    set radius(v) {
        if(this._radius!=v){
            this._radius = v;   
            this.line.radius = v;  
            this.mC1.scale.set(this._radius*this._sr,this._radius*this._sr,this._radius*this._sr)
            this.mC.scale.set(this._radius*this._sr,this._radius*this._sr,this._radius*this._sr)         
        }       
    }   
    get radius() { return  this._radius;}


    set material(v) {        
        this._material = v;
        this.line.material = v;               
    }   
    get material() { return  this._material;}


    set sah(v) {
        if(this._sah!=v){
            this._sah = v;            
            this.line.sah = v;  
        }       
    }   
    get sah() { return  this._sah;}
}



export class VALine  {
    constructor(par) { 
        this.type="VALine";
        var self=this;
        this.par=par
        this._radius=this.par._radius;
        this._material=this.par._material;
        this._radPoint=this.par._radPoint;
        this._radPoint1=this.par._radPoint1;
        this._matPoint=this.par._matPoint
        this._sah=this.par._sah;
        this._distans=100;
        this.content3d = new THREE.Object3D();         
        this.par.content3d.add(this.content3d);

       /* this.axisHelper = new THREE.AxesHelper(20)
        this.content3d.add(this.axisHelper);*/

        this.array=[]
        var sahMesh=0
        this.clear=function(){
            sahMesh=0
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible=false;
            }
        }

        this.getMesh=function(){
            var r
            if(this.array[sahMesh]!=undefined){
                r=this.array[sahMesh];
                r.visible=true;
                sahMesh++;
                return r
            }
            r= this.array[sahMesh]=new THREE.Mesh( this.par.par.cylinderGeometry, this._material);
            this.content3d.add(this.array[sahMesh]);
            r.scale.x=this._radius;
            r.scale.z=this._radius;
            sahMesh++;
            return r
        }


        var b,b1,s,s1,m,sasa
        this.draw=function(){
            this.clear()
            b=true;
            s=0;
            s1=this._sah;
            sasa=this._sah;            
            for (var i = 0; i < 20000; i++) {
                if(b==true){
                    m=this.getMesh()
                    m.scale.y=sasa
                    m.position.y=s+sasa/2;
                }
                b=!b
                s+=this._sah;
                s1+=this._sah;
                if(s1>this._distans){
                    break;
                }               
            }

            if(b==true){
                m=this.getMesh()
                sasa=this._distans-s;
                m.scale.y=sasa;
                m.position.y=s+sasa/2;
            }
        }
        this.draw()
    }


    set distans(v) {
        if(this._distans!=v){
            this._distans = v;   
            this.draw();            
        }       
    }   
    get distans() { return  this._distans;}


    set radius(v) {
        if(this._radius!=v){
            this._radius = v;   
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].scale.x=this._radius;
                this.array[i].scale.z=this._radius;
            }            
        }       
    }   
    get radius() { return  this._radius;}


    set material(v) {        
        this._material = v;             
    }   
    get material() { return  this._material;}


    set sah(v) {
        if(this._sah!=v){
            this._sah = v;            
            this.draw();
        }       
    }   
    get sah() { return  this._sah;}
}