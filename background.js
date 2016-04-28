// page_action iconの表示
chrome.tabs.onUpdated.addListener(function(id, changeInfo, tab) {
	if (tab.url == "https://rev-srw.ac.capcom.jp/playdatamusic" || tab.url == "https://rev-www.ac.capcom.jp/rplist" ) {
		chrome.pageAction.show(tab.id);
	}
});

var processing = false;

// クリックされたら、content.js側にメッセージ送信
chrome.pageAction.onClicked.addListener(function(tab) {

	chrome.tabs.sendMessage(tab.id, "", function(response){
		console.log(response.message);
	});
});

// content.js からメッセージ受信した時。
chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    chrome.tabs.update(request.tabId, {active: true});

    sendResponse({message: "ok"});
});