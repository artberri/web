(function () {

    var $menuIcon = $('#menu-icon');

    $('#menu-button').click(function(e) {
        e.preventDefault();

        $('body').toggleClass('menu-opened');
        $menuIcon.toggleClass("fi-list fi-x");
    });

    $('.home .main-menu .menu-item-object-custom a').click(function(e) {
        $('body').toggleClass('menu-opened');
        $menuIcon.toggleClass("fi-list fi-x");
    });

    $(document).foundation();

}());
