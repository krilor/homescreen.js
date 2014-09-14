//homescreen.js v0.1
"use strict";

window.homescreen = ( function( window, document, undefined ) {

	var homescreen = {};

	// It has to be an android device with a chrome browser with version above 31. 
	function isCompatibleChrome() {
		return ((/android.*chrome\/(3[1-9]|[4-9][0-9])[.0-9]*.*(?!mobile)/i.test(navigator.userAgent)))
			 true;
	}

	// It has to be an iphone/ipod/ipad on os version above 6 running safari, and not CriOS (Chrome)
	function isCompatibleSafari() {
		return (((/(iphone|ipod|ipad).*os [6-9].*safari/i).test(navigator.userAgent)) && navigator.userAgent.indexOf('CriOS') < 0 )
	}


	function isStandalone(){
		var test = false;

		// Safari on iOS sets the window.navigator.standalone to true if it is standalone.
		if( isCompatibleSafari() && ("standalone" in window.navigator)) {
			if(window.navigator.standalone){
				test = true; 
			}
		}

		// For Android/Chrome we have to calculate the difference in screen height and document height
		// What we ask is: Is there a browser bar?
		if(isCompatibleChrome() && ( screen.height - window.innerHeight < 40 ) ) {
			test = true;
		}
		return test;
	}

	console.log("RUNNING")

	// Adding properties to the object
	homescreen['isCompatibleChrome'] = isCompatibleChrome();
	homescreen['isCompatibleSafari'] = isCompatibleSafari();
	homescreen['isStandalone'] = isStandalone();

	// Return the object with its properties
	return homescreen;

})(this, this.document);