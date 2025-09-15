jQuery(document).ready(function($) {
    "use strict";

    /* ===================================
        AJAX LOAD PAGES
    ==================================== */
    function initDynamicContent() {
        // 重新初始化动态插件
        new WOW().init();

        $('#clean-slider').sliderPro({
            width: '100%',
            height: 768,
            fade: true,
            arrows: true,
            waitForLayers: false,
            buttons: true,
            autoplay: true,
            autoScaleLayers: false,
            imageScaleMode: 'cover',
            slideAnimationDuration: 1500,
            breakpoints: {
                600: {
                    height: 480
                }
            }
        });

        $("#team-slider").owlCarousel({
            items : 3,
            itemsDesktop: [1199,2],
            itemsDesktopSmall: [979,2],
            itemsTablet: [768,2],
            itemsMobile : [520,1],
            autoPlay: 4000,
            navigation : false
        });

        $("#featured-work-slider").owlCarousel({
            items : 4,
            itemsDesktop: [1199,3],
            itemsDesktopSmall: [979,3],
            itemsTablet: [768,3],
            itemsTabletSmall: [767,2],
            itemsMobile : [500,1],
            autoPlay: 4000,
            navigation : false
        });

        $("#related-works-slider").owlCarousel({
            items : 4,
            itemsDesktop: [1199,4],
            itemsDesktopSmall: [979,3],
            itemsTablet: [768,2],
            itemsMobile : [479,1],
            autoPlay: 4000,
            navigation : false
        });

        $("#clean-testimonial").owlCarousel({
            items : 1,
            itemsDesktop: [1199,1],
            itemsDesktopSmall: [979,1],
            itemsTablet: [768,1],
            itemsMobile : [520,1],
            autoPlay: 5000
        });

        $('.clean-featured-work-img').magnificPopup({
            type: 'image',
            gallery:{ enabled:true }
        });

        // Isotope 过滤初始化
        var $container = $('.clean-portfolio-items');
        if($container.length){
            $container.isotope({
                filter: '*',
                itemSelector: '.item',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });

            $('#clean-portfolio-filter ul li a').on('click', function(){
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;
            });

            $('#clean-portfolio-filter ul li a').on('click', function(){
                var $this = $(this);
                if ($this.hasClass('selected')) return false;
                var $optionSet = $this.parents('#clean-portfolio-filter ul');
                $optionSet.find('.selected').removeClass('selected');
                $this.addClass('selected');
            });
        }
    }

    function loadPage(url) {
        $('#main-content').fadeOut(200, function() {
            $('#main-content').load(url + ' #main-content > *', function(response, status, xhr) {
                if(status == "error"){
                    console.error("Failed to load page:", xhr.status, xhr.statusText);
                    $(this).fadeIn(200);
                    return;
                }
                $(this).fadeIn(200);
                initDynamicContent();
                history.pushState(null, '', url);
            });
        });
    }

    // 点击导航栏
    $('.ajax-link').click(function(e){
        e.preventDefault();
        var url = $(this).attr('href');
        loadPage(url);
    });

    // 浏览器前进/后退支持
    window.onpopstate = function() {
        var path = location.pathname;
        if(path === "/" || path === "/index.html") path = "index.html";
        loadPage(path);
    };

    /* ===================================
        PRELOADER
    ==================================== */
    $(window).on('load', function() {
        $(".status").fadeOut();
        $(".preloader").delay(1000).fadeOut("slow");
    });

    /* ===================================
        STICKY MENU
    ==================================== */
    function checkStickyMenu() {
        if ($(window).scrollTop() > 30) {
            $('.clean-main-menu').addClass('minified');
        } else {
            $('.clean-main-menu').removeClass('minified');
        }
    }
    $(window).on('scroll', checkStickyMenu);
    checkStickyMenu(); // 页面加载时检查一次

    /* ===================================
        HIDE MENU ON CLICK (for mobile)
    ==================================== */
    $(".nav a").on("click", function () {
        $("#nav-menu").removeClass("in").addClass("collapse");
    });

    /* ===================================
        ONE PAGE NAV
    ==================================== */
    $('#nav-menu').onePageNav({
        currentClass: 'active',
        scrollSpeed: 500,
        easing: 'linear'
    });

    /* ===================================
        SCROLLUP
    ==================================== */
    $.scrollUp({
        scrollName: 'scrollUp',
        scrollDistance: 300,
        scrollFrom: 'top',
        scrollSpeed: 5000,
        easingType: 'linear',
        animation: 'fade',
        animationInSpeed: 200,
        animationOutSpeed: 200,
        scrollText: 'Scroll to top',
        scrollTitle: false,
        scrollImg: true,
        activeOverlay: false,
        zIndex: 2147483647
    });

    /* ===================================
        STELLAR
    ==================================== */
    $(window).stellar({
        responsive: true,
        positionProperty: 'position'
    });

    // 初始化第一次加载的动态内容
    initDynamicContent();
});
