function GeometryDoska() { 
	THREE.BufferGeometry.call( this );
	this.type = 'GeometryDoska';

	this._width=100;
	this._height=10;
	this._depth=5;
	this._sahWidth=64;
	this._sahRandomWidth=this._sahWidth*Math.random();
	
	this._otstup=2;
	this._otstup1=2;

	this._krai=1;
	this.okrug=100;


	var arrWidth=[];
	var arrHeight=[];	
	var arrDepth=[];

	
	var positions = new Float32Array(0);		
	var normals = new Float32Array(0);
	var uv = new Float32Array(2);	

	
	var ii,jj,kk,sah,sah2,kolP,kolP2,kolW;
	var w,w1,w2,h,h1,h2,d,d1,d2,boolR,_u,_u1,_u2,_v,_v1,_v2;
	var boolR=true;
	var arrU=[];
	var arrV=[];
	var arrSahX=[];
	var arrSahU=[];

	//наполняем опорные массивы
	this.poiskOpor = function(){ 
		//опоры по width//////////////////////////////////////////////////////
		arrWidth[0]=Math.round(this._width/2*this.okrug)/this.okrug;
		arrWidth[1]=Math.round((this._width/2-this._otstup)*this.okrug)/this.okrug;
		arrWidth[2]=Math.round((this._width/2-this._otstup1)*this.okrug)/this.okrug;
		
		//опоры по height
		arrHeight[0]=Math.round(this._height/2*this.okrug)/this.okrug;
		arrHeight[1]=Math.round((this._height/2-this._krai)*this.okrug)/this.okrug;
		arrHeight[2]=Math.round((this._height/2-this._otstup)*this.okrug)/this.okrug;
		arrHeight[3]=Math.round((this._height/2-this._otstup1)*this.okrug)/this.okrug;

		//опоры по depth
		arrDepth[0]=Math.round(this._depth/2*this.okrug)/this.okrug;
		arrDepth[1]=Math.round((this._depth/2-this._krai)*this.okrug)/this.okrug;
		

		arrV[0]=(this._krai/(this._height));
		arrV[1]=(this._otstup/(this._height));
		arrV[2]=(this._otstup1/(this._height));

		arrU[0]=(this._krai/(this._depth));
		arrU[1]=(this._otstup/(this._depth));
		arrU[2]=(this._otstup1/(this._depth));

		
		arrSahX[0]=-this._width/2+this._otstup;
		arrSahU[0]=this._sahRandomWidth/this._sahWidth;
		arrSahX[1]=arrSahX[0]+(this._sahWidth-this._sahRandomWidth);
		arrSahU[1]=1;

		kolW=1;
		for (ii = 2; ii < 1000000; ii+=2) {
			if(arrSahX[ii-1]>this._width/2-this._otstup1){
				jj=arrSahX[ii-1]-(this._width/2-this._otstup1);
				arrSahX[ii-1]=this._width/2-this._otstup1;
				arrSahU[ii-1]=(this._sahWidth-jj)/this._sahWidth;
				break;
			}else{
				arrSahX[ii]=arrSahX[ii-1];
				arrSahU[ii]=0;
				arrSahX[ii+1]=arrSahX[ii-1]+this._sahWidth;
				arrSahU[ii+1]=1;
				kolW++;
			}			
		}
	}

	
	
	
	//наполняем геометрию
	this.poiskOporPoint = function(){ 
		//наполняем опоры

		kolP2=2*8*kolW;
		kolP=4*2*7;//Количество треугольников		
		kolP2+=kolP;
		if(positions.length<kolP2*9){//новый
			

			positions=new Float32Array((kolP2)*9); 
			this.addAttribute( 'position', new THREE.BufferAttribute(positions, 3 ));

			uv=new Float32Array((kolP2)*6);
			this.addAttribute( 'uv', new THREE.BufferAttribute( uv, 2 ) );

			normals	=new Float32Array((kolP2)*9); 		
			this.addAttribute( 'normal', new THREE.BufferAttribute(normals, 3 ));
			
		}else{//старый
			for (var i = 0; i < positions.length; i++) {
				positions[i]=0;
			};			
		}


		//////////////////
		sah=0;
		sah2=0;

		
		
		boolR=false;

		//////////////
		for (kk = 0; kk < 2; kk++) {
			if(kk==0){
				d=arrDepth[0];
				d1=arrDepth[1];
				h=-arrHeight[0];
				h1=-arrHeight[1];
				
			}else{
				d=-arrDepth[0];
				d1=-arrDepth[1];
				h=arrHeight[0];
				h1=arrHeight[1];
				
			}
		
			for (ii = 0; ii < kolW*2; ii+=2) {//по сторонам 4-ем				
				this.plusTerri(	arrSahX[ii],-d,h1, 	arrSahX[ii+1],-d,h1,	arrSahX[ii+1],-d1,h, 
								0, arrSahU[ii],0, 	arrSahU[ii+1], 			arrU[0],arrSahU[ii+1]);

				this.plusTerri(	arrSahX[ii],-d,h1, 	arrSahX[ii+1],-d1,h,	arrSahX[ii],-d1,h,	
								0, arrSahU[ii],		arrU[0],arrSahU[ii+1], 	arrU[0], arrSahU[ii]);

				//3
				this.plusTerri(	arrSahX[ii],-d1,h, 	arrSahX[ii+1],-d1,h,	arrSahX[ii+1], d1,h, 
								arrU[0], arrSahU[ii],arrU[0],arrSahU[ii+1], 1-arrU[0],arrSahU[ii+1]);
				//4
				this.plusTerri(	arrSahX[ii],-d1,h, 	arrSahX[ii+1], d1,h, 	arrSahX[ii], d1,h, 
								arrU[0], arrSahU[ii],1-arrU[0],arrSahU[ii+1], 1-arrU[0],arrSahU[ii]);

				//5
				this.plusTerri(	arrSahX[ii], d1,h,	arrSahX[ii+1], d1,h, 	arrSahX[ii+1], d,h1, 
								1-arrU[0],arrSahU[ii],	1-arrU[0],arrSahU[ii+1], 1,arrSahU[ii+1]);

				//6
				this.plusTerri(	arrSahX[ii], d1,h,	arrSahX[ii+1], d,h1, arrSahX[ii], d,h1, 
								1-arrU[0],arrSahU[ii],	1,arrSahU[ii+1], 1,arrSahU[ii]);
				//7
				this.plusTerri(	arrSahX[ii], d,h1,	arrSahX[ii+1], d,h1,arrSahX[ii+1], d,-h1,
								1,arrSahU[ii],1,arrSahU[ii+1], 0,arrSahU[ii+1]);
				//8
				this.plusTerri(	arrSahX[ii], d,h1,	arrSahX[ii+1], d,-h1,arrSahX[ii], d,-h1,
								1,arrSahU[ii],0,arrSahU[ii+1], 	0,arrSahU[ii]);
			}
		}
		



				
	
		for (ii = 0; ii < 4; ii++) {//по сторонам 4-ем
			//по ширене
			if(ii==0||ii==3){				
					w=-arrWidth[0];
					w1=-arrWidth[1];				
				//по высоте
				if(ii<2){
					h=arrHeight[0];
					h1=arrHeight[2];
					h2=arrHeight[1];
					_v=arrV[0];
					_v1=arrV[1];
					_v2=0;

				}else{
					h=-arrHeight[0];
					h1=-arrHeight[2];
					h2=-arrHeight[1];
					_v=1-arrV[0];
					_v1=1-arrV[1];
					_v2=1;						
				}
			}else{				
				w=arrWidth[0];
				w1=arrWidth[2];				
				//по высоте
				if(ii<2){
					h=arrHeight[0];
					h1=arrHeight[3];
					h2=arrHeight[1];
					_v=arrV[0];
					_v1=arrV[2];
					_v2=0;
					
				}else{
					h=-arrHeight[0];
					h1=-arrHeight[3];
					h2=-arrHeight[1];
					_v=1-arrV[0];
					_v1=1-arrV[2];
					_v2=1;					
				}
			}			

			for (jj = 0; jj < 2; jj++) {//по глубине
				if(jj==0){
					d=arrDepth[0];
					d1=arrDepth[1];
					if(ii==0||ii==2){
						boolR=true;
						_u=1-arrU[0];
						_u1=1-arrU[1];
						_u2=1;
					}else{
						boolR=false;
						_u=1-arrU[0];
						_u1=1-arrU[1];
						_u2=1;
					}					
				}else{
					d=-arrDepth[0];
					d1=-arrDepth[1];
					if(ii==0||ii==2){
						boolR=false;
						_u=arrU[0];
						_u1=arrU[1];
						_u2=0;
					}else{
						boolR=true;
						_u=arrU[0];
						_u1=arrU[1];
						_u2=0;
					}
				}						
				//0
				this.plusTerri(	w,0,0, 	w,0,h1,	 w,d1,h1,	0.5, 0.5,	0.5, _v1, 	_u1, _v1);				
				//1
				this.plusTerri( w,0,0, 	w,d1,h1, w,d1,0, 	0.5, 0.5, 	_u1, _v1, 	_u1, 0.5);
				//2
				this.plusTerri(w,d1,0,	w,d1,h1, w1,d,h2, 	_u1, 0.5, 	_u1, _v1, 	_u2,_v);
				//3	
				this.plusTerri( w,d1,0,	w1,d,h2, w1,d,0, 	_u1, 0.5,  	_u2,_v, 	_u2,0.5);
				//4
				this.plusTerri(w,0,h1,  w1,0,h,	w1,d1,h, 	0.5, _v1,  	0.5, _v2,  	_u1, _v2);
				//5
				this.plusTerri(	w,0,h1,	w1,d1,h, w,d1,h1, 	0.5, _v1,	_u1, _v2, 	_u1, _v1);
				//6	
				this.plusTerri(	w,d1,h1, w1,d1,h, w1,d,h2,  _u1, _v1, 	_u1, _v2, 	_u2, _v);
			}
		}
		

		
		this.attributes.position.needsUpdate = true;
		this.attributes.uv.needsUpdate = true;
		this.computeVertexNormals();
		this.attributes.normal.needsUpdate = true;
	}

	this.plusTerri= function(x,y,z,	x1,y1,z1,	x2,y2,z2,	u,v,	u1,v1,	u2,v2){
		
		if(boolR==true){
			positions[sah]=x;
			positions[sah+1]=y;
			positions[sah+2]=z;

			positions[sah+3]=x1;
			positions[sah+4]=y1;
			positions[sah+5]=z1;

			positions[sah+6]=x2;
			positions[sah+7]=y2;
			positions[sah+8]=z2;
			
			uv[sah2]=u;
			uv[sah2+1]=v;

			uv[sah2+2]=u1;
			uv[sah2+3]=v1;

			uv[sah2+4]=u2;
			uv[sah2+5]=v2;
		}else{
			
			positions[sah]=x1;
			positions[sah+1]=y1;
			positions[sah+2]=z1;

			positions[sah+3]=x;
			positions[sah+4]=y;
			positions[sah+5]=z;

			positions[sah+6]=x2;
			positions[sah+7]=y2;
			positions[sah+8]=z2;
			
			uv[sah2]=u1;
			uv[sah2+1]=v1;

			uv[sah2+2]=u;
			uv[sah2+3]=v;

			uv[sah2+4]=u2;
			uv[sah2+5]=v2;
		}

		sah+=9;
		sah2+=6;
	}

	//создают или пересоздают геометрию
	this.update = function(){		
		this.poiskOpor();//наполняем опорные массивы
		this.poiskOporPoint();//наполняем геометрию
	}


	this.update();

	this.restart = function(w,h,d,o,o1,k,sw,srw){
		this._width=w;
		this._height=h;
		this._depth=d;
		this._otstup=o;
		this._otstup1=o1;
		this._krai=k;
		this._sahWidth=sw;
		this._sahRandomWidth=srw;
	}


	Object.defineProperty(this, "sahWidth", {
		set : function(value){
			if(this._sahWidth!=value){
				this._sahWidth = value;
				this.update();
			}					
		},
		get : function() { return this._width; }
	});	
	Object.defineProperty(this, "krai", {
		set : function(value){
			if(this._krai!=value){
				this._krai = value;
				this.update();
			}					
		},
		get : function() { return this._width; }
	});

	Object.defineProperty(this, "otstup", {
		set : function(value){
			if(this._otstup!=value){
				this._otstup = value;
				this.update();
			}					
		},
		get : function() { return this._width; }
	});

	Object.defineProperty(this, "otstup1", {
		set : function(value){
			if(this._otstup1!=value){
				this._otstup1 = value;
				this.update();
			}					
		},
		get : function() { return this._width; }
	});


	Object.defineProperty(this, "width", {
		set : function(value){
			if(this._width!=value){
				this._width = value;
				this.update();
			}					
		},
		get : function() { return this._width; }
	});
	Object.defineProperty(this, "height", {
		set : function(value){
			if(this._height!=value){
				this._height = value;
				this.update();
			}					
		},
		get : function() { return this._height; }
	});
	Object.defineProperty(this, "depth", {
		set : function(value){
			if(this._depth!=value){
				this._depth = value;
				this.update();
			}					
		},
		get : function() { return this._depth; }
	});
	
}
GeometryDoska.prototype = Object.create( THREE.BufferGeometry.prototype );
GeometryDoska.prototype.constructor = GeometryDoska;