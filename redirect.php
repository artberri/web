<?php

// Blog migration script
// It was time to say goodbye, too much time without updating

$uri = isset($_SERVER['REQUEST_URI']) ?
                                $_SERVER['REQUEST_URI'] :
                                '404';

$redirects = array(
    '/2014/11/08/numcol-mi-primer-juego-para-movil' => 'http://numcol.com/',
    '/2013/02/22/como-crear-un-menu-responsive-con-sidr' => '/sidr/',
    '/2011/06/24/plugin-wp-karmacracy-integracion-en-wordpress' => 'https://wordpress.org/plugins/karmacracy-widget/',
    '/en/wp-karmacracy' => 'https://wordpress.org/plugins/karmacracy-widget/',
    '/contacto' => '/contact/',
    '/recursos' => '/projects/',
    '/2012/02/05/bundle-para-crear-sitemap-en-symfony2' => '/projects/',
    '/en/berri-youtube-gallery' => '/projects/',
    '/en/meet-your-commenters-plugin' => '/projects/',
    '/2011/04/22/plugin-wp-forzar-usuarios-login-comentar' => '/projects/',
    '/en/comment-privileges-by-post' => '/projects/',
    '/2010/06/28/revision-de-meet-your-commenters' => '/projects/',
    '/2009/06/17/clase-php-api-minube' => '/projects/',
    '/minube-php' => '/projects/',
    '/technorati-reactions-dashboard-plugin' => '/projects/',
    '/2009/01/22/meet-your-commenters-compatible-con-wordpress-27' => '/projects/',
    '/remove-stopwords-from-slug' => '/projects/',
    '/wordpress-themes-castellano' => '/projects/',
    '/wordpress-themes' => '/projects/',
    '/personalizedcare' => '/projects/',
    '/berri-alianzo-widget' => '/projects/',
    '/2008/01/19/un-nuevo-blog-de-viajes' => 'http://www.sinrumbofijo.com',
    '/2008/11/20/os-presento-efemerides-20' => 'http://efemerides20.com',
    '/inicio.php' => '/',
    '/berriblog' => '/',
    '/alberto-varela' => '/',
);

$redirectTo = false;

foreach ($redirects as $toSearch => $toRedirect) {
    if (strpos($uri, $toSearch) === 0) {
        $redirectTo = $toRedirect;

        break;
    }
}

if (!$redirectTo) {
    header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found");
    include '404.html';
    die;
}

header('HTTP/1.1 301 Moved Permanently');
header('Location: ' . $toRedirect);
die;
