/*eslint-disable space-unary-ops */
'use strict';

let localforage = require('localforage');

module.exports = class Items {
  /**
   * Constructor
   *
   * Getter/Setter to cart Items
   */
  constructor () {
    this._books = new Map();
    this._cart = new Map();
  }

  /**
   * Get total of cart items
   *
   * @return {Integer}
   */
  get quantity () {
    let total = 0;

    this._cart.forEach(item => {
      total += ~~item.quantity;
    });

    return total;
  }

  /**
   * Set list of books shop
   *
   * @param  {Array} value
   * @return {Items}
   */
  set books (value) {
    this._books = new Map();

    value.forEach(current => {
      current.quantity = 0;
      this._books.set(current.isbn, current);
    });

    return this;
  }

  set cart (value) {
    this._cart = value || new Map();

    return this;
  }

  /**
   * Get the book for given isbn
   *
   * @param  {String} isbn
   * @return {Object}
   */
  book (isbn) {
    return this._books.get(isbn) || {};
  }

  //for not yet added books in cart, we get it
  //from list of books
  //or add +1 as quantity
  /**
   * Add a book to cart
   *
   * @param {String} isbn
   * @return {Items}
   */
  add (isbn) {
    let book = this._cart.get(isbn) || this.book(isbn);

    book.quantity++;
    this.save(isbn, book);

    return this;
  }

  /**
   * Update a book to cart
   *
   * @param {String} isbn
   * @param {Integer} quantity
   * @return {Items}
   */
  update (isbn, quantity = 1) {
    let book = this._cart.get(isbn) || this.book(isbn);

    book.quantity = quantity;
    this.save(isbn, book);

    return this;
  }

  /**
   * Load cart from localforage
   *
   * @return {Promise}
   */
  load () {
    return localforage.getItem('henri-potier');
  }

  /**
   * Save the book according isbn
   *
   * @param {String} isbn
   * @param {Object} book
   * @return {Items}
   */
  save (isbn, book) {
    this._cart.set(isbn, book);
    localforage.setItem('henri-potier', this._cart);

    return this;
  }

  /**
   * Get JSON
   * @return {Array}
   */
  toJSON () {
    let json = [];

    this._cart.forEach(current => {
      if (current.quantity > 0) {
        json.push(current);
      }
    });

    return json;
  }
};
