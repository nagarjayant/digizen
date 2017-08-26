
    //reloading bgpicture.js after translations loaded
    function reload_js(src) {
        $('script[src="' + src + '"]').remove();
        $('<script>').attr('src', src).appendTo('head');
    }

    //script to open form
    var resolutionSelected;

    $('.js-button-rest').click(function(e) {
        e.preventDefault();
        resolutionSelected = $(this).attr('resolution-selected');
        $('.privacy-policy').remove().insertBefore('.form-submit');
      	$(".form").show( "slide", {direction: "left" }, 1000 );
	  	$('label[for="WantsBrochure"]').text("Ich weiß bereits, welcher Auslandsaufenthalt zu mir passt");
      	$('.section-links').hide();
       	$('.logo').hide();
       setTimeout(function(){
            $.fn.fullpage.destroy('all');
         }, 1000);

       $( "#ChooseResolution option" ).each(function() {
          if($(this).attr('value') === resolutionSelected){
            this.selected = true;
          }
        });

    });


    //fullpagejs code
    initFullpageJs();
    function initFullpageJs() {
        $('#fullpage').fullpage({
            verticalCentered: false,
            afterLoad: function(anchorLink, index){
                var $currentSection = $("[data-anchor='" + anchorLink + "']"),
                    nextSection = $currentSection.next().data("anchor"),
                    prevSection = $currentSection.prev().data("anchor"),
                    currentIndex = index - 1,
                    totalCityCount = $('.section.city').length,
                    totalSections = totalCityCount + 1,
                    $scrollIconNext = $('.js-scroll-icon-next'),
                    currentSectionHeading = $currentSection.find('h2').attr('data-value');

                    $('.js-button-rest').attr('resolution-selected',currentSectionHeading)

                if(index < totalSections){
                    if($scrollIconNext.hasClass('opaque')){
                        $scrollIconNext.removeClass('opaque');
                    }

                    $scrollIconNext.attr('href', "#"+nextSection);

                    if(index > 1){
                        $('.js-button-first').addClass('hide');
                        $('.js-button-rest').removeClass('hide');
                    }else {
                        $('.js-button-first').removeClass('hide');
                        $('.js-button-rest').addClass('hide');
                        $('.scroll-icon-up').addClass('opaque');
                    }
                }else if(index = totalSections){
                    $scrollIconNext.addClass('opaque');
                    $('.js-button-first').addClass('hide');
                    $('.js-button-rest').removeClass('hide');
                }else {
                    $scrollIconNext.addClass('opaque');
                }

                if($currentSection.hasClass('city')){
                    $currentSection.find('.js-city-count').text(currentIndex + ' / ' + totalCityCount);
                }

                if($currentSection.hasClass('form')){
                    $('.section-links').hide();
                }
                $('.front-desk-content h1').css('visibility','hidden');
                $('.front-desk-content p').css('visibility','hidden');
                $('.city-desk-content h2').css('visibility','hidden');
                $('.city-desk-content p').css('visibility','hidden');

                $currentSection.find('.front-desk-content h1').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0},1000);
                $currentSection.find('.front-desk-content p').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0},1000);
                $currentSection.find('.city-desk-content h2').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0},1000);
                $currentSection.find('.city-desk-content p').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0},1000);

            }
        });
    }

    //form close button share
    $('.close-btn').click(function(e) {
      $(".form").hide( "slide", {direction: "left" }, 1000 );
      $('.section-links').show();
       $('.logo').show();
       initFullpageJs();

    });

   

  


  //change dropdown
  $(document).on("click",".ChangeDrop",function(){
    $('select[id="ChooseResolution"]').find('option[value="1"]').text("Hat an der Golden Brochure Kampagne teilgenommen und ist an einer Sprachreise im Ausland interessiert");
  });


