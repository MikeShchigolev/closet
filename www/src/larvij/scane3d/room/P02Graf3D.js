


///Контейнер для отрисовки окно тоесть дуг окон


function P02Graf3D() {
    THREE.Object3D.call( this );
    this.type = 'P01Graf2D';


    var obj3d;


    var oClone;

    var arrGraf3D=[];

    //создаюм и перехватываем контейнеры
    this.setObj=function(_obj3d){ 
        obj3d=_obj3d

        this.drawWHD(100, 100, 100)
        
       /* this.addChild(obj2d);    
        for (var i = obj2d.children.length-1; i >=0 ; i--) {
            this.setO(obj2d.children[i], obj2d.children[i].name)
        }*/

        /*oClone=this.getClone(_obj2d);
        this.addChild(oClone);

        oClone=this.getClone(_obj3d);
        oClone.position.y=100;
        this.add(oClone);

        oClone=this.getClone(_obj3d);
        oClone.position.y=-100;
        this.add(oClone);*/


        
    }

     
    var arrGraf=[];

    var kol,sah;
    //изменяем размеры блока
    this.drawWHD=function(_w, _h, _d){
        kol=Math.round(_w/100);
        if(kol==0)kol=1;
        sah=_w/kol;


        
        this.clear();        
        for (var i = 0; i < kol; i++) {
            graf3D = this.getObj();
            graf3D.visible=true;
            graf3D.position.x=i*sah;
            graf3D.drawWHD(sah, _h, _d)
        }

    // d28zypspm  


/**/

        return false;
    }

    this.getObj=function(){
        for (var i = 0; i < arrGraf3D.length; i++) {
            if(arrGraf3D[i].visible==false){
                return arrGraf3D[i];
            }            
        }

        arrGraf3D.push(new Graf3D());
        arrGraf3D[arrGraf3D.length-1].setObj(this.getClone(obj3d));
        this.add(arrGraf3D[arrGraf3D.length-1])
        return arrGraf3D[arrGraf3D.length-1];
    }

    this.clear=function(){
        for (var i = 0; i < arrGraf3D.length; i++) {
            arrGraf3D[i].visible=false;
        }
    }    

                         
    this.drawObjWH=function(_t, _o, _w, _h){//как, что
        

    }


    var ppp;//Возврощаем элемент геометрии
    this.getClone=function(_o3d){
        var o;
        var bb=false;
        if(_o3d.children!=undefined){
            o=new THREE.Object3D()
            for (var i = 0; i<_o3d.children.length; i++) {
                ppp=this.getClone(_o3d.children[i]);
                if(ppp!=null){
                    if(_o3d.children[i].name!=undefined){
                       ppp.name= _o3d.children[i].name;
                    }
                    bb=true;
                    ppp.position.set(_o3d.children[i].position.x,_o3d.children[i].position.y,_o3d.children[i].position.z);
                    ppp.rotation.set(_o3d.children[i].rotation.x,_o3d.children[i].rotation.y,_o3d.children[i].rotation.z);
                    ppp.scale.set(_o3d.children[i].scale.x,_o3d.children[i].scale.y,_o3d.children[i].scale.z);
                    o.add(ppp);
                }
            }
        }
        if(bb!=true){            
            o=_o3d.clone();//.clone ()
            if(_o3d.name!=undefined){
               o.name= _o3d.name;
            }
            o.position.set(_o3d.position.x,_o3d.position.y,_o3d.position.z);
            o.rotation.set(_o3d.rotation.x,_o3d.rotation.y,_o3d.rotation.z);
            o.scale.set(_o3d.scale.x,_o3d.scale.y,_o3d.scale.z);
        }
        return o; 
    }
    


    //var strArr;
    this.setO=function(_o3d, name){       

        
    }

    this.setBool=function(b){        
       
    }
   
    this.getBool=function(){ 
       
    }
}
P02Graf3D.prototype = Object.create( THREE.Object3D.prototype );
P02Graf3D.prototype.constructor = P02Graf3D;
