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
  })

  searchBox.addEventListener('input', function() {
    var autocompleteDiv = document.createElement('div');
    autocompleteDiv.setAttribute('id', this.id = 'autocomplete-list');
    autocompleteDiv.setAttribute('class', 'autocomplete-items');
    this.paerentNode.appendChild('autocomplete-items');
    textInput = searchBox.value;
    autocompleteDiv.innerText = textInput;
  })


  var xhr = new XMLHttpRequest();
  var url = 'https://api.tfl.gov.uk/line/mode/tube/status';
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      console.log(data);
    }
    }
    xhr.open('GET', url, true);
    xhr.send();
// })();
