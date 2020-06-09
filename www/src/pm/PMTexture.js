export default class PMTexture {
    constructor(par, visi3D, objbase) {
        this.type = "PMTexture";
        this.par = par;
        this.visi3D = visi3D;
        this.objbase = objbase;
        this.loader = new THREE.TextureLoader();
        this.textureCache = {};
        window.textureCache = this.textureCache;
    }

    getById(id, fun) {
        if (this.textureCache[id] && this.textureCache[id].loaded) {
            fun && setTimeout(() => fun(this.textureCache[id].texture), 0);
            return this.textureCache[id].texture;
        } else {
            const objDin = this.getObj(id);
            return this.loadTexture(objDin, fun);
        }
    }

    loadTexture(objDin, fun) {
        if (!this.textureCache[objDin.id] || !this.textureCache[objDin.id].callbacks) {
            this.textureCache[objDin.id] = { callbacks: [] };
        }

        if (!this.textureCache[objDin.id].texture) {
            const path = window.location.href.split('/');
            path.pop();
            const link = path.join('/') + '/resources/data/' + objDin.id + '/pic.' + objDin.type;
            const texture = this.loader.load(link, texture => {
                if(this.visi3D)this.visi3D.intRend = 1;
                texture.obj = {};

                this.textureCache[objDin.id].callbacks.forEach(f => f(texture));
                delete this.textureCache[objDin.id].callbacks;
                this.textureCache[objDin.id].loaded = true;
            });

            texture.arrMat = [];
            texture.arrRun = [];
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.x = objDin.rx;
            texture.repeat.y = objDin.ry;
            this.textureCache[objDin.id].texture = texture;
        }
    
        fun && this.textureCache[objDin.id].callbacks.push(fun);
        return this.textureCache[objDin.id].texture;
    }

    updateTexture(objDin, reload) {
        if (!this.textureCache[objDin.id]) {
            return;
        }
        if (reload) {
            const img = new Image();
            const path = window.location.href.split('/');
            path.pop();
            img.src = path.join('/') + '/resources/data/' + objDin.id + '/pic.' + objDin.type;

            this.textureCache[objDin.id].texture.image = img;
            this.textureCache[objDin.id].loaded = false;
            img.onload = () => {
                delete this.textureCache[objDin.id].callbacks;
                this.textureCache[objDin.id].loaded = true;
                this.textureCache[objDin.id].texture.needsUpdate = true;
            };
        } else {
            this.textureCache[objDin.id].texture.repeat.x = objDin.rx;
            this.textureCache[objDin.id].texture.repeat.y = objDin.ry;
        }
    }

    getObj(id) {
        return this.objbase.textures.find(o => o.id === id) || null;
    }
}
