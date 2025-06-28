/*====================================================
  TABLE OF CONTENT
  1. function declearetion
  2. Initialization
====================================================*/

(function($) {
    /*===========================
    1. function declearetion
    ===========================*/
    var themeApp = {
        setNavbar: function() {
    		if(typeof fixed_navbar != "undefined" && fixed_navbar == true) {
    			$('body').addClass('has-fixed-navbar');
                $('#main-navbar').addClass('fixed');
    		}
    	},
        featuredPosts: function() {
            if ($("#featured-slider-one").length) {
                $("#featured-slider-one").owlCarousel({
                    nav : true, // Show next and prev buttons
                    navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'] ,
                    dots: true,
                    items: 1,
                    loop: true,
                    autoplay:true,
                    autoplayTimeout:5000,
                    autoplaySpeed:200,
                    autoplayHoverPause:true,
                    // animateOut: 'fadeOut'
                });
            }
        },
        featuredMedia: function(){
            $(".post-entry").each(function() {
            	var thiseliment = $(this);
            	var container = $(this).find('.entry-head');
                var firstPara = $(this).find('.entry-content p').first();
            	var media_wrapper = $(this).find('featured');
            	var media_content_embeded = media_wrapper.find('iframe');
            	if (media_content_embeded.length > 0) {
            		$(container).after(media_content_embeded);
                    $(media_content_embeded).wrap("<div class='featured-media align-center media-embeded'></div>");
            		// thiseliment.addClass('embeded-media');
            		media_wrapper.remove();
                    var newString = firstPara.html().replace(/(\s*<br\s*\/?>\s*\n\s*)/g,'');
                    firstPara.html(newString);
            	}
            });
        },
        responsiveIframe: function() {
    		$('.post-entry').fitVids();
    	},
        highlighter: function() {
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        },
    	mobileMenu:function() {
            $('#mobile-menu').html($('#main-menu').html());
            $('#nav-toggle-button').on('click', function(e){
                e.preventDefault();
                $('body').toggleClass('mobile-menu-opened');
            });
            $('#backdrop').on('click', function(){
                $('body').toggleClass('mobile-menu-opened');
            });
            var li = $(".mobile-menu").find('li');
            $(li).has('ul').addClass('menu-item-has-children').prepend('<span class="submenu-toggle-button"><i class="fa fa-angle-down"></i></span>');
		    $('.menu-item-has-children').find('.submenu-toggle-button').on('click', function(){
    			$(this).toggleClass('opened');
    			$(this).siblings('ul').slideToggle();
            });
    	},
        mainMenu: function() {
            var li = $(".main-menu").find('li');
            $(li).has('ul').addClass('menu-item-has-children');
        },
    	formatDate: function(dt) {
    		var d = new Date(dt);
    		var month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    		var month = month_name[d.getMonth()];
    		var date = d.getDate();
    		var year = d.getFullYear();
    		var formatted_dt = month+' '+date+','+' '+year;
    		return formatted_dt;
    	},
        shareModal: function() {
            function setModalMaxHeight(element) {
              this.$element     = $(element);
              this.$content     = this.$element.find('.modal-content');
              var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
              var dialogMargin  = $(window).width() < 768 ? 20 : 60;
              var contentHeight = $(window).height() - (dialogMargin + borderWidth);
              var headerHeight  = this.$element.find('.modal-header').outerHeight() || 0;
              var footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0;
              var maxHeight     = contentHeight - (headerHeight + footerHeight);

              this.$content.css({
                  'overflow': 'hidden'
              });

              this.$element
                .find('.modal-body').css({
                  'max-height': maxHeight,
                  'overflow-y': 'auto'
              });
            }

            $('#sharemodal').on('show.bs.modal', function (event) {
                $(this).show();
                setModalMaxHeight(this);
                var button = $(event.relatedTarget) // Button that triggered the modal
                var url = button.data('url');
                if(url.substring(0, 4) != "http"){
                    var url = window.location.protocol + button.data('url');
                }
                var title = button.data('title');
                var modal = $(this);
                console.log(url);
                modal.find('#url-holder').val(url);

                var share_link = {
                    facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + url,
                    twitter: 'https://twitter.com/share?text=' + title + '&amp;url=' + url,
                    google_plus: 'https://plus.google.com/share?url=' + url,
                    linkedin: 'http://www.linkedin.com/shareArticle?mini=true&url=' + url,
                    reddit: 'http://reddit.com/submit?url=' + url + '&amp;title=' + title,
                    tumblr: 'http://www.tumblr.com/share?v=3&u=' + url + '&amp;t=' + title,
                    vk: 'http://vk.com/share.php?url=' + url + '&amp;title=' + title,
                    stumbleupon: 'http://www.stumbleupon.com/submit?url=' + url + '&amp;title=' + title,
                }
                // console.log(typeof link_arr);
                modal.find('.facebook').attr('href', share_link.facebook);
                modal.find('.twitter').attr('href', share_link.twitter);
                modal.find('.google-plus').attr('href', share_link.google_plus);
                modal.find('.linkedin').attr('href', share_link.linkedin);
                modal.find('.reddit').attr('href', share_link.reddit);
                modal.find('.tumblr').attr('href', share_link.tumblr);
                modal.find('.vk').attr('href', share_link.vk);
                modal.find('.stumbleupon').attr('href', share_link.stumbleupon);
                // console.log(link_arr.twitter);

            })
            $(window).resize(function() {
                if ($('#sharemodal.in').length != 0) {
                    setModalMaxHeight($('.modal.in'));
                }
            });
            $('#sharemodal').on('shown.bs.modal', function (event) {

                var modal = $(this)
                var textBox = modal.find('#url-holder');
                textBox.focus().select();
                textBox.on('focus', function() {
                    console.log('focused');
                    textBox.select();

                    // Work around Chrome's little problem
                    textBox.onmouseup = function() {
                        // Prevent further mouseup intervention
                        textBox.onmouseup = null;
                        return false;
                    };
                })
            });
            var clipboard = new Clipboard('#copy-url');
            clipboard.on('success', function(e) {
                $(e.trigger).tooltip({ 'title':'Copied to clipboard', trigger: 'click', viewport: '.modal-content', container: 'body'});
                $(e.trigger).tooltip('show');
                setTimeout(function(){
                    $(e.trigger).tooltip('destroy');
                }, 800);
            });
            clipboard.on('error', function(e) {
                $(e.trigger).tooltip({ 'title':'Press Ctrl+C to copy', delay: { "show": 500, "hide": 100 }, trigger: 'click'});
                $(e.trigger).tooltip('show');
                setTimeout(function(){
                    $(e.trigger).tooltip('destroy');
                }, 800);
            });
        },
        initiateTooltip: function() {
            $('[data-toggle="social-icon-tooltip"]').tooltip({
                placement : 'auto top',
                container: 'body',
                viewport: '.modal-content'
            });
        },
        siteSearch: function() {
            var list = [];
            $('#search-button').on('click', function(e) {
                e.preventDefault();
                if (list.length == 0 && typeof searchApi !== undefined) {
                    $.get(searchApi)
                    .done(function(data){
                        list = data.posts;
                        search();
                    })
                    .fail(function (err){
                        console.log(err);
                    });
                }
            });
            $('#searchmodal').on('shown.bs.modal', function(){
                $('#search-input').focus();
            })
            $('#searchmodal').on('hidden.bs.modal', function() {
                $('#search-input').val('');
                $("#search-results").html('');
            });
            function search() {
                if(list.length > 0) {
                    var options = {
                        shouldSort: true,
                        tokenize: true,
                        matchAllTokens: true,
                        threshold: 0,
                        location: 0,
                        distance: 100,
                        maxPatternLength: 32,
                        minMatchCharLength: 1,
                        keys: [{
                            name: 'title'
                        }, {
                            name: 'plaintext'
                        }]
                    }
                    fuse = new Fuse(list, options);
                    $('#search-input').on("keyup", function(){
                        keyWord = this.value;
                        var result = fuse.search(keyWord);
                        var output = '<div class="info align-center">' + result.length + ' posts found</div>';
                        var language = $('html').attr('lang');
                        $.each(result, function(key, val) {
                            var pubDate = new Date(val.published_at).toLocaleDateString(language, {
                                day:'numeric',
                                month: 'long',
                                year: 'numeric'
                            });
                            output += '<div id="'+ val.id +'" class="result">';
                            output += '<a href="'+ val.url +'"><h4>'+ val.title +'</h4>';
                            output += '<div class="date">' + pubDate + '</div></a>';
                            output += '</div>';
                        });
                        $("#search-results").html(output);
                    });
                }
            }
        },
        facebook: function() {
            if ($('.fb').length) {
                var facebook_sdk_script = '<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>'
                var fb_page = '<div class="fb-page" data-href="'+facebook_page_url+'" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" data-show-posts="false"><div class="fb-xfbml-parse-ignore">Facebook</div></div>';
                $('body').append(facebook_sdk_script);
                $('.fb').append(fb_page);
                $(".fb").fitVids();
            }
        },
        backToTop: function() {
    		$('#back-to-top').on('click', function(){
    			$('html, body').animate({scrollTop : 0},1000);
    		});
        },
        gallery: function() {
            var images = document.querySelectorAll('.kg-gallery-image img');
            images.forEach(function (image) {
                var container = image.closest('.kg-gallery-image');
                var width = image.attributes.width.value;
                var height = image.attributes.height.value;
                var ratio = width / height;
                container.style.flex = ratio + ' 1 0%';
            });
            mediumZoom('.kg-gallery-image img', {
                margin: 30
            });
        },

    	init:function(){
            themeApp.setNavbar();
    		themeApp.featuredPosts();
    		themeApp.featuredMedia();
            themeApp.responsiveIframe();
    		themeApp.highlighter();
    		themeApp.mobileMenu();
    		themeApp.mainMenu();
    		themeApp.shareModal();
            themeApp.initiateTooltip();
            themeApp.siteSearch();
            themeApp.facebook();
            themeApp.backToTop();
            themeApp.gallery();
    	}
    }

    /*===========================
    2. Initialization
    ===========================*/
    $(document).ready(function(){
    	themeApp.init();
    });
}(jQuery));
