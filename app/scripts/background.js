// import 'chromereload/devonly'

function isFileCommitsUrl(url) {
  return url.match(/https:\/\/github.com\/.*\/.*\/commits\/.*/)
}

chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab) {
  if (changeInfo.status && changeInfo.status === 'complete') {
    console.log('changeInfo', changeInfo)
    console.log('tab', tab)
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var activeTab = tabs[0]
      var activeId = activeTab.id
      var url = tabs[0].url
      if (tabid === activeId && isFileCommitsUrl(url)) {
        chrome.tabs.executeScript(activeTab.id, { file: "scripts/inject.js" })
      }
    })
  }
})

chrome.runtime.onMessage.addListener(function(request, sender) {
  chrome.tabs.update(sender.tab.id, { url: request.redirect })
})