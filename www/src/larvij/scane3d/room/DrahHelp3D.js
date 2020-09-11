/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


Выделяшка активного обьекта
*/


export class DrahHelp3D  {
    constructor(par,dCont, fun) {         
        this.type="DrahHelp3D";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.par=par;
        this.fun=fun;
        this._active=false;

        this.array=[];

        this.dCont=new DCont(dCont);

        this.dCont.div.style.pointerEvents="none";
        //this.p=new DPanel(this.dCont,300,300)
        //this.p.width=200;
        //this.p.height=200;



        global.drahHelp3D =this
        
        this.set=function(blok) {
            
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].testBlok(blok)==true){
                    this.array[i].active=true
                    this.active = true;
                    return
                }
            }

            let b=undefined
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active==false){
                    b=this.array[i]
                    break
                }
            }


            if(b==undefined){
                b=new BoxDH3D(this, this.dCont)
                this.array.push(b)
            }

            b.set(blok);            
            this.active = true;
        }

        this.clear=function(blok) {
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].active=false;
            }
        }

        this.scalXZ=1
        this.upDate=function() {
            if(this._active==false)return;            
            this.scalXZ=0.5+0.6*(1-visi3D.zume/1200)

            for (var i = 0; i < this.array.length; i++) {
                this.array[i].upDate()
            }            
        }


        this.sizeWindow = function(w,h,s){                
            this.dCont.scale=1/s;
        } 

        var vectorScreen = new THREE.Vector3(0,0,0); 
        var axesPlacement
        this.posi=new THREE.Vector3(0,0,0);
        var vec

        this.getPP=function(c3){ 
            vec=c3.localToWorld(this.posi.clone())            
            this.toScreenXY(vec);


            return vectorScreen
        }
         
        this.toScreenXY = function(vector3) {
            vector3.project(visi3D.camera); 

            vectorScreen.x = Math.round( (   vector3.x + 1 ) * visi3D._width  / 2 );
            vectorScreen.y = Math.round( ( - vector3.y + 1 ) * visi3D._height / 2 );
            vectorScreen.z =vector3.z;





            return vectorScreen;
        }


        this.mouseup = function(e) {            
            self.active=false;
        }

        this.startD = function() {  
            setTimeout(function() {
               document.body.addEventListener("mouseup",self.mouseup) 
            }, 100);            
        }
    }

    set active(value) {
        if(this._active!=value){
            this._active= value;
            if(this._active==true){
               // this.startD()
                
            }else{
               // document.body.removeEventListener("mouseup",this.mouseup)
                this.clear()
            }                   
        }
    }    
    get active() { return  this._active;}
}


export class BoxDH3D  {
    constructor(par, dCont, fun) {         
        this.type="BoxDH3D";
        var self=this;

        this.par=par;
        this.fun=fun;

        this.blok=undefined

        this.dCont=new DCont(dCont);


        this.dHalp=new DHelp(this.dCont, 0,0,"инфо")
        this.dHalp.picWidth=18
        this.dHalp.plusLabelX=5
        this.dHalp.otstup=1
        this.dHalp.width=100
        this.dHalp.fontSize=16
        this.dHalp.colorText="#000000"
        this.dHalp.fontFamily="SFUIDisplay-Light"
        this.dHalp.boolNiz=true;
        this.dHalp.color="#ffda00";
        this.dHalp.borderRadius=10;
        this.dHalp.label.textAlign="center";


        this.testBlok=function(blok) {
            if(this.blok){
                if(blok.idArr==this.blok.idArr)return true;
            }
            return false;
        }




        this.set=function(blok) {            
            this.blok=blok;
            this.active=true;

            this.dHalp.width=this.blok.textError.length*9.5;
            this.dHalp.text=this.blok.textError;
            
        }

        var vect=new THREE.Vector3()
        var z=0
        this.upDate=function() {
            if(this._active==false)return;

            if(this.blok._parent==undefined){
                this.dCont.visible=false;
                return;    
            }
            if(this.blok.c3dNa.visible==false){
                this.dCont.visible=false;
                return;   
            }
            if(this.blok.bvColor==true){
                this.active=false
                return
            }

            vect = this.par.getPP(this.blok.content3d) 
            z= Math.round((1-vect.z)*1000)/1000

            this.dCont.visible=true;  
            this.dCont.x=vect.x;
            this.dCont.y=vect.y;
            this.dHalp.scale=this.par.scalXZ
        }
    }



    set active(value) {
        if(this._active!=value){
            this._active= value;
            if(this._active==false){
                this.dCont.visible = false;                
            }
                               
        }
    }    
    get active() { return  this._active;}
}