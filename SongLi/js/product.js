
// 導覽 分類======================================================
$(document).ready(function () {
    
    $('.flower-toggle').click(function (e) {
        e.preventDefault();
        var $icon = $(this).find('.chevron-icon');
        var $submenu = $(this).siblings('.flower-submenu');

        if ($icon.hasClass('bi-chevron-down')) {
            $icon.removeClass('bi-chevron-down').addClass('bi-chevron-up');
            $submenu.slideDown();
        } else {
            $icon.removeClass('bi-chevron-up').addClass('bi-chevron-down');
            $submenu.slideUp();
        }
    });

});








