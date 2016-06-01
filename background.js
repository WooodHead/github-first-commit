chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {check: "hello"}, function (response) {
            if (response) {
//            alert("Already there");
            }
            else {
//		  	 alert("Not there, inject contentscript");
                chrome.tabs.executeScript(null, {file: "content.js"});
            }
        });
    });
});


chrome.runtime.onMessage.addListener(function(request, sender) {
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
});