



VerhObjectDoubl = function(obj3d,_width,rectUV) {
    THREE.Object3D.call( this );
    this.type = 'VerhObjectDoubl';
    obj3d.add(this)
    this._width=_width;
    this._height=10;
    this._depth=10;
    this._oWidth = 100;

	        
    this._colorStatic  = "#ffffff";
    this._textureLinkStatic = "null";  
   	this.material = new THREE.MeshPhongMaterial({color:this._colorStatic,map:bigBaza.nullTexture}) 

    this.geom=new GeometryVerhObject( this._oWidth, this._height, this._depth, rectUV );

    this.arr=[];
    this.getObj=function(){ 
        for (var i = 0; i < this.arr.length; i++) {
            if(this.arr[i].visible == false){      
                return this.arr[i];                               
            }
        }
        this.arr.push( new THREE.Mesh(this.geom, this.material) ); 
        objShadow(this.arr[this.arr.length-1], true);

        return this.arr[this.arr.length-1];
    } 
    
    this.clear=function(){ 
        for (var i = 0; i < this.arr.length; i++) {
            this.arr[i].visible = false;
        }        
    }
    
    this.dragWD=function(){ 
    	this.dragWD2();
        this.clear();
        // var c=0



        o3d=this.getObj();
        this.add(o3d);
        o3d.visible=true;           
        o3d.position.y=this._width/2;
        // o3d.position.y+=10*c;
        o3d.rotation.z=Math.PI
        o3d.rotation.y=-Math.PI
        o3d.scale.y=this._width/100; 


        o3d=this.getObj();
        o3d.rotation.y=Math.PI
            // o3d.rotation.z=Math.PI
            this.add(o3d);
            o3d.visible=true;           
            o3d.position.y=this._width/2;
            // o3d.position.y+=10*c++;
            o3d.scale.y=1; 
        o3d.scale.y=this._width/100; 



return


/*
        for (var i = 0; i < this._width; i+=this._oWidth) {      

            o3d=this.getObj();
            this.add(o3d);
            o3d.visible=true;           
            o3d.position.y=i+this._oWidth/2;
            // o3d.position.y+=10*c;
            o3d.rotation.z=Math.PI
            o3d.rotation.y=-Math.PI
            o3d.scale.y=1;   
            if(i+this._oWidth>this._width){ 
                var pp= (i+this.oWidth)-this._width;                             
                o3d.scale.y=1-pp/this.oWidth;     
            	o3d.position.y=i+this._oWidth/2*o3d.scale.y;
            }


            o3d=this.getObj();
            o3d.rotation.y=Math.PI
            // o3d.rotation.z=Math.PI
            this.add(o3d);
            o3d.visible=true;           
            o3d.position.y=i+this._oWidth/2;
            // o3d.position.y+=10*c++;
            o3d.scale.y=1;   
            if(i+this._oWidth>this._width){ 
                var pp= (i+this.oWidth)-this._width;                             
                o3d.scale.y=1-pp/this.oWidth;     
            	o3d.position.y=i+this._oWidth/2*o3d.scale.y;
            }
        }*/
    }

    this.dragWD2=function(){ 
        this.geom._width = this._oWidth ;
        this.geom._height = this._height;
        this.geom._depth = this._depth;
        this.geom.angel = this._angel;

        for (var i = 0; i < this.arr.length; i++) {
        	this.arr[i].rotation.y=-this._angel;
        }

    }
    this._angel = 0;
    this.dragWD()
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
                this.material.color = new THREE.Color(this._colorStatic);
            }
            
        },
        get : function() { return this._colorStatic; }
    });

    Object.defineProperty(this, "textureLinkStatic", {
        set : function(value){
            if(this._textureLinkStatic!=value){
                this._textureLinkStatic = value;
                this.material.map=bigBaza.getTexture(this._textureLinkStatic);
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
    
    Object.defineProperty(this, "oWidth", {
        set : function(value){
            this._oWidth= value;
            this.dragWD();
        },
        get : function() { return this._oWidth; }
    });
};
VerhObjectDoubl.prototype = Object.create( THREE.Object3D.prototype );
VerhObjectDoubl.prototype.constructor = VerhObjectDoubl;


