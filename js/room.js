$(function(){
  var pagetop = $('#page_top');
  pagetop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 10) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });
  pagetop.click(function () {
    $('body, html').animate({
        scrollTop: 0
    }, 100);
    return false;
  });

  $('[name=hoge]').click(function(e){
      e.stopPropagation();
  }).parents('tr').click(function(){
      $(this).find('[name=hoge]').prop('checked', !$(this).find('[name=hoge]').prop('checked'));
  });
});
