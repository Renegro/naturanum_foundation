<?php
function grpp_scripts()
{
// Register the script like this for a theme:
    wp_register_script('masonry', get_template_directory_uri() . '/assets/js/masonry.pkgd.min.js');
    wp_enqueue_script('masonry');

    wp_register_script('app', get_template_directory_uri() . '/assets/js/app.js');
    wp_enqueue_script('app');
}
add_action( 'wp_enqueue_scripts', 'grpp_scripts' );
?>