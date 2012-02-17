(function (window, document, $, space) {

	function rnd(max) {
		return Math.floor(Math.random() * max);
	}
	function rndSize() {
		var n = rnd(100);
		if (n < 20) {
			return 1;
		} else if (n < 50) {
			return 2;
		} else {
			return 3
		}
	}
	space.starfield = new function Starfield() {
		var this$ = $(".starfield")
			, stars = [];

		this.addStar = function (star) {
			stars.push(star);
			this$.append(star.getElement());
			return star;
		};
		
		this.getStars = function () {
			return stars;
		};
		
		this.getHeight = function () {
			return this$.height();
		};
		
		this.fly = function () {
			stars.forEach(function (star) {
				star.fly();
			});
			setInterval(function () {
				stars.forEach(function (star) {
					if (star.isFinished()) {
						setTimeout(function() {
							star.reset(rndSize(), rnd(space.starfield.getHeight()), function (star) { star.fly(); });							
						}, 20)
					}
				});
			}, 1000)
		};
	};

	space.Star = function (size, top) {
		var self = this
			, local = { starElement: $('<div>&#x2765;</div>'), size: 1, top: 0, time: 0, timerId: null, isFinished: false };

		this.getElement = function () {
			self.reset(local.size, local.top);
			return local.starElement;
		};

		this.reset = function (size, top, cb) {
			cb = cb || new Function ();
			local.timerId = clearTimeout(local.timerId);
			local.isFinished = false;
			local.starElement.css({
				"top": (top || 0) + "px",
				"-webkit-transition": "none"
			});
			local.starElement.attr("class", "star size" + size);
			setTimeout(function () {
				var duration = (((size * (500)) + (size * rnd(4000))))
					, delay = rnd(5000);
				local.time = duration + delay;
				local.starElement.css({
					"-webkit-transform": "translateZ(0);",
					"-webkit-transition": "right " + duration + "ms " + delay + "ms linear"
				});
				cb(self);
			}, 0);
			return self;
		};
		
		this.isFinished = function () {
			return local.isFinished;
		}
		
		this.fly = function () {
			local.timerId = setTimeout(function () {
				local.isFinished = true;
			}, local.time + 10);
			local.starElement.addClass("fly");
			return self;
		};

		this.setSize = function (size) {
			local.size = size || local.size;
		};
		if (size) { self.setSize(size); }

		this.setTop = function (top) {
			local.top = top || local.top;
		};
		if (top) { self.setTop(top); }
	};

	for (var i = 0; i < 40; i += 1) {
		setTimeout(function () { 
			space.starfield.addStar(new space.Star(rndSize(), rnd(space.starfield.getHeight())));
		}, 20)
	}

	setTimeout(function () { 
		space.starfield.fly();
	}, 1000)
	
}(window, window.document, window.jQuery, window.space = window.space || {}));
