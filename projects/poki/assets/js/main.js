
var pokiSwiperController = {
	
	init: function() {
		
		var template = _.template($('#swiper-slide').html());
	
		// loading locally because of CORS restrictions
		$.getJSON('/games.json', function(data) {
			$('.swiper-wrapper').empty();
			$.each(data, function(index, game) {

				// strip '.local' from urls from json file
				game.url = game.url.replace('.local', '');

				// round up the rating for a nice display
				game.rating = Math.round(game.rating * 10) / 10;

				// truncate titles because of our awesome shiny banner CSS
				game.name = game.name.substring(0, 25);
				$('.swiper-wrapper').append(template({game: game}));
			});

			new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				effect: 'coverflow',
				spaceBetween: 100,
		        grabCursor: true,
		        centeredSlides: false,
		        slidesPerView: 'auto',
				keyboardControl: true,
				preloadImages: true,
		        coverflow: {
		            rotate: 25,
		            stretch: 0,
		            depth: 200,
		            modifier: 0.8,
		            slideShadows: false
		        }
			});	
		});
	}
};

$(document).ready(function() {
	pokiSwiperController.init();
});
