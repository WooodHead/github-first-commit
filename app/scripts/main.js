var total = 0
var firstUrl = ''
var lastUrl = ''

function getRepoCommitsCount(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        var status = xhr.status
        if ((status >= 200 && status <= 300) || status === 304) {
          var data = xhr.responseText
          var tempHtml = document.createElement('html')
          tempHtml.innerHTML = data
          var numEle = tempHtml.getElementsByClassName('numbers-summary')[0]
            .getElementsByClassName('commits')[0]
            .getElementsByClassName('num')[0]
          var num_str = numEle.innerHTML.trim()
          var num = parseInt(num_str.replace(/,/g, ''), 10)
          resolve(num)
        }
      }
    }
    xhr.send()
  })
}

function gotoFirst() {
  chrome.runtime.sendMessage({ redirect: firstUrl })
}

function gotoLast() {
  chrome.runtime.sendMessage({ redirect: lastUrl })
}

function addButtons() {
  var buttonDiv = document.getElementsByClassName('pagination')
  if (buttonDiv) {
    var firstButton = document.createElement('a')
    var lastButton = document.createElement('a')
    firstButton.setAttribute('id', 'first-page')
    lastButton.setAttribute('id', 'last-page')
    firstButton.innerHTML = 'First Page'
    lastButton.innerHTML = 'Last Page'
    firstButton.addEventListener('click', gotoFirst)
    lastButton.addEventListener('click', gotoLast)

    buttonDiv[0].insertBefore(firstButton, buttonDiv[0].firstChild)
    buttonDiv[0].appendChild(lastButton)

    var newerButton = firstButton.nextElementSibling
    if (newerButton.classList.contains('disabled')) {
      firstButton.className = 'disabled'
    }

    var olderButton = newerButton.nextElementSibling

    if (olderButton.classList.contains('disabled')) {
      lastButton.className = 'disabled'
    }
  }
}

function updateButtonStatus() {
  var firstPage = document.createElement('a')
  var lastPage = document.createElement('a')
}

function main() {
  var firstButton = document.getElementById('first-page')
  var buttonDiv = document.getElementsByClassName('pagination')

  if (buttonDiv.length && !firstButton) {
    addButtons()
    var url = window.location.href
    var re = /https:\/\/github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)\/commits\/([a-z]+)(\?(after|before)=)?([a-zA-Z0-9]+)?\+?(\d+)?/
    var match = re.exec(url)
    var user
    var repo
    var branch
    var hash
    var skip
    var direction
    if (match) {
      user = match[1]
      repo = match[2]
      branch = match[3]
      direction = match[5]
      hash = match[6]
      skip = match[7]
      if (!hash) {
        var commit = document.getElementsByClassName('commit')[0]
        if (commit) {
          var channel = commit.getAttribute('data-channel')
          var hashRe = /commit:([a-zA-Z0-9]+)$/
          var hashMatch = hashRe.exec(channel)
          if (hashMatch) {
            hash = hashMatch[1]
          }
        }
      }
      var mainUrl = 'https://github.com/' + user + '/' + repo
      firstUrl = 'https://github.com/' + user + '/' + repo + '/commits/' + branch
      var lastSkip = 0
      getRepoCommitsCount(mainUrl).then(function(count) {
        total = count
        lastSkip = total - 35
        lastUrl = 'https://github.com/' + user + '/' + repo + '/commits/' + branch + '?after=' + hash + '+' + lastSkip
      })
    }
  }
}

module.exports = main