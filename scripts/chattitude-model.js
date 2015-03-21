/*View chat messages (without signing in)
Protect the user against XSS attacks
Sign up for an account
Sign in
Make a user stay signed in even after they refresh the page (hint: use localStorage)
Post a chat message

The Model in both MVP and MVC versions should be exactly the same
Make the GET /chats request every X seconds to ensure your user sees the latest chat messages

*/

(function() {
  window.Chat = {};

  Chat.signup = function(username, password) {
   
    $.ajax({
      type: 'POST',
      url:'http://chat.api.mks.io/signup',
      contentType: "multipart/form-data",
      data: {
        username: username,
        password: password },
    }).success(function () {  
      // App.pubsub.emit('signed');
      Chat.signin(username, password);
      console.log("signed up")
      
    });
  };

  Chat.signin = function(username, password) {
    $.ajax({
      type: "POST",
      url: "http://chat.api.mks.io/signin",
      contentType: "multipart/form-data",
      data: {
        username: username,
        password: password },
      }).success(function(response) {
        App.pubsub.emit('logged', response);
        window.localStorage['apiToken'] = response['apiToken'];
        console.log("signed in, apiToken=" + response['apiToken']);
      });
  };
  Chat.set = function() {

  };

  Chat.get = function() {
  var results;

  $.ajax({
    type: 'GET',
    url: 'http://chat.api.mks.io/chats'
  }).success(function (chats) {
    App.pubsub.emit('got', chats);
  });

}

})();