'use strict';

let Cart = require('./cart');
let EventEmitter = require('ak-eventemitter');
let Items = require('./items');
let Shop = require('./shop');
let store = require('henri-potier-store');

const books = store.books;
const order = store.order;

module.exports = class HenriPotier extends EventEmitter {
  /**
   * Constructor
   *
   * Prepares Controller
   *
   */
  constructor () {
    super();

    this.cart = new Cart();
    this.shop = new Shop();
    this.items = new Items();

    this.listen();
  }

  /**
   * Listen events
   *
   * @return {HenriPotier}
   */
  listen () {
    this.shop.on('shop.add', (ns, isbn) => {
      this.items.add(isbn);
      this.shop.emit('shop.update.quantity', this.items.quantity);
    });

    this.shop.on('shop.cart.open', () => {
      this.openCart();
    });

    return this;
  }

  /**
   * Run and fetch data before rendering
   *
   * @return {HenriPotier}
   */
  run () {
    books()
    .then(list => {
      this.items.books = list;
      this.shop.render({'books': list});
    });

    return this;
  }

  /**
   * Open cart
   * @return {HenriPotier}
   */
  openCart () {
    const items = this.items.toJSON();

    order(items)
      .then(total => {
        this.cart.render({
          'items': this.items.toJSON(),
          'total': total
        });
      });

    return this;
  }
};
