<?php get_header(); ?>

    <div id="content">


        <div id="inner-content" class="row">

            <main id="main" class="large-12 medium-12 columns" role="main">

                <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

                    <?php get_template_part('parts/loop', 'single'); ?>
                    <?php $background = wp_get_attachment_image_src(get_post_thumbnail_id($page->ID), 'full'); ?>

                    <style>
                        .off-canvas-content {
                            background-image: url('<?php echo $background[0]; ?>');
                        }
                    </style>

                <?php endwhile;
                else : ?>

                    <?php get_template_part('parts/content', 'missing'); ?>

                <?php endif; ?>

            </main> <!-- end #main -->

        </div> <!-- end #inner-content -->

    </div> <!-- end #content -->

<?php get_footer(); ?>