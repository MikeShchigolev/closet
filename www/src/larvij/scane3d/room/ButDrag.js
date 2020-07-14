/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


управления кнопками
*/

import { DBKS,DBKSLine,BoxLXZ } from '../../scane2d/DBKS.js';

export class ButDrag  {
    constructor(par, fun) {         
        this.type="ButDrag";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.fun=fun;
        this.par=par;
        this.idArr=par.idArr
        this._active=false;
        this._actSten=par.active;
        this._width = par._width; 
        this._height = par._height;//высота
        this.content3d = new THREE.Object3D();  
        this.par.c3Glaf.add(this.content3d);
       
        this.c = new THREE.Object3D();  
        this.content3d.add(this.c);
        this.c1 = new THREE.Object3D();  
        this.content3d.add(this.c1);
        this.c2 = new THREE.Object3D();  
        this.content3d.add(this.c2);

        this.button
        this.button1
        this.button2

        this.cmp = new THREE.Object3D(); 
        this.content3d.add(this.cmp);
        this.meshPanel=new THREE.Mesh(tStyle.obj3dGron.gp, tStyle.obj3dGron.mp)
        this.cmp.add(this.meshPanel);
        this.meshPanel.rotation.x=Math.PI/2
        this.meshPanel.scale.x=this._width;   
        this.meshPanel.position.x=this._width/2;
        this.meshPanel.position.z=this._height/2;   
        this.meshPanel.scale.y=this._height;

        this.meshPanel.visible=!this._actSten;

        this.c1.position.x=this._width; 
        this.c2.position.x=this._width/2;  
        this.content3d.position.z=-this._height;

        this.input=new BoxLXZ(tStyle.obj3dGron.dCont,function(){            
            if(tStyle.obj3dGron.korektSten){
                tStyle.obj3dGron.korektSten.chengeLabel("drag",this.value/10, self.idArr)            
            }
            tStyle.obj3dGron.drag()
            self.fun("inputDrag",this.value) 
            trace("@@@@@@@@@@@@drag@@@@@@@",this.value);            
        })
        this.input.input.timeFun=null;
        this.input.funFocus=function(){
            if(this.actBig==false){               
                if(this.input.object.value!=this.value)this.input.object.value=this.value            
            }
        } 
        this.input.active=true;
        this.input.x=200;   
        this.input.y=200; 
        this.input.value = this._width; 


        this.pointPlus={x:0,y:0}
        var p;
        var ss;
        this.fun_rotationZ = function (v, v1) {
            ss=this.par.par.par.ss            
            p=this.par.getPP(this.c2)
            this.input.x=(p.x)/ss+this.pointPlus.x;
            this.input.y=(p.y)/ss+this.pointPlus.y;   
                   
        }



        this.bDin=undefined;
        this.pPlus=new THREE.Vector2()
        var sss
        this.funDMove = function (tip,par) {            
            self.pPlus.set(0,0)
            if(tip=="drag"){
                sss=1;  
                if(self.idArr==1)sss=2  

                tStyle.obj3dGron.korektSten.chengPThis(self.bDin.tip, par.x*sss+self.pPlus.x, -par.y*sss+self.pPlus.y,self.bDin.idArr)
                tStyle.obj3dGron.drag()
            }
            if(tip=="up"){                
                tStyle.obj3dGron.dragRoom(true);
            }            
        }  


        this.intPoz=-1;//-1 не включены сетны  0 первая выше чем вторая
        this.intPoz2=-1;//
        this.numSah=0
        this.start = function (b) {  
            this.intPoz=-1;
            this.numSah=0
            if(self.par.par.niz.bbb==false){
                if(self.par.par.array[0].width!=self.par.par.array[2].width){
                    this.intPoz=0;
                    if(self.par.par.array[0].width<self.par.par.array[2].width){
                        this.intPoz=1;
                    }
                    this.numSah=self.par.par.array[0].width-self.par.par.array[2].width
                }
            }
            self.bDin=b;
            tStyle.obj3dGron.korektSten._scale=1;
            tStyle.obj3dGron.animat.setPoint(b.e, b.e.target.parent,self.funDMove);
            tStyle.obj3dGron.korektSten.chengPThis("start",0,0,0)
        } 



        if(this.par.idArr==0){
            this.button=new But3D(this.c,function(){ 
                            
                self.start(this)
            },tStyle.obj3dGron.material2); 
            this.button.tip="p0"
            this.button.idArr=0

            this.button2=new But3D(this.c2,function(){  
                trace("@@@@@@@@@@@button@@@@@@@@@");               
                tStyle.obj3dGron.korektSten.cPTUP(self.idArr)
                tStyle.obj3dGron.drag()
                tStyle.obj3dGron.dragRoom(true)
                self.par.avAct=true
            },tStyle.obj3dGron.material3); 
            this.pointPlus.x=-80
            this.pointPlus.y=5
        }


        if(this.par.idArr==1){
            this.button=new But3D(this.c,function(){
                self.start(this)
            },tStyle.obj3dGron.material1);
            this.button.tip="p1"
            this.button.idArr=1

            this.button1=new But3D(this.c1,function(){
                self.start(this)
               
            },tStyle.obj3dGron.material1);
            this.button1.tip="p2"
            this.button1.idArr=1;

            this.pointPlus.x=0; 
            this.pointPlus.y=-20;   
        }
        
        if(this.par.idArr==2){
            this.button1=new But3D(this.c1,function(){
                
                self.start(this)
                
            },tStyle.obj3dGron.material2);
            this.button1.tip="p3"
            this.button1.idArr=2

            this.button2=new But3D(this.c2,function(){
                
                tStyle.obj3dGron.korektSten.cPTUP(self.idArr)
                tStyle.obj3dGron.drag()
                tStyle.obj3dGron.dragRoom(true)
                self.par.avAct=true
            },tStyle.obj3dGron.material3); 

            this.pointPlus.x=60
            this.pointPlus.y=5            
        }
        this.active=this.par.active;
    }


    set width(v) {
        if(this._width!=v){            
            this._width = v; 
            this.c1.position.x=v;  
            this.c2.position.x=v/2;
            this.input.value= this._width 
            this.meshPanel.scale.x=v;   
            this.meshPanel.position.x=v/2;           
        }       
    }   
    get width() { return  this._width;} 


    set height(v) {
        if(this._height!=v){            
            this._height = v; 
            this.content3d.position.z=-this._height;
            this.meshPanel.position.z=this._height/2;   
            this.meshPanel.scale.y=this._height;            
        }       
    }   
    get height() { return  this._height;}     


    set active(v) {
        if(this._active!=v){            
            this._active = v;
            this.cmp.visible= v;
            if(this.button)this.button.visible= v;
            if(this.button1)this.button1.visible= v;  
            if(this.button2)this.button2.visible= v;           
        }       
    }   
    get active() { return  this._active;} 


    set actSten(v) {
        if(this._actSten!=v){            
            this._actSten = v;
            if(this.button2){
                this.input.dCont.visible=v;
                this.meshPanel.visible=!v;
                if(v==false){
                    this.button2.material=tStyle.obj3dGron.material3                    
                }else{
                    this.button2.material=tStyle.obj3dGron.material4
                }
            }
        }       
    }   
    get actSten() { return  this._actSten;}
}



export class But3D  {
    constructor(c3d, fun, mat) {         
        this.type="But3D";        
        var self=this;
        this.fun=fun;
        this.content3d = new THREE.Object3D();
        c3d.add(this.content3d)
        var radius=15;
        var height=1;

        this._material  =  mat     
        this._visible=false;
        this.content3d.visible=this._visible

        var cylinder = new THREE.Mesh( tStyle.obj3dGron.geometry, tStyle.obj3dGron.material );
        cylinder.rotation.x=Math.PI/2
        cylinder.scale.set(radius,height,radius)
        this.content3d.add(cylinder);

        this.cylinder1 = new THREE.Mesh( tStyle.obj3dGron.geometry1, this._material );
        this.cylinder1.position.z=-height/2
        this.cylinder1.rotation.x=Math.PI
        this.cylinder1.scale.set(radius,radius,1)
        this.content3d.add(this.cylinder1);

        this.cylinder2 = new THREE.Mesh( tStyle.obj3dGron.geometry1, this._material );
        this.cylinder2.position.z=height/2
        this.cylinder2.scale.set(radius,radius,1)
        this.content3d.add(this.cylinder2);


        this.isC3d=function(c){
            if(!c)return false;
            if(!c.uuid)return false;
            //trace(c.uuid)
            if(c.uuid==this.content3d.uuid)return true;

            if(c.parent){
                if(this.isC3d(c.parent)==true)return true;
            } 
            return false;
        }        

        this.e  
        tStyle.obj3dGron.visi3D.addChildMouse(this.content3d)
        
        tStyle.obj3dGron.visi3D.addEvent("out", function(e){             
            if(self._visible==false)return  
            if(!e)return                 
            if(self.isC3d(e.target)==false)return 
            window.document.body.style.cursor = "auto";
        });

        tStyle.obj3dGron.visi3D.addEvent("over", function(e){
            if(self._visible==false)return
            if(!e)return     
            if(self.isC3d(e.target)==false)return 
            window.document.body.style.cursor = "pointer";              
        });        
        tStyle.obj3dGron.visi3D.addEvent("down", function(e){
            if(self._visible==false)return
            if(!e)return
                 
            if(self.isC3d(e.target)==false)return 
            trace(e)      
            self.e = e               
            self.fun() 
            e.target=null  
            
        });   

    }
    set material(v) {
        if(this._material!=v){            
            this._material = v; 
            this.cylinder1.material=v;
            this.cylinder2.material=v;     
        }       
    }   
    get material() { return  this._material;} 


    set visible(v) {
        if(this._visible!=v){            
            this._visible = v; 
            this.content3d.visible=this._visible           
        }       
    }   
    get visible() { return  this._visible;}      
}
