
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.



хронитель дерева
*/


import { Room } from './room/Room.js';
import { TudaSuda } from './TudaSuda.js';


export class Scane3d  {
  	constructor(glaf,fun) {  		
  		this.type="Scane3d";
  		var self=this;
        this.par=glaf
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this._bactive=true;//драгим сцену

  		//this._sahMenu=0
        this.visi3D=glaf.visi3D
  		this.content3d = new THREE.Object3D();       
  		glaf.content3d.add(this.content3d);
        this.dCont=new DCont(this.par.dCont);


        this.animatS3D=new AnimatS3D(this) //Хранитель матов для кнопок и анимашки
        this.tudaSuda=new TudaSuda(this, function(type, param){ //сохроняшка действий           
            fun(type, param);
        }) 
        this.room=new Room(this, function(type, param){ //основа 3д контента и пол           
            fun(type, param);
        })
        this.dubag=new Dubag(this, function(type, param){ //дебаги           
            
        })
  		this.foto3dLarvij=new Foto3dLarvij(this);//вото сцены
        

        /*
        this.startDebag=function(){
              
        }*/

        this.unDate=function(){
            if(glaf.scane2d.boolMenuActiv==false)tStyle.obj3dGron.drag()
            
        }

        this.ss=1
  		this.sizeWindow = function(w,h,s){ 
            this.ss =s;		
  		    this.room.sizeWindow(w,h); 
            this.animatS3D.sizeWindow(w,h,s);           				
  		}
  	}

    set bactive(value) {
        if(this._bactive!=value){
            this._bactive= value;
            this.animatS3D.active=value;                       
        }
    }    
    get bactive() { return  this._bactive;}
}



//Хранитель матов для кнопок и анимашки
export class AnimatS3D  {
    constructor(par) { 
        this.par=par
        var self=this;
        this._active=true;//драгим сцену
        this.num=1;
        this.dCont=new DCont(this.par.dCont);
        this.array=undefined;//this.par.room.array;
        this.room

        var obj={}
        obj.geometry= new THREE.CylinderBufferGeometry( 1, 1, 1, 32,5,true );
        obj.geometry1 = new THREE.CircleBufferGeometry( 1, 32);        
        obj.material = new THREE.MeshBasicMaterial({color:0xffffff,transparent:true } );

        obj.texture1 = new THREE.TextureLoader().load('resources/image/p1.png');            
        obj.material1 = new THREE.MeshBasicMaterial({color:0xffffff, map: obj.texture1,transparent:true});
        
        obj.texture2 = new THREE.TextureLoader().load('resources/image/p2.png');            
        obj.material2 = new THREE.MeshBasicMaterial({color:0xffffff, map: obj.texture2,transparent:true});

        obj.texture3 = new THREE.TextureLoader().load('resources/image/p3.png');            
        obj.material3 = new THREE.MeshBasicMaterial({color:0xffffff, map: obj.texture3,transparent:true});

        obj.texture4 = new THREE.TextureLoader().load('resources/image/p4.png');            
        obj.material4 = new THREE.MeshBasicMaterial({color:0xffffff, map: obj.texture4,transparent:true});

        obj.gp= new THREE.PlaneBufferGeometry( 1, 1);
        obj.mp = new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, side:THREE.DoubleSide});

        obj.dCont=this.dCont;    
        obj.visi3D= this.par.par.visi3D;

        obj.animat=this;            
        tStyle.obj3dGron=obj;

        tStyle.obj3dGron.drag=function(){
            for (var i = 0; i < self.room.array.length; i++) {
                self.room.array[i].butDrag.fun_rotationZ()
            } 
            tStyle.obj3dGron.visi3D.intRend = 1;
            setTimeout(function() {
                for (var i = 0; i < self.room.array.length; i++) {
                    self.room.array[i].butDrag.fun_rotationZ()
                } 
                tStyle.obj3dGron.visi3D.intRend = 1;
            }, 50); 
            setTimeout(function() {
                for (var i = 0; i < self.room.array.length; i++) {
                    self.room.array[i].butDrag.fun_rotationZ()
                } 
                tStyle.obj3dGron.visi3D.intRend = 1;
            }, 150);
        }

        this.tween1 = new TWEEN.Tween(this.par.content3d.position);
        this.tween1.onUpdate(function(){
            tStyle.obj3dGron.visi3D.intRend = 1;            
        })

        this.dragRoom=function(b,t){
            if(t==undefined)t=0
            var y=0;
            if(b==true){
                if(self.par.room.niz.bbb==true){
                    y=-self.par.room.niz.hh2/2;
                }  
            }            
            self.tween1.stop();
            self.tween1.to({y:y},t).start();  
        }
        tStyle.obj3dGron.dragRoom=this.dragRoom;

        this.tween = new TWEEN.Tween(this);
        this.tween.onUpdate(function(){
            tStyle.obj3dGron.visi3D.intRend = 1;
            obj.material.opacity=self.num;
            obj.material1.opacity=self.num;
            obj.material2.opacity=self.num;
            obj.material3.opacity=self.num;
            obj.mp.opacity=self.num*0.3;

            tStyle.obj3dGron.dCont.alpha=self.num;

            tStyle.obj3dGron.visi3D.xVerh = (self.posOld.x*(1-self.num) + self.posNew.x*(self.num));
            tStyle.obj3dGron.visi3D.yVerh = (self.posOld.y*(1-self.num) + self.posNew.y*(self.num));
            tStyle.obj3dGron.visi3D.zVerh = (self.posOld.z*(1-self.num) + self.posNew.z*(self.num));
            tStyle.obj3dGron.visi3D.rotationX = (self.posOld.rx*(1-self.num) + self.posNew.rx*(self.num));
            tStyle.obj3dGron.visi3D.rotationZ = (self.posOld.rz*(1-self.num) + self.posNew.rz*(self.num));
            tStyle.obj3dGron.visi3D.zume = (self.posOld.zume*(1-self.num) + self.posNew.zume*(self.num));

            for (var i = 0; i < this.room.array.length; i++) {
                this.room.array[i].butDrag.fun_rotationZ()
            }
        })

        this.tween.onComplete(function(){
            tStyle.obj3dGron.visi3D.intRend = 1;
            if(self._active==true){
                self.vS(false);
            }
        })

        this.posOld={x:0,y:0,z:0,rx:1,rz:0,zume:1000}
        this.posNew={x:0,y:0,z:0,rx:0,rz:0,zume:1500} 


        this.dragActiv=function(t){
            if(t==undefined)t=500
            this.vS(true);
            if(this._active==false){              
                this.testZZ()//округляем до диопозона ПИ
                this.posOld.x=tStyle.obj3dGron.visi3D.xVerh;
                this.posOld.y=tStyle.obj3dGron.visi3D.yVerh;
                this.posOld.z=tStyle.obj3dGron.visi3D.zVerh;
                this.posOld.rx=tStyle.obj3dGron.visi3D.rotationX;
                this.posOld.rz=tStyle.obj3dGron.visi3D.rotationZ;
                this.posOld.zume=tStyle.obj3dGron.visi3D.zume;

                this.num=0;                 
                this.tween.to({num:1},t).start();                
                tStyle.obj3dGron.visi3D.position3d.pause=true;
                this.par.par.menuDiv.menuActiv(true, 500);
                self.par.room.niz.bPtioriti=true
                this.dragRoom(true)//, 500);
            }else{
                this.num=1; 
                this.tween.to({num:0},t).start();   
                tStyle.obj3dGron.visi3D.position3d.pause=false;
                this.par.par.menuDiv.menuActiv(false, 500);
                self.par.room.niz.bPtioriti=false
                this.dragRoom(false)//, 500);
            }   
        }


        var pM=-Math.PI
        var pP=Math.PI 
        this.testZZ=function(){
            if(tStyle.obj3dGron.visi3D._rotationZ>=pM &&tStyle.obj3dGron.visi3D._rotationZ<=pP){
                return
            }
            if(tStyle.obj3dGron.visi3D._rotationZ<pM){
                tStyle.obj3dGron.visi3D.rotationZ+=Math.PI*2
                this.testZZ()
                return
            }

            if(tStyle.obj3dGron.visi3D._rotationZ>pP){
                tStyle.obj3dGron.visi3D.rotationZ-=Math.PI*2
                this.testZZ()
                return
            }
        }

        this.boolS=undefined;
        this.vS=function(b){
            this.boolS=b;
            tStyle.obj3dGron.dCont.visible=b;
            if(this.room==undefined)return
            for (var i = 0; i < this.room.array.length; i++) {
                this.room.array[i].butDrag.active=b
            }
        }

        this.setRoom=function(room,scane2d) {            
            this.room=room;
            this.scane2d=scane2d;
            tStyle.obj3dGron.korektSten=scane2d.stens.korektSten;

            if(this.boolS)this.vS(this.boolS)

            setTimeout(function() {

                self.par.bactive=false

            }, 10);
        }


        this.wh=10000
        
        this.mesh=new THREE.Mesh(new THREE.PlaneBufferGeometry( this.wh,this.wh ),new THREE.MeshBasicMaterial())
        this.mesh.rotation.x=-Math.PI/2
        this.mesh.name="sykaXZ"
        self.mesh.layers.set(31); 
        this.dF;
        this.pointStart=new THREE.Vector3()

        this.setPoint = function(e,c3d,f){                      
            if(e==undefined)return
            this.dF= f;
            this.pointStart.set(e.point.x,e.point.y,e.point.z);
            this.startP(this.pointStart,c3d) 
        }

        this.boolDrag=false
        this.startP = function(p,c3d){
            if(this.boolDrag==true)return

            this.boolDrag=true    
            tStyle.obj3dGron.visi3D.event3DArr.poiskName=this.mesh.name;
            tStyle.obj3dGron.visi3D.scene.add(this.mesh);
            this.mesh.position.set(p.x,p.y,p.z);
            tStyle.obj3dGron.visi3D.addChildMouse(this.mesh);
            if (dcmParam.mobile==false){
                document.addEventListener("mouseup", self.mouseup);                
            }
            else{
                document.addEventListener("touchend", self.mouseup);
            } 
            trace("<<<<<<<<<<<<<<<<<mouseup")  
            tStyle.obj3dGron.visi3D.intRend=1;
            tStyle.obj3dGron.visi3D.addEvent("move", self.move);
        }

        var rv=new THREE.Vector3()
        self.move = function (e) {
            if(e){
                if(e.target)if(e.target.name==self.mesh.name)
                if(e.uv){
                    rv.x=(e.uv.x-0.5)*(self.wh)
                    rv.y=(e.uv.y-0.5)*(self.wh)
                    if(self.dF)self.dF("drag",rv);
                }
            }            
        }


        this.mouseup = function (e) { 
            trace("mouseup")           
            self.boolDrag=false; 
            if (dcmParam.mobile==false){
                document.removeEventListener("mouseup", self.mouseup);
            }
            else {
                document.removeEventListener("touchend", self.mouseup);
            }            
            tStyle.obj3dGron.visi3D.removeEvent("move", self.move);
            tStyle.obj3dGron.visi3D.event3DArr.poiskName="xzPoisk"
            tStyle.obj3dGron.visi3D.scene.remove(self.mesh);
            tStyle.obj3dGron.visi3D.removeChildMouse(self.mesh);
            tStyle.obj3dGron.drag();
            if(self.dF)self.dF("up"); 
            tudaSuda.saveMod()            
        }


        this.sizeWindow = function(w,h,s){ 
            if(this._active==false){
                tStyle.obj3dGron.drag()
            }
        }
    }


    set active(value) {
        if(this._active!=value){
            this._active= value;
            this.dragActiv()        
        }
    }    
    get active() { return  this._active;} 
}






//Дебагер
export class Dubag  {
    constructor(par,fun) { 
        this.par=par
        var self=this;
        this._active=false;
        this.dCont=new DCont();
        this.saveModel=undefined;
        this.localStorage=this.par.par.par.localStorage
        this.pO=undefined;
        

        function PrintElem(elem) {
            Popup($(elem).html());
        }
        function Popup(data){
            var mywindow = window.open('xz', 'xz', 'height=600,width=800');
            mywindow.document.write('<html><head>');
            mywindow.document.write(data);
            mywindow.document.write('</body></html>');

            mywindow.document.close(); 
            mywindow.focus(); 
            mywindow.print();
            mywindow.close(); 
            return true;
        }


        this.init=function(){
            if(this.saveModel!=undefined)return
            this.saveModel=new SaveModel(this, function(type, param){            
                
            })
            this.boolCTRL=false;


            this.pO=new DParamObject(this.dCont, 950,0)

            this.color=new DColor(this.dCont,800,0,"#ffffff",function(){
                self.par.room.color=this.value;
            })
            this.color.width=150;

            this.but=new DButton(this.dCont,700,0,"testFilt",function(){
                self.par.visi3D.efect.renderPass=true;
                self.par.visi3D.efect.outlinePass=true;
                self.par.visi3D.efect.shaderPass=true;
                self.pO.addObject(self.par.visi3D.efect.array[3].effect, true)
                self.par.visi3D.render()
            })

            this.but=new DButton(this.dCont,500,50,"тест печать",function(){
                self.par.par.menuDiv.mPrint.start(0,function(div){
                    PrintElem(div)
                });
            })

            this.but=new DButton(this.dCont,500,100,"тест печать2",function(){
                self.par.par.menuDiv.mPrint.start(1,function(doc){
                    doc.output('dataurlnewwindow');                 
                });
            })

            new DButton(this.dCont,300,50,">",function(){
                if(self.localStorage.object.positionVisi3d)self.par.visi3D.setObj(self.localStorage.object.positionVisi3d)
            }).width=30           
            new DButton(this.dCont,331,50,"save",function(){
                self.localStorage.object.positionVisi3d=self.par.visi3D.getObj();
                self.localStorage.save()
            }).width=40



            this.but=new DButton(this.dCont,500,130,"arrBMP",function(){
                var a=self.par.foto3dLarvij.get("arrayVisi",1500,1500,"image/jpeg");
                var wh=600
                for (var i = 0; i < a.length; i++) {
                    var bb=new DButton(self.dCont,200+i*wh,250,"")
                    bb.width=bb.height=wh
                    bb.loadImeg(a[i])
                }                
            })

            this.but=new DButton(this.dCont,400,50,"тест pdf",function(){                
                self.par.par.menuDiv.mPrint.start(1,function(doc){
                    doc.save("test.pdf");
                });
            })

            this.but=new DButton(this.dCont,700,86,"help Очистка",function(){
                self.localStorage.object.help=0;
                self.localStorage.object.help2=0;
                self.localStorage.save()
            })

            this.but=new DButton(this.dCont,500,2,">>>>>>",function(){
                self.par.par.menuDiv.menuActiv(true, self.slid.value);
            })
            this.but=new DButton(this.dCont,600,2,"<<<<<",function(){
                self.par.par.menuDiv.menuActiv(false, self.slid.value);
            })

            this.slid=new DSliderBig(this.dCont, 300,2, function(){
                self.localStorage.object.sts=this.value;
                self.localStorage.save()
            }, "размер текста 3D", 0, 18);
            this.slid.value=500;
            this.slid.width=200;

            this.checkBox=new DCheckBox(this.dCont,800,30,"visiMark",function(){
                self.par.room.visiMark=this.value;               
            })
            this.checkBox.value=self.par.room.visiMark;


            this.checkBox=new DCheckBox(this.dCont,800,60,"stopDrag",function(){
                self.par.bactive=this.value;               
            })
            this.checkBox.value=self.par.bactive;

            this.checkBox=new DCheckBox(this.dCont,800,90,"lmActive",function(){
                self.par.room.lmActive=this.value;               
            })
            this.checkBox.value=self.par.room.lmActive;
        }


        this.setBlok=function(blok){
            if(this._active==false)return            
            var o=blok.getObj();
            var s=JSON.stringify(o);
            var a=s.split('"');
            var ss=''
            for (var i = 0; i < a.length; i++) {
                if(i==a.length-1)ss+=a[i];
                else ss+=a[i]+"|";
            }
            this.saveModel.textArae.text=self.saveModel.textArae.text=ss;//JSON.stringify(o); 
        }

        this.keydown=function(e){
            if(event.keyCode==17)self.boolCTRL=true

            if(event.keyCode==81&&self.boolCTRL)  {
                self.active =  !self.active
                self.localStorage.object.dubag=self.active;
                self.localStorage.save();
            }            
        }
        this.keyup=function(e){
            if(event.keyCode==17)self.boolCTRL=false
        }
        window.addEventListener( 'keydown', this.keydown );    
        window.addEventListener( 'keyup', this.keyup );  
    }

    set active(value) {
        if(this._active!=value){
            this._active = value;
            if(this._active==true) {
                this.init();
                this.par.dCont.add(this.dCont)
            }else{
                this.par.dCont.remove(this.dCont)
            } 
            this.par.par.menuDiv.menuSave.otprovlashka.window.visible=this._active
            
        }
    }
    get active() { return  this._active;}
}



export class SaveModel  {
    constructor(par,fun) { 
        this.par=par
        var self=this;

        this.json ='{"color":"#ffffff","children":[{"type":"Sten","width":300,"height":275,"active":false,"children":[]},{"type":"Sten","width":300,"height":275,"active":true,"children":[{"type":"BPieceTop","id":14,"x":72.94569430772117,"y":186.2014636180158,"children":[{"type":"BPieceObject","id":39,"x":0,"y":1.4255789905515641,"intSah":0,"intSah1":0,"polka":false,"children":[],"idColor":"m_8"}]}]},{"type":"Sten","width":300,"height":275,"active":false,"children":[]}]}'
        
        this.setModel=function(strObj){
            trace(">>>>>>=@>>>>",this.par.par.par)
            var o = JSON.parse(strObj);
            self.textArae.text=strObj;             
            self.setObj(o);                
            self.par.par.par.menuDiv.menuActiv(false,500)  
        }        

        this.window=new DWindow(this.par.dCont,1150,0,"SaveModel");
        this.window.width=200;
        this.window.height=150;        

        this.bat1=new DButton(this.window.content, 0, 115, "saveLS", function(){
            var oo=self.getObj()            
            var s=JSON.stringify(oo);            
            self.par.localStorage.object.model=s
            self.par.localStorage.save()
        })
        this.bat2=new DButton(this.window.content, 100, 115, "clearLS", function(){                   
            self.par.localStorage.object.model=null
            self.par.localStorage.save()
        })

        this.batGET=new DButton(this.window.content, 0, 0, "get", function(){
            var oo=self.getObj()            
            var s=JSON.stringify(oo);            
            self.textArae.text=s;
        })
        this.batSET=new DButton(this.window.content, 100, 0, "set", function(){
            var o= JSON.parse(self.textArae.text);  
            self.setObj(o);
        })
        this.textArae=new DTextArea(this.window.content, 0, 32, this.json)
        this.textArae.height=this.window.height-32-32;
        this.textArae.width=this.window.width;        

        this.setObj=function(o){            
            this.par.par.room.setObj(o);
        }
        this.getObj=function(){
            return this.par.par.room.getObj()
        }
    }
}



export class Foto3dLarvij  {
    constructor(par,fun) { 
        this.par=par
        var self=this;
        var aGlaf=this.par.par;
        var room=this.par.room;
        var wOld, hOld,x,z,zume,visOld;
        this.tip="image/png"
        this.get=function(type, w, h, tip){
            if(tip==undefined)this.tip="image/png"
            else this.tip=tip
            var r=null;
            wOld=aGlaf.visi3D.width;
            hOld=aGlaf.visi3D.height;

            x=aGlaf.visi3D.rotationX;
            z=aGlaf.visi3D.rotationZ;
            zume=aGlaf.visi3D.zume;

            if(aGlaf.visi3D.utility.sky.cont3d!=undefined){
                visOld=aGlaf.visi3D.utility.sky.cont3d.visible
            }


            if(type=="base") r=this.getBase(w, h);
            if(type=="arrayVisi") r=this.getArrayVisi(w, h);
            if(type=="original") r=this.getOriginal();

            aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,wOld,hOld);
            aGlaf.visi3D.rotationX=x;
            aGlaf.visi3D.rotationZ=z;
            aGlaf.visi3D.zume=zume;

            if(aGlaf.visi3D.utility.sky.cont3d!=undefined){
                aGlaf.visi3D.utility.sky.cont3d.visible=visOld;
            }
            aGlaf.visi3D.render();
            return r;
        }


        this.getOriginal=function(){
            aGlaf.visi3D.render();
            var r = aGlaf.visi3D.renderer.domElement.toDataURL(this.tip);
            return r;
        }


        this.getBase=function( w, h){
            aGlaf.visi3D.rotationX=1.34;
            aGlaf.visi3D.rotationZ=-0.1;
            aGlaf.visi3D.utility.focus.active=true;
            aGlaf.visi3D.utility.focus.targetObject=aGlaf.content3d; 
            aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,w,h);           
            aGlaf.visi3D.render();
            this.par.room.fun_rotationZ(aGlaf.visi3D._rotationZ, aGlaf.visi3D._rotationX);                       
            aGlaf.visi3D.render();
            var r = aGlaf.visi3D.renderer.domElement.toDataURL(this.tip);
            aGlaf.visi3D.utility.focus.active=false;







            return r;
        } 



        


        this.getOriginalWeb=function(f){

            trace("getOriginalWeb")
            var r=null;
            wOld=aGlaf.visi3D.width;
            hOld=aGlaf.visi3D.height;

            x=aGlaf.visi3D.rotationX;
            z=aGlaf.visi3D.rotationZ;
            zume=aGlaf.visi3D.zume;

            if(aGlaf.visi3D.utility.sky.cont3d!=undefined){
                visOld=aGlaf.visi3D.utility.sky.cont3d.visible
            }

            aGlaf.visi3D.render();
            var r = aGlaf.visi3D.renderer.domElement.toDataURL("image/png");


            aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,wOld,hOld);
            aGlaf.visi3D.rotationX=x;
            aGlaf.visi3D.rotationZ=z;
            aGlaf.visi3D.zume=zume;

            if(aGlaf.visi3D.utility.sky.cont3d!=undefined){
                aGlaf.visi3D.utility.sky.cont3d.visible=visOld;
            }
            aGlaf.visi3D.render();

            if(aGlaf.webCamera.active==false){
                f(r)
            }else{


                let img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = function () {
                    let  canvas = document.createElement('canvas'); // канвас для картинки
                    let context = canvas.getContext('2d'); // контекст картинки
                    canvas.width=this.width;
                    canvas.height=this.height;

                    let aW=aGlaf.webCamera.video.style.width.split("px");
                    let aH=aGlaf.webCamera.video.style.height.split("px");
                    let aX=aGlaf.webCamera.video.style.left.split("px");
                    let aY=aGlaf.webCamera.video.style.top.split("px");                    
                    context.drawImage(aGlaf.webCamera.video, aX[0]*1, aY[0]*1, aW[0]*1, aH[0]*1); 
                    context.drawImage(this, 0, 0, wOld, hOld); 
                    f(canvas.toDataURL("image/png"));
                };
                img.src = r;
            }

            
        }






        this.getArrayVisi=function( w, h){
            var a=[]            
            var cc=aGlaf.visi3D.utility.sky.color;
            aGlaf.visi3D.utility.sky.color=0xffffff
            aGlaf.visi3D.utility.focus.active=true;
            aGlaf.visi3D.utility.focus.targetObject=aGlaf.content3d; 
            room.niz.mesh.visible=false;
            room.niz.m.visible=false
            room.niz.c3dl.visible=false
            var fov=aGlaf.visi3D.camera.fov
            aGlaf.visi3D.camera.fov = 15;
            aGlaf.visi3D.camera.updateProjectionMatrix();
          
            this.par.room.lmActive=true
            aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,w,h);
            for (var i = 0; i < room.array.length; i++) {
                room.array[i].krai3D.content3d.visible=false;
                room.array[i].krai3D1.content3d.visible=false;
            } 

            //0
            if(room.array[0].active==true){
                aGlaf.visi3D.rotationX=Math.PI/2//+0.5;
                aGlaf.visi3D.rotationZ=-Math.PI/2; 
                this.content3d;
                this.visiSten(false);
                room.array[0].contPoz3d.visible=true;
                aGlaf.visi3D.render();
                this.par.room.fun_rotationZ(aGlaf.visi3D._rotationZ, aGlaf.visi3D._rotationX);                       
                aGlaf.visi3D.render();
                a.push(aGlaf.visi3D.renderer.domElement.toDataURL(this.tip))
                this.visiSten(true)                
            }


            if(room.array[1].active==true){
                aGlaf.visi3D.rotationX=Math.PI/2//+0.5;
                aGlaf.visi3D.rotationZ=0;
               this.content3d;
                this.visiSten(false);
                room.array[1].contPoz3d.visible=true;
                aGlaf.visi3D.render();
                this.par.room.fun_rotationZ(aGlaf.visi3D._rotationZ, aGlaf.visi3D._rotationX);                       
                aGlaf.visi3D.render();
                a.push(aGlaf.visi3D.renderer.domElement.toDataURL(this.tip))
                this.visiSten(true)                
            }

            if(room.array[2].active==true){
                aGlaf.visi3D.rotationX=Math.PI/2//+0.5;
                aGlaf.visi3D.rotationZ=Math.PI/2;
                this.content3d;
                this.visiSten(false);
                room.array[2].contPoz3d.visible=true;
                aGlaf.visi3D.render();
                this.par.room.fun_rotationZ(aGlaf.visi3D._rotationZ, aGlaf.visi3D._rotationX);                       
                aGlaf.visi3D.render();
                a.push(aGlaf.visi3D.renderer.domElement.toDataURL(this.tip))
                this.visiSten(true)                
            }


            for (var i = 0; i < room.array.length; i++) {
                room.array[i].krai3D.content3d.visible=true;
                room.array[i].krai3D1.content3d.visible=true;
            }

            room.niz.mesh.visible=true
            aGlaf.visi3D.utility.sky.color=cc
            room.niz.mesh.visible=true;
            room.niz.m.visible=true;
            room.niz.c3dl.visible=true;            
            this.par.room.lmActive=false 
            aGlaf.visi3D.camera.fov = fov;
            aGlaf.visi3D.camera.updateProjectionMatrix();
            aGlaf.visi3D.utility.focus.active=false;
            return a;
        }

        this.visiSten=function(b){
            if(b==true){
                for (var i = 0; i < room.array.length; i++) {
                    room.array[i].contPoz3d.visible=room.array[i].active;
                }
            }else{
                for (var i = 0; i < room.array.length; i++) {
                    room.array[i].contPoz3d.visible=false;
                }
            }
        }

    }
}