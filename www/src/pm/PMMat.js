


export default function PMMat(par, visi3D, objbase) { 
	this.type="PMMat";
    var self=this;

    this.par=par
    this.visi3D=visi3D
    this.objbase=objbase;

    this.pmTexture = this.par.tex;
    this.ser = window.location.href;

    var arrParams = window.location.href.split("?"); 
            
    var arrParams2 = arrParams[0].split("/");
 
    this.server=""
    for (var i = 0; i < arrParams2.length-1; i++) {
        this.server+=arrParams2[i]+"/"
    }
                






    this.setObjS = function (c3d,obj,fun){
        this.getTestTitleObj(c3d)
        fun()
    }   


    this.testObjMatLoad=function(c3d){
        
        if(c3d.children){
            for (var i = 0; i < c3d.children.length; i++) {
                if(this.testObjMatLoad(c3d.children[i])==false)return false
            }
        } 

        if(c3d.material){
            if(c3d.material.bLoad!=undefined){
                if(c3d.material.bLoad==false){
                    return false
                }
            }
        }


        return true;
    }


    
    this.matarialArray=this.objbase.materials;
    var matarialArray=this.matarialArray
    this.idColor=null;
    var loader = new THREE.TextureLoader();
  
    this.obj={}

    this.getTestTitle=function(_text){        
        var r=null;      
        if(_text!=undefined){ 

            for (var i = 0; i < matarialArray.length; i++) { 
              
                if(_text.indexOf(matarialArray[i].title)!=-1){ 
                
                    r=this.getIDReturn(matarialArray[i].id);           
                    return r;
                }                
            }
        }
        return r
    }
    
    var rt
    this.getTestTitleObj=function(_o3d){
      
        if(_o3d.material){           
            rt=this.getTestTitle(_o3d.material.name)         
            if(rt!=null)_o3d.material=rt;
        }
        for (var i = 0; i < _o3d.children.length; i++) {
            this.getTestTitleObj(_o3d.children[i])
        }

    }

    
    this.getIDReturn=function(id, isBD){
        
            var r=null;
            var p=-1;    
            for (var i = 0; i < matarialArray.length; i++) {
                if(matarialArray[i].id==id){
                    p=i;
                }
            }
            if(p==-1)return null;

        if(isBD==undefined){
            if(this.obj[id]!=undefined)return this.obj[id];
        }


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
                
                this.obj[id].arrFun.push(_fun)
            }
            
            
            return this.obj[id];
        }
        var comand = 'new THREE.' + this.matarialArray[p].key + '()';
        var m = eval(comand);  
        m.idObj=matarialArray[p]
        m.bLoad=false;
        m.loadTexure=999;
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

        m.loadTexure = 0
        if (o.textur) {
            m.loadTexure = o.textur.length;
            for (var i = 0; i < o.textur.length; i++) {
                if (o.textur[i].id) {
                    let index = i;
                    textur = this.pmTexture.getById(o.textur[i].id, (t) => {
                        m[o.textur[index].name] = t;
                        --m.loadTexure;
                    });
                    m[o.textur[i].name] = textur;
                } else {
                    textur = loader.load(o.textur[i].link, function () {
                        if(self.visi3D)self.visi3D.intRend = 1;
                        m.loadTexure--;
                    })
                    textur.wrapS = textur.wrapT = THREE.RepeatWrapping;
                    textur.repeat.x = o.textur[i].rx;
                    textur.repeat.y = o.textur[i].ry;
                    m[o.textur[i].name] = textur
                }
            }
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
        var l=this.server+"resources/data/"+id+"/config.json"+self.par.plus;

        $.ajax({
            url: l,
            success: function function_name(data) {                         
                if(typeof data === "string") {
                    var conf = JSON.parse(data)
                    o = conf;
                } else o = data; 
                


                if(o.mirro===true){
                    if(self.visi3D)m.envMap=self.visi3D.getEnvMap()
                }else{
                    if(o.mirro==0){
                        
                    }
                    if(o.mirro==1){
                        if(self.visi3D)m.envMap=self.visi3D.getEnvMap()
                    }
                    if(o.mirro==2){
                        if(self.visi3D)m.envMap=self.visi3D.getEnvMap1()
                    }
                }

             


                self.objToMater(o.obj,m);                                
            },
            error:function function_name(data) {

                self.start();
            }
        }); 
    }
}
