(function(){

  window.User = {};

  User.signup = function(username, password) {
   
    $.ajax({
      type: 'POST',
      url:'http://chat.api.mks.io/signup',
      contentType: "multipart/form-data",
      data: {
        username: username,
        password: password },
    }).success(function () {  
      User.signin(username, password);
    });
  };

  User.signin = function(username, password) {
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
        // console.log("signed in, apiToken=" + response['apiToken']);
      });
  };

})();