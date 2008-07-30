/* Small additions to jQuery core */

jQuery.pushup = {
	Version: '0.1.0',
	options: {
		appearDelay: .5,
	    fadeDelay: 6,
	    images: '../images/pushup/',
	    message: 'Important browser update available',
	    reminder: {
	    	hours: 6,
	    	message: 'Remind me again in #{hours}'
	    },
	    skip: true
	},
	updateLinks: {
		IE: 'http://www.microsoft.com/windows/downloads/ie/',
		Firefox: 'http://www.getfirefox.com',
		Safari: 'http://www.apple.com/safari/download/',
		Opera: 'http://www.opera.com/download/'
	},
	browsVer: {
		Firefox: (navigator.userAgent.indexOf('Firefox') > -1) ? parseFloat(navigator.userAgent.match(/Firefox[\/\s](\d+)/)[1]) : false,
		IE: (jQuery.browser.msie) ? parseFloat(jQuery.browser.version) : false,
		Safari: (jQuery.browser.safari) ? parseFloat(jQuery.browser.version) : false,
		Opera: (jQuery.browser.opera) ? parseFloat(jQuery.browser.version) : false
	},
	browsers: {
		Firefox: 2,
		IE: 7,
		Opera: 9,
		Safari: 3
	},
	init: function() {
		jQuery.each(jQuery.pushup.browsVer, function(x, y) {
			if(y && y < jQuery.pushup.browsers[x]) {
				// Do stuff here
			}
		});
	}
}
alert(jQuery.pushup.browsVer.IE);
jQuery.pushup.init();