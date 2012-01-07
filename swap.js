var BFJS = this.BFJS = {};

/**
 * SWAP
 * 
 * Fade old element out, new element in, with varying options
 * 
 * @namespace	BFJS
 * 
 * @oldEl		element to hide
 * @newEl		element to show
 * @options		Object
 *				|-hideOld		display:none the hide element
 * 				|-hideNew		display:block+opacity:0 the new element to fade in
 * 				|-durOld		duration of hide element
 * 				'-durNew		duration of show element
 *
 * @returns		Function
 *
 * @usage		BFJS.swap(el1, el2);
 *				BFJS.swap(el1, el2, {hideOld: false, hideNew: false});
 *				BFJS.swap(el1, el2, {durOld: 300, durNew: 800});
 */
BFJS.swap = function(oldEl, newEl, options) {
	var options = options || {},
		/**
		 * options
		 */
		options = {
			hideOld: options.hideOld || true,
			hideNew: options.hideNew || true,
			durOld:	options.durOld || 500,
			durNew: options.durNew || 500
		},
		/**
		 * offFunction
		 */
		offFunction = function(el, fn) {
			el.set('morph', {duration: options.durOld})
				.morph({'opacity': 0})
				.get('morph')
				.chain(function() {
					if (options.hideOld) el.setStyle('display', 'none');
				});
		},
		/**
		 * onFunction
		 */
		onFunction = function(el, fn) {
			if (options.hideNew) {
				el.setStyles({
					'display': 'block',
					'opacity': 0
				});
			}
			el.set('morph', {duration: options.durNew || 500})
				.morph({'opacity': 1});
		};
		
	if (typeOf(oldEl) == 'elements') {
		oldEl.each(function(el) {
			offFunction(el);
		});
	} else if (typeOf(oldEl) == 'element') {
		offFunction(oldEl);
	}
	
	if (typeOf(newEl) == 'elements') {
		newEl.each(function(el) {
			onFunction(el);
		});
	} else if (typeOf(newEl) == 'element') {
		onFunction(newEl);
	}
};