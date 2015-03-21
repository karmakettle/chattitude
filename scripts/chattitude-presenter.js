(function(){
  window.init = function(){

  if ( window.localStorage['apiToken'] ) App.pubsub.emit('logged');
  setInterval(Chat.get, 3000);
  
  }

  window.Presenter = {};

  App.pubsub.on('got', function(data) {
    Presenter.displayChats(data);
  });
    App.pubsub.on('sent', function() {
    document.getElementById('chatbox').value = "";
  });


  App.pubsub.on('logged', function(api){
    console.log(api);
    $('.signup').hide();
    $('#post').show();
  });

  Presenter.buildChat = function(chat) {
    //user, message, time, id

    //div with class = chat
    var element;
    element = '<div data-time="' + chat['time'] + '"data-id="' + chat['id'] + '"class="chat">' + chat['user'] + ': ' + chat['message'] + '</div>';

    return element;
  };

  //This is part of viewer
  Presenter.displayChats = function(data) {
      //clear current chats view
      $view = $('.chats');
      $view.empty();
      for (var i = 0; i < data.length; i++) {
        $view.append(Presenter.buildChat(data[i]));
      }
  };

  Presenter.postChat = function() {
    
  };

})();

$(document).ready(function(){
  window.init();

  $('#signup').on('click', function(){
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  Chat.signup(username, password);
  });

  $('#signin').on('click', function(){
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  Chat.signin(username, password);
  });

  $('#scream').on('click', function(){
    var message = document.getElementById('chatbox').value;
    var screaming = message.toUpperCase();
    var apiToken = window.localStorage['apiToken'];
    Chat.set(screaming, apiToken);
  });
});