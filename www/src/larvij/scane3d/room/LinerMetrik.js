/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


отсечение коробок маркера
*/

export class LinerMetrik  {
    constructor(sten) {         
        this.type="LinerMetrik";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.par=sten;
        this._active=sten._lmActive;    
        this.content3d = new THREE.Object3D();    
        sten.content3d.add(this.content3d);
        this.content3d.visible=this._active;
        /*this.axS = new THREE.AxesHelper(50)
        this.content3d.add(this.axS);*/
        this.arrBox=[]; 
        this.arrText=[];  
        this.gBox=new THREE.BoxBufferGeometry( 1, 1, 1 )
        this.materialBox = new THREE.MeshPhongMaterial({
            color:0x999999
        }); 
        var arrow,bb;
        var aP=[]
        var aP1=[]
        var maxWidth 
        var blok
        var mesh,text

        var sizeText=10
        this.upDate=function() {
            if(this._active==false)return;
            this.clear()
            this.sortik()
            this.vertikal()
            this.gorizont()
        }

        this.gorizont=function() {

            for (var i = 0; i < aP.length; i++) {
                if(aP[i]!=0){
                    mesh=this.getBox()
                    mesh.position.set(aP[i]/10,this.par.height/2,0)
                    mesh.scale.set(1,this.par.height,1) 

                    text=this.getText()
                    text.text=aP[i]+""
                    text.object3d.rotation.z=Math.PI/2
                    
                    text.object3d.position.y=-text._width - sizeText/2//this.par.height+sizeText/2
                    text.object3d.position.x=aP[i]/10-sizeText/2
                }
            }
        }  

        var pp
        this.vertikal=function() {
            for (var i = 0; i < aP1.length; i++) {
                if(aP1[i]!=0){
                    mesh=this.getBox()
                    mesh.position.set(this.par.width/2,aP1[i]/10,0)
                    mesh.scale.set(this.par.width,1,1)  
                    pp=0;
                    if(aP1[i]==0)pp=sizeText/2                    
                    text=this.getText()                
                    text.text=aP1[i]+""
                    text.object3d.rotation.z=0
                    text.object3d.position.y=aP1[i]/10+sizeText/2
                    text.object3d.position.x=- text._width-sizeText/2-pp
                }   
            }
        } 


        this.sortik=function() {           
            aP=[]
            aP1=[]
            aP.push(0);
            aP1.push(0);
            var x,x1
            maxWidth=70
            for (var i = 0; i < this.par.children.length; i++) {
                bb=true;
                blok=this.par.children[i]
                    if(blok.type=="BPieceTop"){
                    for (var j = 0; j < blok.visiNisu.array.length; j++) {
                        if(blok.visiNisu.array[j].visible==true){
                            x=blok.boxColizi.position._x+this.par.children[i].visiNisu.array[j].x
                            aP.push(x) 
                        }                        
                    }
                    for (var j = 0; j < blok.children.length; j++) {
                        x=blok.boxColizi.position._y+blok.children[j].boxColizi.rectCollisMeshdy.y
                        aP1.push(x)
                    }
                    continue;
                }

                if(blok.type=="BDoor"||blok.type=="BWindow") { 
                    x=blok.x+blok.rect[0]-blok.rect[3]/2;
                    x1=blok.x+blok.rect[3]/2+blok.rect[0]; 
                    aP.push(x,x1);
                    x=blok.y-blok.rect[5]/2;
                    x1=blok.y+blok.rect[5]/2;
                    aP1.push(x,x1)
                    continue;
                }



                if(blok.type=="BTumba" || blok.type=="BTBoxDin") {
                    x=blok.x+blok.rect[0]
                    x1=blok.x+blok.rect[3]+blok.rect[0]; 
                    aP.push(x,x1)
                    x=blok.y+blok.rect[5]/2;
                    aP1.push(x)
                    continue;
                }
            } 

            aP.push(this.par.width);
            aP1.push(this.par.height);
            this.korektArr(aP,80)
            this.korektArr(aP1,80) 
        }


        this.korektArr=function(a,num) {
            for (var i = 0; i < a.length; i++) {
                a[i]=Math.round(a[i]*10)
            }

            for (var i = 0; i < a.length; i++) {
                for (var j = i+1; j < a.length; j++) {
                    
                    if(a[i]==a[j]){
                        a.splice(j,1)
                        i=0;
                        j=0; 
                    }                    
                }
            }
            a.sort(function(a, b) {
                return a - b;
            });

            if(num!=undefined){
                for (var i = a.length-1; i >=1; i--) {

                    if(a[i]-num<a[i-1]){
                        a.splice((i-1),1)
                        i=a.length-1;
                    }

                }                
            }
        }


        this.getBox=function() {
            for (var i = 0; i < this.arrBox.length; i++) {
                if(this.arrBox[i].visible==false){
                    this.arrBox[i].visible=true
                    return this.arrBox[i];
                }
            }
            this.arrBox.push(new THREE.Mesh(this.gBox,this.materialBox ))
            this.content3d.add(this.arrBox[this.arrBox.length-1]);
            return this.arrBox[this.arrBox.length-1];
        }


        this.getText=function() {
            for (var i = 0; i < this.arrText.length; i++) {
                if(this.arrText[i].object3d.visible==false){
                    this.arrText[i].object3d.visible=true
                    return this.arrText[i];
                }
            }
            this.arrText.push(new TLabel(this.content3d,0,0," "))
            this.arrText[this.arrText.length-1].fontSize=sizeText;
            return this.arrText[this.arrText.length-1];
        }


        this.clear=function() {
            for (var i = 0; i < this.arrBox.length; i++) {
                this.arrBox[i].visible=false;
            }
            for (var i = 0; i < this.arrText.length; i++) {
                this.arrText[i].object3d.visible=false;
            }
        }
    }


    set active(v) {
        if(this._active!=v){
            this._active = v;
            this.content3d.visible=this._active;
            if(v==false){
                this.clear()
            }else{
                this.upDate()  
            }
        }       
    }   
    get width() { return  this._width;}
}
