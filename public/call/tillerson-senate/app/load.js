$(document).ready(function(){
	$('a#show_full_form_desc').click(function(){
		$('div#form_full_desc').slideToggle();
		if($(this).text()=="(show full description)") {
		  $(this).text("(hide full description)");
		} else {
		  $(this).text('(show full description)');
		}
	});

});