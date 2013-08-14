$handlers = {
  toolbar:function(){
    console.log('toolbar');
    $('nav').on('mouseenter',function(){

      var $icon = $(this).find('img');
      var $title = $(this).find('label');
      $icon.clearQueue().transition({ rotate: '360deg', scale: 2 }, 600);
      $title.clearQueue().fadeIn('slow');
    });
    $('nav').on('mouseleave',function(){
      var $icon = $(this).find('img');
      var $title = $(this).find('label');
      $icon.transition({ rotate: '0deg', scale: 1 }, 600);
      $title.clearQueue().fadeOut('slow');
    });
    $('.settings .handle').on('mouseenter',function(){
      var $icon = $(this).find('img');
      $icon.clearQueue().transition({ rotate: '900deg', scale: 1 }, 9000);
    });
    $('.settings .handle').on('mouseleave',function(){
      var $icon = $(this).find('img');
      $icon.clearQueue().transition({ rotate: '0deg', scale: 1 }, 10);
    });
  },

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