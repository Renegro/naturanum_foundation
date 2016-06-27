<?php $background = wp_get_attachment_image_src(get_post_thumbnail_id($page->ID), 'large'); ?>

<style>
    .off-canvas-content {
        background-image: url('<?php echo $background[0]; ?>');
    }
</style>
<article id="post-<?php the_ID(); ?>" <?php post_class(''); ?> role="article" itemscope
         itemtype="http://schema.org/BlogPosting">
    <div class="article-content">
        <header class="article-header">
            <h1 class="entry-title single-title" itemprop="headline"><?php the_title(); ?></h1>
            <a href="<?php echo $background[0]; ?>" rel="lightbox"><?php the_post_thumbnail(); ?></a>
            <?php //get_template_part('parts/content', 'byline'); ?>
        </header> <!-- end article header -->
        <section class="entry-content" itemprop="articleBody">
            <?php the_content(); ?>
        </section> <!-- end article section -->
    </div>
    <footer class="article-footer">
        <?php wp_link_pages(array(
            'before' => '<div class="page-links">' . esc_html__('Pages:', 'jointswp'),
            'after' => '</div>'
        )); ?>
        <p class="tags"><?php the_tags('<span class="tags-title">' . __('Tags:', 'jointswp') . '</span> ', ', ',
                ''); ?></p>
    </footer> <!-- end article footer -->


</article> <!-- end article -->