// (function() {
const form = document.getElementById("form");
const submitButton = document.getElementById("submit-button");
const searchBox = document.getElementById("input");
const resultDiv = document.getElementById("result");
const modalBG = document.getElementById("modal-bg");
const modalContent = document.getElementById("emoji-name");
const closeButton = document.getElementById("close-button");
var textInput = "";
const emojiNameContainer = document.getElementById("emoji-name");
const emojiImageContainer = document.getElementById("emoji-image");
const emojiMarkdownContainer = document.getElementById("emoji-markdown");

searchBox.addEventListener("input", function() {
  apiRequest(searchBox.value, false, function(data) {
    var optionsList = document.querySelectorAll("option");
    //clears option list
    optionsList.forEach(option => {
      option.value = "";
    });
    //populates options list
    for (i = 0; i < data.length; i++) {
      var optionID = document.getElementById(i);
      optionID.value = data[i];
    }
  });
});

submitButton.addEventListener("click", function() {
  apiRequest(searchBox.value, true, function(data) {
    //return error message if no emoji
    if (data == "sorry no emoji :(") {
      emojiNameContainer.textContent = data;
    } else {
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
  modalBG.style.display = "block";
});

closeButton.addEventListener("click", function() {
  modalBG.style.display = "none";
});

var apiRequest = function(query, submit, callback) {
  query = query.split(" ").join("+");
  var xhr = new XMLHttpRequest();
  var url =
    "https://obscure-shore-44689.herokuapp.com/?q=" +
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
