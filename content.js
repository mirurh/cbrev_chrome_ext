chrome.extension.onMessage.addListener(function(request, sender, sendResponse){

    var outputText = getMusicData();
    console.log(outputText);
    copyTextToClipboard(outputText);
    sendResponse({message: "ok"});
});

var copyTextToClipboard = function(txt){
    var copyArea = $("<textarea/>");
    copyArea.text(txt);
    $("body").append(copyArea);
    copyArea.select();
    document.execCommand('copy');
    copyArea.remove();
}

var fileOutput = function(txt) {
    
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(PERSISTENT, 1024*1024, function(fileSystem){
        fileSystem.root.getFile("testfile.txt", {'create':true}, function(fileEntry){
            fileEntry.createWriter(function(fileWriter){
                fileWriter.seek(fileWriter.length);
                var blob = new Blob([txt], { type: 'text/plain'});
                fileWriter.write(blob);
            }, function(e) {} );
        }, function(e) {} );
    }, function(e) {} );          

}


function getMusicData()
{
    var outputText = "";
    
    // for Test :first
    $("li.gr-Black a").each(function() {
    
    	var musicDataUrl = $(this).attr("href");
    
	console.log(musicDataUrl);

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
    				
    				// High Score
    				var highScore = $(this).find("div.leftResult > dl > dd:nth-child(2)").text();
    				
    				// Clear Rate
    				var clearRate = $(this).find("div.leftResult > dl > dd:nth-child(4)").text();
    				
    				// RP
    				var rp = $(this).find("div.leftResult > dl > dd:nth-child(6)").text();
    
    				// ULT CLEAR
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
    
    return outputText;
}