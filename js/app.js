$(document).ready(function(){

// sod it, im making global because im hungry

var rangeValue = $("#range-slider").val();

$("#how-much-value").html(rangeValue);

	// show slider value in html view
	$("#range-slider").on("input", function(){
		var rangeValue = $("#range-slider").val();
		$("#how-much-value").html(rangeValue)
	});

	// parse slider value and pass to code generator
	$("#codeGenerate").click(function(){
		var rangeValue = $("#range-slider").val();

		calcCodes(rangeValue);
	})

});

function calcCodes(howManyCodes)
{
	$("#output-codes").html("");

	var coCount = 0;

	while (coCount < howManyCodes)
	{
		var code = makeMeACode(howManyCodes);
		$("#output-codes").append("<div class='code'>"+ code +"</div>");
		coCount++;
	}

	addOptions();

}

function makeMeACode(codeNumber)
{
	var myChance = new Chance();
	return myChance.string({pool: "abcdefghiklmnopqursyuej239d", length: 7});
}

function addOptions()
{
	// clear each time
	$("#output-options").html("");

	// add buttons
	$("#output-options").html("<div class='options-container'><div class='options-button' id='asSelected'><img src='clip.png'><p>Select All</p></div><div class='options-button' id='asColumn'><img src='column.png'><p>Show as Column</p></div><div class='options-button' id='asCsv'><img src='csv.png'><p>Download to CSV</p></div></div>");

	// and listeners
	$(".options-button").click(function(event){
		var thisId = event.currentTarget.id;

		carryOutOptionLikeLoyalSlave(thisId);
	});
}

function carryOutOptionLikeLoyalSlave(option)
{
	var arr = [];
	var string = "";
	var delimiter = "&#10;";

	switch (option)
	{
		case "asCsv":
			var arr = [];

			var code = $(".code").each(function(){
				arr.push($(this).text());
			});

			// stolen from http://jsfiddle.net/nkm2b/222/
			var csvString 		= arr.join("%0A");
			var a         		= document.createElement('a');
				a.href        	= 'data:attachment/csv,' + csvString;
				a.target      	= '_blank';
				a.download    	= 'myFile.csv';

			document.body.appendChild(a);
			a.click();

			break;
		case "asColumn":
			var status = $("#output-codes .code").attr("class");
				status = status.split(" ");
			for (s = 0; s < status.length; s++)
			{
				if (status[s] == "noFloat")
				{
					$("#output-codes .code").removeClass("noFloat");
					$("#asColumn p").html("Show as Column");
					$("#asColumn img").attr("src","column.png");
				}
				else
				{
					$("#output-codes .code").addClass("noFloat");
					$("#asColumn p").html("Show as Block");
					$("#asColumn img").attr("src","block.png");
				}
			}

			break;
		case "asSelected":

			var code = $(".code").each(function(){
				arr.push($(this).text());
			});

			$("#output-codes").html("<textarea id='selectOutput'></textarea>");

			for (var i = 0; i < arr.length; i++)
			{
				string += arr[i] + delimiter;
			}

			$("#selectOutput").append(string);

			$("#selectOutput").each(function(){
				$(this).select();
			});

			$("#asSelected").off("click");
			$("#asSelected").css("opacity","0.1");
			$("#asColumn").off("click");
			$("#asColumn").css("opacity","0.1");

			break;
		default:
			console.log("derp");
			break;
	}
}