'use strict';

fambookApp.directive('chat', function($http) {
  var chat = io.connect('http://localhost:5000/chat')
      , news = io.connect('http://localhost:5000/news');
  var connection;

  function sendText(element, text) {
    var inputText = element.find('textarea');
    var message = inputText.val();
    if(text) {
      message = text;
    }
    var chatWindow = element.find('.chat-window');
    chatWindow.html(chatWindow.html() + '<span class="myself">Me: </span>' + message + '<br>');
    inputText.val('');
    connection.send(message);
  }

  function postText(element, text) {
    var message = element.find('textarea').val();
    if(text) {
      message = text;
    }
    var chatWindow = element.find('.chat-window');
    chatWindow.html(chatWindow.html() + '<span class="friend">George: </span>' + message + '<br>');
  }


  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/partials/chat.ejs',
    link: function(scope, element, attrs, controller) {

      element.on('keydown', 'textarea', function(e) {
        if(e.keyCode === 13) {
          sendText(element);
        }
      });

      if('WebSocket' in window) {
        console.log("Start a web socket connection");
        connection = new WebSocket('ws://echo.websocket.org/');
        connection.onopen = function() {
          console.log("Connection open");
          sendText(element, "YES I GOT CONNECTED");
        }

        connection.onmessage = function(e) {
          postText(element, e.data);
          console.log("Socket - Received message", e);
        }

        connection.onclose = function() {
          console.log("Connection closed");
        }

        connection.onerror = function(error) {
          console.log("Socket connection error: ", error);
        }
      }
      chat.on('connect', function () {
        chat.emit('hi!');
      });

      news.on('news', function () {
        news.emit('woot');
      });
    },
    controller: function($scope, $element) {
      $scope.send = function() {
        sendText($element);
        //chat.emit($element.find('textarea').val());
      }
    }
  }

});

