homescreen.js
=============

In my search for best practices around web applcations added to home screen, I've decided to create this repo to share what I've learned and the resources that I've found useful. My aim is to gather best practice detection and use of the "Add to home screen" functionality.

Currently Matteos [Add to home screen](http://cubiq.org/add-to-home-screen) javascript widget is a good place to go is you want a simple way of promping the user to add you page to home screen. homescreen.js only detects functionality, and does not act upon it. I leave that for each developer.

For general best practice HTML5 stuff, i refer to [HTML5 Boilerplate](http://html5boilerplate.com/).

# Current support
"Add to home screen" and fullscreen start of web apps is currently supported by
* Chrome version 31 and up running on Android
* Safari running os iOS version 6 and up

## Checking for supported browser
homescreen.js uses browser sniffing to detect supported browsers. The `regex` expressions ensure that we have the proper device, browser and version.
For Android/Chrome:
```
/android.*chrome\/(3[1-9]|[4-9][0-9])[.0-9]*.*(?!mobile)/i
```
For iOS:
```
/(iphone|ipod|ipad).*os [6-9].*safari/i
```

## Marking as web app capable
For the web app to be able to launch in full screen mode, it has to be marked as web app capable.
The following code ensures that (for Android and Apple Devices).
```html
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
```

## Check is app is launced from home screen.
When a [Web Clip](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html#//apple_ref/doc/uid/TP40002051-CH3-SW2) is lauched on iOS, it sets `window.navigator.standalone` to `true`. homescreen.js checks for the existence of this property and if is a supported Safari browser.

For Android devices, homescreen.js checks if `screen.height` is less than 40 pixels smaller than `window.innerHeight`. This is really a hack, but is currently the best way to check on Android devices. There is an [issue with checking the viewport width](http://www.quirksmode.org/mobile/viewports2.html). To make sure that the function works, we have to make sure that the webpage scale is 1. Use the following meta tag:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

The javascript code is as follows:
```javascript
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

```

## TODO
There are lots still to do, but it's getting there. Feel free to comment and suggest improvements.

