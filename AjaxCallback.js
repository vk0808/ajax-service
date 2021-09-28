let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// function to show time
function showTime() {
  const date = new Date();
  return date.getHours() + "Hrs: " + date.getMinutes() + "Mins :" + date.getSeconds() + "Secs";
}

// function to make Ajax call
function makeAJAXCall(methodType, url, callback, async = true, data = null) {
  // create xhr object
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    // console.log("State Changed Called. ReadyState: " + xhr.readyState + " Status:" + xhr.status);
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status == 201) {
        callback(xhr.responseText);
      } else if (xhr.status >= 400) {
        console.log("Handle 400 Client Error or 500 Server Error at: " + showTime());
      }
    }
  }

  // open connection
  xhr.open(methodType, url, async);

  // check if data is present for post
  if (data) {
    console.log(JSON.stringify(data));
    // set request header  in case of POST method
    xhr.setRequestHeader("Content-Type", "application/json");
    // send request
    xhr.send(JSON.stringify(data));
  } else xhr.send();
  console.log(methodType + " request sent to the server at: " + showTime());
}


// routes for different methods
const getURL = " http://localhost:3000/employees/1";
const deleteURL = "http://localhost:3000/employees/JCXbKX";
const postURL = "http://localhost:3000/employees";


// callback function for GET method
function getUserDetails(data) {
  console.log("Get user data: " + data);
}
// callback function for DELETE method
function userDeleted(data) {
  console.log("User deleted " + data);
}
// callback function for POST method
const empData = { "name": "Javed", "salary": "50000" };
function userAdded(data) {
  console.log("User added : " + data);
}


// function call
makeAJAXCall("GET", getURL, getUserDetails); // async default
makeAJAXCall("DELETE", deleteURL, userDeleted, false); // sync (explicit)
makeAJAXCall("POST", postURL, userAdded, true, empData); // async (explicit)
