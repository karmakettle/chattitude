(function(){
  // initialize
  window.init = function(){

  if ( window.localStorage['apiToken'] ) App.pubsub.emit('logged', localStorage['apiToken']);
  setInterval(Chat.get, 3000);
  
  }

  // View-models
  window.AccountForm = {};
  window.Chatform = {};

  AccountForm.viewmodel = {
    username: '',
    password: '',
    set: function (name, value) {
      AccountForm.viewmodel[name] = value;
      App.pubsub.emit('change:AccountForm');
    }
  };

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

  Chats.view = function(data) {
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

  User.signup(username, password);
  });

  $('#signin').on('click', function(){
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  User.signin(username, password);
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