/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.



кнопки туда сюда
*/

export class TudaSuda  {
    constructor(par,fun) { 
        this.par=par
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        var self=this;
        this.array=[]
        this.sah=0;
        this.www=117;
        global.tudaSuda=this;

        var b
        this.saveMod=function(){

            var oo=this.par.room.getObj();
            b=this.tDo(this.array[this.array.length-1],oo);
            if(b==true){
                if(this.sah!=this.array.length-1){
                    this.array.splice(this.sah+1)
                }
                this.array.push(oo);
                this.sah=this.array.length-1;
                this.interfes.drag(); 
            }  
        }

        this.tDo=function(o,o1){
            return true;             
            if(o==undefined)return true; 
            //ищем одинаковость в обьектах
            //базовые параметры
            if(o.color==o1.color)
            if(o.idMatObject==o1.idMatObject) 
            if(o.niz.idMat==o1.niz.idMat){ 

                if(o.children.length!=o1.children.length)return true;  
                for (var i = 0; i < o.children.length; i++) {
                    if(this.tDoArray(o.children[i],o1.children[i],["active","height","idMat","width"])==false) return true;
                    if(this.tDoChildren(o.children[i].children,o1.children[i].children,[])==false) return true; 
                }
            }
            return true;  
        }

        this.tDoArray=function(o,o1,a){
            for (var i = 0; i < a.length; i++) {
                if(o[a[i]]!=o1[a[i]])return false; 
            }
            return true;  
        }

        this.tDoChildren=function(c,c1,a){
            if(c.length!=c1.length)return false;

            //trace(c,c1)

            return true; 
        }

        this.dCont=new DCont()//this.par.dCont);   
        this.dCont.x=0;
        this.dCont.y=0;
        this.interfes=new TSInterfes(this)
       

        this.tuda=function(bool){            
            this.par.room.menedsher.menedsherObject.activIndex=-1
            this.par.par.activDragDC = false
            if(bool==true){
                this.sah--;
                if(this.array[this.sah])this.par.room.setObj(this.array[this.sah])
                if(this.sah<0)this.sah=0;
            }else{
                this.sah++;
                if(this.array[this.sah])this.par.room.setObj(this.array[this.sah])
                if(this.sah>=this.array.length)this.sah=this.array.length
            }
            this.interfes.drag()
            this.par.par.activDragDC = true
        } 

        this.dragpOZ=function(num){
            this.par.par.activDragDC = false  
            this.sah=num;
            if(this.array[this.sah])this.par.room.setObj(this.array[this.sah])
            this.interfes.drag() 
            this.par.par.activDragDC = true              
        }


        this.keydown=function(e){
            if(event.keyCode==17)self.boolCTRL=true
            if(self.boolCTRL==true){
                if(event.keyCode==90){
                    self.tuda(true)
                }
                if(event.keyCode==89){
                    self.tuda(false)
                }
            }                       
        }

        this.keyup=function(e){
            if(event.keyCode==17)self.boolCTRL=false
        }
        window.addEventListener( 'keydown', this.keydown );    
        window.addEventListener( 'keyup', this.keyup ); 

        this.interfes.drag();
    }
}


export class TSInterfes  {
    constructor(par,fun) { 
        this.par=par
        var self=this;
        this._bool=true;
        this._bool1=true;
        this.dCont=new DCont(this.par.dCont); 
        this.array=[]
        this.otstup=10
        this.wh=47;
        var xx=0;

        this.array[0]=new DButSim(this.dCont,xx,this.otstup," ",function(){
            if(self._bool)self.par.tuda(true)
        },"resources/image/w4.png")
        this.array[0].borderRadius=111;
        this.array[0].boolLine=false;
        this.array[0].idArr=0;
        this.array[0].width=this.wh; 
        this.array[0].height=this.wh;           
        this.array[0].color="#e2e7ed";           
        this.array[0].boolLine=false;
        this.array[0].color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10); 


        xx+=this.otstup+this.wh
        this.array[1]=new DButSim(this.dCont,xx,this.otstup," ",function(){
            if(self._bool1)self.par.tuda(false)
        },"resources/image/w5.png")
        this.array[1].borderRadius=111;
        this.array[1].boolLine=false;
        this.array[1].idArr=1;
        this.array[1].width=this.wh; 
        this.array[1].height=this.wh;           
        this.array[1].color="#e2e7ed";           
        this.array[1].boolLine=false;
        this.array[1].color =dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color1), -10); 

      

        this.drag=function(){
            this.dragArray()
            if(this.par.array.length==0){
                this.bool=false;
                this.bool1=false;
                return
            }
            if(this.par.sah==this.par.array.length-1){
                this.bool=true;
                this.bool1=false;
                return
            }
            if(this.par.sah==0){
                this.bool=false;
                this.bool1=true;
                return
            }
            this.bool=true;
            this.bool1=true;
        }
        this.arr=[]



        this.dragArray=function(){ 
            if(this.par.par.dubag==undefined)return
            if(this.par.par.dubag.active==false)return  

            for (var i = 0; i < this.arr.length; i++) {
                this.arr[i].visible=false;
                this.arr[i].alpha=1
            }

            var kk=this.par.array.length
            if(kk>30)kk=30
            for (var i = 0; i < kk; i++) {                
                if(this.arr[i]==undefined){
                    this.arr[i]=new DButton(this.dCont,100+i*20,0,""+(i+1),function(){ self.par.dragpOZ(this.idArr)})
                    this.arr[i].idArr=i 
                    this.arr[i].width=this.arr[i].height=20
                }
                this.arr[i].visible=true;

                if(i==self.par.sah)this.arr[i].alpha=0.5
            }        
        }
    }

    set bool(value) {
        if(this._bool!=value){
            this._bool = value;
            if(this._bool==true){
                this.array[0].alpha=1
            }else{
                this.array[0].alpha=0.5
            }
        }
    }
    get bool() { return  this._bool;}

    set bool1(value) {
        if(this._bool1!=value){
            this._bool1 = value;
            if(this._bool1==true){
                this.array[1].alpha=1
            }else{
                this.array[1].alpha=0.5
            }               
        }
    }
    get bool1() { return  this._bool1;}
}