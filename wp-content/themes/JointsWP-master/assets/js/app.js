jQuery(document).ready(function() {

    jQuery('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });

});