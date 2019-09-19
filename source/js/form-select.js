(function ($) {
  reinitSelect($);
})(jQuery);
function reinitSelect($) {
  if ($('.form-select__group').length) {
    $('.form-select__group').styler({
      onSelectOpened: function() {
        $(this)
          .find('.jq-selectbox__trigger-arrow')
          .addClass('jq-selectbox__trigger-arrow--rotate');
      },
      onSelectClosed: function() {
        $(this)
          .find('.jq-selectbox__trigger-arrow')
          .removeClass('jq-selectbox__trigger-arrow--rotate');
      }
    });
    var ps = new PerfectScrollbar('.jq-selectbox__dropdown ul', {
      wheelSpeed: 0.5
    });
  }
}
