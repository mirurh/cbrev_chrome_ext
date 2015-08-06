// //*[@id="profile"]/div/div[2]/div/div/div/ul/li[1]/div/a

var copyTextToClipboard = function(txt){
    var copyArea = $("<textarea/>");
    copyArea.text(txt);
    $("body").append(copyArea);
    copyArea.select();
    document.execCommand("copy");
    copyArea.remove();
}

var outputText = "";

$("li.gr-Black a").each(function() {

	var musicDataUrl = $(this).attr("href");

	//console.log(musicDataUrl);

	$.ajax({
		type: 'GET',
		url: musicDataUrl,
		dataType: 'html',
		async: false,
		success: function(data) {

			// Title
			var title = $(data).find("div.pdMusicDetail.gr-Black > div > p.title").text();
			// Artist
			var artist = $(data).find("div.pdMusicDetail.gr-Black > div > p.author").text();

			outputText += title + "\t" + artist + "\t";

			$(data).find("div.pdm-result").each(function() {
				
				// Difficult
//				var text = $(this).find("div.pdm-resultHead").attr("class");
				//var difficult = $(this).find("div.pdm-resultHead").attr("class").replace("pdm-resultHead", "").trim();
				
				// High Score
				var highScore = $(this).find("div.leftResult > dl > dd:nth-child(2)").text();
				
				// Clear Rate
				var clearRate = $(this).find("div.leftResult > dl > dd:nth-child(4)").text();
				
				// RP
				var rp = $(this).find("div.leftResult > dl > dd:nth-child(6)").text();

				// ULT CLEAR
				// #profile > div > div.blockRight > div > div > div > div:nth-child(2) > div.rightResult > ul > li.clear > p > img
				// <img src="https://rev-www.ac.capcom.jp/assets/common/img_common/bnr_ULTIMATE_CLEAR.png?1437355246" alt="">
				var gaugeTypeImage = $(this).find("div.rightResult > ul > li.clear > p > img").attr("src");
				
				var gaugeTypeId = "";
				if(gaugeTypeImage != undefined)
				{
					if(gaugeTypeImage.indexOf("bnr_ULTIMATE_CLEAR.png") != -1)
					{
						gaugeTypeId = "ULT";
					}
					else if(gaugeTypeImage.indexOf("bnr_SURVIVAL_CLEAR.png") != -1)
					{
						gaugeTypeId = "SURV";
					}
				}
				
				// GRADE
				var gradeImage = $(this).find("div.rightResult > ul > li.grade > img").attr("src");
				var grade = "-"
				if(gradeImage != undefined)
				{
					if(gradeImage.indexOf("grade_0.png") != -1)
					{
						grade = "S++";
					}
					else if(gradeImage.indexOf("grade_1.png") != -1)
					{
						grade = "S+";
					}
					else if(gradeImage.indexOf("grade_2.png") != -1)
					{
						grade = "S";
					}
					else if(gradeImage.indexOf("grade_3.png") != -1)
					{
						grade = "A+";
					}
					else if(gradeImage.indexOf("grade_4.png") != -1)
					{
						grade = "A";
					}
					else if(gradeImage.indexOf("grade_5.png") != -1)
					{
						grade = "B+";
					}
					else if(gradeImage.indexOf("grade_6.png") != -1)
					{
						grade = "B";
					}
					else if(gradeImage.indexOf("grade_7.png") != -1)
					{
						grade = "C";
					}
					else if(gradeImage.indexOf("grade_8.png") != -1)
					{
						grade = "D";
					}
					else if(gradeImage.indexOf("grade_9.png") != -1)
					{
						grade = "E";
					}
					else if(gradeImage.indexOf("grade_10.png") != -1)
					{
						grade = "F";
					}
					else if(gradeImage.indexOf("grade_11.png") != -1)
					{
						grade = "-";
					}
				}				
				// FULL COMBO
				var fullComboImage = $(this).find("div.rightResult > ul > li.fullcombo > img").attr("src");
				var fullCombo = "";
				if(fullComboImage != undefined)
				{
					fullCombo = "FC";
				}
				
				outputText += highScore + "\t" + clearRate + "\t" + rp + "\t" + gaugeTypeId + "\t" + grade + "\t" + fullCombo + "\t";
			});
			
			outputText += "\n";
		},
		error:function() {
			alert('Error');
		}
	});	
});

console.log(outputText);
copyTextToClipboard(outputText);

