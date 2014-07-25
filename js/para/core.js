$(document).ready(function(){  
    
    // Mobile Nav
    $('.mobile-nav-trigger').click(function() {
        if ($('.mobile-nav-dropdown').css('display') == 'block')
        {
            $('.mobile-nav-dropdown').fadeOut(200);
        }
        else
        {
            $('.mobile-nav-dropdown').fadeIn(200);
        }
        
        return false;
    });
    
    $('.mobile-nav-dropdown a').click(function() {
        pageScroller.goTo($(this).attr('data-target'));
        $('.mobile-nav-dropdown').fadeOut(200);
        return false;
    });
    // Mobile Nav
    
    
    // Page Scroller
    $('.section-wrapper').pageScroller({
        navigation: '.site-nav',
        scrollOffset: -50,
        sectionClass: 'nav-section',
        HTML5mode: true,
        animationType: 'easeInOutExpo',
        animationSpeed: 1400
    });
    // Page Scroller
    
    
    // Image Slider
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    
    var delay = 8000;
    var transition = 1000;
    var suffix = "-sml.jpg";
    
    if ($(document).width() > 600)
    {
        suffix = "-med.jpg";
    }
    
    if ($(document).width() > 768)
    {
        suffix = ".jpg";
    }
    
    $('.image-block').each(function() {
        var _this = this;
        
        var path = '/images/para/';
        
        var image1 = $(':nth-child(1)', this).attr('data-image') + suffix;
        var image2 = $(':nth-child(2)', this).attr('data-image') + suffix;
        
        var image1src = path + image1;
        var image2src = path + image2;
        
        // Preload the first image
        $.imgpreload(image1src,
        {
            all: function()
            {
                $(':nth-child(1)', _this).css('background-image', 'url('+image1src+')');
                
                if (!isMobile.any())
                {
                    $(':nth-child(1)', _this).parallax("50%", 0.2);
                }
                
                $(':nth-child(1)', _this).fadeIn(transition);
                
                $.imgpreload(image2src,
                {
                    all: function()
                    {
                        $(':nth-child(2)', _this).css('background-image', 'url('+image2src+')');
                        
                        if (!isMobile.any())
                        {
                            $(':nth-child(2)', _this).parallax("50%", 0.2);
                        }
                        
                        $(':nth-child(2)', _this).hide();
                        
                        // Initiate the loop
                        function init()
                        {
                            if ($(':nth-child(2)', _this).css('display') == 'block')
                            {
                                $(':nth-child(2)', _this).fadeOut(transition);
                            }
                            else
                            {
                                $(':nth-child(2)', _this).fadeIn(transition);
                            }
                        }
                        
                        setInterval(init, delay);
                    }
                });
            }
        });
    });
    // Image Slider
    
    
    // Parallax
    if (!isMobile.any())
    {
        $('#copper').parallax("50%", 0.2);
    }
    // Parallax
    
    
    // Sticky Nav
    $('.nav-wrapper').waypoint('sticky', {
        handler: function(direction) {}
    });
    // Sticky Nav
    
});