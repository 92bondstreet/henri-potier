/*eslint-disable space-unary-ops */
'use strict';

let Delegate = require('dom-delegate');
let EventEmitter = require('ak-eventemitter');
let fs = require('fs');
let path = require('path');
let template = require('ak-template');

module.exports = class Cart extends EventEmitter {
  constructor () {
    super();

    this.element = null;
    this.delegate = new Delegate(document.body);
    this.template = template(fs.readFileSync(path.join(__dirname, 'index.tpl'), 'utf-8'));
    this.partials = {
      'empty': template(fs.readFileSync(path.join(__dirname, 'partials/empty.tpl'), 'utf-8')),
      'total': template(fs.readFileSync(path.join(__dirname, 'partials/total.tpl'), 'utf-8'))
    };

    this.listen();
  }

  /**
   * Listen events
   *
   * @return {Cart}
   */
  listen () {
    this.delegate.on('input', '.hp-input-quantity', (event, target) => {
      this.onInputQuantity(target);
    });

    this.delegate.on('click', '.hp-plus-one', (event, target) => {
      this.onClickQuantity(target, true);
    });

    this.delegate.on('click', '.hp-minus-one', (event, target) => {
      this.onClickQuantity(target, false);
    });

    this.delegate.on('click', '.hp-remove', (event, target) => {
      this.remove(target);
    });

    return this;
  }

  /**
   * Get the isbn of current item
   *
   * @param  {Element} target
   * @return {String}
   */
  getIsbn (target) {
    const root = target.closest('[data-hp-isbn]');

    return root.getAttribute('data-hp-isbn');
  }

  /**
   * Get input according data
   *
   * @param  {String} what
   * @param  {String} isbn
   * @return {Element}
   */
  getInput (what, isbn) {
    return document.querySelector(`[data-hp-${what}-${isbn}]`);
  }

  /**
   * Set quantity value
   * @param {Element} dom
   * @param {Integer} value
   * @return {Cart}
   */
  setQuantity (dom, value) {
    dom.value = value;
    dom.dispatchEvent(new Event('input', {'bubbles': true}));

    return this;
  }

  /**
   * Render the cart
   *
   * @param {Object} data
   * @return {Cart}
   */
  render (data = {}) {
    this.emit('rendering');

    //total order with best special offer
    const totalOrder = data.total || {};

    if (! data.items || ! data.items.length) {
      this.element = this.partials.empty();
    } else {
      this.element = this.template(data);
    }

    //set element to zone cart
    this.set('content', this.element);
    this.set('total', this.partials.total(totalOrder));
    this.emit('render');

    return this;
  }

  update (data = {}) {
    this.emit('updating');

    //total order with best special offer
    const totalOrder = data.total || {};

    this.set('total', this.partials.total(totalOrder));

    this.emit('update');

    return this;
  }

  /**
   * Set HTML DOM to a zone
   *
   * @param  {String} zone
   * @param  {Element} dom
   * @return {Cart}
   */
  set (zone, dom) {
    let attribute = document.querySelector(`[hp-zone-${zone}]`) || {};

    attribute.innerHTML = dom;

    return this;
  }

  /**
   * Update quantity for the current item
   *
   * @param {Element} target
   * @param {Cart}
   */
  onInputQuantity (target) {
    const quantity = target.value;
    const isbn = this.getIsbn(target);
    let amount = this.getInput('amount', isbn);
    const price = amount.getAttribute('data-hp-price');

    amount.innerHTML = `${quantity * price} &euro;`;
    this.emit('cart.item.quantity', isbn, quantity);

    return this;
  }

  /**
   * Modify quantity
   *
   * @param  {Element} target
   * @return {Cart}
   */
  onClickQuantity (target, add = true) {
    const isbn = this.getIsbn(target);
    const increment = add ? 1 : - 1;
    let quantity = this.getInput('quantity', isbn);
    let value = ~~quantity.value + increment;

    value = value < 0 ? 0 : value;
    this.setQuantity(quantity, value);

    return this;
  }

  /**
   * Remove item from cart
   *
   * @param  {Event} event
   * @param  {Element} target
   * @return {Cart}
   */
  remove (target) {
    const isbn = this.getIsbn(target);
    let quantity = this.getInput('quantity', isbn);

    this.setQuantity(quantity, 0);

    return this;
  }
};
