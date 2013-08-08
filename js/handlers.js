var $handlers = {
	intro:function(){
		console.log(window.location.hash);
		if (window.location.hash != '#/'){
			window.location.hash = '/notfound';
		}
		else{
			console.log('ran');
		}
	},
	skills:function(){
		var which = this.which;
		// Default: all
	},
	portfolio:function(){
		var which = this.which;
		// Default: all
	},
	whoami:function(){

	},
	contactme:function(){
		var which = this.which;
		// Default: email
	},
	notfound:function(){
		
	}
}