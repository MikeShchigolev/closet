AngelObj2 = function(obj3d,_width,rectUV) {
    THREE.Object3D.call( this );
    this.type = 'AngelObj2';   
/*    this._width=_width;


    var m=new THREE.Mesh(
        new THREE.BoxGeometry( _width, 2, 2 ),
        new THREE.MeshPhongMaterial({color:0xff0000}) 
    )
    m.position.x=_width/2;
    this.add(m);

    
    this.dragWD=function(){ 
        
    }

    this.clear=function(){ 
              
    }

    this.dragWD();
    Object.defineProperty(this, "width", {
        set : function(value){
            this._width = value;
            this.dragWD();
        },
        get : function() { return this._rect; }
    });


*/

};
AngelObj2.prototype = Object.create( THREE.Object3D.prototype );
AngelObj2.prototype.constructor = AngelObj2;