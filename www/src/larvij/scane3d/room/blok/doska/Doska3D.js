/*
Расширяет класс Object3D
Визуализирует доску
}*/


//Doska3D = function(_material) {
	//THREE.Object3D.call( this );


import { GeometryDoska } from './GeometryDoska.js';
export class Doska3D  {
    constructor(_material) {    
 




    	this.geometry=new GeometryDoska();
    	this.c3d=new THREE.Mesh(this.geometry, _material);
    	

    	this._sahWidth=512;
    	this._sahRandomWidth=0;
    	this._otstup=0.3;
    	this._otstup1=0.3;
    	this._krai=0.3;

    	this._width=100;
    	this._height=100;
    	this._depth=100;
    	
    	var posInd=new Position();
        var point, point2,point3, sah;
    	var arrPosition, arrPos;
        var length;
        var index;
        this.arP=[];
    	var localLP= new LinePosition();//перенесоная линия
    	this.lt =new LinePosition();//треугольники по максимумам
        this.lt1=new LinePosition(); 
        var storona=false;
        this.pointMin=new Position();
        this.pointMax=new Position();
        this.pointP=new Position();

        var arrPoint=[new Position(),new Position(),new Position(),new Position(),new Position()];
        
        this.distMin=0;
        this.distMax=0;
        this.distP=0;




    	this.zdvig = function (lp) {


            localLP.p.set(lp.p.x  -  this.position.x, lp.p.y -this.position.z);
            localLP.p1.set(lp.p1.x - this.position.x, lp.p1.y-this.position.z);    
            localLP.p2.set(lp.p2.x - this.position.x, lp.p2.y-this.position.z);

            if(this.isNaLine(localLP)==false){
                
                return;
            }
            
            storona=true;
            aa=calc.getTreeAngel(localLP.p, localLP.p1, localLP.p2) ;
            if(aa>0)storona=false;
            
            if(this.poiskKrai(localLP)==false){           
                return;
            }
            
            this.arP=[];
            arrPos = this.geometry.positions;        
            length = arrPos.length;
            
            for (var ii = 0; ii < length; ii+=3) {
                posInd.set(arrPos[ii], arrPos[ii+2]);
                point2=this.testPoint(posInd);
                if(point2!=null){//смещаем товарища  
                    //коректируем максимальное смещение
                    this.distP=calc.getDistance(point2, localLP.p);
                    if(this.distP<this.distMin){
                        point2.x=this.pointMin.x;
                        point2.y=this.pointMin.y;
                       
                    }else{
                        if(this.distP>this.distMax){
                            point2.x=this.pointMax.x;
                            point2.y=this.pointMax.y;
                        }
                    }
                    arrPos[ii]=point2.x;
                    arrPos[ii+2]=point2.y;
                    this.arP.push(point2.x, point2.y);
                }        
            } 
           

        }
       	this.update = function(){         
       		this.geometry.update();
       	}
        
        this.korectBondi = function(){    	
        	this.lt.p.set(this.geometry.boundingBox.min.x,this.geometry.boundingBox.min.z);
        	this.lt.p1.set(this.geometry.boundingBox.max.x,this.geometry.boundingBox.min.z);
        	this.lt.p2.set(this.geometry.boundingBox.max.x,this.geometry.boundingBox.max.z);

        	this.lt1.p.set(this.geometry.boundingBox.min.x,this.geometry.boundingBox.min.z);
        	this.lt1.p1.set(this.geometry.boundingBox.max.x,this.geometry.boundingBox.max.z);
        	this.lt1.p2.set(this.geometry.boundingBox.min.x,this.geometry.boundingBox.max.z);

        	arrPoint[0].set(this.geometry.boundingBox.min.x, this.geometry.boundingBox.min.z);
            arrPoint[1].set(this.geometry.boundingBox.max.x, this.geometry.boundingBox.min.z);
            arrPoint[2].set(this.geometry.boundingBox.max.x, this.geometry.boundingBox.max.z);
            arrPoint[3].set(this.geometry.boundingBox.min.x, this.geometry.boundingBox.max.z);
            arrPoint[4].set(this.geometry.boundingBox.min.x, this.geometry.boundingBox.min.z);
        }

        this.isNaLine = function (lp) {
            b=calc.isLineInTriangle(this.lt.p,  this.lt.p1,     this.lt.p2,    lp.p,   lp.p1);
            if(b!=false)return true;
            b=calc.isLineInTriangle(this.lt1.p, this.lt1.p1,    this.lt1.p2,   lp.p,   lp.p1);
            if(b!=false)return true;
            
            b=calc.isInTriangle(this.lt.p, this.lt.p1,    this.lt.p2,   lp.p);
            if(b!=false)return true;

            b=calc.isInTriangle(this.lt1.p, this.lt1.p1,    this.lt1.p2,   lp.p);
            if(b!=false)return true;
            return false;
        };


    	this.poiskKrai =function(lp){     
            this.distMin=-1;
            this.distMax=-1;       
            for (var i = 0; i < 4; i++) {
                point3=calc.getPointOfIntersection(arrPoint[i],arrPoint[i+1], lp.p, lp.p1);
                if(point3!=null){
                    if(this.distMin==-1){
                        this.distMin=calc.getDistance(point3, lp.p);
                        this.pointMin.setPoint(point3);
                    }else{
                        this.distMax=calc.getDistance(point3, lp.p);
                        this.pointMax.setPoint(point3);
                    }
                }
            }
            
            if(this.distMin==-1)return false;
            if(this.distMax==-1){
                this.distMax=this.distMin;
                this.pointMax.setPoint(this.pointMin);
            }
           
            if(this.distMin>this.distMax){//поворачиваем            
                this.distP=this.distMax;//времянке
                this.pointP.setPoint(this.pointMax);            
                this.distMax=this.distMin;
                this.pointMax.setPoint(this.pointMin);
                this.distMin=this.distP;
                this.pointMin.setPoint(this.pointP); 
            }        

            return true;
        }
        var bb=true;    
        this.testPoint =function(_p){       
            bb=true;
            aaa=calc.getTreeAngel(localLP.p, localLP.p1,_p);        
            if(aaa>0){
                if(storona!=true)return null;              
            }else{
                if(storona!=false)return null;
            }        
            point = calc.getPointOfIntersection(localLP.p, localLP.p1, localLP.p2, _p);
            if(point){            
                return point;
            }
        };


    	this.restart = function(w,h,d,o,o1,k,sw,srw){ 
    		if(!w)w=this._width;
    		if(!h)h=this._height;
    		if(!d)d=this._depth;
    		if(!o)o=this._otstup;
    		if(!o1)o1=this._otstup1;
    		if(!k)k=this._krai;
    		if(!sw)sw=this._sahWidth;
    		if(!srw)srw=this._sahRandomWidth;
           
    		this.geometry.restart(w,h,d,o,o1,k,sw,srw);
            this.geometry.update();
    		this.korectBondi();

    	}
    	this.restart();

    }


    set otstup(value) {
        if(this._otstup!=value){
            this._otstup = value;
            this.geometry.otstup = value;
            this.korectBondi();           

        }       
    }   
    get otstup() { return  this._otstup;}

    set otstup1(value) {
        if(this._otstup1!=value){
            this._otstup1 = value;
            this.geometry.otstup1 = value;
            this.korectBondi();           

        }       
    }   
    get otstup1() { return  this._otstup1;}

    set krai(value) {
        if(this._krai!=value){
            this._krai = value;
            this.geometry.krai = value;
            this.korectBondi();           

        }       
    }   
    get krai() { return  this._krai;}

    set sahWidth(value) {
        if(this._sahWidth!=value){
            this._sahWidth = value;
            this.geometry.sahWidth = value;
            this.korectBondi();           

        }       
    }   
    get sahWidth() { return  this._sahWidth;}

    set sahRandomWidth(value) {
        if(this._sahRandomWidth!=value){
            this._sahRandomWidth = value;
            this.geometry.sahRandomWidth = value;
            this.korectBondi();           

        }       
    }   
    get sahRandomWidth() { return  this._sahRandomWidth;}

    set height(value) {
        if(this._height!=value){
            this._height = value;
            this.geometry.height = value;
            this.korectBondi();           

        }       
    }   
    get height() { return  this._height;}

    set width(value) {
        if(this._width!=value){
            this._width = value;
            this.geometry.width = value;
            this.korectBondi();           

        }       
    }   
    get width() { return  this._width;}

    set depth(value) {
        if(this._depth!=value){
            this._depth = value;
            this.geometry.depth = value;
            this.korectBondi();           

        }       
    }   
    get depth() { return  this._depth;}
}

export class LinePosition  {
    constructor(_p,_p1) {   
        this.p=_p||new Position();
        this.p1=_p1||new Position();
        this.p2=new Position();
        this.status=0;
        this.perpendik=true;
        this.angel=0;
        this.set=function(_p,_p1){
            this.p=_p||0;
            this.p1=_p1||0;
        }
        this.setPoint=function(_p){
            this.p.setPoint(_p.p);
            this.p1.setPoint(_p.p1);
            this.p2.setPoint(_p.p2);
        } 
    }
}