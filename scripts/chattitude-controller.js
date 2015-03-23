(function(){
  // initialize
  window.init = function(){

  if ( window.localStorage['apiToken'] ) App.pubsub.emit('logged', localStorage['apiToken']);
  setInterval(Chat.get, 3000);
  
  }

  // Presenter
  window.Presenter = {};

  // Model listeners
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

  // View builders
  Presenter.buildChat = function(chat) {
    //escape character security:
    var lt = /</g,
        gt = />/g,
        ap = /'/g,
        ic = /"/g;
    var cleanUser = chat['user'].replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
    var cleanMessage = chat['message'].replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
    var element;
    element = '<div data-time="' + chat['time'] + '"data-id="' + chat['id'] + '"class="chat">' + cleanUser + ': ' + cleanMessage + '</div>';

    return element;
  };

  Presenter.displayChats = function(data) {
    //clear current chats view
    $view = $('.chats');
    $view.empty();
    for (var i = 0; i < data.length; i++) {
      $view.append(Presenter.buildChat(data[i]));
    }
  };

})();

// View listeners
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
  $('#logout').on('click', function(){
    window.localStorage['apiToken'] = "";
    window.location.reload();
  });
});