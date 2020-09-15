/*
Расширяет класс Object3D
Визуализирует доску
}*/


//Doska3D = function(_material) {
	//THREE.Object3D.call( this );


import { Doska3D } from './Doska3D.js';

export class BoxTumba3D  {
    constructor(_material) { 
        var self=this
        this._width=50;
        this._height=100;
        this._depth=50;
        this._thickness = 1.6;
        this._otstup=0.3; 
        this._niz=4;

        this._ot=3.2;
        this._ot1=5.0;
        this._ot2=3.1;
        this._ot3=3.7;
        this._centBool=true;

        this._material=  _material;

        var geometry = new THREE.CylinderBufferGeometry( 0.2, 0.2, 0.1, 16 );
        var mat = new THREE.MeshPhongMaterial({color:0xbbbbbb});
        


        this.c3d = new THREE.Object3D();
        this.array = [];

        //this.c3d.position.z=222
        this.aa
       /* this.aa=new THREE.AxesHelper(300);
        this.c3d.add(this.aa); */   

        for (var i = 0; i < 6; i++) {
            this.array[i] = new Doska3D(this._material)
            this.c3d.add(this.array[i].c3d);
        }

        var sah=0
        this.arrP=[]
        this.clear = function(){
            sah=0           
            for (var i = 0; i < this.arrP.length; i++) {
                this.arrP[i].visible=false;
            }
        }

        this.getO = function(){
            if(this.arrP[sah]==undefined){
                this.arrP[sah]=new THREE.Mesh(geometry,mat)
                this.arrP[sah].rotation.z=Math.PI/2
                this.c3d.add(this.arrP[sah])
            }
            this.arrP[sah].visible=true;
            sah++;
            return this.arrP[sah-1]
        }
        var oo
        var oooot=0.8
        this.creatP = function(){
            this.clear()
            if(this.aa)this.aa.position.z=-this._depth/2
            let hh=0;           
            for (var i = 0; i < 100; i++) {
                hh=this._height/2-i*this._ot-this._ot1;

                if(hh>-this._height/2+this._thickness+this._niz){
                    oo=this.getO()
                    oo.position.x=this._width/2-this._thickness/2-oooot;                    
                    oo.position.y=hh;
                    oo.position.z=this._depth/2-this._ot2;

                    oo=this.getO()
                    oo.position.x=this._width/2-this._thickness/2-oooot;                    
                    oo.position.y=hh;
                    oo.position.z=-this._depth/2+this._ot3;

                    if(this._centBool==true){
                        oo=this.getO()
                        oo.position.x=this._width/2-this._thickness/2-oooot;                    
                        oo.position.y=hh;
                        oo.position.z=0; 
                    }

                    oo=this.getO()
                    oo.position.x=-this._width/2+this._thickness/2+oooot;                    
                    oo.position.y=hh;
                    oo.position.z=this._depth/2-this._ot2;

                    oo=this.getO()
                    oo.position.x=-this._width/2+this._thickness/2+oooot;                    
                    oo.position.y=hh;
                    oo.position.z=-this._depth/2+this._ot3;

                    if(this._centBool==true){
                        oo=this.getO()
                        oo.position.x=-this._width/2+this._thickness/2+oooot;                    
                        oo.position.y=hh;
                        oo.position.z=0; 
                    }



                }else{                    
                    break;
                }


            }
        }


        this.drag = function(){
            this.creatP()
            this.array[0].sahWidth=this._depth;
            this.array[0].width=this._height;
            this.array[0].depth=this._thickness
            this.array[0].height=this._depth;
            this.array[0].c3d.rotation.z=Math.PI/2
            this.array[0].c3d.position.x=-this._width/2+this._thickness/2;
            

            
            this.array[1].width=this._height;
            this.array[1].depth=this._thickness
            this.array[1].height=this._depth;
            this.array[1].sahWidth=this.array[1].height;

            this.array[1].c3d.rotation.z=-Math.PI/2
            this.array[1].c3d.position.x=this._width/2-this._thickness/2;


            this.array[2].width=this._width-this._thickness*2;
            this.array[2].depth=this._thickness
            this.array[2].height=this._depth;
            this.array[2].sahWidth=this.array[2].height;
            //this.array[2].c3d.rotation.z=-Math.PI/2
            this.array[2].c3d.position.y=this._height/2-this._thickness/2;

            this.array[3].width=this._width-this._thickness*2;
            this.array[3].depth=this._thickness
            this.array[3].height=this._depth;
            this.array[3].sahWidth=this.array[3].height;
            //this.array[2].c3d.rotation.z=-Math.PI/2
            if(this._niz>this._thickness)this.array[3].c3d.position.y=-this._height/2+this._thickness/2+this._niz;
            else{
                this.array[3].c3d.position.y=-this._height/2+this._thickness/2;
            }

            if(this._niz>this._thickness){
                this.array[4].c3d.visible=true;

                this.array[4].width=this._width-this._thickness*2;
                this.array[4].depth=this._thickness;
                this.array[4].height=this._niz; 
                this.array[4].sahWidth=this.array[4].width;        
                //this.array[4].c3d.position.y=-this._height/2+this._thickness/2+this._niz;

                this.array[4].c3d.position.z=this._depth/2-this._thickness;
                this.array[4].c3d.position.y=-this._height/2+this._niz/2;
                this.array[4].c3d.rotation.x=-Math.PI/2;
            }            
            else{
                this.array[4].c3d.visible=false;
            }

            this.array[5].sahWidth=this._width;
            this.array[5].width=this._height-1;
            this.array[5].depth=0.2
            this.array[5].height=this._width-1;
            this.array[5].c3d.rotation.x=Math.PI/2
            this.array[5].c3d.rotation.y=Math.PI/2
            this.array[5].c3d.position.z=-this._depth/2+0.5;


        } 

        this.korektMat= function(d3){

            //d3.restart(false,false,false,false,false,false,false,false,d3._height)
        }

        //this.drag()
/*
        let pObject=new DParamObject(main.glaf.dCont,255,300,function(){          
            //self.fun("visi3d");
            main.glaf.visi3D.intRend=1;

        });
        setTimeout(function() {
            pObject.addObject(self.array[0]);
        }, 10);*/

    }


    set height(value) {
        if(this._height!=value){
            this._height = value;
            
            this.drag();           

        }       
    }   
    get height() { return  this._height;}


    set width(value) {
        if(this._width!=value){
            this._width = value;
            this.drag();           
         

        }       
    }   
    get width() { return  this._width;}


    set depth(value) {
        if(this._depth!=value){
            this._depth = value;
            this.drag();
        }       
    }   
    get depth() { return  this._depth;}

    set thickness(value) {
        if(this._thickness!=value){
            this._thickness = value;
            this.drag();
        }       
    }   
    get thickness() { return  this._thickness;}


    set niz(value) {
        if(this._niz!=value){
            this._niz = value;
            this.drag();
        }       
    }   
    get niz() { return  this._niz;}

    set otstup(value) {
        if(this._otstup!=value){
            this._otstup = value;
            for (var i = 0; i < this.array.length; i++) {
                
                this.array[i].otstup=this._otstup;
                this.array[i].geometry._otstup=this._otstup;
                this.array[i]._otstup1=this._otstup;
                this.array[i].geometry._otstup1=this._otstup;
                this.array[i]._krai=this._otstup;
                this.array[i].geometry._krai=this._otstup;

                

            }
            this.drag();
        }       
    }   
    get otstup() { return  this._otstup;}







}