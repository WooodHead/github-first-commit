import 'chromereload/devonly'

import main from './main.js'
//alert('content script');
//const COMMITS_PER_PAGE = 35;
window.onload = function() {
  main()
}