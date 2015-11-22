//fix for ie8-9
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };

var ScrollAnimation = {
    timeLine: 250,
    windowHeight: 0,
    scrollTop: 0,
    isInit: false,
    animation: false,
    animatedBlocks: null,
    delayTimer: null,

    init : function(){
        //Mobile.yes = true;
        var self = this;
        self.initBlocksAnimation();

        self.isInit = true;
        self.blocksAnimation();
    },

    initBlocksAnimation: function(){
        var self = this;
        self.animatedBlocks = jQuery('.slow-show');
        jQuery.each(self.animatedBlocks, function(index, block){
            var $block = jQuery(block);
            $block.data('top',$block.offset().top).addClass('animate');
        });
        self.windowHeight = jQuery(window).height();
        if(!Mobile.isMobileDevice){
            self.blocksAnimation();
        }
    },

    blocksAnimation: function(){
        var self = this;
        if(!self.isInit) return false;

        if(self.animatedBlocks.length){
            jQuery.each(self.animatedBlocks, function(index, block){
                var $block = jQuery(block);
                var _timeLine = $block.data('timeline') || self.timeLine;
                if($block.data('top') <= (self.windowHeight + self.scrollTop - _timeLine)){
                    if(!$block.hasClass('animation')){
                        $block.addClass('animation');
                    }
                } else {
                    if($block.hasClass('animation')){
                        $block.removeClass('animation');
                    }
                }
            });
        }
    },

    onScroll: function(){
        var self = this;
        if(!Mobile.isMobileDevice){
            if(self.delayTimer) clearTimeout(self.delayTimer);
            self.delayTimer = setTimeout(function(){
                self.onDelayScroll();
            }, 100);
        }
    },

    onDelayScroll: function(){
        var self = this;
        self.scrollTop = jQuery(window).scrollTop();
        self.blocksAnimation();
    },

    resize: function(){
        var self = this;
        self.windowHeight = jQuery(window).height();
        if(!Mobile.isMobileDevice){
            self.initBlocksAnimation();
        }
    }
};

var Mobile = {
    yes: false,
    isIpad: false,
    isMobileDevice: false,
    init: function(){
        var self = this;
        if(navigator.userAgent.toLowerCase().indexOf('ipad') + 1)
        {
            self.isIpad = true;
            jQuery('body').addClass('ipad');
        }
        if(screen.width < 1024){
            self.isMobileDevice = true;
            jQuery('body').addClass('mobile-device');
        }
        self.resize();
    },
    resize: function(){
        var self = this;
        if(screen.width <= 780){
            self.yes = true;
            jQuery('body').addClass('mobile');
        } else {
            self.yes = false;
            jQuery('body').removeClass('mobile');
        }
    }
};

var Homepage = {
	mainBanner: function(){
		var self = this;
		self.resize();
	},
	resize: function(){
		var self = this;
		self.slide = jQuery('.homepage-slider').find('li');
		self.slide.height(
			jQuery(window).height() - jQuery('header').height() + Math.abs(parseInt(jQuery('header').css('marginBottom')))
		);
		jQuery('.category-description-holder').height(
			self.slide.height() - jQuery('.welcome-msg-holder').innerHeight()
		);
	},
	slider: function(){
		var self = this;
		jQuery('.homepage-slider').find('ul').bxSlider({
			pager:false
		});
	},
	welcomeMsg: function(){
		var self = this;
		self.welcomeContainer = jQuery('.welcome-msg-holder');
		self.sliderHolder = jQuery('.homepage-slider');
		setTimeout(function(){
			self.welcomeContainer.addClass('showed');
			self.sliderHolder.addClass('showed');
			jQuery('.bx-controls-direction').addClass('showed');
		}, 500);
	},
	customTabs: function(){
		var self = this;
		self.tabsContainer = jQuery('.tabs-wrapper');
		self.tabsHeading = jQuery('.tabs-heading');
		jQuery('a[href="#tabs-1"]').on('click', function(e){
			if(!self.tabsContainer.find('#tabs-1').hasClass('active') && !jQuery(this).hasClass('active')){
				self.tabsContainer.find('.tabs').removeClass('active');
				self.tabsHeading.find('a').removeClass('active');
				self.tabsContainer.find('#tabs-1').addClass('active');
				jQuery(this).addClass('active');
			} e.preventDefault();
		});
		jQuery('a[href="#tabs-2"]').on('click', function(e){
			if(!self.tabsContainer.find('#tabs-2').hasClass('active') && !jQuery(this).hasClass('active')){
				self.tabsContainer.find('.tabs').removeClass('active');
				self.tabsHeading.find('a').removeClass('active');
				self.tabsContainer.find('#tabs-2').addClass('active');
				jQuery(this).addClass('active');
			} e.preventDefault();
		});
		jQuery('a[href="#tabs-3"]').on('click', function(e){
			if(!self.tabsContainer.find('#tabs-3').hasClass('active') && !jQuery(this).hasClass('active')){
				self.tabsContainer.find('.tabs').removeClass('active');
				self.tabsHeading.find('a').removeClass('active');
				self.tabsContainer.find('#tabs-3').addClass('active');
				jQuery(this).addClass('active');
			} e.preventDefault();
		});
		jQuery('a[href="#tabs-4"]').on('click', function(e){
			if(!self.tabsContainer.find('#tabs-4').hasClass('active') && !jQuery(this).hasClass('active')){
				self.tabsContainer.find('.tabs').removeClass('active');
				self.tabsHeading.find('a').removeClass('active');
				self.tabsContainer.find('#tabs-4').addClass('active');
				jQuery(this).addClass('active');
			} e.preventDefault();
		});
		jQuery('a[href="#tabs-5"]').on('click', function(e){
			if(!self.tabsContainer.find('#tabs-5').hasClass('active') && !jQuery(this).hasClass('active')){
				self.tabsContainer.find('.tabs').removeClass('active');
				self.tabsHeading.find('a').removeClass('active');
				self.tabsContainer.find('#tabs-5').addClass('active');
				jQuery(this).addClass('active');
			} e.preventDefault();
		});
	},
	tabsSliders: function(){
		var self = this;
		slider1 = jQuery('#tabs-1 > ul').bxSlider({
			controls: true,
			slideWidth: 272,
			minSlides: 4,
			maxSlides: 4,
			moveSlides: 1,
			slideMargin: 30,
			pager: false,
			prevSelector: '.prev-1',
			nextSelector: '.next-1'
		});
		slider2 = jQuery('#tabs-2 > ul').bxSlider({
			controls: true,
			slideWidth: 272,
			minSlides: 4,
			maxSlides: 4,
			moveSlides: 1,
			slideMargin: 30,
			pager: false,
			prevSelector: '.prev-2',
			nextSelector: '.next-2'
		});
		slider3 = jQuery('#tabs-3 > ul').bxSlider({
			controls: true,
			slideWidth: 272,
			minSlides: 4,
			maxSlides: 4,
			moveSlides: 1,
			slideMargin: 30,
			pager: false,
			prevSelector: '.prev-3',
			nextSelector: '.next-3'
		});
		slider4 = jQuery('#tabs-4 > ul').bxSlider({
			controls: true,
			slideWidth: 272,
			minSlides: 4,
			maxSlides: 4,
			moveSlides: 1,
			slideMargin: 30,
			pager: false,
			prevSelector: '.prev-4',
			nextSelector: '.next-4'
		});
		slider5 = jQuery('#tabs-5 > ul').bxSlider({
			controls: true,
			slideWidth: 272,
			minSlides: 4,
			maxSlides: 4,
			moveSlides: 1,
			slideMargin: 30,
			pager: false,
			prevSelector: '.prev-5',
			nextSelector: '.next-5'
		});
	},
	postSlider: function(){
		var self = this;
		sliderBlog = jQuery('.blog-carousel').bxSlider({
			controls: true,
			slideWidth: 238,
			minSlides: 2,
			maxSlides: 2,
			moveSlides: 1,
			slideMargin: 60,
			pager: false,
			prevSelector: '.prev-post',
			nextSelector: '.next-post'
		});
	},
	bestSellSlider: function(){
		var self = this;
		sliderBestSell = jQuery('.products-container').find('.carousel-holder > ul').bxSlider({
			controls: true,
			slideWidth: 272,
			minSlides: 3,
			maxSlides: 3,
			moveSlides: 1,
			slideMargin: 30,
			pager: false,
			prevSelector: '.prev-sell',
			nextSelector: '.next-sell'
		});
	},
	formStyler: function(){
		$('#catalog-sort, #catalog-show').styler();
	},
	hideCheckbox: function(){
		var self = this;
		self.optionLabel = jQuery('.option').children('label');
		jQuery(self.optionLabel).on('click', function(e) {
			if(jQuery(this).parent('div').hasClass('inactive')) {
				jQuery(this).prev().attr("disabled", true);
			} else {
				jQuery(this).prev().removeAttr("disabled");
			}
		});
	},
	modal: function(){
		var self = this;
		self.modal = jQuery('.modal');
		self.windowBody = jQuery('body');
		jQuery('.quick-look-btn').click(function(){
				self.modal.show();
			    self.windowBody.addClass('modal-lock');
		    });
		jQuery('.modal-close-btn, .modal-bg').click(function(){
				self.modal.hide();
			    self.windowBody.removeClass('modal-lock');
		    });
		jQuery('.modal a').click(function(){
			    self.windowBody.removeClass('modal-lock');
		    });

	}

};
jQuery(function(){
	Mobile.init();
	Homepage.mainBanner();
	Homepage.welcomeMsg();
	Homepage.customTabs();
	Homepage.formStyler();
	Homepage.hideCheckbox();
	Homepage.modal();	

	jQuery(window).on('load', function(){
		Homepage.mainBanner();
		Homepage.slider();
		Homepage.tabsSliders();
		Homepage.postSlider();
		Homepage.bestSellSlider();
		ScrollAnimation.init();		
	});

	jQuery(window).on('resize', function(){
		Mobile.resize();
		Homepage.resize();
		ScrollAnimation.resize();
	});

	jQuery(window).on('scroll', function(){
		ScrollAnimation.onScroll();
	});
});