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
  textInput = searchBox.value;
  apiRequest(textInput, false, function(data) {
    var autocompleteArray = data;
    var optionsList = document.querySelectorAll("option");
    optionsList.forEach(option => {
      option.value = "";
    });
    for (i = 0; i < autocompleteArray.length; i++) {
      var optionID = document.getElementById(i);
      optionID.value = autocompleteArray[i];
    }
  });
});

submitButton.addEventListener("click", function() {
  textInput = searchBox.value;
  apiRequest(textInput, true, function(data) {
    if (data == "sorry no emoji :(") {
      emojiNameContainer.textContent = data;
    } else {
      var emojiName = document.createTextNode(data[0].name);
      var emojiMarkdown = document.createTextNode(
        "Markdown = " + data[0].markdown.join(", ")
      );
      var emojiSymbol = document.createTextNode(data[0].emoji);

      while (emojiNameContainer.firstChild) {
        emojiNameContainer.removeChild(emojiNameContainer.firstChild);
      }
      emojiNameContainer.appendChild(emojiName);

      while (emojiImageContainer.firstChild) {
        emojiImageContainer.removeChild(emojiImageContainer.firstChild);
      }
      emojiImageContainer.appendChild(emojiSymbol);

      while (emojiMarkdownContainer.firstChild) {
        emojiMarkdownContainer.removeChild(emojiMarkdownContainer.firstChild);
      }
      emojiMarkdownContainer.appendChild(emojiMarkdown);
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
