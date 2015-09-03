$(document).ready(function(){

var rangeValue = $("#range-slider").val();
$("#how-much-value").html(rangeValue)

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
	$("#output-options").html("<div class='options-container'><div class='options-button' id='asClipboard'><img src='clip.png'><p>Copy to clipboard</p></div><div class='options-button' id='asColumn'><img src='column.png'><p>Show as Column</p></div><div class='options-button' id='asCsv'><img src='csv.png'><p>Download to CSV</p></div></div>");

	// and listeners
	$(".options-button").click(function(event){
		var thisId = event.currentTarget.id;

		carryOutOptionLikeLoyalSlave(thisId);
	});
}

function carryOutOptionLikeLoyalSlave(option)
{
	switch (option)
	{
		case "asCsv":
			console.log(option);
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
		case "asClipboard":
			console.log(option);
			break;
		default:
			console.log("derp");
			break;
	}
}