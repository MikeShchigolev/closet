
export class MenedsherMaterial  {
    constructor(room, fun) {         
        this.type="MenedsherMaterial";
        window.menedsherMaterial=this;

        var self=this;
        this.fun=fun;
        this.par=room;
        this.geterMat  
        this._materialBase=undefined;


        this.setConfig=function(visi3D, o, linkServ){ 
            this.geterMat=new GeterMat(visi3D, o, linkServ, this )
        }


        this.getArrOtObj=function(o, s, intColor){

            if(o&&o.info){                
                if(o.info.color[s]){
                    return [o.info.color[s].art,o.info.text,o.info.size,o.info.color[s].pri,o.info.color[s].niz];
                }
            }
            
            if(intColor==0){
                if(o.plus!=undefined){
                    let aa=[]//this.object.plus;
                    for (var i = 0; i < o.plus.length; i++) {
                        aa[i]=o.plus[i]
                    }
                    return aa
                }
            }
            if(intColor==1){
                if(o.plus1!=undefined){
                    let aa=[]
                    for (var i = 0; i < o.plus1.length; i++) {
                        aa[i]=o.plus1[i]
                    }
                    return aa
                }
            }        
            return null;
        }
    }
    set materialBase(v) {
        this._materialBase = v;   
    }
    get materialBase() { return  this._materialBase;}
}


function GeterMat(visi3D, matarialArray, linkServ, par) {
    var self=this;  
    this.par=par;      
    
    this.type="GeterMat"; 

    this.visi3D=visi3D
    this.matarialArray=matarialArray.materials;
    var matarialArray=this.matarialArray
    this.idColor=null;
    var loader = new THREE.TextureLoader();
  
    this.obj={}


    this.getTestTitle=function(_text,boolBase){
        var r=null;
        var b
        if(_text!=undefined){   
            for (var i = 0; i < matarialArray.length; i++) {                
                b=true
                if(boolBase==undefined)if(_text.indexOf("base")!=-1)b=false
                //if(_text.indexOf("base")==-1 &&boolBase==undefined)//FIXE грохнул хз нафиг писал не помню                
                
                if(b)
                if(_text.indexOf(matarialArray[i].title)!=-1){ 
                    r=this.getIDReturn(matarialArray[i].id);           
                    return r;
                }                
            }
        }
        return r
    }
    
    var rt
    this.getTestTitleObj=function(_o3d, ramena){

        if(_o3d.material){
            
            if(ramena!=undefined){
                rt=this.getIDReturn(ramena)
                if(rt)_o3d.material=rt;
            }else{
                rt=this.getTestTitle(_o3d.material.name)
                if(rt)_o3d.material=rt;
            } 

            
        }
        for (var i = 0; i < _o3d.children.length; i++) {
            this.getTestTitleObj(_o3d.children[i],ramena)
        }
    }

    
    this.getIDReturn=function(id){
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
        m.idObj=matarialArray[p]
        this.startMat(m, id)
        this.obj[id]=m;
        m.idUz=id
        return m;       
    }



    this.get=function(_title, _fun, bNameMat){
        
        var r=null;
        var p=-1; 
        var s,s1,b;
        var id
        if(bNameMat!=undefined){//швишник может быть дленее по стрингу ищем его в базе   
            s=_title+""
            _title="2456567567867896789"            
            for (var i = 0; i < this.matarialArray.length; i++) {               
                s1=this.matarialArray[i].title+""               
                if(s.indexOf(s1)!=-1){                    
                    _title = this.matarialArray[i].title;
                    break;
                }
               
            }
        }     


        
        for (var i = 0; i < this.matarialArray.length; i++) {            
            if(this.matarialArray[i].title==_title){
                p=i;
            }
        }
       
        if(p==-1){
            _fun(null);
            return 
        }
        this.getId(this.matarialArray[p].id, _fun)
    }
    this.getId=function(id, _fun){
        
        var p=-1;
        for (var i = 0; i < this.matarialArray.length; i++) {   
            if(this.matarialArray[i].id==id){
                p=i;
                break;
            }
        }
        if(p==-1){
            _fun(null);
            return 
        }
        
        if(this.obj[id]!=undefined){
            if(this.obj[id].bLoad==true){
                _fun(this.obj[id])
            }else{               
                if(this.obj[id].arrFun)this.obj[id].arrFun.push(_fun)
            }
            
            return this.obj[id];
        }
        let sadsfdg=1
        var comand = 'new THREE.' + this.matarialArray[p].key + '()';
        var m = eval(comand);  
        m.idObj=matarialArray[p]
        m.bLoad=false
        m.arrFun=[_fun] 
          
        this.startMat(m, id)
        this.obj[id]=m;
        return m;       
    }
    var textur
    this.objToMater=function(o,m){
        var s;
       
        for(var s in o){         
            if(m[s]!=undefined){
                if(m[s] instanceof THREE.Color ){                   
                    m[s]=new THREE.Color(o[s]);
                }else{
                    m[s]=o[s];
                }
            }
        }

        if(o.textur)
        for (var i = 0; i < o.textur.length; i++) {
            textur=loader.load(o.textur[i].link,function(){
                self.visi3D.intRend=1;
            })
            textur.wrapS = textur.wrapT = THREE.RepeatWrapping;
            textur.repeat.x=o.textur[i].rx;
            textur.repeat.y=o.textur[i].ry; 
            m[o.textur[i].name] =  textur       
        }

        
        //m.wireframe=true;
        m.needsUpdate=true;
        m.bLoad=true;
        if(m.arrFun)
        for (var i = 0; i < m.arrFun.length; i++) {
            m.arrFun[i](m);
        }              
    }
      

    this.startMat=function(m, id){

        var o;
        var l=linkServ+"/resources/data/"+id+"/config.json"+self.par.par.par.par.par.par.plus;
       
        $.ajax({
            url: l,
            success: function function_name(data) {                         
                if(typeof data === "string") {
                    var conf = JSON.parse(data)
                    o = conf;
                } else o = data; 
                

                if(o.mirro==true){
                    m.envMap=self.visi3D.getEnvMap()
                }
               
                self.objToMater(o.obj,m);       
                                 
            },
            error:function function_name(data) {
             
                self.start();
            }
        }); 
    }
}


