
export function LocalStorage(fun,_key) {
	this.fun = fun;
	var self = this;
	this.object;
	this.key = _key||'shirt';
	this.object; // тут храняться все данные с localStorage
	var b;

	this.bOk=true;
	// инициализация localStorage
	this.initLoad=function() {
		b=true;
		if(window.localStorage && window.localStorage[this.key]){
			this.object = window.localStorage[this.key];
		}else{
			b=false;
			this.bOk=false;
			this.object ={}			
		}
		
		if(this.object == "undefined")b=false;
		if(this.object == undefined)b=false;
		
		// проверка пуст ли  localStorage
		if(b == false) {
			this.object = this.getStartObj(); // если localStorage пуст, записываем обьект с функции getStartObj
		}else {
			this.object = jQuery.parseJSON(this.object); // если localStorage не пуст записываем содержимое предварительно
		}	
		if(this.fun)self.fun();
	}
	
	// если localStorage пуст, записываем обьект
	this.getStartObj = function() {
		var obj = {
			activ:false,
			dubag:false,
			menu:{},
			xz:{}
		};
		return obj;
	}

	// сохраняем в localStorage данные
	this.save = function() {
		if(this.bOk)window.localStorage[this.key] = JSON.stringify(self.object);
		
	}

	// сохраняем в localStorage данные
	this.clear = function() {
		if(this.bOk)window.localStorage[this.key] = undefined;		
	}
	self.initLoad();
	//setTimeout(function() {self.initLoad();}, 1);
		
}



