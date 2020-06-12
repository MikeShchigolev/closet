

function MResurs(dCont, _x,_y,fun) {  
    var self=this   
    this.type="MResurs";
    this.fun=fun;


    this.otstup=1//aGlaf.otstup;
    this.wh=28;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
   
    this.dCont=new DCont(dCont);
    this.dCont.x=_x;
    this.dCont.y=_y;

    this.array=[];

    this.w=new DWindow(this.dCont, this.otstup, this.otstup," ");
    this.w.width=this.wh+this.otstup*2;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;
    this.w.minimize=true;
    

    
    this.button=new DButton(this.w,this.otstup,this.otstup,"+",function(){
        self.plus()
    })
    this.button.width=this.button.height=this.wh;
    this.button.startFile(); 


    this.bClose=new DButton(this.w,this.widthBig-this.wh-this.otstup,this.otstup,"x",function(){        
        self.object.resurs = {array:[]}
        self.resurs=self.object.resurs
        self.killl();
        self.dragScane();
        self.fun();

    })
    this.bClose.width=this.bClose.height=this.wh;
    this.bClose.visible=false

 


    this.redrag=function(){         
        var a=[]
        for (var i = 0; i < self.files.length; i++) {            
            var oo={
                name:self.files[i].name, 
                size:self.files[i].size,
                b:false,
                i:"x",
                i1:"x"
            }
            this.object.resurs.array.push(oo)
            a[i]=oo;
        }



        //this.object.resurs.array = a;
        this.dragScane();
        self.fun();

        

    }





    this.dragBat=function(s,p){
        if(s=="saveTime")self.fun("saveTime")
        if(s=="kill"){
            self.object.resurs.array.splice(p,1)
            self.dragScane();
            self.fun();
        }
    }
 


    this.clear=function(){
        this.w.width=this.wh+this.otstup*2;
        this.w.minimize=true;
        this.bClose.visible=false
        
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].dCont.visible=false;
        }
    }

    this.dragScane=function(){
        this.clear()
        if(this.resurs.array.length==0){

        }else{
            var b=false;
            this.bClose.visible=true
           
            var l='../'+aGlaf.resursData + self.object.id+"/resources/";
            this.w.width=this.widthBig;
            this.w.minimize=false;            
            for (var i = 0; i < this.resurs.array.length; i++) {                
                if(this.array[i]==undefined){
                    this.array[i]=new MRBlok(this, this.w.content, i, this.dragBat)
                }
                this.array[i].dCont.visible=true;
                
                if(this.array[i].setObj(this.resurs.array[i], l)==true){
                    b=true

                }
            }
            this.w.height=(this.array[0].height+this.array[0].otstup)*this.resurs.array.length+this.array[0].otstup+32;

            if(b==true){
                self.fun("saveTime")
            }
        }



    }


    this.object=undefined;
    this.resurs=undefined;
    this.setObj=function(o){
        var b=false;
        this.object=o;
        if(this.object.resurs==undefined){
            this.object.resurs = {array:[]}
            b=true;
        }        

        this.resurs=this.object.resurs;
        this.dragScane();


        return b;
    }



    ///////////////////////////
    ///////////////////////////

    this.killl=function(){  
        var l='../'+aGlaf.resursData + self.object.id+"/resources";        
        php.load({tip: 'isDir', dir: l}, function (e) { 
            if(e=="notDir"){
                //self.plus1()
            }else{
                //php.load({tip: "removeDirRec", dir: l, }, function (e) { 
                   // self.plus1()
               // })
                php.load({tip: "removeDirRec", dir: l, }, function (e) { 

                })
            }
        })
    }



    this.plus=function(){ 
          
        var l='../'+aGlaf.resursData + self.object.id+"/resources";                 
        php.load({tip: 'isDir', dir: l}, function (e) { 
            if(e=="notDir"){
                self.plus1()
            }else{
                //php.load({tip: "removeDirRec", dir: l, }, function (e) { 
                    self.plus1()
               // })
            }
        })
    }

    var sah
    this.sss
    this.files
    this.plus1=function(){
        var l='../'+aGlaf.resursData + self.object.id+"/resources";
        php.load({tip: 'mkdir', dir: l}, function (e) {
            php.load({tip: 'mkdir', dir: '../'+aGlaf.resurs+'tmp/'}, function (e) {  
                self.plus11()
            })
        }) 
    }  

    this.plus11=function(){
        var files=self.button.files;
        var a=[];
        var p=-1;
        var k='';
        this.sss=0;
        this.files=files;        
        this.saveFile();
    }

    this.saveFile=function(){
        var ll=php.server+"src/upload.php";
        var form_data = new FormData();
        form_data.append('file', self.files[self.sss]); 
              
        $.ajax({
            url: ll,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function(php_script_response){
                if(self.sss>=self.files.length){                    
                    self.saveFile1()
                }else{
                    self.sss++;
                    self.saveFile();
                    trace(self.sss)
                }
            }
        });
    }


    this.saveFile1=function(){       
        var llll='../'+aGlaf.resurs+'tmp/';
        var llllll='../'+aGlaf.resursData + self.object.id+"/resources";        
        php.load({tip: 'copyDir', dirWith: llll, dir: llllll}, function (e) {            
            php.load({tip: "removeDirRec", dir: llll, }, function (e) {               
                self.redrag();
            })            
        })        
    }


////////////////////////////
///////////////////////////




}

function MRBlok(par, _cont, _idArr, fun) {  
    var self=this   
    this.type="MResurs";
    this.fun=fun;
    this.par=par;
    this.idArr=_idArr;

    this.otstup=1//aGlaf.otstup;
    this.height=40;
    this.whv=aGlaf.whv;
    this.wh=18
    this.width=aGlaf.widthBig-this.otstup*3;
    this.dCont=new DCont(_cont);
    this.dCont.y=this.idArr*(this.height+this.otstup)

    this.panel=new DPanel(this.dCont, this.otstup, this.otstup);
    this.panel.height=this.height
    this.panel.width=this.width;

    var linkNull='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAATSURBVBhXY9h0/vV/EIYyXv8HAHkYDa3OOowMAAAAAElFTkSuQmCC'
    this.image=new DImage(this.panel, this.otstup, this.otstup, linkNull, function(){

    });
    this.image.height=this.image.width=this.height-this.otstup*2;


    this.label=new DLabel(this.dCont, this.otstup+this.height, this.otstup,"name");


    this.button=new DButton(this.dCont,this.width-this.otstup-this.wh,this.otstup,"x",function(){
        self.fun("kill",self.idArr);
    })
    this.button.width=this.button.height=this.wh;
 


    this.down=function(){
        self.object.b=self.chek.value
        self.object.i=self.input.value
        self.object.i1=self.input1.value
        self.fun("saveTime");
    }



    this.chek=new DCheckBox(this.dCont, this.height, this.otstup+12," ", this.down);

    this.input=new DInput(this.dCont, this.height+20, this.otstup+18," ", this.down);
    this.input.height=16;
    this.input.width=(this.width-this.height-20-this.otstup*3)/2;

    this.input1=new DInput(this.dCont, this.height+20+this.input.width+this.otstup, this.otstup+18," ", this.down);
    this.input1.height=16;
    this.input1.width=this.input.width;






    this.object

    this.setObj=function(o, doLink){
        var bb=false
        this.object=o;
        this.label.text=o.name;
        var aa=o.name.split(".")
        this.image.link=linkNull;

        if(o.b==undefined){
            bb=true
            o.b=false;
            o.i="x";
            o.i1="x";

        }

        this.chek.value=o.b;
        this.input.text=o.i;
        this.input1.text=o.i1;

       
        if(aa[aa.length-1]=="png"||aa[aa.length-1]=="jpg"){
            this.image.link=doLink+o.name;
        }

        return bb
    }






}