(function() {
	function tag(selector) {
		return new Tag(selector);
	}

	function Tag(selector) {
		var classList = [], id = null;
		var nodeName = selector.replace(/([#.])(\w+)/g, function(match, specifier, val) {
			if (specifier == '#') {
				id = val;
			} else {
				classList.push(val);
			}
			return '';
		});

		this.el = document.createElement(nodeName);
		if (classList.length) this.el.className = classList.join(' ');
		if (id) this.el.id = id;
	}

	Tag.prototype = {
		/** Append a tag within the current tag, returns the appended tag. */
		tag: function(selector) {
			var tag = new Tag(selector);
			tag.parentTag = this;
			this.el.appendChild(tag.el);
			return tag;
		},
		/** Append html string to content */
		html: function(html) {
			this.el.innerHTML += html;
			return this;
		},
		/** Append text to content */
		text: function(text) {
			if (text) this.el.appendChild(document.createTextNode(text));
			return this;
		},
		/** Append to className */
		class: function(classNames) {
			if (classNames) this.className += ' ' + classNames;
			return this;
		},
		/** Set attributes */
		attr: function(attrs) {
			if (!attrs) return;
			for (a in attrs) {
				this.el.setAttribute(a, attrs[a]);
			}
			return this;
		},
		/** Append Tag, Element or string to content via anonymous function */
		then: function(f) {
			if (!f) return;
			var r = f();
			if (r instanceof Tag) {
				this.el.appendChild(r.el);
			} else if (r instanceof Element) {
				this.el.appendChild(r);
			} else if (typeof(r) == 'string') {
				this.innerHTML += r;
			}
			return this;
		},
		/** Set data attributes on element */
		data: function(data) {
			if (!data) return;
			for (var p in data) {
				this.el.dataset[p] = data[p];
			}
			return this;
		},
		/** Append tag to body element and return self, or returns parent tag if already nested. */
		close: function() {
			var parent = this.parentTag;
			if (!parent) {
				document.body.appendChild(this.el);
				return this;
			}
			return parent;
		}
	}

	window.tag = tag;
})();