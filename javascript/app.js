(function ($) {
    'use strict';

    $('.smooth').click(function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 105
        }, 400);

        return false;
    });

    $(document).foundation();

    window.cookieconsent_options = {
        'message': 'We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners.',
        'dismiss': 'Got it!',
        'learnMore': 'More info',
        'link': '/cookies-policy/',
        'theme': 'dark-bottom'
    };

}(jQuery));
