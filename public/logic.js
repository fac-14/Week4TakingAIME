// (function() {
  const form = document.getElementById("form");
  const submitButton = document.getElementById("submit-button");
  const searchBox = document.getElementById("input");
  const resultDiv = document.getElementById("result");
  // console.log(searchBox);
  var textInput = '';
  searchBox.addEventListener('input', function(event) {
    textInput += event.data;
    resultDiv.textContent = textInput;
  })
// })();
