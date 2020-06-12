


export class Krai3D  {
    constructor(cont3d, mat,fun) {         
        this.type="Krai3D";
        var self=this;
        this._visible=true;
        this.fun=fun;
        this._storona0=true;
        this._storona1=true;
        this._storona2=true;

        this._material=mat

        this.content3d = new THREE.Object3D();    
        cont3d.add(this.content3d);

        this.kraiGeometry=new KraiGeometry()
        this.mesh=new THREE.Mesh(this.kraiGeometry,mat)
        this.content3d.add(this.mesh)

        //this.mesh.position.y=100+50*Math.random()
    }

    set storona0(v) {
        if(this._storona0!=v){
            this._storona0 = v;            
            this.kraiGeometry.storona0=v;
        }       
    }   
    get storona0() { return  this._storona0;}
    
    set storona1(v) {
        if(this._storona1!=v){
            this._storona1 = v;            
            this.kraiGeometry.storona1=v;
        }       
    }   
    get storona1() { return  this._storona1;}
    
    set storona2(v) {
        if(this._storona2!=v){
            this._storona2 = v;            
            this.kraiGeometry.storona2=v;
        }       
    }   
    get storona2() { return  this._storona2;}



    set visible(v) {
        if(this._visible!=v){
            this._visible = v;            
            this.mesh.visible=v;
            this.fun("visible",v);
        }       
    }   
    get visible() { return  this._visible;}


    set sA1(v) {
        if(this._sA1!=v){
            this._sA1 = v;            
            this.redrag();
        }       
    }   
    get sA1() { return  this._sA1;}

    

    set material(v) {
        
        this._material = v;
        this.mesh.material = v;             
               
    }   
    get material() { return  this._material;}

    



}



function KraiGeometry() {
    THREE.BufferGeometry.call(this);

    this.arrPosition=[];
    var arrPositionAttribut;
    var arrNormalAttribut
    var d=1;
    var k,i,j;

    var o;

    this._storona0=true;
    this._storona1=true;
    this._storona2=true;


    this.update = function () {
    
        this.arrPosition=[];  
        //низ
        this.arrPosition.push(0,0,0);
        this.arrPosition.push(0,0,d);
        this.arrPosition.push(d,0,d);

        this.arrPosition.push(0,0,0);       
        this.arrPosition.push(d,0,d);
        this.arrPosition.push(0,0,d);

       //верх
        this.arrPosition.push(0,d,0);
        this.arrPosition.push(0,d,d);
        this.arrPosition.push(d,d,d);
        
       /* this.arrPosition.push(0,d,0);       
        this.arrPosition.push(d,d,d);
        this.arrPosition.push(0,d,d);*/




        if(this._storona0==true){
            this.arrPosition.push(0,0,d);
            this.arrPosition.push(0,d,d);
            this.arrPosition.push(d,d,d);

            this.arrPosition.push(0,0,d);
            this.arrPosition.push(d,0,d);
            this.arrPosition.push(d,d,d);

           /* this.arrPosition.push(0,0,d);        
            this.arrPosition.push(d,d,d);
            this.arrPosition.push(0,d,d);

            this.arrPosition.push(0,0,d);        
            this.arrPosition.push(d,d,d);
            this.arrPosition.push(d,0,d);*/
        }




        if(this._storona1==true){
            this.arrPosition.push(0,0,0);
            this.arrPosition.push(0,d,0);
            this.arrPosition.push(d,d,d);

            this.arrPosition.push(d,d,d);
            this.arrPosition.push(d,0,d);
            this.arrPosition.push(0,0,0);

          /*  this.arrPosition.push(0,0,0);        
            this.arrPosition.push(d,d,d);
            this.arrPosition.push(0,d,0);

            this.arrPosition.push(d,d,d);        
            this.arrPosition.push(0,0,0);
            this.arrPosition.push(d,0,d);*/
        }




        if(this._storona2==true){
            this.arrPosition.push(0,0,0);
            this.arrPosition.push(0,d,d);
            this.arrPosition.push(0,0,d);

            this.arrPosition.push(0,0,0);
            this.arrPosition.push(0,d,d);
            this.arrPosition.push(0,d,0);

            this.arrPosition.push(0,0,0);        
            this.arrPosition.push(0,0,d);
            this.arrPosition.push(0,d,d);

            this.arrPosition.push(0,0,0);        
            this.arrPosition.push(0,d,0);
            this.arrPosition.push(0,d,d);
        }
  








   
        arrPositionAttribut = new Float32Array(this.arrPosition.length * 3);
        this.addAttribute('position', new THREE.BufferAttribute(arrPositionAttribut, 3));
       
        k=this.arrPosition.length   
        for (var i = 0; i < k; i++) {
            arrPositionAttribut[i] = this.arrPosition[i];// = arrPosition[i];
        }

        arrNormalAttribut = new Float32Array( this.arrPosition.length*3 );
        this.addAttribute( 'normal', new THREE.BufferAttribute( arrNormalAttribut, 3 ) );



        
        this.attributes.position.needsUpdate = true;

        this.computeVertexNormals();
        this.attributes.normal.needsUpdate = true;

        //this.computeVertexNormals();
        this.computeBoundingBox();
        this.computeBoundingSphere();

    }

    this.update();
}
KraiGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
KraiGeometry.prototype.constructor = KraiGeometry;  


Object.defineProperties(KraiGeometry.prototype, {
    storona0: {// замена градиентов
        set: function (value) {
            if (this._storona0 != value) {
                this._storona0 = value;
                this.update();                
            }
        },
        get: function () {
            return this._storona0;
        }
    },

    storona1: {// замена градиентов
        set: function (value) {
            if (this._storona1 != value) {
                this._storona1 = value;
                this.update();                
            }
        },
        get: function () {
            return this._storona1;
        }
    },

    storona2: {// замена градиентов
        set: function (value) {
            if (this._storona2 != value) {
                this._storona2 = value;
                this.update();                
            }
        },
        get: function () {
            return this._storona2;
        }
    },

})