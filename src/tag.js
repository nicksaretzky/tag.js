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
		html: function(html) {
			this.el.innerHTML += html;
			return this;
		},
		text: function(text) {
			if (text) this.el.appendChild(document.createTextNode(text));
			return this;
		},
		class: function(classNames) {
			if (classNames) this.className += ' ' + classNames;
			return this;
		},
		attr: function(attrs) {
			if (!attrs) return;
			for (a in attrs) {
				this.el.setAttribute(a, attrs[a]);
			}
			return this;
		},
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
		data: function(data) {
			if (!data) return;
			for (var p in data) {
				this.el.dataset[p] = data[p];
			}
			return this;
		},
		close: function() {
			document.body.appendChild(this.el);
		}
	}

	window.tag = tag;
})();