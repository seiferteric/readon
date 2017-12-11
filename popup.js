var books = {};

RegExp.escape= function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

var bg = chrome.extension.getBackgroundPage();
books = bg.books;

function searchBooks(doctext) {
 
  document.getElementById("loading").style.display = "";
  setTimeout(function() {
    bl = document.getElementById("book-list");
    for (var title of Object.keys(books)) {
      if(doctext.search(new RegExp("\\b" + RegExp.escape(title) + "\\b")) > 0) {
        bp = document.createElement("li");
        blink = document.createElement("a");
        blink.href = books[title];
        blink.innerText = title;
        bp.appendChild(blink);
        bl.appendChild(bp);
      }
    }
    document.getElementById("loading").style.display = "none";
  }, 0);
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script)
        searchBooks);
  });

});

