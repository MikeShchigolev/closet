

function GeometryRect(_x,_y,_w,_h) {
    this.x=_x||0;
    this.y=_y||0;
    this.width=_w||100;
    this.height=_h||100;
    this.visible=true;

    this.ynik=false;
    this.arrV=[0,0,0,0];
    this.arrTr=[];
    this.xYnik=-9999999999999999999999;
    this.kolTr=0;
    this.clear=function(){
        this.kolTr=0;
    }
    this.plusTr=function(x1,y1,x2,y2,x3,y3){
        if(this.arrTr[this.kolTr]==undefined)this.arrTr[this.kolTr]=new Trrrrr();
        this.arrTr[this.kolTr].set(x1,y1,x2,y2,x3,y3);
        this.arrTr[this.kolTr].uv.x=(x1-this.x)/this.width;
        this.arrTr[this.kolTr].uv.y=(y1-this.y)/this.height;

        this.arrTr[this.kolTr].uv1.x=(x2-this.x)/this.width;
        this.arrTr[this.kolTr].uv1.y=(y2-this.y)/this.height;

        this.arrTr[this.kolTr].uv2.x=(x3-this.x)/this.width;
        this.arrTr[this.kolTr].uv2.y=(y3-this.y)/this.height;

        this.kolTr++;
    }

    this.set=function(_x,_y,_w,_h){
        this.x=_x;
        if(_x==this.xYnik){
            this.x+=0.0001;
        }
        
        
        this.y=_y;
        this.width=_w;
        this.height=_h;
    }
    this.sagNap=function(p,num){
        switch(num) {                
            case 0: {
                p.x=this.x;
                p.y=this.y;
                break;
            }
            case 1: {
                p.x=this.x+this.width;
                p.y=this.y;
                break;
            }
            case 2: {
                p.x=this.x+this.width;
                p.y=this.y+this.height;
                break;
            }
            case 3: {
                p.x=this.x;
                p.y=this.y+this.height;
                break;
            }
            case 4: {
                p.x=this.x;
                p.y=this.y;
                break;
            }
        }
    }
}

function Trrrrr() {
    this.p=new THREE.Vector2();
    this.p1=new THREE.Vector2();
    this.p2=new THREE.Vector2();

    this.uv=new THREE.Vector2(Math.random(),Math.random());
    this.uv1=new THREE.Vector2(Math.random(),Math.random());
    this.uv2=new THREE.Vector2(Math.random(),Math.random());

    this.set=function(_x1,_y1,_x2,_y2,_x3,_y3){
        this.p.x=_x1;
        this.p.y=_y1;
        this.p1.x=_x2;
        this.p1.y=_y2;
        this.p2.x=_x3;
        this.p2.y=_y3;
    }
}