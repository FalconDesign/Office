"use strict";


  $(() => {


  let $window = $(window);
  let burger = $('.burger');
  let header = $('.main-header');


  $window.on('load', () => {
      $('#cover').fadeOut(1000);
      
      // Animated rotating icons in section 'home';

      let iconContainer = $('.icon-container');
      iconContainer.addClass('animate');

  });

  // Function for responsive mibile nav-bar;

  burger.on('click', (e) => {
      $(e.currentTarget).toggleClass('closed-burger');
      header.toggleClass('opened-mobile-header');

  });


  // Function for smooth scroll to an anchor

  let scroll = $('.scroll');
  scroll.on('click', (e) => {
    let $this = $(e.currentTarget.hash);
    e.preventDefault();
    $('html, body').animate({scrollTop:$this.offset().top - 70}, 500);
  });


  // Function check the width & Paralax Effect

  let parallax = () => {
    let section = ['.theme', '.pricing', '.team', '.great', '.connect'];
    let [...item] = section;

    let theme        = $('.theme'),
        pricing      = $('.pricing'),
        team         = $('.team'),
        great        = $('.great'),
        connect      = $('.connect'),
        windowScroll = $(this).scrollTop();

    let windowsize = $window.width();
    if (windowsize < 678 ) {
      $(`${item}`).css({backgroundPosition: 'center center'});
      return;
    }

    let bgVertical = new Map();

    bgVertical.set(theme, 189.6);
    bgVertical.set(pricing, 340);
    bgVertical.set(team, 697.6);
    bgVertical.set(great, 962);
    bgVertical.set(connect, 1169.4);

    if (windowScroll > theme.offset().top - $window.height()) {

      bgVertical.forEach( (value, key) => {
        key.css({backgroundPosition: 'center '+ (value + (-windowScroll / 5)) +'px'});
      });

      };
  };


    $window.on('scroll', parallax);

    $window.resize(parallax);


  // Skill container loading and counter

  $window.on('scroll', () => {

    let windowScroll  = $(this).scrollTop();
    let skills        = $('.skill-container');
    let one           = $('.one');
    let two           = $('.two');
    let medFirst      = $('.med-first');
    let medSecond     = $('.med-second');

    if (windowScroll > skills.offset().top -  $window.height() ) {

      medFirst.addClass('rotate');
      medSecond.addClass('rotate-second');

    let animateCounter = (counterSelector, endPoint) => {

    	$(counterSelector).animate({num: endPoint}, {
    		duration: 2000,
    		step(num) {
    			$(this).html(`${num.toFixed()}%`);

    		  }
    	});
    };

    animateCounter(one, 70);
    animateCounter(two, 90);

  };
});


  // AJAX portfolio

  let portfolioLoad = () => {
    let button = $('.change');
    $.ajaxSetup({ cache: true });

    button.click( (e) => {

            let $this       = $(e.currentTarget),
                spinner     = '<div class="loader">Loading...</div>',
                newfolder   = $this.data('folder'),
                newHTML     = `website/app/load-portfolio/${newfolder}.html`,
                loadProject = $('.project-load');

                loadProject.fadeOut(300, () => {
                loadProject.fadeIn().html(spinner).load(newHTML);
                });
        });

  };

  portfolioLoad();

  // Change button class 'active'

  let change = $('.change');

  change.on('click', (e) => {

    let $this = $(e.currentTarget);

    if (!$this.hasClass('active')) {

      $this.siblings().removeClass('active');
      $this.addClass('active');

    };

  });

});
