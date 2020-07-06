
export function ColiPlus(par, collision, storona, storona1) {
	var self = this;
	this.par=par;
	this.collision=collision;
	this.storona=storona;
	this.storona1=storona1;


	var box
    var yyy,zzz,xxx,pB;

    this.rect= {x: 0, y: 0, width: 100, height: 100}; 
    this.rectG= {x: 0, y: 0, width: 100, height: 100}; 









	this.testR=function(r,r1){			
		

		if(this.testLine(r.x, r.x+r.width, r1.x, r1.x+r1.width)){
			
			if(this.testLine(r.y, r.y+r.height, r1.y, r1.y+r1.height)){
				return true;					
			}				
		}

		return false
	}




	
	this.testLine=function(p,p1,p2,p3){		
		if(p3<p)return false
		if(p1<p2)return false	
		return true	
	}



	this.getKriu=function(y,y1,d,a){ 
		
		for (var i = 0; i < this.collision.colozi.arrBox.length; i++) {
			box=this.collision.colozi.arrBox[i];
			
			if(box.boolZ==true){
			
				if(this.storona==0){
                    zzz=this.collision.colozi.bigBox.width -( box.x+box.width);                        
                    this.rect.x=0;  
                    this.rect.width=box.depth; 
                }                              
                if(this.storona==1){
                    zzz=box.x;

                    this.rect.x=this.par.colozi.bigBox.width-(box.depth);  
                    this.rect.width=box.depth;  
                }

                
                if(d>zzz){
                	a.push(this.rect.x,this.rect.x+this.rect.width)
                }


            }
        }

	}




	
	this.redactBox=function(rectCM){
		
		/*if(rectCM.parent.idArr==4){
			rectCM.rectCollisMeshdy.x=10
		}*/
		
		if(rectCM.rectCollisMeshdy.boolZ==true){
			
			for (var i = 0; i < this.collision.colozi.arrBox.length; i++) {
				box=this.collision.colozi.arrBox[i];
				if(box.boolZ==true){
				
					if(this.storona==0){
                        zzz=this.collision.colozi.bigBox.width -( box.x+box.width);                        
                        this.rect.x=0;  
                        this.rect.width=box.depth; 
                    }                              
                    if(this.storona==1){
                        zzz=box.x;

                        this.rect.x=this.par.colozi.bigBox.width-(box.depth);  
                        this.rect.width=box.depth;  
                    }




                    if(rectCM.rectCollisMeshdy.depth>zzz){
                    	this.rect.y=box.y;
                    	this.rect.height=box.height;
                    	
                    	this.rectG.x=rectCM.rectCollisMeshdy.x;
                    	this.rectG.y=rectCM.rectCollisMeshdy.y;

                    	this.rectG.width=rectCM.rectCollisMeshdy.width;
                    	this.rectG.height=rectCM.rectCollisMeshdy.height;

                    	if(rectCM.parent.type=="BTumba"){
                    		this.rectG.y=0
                    	}


                    	if(this.testR(this.rectG, this.rect)==true){
						
							if(this.storona==1){
								rectCM.rectCollisMeshdy.x=this.rect.x-rectCM.rectCollisMeshdy.width
							}
							if(this.storona==0){
								rectCM.rectCollisMeshdy.x=this.rect.width//-rectCM.rectCollisMeshdy.width
							}
                    	}
                    	
                    }


					
				}
			}			
		}




	}

}

ColiPlus.prototype = {

	/*set isCollisionAvtive(v) {
		this._isCollisionAvtive = v;
	},

	get isCollisionAvtive() {
		this.upData();
		return this._isCollisionAvtive;
	},*/


}; 