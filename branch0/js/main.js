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
        } else {
        	self.animatedBlocks.css('opacity','1');
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
	mainMenu: function() {
		var self = this;
		self.navLink = jQuery('.nav').children('li');
		self.navMenu = jQuery('.nav');
		if (jQuery(window).width() >= 1200) {
			jQuery(self.navLink).hover(function() {
       jQuery(this).find('.submenu').stop()
       .addClass('active')
       .slideDown('fast');
	    }, 
	    function () {
       jQuery(this).find('.submenu').stop()
       .removeClass('active')
       .slideUp('fast');
	    });

	  	self.navMenu.css("display", "");
		}
	},
	mainMenuMob: function() {
		self.navLink = jQuery('.nav').children('li');
		self.submenu = jQuery('.submenu');
		jQuery(self.navLink)
			.has('.submenu')
			.addClass('has-submenu')
			.append('<i class="submenu__toggle"></i>');

		jQuery('.submenu__toggle').on('click', function() {
			if (!jQuery(this).siblings(self.submenu).hasClass('submenu--show')) {
				self.submenu.slideUp('fast');
				self.submenu.removeClass('submenu--show');				
				jQuery(this).siblings('.submenu').slideDown('fast');
				jQuery(this).siblings('.submenu').addClass('submenu--show');

				self.navLink.removeClass('open');
				jQuery(this).parent().addClass('open');

				jQuery('.submenu__toggle').removeClass('active');
				jQuery(this).addClass('active');				
			} else {
				jQuery(this).siblings('.submenu').slideUp('fast');
				jQuery(this).siblings('.submenu').removeClass('submenu--show')

				jQuery(this).parent().removeClass('open');

				jQuery(this).removeClass('active');
			}
		})			
	},
	menuBtn: function() {
		var self = this;
		self.navBtn = jQuery('.nav-btn');
		self.navBtn.on('click', function() {
		  jQuery(this).toggleClass('active');
		  jQuery(this).next().slideToggle('fast');
		});		
	},
	mainBanner: function(){
		var self = this;
		self.resize();
	},
	resize: function(){
		var self = this;
		self.slide = jQuery('.homepage-slider').find('li');
		self.welcomeMsgHolder = jQuery('.welcome-msg-holder').innerHeight()
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
			pager:false,
			auto: true,
			pause: 4000
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
		var maxSlides,
		    winWidth = jQuery(window).width();
		if (winWidth < 684) {
		    maxSlides = 1;
		} else if ((winWidth >= 684)&&(winWidth < 986)) {
		    maxSlides = 2;
		} else if ((winWidth >= 986)&&(winWidth < 1288)) {
		    maxSlides = 3;
		} else {
				maxSlides = 4;
		}
		slider1 = jQuery('#tabs-1 > ul').bxSlider({
			controls: true,
			slideWidth: 272,
			minSlides: 1,
			maxSlides: maxSlides,
			moveSlides: 1,
			slideMargin: 25,
			pager: false,
			prevSelector: '.prev-1',
			nextSelector: '.next-1'
		});  		
		slider2 = jQuery('#tabs-2 > ul').bxSlider({
			controls: true,
			slideWidth: 272,
			minSlides: 1,
			maxSlides: maxSlides,
			moveSlides: 1,
			slideMargin: 25,
			pager: false,
			prevSelector: '.prev-2',
			nextSelector: '.next-2'
		});
		slider3 = jQuery('#tabs-3 > ul').bxSlider({
			controls: true,
			slideWidth: 272,
			minSlides: 1,
			maxSlides: maxSlides,
			moveSlides: 1,
			slideMargin: 25,
			pager: false,
			prevSelector: '.prev-3',
			nextSelector: '.next-3'
		});
		slider4 = jQuery('#tabs-4 > ul').bxSlider({
			controls: true,
			slideWidth: 272,
			minSlides: 1,
			maxSlides: maxSlides,
			moveSlides: 1,
			slideMargin: 25,
			pager: false,
			prevSelector: '.prev-4',
			nextSelector: '.next-4'
		});
		slider5 = jQuery('#tabs-5 > ul').bxSlider({
			controls: true,
			slideWidth: 272,
			minSlides: 1,
			maxSlides: maxSlides,
			moveSlides: 1,
			slideMargin: 25,
			pager: false,
			prevSelector: '.prev-5',
			nextSelector: '.next-5'
		});    
		/*   Tabs indents correct at start  */
		tabsTransFirst = jQuery('.tabs-wrapper .tabs:first-child')
												.find('.products-list')
												.css('transform');
		tabsTransformAll = jQuery('.tabs-wrapper .tabs')
												.find('.products-list')
												.css('transform', tabsTransFirst);			
	},
	postSlider: function(){
		var self = this;
		var maxSlides,
				slideWidth,
		    winWidth = jQuery(window).width();
		if (winWidth < 684) {
		    maxSlides = 1;
		    slideWidth = 560;
		} else {
				maxSlides = 2;
				slideWidth = 238;
		}		
		self.sliderBlog = jQuery('.blog-carousel').bxSlider({
			controls: true,
			slideWidth: slideWidth,
			minSlides: 1,
			maxSlides: maxSlides,
			moveSlides: 1,
			slideMargin: 60,
			pager: false,
			prevSelector: '.prev-post',
			nextSelector: '.next-post'
		});
	},
	bestSellSlider: function(){
		var self = this;
		var maxSlides,
		    winWidth = jQuery(window).width();
		if (winWidth < 684) {
		    maxSlides = 1;
		} else if ((winWidth >= 684)&&(winWidth < 986)) {
		    maxSlides = 2;
		} else {
				maxSlides = 3;
		}			
		sliderBestSell = jQuery('.best-sell-block').find('.carousel-holder > ul').bxSlider({
			controls: true,
			slideWidth: 272,
			minSlides: 1,
			maxSlides: maxSlides,
			moveSlides: 1,
			slideMargin: 25,
			pager: false,
			prevSelector: '.prev-sell',
			nextSelector: '.next-sell'
		});
	},
	considerSlider: function(){
		var self = this;
		var maxSlides,
		    winWidth = jQuery(window).width();
		if (winWidth < 684) {
		    maxSlides = 1;
		} else if ((winWidth >= 684)&&(winWidth < 986)) {
		    maxSlides = 2;
		} else if ((winWidth >= 986)&&(winWidth < 1160)) {
		    maxSlides = 3;
		} else {
				maxSlides = 4;
		}
		sliderConsider = jQuery('.consider-block').find('.carousel-holder > ul').bxSlider({
			controls: true,
			slideWidth: 272,
			minSlides: 1,
			maxSlides: maxSlides,
			moveSlides: 1,
			slideMargin: 25,
			pager: false,
			prevSelector: '.prev-cons',
			nextSelector: '.next-cons'			
		});
	},
	productSlider: function(){
		var self = this;
		sliderProduct = jQuery('.product-photo').find('.carousel-holder > ul').bxSlider({
				controls: true,
				slideWidth: 502,
				minSlides: 1,
				maxSlides: 1,				
			  pagerCustom: '.carousel-pager',
				prevSelector: '.prev-prod',
				nextSelector: '.next-prod'			    
		});
	},
	formStyler: function(){
		jQuery('#catalog-sort, #catalog-show').styler();
	},
	hideCheckbox: function(){
		var optionCount = jQuery('.option').find('.option-count');
		for(i = 0; i < optionCount.length; i++) {
			if (jQuery(optionCount[i]).text() < 1) {
				jQuery(optionCount[i]).parent().parent().addClass('inactive');
				 } else {
			 	jQuery(optionCount[i]).parent().parent().removeClass('inactive');
			 }
		}	

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
		jQuery('.login-btn').magnificPopup({			
			type: 'inline',
			showClsBtn: true,
			closeMarkup: '<button title="%title%" class="mfp-close"></button>'
		});	
		jQuery('.quick-look-btn').magnificPopup({			
			type: 'inline',
			showClsBtn: true,
			closeMarkup: '<button title="%title%" class="mfp-close"></button>'
		});
		jQuery('.image-zoom').magnificPopup({
				type: 'image',
				showClsBtn: true,
				closeOnContentClick: true,
				mainClass: 'mfp-img-mobile',
				closeMarkup: '<button title="%title%" class="mfp-close"></button>',
				image: {
					verticalFit: true
				},
				zoom: {
					enabled: true,
					duration: 300 // don't foget to change the duration also in CSS
				}				
		});		
	},
	quantityBlock: function(){
	    jQuery('.quantity-plus').click(function(e){
			    var fieldName = jQuery(this).attr('field');
	        e.preventDefault();
	        var currentVal = parseInt(jQuery('input[name='+fieldName+']').val());
	        if (!isNaN(currentVal)) {
	            jQuery('input[name='+fieldName+']').val(currentVal + 1);
	        } else {
	            jQuery('input[name='+fieldName+']').val(1);
	        }
	    });
	    jQuery('.quantity-minus').click(function(e) {
			    var fieldName = jQuery(this).attr('field');
	        e.preventDefault();
	        var currentVal = parseInt(jQuery('input[name='+fieldName+']').val());
	        if (!isNaN(currentVal) && currentVal > 1) {
	            jQuery('input[name='+fieldName+']').val(currentVal - 1);
	        } else {
	            jQuery('input[name='+fieldName+']').val(1);
	        }
	    });
	},
	introBlockUp: function() {
		var self = this;
		var winWidth = jQuery(window).width(),
				pageIntro = jQuery('.page-intro'),
				contentHolder = jQuery('.catalog').find('.content-holder');
		if (winWidth < 768) {
				contentHolder.prepend(pageIntro);
		} else {
				maxSlides = 4;
		}	
	},
	showFilter: function() {
		var self = this;
		var filterBtn = jQuery('.shop-options__header'),
				filterBox = jQuery('.shop-options__filters');
		filterBtn.on('click', function() {
			if (!(filterBtn).hasClass('active')) {
				jQuery(this).removeClass('active');
				filterBox.slideDown('slow');
				jQuery(this).addClass('active');
			} else {
				filterBox.slideUp('slow');
				jQuery(this).removeClass('active');
			}
		})		
	},
	removeHomeLink: function() {
		jQuery('.home').find('.logo').removeAttr('href');		
	}
};
jQuery(function(){	
	Mobile.init();
	Homepage.hideCheckbox();
	Homepage.quantityBlock();
	Homepage.showFilter();
	Homepage.bestSellSlider();
	Homepage.considerSlider();
	Homepage.productSlider();		
	Homepage.modal();
	Homepage.introBlockUp();
	jQuery(window).on('load', function(){
		Homepage.welcomeMsg();		
		Homepage.formStyler();
		Homepage.mainBanner();
		Homepage.slider();
		Homepage.mainMenu();
		Homepage.mainMenuMob();
		Homepage.menuBtn();
		Homepage.tabsSliders();
		Homepage.customTabs();		
		ScrollAnimation.init();	
		Homepage.removeHomeLink();
		Homepage.postSlider();
	});

	jQuery(window).on('orientationchange resize', function(){
		Homepage.mainMenu();		
		Mobile.resize();
		Homepage.resize();
		ScrollAnimation.resize();
	});

	jQuery(window).on('scroll', function(){
		ScrollAnimation.onScroll();
	});
});

