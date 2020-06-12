 
function SliderRect(cont3D) {
    var self=this;

    this._valueW=0;
    this._valueH=0; 
    this._valueD=0;      
    this.cont3D=new THREE.Object3D();
    cont3D.add(this.cont3D);
    this.content3D=new THREE.Object3D();
    this.cont3D.add(this.content3D);


    this.funUp;
    this.slidUp;
    this.boxHelper=new BoxHelper();
    this.content3D.add(this.boxHelper);
    this._otstup=0;
    this.arrSlid=[];
    this.arrBox=[];
    this.sahDosk=12.5;  
    for (var i = 0; i < 3; i++) {
        this.arrSlid[i]=new Slider3D(this.content3D, function(){
            self.dragSlid(this.nameId);
        });
        this.arrSlid[i].nameId=i;
        this.arrSlid[i].funUp=function(){
            self.funUpSlid(this.nameId);
        };
        this.arrBox[i]=new THREE.Mesh(js103.boxGeometry,js103.material1);
        this.content3D.add(this.arrBox[i]);
        this.arrBox[i].scale.set(js103.whd*0.8,js103.whd*0.8,js103.whd*0.8)

        
    }
    this.arrSlid[2].rotation.y=Math.PI/2;    
    this.arrSlid[1].rotation.z=Math.PI/2;
    this.arrBox[2].rotation.y=Math.PI/2; 
    this.arrBox[1].rotation.z=Math.PI/2;

    var pp;

    this.funUpSlid=function(num){
        this._valueW=
        self.slidUp=num;        
        if(self.funUp!=undefined)self.funUp();
    }

    this.dragSlid=function(num){
        
        if(num==0){
            pp=this.arrSlid[num].value/100*this.arrSlid[num].width+this._objMM.x;
            if(pp<this._objMM.x)pp=this._objMM.x;
            self.restartWHD(pp,null,null);
        }
        if(num==1){
            pp=this.arrSlid[num].value/100*this.arrSlid[num].width+this._objMM.y;
            if(pp<this._objMM.y)pp=this._objMM.y;
            self.restartWHD(null,pp,null);
        }
        if(num==2){
            pp=this.arrSlid[num].value/100*this.arrSlid[num].width+this._objMM.z;
            pp=Math.round((pp)/this.sahDosk)*this.sahDosk;
            if(pp<this._objMM.z)pp=this._objMM.z;
            self.restartWHD(null,null,pp);
        }
    }


    this._visible=true;
    this._activ=true;

    this._width=100;
    this._height=100;
    this._depth=100;

    

    this._objMM={x:200, x1:800, y:200, y1:800,z:250, z1:400};

    this.drawWHD=function(){
        this.boxHelper._width=this._width+this._otstup;
        this.boxHelper._depth=this._height+this._otstup;
        this.boxHelper._height=this._depth-1;
        this.boxHelper.height=this._depth;
        this.boxHelper.position.set((this._width+this._otstup)/2,(this._height+this._otstup)/2,-this._depth/2);

        this.arrSlid[0].value=((this._width-this._objMM.x)/this.arrSlid[0].width)*100;
        this.arrSlid[1].value=((this._height-this._objMM.y)/this.arrSlid[1].width)*100;
        this.arrSlid[2].value=((this._depth-this._objMM.z)/this.arrSlid[2].width)*100;

        this.arrSlid[0].position.set(this._otstup+this._objMM.x,0,0);
        this.arrSlid[1].position.set(0,this._otstup+this._objMM.y,0);
        this.arrSlid[2].position.set(0,0,-this._objMM.z);

        //this.arrSlid[0].position.set(-this._otstup,-this._otstup,0);
        //this.arrSlid[1].position.set(-this._otstup,-this._otstup,0);
        //this.arrSlid[2].position.set(-this._otstup,-this._otstup,0);
           
        /*if(this._tipSlid==1){
            this.arrSlid[0].position.set(0,this._height,0);
            this.arrSlid[1].position.set(0,this._height,0);
            this.arrSlid[2].position.set(0,this._height,0);
        } */

        visi3D.intRend=1;
    }

    this.bigWHD=function(o){
        if(o!=undefined)this._objMM=o;
        this.arrSlid[0].width=this._objMM.x1-this._objMM.x;
        this.arrSlid[1].width=this._objMM.y1-this._objMM.y;
        this.arrSlid[2].width=this._objMM.z1-this._objMM.z;

        this.arrBox[0].scale.x=(this._objMM.x+this._otstup);
        this.arrBox[0].position.x=(this._objMM.x+this._otstup)/2;

        this.arrBox[1].scale.x=(this._objMM.y+this._otstup);
        this.arrBox[1].position.y=(this._objMM.y+this._otstup)/2;

        this.arrBox[2].scale.x=this._objMM.z;
        this.arrBox[2].position.z=-this._objMM.z/2;
    }
    this.bigWHD();

    this.restartWHD=function(w,h,d){
        if(w!=null)this._width=w;
        if(h!=null)this._height=h;
        if(d!=null)this._depth=d;
        
        this.drawWHD();
    }

    this.restartWHD(100,100,100);

    /*
    this.test=function(){
        var y=0;

        var wind = new Window(main.stage, 100, 100,"Настройки коробки");
        wind.width = 200;
        wind.height = 400;

        var b=new CheckBox(wind.content, 5, y+=25,"visible",function(){
            self.visible=this.value;
        })
        var b1=new CheckBox(wind.content, 5, y+=25,"activ",function(){

        })
        var b2=new PushButton(wind.content, 5, y+=25,"test Gran",function(){

        });
        var b3=new InputHTML(wind.content, 5, y+=25,"200,400,200,500,200,600",function(){

        });        
        var b4=new HSliderBig(wind.content, 5, y+=25,"w",function(){
            self.restartWHD(this.value,null,null);

        },100,500);
        var b5=new HSliderBig(wind.content, 5, y+=25,"h",function(){
            self.restartWHD(null,this.value,null);
        },100,500);
        var b6=new HSliderBig(wind.content, 5, y+=25,"d",function(){
            self.restartWHD(null,null,this.value);
        },100,500);

        
        var b6=new HSliderBig(wind.content, 5, y+=25,"otstup",function(){
            self.otstup=this.value;
        },0,100);


    }

    this.test();*/


    

}
SliderRect.prototype = {
    set activ (v) {
        if(this._activ==v)return;
        this._activ=v      
                
    },
    get activ () {
        return this._activ;
    },
    set visible (v) {
        if(this._visible==v)return;
        this._visible=v;
        this.content3D.visible=v;
        visi3D.intRend=0;              
    },
    get visible () {
        return this._visible;
    },

    set otstup (v) {
        if(this._otstup==v)return;
        this._otstup=v;
        this.bigWHD();
        this.restartWHD(null,null,null); 
        this.content3D.position.set(-this._otstup,-this._otstup,0)             
    },
    get otstup () {
        return this._otstup;
    },


}