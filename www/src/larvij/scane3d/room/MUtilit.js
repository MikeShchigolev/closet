
/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

хз сложные методы для чегото сюда выведены хз
*/



export class MUtilit  {
    constructor(par, fun) {         
        this.type="MUtilit";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.fun=fun;
        this.par=par;
        
        var a=[]
        var b,x,x1,y,y1,child, xc, yc, xc1, yc1
        this.getVertRay=function(arr, _x, _y, _bool){         
            var r=0
            if(_bool==false)r=this.par.par._height;
            a=[];

            for (var i = 0; i < arr.length; i++) {
                b=true
                if(arr[i].type=="BPieceTop"){
                    b=false;
                    x=arr[i].x+arr[i].rect[0];
                    x1=arr[i].x+arr[i].rect[3]+arr[i].rect[0];
                    if(_x>=x&&_x<=x1){
                        y=arr[i].y-arr[i].rect[2]/2;
                        y1=arr[i].y-arr[i].rect[5];                        
                                
                        for (var j = 0; j < arr[i].children.length; j++) {
                            child=arr[i].children[j];
                            xc=child.boxColizi.rectCollisMeshdy.x+arr[i].x
                            xc1=child.boxColizi.rectCollisMeshdy.x+child.boxColizi.rectCollisMeshdy.width+arr[i].x;
                            if(_x>=xc&&_x<=xc1){
                                yc=child.y+arr[i].y
                                yc1=child.y+arr[i].y-child.rect1[5]                                
                                if(_bool==false) {
                                    if(_y<yc1){
                                        a.push(yc1)
                                    }
                                }
                                if(_bool==true) {
                                    if(_y>yc){
                                      
                                        a.push(yc)
                                    }
                                }
                            } 
                        } 
                    }
                }
               
                if(arr[i].type=="BDoor"||arr[i].type=="BWindow"||arr[i].type=="BTumba") {
                    b=false;

                    x=arr[i].x+arr[i].rect[0];
                    x1=arr[i].x+arr[i].rect[3]+arr[i].rect[0];

                    if(arr[i].type=="BDoor"||arr[i].type=="BWindow"){
                        y1=arr[i].y+arr[i].rect[2]/2;
                        y=arr[i].y-arr[i].rect[2]/2; 
                    }
                    if(arr[i].type=="BTumba") {                        
                        y1=arr[i].y-arr[i].rect[5]/2;
                        y=arr[i].y+arr[i].rect[5]/2; 
                    }

                    if(_x>=x&&_x<=x1){
                        if(_bool==true) { 
                            if(_y>y&&_y>y1){                                
                                a.push(y)
                            }
                        }
                        if(_bool==false) {
                            if(_y<y&&_y<y1){                                
                                a.push(y1)
                            }
                        }                       
                    }                    
                }
                
            }
           


            if(a.length!=0){
                if(_bool==false) {
                    r=999 
                    for (var i = 0; i < a.length; i++) {
                        if(r>a[i])r=a[i];
                    } 
                }
                if(_bool==true) {
                    r=0 
                    for (var i = 0; i < a.length; i++) {
                        if(r<a[i])r=a[i];
                    } 
                }
            }
            return r
        }


        this.getGorizRay=function(arr, _x, _y, _w){
            //w=0 ближния если не то дистанция конца           
            var r=0
            if(_w!=0)r=_w;
            a=[];

            for (var i = 0; i < arr.length; i++) {
                b=false;

                x=arr[i].x+arr[i].rect[0];
                x1=arr[i].x+arr[i].rect[3]+arr[i].rect[0];

                if(arr[i].type=="BDoor"||arr[i].type=="BWindow"){
                    y1=arr[i].y+arr[i].rect[2]/2;
                    y=arr[i].y-arr[i].rect[2]/2;

                    x=arr[i].x+arr[i].rect[0]-arr[i].rect[3]/2;
                    x1=arr[i].x+arr[i].rect[3]+arr[i].rect[0]-arr[i].rect[3]/2; 
                }
                if(arr[i].type=="BTumba") {                        
                    y1=arr[i].y-arr[i].rect[5]/2;
                    y=arr[i].y+arr[i].rect[5]/2; 
                }

                if(arr[i].type=="BPieceTop"){
                    x=arr[i].x+arr[i].rect[0];
                    x1=arr[i].x+arr[i].rect[3]+arr[i].rect[0]; 
                    y=arr[i].y-arr[i].rect[2]/2;
                    y1=arr[i].y-arr[i].rect[5]; 
                }

                if(_y<=y&&_y>=y1){

                    if(_w==0) { 
                        if(_x>x&&_x>x1){                                
                            a.push(x1)                                
                        }
                    }
                    
                    if(_w!=0) {
                        if(_x<x&&_x<x1){                                
                            a.push(x)
                        }
                    }                       
                } 
            }

            if(a.length!=0){
                if(_w==0) {
                    r=0 
                    for (var i = 0; i < a.length; i++) {
                        if(a[i]>r)r=a[i];
                    } 
                }

                if(_w!=0) {                   
                    for (var i = 0; i < a.length; i++) {
                        if(r>a[i])r=a[i];
                    } 
                }
            } 
            return r
        }
    }
}
