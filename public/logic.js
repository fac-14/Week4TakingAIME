(function() {
  const form = document.getElementById("form");
  const submitButton = document.getElementById("submit-button");
  const searchBox = document.getElementById("input");
  const resultDiv = document.getElementById("result");

  // function httpGetRequest(searchTerm, submit, callback) {
  //   // function httpGetRequest() {
  //   const xhr = new XMLHttpRequest();
  //   let url = `/?q=${searchTerm}&submit=${submit}`;
  //   xhr.onreadystatechange = () => {
  //     if (xhr.readyState == 4 && xhr.status == 200) {
  //       // stuff todo, callback
  //       callback();
  //       // resultDiv.textContent = searchTerm;
  //     }
  //   };
  //   xhr.open("GET", "/", true);
  //   xhr.send();
  // }

  form.addEventListener("submit", event => {
    event.preventDefault();
    let searchTerm = event.target[0].value;
    console.log(searchTerm);
    // httpGetRequest();
  });

  // submitButton.addEventListener("click", function(event) {
  //   event.preventDefault();
  // });

  // submitButton.addEventListener("click", function() {
  // alert(searchTerm);
  // httpGetRequest(searchTerm, true, () => {
  //   // resultDiv.textContent = searchTerm;
  // });
  // httpGetRequest();
  // });
})();
