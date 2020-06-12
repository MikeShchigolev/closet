






export class TCInfa {
    constructor(config) {
        this.simvol="ru"    
        this.type="TCInfa";
        this.config=config
        this.getText=function(id){
            for (var i = 0; i < this.config.array.length; i++) {
                if(this.config.array[i].id==id)return this.config.array[i].text[this.simvol]
            }
            return "null"
        }
    }
    set x(value) {this.position.x = value;} get x() { return  this.position.x;}
   
}



