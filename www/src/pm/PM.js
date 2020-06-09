


import PMMat from './PMMat.js';
import PMFilt from './PMFilt.js';
import PMIz from './PMIz.js';
import PMTexture from './PMTexture.js';

export function PM(visi3D, objbase) { 	
	this.type="PM";
	var self=this;
    this.objbase=objbase;
    this.visi3D=visi3D

    this.plus="?1"//+Math.random()
    this.loaderGLTF = new THREE.GLTFLoader();



    this.tex = new PMTexture(this, visi3D, objbase);
    this.mat=new PMMat(this, visi3D, objbase);
    this.filt=new PMFilt(this, visi3D, objbase);
    this.iz=new PMIz(this, visi3D, objbase);

    this.arrayHron=[];    

    this.getId=function(idObj,fun,bClaen){
        if(bClaen==true){//Стартуем занново
            for (var i = 0; i < this.arrayHron.length; i++) {            
                if(this.arrayHron[i].testId(idObj)==true){
                    this.arrayHron.splice(i,1)                    
                }
            }
        }    




        for (var i = 0; i < this.arrayHron.length; i++) {            
            if(this.arrayHron[i].testId(idObj)==true){
                this.arrayHron[i].setFun(fun);
                return;
            }
        }
        this.arrayHron.push(new Hron(this, idObj, fun))
    }



    //глобально очищает все бд
    this.clear=function(){

    }
}  




export function  Hron (par, idObj, fun) {
    this.type="Hron";
    var self=this;
    this.par=par


    this.idObj=idObj;
    this.id=undefined;
    this.object=undefined;
    this.link=undefined;

    this.filt=undefined;

    this.content3d=undefined;

    this.array=[]
    this.array.push(fun);

    this.boolClone=true;
   
    var cc
    this.setFun = function(fun){
        if(this.content3d!=undefined){
            if(self.boolClone==true){
                cc=self.content3d.clone();                
            }else{
                cc=self.content3d;
            }
            cc.hron=this
            this.par.iz.setHron(this, cc)
            if(this.object.param)this.par.filt.dragParam(cc,this.object.param)
            fun(cc);
            return;
        }
        this.array.push(fun);
    }
    
    this.finalLoad=function(o3d){ 
        this.getObj3D(o3d)
        this.content3d = o3d
        o3d.name="hron_"+this.id;
        
               
        this.par.mat.setObjS(this.content3d,this.object,this.finalLoad1)
    }

    this.finalLoad1=function(){         
        self.par.filt.setObjS(self,self.finalLoad2)
    }
    
    this.finalLoad2=function(){        
        for (var i = 0; i < self.array.length; i++) {
            if(self.boolClone==true){
                cc=self.content3d.clone();                
            }else{
                cc=self.content3d;
            }
            cc.hron=self; 
            self.par.iz.setHron(self, cc)
            if(self.object.param)self.par.filt.dragParam(cc,self.object.param)
            self.array[i](cc);
        }
    }
        
    


 

    this.start=function(o){ 
        this.object=o;
       
        if(this.object.param.clone!=undefined)if(this.object.param.clone==false)this.boolClone=false
        
        this.id=o.id;            
        this.link="resources/data/"+this.id+"/mod/"+this.object.mod.name;          


        if(this.object.mod.name=="n"){//Debag
            this.finalLoad(new THREE.Mesh(new THREE.BoxBufferGeometry(100,100,100)));
            

        }else{
            this.par.loaderGLTF.load( this.link, function ( object ) { 
                self.finalLoad(object.scene);
            })    
        }
    }

    var xid,xxid
    this.testId=function(_idObj){

        if(typeof _idObj =="number")xxid=_idObj
        else xxid=_idObj.id;

        if(this.id==undefined){
            xid=this.idObj.id
        }else{
            xid=this.id
        }         

        if(xid==xxid) return true

        return false     
    }



   this.getObj3D=function(o3d){

        if(o3d.material!=undefined){
            if(o3d.material.roughnessMap!=undefined){
                if(par.visi3D)o3d.material.envMap=par.visi3D.cubeMap.getTexture()
            }
        }
        
        if(o3d==undefined)return

        if(o3d.children!=undefined){
            for (var i = o3d.children.length-1; i >=0; i--) {            
                this.getObj3D(o3d.children[i]);                 
            }
        }
        
        if(o3d.name=="Default_light"){
            o3d.parent.remove(o3d)
        }
        //return o;
    }  




    if(typeof idObj == "object"){//обект загружен и его можно сразу стортонуть
        this.start(idObj)
        return            
    }  

    if(typeof idObj =="number") {
         $.ajax({
            url: "resources/data/"+idObj+"/config.json"+self.par.plus,
            success: function function_name(data) {
                if(typeof data === "string") {
                    self.start(JSON.parse(data))                       
                } else self.start(data);                   
            },
            error:function function_name(data) {
                console.log("Что то случилось с конфигом")
            }
        });
    }   
}  

