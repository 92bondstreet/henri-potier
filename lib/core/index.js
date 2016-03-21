'use strict';

let EventEmitter = require('ak-eventemitter');

module.exports = class Core extends EventEmitter {
  constructor () {
    super();

    this.listen();
  }

  /**
   * Listen events
   *
   * @return {Core}
   */
  listen () {
    this.on('shop.update.quantity', (ns, value) => {
      this.quantity = value;
    });

    return this;
  }

  /**
   * Set quantity
   *
   * @param  {String} value
   */
  set quantity (value) {
    document.querySelector('.hp-cart-total-item').innerHTML = value;
  }
};
