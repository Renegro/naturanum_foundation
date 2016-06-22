<?php
// Adjust the amount of rows in the grid
$grid_columns = 4; ?>

<?php if (0 === ($wp_query->current_post) % $grid_columns): ?>

<div class="row collapse archive-grid"> <!--Begin Row:-->

    <?php endif; ?>

    <!--Item: -->
    <div class="large-3 medium-3 columns panel">

        <?php $background = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full'); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(''); ?> role="article">
            <div class="article-bg" style="background-image: url('<?php echo $background[0]; ?>')"></div>

            <header class="article-header">
                <h3 class="title"><?php the_title(); ?></h3>
                <?php get_template_part('parts/content', 'byline'); ?>
            </header> <!-- end article header -->
            <a class="article-link" href="<?php the_permalink() ?>" rel="bookmark"
               title="<?php the_title_attribute(); ?>"></a>

            <section class="entry-content" itemprop="articleBody">
                <?php the_content('<button class="tiny">' . __('Read more...', 'jointswp') . '</button>'); ?>
            </section> <!-- end article section -->

        </article> <!-- end article -->

    </div>

    <?php if (0 === ($wp_query->current_post + 1) % $grid_columns || ($wp_query->current_post + 1) === $wp_query->post_count): ?>

</div>  <!--End Row: -->

<?php endif; ?>

