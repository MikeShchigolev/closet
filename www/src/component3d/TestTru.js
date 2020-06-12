
var testTru;
function TestTru(cont) {
    testTru=this;
    var self=this;

    var content=new createjs.Container();//контейнер для иконок
    cont.addChild(content);
    content.x=300;
    content.y=300;

    var triangleG=new TriangleGeometryDB(content);
    this.triangleG=triangleG;


    var mesh=new THREE.Mesh(triangleG, bigBaza.getMaterial({link:"resources/images/pic.jpg"}))
    this.mesh=mesh;
   // var mesh=new THREE.Mesh(new THREE.BoxGeometry( 100, 100, 100 ) , bigBaza.getMaterial({link:"images/pic.jpg"}))
    domik.content3d.add(mesh)
    // mesh.position.y=600
     mesh.position.z=-400
     mesh.rotation.x=Math.PI/2

     new PushButton(content, 0,-80, 'side', function() {
        if(mesh.material.side != THREE.DoubleSide)mesh.material.side = THREE.DoubleSide
        else mesh.material.side =THREE.FrontSide
            visi3D.intRend=1;

     })
    for (var i = 0; i <triangleG.arrPoint.length; i++) {
        var w=new Window(content, 0,0,""+i)
        w.width=30;
        w.height=30;
        w.name=i;
        w.x=triangleG.arrPoint[i].x;
        w.y=triangleG.arrPoint[i].y;
        w.funMove=function(){
            triangleG.arrPoint[this.name].x=this.x;
            triangleG.arrPoint[this.name].y=this.y;
            triangleG.update();
            test()
            visi3D.intRend=1;
        }
    };


}
