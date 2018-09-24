
var infofunc = function() {
  $.get( "/model", function( data ) {
    $("#usedmodel").html(data);
  });
  $.get( "/ram", function( data ) {
    $("#ramusage").html(data);
  });
  $.get( "/cpu", function( data ) {
    $("#cpuusage").html(data);
  }); 
  $.get( "/gpu", function( data ) {
    $("#gpuusage").html(data);
  });
}

setInterval(infofunc, 5000);

infofunc();


var maxWords = 10, currentWords; // Maximum word length
$('#input_text').keydown(function(e) {
    currentWords = $('#input_text').val().split(/[\s]+/);
    if (currentWords.length > maxWords) {
        if ( e.keyCode == 46 || e.keyCode == 8 ) { // Allow backspace and delete buttons
    	} else if (e.keyCode < 48 || e.keyCode > 57 ) { //all other buttons
        	e.preventDefault();
    	}
    }
});

function send() {
	var text = $('#input_text').val();
	$('#input_text').val('');
	// alert(text);
	$(".loader").show();
	var start_time = new Date().getTime();
	$.ajax({
            url: '/ask',
            data: { "message": text },
            type: 'POST',
            success: function(response) {
        	$(".loader").hide();
		data = JSON.parse(response);
		$('#question').html(data.q);
		$('#answer').html(data.a);
		$('#time').html(new Date().getTime() - start_time + "ms");
		$('#messages').show();
            },
            error: function(error) {
                $(".loader").hide(); 
		console.log(error);
            }
        });	
}

// Execute a function when the user releases a key on the keyboard
$('#input_text').on("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    $("#send-message").click();
  }
});
