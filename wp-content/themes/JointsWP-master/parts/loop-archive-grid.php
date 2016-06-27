<?php ?>



  <div class="grid-item">
      <article id="post-<?php the_ID(); ?>" <?php post_class(''); ?> role="article">

          <section class="featured-image" itemprop="articleBody">
              <?php the_post_thumbnail('medium'); ?>
          </section> <!-- end article section -->

          <header class="article-header">
              <h4 class="title"><?php the_title(); ?></h4>
          </header> <!-- end article header -->
          <a class="article-link" href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"></a>


      </article> <!-- end article -->
  </div>




