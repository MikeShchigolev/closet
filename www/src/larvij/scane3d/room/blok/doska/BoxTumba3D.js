/*
Расширяет класс Object3D
Визуализирует доску
}*/


//Doska3D = function(_material) {
	//THREE.Object3D.call( this );


import { Doska3D } from './Doska3D.js';

export class BoxTumba3D  {
    constructor(_material) { 

        this._width=100;
        this._height=100;
        this._depth=100;
        this._thickness = 1.6;
        this._otstup=0.3; 
        this._material=  _material;
 
        this.c3d = new THREE.Object3D();
        this.array = [];


        for (var i = 0; i < 6; i++) {
            this.array[i] = new Doska3D(this._material)
            this.c3d.add(this.array[i].c3d);

        }


        this.drag = function(){

            this.array[0].width=this._height;
            this.array[0].depth=this._depth;
            
            this.array[0].c3d.position.x=-this._width/2+this._thickness/2;
            
            this.array[0].c3d.position.z=this._depth/2;
        } 

        this.drag()

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
}