// (function() {
var form = document.getElementById("form");
var submitButton = document.getElementById("submit-button");
var searchBox = document.getElementById("input");
var resultDiv = document.getElementById("result");
var modalBG = document.getElementById("modal-bg");
var closeButton = document.getElementById("close-button");
var textInput = "";
var emojiNameContainer = document.getElementById("emoji-name");
var emojiImageContainer = document.getElementById("emoji-image");
var emojiMarkdownContainer = document.getElementById("emoji-markdown");
var baseUrl = "//localhost:8070";

searchBox.addEventListener("input", function() {
  var previousInput = '';
  function waitForInput (searchInput) {
    previousInput = searchInput;
    setTimeout(function() {
      //if user has typed more, make api request
      if (searchInput === previousInput) {
        autocomplete(searchInput);
      }
    }, 250); 
  }
  function autocomplete (searchInput) {
    apiRequest(searchInput, false, function(data) {
    var optionsList = document.querySelectorAll("option");
    //clears option list
    optionsList.forEach(function(option) {
      option.value = "";
    });
    //populates options list
    for (i = 0; i < data.length; i++) {
      var optionID = document.getElementById(i);
      optionID.value = data[i];
    }
  });
};
waitForInput(searchBox.value);
});

submitButton.addEventListener("click", function() {
  apiRequest(searchBox.value, true, function(data) {
    //return error message if no emoji
    if (data == "sorry no emoji :(") {
      emojiNameContainer.textContent = data;
    } else {
      //display final emoji for user
      var emojiName = document.createTextNode(data[0].name);
      var emojiMarkdown = document.createTextNode(
        "Markdown = " + data[0].markdown.join(", ")
      );
      var emojiSymbol = document.createTextNode(data[0].emoji);

      function populateFinalEmoji (container, data) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(data);
      }
      populateFinalEmoji(emojiNameContainer, emojiName);
      populateFinalEmoji(emojiImageContainer, emojiSymbol);
      populateFinalEmoji(emojiMarkdownContainer, emojiMarkdown);
    }
  });
  //display modal
  modalBG.style.display = "block";
});
//close modal
closeButton.addEventListener("click", function() {
  modalBG.style.display = "none";
});

var apiRequest = function(query, submit, callback) {
  query = query.split(" ").join("+");
  var xhr = new XMLHttpRequest();
  var url =
    baseUrl + "?q=" +
    query +
    "&submit=" +
    JSON.stringify(submit);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      return callback(data);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};
