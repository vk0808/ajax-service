// import xmlhttprequest module
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// function to make Ajax call using Promise
function makePromiseCall(methodType, url, async = true, data = null) {
  return new Promise(function (resolve, reject) {
    // xhr object is created
    let xhr = new XMLHttpRequest();

    // on ready state
    xhr.onreadystatechange = function () {
      console.log("State Changed Called. ReadyState: " + xhr.readyState + " Status: " + xhr.status);

      // check status == 200 ? resolve : reject
      if (xhr.status.toString().match('^[2][0-9]{2}$')) {
        resolve(xhr.responseText);
      } else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
        console.log("XHR failed");
      }
    }

    // open connection
    xhr.open(methodType, url, async);
    // check methodType
    if (data) {
      // POST method
      console.log(JSON.stringify(data));
      xhr.setRequestHeader("Content-Type", "application/json");
      // send request
      xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + " request sent to the server");
  });
}

// routes for different methods
const getURL = "http://localhost:3000/employees/1";
const deleteURL = " http://localhost:3000/employees/6";
const postURL = "http://localhost:3000/employees";


// function call: GET
makePromiseCall("GET", getURL, true)
  .then(responseText => {
    console.log("Get user data :" + responseText)
  }).catch(error => console.log("GET Error Status: " + JSON.stringify(console.error)));

// function call: DELETE
makePromiseCall("DELETE", deleteURL, false)
  .then(responseText => {
    console.log("user deleted :" + responseText)
  }).catch(error => console.log("Delete Error Status: " + JSON.stringify(console.error)));

// function call: POST
const empData = { "name": "Janvi", "salary": "40000" };
makePromiseCall("POST", postURL, true, empData)
  .then(responseText => {
    console.log("User added :" + responseText)
  })
  .catch(error => console.log("POST Error Status: " + JSON.stringify(console.error)));