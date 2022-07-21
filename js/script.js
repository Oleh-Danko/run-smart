// $(document).ready(function(){
//     $('.carousel_inner').slick({
//         speed: 900,
//         // adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>'
        
//       });
//   });


//slider
const slider = tns({
  container: '.carousel_inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: false,
  speed: 1300
});

document.querySelector('.prev').addEventListener('click', function() {
  slider.goTo('prev');
}); 
document.querySelector('.next').addEventListener('click', function() {
  slider.goTo('next');
}); 



//jquery
(function($) {
  $(function() {
    

    //tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {    
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });


    //card
    function toggleSlide (item) {
      $(item).each(function(i){
        $(this).on('click', function(e){
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
      });
    }

    toggleSlide('.catalog-item__back');
    toggleSlide('.catalog-item__link');
    


    //modal
    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });  
    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });  
    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      });
    });





    // validation
    function validateForms(form){
      $(form).validate({
        rules: {
          name: {
            required: true,
            // minLength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Вспоминай имя!",
            // minLength: jQuery.validator.format("Введи {0} символа!")
          },
          phone: "Веди свой номер, будут звонить боты!",
          email: {
            required: "Вводи верную почту для спама",
            email: "У тебя не такая почта!!!"
          }
        },
        // submitHandler: function() {
        //   $.ajax({
        //       type: "POST",
        //       url: "mailer/smart.php",
        //       data: $(this).serialize()
        //   }).done(function() {
        //       $(this).find("input").val("");   
        //       // $('#modal').fadeOut('fast');
        //       // $('#thanks').fadeIn('fast');
        //       $('form').trigger('reset');
        //   });
        //   return false;
        // }
      });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');



    //mask
    $('input[name=phone]').mask("+38 (099) 999-9999");



    //email
    $('form').submit(function(e) {
      e.preventDefault();
      $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
      }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $('form').trigger('reset');
      });
      return false;
  });



  //scroll & pageup
  $(window).scroll(function() {
    if($(this).scrollTop() >1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

$("a[href=#up]").click(function() {
  const _href =$(this).attr("href");
  $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  return false;
});

new WOW().init();

  });
})(jQuery);