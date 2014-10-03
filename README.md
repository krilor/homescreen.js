homescreen.js
=============

In my search for best practices around web applications added to home screen, I've decided to create this repo to share what I've learned and the resources that I've found useful. My aim is to gather best practice detection and use of the "Add to home screen" functionality on tablets/phones.

> Yes, homescreen.js relies on *browser sniffing*. For many purposes this is *not* a *recommended* technique - one should rather use *feature detection*. For this purpose though, browser sniffing makes sense, and is the only way to actually check for the feature `Add to home screen`.


**Current support**
"Add to home screen" and fullscreen start of web apps is currently supported by
* Chrome version 31 and up running on Android
* Safari running iOS version 6 and up

**Resources**
* Google Chromes resource for [Add to home screen](https://developer.chrome.com/multidevice/android/installtohomescreen)
* Apples resource for so-called [Web Clips](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
* Currently Matteos [Add to home screen](http://cubiq.org/add-to-home-screen) Javascript widget is a good place to go is you want a simple way of promping the user to add you page to home screen.
* For general best practice HTML5 stuff, i refer to [HTML5 Boilerplate](http://html5boilerplate.com/).

# How to use homescreen.js
There are two ways of using homescreen.js
* Include homescreen.js as is
* Copy the tests in the js code into your own code
I would suggest using the second approach, as it gives you more control over what happends. Regardless of method, for the web app to be able to launch in full screen mode, it has to be marked as web app capable.
The following code ensures that (for Android and Apple Devices).
```html
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
```
In the following I explain how to use homescreen.js as is.

## Including homescreen.js
Include the script at the end of your `body` element.
```
<script src="homescreen.js"></script>
```
This will give you access to the object `homescreen` wich has the following properties.
* homescreen.isCompatibleChrome
* homescreen.isCompatibleSafari
* homescreen.isCompatibleBrowser
* homescreen.isStandalone

These are all `boolean` values and fairly self-explanatory. In the following, the tests behind each of these are explained.

### isCompatibleCrome
The `regex` expressions ensure that we have the proper OS, browser and version on Android/Chrome is:

```
/android.*chrome\/(3[1-9]|[4-9][0-9])[.0-9]*.*(?!mobile)/i
```

### isCompatibleSafari
The `regex` expressions ensure that we have the proper device, OS, browser and version on iOS/Safari is:
```
/(iphone|ipod|ipad).*os [6-9].*safari/i
```

### isCompatibleBrowser
This is a simple combination of the two preceding tests
```javascript
isCompatibleCrome || isCompatibleCrome
```

### isStandalone
This test checks if the web app is launced from home screen. When a web clip is lauched on iOS, it sets `window.navigator.standalone` to `true`. homescreen.js checks for the existence of this property and if is a supported Safari browser.

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
## Then what
You can use homescreen.js for whatever purpose you want. I've included two examples of use in the `test.html` file. They are as follows.

### Directly altering DOM elements.
This is an example of how you can use e.g. the isCompatibleChrome value to alter a DOM element.
```javascript
if (homescreen.isCompatibleChrome) { document.getElementById("compChrome").innerHTML = "Yes"; }
```
It changes the respective elements inner HTML to Yes if true.

### By adding classes to the HTML element.
This is the **modernizr-way**. Use the test to add a class to the HTML-element. Then use CSS to manipulate the element. Use e.g. the following `javascript` code.
```javascript
if (homescreen.isCompatibleChrome) { e.className += ' hsChrome'; }
```
You can then use some CSS for conditional formatting.
```css
#compChrome {
	background-color: red;
}

.hsChrome #compChrome {
	background-color: green;
}
```
The element will be green if the test is `true`, and red if not.

## TODO
There are lots still to do, but it's getting there. Feel free to comment and suggest improvements.

