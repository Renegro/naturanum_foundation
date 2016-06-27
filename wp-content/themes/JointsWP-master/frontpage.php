<?php
/*
Template Name: Frontpage
*/
?>

<?php get_header(); ?>

<div id="content">

    <div id="inner-content" class="row">

        <main id="main" class="large-12 medium-12 columns" role="main">

            <header>
                <h1 class="page-title">Frontpage</h1>
            </header>
            <?php
            $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
            $args = array(
                'posts_per_page' => -1,
                'paged' => $paged
            );
            query_posts($args);
            ?>
            <div class="grid">
                <div class="grid-sizer"></div>
                <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

                    <!-- To see additional archive styles, visit the /parts directory -->
                    <?php get_template_part('parts/loop', 'archive-grid'); ?>

                <?php endwhile; ?>

                    <?php joints_page_navi(); ?>

                <?php else : ?>

                    <?php get_template_part('parts/content', 'missing'); ?>

                <?php endif; ?>

            </div>
        </main> <!-- end #main -->

        <?php get_sidebar(); ?>

    </div> <!-- end #inner-content -->

</div> <!-- end #content -->

<?php get_footer(); ?>
