'use strict';

let Delegate = require('dom-delegate');
let EventEmitter = require('ak-eventemitter');
let fs = require('fs');
let path = require('path');
let template = require('ak-template');

module.exports = class Shop extends EventEmitter {
  constructor () {
    super();

    this.element = null;
    this.delegate = new Delegate(document.body);
    this.template = template(fs.readFileSync(path.join(__dirname, 'index.tpl'), 'utf-8'));

    this.listen();
  }

  listen () {
    this.delegate.on('click', '.hp-add-cart', (event) => {
      this.add(event);
    });

    this.on('shop.update.quantity', (ns, value) => {
      this.quantity = value;
    });
  }

  set quantity (value) {
    document.querySelector('.hp-cart-total-item').innerHTML = value;
  }

  /**
   * Render the books shop
   *
   * @param {Object} data
   * @return {Shop}
   */
  render (data = {}) {
    this.emit('rendering');

    if (! this.element) {
      this.element = this.template(data);
    }

    //set element to zone books
    document.querySelector('[hp-zone-books]').innerHTML = this.element;
    this.emit('render');

    return this;
  }

  add (event) {
    let isbn = event.target.getAttribute('data-hp-isbn');

    this.emit('shop.add', isbn);
    return this;
  }
};
