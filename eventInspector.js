window.__events = (function() {
	/* The list of all event listeners */
	var list = [];

	/* Builds the tag unique name */
	function __getTagUid(tag) {
		return tag.tagName + ' #' + tag.id + ' .' + tag.className;
	}

	/* Save the original functions */
	HTMLElement.prototype.__addEventListener = HTMLElement.prototype.addEventListener;
	HTMLElement.prototype.__removeEventListener = HTMLElement.prototype.removeEventListener;

	/* Override the add method to store the events */
	HTMLElement.prototype.addEventListener = function(a, b, c) {
		list.push({
			owner: __getTagUid(this),
			evt: a,
			stack: new Error('new listener')
		});
		this.__addEventListener(a, b, c);
	};

	/* Override the remove method to free the events */
	HTMLElement.prototype.removeEventListener = function(a, b, c) {
		for (var i = list.length - 1; i >= 0; i--) {
			if (list[i].owner === __getTagUid(this)) {
				list.splice(i, 1);
				break;
			}
		}
		this.__removeEventListener(a, b, c);
	};


	/* Exports */
	return {
		/* Returns the total number of active event listeners */
		count: function() {
			return list.length;
		},
		/* Returns the list of event listeners with event name $evt */
		getWithEvt: function(evt) {
			return list.filter(function(e) {
				return (e.evt === evt);
			});
		},
		/* Returns the list of event listeners for tag name $tag */
		getWithTag: function(tag) {
			return list.filter(function(e) {
				return (e.owner.substring(0, e.owner.indexOf(' ')) === tag.toUpperCase());
			});
		},
		/* Returns the number of event listeners by tag */
		countByTag: function() {
			var result = {};
			list.forEach(function(e) {
				if (e.owner in result) result[e.owner]++;
				else result[e.owner] = 1;
			});
			return result;
		},
		/* Returns the number of event listeners by event */
		countByEvt: function() {
			var result = {};
			list.forEach(function(e) {
				if (e.evt in result) result[e.evt]++;
				else result[e.evt] = 1;
			});
			return result;
		}
	};
})();