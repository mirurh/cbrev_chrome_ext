chrome.extension.onMessage.addListener(function(request, sender, sendResponse){

    var outputText = getRpTotal();
    console.log(outputText);
//    copyTextToClipboard(outputText);
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


function getRpTotal()
{
	var totalRp = new Number(0.0);;

	$("li.rp").each(function() {
		var rpText = $(this).text().replace("楽曲RP：", "");
		var rp = Math.round(Number(rpText) * 100);
		totalRp += rp;
	});

	var crRpText = $("div.rpc-cTxt").text().replace("チャレンジRP : ", "");
	var crRp = Math.round(Number(crRpText) * 100);
	totalRp += crRp;

	return totalRp / 100;
}