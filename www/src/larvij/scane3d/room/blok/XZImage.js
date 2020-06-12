export function XZImage (cont, _x, _y, _linkStart, fun) {
    PIXI.Container.call(this);
    var self = this;
    this.type = 'XZImage';

    cont.addChild(this);
   

    this.fun = fun;

    this.x = _x || 0;
    this.y = _y || 0;

    this._width = 100;
    this._height = 100;
    this._otstup = 0; // отступ картинки от краев рамки
    this._preloaderBool = false;

    this.picWidth = 0; // реальные размеры картинки
    this.picHeight = 0; // реальные размеры картинки
    // TODO при отсутствие выдает ошибку, текстура не устпевает загрузиться
    this.image = new Image();
    this.interactive = false;
    this.sprite = null;
    this.funError = null;
    this.label = null;
    this.linkOld = null;

    this.loadError = function () {
        if (self.funError) self.funError();
    };

    this.loadComplit = function (texture) {
        //self.image = texture.baseTexture.source;
        self.isLoaded = true;
        self.picWidth = self.image.width;
        self.picHeight = self.image.height;
        if (self.sprite) self.sprite.destroy();
        self.sprite = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(self.image)));
        self.sprite.interactive = self.interactive;
        self.sprite.visible = true;
        self.addChild(self.sprite);
        self.otstup = self._otstup;
        self.width = self._width;
        self.height = self._height;
        if (self.label) {
            self.removeChild(self.label);
            delete self.label;
            self.label = undefined;
        }
        if (self._preloaderBool) {
            self.preloader.visible = false;
            self.preloader.activ = false;
        }
        if (self.funComplit) self.funComplit();
        if (self.fun) self.fun();
    };
    this.image.crossOrigin = '';
    this.image.onload = this.loadComplit;
    this.image.onerror =this.loadError;


    this.preloader = null;
    this.load = function () {
        if (this._preloaderBool && this.sprite) {
            // если есть прелоадер нужно убрать старую картинку
            this.sprite.visible = false;
        }
        this.isLoaded = false;
        if (!this._link || this._link === 'null') return;
        
        
        self.image.src = this._link;




        //pl102.loaderTexture.clearFun(this.linkOld, this.loadComplit);
        //pl102.loaderTexture.getTexture(this._link, this.loadComplit, this.loadError);


        this.linkOld = this._link;
    };

    this.clear = function () {
        if (self.sprite) {
            self.sprite.destroy();
            delete self.sprite;
        }
        this.destroy();
    };

    if (_linkStart) this.link = _linkStart;
}

XZImage.prototype = Object.create(PIXI.Container.prototype);
XZImage.prototype.constructor = XZImage;

Object.defineProperties(XZImage.prototype, {
    link: {
        set: function (value) {
            if (this._link === value) return;
            this._link = value;
            this.load();
        },
        get: function () {
            return this._link;
        }
    },
    width: {
        set: function (value) {

            this._width = value;
            if (this.sprite) {
                this.sprite.scale.x = (this._width - this._otstup * 2) / this.picWidth;
                this.sprite.position.x = this._otstup;
            }

            if (this._preloaderBool == true) if (this.preloader) this.preloader.width = this._width;
        },
        get: function () {
            return this._width;
        }
    },
    height: {
        set: function (value) {
            this._height = value;
            if (this.sprite) {
                this.sprite.scale.y = (this._height - this._otstup * 2) / this.picHeight;
                this.sprite.position.y = this._otstup;
            }
            if (this._preloaderBool == true) if (this.preloader) this.preloader.height = this._height;
        },
        get: function () {
            return this._height;
        }
    },
    otstup: {
        set: function (value) {
            this._otstup = value;
            this.width = this._width;
            this.height = this._height;
        },
        get: function () {
            return this._otstup;
        }
    }
});