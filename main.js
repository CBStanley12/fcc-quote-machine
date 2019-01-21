$(document).ready(function() {
	$.ajaxSetup({
		cache: false
	});
  
  	$.ajax({
		url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=''$_jsonp=?",
		success: function(data) {
			var post = data.shift();
			$('#author').text(post.title);
			$('#text').html(post.content);
		},
		cache: false
	});

	$('#tweet-quote').attr('href', "https://twitter.com/intent/tweet?text=" + $('#text').text().replace(/\s/g,"%20") + " - " + $('#author').text().replace(/\s/g,"%20"));
	$('.bgImg').attr('src', "https://source.unsplash.com/random/1600x900");

  	$('#new-quote').on('click', function() {
  		$('.blockquote').fadeOut('slow');
  		$('.bgImg').fadeOut('slow');

	    $.ajax({
	      url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=''$_jsonp=?",
	      success: function(data) {
	        var post = data.shift();
	        $('#author').text(post.title);
	        $('#text').html(post.content);
	      }
	    });

	    var sourceImage = "https://source.unsplash.com/featured/1600x900?sig=" + Math.random();
    	$('.bgImg').attr('src', sourceImage);

    	$('.blockquote').fadeIn('slow');
    	$('.bgImg').fadeIn('slow');
	});

	$('#tweet-quote').on('click', function() {
	    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text="' + $('#text').text().replace(/\s/g,"%20") + '" - ' + $('#author').text().replace(/\s/g,"%20"));
	});
	
});