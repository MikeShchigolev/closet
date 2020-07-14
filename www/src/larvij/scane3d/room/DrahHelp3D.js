/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


Выделяшка активного обьекта
*/


export class DrahHelp3D  {
    constructor(par, fun) {         
        this.type="DrahHelp3D";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.par=par;
        this.fun=fun;
        this.active=false;

        this.array=[]


        global.drahHelp3D =this
        
        this.set=function(blok) {
            trace(blok);
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].testBlok(blok);
            }
            let b=undefined
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active==false){
                    b=this.array[i]
                    break
                }
            }


            if(b==undefined){
                b=new BoxDH3D(this)
                this.array.push(b)
            }

            b.set(blok)

            

        }



        this.upDate=function() {
            if(this.active==false)return;

            trace("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        }

    }
}


export class BoxDH3D  {
    constructor(par, fun) {         
        this.type="BoxDH3D";
        var self=this;

        this.par=par;
        this.fun=fun;

        this.blok=undefined

        this.testBlok=function(blok) {

        }


        this.set=function(blok) {
            this.blok=blok

           /* trace(blok);
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].testBlok(blok);
            }
            let b=undefined
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active==false){
                    b=this.array[i]
                    break
                }
            }


            if(b==undefined){
                b=new BoxDH3D(this)
                this.array.push(b)
            }

            b.set(blok)*/

            

        }
    }
}