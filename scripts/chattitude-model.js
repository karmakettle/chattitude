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

  Chat.set = function() {

  };

  Chat.get = function() {
  var results;

  $.ajax({
    type: 'GET',
    url: 'http://chat.api.mks.io/chats'
  }).success(function (chats) {
    // console.log("Got chats:", chats)
    App.pubsub.emit('got', chats);
  });

}

})();