//const COMMITS_PER_PAGE = 35;
var currentUrl = document.location.href;
var repoExp = RegExp(/https:\/\/github\.com\/.*?\/.*?\//i);
var commitExp = RegExp(/https:\/\/github\.com\/.*?\/.*?\/.*?\/.*?(?=\?|$)/i);
//url
var repo = repoExp.exec(currentUrl);
var commitBase = commitExp.exec(currentUrl);
var total = 0
var firstUrl = ''
var lastUrl = ''

function getRepoCommitsCount(url) {
  return new Promise(function(resolve, reject) {
    $.get(url, function(data) {
      var tempHtml = document.createElement('html');
      tempHtml.innerHTML = data
      var numEle = tempHtml.getElementsByClassName('numbers-summary')[0]
        .getElementsByClassName('commits')[0]
        .getElementsByClassName('num')[0]
      var num_str = numEle.innerHTML.trim()
      var num = parseInt(num_str.replace(/,/g, ''), 10)
      resolve(num)
    })
  })
}

function getLastPageUrl(repo, num_of_commits) {
  var first_page = Math.ceil(num_of_commits / 35);
  return commitBase + '?page=' + first_page;
}

function gotoFirst() {
  chrome.runtime.sendMessage({ redirect: firstUrl })
  var button = document.getElementById('first-page')
  button.className = 'disabled'
}

function gotoLast() {
  chrome.runtime.sendMessage({ redirect: lastUrl })
  var button = document.getElementById('last-page')
  button.className = 'disabled'
}

function addButtons() {
  var buttonDiv = document.getElementsByClassName('pagination');
  var firstPage = document.createElement('a');
  var lastPage = document.createElement('a');
  firstPage.setAttribute('id', 'first-page');
  lastPage.setAttribute('id', 'last-page');
  firstPage.innerHTML = 'First Page';
  lastPage.innerHTML = 'Last Page';
  firstPage.addEventListener('click', gotoFirst);
  lastPage.addEventListener('click', gotoLast);
  if (buttonDiv[0] !== undefined) {
    buttonDiv[0].insertBefore(firstPage, buttonDiv[0].firstChild);
    buttonDiv[0].appendChild(lastPage);
  }
}

function main() {
  var firstButton = document.getElementById('first-page');
  if (!firstButton) {
    addButtons()
    var url = window.location.href
    var re = /https:\/\/github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)\/commits\/([a-z]+)(\?after=)?([a-zA-Z0-9]+)?\+?(\d+)?/
    var match = re.exec(url)
    var user
    var repo
    var branch
    var hash
    var skip
    if (match) {
      user = match[1]
      repo = match[2]
      branch = match[3]
      hash = match[5]
      skip = match[6]
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
      getRepoCommitsCount(mainUrl).then(function(c) {
        total = c
        lastSkip = total - 35
        lastUrl = 'https://github.com/' + user + '/' + repo + '/commits/' + branch + '?after=' + hash + '+' + lastSkip
      })
    }
  }
}

module.exports = main