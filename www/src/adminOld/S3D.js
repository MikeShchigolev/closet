


function S3D(main) { 
	
	this.type="S3D";
	var self=this;
    this.par=main
    this.object=undefined


    this.content3d = new THREE.Object3D();
    main.content3d.add(this.content3d);
    self.content3d.rotation.x=Math.PI;




    this.sMod = new SMod(this);
    this.sHelp = new SHelp(this);

    this.sMaterial = new SMaterial(this);

    this.geterMat = new GeterMat(this.par.objectBase.materials);

    this.loadMod=function(obj){
        this.sMod.content3d.visible=true
        this.sMaterial.content3d.visible=false   
        this.object=obj;
        this.sMod.loadMod(obj);
        this.sHelp.loadMod(obj);


    }

    this.openMat=function(mat){
        this.sMod.content3d.visible=false
        this.sMaterial.content3d.visible=true      
        this.sMaterial.openMat(mat)
    }

    this.redrag=function(){
        aGlaf.visi3D.intRend=1;
    }

    this.debagOk=function(b){
       
        
        this.par.visi3D.utility.debug = b; 
        this.par.visi3D.utility.plane.visible=b;
        if(this.par.visi3D.utility.sky.cont3d)this.par.visi3D.utility.sky.cont3d.visible=b;       
        if(b==true){

        }
    }
}  



function SMaterial(s3d) {
    var self=this; 
    this.par=s3d; 
    this.type="SHelp";
    var self=this;
    this.object=undefined;

    this.content3d = new THREE.Object3D();
    this.mesh=new THREE.Mesh(new THREE.SphereGeometry( 100, 32, 32 ));
    this.content3d.add(this.mesh); 

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;


    this.mesh1=new THREE.Mesh(new THREE.BoxBufferGeometry( 200, 100, 200 ));
    this.mesh1.position.x=250
    this.content3d.add(this.mesh1); 

    this.mesh1.castShadow = true;
    this.mesh1.receiveShadow = true;



    this.openMat=function(mat){         
        this.mesh.material=mat;
        this.mesh1.material=mat;
        if(this.content3d.parent!=undefined) this.content3d.parent.remove(this.content3d);
        this.par.content3d.add(this.content3d); 
        this.content3d.rotation.x=Math.PI/2
    }

    var w, h,x,z,zume;
    this.foto=function(wh){
        var r="";
        this.par.debagOk(false);
        w=aGlaf.visi3D.width;
        h=aGlaf.visi3D.height;

        x=aGlaf.visi3D.rotationX;
        z=aGlaf.visi3D.rotationZ;
        zume=aGlaf.visi3D.zume;

        
        aGlaf.visi3D.rotationX=1.12
        aGlaf.visi3D.rotationZ=-0.1
        aGlaf.visi3D.zume=270
        aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,wh,wh);

        aGlaf.visi3D.render();
        r = aGlaf.visi3D.renderer.domElement.toDataURL();

        aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,w,h);

        aGlaf.visi3D.rotationX=x;
        aGlaf.visi3D.rotationZ=z;
        aGlaf.visi3D.zume=zume;

        this.par.debagOk(true);
        return r
    }

}






function SHelp(s3d) {
    var self=this; 
    this.par=s3d; 
    this.type="SHelp";
    var self=this;
    this.object=undefined;

    this.content3d = new THREE.Object3D();    
    this.par.content3d.add(this.content3d);


    self.boxHelper=new BoxHelper(0.15,new THREE.MeshPhongMaterial({color:0xff0000}));
    self.content3d.add(self.boxHelper);
    self.boxHelper1=new BoxHelper(0.15,new THREE.MeshPhongMaterial({color:0x00ff00}));
    self.content3d.add(self.boxHelper1);

    this.clear=function(){
        self.boxHelper.visible=false;
        self.boxHelper1.visible=false;
    }


    this.loadMod=function(obj){
        this.clear();              
        this.object=obj;
        if(this.object.mod.name=="n"){
            return;
        }

        this.par.redrag()
        self.boxHelper.visible=true;
        self.boxHelper1.visible=true;
        this.dragObj();
    }



    this.dragObj=function(){
        if(self.boxHelper.visible==false){
            return;
        }        
        this.dragObjNWD(self.boxHelper, this.object.mod.r);
        this.dragObjNWD(self.boxHelper1, this.object.mod.r1);

        this.par.redrag();
    }

    this.dragObjNWD=function(bH, a){        
        if(a[3]>0 && a[4]>0 && a[5]>0){            
            bH.width=a[3];
            bH.position.x=a[0]+a[3]/2;

            bH.height=a[4];
            bH.position.z=a[1]+a[4]/2;

            bH.depth=a[5];
            bH.position.y=-a[2]-a[5]/2;   
        }
    }






}





function SMod(s3d) {
    var self=this; 
    this.par=s3d; 
    this.type="SMod";
    var self=this;
    this.object=undefined;

    this.con3d = new THREE.Object3D();
    this.par.content3d.add(this.con3d);

    this.content3d = new THREE.Object3D();
    this.con3d.add(this.content3d);

    this.array=["fbx",Math.PI/2, "3ds", Math.PI, "gltf", 0]


    this.loaderFBX = new THREE.FBXLoader();
    this.loaderTDS = new THREE.TDSLoader( );
    this.loaderGLTF = new THREE.GLTFLoader();

    this.clear=function(){
        this.object=undefined;
        aGlaf.visi3D.intRend=1;        
        for (var i = 0; i < 1; i++) {
            if(this.content3d.children.length!=0){
                var r=this.content3d.children[this.content3d.children.length-1];
                this.content3d.remove(r)
                i=0;
            }
        }
    }

    this.testDefault_light = function(o3d){  
       
        if(o3d.name=="Default_light"){
            if(o3d.parent)o3d.parent.remove(o3d)
        }
        if(o3d.children){
            for (var i = 0; i < o3d.children.length; i++) {
                this.testDefault_light(o3d.children[i]);
            }
        }
    }


    this.loadMod=function(obj){        
        this.clear();              
        this.object=obj;
        if(this.object.mod.name=="n"){
            return;
        }
        if(this.object.mod.key=="fbx"){
            var now = new Date().getMilliseconds();
            this.loaderFBX.load( aGlaf.resursData+""+this.object.id+"/mod/"+this.object.mod.name, function ( object ) {                
                self.content3d.rotation.x=Math.PI/2;
                self.content3d.add(object); 
                aGlaf.menu.naObj.setObj(object)                   
                self.par.redrag();
            })
        }
        if(this.object.mod.key=="3ds"){
            var now = new Date().getMilliseconds();
            this.loaderTDS.load( aGlaf.resursData+""+this.object.id+"/mod/"+this.object.mod.name, function ( object ) {
                self.content3d.rotation.x=Math.PI;               
                self.content3d.add(object); 
                aGlaf.menu.naObj.setObj(object)              
                self.par.redrag();
            })
        }  

        if(this.object.mod.key=="gltf"){
            var now = new Date().getMilliseconds();
            var l=aGlaf.resursData+""+this.object.id+"/mod/"+this.object.mod.name;
            //var l="https://vim-dev.s3.eu-central-1.amazonaws.com/furniture/13/straight_sofa.gltf"
            this.loaderGLTF.load( l, function ( object ) { 
                
                
                self.testDefault_light(object.scene) 
                self.content3d.rotation.x=Math.PI/2;            
                self.content3d.add(object.scene);                
                aGlaf.visi3D.objShadow(self.content3d, true)

                aGlaf.menu.naObj.setObj(object.scene)
                aGlaf.visi3D.intRend=1; 

                self.testMat(object.scene)
            })
        }      
    }

    this.testMat=function(c){ 
        if(c.material!=undefined){
            
            if(c.material.name){
                var b=false
                if(c.material.name.indexOf("m_base")!=-1){ 
                    c.material=self.par.geterMat.get("m_8");
                    b=true
                } 
                if(c.material.name.indexOf("m_xz")!=-1){ 
                    c.material=self.par.geterMat.get("m_10");
                    b=true
                } 

                if(b==false){
                    
                    var rr=self.par.geterMat.getTestTitle(c.material.name)
                    if(rr!=null){
                        
                        c.material=rr;
                    }
                }

            }
                      
        }
        if(c.children){
            for (var i = 0; i < c.children.length; i++) {
                this.testMat(c.children[i])
            }
        }

    } 


    /*
    if(aGlaf.menu.dragPic.object.id!=undefined){
                if((aGlaf.menu.dragPic.object.id+"").indexOf("m_")!=-1){                   
                    if(self.obj3d!=undefined){
                        var m=self.par.geterMat.get(aGlaf.menu.dragPic.object.id);
                        
                        self.obj3d.material=m;
                    }
                }
            }


    */



    this.getRect=function(){ 
        var a=[0,0,0,100,100,100];
        var focus=aGlaf.visi3D.utility.focus;
        var o=focus.getBoxObject(this.content3d);

        a[0]=o.box3.min.x;
        a[1]=o.box3.min.y;
        a[2]=o.box3.min.z;

        a[3]=o.box3.max.x-o.box3.min.x;
        a[4]=o.box3.max.y-o.box3.min.y;
        a[5]=o.box3.max.z-o.box3.min.z;

        return a;
    }


    this.obj3d=undefined;    

    this.out=function(e){
        
        self.obj3d=undefined;
    }
    this.over=function(e){
        if(e!=null)if(e.target!=null)self.obj3d=e.target;        
    }


    aGlaf.menu.dragPic.addFunAp(function(){        
        if(aGlaf.menu.dragPic.object!=undefined){            
            if(aGlaf.menu.dragPic.object.id!=undefined){
                if((aGlaf.menu.dragPic.object.id+"").indexOf("m_")!=-1){                   
                    if(self.obj3d!=undefined){
                        var m=self.par.geterMat.get(aGlaf.menu.dragPic.object.id);
                        
                        self.obj3d.material=m;
                    }
                }
            }
        }
    })


    aGlaf.visi3D.addEvent("out", this.out);
    aGlaf.visi3D.addEvent("over", this.over);

    aGlaf.visi3D.addChildMouse(self.par.content3d)

}

function GeterMat(matarialArray) {
    var self=this;     
    this.type="GeterMat";
    this.matarialArray=matarialArray;
    this.obj={}
    
    var loader = new THREE.TextureLoader();


    this.get=function(id){
        var r=null;
        var p=-1;    
        for (var i = 0; i < matarialArray.length; i++) {
            if(matarialArray[i].id==id){
                p=i;
            }
        }
        if(p==-1)return null;

        if(this.obj[id]!=undefined)return this.obj[id];

        var comand = 'new THREE.' + matarialArray[p].key + '()';
        var m = eval(comand);
        this.startMat(m, id)
        this.obj[id]=m;
        m.idUz=id
        return m;       
    }

    this.getTestTitle=function(_text){
        var r=null;
        if(_text=="Material #1sdaw")_text="m_Metal_dfgdg";

        if(_text!=undefined){
        
            for (var i = 0; i < matarialArray.length; i++) {
                if(_text.indexOf(matarialArray[i].title)!=-1){
              
                    r=this.get(matarialArray[i].id);
                    return r
                }                
            }
        }
        return r
    }
  
    this.objToMater=function(obj,m){
        var s;
        var o=obj.obj
        for(var s in o){         
            if(m[s]!=undefined){
                if(m[s] instanceof THREE.Color ){                   
                    m[s]=new THREE.Color(o[s]);
                }else{
                    m[s]=o[s];
                }
            }
        }
        if(obj.mirro!=undefined)if(obj.mirro==true){            
            m.envMap=aGlaf.visi3D.getEnvMap()
        }
        

        if(o.textur)
        for (var i = 0; i < o.textur.length; i++) {
            textur=loader.load(o.textur[i].link)
            textur.wrapS = textur.wrapT = THREE.RepeatWrapping;

            //textur.wrapS =  THREE.RepeatWrapping;
            //textur.wrapT = THREE.RepeatWrapping;

            textur.repeat.x=o.textur[i].rx;
            textur.repeat.y=o.textur[i].ry; 
            m[o.textur[i].name] =  textur       
        }

        

        

        m.needsUpdate=true;
        m.bLoad=true;
        if(m.arrFun)
        for (var i = 0; i < m.arrFun.length; i++) {
            m.arrFun[i](m);
        }              
    }
  

    this.startMat=function(m, id){
        var o;
        //var l="../"+aGlaf.resursData+""+id+"/config.json"+"?x=" + Math.random();

        var l=php.server+aGlaf.resursData+""+id+"/config.json"+"?x=" + Math.random();
        
        $.ajax({
            url: l,
            success: function function_name(data) {                         
                if(typeof data === "string") {
                    var conf = JSON.parse(data)
                    o = conf;
                } else o = data;              
                self.objToMater(o,m)
                
                //self.start();           
                                 
            },
            error:function function_name(data) {
                trace("Что то случилось с конфигом")
                self.start();
            }
        }); 
    }
}