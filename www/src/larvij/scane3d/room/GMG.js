/*
© Разработано и принадлежит ЗАО Ларвидж интернешнел.
Москва, ул. Добровольческая, д. 12
+7 495 912-70-74, sales@larvij.ru
Конструктор предназначен исключительно для планирования гардеробной системы Larvij.
Любое другое использование данного продукта будет являться незаконным.


рендер 2д теней на стене
*/

import { XZImage } from './blok/XZImage.js';


export class GMG  {
    constructor(sten) {         
        this.type="GenerMatGeom";
        var self=this;
        var key="© Все права на данный планировщик принадлежат ЗАО Ларвидж интернешнел. Любое использование конструктора гардеробных систем Larvij не согласованное с компанией Ларвидж будет преследоваться по закону."; 
        
        this.par=sten;
        this._color=sten._color;
        this._width=sten._width
        this._height=sten._height
        
        this.sahY=2048;
        this.sahX=2048;
        this.cont = new PIXI.Container();
        this.content = new PIXI.Container();
        this.cont.addChild(this.content)

        this.renderer = new PIXI.CanvasRenderer(1, 1, {antialias: true, transparent: true, preserveDrawingBuffer: true })
        this.renderer.resize(this.sahY, this.sahX);
        self.renderer.render(this.content);

        this.material=new THREE.MeshPhongMaterial({            
            transparent:true,
            map:new THREE.CanvasTexture(this.renderer.context.canvas),            
            side: THREE.DoubleSide,
        })

        this.remove=function(c){
            if(c.parent!=undefined){
                c.funRender=undefined
                this.content.removeChild(c)
            }
            self.draw()
        }

        this.add=function(c){
            c.funRender=self.drawTime
            self.content.addChild(c)          
            self.draw()
        }

        this.drawTime=function(t){
            if(t==undefined){
                self.draw()
            }else{
                setTimeout(function(){
                    self.draw();
                },t)
            }
        }

        this.draw=function(){                   
            this.content.scale.x=(this.sahX)/this._width;
            this.content.scale.y=(this.sahY)/this._height;
            self.render()
            sten.korektMarker.upDate();
            sten.linerMetrik.upDate()
        }

        this.render=function(){           
            self.renderer.render(this.cont);
            this.material.map.needsUpdate=true;
            
        }

        setTimeout(function() {
            self.draw()
        }, 1550);
    }
    set width(v) {
        if(this._width!=v){
            this._width = v;
            this.draw()
        }       
    }   
    get width() { return  this._width;}
}
