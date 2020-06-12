/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.

для запуска видоса с камеры на заднем плане

дев 
vorodis2.com   
vorodis2@gmail.com 
2019
*/

export class WebCamera  {
  	constructor(par, dCont, video, debug) {  		
  		this.type="WebCamera";
  		var self=this;        
        this.par=par;

        this.type="WebCamera";
        var self=this;
        this.par=par
        this.dCont=dCont;
        this.video=video;
        this.debug=debug;
      
        this.aFoto=false;



        self.podRazmer=false;

        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');


  		this.content3d = new THREE.Object3D();
        var key="ключ2";
        this._active=false;




        if(this.debug==true){
            var yy=4;
            this.window=new DWindow(this.dCont, 100, 0,"debug");
            this.window.width=222;

            var bb=new DButton(this.window.content,2,yy,"active==true",function(){
               // stop();
                      
                /*self.video.src = "resources/video/test.mp4"
                self.video.play();*/ 
                self.active=true;               
               
            })
            bb.width=this.window.width-4;
            yy+=36;

            var bb=new DButton(this.window.content,2,yy,"active==false",function(){        
               
                self.active=false;         
            })
            bb.width=this.window.width-4;
            yy+=36;       
          
/*

            var bb=new DButton(this.window.content,2,yy,"clear",function(){        
               textarea.text=""
                       
            })
            bb.width=this.window.width-4;
            yy+=36; 

           
            var textarea = new DTextArea(this.window.content,2,yy,"")
            textarea.width=this.window.width-4
            textarea.height=350
            yy+=2+textarea.height   

            trace=function(s){ 
                console.log(s)        
                textarea.text=s+"\n"+textarea.text
            }*/
            this.window.height=yy+2+32;
        }


        this.startConvas=function(){


        }

        var stop = () => video.srcObject && video.srcObject.getTracks().forEach(t => t.stop());

        this.stop=function(){
            //video.pause()
            stop()

        }

        /* var bbb=false
        this.init=function(){
            if(bbb)return
            bbb=true
            //this.video= document.createElement('video'); 
            this.video= document.getElementById('video');
           // this.video.src="resources/video/test.mp4";

            

            getVideo(this.video)

            

            this.texture = new THREE.VideoTexture(this.video);
            this.texture.minFilter = THREE.LinearFilter;
            this.texture.magFilter = THREE.LinearFilter;

            this.material=new THREE.MeshPhongMaterial({ 
                map:this.texture, 
                color: 0xffffff
            } ) ; 

            backgroundScene = new THREE.Scene();
            backgroundCamera = new THREE.Camera();           
            backgroundScene.add(backgroundCamera);

            var lightAmb = new THREE.AmbientLight(0xffffff);
            backgroundScene.add(lightAmb);

            var r=100;
            var r2=5;
            var geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );
           for ( var i = 0; i < 20; i ++ ) {
                var object = new THREE.Mesh( geometry, this.material);
                object.position.x = Math.random() * r - r/2;
                object.position.y = Math.random() * r - r/2;
                object.position.z = Math.random() * r - r/2;
                object.rotation.x = Math.random() * 2 * Math.PI;
                object.rotation.y = Math.random() * 2 * Math.PI;
                object.rotation.z = Math.random() * 2 * Math.PI;
                object.scale.x = Math.random() * r2;
                object.scale.y = Math.random() * r2;
                object.scale.z = Math.random() * r2;
                self.content3d.add( object );
            }
            self.par.content3d.add(self.content3d)
            self.mesh = new THREE.Mesh( geometry, this.material);
            backgroundScene.add(self.mesh);            
        } 

        function dragCam2() {                 
            self.par.visi3D.renderer.autoClear = false;
            self.par.visi3D.renderer.clear();
            self.par.visi3D.renderer.render(backgroundScene , backgroundCamera);       
        }*/


        var ww, hh, ss
        this.sizeWindow = function(w,h,s){ 
            if(w){
                ww=w;
                hh=h;
                ss=s;         
            }
            

            this.ww=ww;
            this.hh=hh; 
           
            if(self.podRazmer==true){ 
                let sss=ww/video.videoWidth;
                if(hh/self.video.videoHeight>sss)sss=hh/self.video.videoHeight;
               
                let ew=Math.round(self.video.videoWidth*sss)+"px";
                let eh=Math.round(self.video.videoHeight*sss)+"px"; 
                
                //if(videoDiv.style.width!=ew) 
                self.video.style.width=ew;
                //if(videoDiv.style.height!=ew) 
                self.video.style.height=eh;               
                self.video.style.position = 'fixed';

                let ex=Math.round(-(self.video.videoWidth*sss-ww)/2)+"px";
                let ey=Math.round(-(self.video.videoHeight*sss-hh)/2)+"px";

                self.video.style.left = ex;
                self.video.style.top = ey; 
            }       
        }

        
        this.dragScan=function(b){
            this.par.visi3D.utility.sky.active=!b;
            this.par.scane3d.room.nafig(b);
            this.par.visi3D.intRend=0; 
        }


        //после актива, предусмотрена задержка на загрузку видоса
     /*   this.dragScan=function(){
            if(this._active==true){
                if(this.par.visi3D.utility.sky.mesh!=undefined)  this.par.visi3D.utility.sky.active=false
                this.par.visi3D.alwaysRender=true
                if(self.par.visi3D.arrayDoRender2.length==0)self.par.visi3D.arrayDoRender2.push(dragCam2);
                this.video.play();

                self.par.scane3d.room.nafig(true)
            }else{
                if(this.par.visi3D.utility.sky.mesh!=undefined)  this.par.visi3D.utility.sky.active=true
                this.par.visi3D.alwaysRender=false 
                self.par.visi3D.arrayDoRender2.length=0
                this.video.pause();
                self.par.scane3d.room.nafig(false);
            }
            this.par.visi3D.intRend=0;           
        }*/





        //поллучение видио потока с самеры девайса
        //fun доргаеться когда видио уже сформировано

        this.getVideo=function(){
            getVideo()
        }


        function getVideo() { 
            trace("getVideo") 
            trace("=0="+navigator)
            trace("=1="+navigator.mediaDevices)
            trace("=3="+navigator.mediaDevices.getUserMedia)
            /*if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
               trace("Let's get this party started")
            }*/

            if (navigator.mediaDevices.getUserMedia === undefined) {
                trace("n.m.g==undefined")
                navigator.mediaDevices.getUserMedia = function(constraints) {
                    
                    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                    if (!getUserMedia) {
                        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                    }
                    return new Promise(function(resolve, reject) {
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                }
            }
            trace("0000"); 

            var constraints;
            navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                var videoDevices = [];
                var videoDeviceIndex = 0;
                var _deviceId
                var sah=0
                trace("1111") 
                devices.forEach(function(device) {                    
                    if (device.kind == 'videoinput') {
                        if (device.label.indexOf('front')!=1) {  
                            sah=videoDevices.length;                            
                        }
                        trace("1111") 
                        _deviceId= device.deviceId;
                        videoDevices.push(device.deviceId)
                        videoDevices[videoDeviceIndex++] =  device.deviceId;                        
                    }
                }); 

                var constraints =  {
                    video: {
                        deviceId: { exact: videoDevices[sah] }
                    }

                }
                setVideo1(constraints);
            })
        }

        function setVideo1(c,f) {   
            trace("setVideo1") 
            navigator.mediaDevices.getUserMedia(c)
            .then(function(stream) {
              if ("srcObject" in video) {
                self.video.srcObject = stream;
              } else {
                self.video.src = window.URL.createObjectURL(stream);
              }
              trace("s11") 
              video.onloadedmetadata = function(e) { 
                trace("s22")                
                self.video.play();               
                self.sizeWindow();
              };
            })
            .catch(function(err) {
              console.log(err.name + ": " + err.message);
            });
        }
        
    }


    set active(v) {
        if(this._active!=v){
            this.stop();
            this._active = v; 
            this.podRazmer=v;

           
            if(v){
                this.getVideo();
               // this.video.src = "resources/video/test.mp4"
               // this.video.play(); 
            }else{
               // this.video.src = "resources/video/test.mp4"
               // this.video.pause(); 
               this.stop(); 
            }
            
            

            this.dragScan(v);
            this.sizeWindow();

            if(v){
                setTimeout(function() {
                    self.sizeWindow();
                }, 100);

                setTimeout(function() {
                    self.sizeWindow();
                }, 1000);
            } 

            
        }       
    }   
    get active() { return  this._active;}
}











