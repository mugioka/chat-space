$(function(){
  function buildHTML(message){
    if (message.image && message.content) {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="user-content">
                      <h3 class="user-name">
                        ${message.user_name}
                      </h3>
                      <p class="user-time">
                        ${message.created_at}
                      </p>
                    </div>
                    <div class="text-message">
                      <p>
                        ${message.content}
                      </p>
                      <img src="${message.image}" class="image-tag">
                    </div>
                  </div>`
    } else if (message.content) {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="user-content">
                      <h3 class="user-name">
                        ${message.user_name}
                      </h3>
                      <p class="user-time">
                        ${message.created_at}
                      </p>
                    </div>
                    <div class="text-message">
                      <p>
                        ${message.content}
                      </p>
                    </div>
                  </div>`
    } else if (message.image) {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="user-content">
                      <h3 class="user-name">
                        ${message.user_name}
                      </h3>
                      <p class="user-time">
                        ${message.created_at}
                      </p>
                    </div>
                    <div class="text-message">
                      <img src="${message.image}" class="image-tag">
                    </div>
                  </div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-contents').append(html);
      $('.main-contents').animate({ scrollTop: $('.main-contents')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信error");
    })
  });

  var reloadMessages = function(){
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: "GET",
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.main-contents').append(insertHTML);
        $('.main-contents').animate({ scrollTop: $('.main-contents')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});