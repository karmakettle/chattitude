(function(){
  window.init = function(){

  setInterval(Chat.get, 3000);
  
  }

  window.Presenter = {};

  App.pubsub.on('got', function(data) {
    Presenter.displayChats(data);
  })
  // App.pubsub.on('signed', function() {
  //   $('.signup').hide();
  //   // $('#post').show();
  // });
  App.pubsub.on('logged', function(api){
    console.log(api);
    $('.signup').hide();
    $('#post').show();
  });
  // App.

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
});