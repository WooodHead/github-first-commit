

function gotoFirst(){
    alert('First click');
}

function gotoLast(){
    alert('Last click');
}
//alert('content');

//document.body.style.background='yellow';
var buttonDiv = document.getElementsByClassName('pagination');

var firstPage = document.createElement('a');
var lastPage = document.createElement('a');


firstPage.addEventListener('click',gotoFirst);
lastPage.addEventListener('click',gotoLast);

firstPage.innerHTML = 'First';
lastPage.innerHTML = 'Last';


firstPage.onclick = function () {
};

buttonDiv[0].insertBefore(firstPage, buttonDiv[0].firstChild);
buttonDiv[0].appendChild(lastPage);


$(document).ready(function () {
    //alert('ready content');
});
