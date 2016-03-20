<ul class="product-grid product-listing">
  <% var books = locals.books || []; %>

  <% for (var index=0, length=books.length; index < length; index++) { %>
    <% var book = books[index]; %>
    <li class="grid-item col-lg-3 col-md-3 col-sm-6 col-xs-12">

      <div class="item-wrap">

        <div class="clear"></div>

        <a href="javascript:void(0);" class="item-thumb" data-hp-isbn="<%- book.isbn %>">
          <img width="340" height="500" src="<%- book.cover %>" class="attachment-shop_catalog wp-post-image" alt="<%- book.title %>" />
        </a>

        <div class="item-info">
          <button type="submit" style="display: inline!important;" class="single_add_to_cart_button button alt"><%- book.price %> &euro; | Add to cart</button>
          <h2 style="margin-top: 5px; font-size: 1em"><%- book.title %></h2>
        </div>
    </li>
  <% } %>
</ul>
