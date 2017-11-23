chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab) {
  if (changeInfo.status && changeInfo.status === 'complete') {
    console.log('changeInfo', changeInfo)
    console.log('tab', tab)
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var activeTab = tabs[0]
      var activeId = activeTab.id
      if (tabid === activeId) {
        chrome.tabs.executeScript(activeTab.id, { file: "scripts/inject.js" })
      }
    })
  }

})

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  console.log('details', details)
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0]
    chrome.tabs.executeScript(tab.id, { file: "scripts/inject.js" })
  })
})

chrome.runtime.onMessage.addListener(function(request, sender) {
  chrome.tabs.update(sender.tab.id, { url: request.redirect })
});