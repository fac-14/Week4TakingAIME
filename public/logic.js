// (function() {
  const form = document.getElementById("form");
  const submitButton = document.getElementById("submit-button");
  const searchBox = document.getElementById("input");
  const resultDiv = document.getElementById("result");
  // console.log(searchBox);
  var textInput = '';
  searchBox.addEventListener('input', function() {
    textInput = searchBox.value;
    resultDiv.textContent = textInput;
    apiRequest(textInput);
  })

  var apiRequest = function(query) {
  var xhr = new XMLHttpRequest();
  var url = '//localhost:8070/?q=' + query;
  console.log(url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      console.log(data);
    }
    }
    xhr.open('GET', url, true);
    xhr.send();
  }
// })();
