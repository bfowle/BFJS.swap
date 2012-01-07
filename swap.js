var BFJS = this.BFJS = {};

/**
 * SWAP
 * 
 * Fade old element out, new element in, with varying options
 * 
 * @namespace   BFJS
 * 
 * @oldEl       element to hide
 * @newEl       element to show
 * @options     Object
 *              |-hideOld       display:none the hide element
 *              |-hideNew       display:block+opacity:0 the new element to fade in
 *              |-durOld        duration of hide element
 *              '-durNew        duration of show element
 *
 * @returns     Function
 *
 * @usage       BFJS.swap(el1, el2);
 *              BFJS.swap(el1, el2, {hideOld: false, hideNew: false});
 *              BFJS.swap(el1, el2, {durOld: 300, durNew: 800});
 */
BFJS.swap = (function() {
	return function(oldEl, newEl, options) {
		var options = options || {},
			/**
			 * options
			 */
			options = {
				hideOld: typeOf(options.hideOld) != 'null' ? options.hideOld : true,
				hideNew: typeOf(options.hideNew) != 'null' ? options.hideNew : true,
				durOld:	typeOf(options.durOld) != 'null' ? options.durOld : 500,
				durNew: typeOf(options.durNew) != 'null' ? options.durNew : 500
			},
			/**
			 * offFunction
			 */
			offFunction = (function() {
				return function(el, fn) {
					el.set('morph', {duration: options.durOld})
						.morph({'opacity': 0})
						.get('morph')
						.chain(function() {
							if (options.hideOld) el.setStyle('display', 'none');
						});
				};
			})(),
			/**
			 * onFunction
			 */
			onFunction = (function() {
				return function(el, fn) {
					if (options.hideNew) {
						el.setStyles({
							'display': 'block',
							'opacity': 0
						});
					}
					el.set('morph', {duration: options.durNew || 500})
						.morph({'opacity': 1});
				};
			})();
		
		if (typeOf(oldEl) != 'null') {
			Array.from(oldEl).each(function(el) {
				offFunction(el);
			});
		}
		
		if (typeOf(newEl) != 'null') {
			Array.from(newEl).each(function(el) {
				onFunction(el);
			});
		}
	};
})();