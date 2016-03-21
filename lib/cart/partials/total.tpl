<div class="cart_totals ">

  <h2>Cart Totals</h2>
  <div class="cart_totals_wrap">
    <table cellspacing="0">

      <tbody>
        <tr class="cart-subtotal">
          <th>Was</th>
          <td><del><span class="amount"><%- locals.was || 0 %> &euro;</span></del></td>
        </tr>


        <tr class="order-total">
          <th>Total</th>
          <td><strong><span class="amount"><%- locals.now || 0%> &euro;</span></strong> </td>
        </tr>


      </tbody>

    </table>
  </div>

</div>
