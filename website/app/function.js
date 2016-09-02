"use strict";

$(function () {

  var $window   = $(window);
  var burger    = $('.burger');
  var header    = $('.main-header');

  // Function for responsive mibile nav-bar;

  burger.on('click', function (e) {
    $(e.currentTarget).toggleClass('closed-burger');
    header.toggleClass('opened-mobile-header');
  });

  // Animated rotating icons in section 'home';

  var iconContainer = $('.icon-container');
  iconContainer.addClass('animate');

  // Function for smooth scroll to an anchor

  var scroll = $('.scroll');

  scroll.on('click', function (e) {
    var $this = $(e.currentTarget.hash);
    e.preventDefault();
    $('html, body').animate({ scrollTop: $this.offset().top - 70 }, 500);
  });

  // Function check the width & Paralax Effect

  var parallax = function parallax() {

    var theme         = $('.theme'),
        pricing       = $('.pricing'),
        team          = $('.team'),
        great         = $('.great'),
        connect       = $('.connect'),
        windowScroll  = $(this).scrollTop();

    if (windowScroll > theme.offset().top - $window.height()) {

      theme.css({ 'background-position': 'center ' + (189.6 + -windowScroll / 5) + 'px' });

      pricing.css({ 'background-position': 'center ' + (340 + -windowScroll / 5) + 'px' });

      team.css({ 'background-position': 'center ' + (697.6 + -windowScroll / 5) + 'px' });

      great.css({ 'background-position': 'center ' + (962 + -windowScroll / 5) + 'px' });

      connect.css({ 'background-position': 'center ' + (1169.4 + -windowScroll / 5) + 'px' });
    };
  };

  var checkWidth = function checkWidth() {
    var windowsize = $window.width();
    if (windowsize >= 678) {
      $window.on('scroll', parallax);
    };
  };

  checkWidth();

  $window.resize(checkWidth);

  // Skill container loading and counter

  $window.on('scroll', function () {

    var windowScroll  = $(window).scrollTop();
    var skills        = $('.skill-container');
    var one           = $('.one');
    var two           = $('.two');
    var medFirst      = $('.med-first');
    var medSecond     = $('.med-second');

    if (windowScroll > skills.offset().top - $window.height()) {

      medFirst.addClass('rotate');
      medSecond.addClass('rotate-second');

      var animateCounter = function animateCounter(counterSelector, endPoint) {

        $(counterSelector).animate({ num: endPoint }, {
          duration: 2000,
          step: function step(num) {
            $(this).html(num.toFixed() + '%');
          }
        });
      };

      animateCounter(one, 70);
      animateCounter(two, 90);
    };
  });

  // AJAX portfolio

  var portfolioLoad = function portfolioLoad() {
    var button = $('.change');
    $.ajaxSetup({ cache: true });

    button.click(function (e) {

      var $this       = $(e.currentTarget),
          spinner     = '<div class="loader">Loading...</div>',
          newfolder   = $this.data('folder'),
          newHTML     = 'website/app/load-portfolio/' + newfolder + '.html',
          loadProject = $('.project-load');

      loadProject.fadeOut(300, function () {
        loadProject.fadeIn().html(spinner).load(newHTML);
      });
    });
  };

  portfolioLoad();

  // Change button class 'active'

  var change = $('.change');

  change.on('click', function (e) {

    var $this = $(e.currentTarget);

    if (!$this.hasClass('active')) {

      $this.siblings().removeClass('active');
      $this.addClass('active');

    };
  });
});
