

addEventListener('message', function(e) {
  postMessage('WORKER INIT');
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      postMessage('WORKER STARTED: ' + data.msg);
      var xhr = new XMLHttpRequest();    // Begin an HTTP request
      xhr.open("GET", 'http://localhost:5000/workerdata', true);       // false makes this synchronous
      xhr.setRequestHeader("Accept","application/json");
      xhr.send();                        // Blocks until response is complete
      xhr.onreadystatechange=function()
      {
        if (xhr.readyState==4 && xhr.status==200)
        {
          postMessage(xhr.responseText);
        }
      }
      break;
    case 'stop':
      self.close();
      break;
  }
}, false);