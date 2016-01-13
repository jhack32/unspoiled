var loggedOn = false;
function loggedIn() {
  // $.get("https://serene-garden-3411.herokuapp.com/user_logged_in", function(data) {
    $.get("http://localhost:3000/user_logged_in", function(data) {
    if (data) {
      sessionStorage.loggedIn = true
    }
    else {
      sessionStorage.clear()
    }
    if (data.active) {
      chrome.storage.local.set({unspoiledOn: true})
    }
    else {
      chrome.storage.local.set({unspoiledOn: false})
    }
  })
}

function setFilter() {
  // $.get("https://thawing-badlands-1060.herokuapp.com/filtered_words", function(data) {
  $.get("http://localhost:3000/filtered_words", function(data) {
    chrome.storage.local.set({filter: data});
    // console.log("Filter set", data);
    chrome.storage.local.get(function(obj) {
      // console.log("callback: ", obj)
      if (sessionStorage.loggedIn === "true"){
        if (obj.unspoiledOn === true) {
          if (obj.filter.length > 2) {
            hideWord(allTags)
          }
          else {
            console.log("Unspoiled off")
          }
        }
      }
    })
  })
}

var allTags = $('body').find('*').not('script')
var array_of_words = []
chrome.storage.local.get("filter", function(obj) {
  if (obj.filter) {
    array_of_words = obj.filter
  }
})


var textNodes = $("*").contents().filter(function(){ return this.nodeType == 3; });
function hideWord(tags) {
  textNodes.each(function(index, node) {
    array_of_words.forEach(function(word){
      if (node.wholeText.toLowerCase().match(word) != null) {
        // console.log("word", word, node.parentNode)
        $(node.parentNode).hide()
        $(node.parentNode).parent().append('<a class= "meep" href="#" style="color: white; background-color: purple; border: 3px solid lightblue; width: 200px;">Unspoiled (click to show spoiler)</a>')
      }
    })
  });
}


$(document).ready(function() {
  loggedIn()
  setFilter()
  $('body').on('click','.meep' ,function(event){
    event.preventDefault();
    $(event.target).siblings().show()
    $(event.target).hide()
  })
})
