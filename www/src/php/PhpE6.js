


  	

	export function Php (par) {
  		this.ser = window.location.href;
  		this.server = undefined;//"http://uptask3d/";
  		this.server2 = undefined;

  		this.id=null;
  		this.key=null;
  		this.url=null;
  		this.urlSave=null;
  		this.aS
  		var arrParams
  		var arrParams2
  		this.init=function(){
  			arrParams = this.ser.split("?"); 
  			this.server2 =arrParams[0];
  			
  			arrParams2 = arrParams[0].split("/");
  			this.aS=arrParams2;
  			this.server=""
  			for (var i = 0; i < arrParams2.length-1; i++) {
  				this.server+=arrParams2[i]+"/"
  				
  			}

  			//this.server2=this.server
			this.id = getURLParameters("id");
			this.key = getURLParameters("key");
			this.url=getURLParameters("url");
			this.urlSave=getURLParameters("urlSave");
  		}

  		//customDepth+trasparent
		function getURLParameters(paramName){
	        var sURL = window.document.URL.toString();
			var arrParams = sURL.split("/");  			    		
	        if (sURL.indexOf("?") > 0) {
				var arrParams = sURL.split("?");
	        	var arrURLParams = arrParams[1].split("&");
	       	 	var arrParamNames = new Array(arrURLParams.length);
	        	var arrParamValues = new Array(arrURLParams.length);

	            arrParams = sURL.split("?");
	            arrURLParams = arrParams[1].split("&");
	            arrParamNames = new Array(arrURLParams.length);
	            arrParamValues = new Array(arrURLParams.length);


	            var i = 0;
	            for (i = 0; i < arrURLParams.length; i++) {

	                var sParam =  arrURLParams[i].split("=");
	                arrParamNames[i] = sParam[0];
	                if (sParam[1] != "")
	                    arrParamValues[i] = unescape(sParam[1]);
	                else
	                    arrParamValues[i] = null;
	            }

	            for (i=0; i<arrURLParams.length; i++) {
	                if (arrParamNames[i] == paramName) {

	                    return arrParamValues[i];
	                }
	            }
	            return null;
	        }
	    }
  		//------------------------------------------

  		this.load = function(obj, fun){	
			var s=this.server+"src/phpBase.php";


			$.post(s, obj, function(data){			
				if (fun) fun(data);
			});
		}
		
		this.savePhoto = function(_file, _image, fun){
			var s=this.server+"src/forModel.php";

			$.post(s, {file : _file, image : _image}, function(){
				if (fun) fun();			
			});
		};
		this.init()
  	}


