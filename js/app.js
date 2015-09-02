$(document).ready(function(){

	// show slider value in html view
	$("#range-slider").on("input", function(event){
		var rangeValue = $("#range-slider").val();
		$("#how-much-value").html(rangeValue)
	});

	// parse slider value and pass to code generator
	$("#codeGenerate").click(function(){
		var rangeValue = $("#range-slider").val();
		console.log(rangeValue);
	})

});