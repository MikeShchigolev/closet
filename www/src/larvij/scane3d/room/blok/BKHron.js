


export class BKHron {
    constructor(par, id,idArr,mO) { 
        var self=this;   
        this.type = "BKHron";        
        this.par=par;
        this.id=id;
        this.idArr=idArr
        this.obj3d=undefined       

        this.mO=undefined    
        if(mO)this.mO=mO
        else this.mO=this.par.par.mO;

        this.content3d=undefined
        if(par.content3d)this.content3d=par.content3d

       
        self.initHron=undefined;  
        this.object = this.mO.getIdObj(id)
       
        this.array=[]

        this.material    
        this.bbbb=true
        
        this.init=function(){ 
            
            if(this.object.obj==undefined){

                return;
            }
            this.link="resources/data/"+this.object.obj.id+"/mod/"+ this.object.obj.mod.name; 
              
            this.mO.getModel(this.link, this.object.obj.mod.key,function(o){                
                
                self.obj3d=o;               
                if(self.bbbb==true) {          
                    o.position.y=self.object.obj.mod.r[2]
                    o.position.z=self.object.obj.mod.r[1]  
                } 
                if(self.initHron)self.initHron()
                else self.par.initHron();        
            })
        }
        


        this.clear=function(){  
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].parent!=undefined)this.array[i].parent.remove(this.array[i])
            }            
        }

        this.get=function(){ 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].parent==undefined){
                    if(this.content3d!=undefined)this.content3d.add(this.array[i])
                    return this.array[i]
                }
            } 


            if(self.obj3d== undefined )return undefined


            this.array.push(self.obj3d.clone())
            if(this.content3d!=undefined)this.content3d.add(this.array[this.array.length-1])

            if(this.par.par.recurcChild){
                this.par.par.recurcChild(this.array[this.array.length-1])
            }
            if(this.par.par.par){
                if(this.par.par.par.recurcChild){
                    this.par.par.par.recurcChild(this.array[this.array.length-1])
                }
            }

            return this.array[this.array.length-1];
        } 



        this.dragC=function(m){ 

          /*  this.material=m;                   
            for (var i = 0; i < this.array.length; i++) {
                this.redragM(this.array[i], m);
            }*/

        }


        this.redragM=function(c3d,m){ 
           /* if(c3d.material){                
                c3d.material=m;
            }
            if(c3d.children)
                for (var i = 0; i < c3d.children.length; i++) {
                    this.redragM(c3d.children[i],m)
                }*/
        }

    }
}

