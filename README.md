tag.js
======

Ultralight DOM wrapper for templating.

h1. Create a tag

<pre>
tag("h1#welcome.heading")
</pre>

Tag uses a css-selector inspired syntax to quickly set tag name, class list and id.

h2. Properties

Add class names:

<pre>
tag('a').class('link')
</pre>

Set attributes:

<pre>
tag('a').attr({src: "#fragment"})
</pre>

h2. Content

Add text or html

<pre>
tag('p').text("1 is &gt; 2.").html(" &lt;strong&gt;really.&lt;/strong&gt;")
</pre>

Add more complex content

<pre>
tag('p')
	.then(function() {
		return tag('strong').text('hello')
	})
	.then(function() {
		return "&lt;p&gt;foobar&lt;/p&gt;"
	})
	.then(function() {
		return document.getElementById('foo').cloneNode(true)
	})
</pre>

h2. Write to the body tag

<pre>
tag('p').text("Hello world").close()
</pre>