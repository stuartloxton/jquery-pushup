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
		Firefox: 3,
		IE: 7,
		Opera: 9,
		Safari: 3
	},
	init: function() {
		jQuery.each(jQuery.pushup.browsVer, function(x, y) {
			if(y && y < jQuery.pushup.browsers[x]) {
				if (!jQuery.pushup.options.ignoreReminder && jQuery.pushup.cookiesEnabled &&
					Cookie.get('_pushupBlocked')) { return } else { jQuery.pushup.showMessage(x) };
			}
		});
	},
	showMessage: function(browser) {
		elm = document.createElement('div');
		elm.style.display = 'none';
		elm.id = 'pushup';
		jQuery('body').prepend(elm);
		jQuery('#pushup').append('<a class="pushup_messageLink" target="_blank" href=""><div class="pushup_icon" style=""/><span class="pushup_message"></span></a>');
		jQuery('.pushup_message').html(jQuery.pushup.options.message);
		
		var hours = jQuery.pushup.options.reminder.hours;
		if (hours && jQuery.pushup.cookiesEnabled) {
			jQuery('#pushup').addClass('withReminder').append(document.createElement('a'));
			var H = hours + ' hour' + (hours > 1 ? 's' : ''),
			message = jQuery.pushup.options.reminder.message.replace('#{hours}', H);
			jQuery('#pushup a:last').attr('href', '#').addClass('pushup_reminder').html(message);
			jQuery('.pushup_reminder').click(function() {
				Cookie.set('_pushupBlocked', 'blocked', { duration: 1 / 24 * jQuery.pushup.options.reminder.hours })
				jQuery.pushup.hideMessage();
				return false;
			});
		}
		
		if(/^http\:\/\//.test(jQuery.pushup.options.images) || /^\//.test(jQuery.pushup.options.images)) {
			imgSrc = jQuery.pushup.options.images;
		} else {
			jQuery('script[src]').each(function(x, y) {
				if(/jquery\.pushup/.test(jQuery(y).attr('src'))) {
					srcFol =  jQuery(y).attr('src').replace('jquery.pushup.js', '');
					imgSrc = srcFol + jQuery.pushup.options.images;
				}
			});
		}
		jQuery('.pushup_icon').css({
			background: 'url('+imgSrc+browser.toLowerCase()+'.png) no-repeat top left'	
		});
		
		
		jQuery('#pushup').fadeIn('slow');
	},
	hideMessage: function() {
		jQuery('#pushup').fadeOut('slow');
	}
}
var Cookie = {
  set: function(name, value) {
    var expires = '', options = arguments[2] || {};
    if (options.duration) {
      var date = new Date();
      date.setTime(date.getTime() + options.duration * 1000 * 60 * 60 * 24);
      value += '; expires=' + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  },

  remove: function(name) { this.set(name, '', -1) },

  get: function(name) {
    var cookies = document.cookie.split(';'), nameEQ = name + "=";
    for (var i = 0, l = cookies.length; i < l; i++) {
      var c = cookies[i];
      while (c.charAt(0) == ' ')
        c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0)
        return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
};
jQuery.pushup.cookiesEnabled = (function(test) {
  if (Cookie.get(test)) return true;
  Cookie.set(test, 'test', { duration: 15 });
  return Cookie.get(test);
})('_pushupCookiesEnabled');
jQuery(function() {
	jQuery.pushup.init();
});
