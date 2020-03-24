$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="user-content">
                    <h3 class="user-name">
                      ${message.user_name}
                    </h3>
                    <p class="user-time">
                      ${message.created_at}
                    </p>
                  </div>
                  <div class="text-message">
                    ${message.content}
                    <div class="image-tag">
                      ${message.image}
                    </div>
                  </div>`
      return html;
    } else {
      var html = `<div class="user-content">
                    <h3 class="user-name">
                      ${message.user_name}
                    </h3>
                    <p class="user-time">
                      ${message.created_at}
                    </p>
                 </div>
                 <div class="text-message">
                   ${message.content}
                 </div>`
      return html
    }
  }
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
});