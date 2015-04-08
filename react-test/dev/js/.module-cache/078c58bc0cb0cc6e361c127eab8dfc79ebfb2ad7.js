define(function (require, exports, module) {
	var React = require('react')
	var $ = require('jquery')

	var Item = React.createClass({displayName: "Item",
		componentDidMount: function() {
			var $item = $(this.refs.item.getDOMNode())
			var index = $item.index() - 2
			var $prev = $item.prev().prev()
			if ($prev.length === 0) {
				return
			}
			var top = $prev.offset().top + $prev.height() + 10
			$item.css({
				top: top
			})
			
			var $parent = $item.parent()
			top += $item.height()
			if ($parent.height() < top) {
				$parent.height(top)
			}
		},
		render: function() {
			return (
				React.createElement("div", {className: "waterfall-item", ref: "item"}, React.createElement("img", {src: this.props.url}))
				)
		}
	})


	var List = React.createClass({displayName: "List",
		render: function() {
			return (
				React.createElement("div", {className: "waterfall-list"}, 
					
						this.props.urls.map(function(url) {
							return React.createElement(Item, {url: url})
						})
					
				)
				)
		}
	})


	var waterfall = {
		urls: ['img/01.jpg','img/02.jpg','img/03.jpg','img/04.jpg','img/05.jpg','img/06.jpg'],
		preload: function(callback) {
			var count = 0
			var total = this.urls.length
			this.urls.forEach(function(url) {
				var img = new Image()
				img.onload = function() {
					count += 1
					if (count === total) {
						callback()
					}
				}
				img.src = url
			})
		},
		onScroll: function() {
			var urls = []
			window.addEventListener('scroll', function() {
				var $win = $(window);
				var scrollTop = $win.scrollTop();
				var winHeight = $win.height();
				var docHeight = $(document).height();
				var diff = scrollTop + winHeight - docHeight;
				if (Math.abs(diff) <= 50) {
					urls = urls.concat(this.urls.sort(function() {
						return Math.random() - 0.5
					}))
					React.render(
						React.createElement(List, {urls: urls}),
						document.getElementById('container')
						)
				}
			}.bind(this), false)
		},
		init: function() {
			this.preload(this.onScroll.bind(this))
		}
	}

	module.exports = waterfall
})