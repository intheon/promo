$(document).ready(function(){
	$("#range-slider").on("input", function(event){
		var rangeValue = $("#range-slider").val();
		$("#how-much-value").html(rangeValue)
	});
});