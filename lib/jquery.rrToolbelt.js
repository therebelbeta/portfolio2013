/* ******************************

jquery.rrToolbelt.js

https://github.com/therebelrobot/jquery.rrToolbelt

- Global (and generic) functions for use anywhere in the js code

Dependencies:
	jQuery - //cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js

	
****************************** */

var $_jsDir = 'js/';

/* GLOBAL FUNCTIONS */

	/*GET URL parameters*/
		function $_GET(p) {
			var url = window.location.search.substring(1);
			var queryParams = url.split('&');
			for (var x = 0; x < queryParams.length; x++) {
        if (queryParams[x].indexOf('=') >-1){
  				var paramSplit = queryParams[x].split('=');
  				if (paramSplit[0] == p) {
  					var value = paramSplit[1];
  					if (value.indexOf('#')>-1){
  						value = value.split("#");
  						value = value[0];
  					}
  					return value;
  				}
        }
        else{
          var paramSplit = queryParams[x]
          if (paramSplit == p) {
            return true;
          }
        }
			}
			return false;
		};

	/*Conditional Console Log*/
		function $_(log, user, type){
  		var which = $_GET('debug');
  		if (which){
  			/*ie fix*/
				$_MSIE.console();
				function logThis(logger, typer){
					switch(typer){
						case 'log':
							console.log(logger);
							break;
						case 'error':
							console.error(logger);
							break;
						case 'warn':
							console.warn(logger);
							break;
						case 'info':
							console.info(logger);
							break;
					};
				}
				if (user == 'error' || user == 'warn' || user == 'info' || user =='log'){
					type = user;
					user = false; /*if only a log and a type*/
				}
				if (!type || (type != 'error' || type != 'warn' || type != 'info' || type !='log')){
					type = 'log'; /*if no type or type is wrong*/
				}
				if (!user){
					logThis(log,type); /*return anytime a console log requested*/
				}
				else{
					if (which == 'all'){
						logThis(log,type); /*return anytime all console logs are requested*/
					}
					else if (which === user){
						logThis(log,type); /*return anytime a console log requested for user*/
					}
					else{
						/*
							when console log requested, but not for this user, all logs, or anytime.
							*/
					};
				}
  		};
		};

	/*IE8 Fixes*/
		var $_MSIE = {
			fixAll:function(){
				$_MSIE.console();
				$_MSIE.bg();
				$_MSIE.opacity();
				$_MSIE.pie();
			},
			isUsed:function(){
				var thisUser = window.navigator.userAgent;
	      if (thisUser.indexOf('MSIE 8') >-1 || thisUser.indexOf('MSIE 7') > -1 || thisUser.indexOf('MSIE 6') > -1){
	        return true;
	      }
	      return false;
			},
			bg:function(){
				if ($_MSIE.isUsed()){
					/*include rrt-lib/jquery.backgroundSize.js*/
					$('body').append('<script type="text/javascript" src="'+$_jsDir+'"rrt-lib/jquery.backgroundSize.js"></script>').promise().done(function(){
						$('*').each(function(){
						   $(this).css($(this).getStyleObject()); 
						}).promise().done(function(){
						  $('*:not([style*="background-image: none"])').filter(':not([style*="background-size: auto"])').each(function(){
								if ($(this).css('background-size') == 'cover' || $(this).css('background-size') == 'contain'){
									var b = $(this).css('background-size');
									$(this).css({backgroundSize:b});
								}
								else if ($(this).css('background-size') == '100%'){
									$(this).css({backgroundSize:'contain'});
								}
								else if ($(this).css('background-size') == '100% 100%'){
									$(this).css({backgroundSize:'contain'});
									var thisH = $(this).height();
									var thisW = $(this).width();
									$(this).find('div:first > img').css({'height':thisH, 'width':thisW});
								}
						  });
						});
					});
				}
			},
			opacity:function(){
				if ($_MSIE.isUsed()){
					/*include rrt-lib/ieOp.css*/
					$('head').append('<link rel="stylesheet" type="text/css" href="'+$_jsDir+'"rrt-lib/ieOp.css" />').promise().done(function(){
						$('*').each(function(){
						   $(this).css($(this).getStyleObject()); 
						}).promise().done(function(){
						    $('*:not([style*="opacity: 1"])').each(function(){
									$(this).attr('data-ieopacity',(parseFloat($(this).css('opacity'))*100));
						    });
						});
					});
				}
			},
			pie:function(){
				if ($_MSIE.isUsed()){
					/*include rrt-lib/ieOp.css*/
					$('head').append('<link rel="stylesheet" type="text/css" href="'+$_jsDir+'"rrt-lib/pie.css" />');
				}
			},
			console:function(){
				if(!window.console) {
					console = {
						log: function(){},
						error:function(){},
						warn:function(){},
						info:function(){},
						debug:function(){},
						clear:function(){}
					};
				};
			}
		};

	/*LocalStorage functions*/
		$_ls = {
      comp: function(){
        if (!window.localStorage) {
          window.localStorage = {
            getItem: function (sKey) {
              if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
              return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
            },
            key: function (nKeyId) {
              return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
            },
            setItem: function (sKey, sValue) {
              if(!sKey) { return; }
              document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
              this.length = document.cookie.match(/\=/g).length;
            },
            length: 0,
            removeItem: function (sKey) {
              if (!sKey || !this.hasOwnProperty(sKey)) { return; }
              document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
              this.length--;
            },
            hasOwnProperty: function (sKey) {
              return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
            }
          };
          window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
        }
      },
      getAll: function(){
        var allKeys = Object.keys(localStorage);
        return allKeys;
      },
      exists:function(key){
        var allKeys =$_ls.getAll();
        if (allKeys.indexOf(key) > -1){
          return true;
        }
        else{
          return false;
        }
      },
      retrieve: function(key){
        if($_ls.exists(key)){
          var results = localStorage.getItem(key);

          $_('SUCCESS: ',key,' retrieved from localStorage','ls');
          
          return results;
        }
        else{

          $_('FAILED: ',key,' does not exist in localStorage','ls');
          
          return false;
        }
      },
      write: function(key, str){
        if (!$_ls.exists(key)){
          localStorage.setItem(key,str);

          $_('SUCCESS: stored ',key,' in localStorage','ls');
          
        }
        else{

          $_('FAILED: ',key,' already exists. Please remove before continuing','ls');
          
          return false;
        }
      },
      overwrite: function(key, str){
        if (!$_ls.exists(key)){
          localStorage.setItem(key,str);

          $_('SUCCESS: stored ',key,' in localStorage','ls');
          
        }
        else{
        	localStorage.removeItem(key);
        	localStorage.setItem(key,str);
          $_('SUCCESS: overwrote ',key,' in localStorage','ls');
          
          return false;
        }
      },
      remove: function(key){
        if($_ls.exists(key)){
          localStorage.removeItem(key);
          
          $_('SUCCESS: ',key,' removed from localStorage','ls');
          
          return true;
        }
        else{
          
          $_('FAILED: ',key,' does not exist in localStorage','ls');
          
          return false;
        }
      }
    }

	/*SessionStorage functions*/
		$_ss = {
      getAll: function(){
        var allKeys = Object.keys(sessionStorage);
        return allKeys;
      },
      exists:function(key){
        var allKeys =$_ss.getAll();
        if (allKeys.indexOf(key) > -1){
          return true;
        }
        else{
          return false;
        }
      },
      retrieve: function(key){
        if($_ss.exists(key)){
          var results = sessionStorage.getItem(key);

          $_('SUCCESS: ',key,' retrieved from sessionStorage','ss');
          
          return results;
        }
        else{

          $_('FAILED: ',key,' does not exist in sessionStorage','ss');
          
          return false;
        }
      },
      write: function(key, str){
        if (!$_ss.exists(key)){
          sessionStorage.setItem(key,str);

          $_('SUCCESS: stored ',key,' in sessionStorage','ss');
          
        }
        else{

          $_('FAILED: ',key,' already exists. Please remove before continuing','ss');
          
          return false;
        }
      },
      remove: function(key){
        if($_ss.exists(key)){
          sessionStorage.removeItem(key);
          
          $_('SUCCESS: ',key,' removed from sessionStorage','ss');
          
          return true;
        }
        else{
          
          $_('FAILED: ',key,' does not exist in sessionStorage','ss');
          
          return false;
        }
      }
    }

  /*Window size functions*/
  	var $_win = {
  		size:function(){
  			var dim = {
  				h:$_win.h(),
  				w:$_win.w()
  			}
  			return dim;
  		},
	  	h: function(perc){
	      var body = document.body,
	      html = document.documentElement;
	      
	      var ph = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	    
	      if (!perc){
	        return ph;
	      }
	      else{
	        var h = ph;
	        h = (h/100)*perc;
	        return h;
	      }
	    },
	    w: function(perc){
	      var body = document.body,
	      html = document.documentElement;
	      
	      var pw = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
	      if (!perc){
	        return pw;
	      }
	      else{
	        var w = pw;
	        w = (w/100)*perc;
	        return w;
	      }
	    }
  	};
  /*forEach function*/
	    function forEach(collection, callBack) {
	        var
	            i = 0, // Array and string iteration
	            iMax = 0, // Collection length storage for loop initialisation
	            key = '', // Object iteration
	            collectionType = '';

	        // Verify that callBack is a function
	        if (typeof callBack !== 'function') {
	            throw new TypeError("forEach: callBack should be function, " + typeof callBack + "given.");
	        }

	        // Find out whether collection is array, string or object
	        switch (Object.prototype.toString.call(collection)) {
	        case "[object Array]":
	            collectionType = 'array';
	            break;

	        case "[object Object]":
	            collectionType = 'object';
	            break;

	        case "[object String]":
	            collectionType = 'string';
	            break;

	        default:
	            collectionType = Object.prototype.toString.call(collection);
	            throw new TypeError("forEach: collection should be array, object or string, " + collectionType + " given.");
	        }

	        switch (collectionType) {
	        case "array":
	            for (i = 0, iMax = collection.length; i < iMax; i += 1) {
	                callBack(collection[i], i);
	            }
	            break;

	        case "string":
	            for (i = 0, iMax = collection.length; i < iMax; i += 1) {
	                callBack(collection.charAt(i), i);
	            }
	            break;

	        case "object":
	            for (key in collection) {
	                // Omit prototype chain properties and methods
	                if (collection.hasOwnProperty(key)) {
	                    callBack(collection[key], key);
	                }
	            }
	            break;

	        default:
	            throw new Error("Continuity error in forEach, this should not be possible.");
	        }

	        return null;
	    };

	    //Example uses

	    // Array example
	    // forEach(["a", "b", "c"], function (value, index) {
	    //     console.log(index + ": " + value);
	    // });

	    // Object example
	    // forEach({"foo": "bar", "barfoo": "foobar"}, function (value, key) {
	    //     console.log(key + ": " + value);
	    // });

	    // String example
	  	//   forEach("Hello, world!", function (character, index) {
	  	//       console.log(index + ": " + character);
	  	//   });

	/*isnumber*/
	function isNumber(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	/*isSet() function */
		function isSet(arg){
			if (typeof arg != 'undefined'){
				return true;
			}
			else{
				return false;
			}	
		}
	
	/*toUni string conversion*/
		function $_toUni(theString) {
		  var unicodeString = '';
		  for (var i=0; i < theString.length; i++) {
		    var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
		    while (theUnicode.length < 4) {
		      theUnicode = '0' + theUnicode;
		    }
		    theUnicode = '\\u' + theUnicode;
		    unicodeString += theUnicode;
		  }
		  return unicodeString;
		}
	/*isArray compatibility*/
		if(!Array.isArray) {
		  Array.isArray = function (vArg) {
		    return Object.prototype.toString.call(vArg) === "[object Array]";
		  };
		}
	/*Object.watch compatibility*/
		/*
		 * object.watch polyfill
		 *
		 * 2012-04-03
		 *
		 * By Eli Grey, http://eligrey.com
		 * Public Domain.
		 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
		 */


	/* replaceAll */ 
	String.prototype.replaceAll = function(str1, str2, ignore){
		return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
	};
	
  /* HTMLEncode - Encode HTML special characters.
    Copyright (c) 2006-2010 Thomas Peri, http://www.tumuski.com/
    MIT License
    */

    /*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true,
      plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true */

    /**
     * HTML-Encode the supplied input
     * 
     * Parameters:
     *
     * (String)  source    The text to be encoded.
     * 
     * (boolean) display   The output is intended for display.
     *
     *                     If true:
     *                     * Tabs will be expanded to the number of spaces 
     *                       indicated by the 'tabs' argument.
     *                     * Line breaks will be converted to <br />.
     *
     *                     If false:
     *                     * Tabs and linebreaks get turned into &#____;
     *                       entities just like all other control characters.
     *
     * (integer) tabs      The number of spaces to expand tabs to.  (Ignored 
     *                     when the 'display' parameter evaluates to false.)
     *
     * version 2010-11-08
     */
    var htmlEncode = function (source, display, tabs) {
      var i, s, ch, peek, line, result,
        next, endline, push,
        spaces;
      
      // Stash the next character and advance the pointer
      next = function () {
        peek = source.charAt(i);
        i += 1;
      };
      
      // Start a new "line" of output, to be joined later by <br />
      endline = function () {
        line = line.join('');
        if (display) {
          // If a line starts or ends with a space, it evaporates in html
          // unless it's an nbsp.
          line = line.replace(/(^ )|( $)/g, '&nbsp;');
        }
        result.push(line);
        line = [];
      };
      
      // Push a character or its entity onto the current line
      push = function () {
        if (ch < ' ' || ch > '~') {
          line.push('&#' + ch.charCodeAt(0) + ';');
        } else {
          line.push(ch);
        }
      };
      
      // Use only integer part of tabs, and default to 4
      tabs = (tabs >= 0) ? Math.floor(tabs) : 4;
      
      result = [];
      line = [];

      i = 0;
      next();
      while (i <= source.length) { // less than or equal, because i is always one ahead
        ch = peek;
        next();
        
        // HTML special chars.
        switch (ch) {
        case '<':
          line.push('&lt;');
          break;
        case '>':
          line.push('&gt;');
          break;
        case '&':
          line.push('&amp;');
          break;
        case '"':
          line.push('&quot;');
          break;
        case "'":
          line.push('&#39;');
          break;
        default:
          // If the output is intended for display,
          // then end lines on newlines, and replace tabs with spaces.
          if (display) {
            switch (ch) {
            case '\r':
              // If this \r is the beginning of a \r\n, skip over the \n part.
              if (peek === '\n') {
                next();
              }
              endline();
              break;
            case '\n':
              endline();
              break;
            case '\t':
              // expand tabs
              spaces = tabs - (line.length % tabs);
              for (s = 0; s < spaces; s += 1) {
                line.push(' ');
              }
              break;
            default:
              // All other characters can be dealt with generically.
              push();
            }
          } else {
            // If the output is not for display,
            // then none of the characters need special treatment.
            push();
          }
        }
      }
      endline();
      
      // If you can't beat 'em, join 'em.
      result = result.join('<br />');

      if (display) {
        // Break up contiguous blocks of spaces with non-breaking spaces
        result = result.replace(/ {2}/g, ' &nbsp;');
      }
      
      // tada!
      return result;
    };


/* JQUERY FUNCTIONS */

	/* getStyleObject Plugin for jQuery
	 * 
	 * Copyright: Unknown, see source link
	 * From: http://upshots.org/?p=112
	 * Plugin version by Dakota Schneider (http://hackthetruth.org)
	 */
		(function($){
		    $.fn.getStyleObject = function(){
		        var dom = this.get(0);
		        var style;
		        var returns = {};
		        if(window.getComputedStyle){
		            var camelize = function(a,b){
		                return b.toUpperCase();
		            }
		            style = window.getComputedStyle(dom, null);
		            for(var i=0;i<style.length;i++){
		                var prop = style[i];
		                var camel = prop.replace(/\-([a-z])/g, camelize);
		                var val = style.getPropertyValue(prop);
		                returns[camel] = val;
		            }
		            return returns;
		        }
		        if(dom.currentStyle){
		            style = dom.currentStyle;
		            for(var prop in style){
		                returns[prop] = style[prop];
		            }
		            return returns;
		        }
		        return this.css();
		    }
		})(jQuery);
	
	/* jquery.browser plugin 
	 *		https://github.com/gabceb/jquery-browser-plugin
	 *		$.browser.msie - bool
	 *		$.browser.webkit - bool
	 *		$.browser.mozilla - bool
	 *
	 *		$.browser.ipad - bool
	 *		$.browser.iphone - bool
	 *		$.browser.android - bool
	 *		
	 *		$.browser.version - string
	 */
		(function( jQuery, window, undefined ) {
			"use strict";
			 
			var matched, browser;
			 
			jQuery.uaMatch = function( ua ) {
			  ua = ua.toLowerCase();
			 
				var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
					/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
					/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
					/(msie) ([\w.]+)/.exec( ua ) ||
					ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
					[];

				var platform_match = /(ipad)/.exec( ua ) ||
					/(iphone)/.exec( ua ) ||
					/(android)/.exec( ua ) ||
					[];
			 
				return {
					browser: match[ 1 ] || "",
					version: match[ 2 ] || "0",
					platform: platform_match[0] || ""
				};
			};
			 
			matched = jQuery.uaMatch( window.navigator.userAgent );
			browser = {};
			 
			if ( matched.browser ) {
				browser[ matched.browser ] = true;
				browser.version = matched.version;
			}

			if ( matched.platform) {
				browser[ matched.platform ] = true
			}
			 
			// Chrome is Webkit, but Webkit is also Safari.
			if ( browser.chrome ) {
				browser.webkit = true;
			} else if ( browser.webkit ) {
				browser.safari = true;
			}
			 
			jQuery.browser = browser;
		})( jQuery, window );

	/*html5 data attribute plugin*/
		(function($) {
		  $.fn.hdata = function(one, two) {
		  	if (two){
		  		return this.each(function() {
		      	$(this).attr('data-'+one,two);
		    	});
		  	}
		  	else{
		  		return $(this).attr('data-'+one); 
		  	}
		    
		  };
		}(jQuery));


	/*hasAttr function plugin*/
		// (function($) {
		//   $.fn.hasAttr = function(attr) {
		//   		return this.each(function() {
		//   			var att = $(this).attr(attr);
		//   			if (typeof att != 'undefined'){
		//   				return true;
		//   			}
		//   			return false;
		//     	});
		//   };
		// }(jQuery));

	/* Simple Keybind plugin */
		(function($){
		  $.fn.keybind = function(key,init,callback,options){
		    /* definitions */
		    var thisEl = $(this);
		    var keys = {
		      'backspace':'8',
		      'tab':'9',
		      'enter':'13',
		      'esc':'27',
		      'space':'32',
		      'shift':'16','ctrl':'17','alt':'18','leftSuper':'91','rightSuper':'92',
		      'pause':'19',
		      'capsLock':'20','numLock':'144','scrLock':'145',
		      'pgup':'33','pgdown':'34','end':'35','home':'36','insert':'45','delete':'46',
		      'left':'37','up':'38','right':'39','down':'40',
		      '0':'48','1':'49','2':'50','3':'51','4':'52','5':'53','6':'54','7':'55','8':'56','9':'57',
		      'a':'65','b':'66','c':'67','d':'68','e':'69','f':'70','g':'71','h':'72','i':'73',
		        'j':'74','k':'75','l':'76','m':'77','n':'78','o':'79','p':'80','q':'81',
		        'r':'82','s':'83','t':'84','u':'85','v':'86','w':'87','x':'88','y':'89','z':'90',
		      'select':'93',
		      'num0':'96','num1':'97','num2':'98','num3':'99','num4':'100','num5':'101','num6':'102','num7':'103','num8':'104','num9':'105',
		      'add':'107','sub':'109','mult':'106','div':'111',
		      'decPoint':'110',
		      'f1':'112','f2':'113','f3':'114','f4':'115','f5':'116','f6':'117','f7':'118','f8':'119','f9':'120','f10':'121','f11':'122','f12':'123',
		      'fSlash':'191','bSlash':'220',
		      'openBracket':'219','closeBracket':'221',
		      'backTick':'192','equal':'187','dash':'189',
		      'comma':'188','period':'190','semiColon':'186','quote':'222'
		    };
		        
		    /* execution */
		    thisEl.on('keydown',function(e){
		    	if (options){
		    		if (options.indexOf('debug') > -1){
		    			console.log(e.keyCode, e);
		    			if (e.keyCode == keys[key]){
				        console.log(true);   
				      }
		    		}	
		    	}
		      if (e.keyCode == keys[key]){
		        init();   
		      }
		      else if (e.keyCode == key){
		      	init();	
		      }
		    });	 
		    thisEl.on('keyup',function(e){
					if (e.keyCode == keys[key]){
						if (callback){
		        	callback();   
		      	}
		      }
		      else if (e.keyCode == key){
		      	if (callback){
		        	callback();   
		      	}
		      }
		    });	
		  }
		})(jQuery);

