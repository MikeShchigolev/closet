



function Setings(p, fun) {  
    var self=this;  
    this.type="Setings";
    this.par=p;
    this._active=false;
    this.fun=fun
    this.otstup=p.otstup
    var sahIndex=this.par.array.length;

    this.but=new DButton(this.par.w, this.otstup+(this.otstup+100)*sahIndex, this.otstup,this.type,function(){
        trace(sahIndex)
        self.par.index=sahIndex;
    });
    this.but.height-=this.otstup*2;

    this.dCont = new DCont(this.par.w.content);
    this.dCont.visible=this._active

    this.w=new DWindow(this.dCont, this.otstup, this.otstup," ");
    this.w.width=802;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;
    this.cont=new DCont(this.w);
    this.cont.y=32
    this.content=new DCont(this.cont);
    this.cont.visible=false;


    var array=[]
    var yy=this.otstup;
    new DLabel(this.w.content,this.otstup,yy,"ключ трело: https://trello.com/app-key").width=400
    array.push(new DInput(this.w.content,400,yy,"--",function(){
        main.objectBase.key=this.text;
        main.saveTime()
    }))
    array[0].timeFun=100
    array[0].width=400
    yy+=40;


    new DLabel(this.w.content,this.otstup,yy,"idList https://youtu.be/JJX8CU6psxo").width=400
    array.push(new DInput(this.w.content,400,yy,"--",function(){
        main.objectBase.idList=this.text;
        main.saveTime()
    }))
    array[1].timeFun=100 
    array[1].width=400
    

    var but1=new DButton(this.w.content, array[1].width+array[1].x+10, yy,"<<<<<<<",function(){         
        var o=JSON.parse(input.text)
        

        array[1].text=o.lists[0].id
        main.objectBase.idList=array[1].text;
        main.saveTime()
        trace(o)
    });

    var input=new DTextArea(this.w.content, array[1].width+array[1].x+10+100, yy,"Встовляем здоровый текст сюда, потом на кнопку",function(){         
        

    });


    yy+=40;

    new DLabel(this.w.content,this.otstup,yy,"Время обновления в секундах, хз 1-2 мин идеально").width=400
    array.push(new DSliderBig(this.w.content,400,yy,function(){
        main.objectBase.time=this.value;
        main.saveTime()
    },"time (секунды)",1,60*5))

    array[2].okrug=1
    array[2].width=400
    yy+=50;
//new DSliderBig(this.content, 0, 0, this.down, _name, min, max);
    this.w.height=yy+32   

    this.start=function(objectBase){        
        array[0].text=objectBase.key
        array[1].text=objectBase.idList
        array[2].value=objectBase.time
    }


    this.sizeWindow = function(w,h){    

    }



}
Object.defineProperties(Setings.prototype, {
    active: {
        set: function (value) {
            if(this._active !=value){
                this._active = value;
                this.but.alpha= value ? 0.5 : 1;
                this.dCont.visible=value;
            }  
        },
        get: function () {
            return this._active;
        }
    }
})

