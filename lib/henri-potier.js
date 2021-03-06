'use strict';

let Cart = require('./cart');
let Core = require('./core');
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
    this.core = new Core();
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
      this.core.emit('shop.update.quantity', this.items.quantity);
    });

    this.shop.on('shop.cart.open', () => {
      this.openCart();
    });

    this.cart.on('cart.item.quantity', (ns, isbn, quantity) => {
      this.change(isbn, quantity);
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
      this.loadCart();
      this.shop.render({'books': list});
    });

    return this;
  }

  /**
   * Open cart
   *
   * @return {HenriPotier}
   */
  openCart () {
    const items = this.items.toJSON();

    order(items)
      .then(total => {
        this.cart.render({
          'items': items,
          'total': total
        });
      });

    return this;
  }

  /**
   * Load cart from LocalForage
   *
   * @return {HenriPotier}
   */
  loadCart () {
    this.items.load()
      .then(value => {
        this.items.cart = value;
        this.core.emit('shop.update.quantity', this.items.quantity);
      });
  }

  /**
   * Update cart
   * @return {HenriPotier}
   */
  updateCart () {
    const items = this.items.toJSON();

    order(items)
      .then(total => {
        this.cart.update({
          'total': total
        });
      });

    return this;
  }

  /**
   * Change item quantity
   * @param  {[type]} isbn     [description]
   * @param  {[type]} quantity [description]
   * @return {[type]}          [description]
   */
  change (isbn, quantity) {
    this.items.update(isbn, quantity);
    this.core.emit('shop.update.quantity', this.items.quantity);
    this.updateCart();

    return this;
  }
};
