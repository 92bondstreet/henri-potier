'use strict';

let EventEmitter = require('ak-eventemitter');
let Items = require('./items');
let Shop = require('./shop');
let store = require('henri-potier-store');

const books = store.books;

module.exports = class HenriPotier extends EventEmitter {
  /**
   * Constructor
   *
   * Prepares Controller
   *
   */
  constructor () {
    super();

    this.shop = new Shop();
    this.items = new Items();

    this.listen();
  }

  /**
   * Listen events
   * @return {HenriPotier}
   */
  listen () {
    this.shop.on('shop.add', (ns, isbn) => {
      this.items.add(isbn);
      this.shop.emit('shop.update.quantity', this.items.quantity);
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
};
