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
			$item.css({
				top: $prev.offset().top + $prev.height()
			})
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
					console.log(count)
					if (count === total) {
						callback()
					}
				}
				img.src = url
			})
		},
		init: function() {
			this.preload(function() {

				setInterval(function() {
					React.render(
					React.createElement(List, {urls: this.urls.sort(function() {
						return Math.random() - 0.5
					})}),
					document.getElementById('container')
					)
				}.bind(this), 1000)
				
			}.bind(this))
		}
	}

	module.exports = waterfall
})