


export function Graf3D() {
    THREE.Object3D.call( this );
    this.type = 'Graf3D';
    
    this.arrObj3d=[];//контейнеры
    this.arrPoved=[];//их поведение относительно хз

    this.pBlok;//Уникалдьный программный блок, по маркерам с модели

    this.oP;
    //создаюм и перехватываем контейнеры
    this.setObj=function(obj3d, oP){
        this.oP=oP;
        //this.add(obj3d); 
           
        for (var i = obj3d.children.length-1; i >=0 ; i--) {
            //if(i<6)
            this.setO(obj3d.children[i], obj3d.children[i].name)
        } 
    }

    this.setMaterial=function(_color){
       
        if(_color!=undefined){
            if(this.material!=undefined){                
                this.material.color=new THREE.Color(_color) 
            }else{
                if(this.children)
                for (var i = 0; i < this.children.length; i++) {
                    if(this.children[i].material!=undefined)this.children[i].material.color=new THREE.Color(_color) 
                }
            }

            for (var i = 0; i < this.arrObj3d.length; i++) {
                this.arrObj3d[i].setMaterial(_color)
            }
        }
    }


    //изменяем размеры блока
    this.drawWHD=function(_w, _h, _d){    
        if(this.pBlok!=undefined){
           this.pBlok.drawWHD(_w, _h, _d)
        }
       
        for (var i = 0; i < this.arrPoved.length; i++) {                     
            this.drawObjWHD(this.arrPoved[i], this.arrObj3d[i], _w, _h, _d)           
        }
    }

                         
    this.drawObjWHD=function(_t, _o, _w, _h, _d){//как, что
        if(_t.twh!=undefined){//передают обьекту если это обьект
            if(_o.type!=undefined){
                if(_o.type=='Graf3D'){
                    if(_t.twh=="na")_o.drawWHD(_w, _h, _d);  
                    if(_t.twh== "spm")_o.drawWHD(_w-_t.position.x*2, _h-_t.position.y*2, _d+_t.position.z*2);  
                }
            }
        }
       
        if(_t.arr!=undefined){//маштабы   
            for (var i = 0; i < _t.arr.length; i++) {       
                if(_t.arr[i][0]=="s"){//маштабы  
                    if(_t.arr[i][2]=="a"){//глобально увеличиваем от 100
                        if(_t.arr[i][1]=="x")_o.scale.x=_w/100;
                        if(_t.arr[i][1]=="y")_o.scale.y=_h/100;
                        if(_t.arr[i][1]=="z")_o.scale.z=_d/100;
                        if(_t.arr[i][1]=="v"){//все оси
                            _o.scale.x=_w/100;
                            _o.scale.y=_h/100;
                            _o.scale.z=_d/100;
                        }
                    }
                }

                if(_t.arr[i][0]=="z"){//позиции  
                    if(_t.arr[i][2]=="a"){//глобально здвигает
                        if(_t.arr[i][1]=="x")_o.position.x=_w;
                        if(_t.arr[i][1]=="y")_o.position.y=_h;
                        if(_t.arr[i][1]=="z")_o.position.z=-_d;
                    }
                    if(_t.arr[i][2]=="p"){//Здвигаем на половину
                        if(_t.arr[i][1]=="x")_o.position.x=_w/2;
                        if(_t.arr[i][1]=="y")_o.position.y=_h/2;
                        if(_t.arr[i][1]=="z")_o.position.z=-_d/2;
                    }
                }
            }
        }
    }//d28zypspm   d38zypspm


    var strArr;
    this.setO=function(_o3d, name){             
        var o=grafCreat.parserStroki(name, _o3d)
        if(o==null){
            this.add(_o3d);
            return;
        }        
        this.arrPoved.push(o);        
        if(name[0]=="s"){
           
            this.arrObj3d.push(_o3d);            
            this.add(_o3d);
        }

        if(name[0]=="d"){                  
            var g=new Graf3D();
            g.setObj(_o3d, o);

            this.arrObj3d.push(g);
            g.position.set(_o3d.position.x,_o3d.position.y,_o3d.position.z);
            g.rotation.set(_o3d.rotation.x,_o3d.rotation.y,_o3d.rotation.z);
            g.scale.set(_o3d.scale.x,_o3d.scale.y,_o3d.scale.z);
            this.add(g);           
        } 


        if(name[0]=="p"){             
            if(o.arr!=undefined){
               /* if(o.arr[0]=="p01"){  //дверь                  
                    this.pBlok=new P01Graf2D();
                }*/
                if(o.arr[0]=="p02"){ //серия обьектов                    
                    this.pBlok=new P02Graf3D();
                }
            }
            if(this.pBlok!=undefined){                
                this.pBlok.setObj(_o3d);

                this.pBlok.position.set(_o3d.position.x,_o3d.position.y,_o3d.position.z);
                this.pBlok.rotation.set(_o3d.rotation.x,_o3d.rotation.y,_o3d.rotation.z);
                this.pBlok.scale.set(_o3d.scale.x,_o3d.scale.y,_o3d.scale.z);
                this.arrObj3d.push(this.pBlok);                
                this.add(this.pBlok);
            }

            
        }


    }
}
Graf3D.prototype = Object.create( THREE.Object3D.prototype );
Graf3D.prototype.constructor = Graf3D;






export function P02Graf3D() {
    THREE.Object3D.call( this );
    this.type = 'P01Graf2D';


    var obj3d;


    var oClone;

    var arrGraf3D=[];

    //создаюм и перехватываем контейнеры
    this.setObj=function(_obj3d){ 
        obj3d=_obj3d;
        this.drawWHD(100, 100, 100);        
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
