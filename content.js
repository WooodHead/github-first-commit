//alert('content script');

//const COMMITS_PER_PAGE = 35;

var currentUrl = document.location.href;
var repoExp = RegExp(/https:\/\/github\.com\/.*?\/.*?\//i);
var commitExp = RegExp(/https:\/\/github\.com\/.*?\/.*?\/.*?\/.*?(?=\?|$)/i);

//url
var repo = repoExp.exec(currentUrl);
var commitBase = commitExp.exec(currentUrl);

function getRepoCommitsCount(repo) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", repo, false);
    xhr.send();
    var result = xhr.responseText;

    var tempHtml = document.createElement('html');
    tempHtml.innerHTML = result;
    var numEle = tempHtml.getElementsByClassName('numbers-summary')[0]
        .getElementsByClassName('commits')[0]
        .getElementsByClassName('num')[0]; // Live NodeList of your anchor elements

    var num_str = numEle.innerHTML.trim();
    var num = parseInt(num_str.replace(/,/g, ''), 10);

    return num;
}

function getLastPageUrl(repo, num_of_commits) {

    var first_page = Math.ceil(num_of_commits / 35);

    return commitBase + '?page=' + first_page;
}

function gotoFirst() {
    var firstPageUrl = commitBase + '?page=1';
    chrome.runtime.sendMessage({redirect: firstPageUrl});
}

function gotoLast() {
    var num = getRepoCommitsCount(repo);
    var lastPageUrl = getLastPageUrl(repo, num);
    chrome.runtime.sendMessage({redirect: lastPageUrl});
}

function addButtons() {

    var buttonDiv = document.getElementsByClassName('pagination');

    var firstPage = document.createElement('a');
    var lastPage = document.createElement('a');

    firstPage.addEventListener('click', gotoFirst);
    lastPage.addEventListener('click', gotoLast);

    firstPage.innerHTML = 'First Page';
    lastPage.innerHTML = 'Last Page';
    firstPage.setAttribute('id', 'firstPage');
    lastPage.setAttribute('id', 'lastPage');

    if (buttonDiv[0] !== undefined) {
        buttonDiv[0].insertBefore(firstPage, buttonDiv[0].firstChild);
        buttonDiv[0].appendChild(lastPage);
    }
}

var firstButton = document.getElementById('firstPage');

if (!firstButton) {
    addButtons();
}
	