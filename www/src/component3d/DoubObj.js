DoubObj = function(obj3d,oWidth) {
    THREE.Object3D.call( this );
    this.type = 'DoubObj';

    this.obj3d = obj3d;
    this.oWidth = oWidth;
    this._width=oWidth;

    this.material = new THREE.MeshPhongMaterial({map:bigBaza.nullTexture});
    this.obj3d.material = this.material;
    this.nameColor="stopColorDoubObj";    

    this._colorStatic  = "#ffffff";
    this._textureLinkStatic = "null";

    this.arr=[];
    this.getObj=function(){ 
        for (var i = 0; i < this.arr.length; i++) {
            if(this.arr[i].visible==false){               
                return this.arr[i];                               
            }
        }
        this.arr.push(this.obj3d.clone()); 
        this.arr[this.arr.length-1].material=this.material;  
        objShadow( this.arr[this.arr.length-1], true);
            
        return this.arr[this.arr.length-1];
    }
    var o3d;
    this.dragWD=function(){ 
        this.clear();
        for (var i = 0; i < this._width; i+=this.oWidth) {            
            o3d=this.getObj();
            this.add(o3d);
            o3d.visible=true;           
            o3d.position.z=i;
            o3d.scale.z=1;   
            if(i+this.oWidth>this._width){ 
                var pp= (i+this.oWidth)-this._width;                             
                o3d.scale.z=1-pp/this.oWidth;     
            }
        }
    }

    // ставим блоки преривисто arrX - масив x ( первый елемент начало , второй конец , третий начало ...)
    this.dragWDArr = function(arrX) {
        if (!arrX || arrX.length%2 != 0) {
            this.dragWD();
        } else {
            this.clear();
            for (var j = 0; j < arrX.length-1; j+=2) {
                for (var i = arrX[j]; i < arrX[j+1]; i+=this.oWidth) {            
                    o3d=this.getObj();
                    this.add(o3d);
                    o3d.visible=true;           
                    o3d.position.z=i;
                    o3d.scale.z=1;   
                    if(i+this.oWidth>arrX[j+1]){ 
                        var pp= (i+this.oWidth)-arrX[j+1];  
                        o3d.scale.z=1-pp/this.oWidth;     
                    }
                }
            }
        }
    }

    this.clear=function(){ 
        for (var i = 0; i < this.arr.length; i++) {
            this.arr[i].visible=false;
        }        
    }

    this.dragWD();
    Object.defineProperty(this, "width", {
        set : function(value){
            this._width = value;
            this.dragWD();
        },
        get : function() { return this._rect; }
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

};
DoubObj.prototype = Object.create( THREE.Object3D.prototype );
DoubObj.prototype.constructor = DoubObj;