var Homepage = {
	mainBanner: function(){
		var self = this;
		self.resize();
	},
	resize: function(){
		var self = this;
		jQuery('.homepage-slider').find('li').height(
			jQuery(window).height() - jQuery('header').height() + Math.abs(parseInt(jQuery('header').css('marginBottom')))
		);
	},
	slider: function(){
		var self = this;
		jQuery('.homepage-slider').find('ul').bxSlider({
			pager:false
		});
	}
}
jQuery(function(){
	Homepage.mainBanner();
});
jQuery(window).on('load', function(){
	Homepage.mainBanner();
	Homepage.slider();
});
jQuery(window).on('resize', function(){
	Homepage.resize();
});