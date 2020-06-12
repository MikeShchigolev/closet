

export class VNBDL{
    constructor(cont3d) {
        this.type="VNBDL";
        var self=this;       


        this.cont3d=cont3d;

        this._height=100;
        this._material=undefined;


        this.content3d=new THREE.Object3D();
        this.cont3d.add(this.content3d)
        this.axisHelper = new THREE.AxesHelper(50)
        this.content3d.add(this.axisHelper);





        this.dragMat=function(){

        }    
            
    }


    set material(v) {        
        this._material= v;
        this.dragMat();    
    }  
    get material() { return  this._material;} 
}


