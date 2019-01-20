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

  	$('#new-quote').on('click', function() {
	    $.ajax({
	      url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=''$_jsonp=?",
	      success: function(data) {
	        var post = data.shift();
	        $('#author').text(post.title);
	        $('#text').html(post.content);
	      }
	    });
	});
});