VerhObject = function(obj3d,_width,rectUV) {
    THREE.Object3D.call( this );
    this.type = 'VerhObject';
    obj3d.add(this)
    this._width=_width;
    this._height=10;
    this._depth=10;

   
    this.geom=new GeometryVerhObject( this._width, this._height, this._depth, rectUV );
    this._colorStatic  = "#ffffff";
    this._textureLinkStatic = "null";

    this.mesh=new THREE.Mesh(
        this.geom,
        new THREE.MeshPhongMaterial({color:this._colorStatic,map:bigBaza.nullTexture}) 
    )
    
    this.add(this.mesh);        
   
    
    this.dragWD=function(){ 
        this.geom._width = this._width;
        this.geom._height = this._height;
        this.geom._depth = this._depth;
        this.geom.angel = this._angel;
        this.mesh.rotation.y=-this._angel;
    }
    
    this._angel = 0;
    Object.defineProperty(this, "angel", {
        set : function(value){
            this._angel = value;
            this.dragWD();
        },
        get : function() { return this._angel; }
    });


    Object.defineProperty(this, "colorStatic", {
        set : function(value){
            if(this._colorStatic!=value){
                this._colorStatic = value;
                this.mesh.material.color = new THREE.Color(this._colorStatic);
            }
            
        },
        get : function() { return this._colorStatic; }
    });

    Object.defineProperty(this, "textureLinkStatic", {
        set : function(value){
            if(this._textureLinkStatic!=value){
                this._textureLinkStatic = value;
                this.mesh.material.map=bigBaza.getTexture(this._textureLinkStatic);
            }
                
        },
        get : function() { return this._textureLinkStatic; }
    });
 

    Object.defineProperty(this, "width", {
        set : function(value){
            this._width= value;
            this.dragWD();
        },
        get : function() { return this._width; }
    });
    Object.defineProperty(this, "height", {
        set : function(value){
            this._height= value;
            this.dragWD();
        },
        get : function() { return this._height; }
    });
    Object.defineProperty(this, "depth", {
        set : function(value){
            this._depth= value;
            this.dragWD();
        },
        get : function() { return this._depth; }
    });
    
};
VerhObject.prototype = Object.create( THREE.Object3D.prototype );
VerhObject.prototype.constructor = VerhObject;

GeometryVerhObject = function(w,h,d,rectUV) {
    THREE.BufferGeometry.call( this );
    this.type = 'GeometryVerhObject';
    this._angel=0;
    this._width=w||10
    this._height=h||10
    this._depth=d||10

    var positions=new Float32Array(9*2*6); 
    this.addAttribute( 'position', new THREE.BufferAttribute(positions, 3 ));
    var uv=new Float32Array(6*2*6);
    this.addAttribute( 'uv', new THREE.BufferAttribute( uv, 2 ) );
    var normals =new Float32Array(9*2*6);       
    this.addAttribute( 'normal', new THREE.BufferAttribute(normals, 3 ));


    var arrPoint=[];
    var point;
    for (var i = 0; i < 4; i++) {
        arrPoint.push(new THREE.Vector3())
    }

    this.poiskOpor = function(){ 
        arrPoint[0].y=this._height/2;
        arrPoint[3].y=-this._height/2;
        point=calc.getVector(this._depth, -this._angel);
        arrPoint[1].x=point.x;
        arrPoint[1].y=point.y+arrPoint[0].y;

        point=calc.getVector(this._height, -this._angel-Math.PI/2);
        arrPoint[2].x=point.x+arrPoint[1].x;
        arrPoint[2].y=point.y+arrPoint[1].y;

       
    }

    var sah=0;
    var sah2=0;
    this.update = function() {
        this.poiskOpor();
        sah=0;
        sah2=0;

        for (var i = 0; i < positions.length; i++) {
            positions[i]=0//Math.random()*100-50;
            normals[i]=0;            
        };
        for (var i = 0; i < uv.length; i++) {
            uv[i]=0;                        
        };

        this.plusTerri( arrPoint[0].x,    this._width/2, arrPoint[0].y, 
                        arrPoint[1].x,    this._width/2, arrPoint[1].y,    
                        arrPoint[2].x,    this._width/2, arrPoint[2].y,
                        arrPoint[3].x,    this._width/2, arrPoint[3].y,

                        rectUV.x+rectUV.width, rectUV.y,
                        rectUV.x, rectUV.y,         
                        rectUV.x, rectUV.y+rectUV.height,         
                        rectUV.x+rectUV.width, rectUV.y+rectUV.height
                        );

        this.plusTerri( arrPoint[3].x,    -this._width/2, arrPoint[3].y, 
                        arrPoint[2].x,    -this._width/2, arrPoint[2].y,    
                        arrPoint[1].x,    -this._width/2, arrPoint[1].y,
                        arrPoint[0].x,    -this._width/2, arrPoint[0].y,

                        rectUV.x+rectUV.width, rectUV.y+rectUV.height,
                        rectUV.x, rectUV.y+rectUV.height, 
                        rectUV.x, rectUV.y,   
                        rectUV.x+rectUV.width, rectUV.y            
                        );


        this.plusTerri( arrPoint[0].x,    -this._width/2, arrPoint[0].y, 
                        arrPoint[1].x,    -this._width/2, arrPoint[1].y,    
                        arrPoint[1].x,    this._width/2, arrPoint[1].y,
                        arrPoint[0].x,    this._width/2, arrPoint[0].y,

                        rectUV.x+rectUV.width, rectUV.y+rectUV.height,
                        rectUV.x, rectUV.y+rectUV.height, 
                        rectUV.x, rectUV.y,   
                        rectUV.x+rectUV.width, rectUV.y            
                        );

        this.plusTerri( arrPoint[3].x,    this._width/2, arrPoint[3].y, 
                        arrPoint[2].x,    this._width/2, arrPoint[2].y,    
                        arrPoint[2].x,    -this._width/2, arrPoint[2].y,
                        arrPoint[3].x,    -this._width/2, arrPoint[3].y,

                        rectUV.x+rectUV.width, rectUV.y+rectUV.height,
                        rectUV.x, rectUV.y+rectUV.height, 
                        rectUV.x, rectUV.y,   
                        rectUV.x+rectUV.width, rectUV.y            
                        );

        this.plusTerri( arrPoint[1].x,    this._width/2, arrPoint[1].y, 
                        arrPoint[1].x,    -this._width/2, arrPoint[1].y,    
                        arrPoint[2].x,    -this._width/2, arrPoint[2].y,
                        arrPoint[2].x,    this._width/2, arrPoint[2].y,

                        rectUV.x+rectUV.width, rectUV.y+rectUV.height,
                        rectUV.x, rectUV.y+rectUV.height, 
                        rectUV.x, rectUV.y,   
                        rectUV.x+rectUV.width, rectUV.y            
                        );
        this.plusTerri( arrPoint[0].x,    -this._width/2, arrPoint[0].y, 
                        arrPoint[0].x,    this._width/2, arrPoint[0].y,    
                        arrPoint[3].x,    this._width/2, arrPoint[3].y,
                        arrPoint[3].x,    -this._width/2, arrPoint[3].y,

                        rectUV.x+rectUV.width, rectUV.y+rectUV.height,
                        rectUV.x, rectUV.y+rectUV.height, 
                        rectUV.x, rectUV.y,   
                        rectUV.x+rectUV.width, rectUV.y            
                        );

        /*this.plusTerri( arrPoint[0].x,    w/2, arrPoint[0].y, 
                        arrPoint[2].x,    w/2,arrPoint[2].y,    
                        arrPoint[3].x,    w/2, arrPoint[3].y,

                        Math.random(), Math.random(),
                        Math.random(), Math.random(),          
                        Math.random(), Math.random());*/


        /*this.plusTerri( arrPoint[2].x,    -w/2, arrPoint[2].y, 
                        arrPoint[1].x,    -w/2,arrPoint[1].y,    
                        arrPoint[0].x,    -w/2, arrPoint[0].y,

                        rectUV.x, rectUV.y+rectUV.height,
                        rectUV.x, rectUV.y,          
                        rectUV.x+rectUV.width, rectUV.y);

        this.plusTerri( arrPoint[3].x,    -w/2, arrPoint[3].y, 
                        arrPoint[2].x,    -w/2,arrPoint[2].y,    
                        arrPoint[0].x,    -w/2, arrPoint[0].y,

                        Math.random(), Math.random(),
                        Math.random(), Math.random(),          
                        Math.random(), Math.random());*/





        this.attributes.position.needsUpdate = true;
        this.attributes.uv.needsUpdate = true;
        this.computeVertexNormals();
        this.attributes.normal.needsUpdate = true;
    }


    this.plusTerri= function(x,y,z, x1,y1,z1,   x2,y2,z2,  x3,y3,z3, u,v,    u1,v1,  u2,v2,  u3,v3){       
        positions[sah]=x;
        positions[sah+1]=y;
        positions[sah+2]=z;

        positions[sah+3]=x1;
        positions[sah+4]=y1;
        positions[sah+5]=z1;

        positions[sah+6]=x2;
        positions[sah+7]=y2;
        positions[sah+8]=z2;
        
        uv[sah2]=u;
        uv[sah2+1]=v;

        uv[sah2+2]=u1;
        uv[sah2+3]=v1;

        uv[sah2+4]=u2;
        uv[sah2+5]=v2;
        sah+=9;
        sah2+=6;


        positions[sah]=x;
        positions[sah+1]=y;
        positions[sah+2]=z;

        positions[sah+3]=x2;
        positions[sah+4]=y2;
        positions[sah+5]=z2;

        positions[sah+6]=x3;
        positions[sah+7]=y3;
        positions[sah+8]=z3;
        
        uv[sah2]=u;
        uv[sah2+1]=v;

        uv[sah2+2]=u2;
        uv[sah2+3]=v2;

        uv[sah2+4]=u3;
        uv[sah2+5]=v3;
        sah+=9;
        sah2+=6;


    }   



    this.update();

    Object.defineProperty(this, "angel", {
        set : function(value){
            this._angel= value;
            this.update();
        },
        get : function() { return this._angel; }
    });
    Object.defineProperty(this, "width", {
        set : function(value){
            this._width= value;
            this.update();
        },
        get : function() { return this._width; }
    });
    Object.defineProperty(this, "height", {
        set : function(value){
            this._height= value;
            this.update();
        },
        get : function() { return this._height; }
    });
    Object.defineProperty(this, "depth", {
        set : function(value){
            this._depth= value;
            this.update();
        },
        get : function() { return this._depth; }
    });
};
GeometryVerhObject.prototype = Object.create( THREE.BufferGeometry.prototype );
GeometryVerhObject.prototype.constructor = GeometryVerhObject;