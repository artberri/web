(function () {

    var $menuIcon =  $('#menu-icon');

    $('#menu-button').click(function (e) {
        e.preventDefault();

        $('body').toggleClass('menu-opened');
        $menuIcon.toggleClass('fi-list fi-x');
    });

    $('.home .main-menu .menu-item-object-custom a').click(function (e) {
        $('body').toggleClass('menu-opened');
        $menuIcon.toggleClass('fi-list fi-x');
    });

    $('.smooth').click(function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 105
        }, 400);

        return false;
    });

    $(document).foundation();

}());
