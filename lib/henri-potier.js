'use strict';

let Shop = require('./shop');
let store = require('henri-potier-store');

const books = store.books;

module.exports = class HenriPotier {
  /**
   * Constructor
   *
   * Prepares Controller
   *
   */
  constructor () {
    this.shop = new Shop();
  }

  /**
   * Run and fetch data before rendering
   *
   * @return {HenriPotier}
   */
  run () {
    books()
    .then(list => {
      this.shop.render({'books': list});
    });

    return this;
  }
};
