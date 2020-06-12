NizObject = function(obj3d,_width,rectUV) {
    THREE.Object3D.call( this );
    this.type = 'VerhObject';
    obj3d.add(this)
    this._width=_width;
    var m=new THREE.Mesh(
        new THREE.BoxGeometry( _width, 3, 3 ),
        new THREE.MeshPhongMaterial({color:0x0000ff}) 
    )
    m.position.x=-_width/2;
    this.add(m);        
   
    this.dragWD=function(){ 
        
    }
    
    this._angel = 0;
    Object.defineProperty(this, "angel", {
        set : function(value){
            this._angel = value;
            this.dragWD();
        },
        get : function() { return this._rect; }
    });

};
NizObject.prototype = Object.create( THREE.Object3D.prototype );
NizObject.prototype.constructor = NizObject;