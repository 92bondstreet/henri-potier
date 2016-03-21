<article class="woocommerce-cart page type-page status-publish hentry language-en">
  <div class="entry-content static-content">
    <div class="woocommerce">
        <table class="shop_table cart" cellspacing="0">
          <thead>
            <tr>

              <th class="product-thumbnail">&nbsp;</th>
              <th class="product-name">Product</th>
              <th class="product-price">Price</th>
              <th class="product-quantity">Quantity</th>
              <th class="product-subtotal">Total</th>
              <th class="product-remove">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <% var items = locals.items || []; %>
              <% for (var index=0, length=items.length; index < length; index++) { %>
                <% var item = items[index]; %>
                  <tr class="cart_item" data-hp-isbn="<%- item.isbn %>">

                    <td class="product-thumbnail" width="240" height="200">
                      <a href="javascript:void(0);"><img src="<%- item.cover %>" class="attachment-shop_thumbnail wp-post-image" alt="<%- ~~item.title %>" /></a>
                    </td>

                    <td class="product-name">
                      <spans>
                        <%- item.title %>
                          </span>
                    </td>

                    <td class="product-price">
                      <span class="amount"><%- item.price %> &euro;</span> </td>

                    <td class="product-quantity">
                      <div class="quantity">
                        <input type="text" step="1" min="0" name="cart[f57a2f557b098c43f11ab969efe1504b][qty]" value="<%- item.quantity %>" title="Qty" class="input-text qty text" size="4" />
                        <div class="qty-adjust">
                          <a href="javascript:void(0);" class="fa fa-angle-up"></a>
                          <a href="javascript:void(0);" class="fa fa-angle-down"></a>
                        </div>
                      </div>
                    </td>

                    <td class="product-subtotal">
                      <span class="hp-amount amount"><%- ~~item.quantity * ~~item.price%> &euro;</span> </td>
                    <td class="product-remove">
                      <a href="javascript:void(0);" class="remove" title="Remove this item">x</a> </td>
                  </tr>
                  <% } %>
                    <tr>
                      <td colspan="6" class="actions">
                        <button class="button" name="update_cart">Update Cart</button>
                    </tr>

          </tbody>
        </table>



      <div hp-zone-total class="cart-collaterals">

      </div>

    </div>
  </div>
</article>
