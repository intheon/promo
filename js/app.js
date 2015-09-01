$(document).ready(function(){
	$("#test").on("input", function(event){
		var rangeValue = $("#test").val();
		$("#how-much-value").html(rangeValue)
	});
});